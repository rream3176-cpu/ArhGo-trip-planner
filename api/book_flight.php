<?php
require_once 'config.php';
require_once 'auth_helper.php';
header('Content-Type: application/json; charset=utf-8');

// تفعيل تسجيل الأخطاء
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'طريقة الطلب غير صحيحة'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

// تسجيل البيانات المستلمة
error_log("=== Flight Booking Request ===");
error_log("Received data: " . print_r($data, true));

$session_token = $data['session_token'] ?? '';
$from_city = sanitizeInput($data['from_city'] ?? '');
$to_city = sanitizeInput($data['to_city'] ?? '');
$departure_date = $data['departure_date'] ?? '';
$return_date = $data['return_date'] ?? null;
$passengers = (int)($data['passengers'] ?? 1);
$class_type = sanitizeInput($data['class_type'] ?? 'اقتصادية');
$special_requests = sanitizeInput($data['special_requests'] ?? '');

error_log("Session token: " . substr($session_token, 0, 20) . "...");
error_log("From: $from_city, To: $to_city");
error_log("Departure: $departure_date, Return: " . ($return_date ?? 'NULL'));
error_log("Passengers: $passengers, Class: $class_type");

// التحقق من الجلسة
$user_id = verifySession($session_token);
error_log("User ID from session: " . ($user_id ? $user_id : 'NULL'));

if (!$user_id) {
    error_log("ERROR: User not authenticated");
    jsonResponse(['success' => false, 'error' => 'غير مصرح به. يرجى تسجيل الدخول'], 401);
}

if (empty($from_city) || empty($to_city) || empty($departure_date)) {
    jsonResponse(['success' => false, 'error' => 'جميع الحقول مطلوبة'], 400);
}

try {
    $pdo = getDBConnection();
    
    // حساب السعر (مثال بسيط)
    $base_price = 500; // سعر أساسي
    // القيم المطابقة لـ ENUM في قاعدة البيانات: 'اقتصادية', 'رجال أعمال', 'أولى'
    $class_multiplier = ['اقتصادية' => 1, 'رجال أعمال' => 2, 'أولى' => 3];
    $multiplier = $class_multiplier[$class_type] ?? 1;
    $total_price = $base_price * $passengers * $multiplier;
    
    if ($return_date) {
        $total_price *= 1.8; // رحلة ذهاب وعودة
    }
    
    // إنشاء رمز الحجز
    $booking_reference = 'FLT' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
    
    // إدراج الحجز
    error_log("Inserting booking: user_id=$user_id, from=$from_city, to=$to_city, departure=$departure_date, return=" . ($return_date ?? 'NULL') . ", passengers=$passengers, class=$class_type, price=$total_price");
    
    // التحقق من وجود الجدول
    $stmt = $pdo->query("SHOW TABLES LIKE 'flight_bookings'");
    if ($stmt->rowCount() === 0) {
        error_log("ERROR: flight_bookings table does not exist!");
        jsonResponse(['success' => false, 'error' => 'جدول flight_bookings غير موجود في قاعدة البيانات'], 500);
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO flight_bookings (user_id, from_city, to_city, departure_date, return_date, passengers, class_type, total_price, booking_reference, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $result = $stmt->execute([$user_id, $from_city, $to_city, $departure_date, $return_date, $passengers, $class_type, $total_price, $booking_reference, $special_requests]);
        
        if (!$result) {
            $errorInfo = $stmt->errorInfo();
            error_log("ERROR: INSERT failed - " . print_r($errorInfo, true));
            jsonResponse(['success' => false, 'error' => 'فشل إدراج الحجز: ' . $errorInfo[2]], 500);
        }
        
        // الحصول على ID قبل أي شيء آخر
        $booking_id = $pdo->lastInsertId();
        error_log("lastInsertId returned: $booking_id");
        
        if (!$booking_id) {
            error_log("ERROR: lastInsertId returned 0 or false");
            // التحقق من أن الحجز تم إدراجه
            $stmt = $pdo->prepare("SELECT id FROM flight_bookings WHERE booking_reference = ?");
            $stmt->execute([$booking_reference]);
            $existing = $stmt->fetch();
            if ($existing) {
                $booking_id = $existing['id'];
                error_log("Found existing booking with same reference: $booking_id");
            } else {
                error_log("ERROR: Booking was not inserted and lastInsertId is 0");
                jsonResponse(['success' => false, 'error' => 'فشل إدراج الحجز في قاعدة البيانات'], 500);
            }
        }
        
        error_log("Booking inserted successfully! Booking ID: $booking_id, Reference: $booking_reference");
        
        // التحقق من أن الحجز موجود فعلاً
        $stmt = $pdo->prepare("SELECT * FROM flight_bookings WHERE id = ?");
        $stmt->execute([$booking_id]);
        $verify = $stmt->fetch();
        if ($verify) {
            error_log("Verified: Booking exists in database");
        } else {
            error_log("WARNING: Booking ID $booking_id not found after insertion!");
        }
        
    } catch (PDOException $e) {
        error_log("PDO Exception during INSERT: " . $e->getMessage());
        error_log("SQL State: " . $e->getCode());
        error_log("Error Info: " . print_r($stmt->errorInfo() ?? [], true));
        throw $e;
    }
    
    jsonResponse([
        'success' => true,
        'message' => 'تم الحجز بنجاح',
        'booking_id' => $booking_id,
        'booking_reference' => $booking_reference,
        'total_price' => $total_price
    ]);
    
} catch (PDOException $e) {
    error_log("PDO Exception: " . $e->getMessage());
    error_log("SQL State: " . $e->getCode());
    jsonResponse(['success' => false, 'error' => 'خطأ في قاعدة البيانات: ' . $e->getMessage()], 500);
} catch (Exception $e) {
    error_log("General Exception: " . $e->getMessage());
    jsonResponse(['success' => false, 'error' => 'خطأ عام: ' . $e->getMessage()], 500);
}
?>

