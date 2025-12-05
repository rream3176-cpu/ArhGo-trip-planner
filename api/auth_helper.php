<?php
/**
 * ملف مساعد للتحقق من الجلسات
 */

function verifySession($token) {
    try {
        if (empty($token)) {
            error_log("verifySession: Token is empty");
            return null;
        }
        
        $pdo = getDBConnection();
        error_log("verifySession: Checking token: " . substr($token, 0, 20) . "...");
        
        // التحقق من وجود جدول user_sessions
        $stmt = $pdo->query("SHOW TABLES LIKE 'user_sessions'");
        if ($stmt->rowCount() === 0) {
            error_log("verifySession: ERROR - user_sessions table does not exist!");
            return null;
        }
        
        $stmt = $pdo->prepare("SELECT user_id FROM user_sessions WHERE session_token = ? AND expires_at > NOW()");
        $stmt->execute([$token]);
        $session = $stmt->fetch();
        
        if ($session) {
            error_log("verifySession: SUCCESS - User ID: " . $session['user_id']);
            return $session['user_id'];
        } else {
            error_log("verifySession: FAILED - Session not found or expired");
            // محاولة التحقق بدون التحقق من التاريخ (للتشخيص)
            $stmt = $pdo->prepare("SELECT user_id, expires_at FROM user_sessions WHERE session_token = ?");
            $stmt->execute([$token]);
            $expired_session = $stmt->fetch();
            if ($expired_session) {
                error_log("verifySession: Session exists but expired at: " . $expired_session['expires_at']);
            } else {
                error_log("verifySession: Session token not found in database");
            }
            return null;
        }
    } catch (Exception $e) {
        error_log("verifySession: EXCEPTION - " . $e->getMessage());
        return null;
    }
}

function getUserFromSession($token) {
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT u.* FROM users u JOIN user_sessions s ON u.id = s.user_id WHERE s.session_token = ? AND s.expires_at > NOW() AND u.is_active = TRUE");
        $stmt->execute([$token]);
        return $stmt->fetch();
    } catch (Exception $e) {
        return null;
    }
}
?>

