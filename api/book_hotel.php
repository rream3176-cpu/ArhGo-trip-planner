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
error_log("=== Hotel Booking Request ===");
error_log("Received data: " . print_r($data, true));

$session_token = $data['session_token'] ?? '';
$hotel_id = (int)($data['hotel_id'] ?? 0);
$check_in_date = $data['check_in_date'] ?? '';
$check_out_date = $data['check_out_date'] ?? '';
$guests = (int)($data['guests'] ?? 1);
$rooms = (int)($data['rooms'] ?? 1);
$special_requests = sanitizeInput($data['special_requests'] ?? '');

error_log("Session token: " . substr($session_token, 0, 20) . "...");
error_log("Hotel ID: $hotel_id");
error_log("Check-in: $check_in_date");
error_log("Check-out: $check_out_date");

// التحقق من الجلسة
$user_id = verifySession($session_token);
error_log("User ID from session: " . ($user_id ? $user_id : 'NULL'));

if (!$user_id) {
    error_log("ERROR: User not authenticated");
    jsonResponse(['success' => false, 'error' => 'غير مصرح به. يرجى تسجيل الدخول'], 401);
}

if (empty($hotel_id) || empty($check_in_date) || empty($check_out_date)) {
    jsonResponse(['success' => false, 'error' => 'جميع الحقول مطلوبة'], 400);
}

try {
    $pdo = getDBConnection();
    
    // الحصول على سعر الفندق
    $stmt = $pdo->prepare("SELECT price FROM hotels WHERE id = ?");
    $stmt->execute([$hotel_id]);
    $hotel = $stmt->fetch();
    
    if (!$hotel) {
        jsonResponse(['success' => false, 'error' => 'الفندق غير موجود'], 404);
    }
    
    // حساب عدد الليالي
    $check_in = new DateTime($check_in_date);
    $check_out = new DateTime($check_out_date);
    $nights = $check_in->diff($check_out)->days;
    
    if ($nights <= 0) {
        jsonResponse(['success' => false, 'error' => 'تاريخ الخروج يجب أن يكون بعد تاريخ الدخول'], 400);
    }
    
    // حساب السعر الإجمالي
    $total_price = $hotel['price'] * $nights * $rooms;
    
    // إنشاء رمز الحجز
    $booking_reference = 'HTL' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
    
    // إدراج الحجز
    error_log("Inserting booking: user_id=$user_id, hotel_id=$hotel_id, check_in=$check_in_date, check_out=$check_out_date, guests=$guests, rooms=$rooms, price=$total_price");
    
    // التحقق من وجود الجدول
    $stmt = $pdo->query("SHOW TABLES LIKE 'hotel_bookings'");
    if ($stmt->rowCount() === 0) {
        error_log("ERROR: hotel_bookings table does not exist!");
        jsonResponse(['success' => false, 'error' => 'جدول hotel_bookings غير موجود في قاعدة البيانات'], 500);
    }
    
    // التحقق من وجود الفندق
    $stmt = $pdo->prepare("SELECT id FROM hotels WHERE id = ?");
    $stmt->execute([$hotel_id]);
    if ($stmt->rowCount() === 0) {
        error_log("ERROR: Hotel with ID $hotel_id does not exist!");
        jsonResponse(['success' => false, 'error' => "الفندق برقم $hotel_id غير موجود"], 404);
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO hotel_bookings (user_id, hotel_id, check_in_date, check_out_date, guests, rooms, total_price, booking_reference, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $result = $stmt->execute([$user_id, $hotel_id, $check_in_date, $check_out_date, $guests, $rooms, $total_price, $booking_reference, $special_requests]);
        
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
            $stmt = $pdo->prepare("SELECT id FROM hotel_bookings WHERE booking_reference = ?");
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
        $stmt = $pdo->prepare("SELECT * FROM hotel_bookings WHERE id = ?");
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
        throw $e; // Re-throw to be caught by outer catch
    }
    
    jsonResponse([
        'success' => true,
        'message' => 'تم الحجز بنجاح',
        'booking_id' => $booking_id,
        'booking_reference' => $booking_reference,
        'total_price' => $total_price,
        'nights' => $nights
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

