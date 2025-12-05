<?php
require_once 'config.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'طريقة الطلب غير صحيحة'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

$email = sanitizeInput($data['email'] ?? '');
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    jsonResponse(['success' => false, 'error' => 'البريد الإلكتروني وكلمة المرور مطلوبان'], 400);
}

try {
    $pdo = getDBConnection();
    
    // البحث عن المستخدم
    $stmt = $pdo->prepare("SELECT id, full_name, email, password, phone, country, city FROM users WHERE email = ? AND is_active = TRUE");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password'])) {
        jsonResponse(['success' => false, 'error' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة'], 401);
    }
    
    // إنشاء رمز الجلسة
    $session_token = bin2hex(random_bytes(32));
    $expires_at = date('Y-m-d H:i:s', strtotime('+30 days'));
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // حفظ الجلسة
    $stmt = $pdo->prepare("INSERT INTO user_sessions (user_id, session_token, expires_at, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$user['id'], $session_token, $expires_at, $ip_address, $user_agent]);
    
    // تحديث آخر تسجيل دخول
    $stmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$user['id']]);
    
    jsonResponse([
        'success' => true,
        'message' => 'تم تسجيل الدخول بنجاح',
        'session_token' => $session_token,
        'user' => [
            'id' => $user['id'],
            'full_name' => $user['full_name'],
            'email' => $user['email'],
            'phone' => $user['phone'],
            'country' => $user['country'],
            'city' => $user['city']
        ]
    ]);
    
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'خطأ في قاعدة البيانات: ' . $e->getMessage()], 500);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => 'خطأ عام: ' . $e->getMessage()], 500);
}
?>

