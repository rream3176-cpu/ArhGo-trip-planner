<?php
require_once 'config.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'طريقة الطلب غير صحيحة'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);
$session_token = $data['session_token'] ?? '';

if (empty($session_token)) {
    jsonResponse(['success' => false, 'error' => 'رمز الجلسة مطلوب'], 400);
}

try {
    $pdo = getDBConnection();
    
    // حذف الجلسة
    $stmt = $pdo->prepare("DELETE FROM user_sessions WHERE session_token = ?");
    $stmt->execute([$session_token]);
    
    jsonResponse([
        'success' => true,
        'message' => 'تم تسجيل الخروج بنجاح'
    ]);
    
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'خطأ في قاعدة البيانات: ' . $e->getMessage()], 500);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => 'خطأ عام: ' . $e->getMessage()], 500);
}
?>

