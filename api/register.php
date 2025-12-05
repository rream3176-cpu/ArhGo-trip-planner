<?php
require_once 'config.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'طريقة الطلب غير صحيحة'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

$full_name = sanitizeInput($data['full_name'] ?? '');
$email = sanitizeInput($data['email'] ?? '');
$password = $data['password'] ?? '';
$phone = sanitizeInput($data['phone'] ?? '');
$country = sanitizeInput($data['country'] ?? '');
$city = sanitizeInput($data['city'] ?? '');

if (empty($full_name) || empty($email) || empty($password)) {
    jsonResponse(['success' => false, 'error' => 'جميع الحقول مطلوبة'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['success' => false, 'error' => 'البريد الإلكتروني غير صحيح'], 400);
}

if (strlen($password) < 6) {
    jsonResponse(['success' => false, 'error' => 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'], 400);
}

try {
    $pdo = getDBConnection();
    
    // التحقق من وجود البريد الإلكتروني
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        jsonResponse(['success' => false, 'error' => 'البريد الإلكتروني مستخدم بالفعل'], 400);
    }
    
    // تشفير كلمة المرور
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // إدراج المستخدم الجديد
    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password, phone, country, city) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$full_name, $email, $hashed_password, $phone, $country, $city]);
    
    $user_id = $pdo->lastInsertId();
    
    jsonResponse([
        'success' => true,
        'message' => 'تم التسجيل بنجاح',
        'user_id' => $user_id
    ]);
    
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'خطأ في قاعدة البيانات: ' . $e->getMessage()], 500);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => 'خطأ عام: ' . $e->getMessage()], 500);
}
?>

