<?php
require_once 'config.php';
require_once 'auth_helper.php';
header('Content-Type: application/json; charset=utf-8');

// دعم GET و POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $session_token = $data['session_token'] ?? '';
} else {
    $session_token = $_GET['session_token'] ?? '';
}

if (empty($session_token)) {
    jsonResponse(['success' => false, 'error' => 'رمز الجلسة مطلوب'], 400);
}

$user_id = verifySession($session_token);
if (!$user_id) {
    jsonResponse(['success' => false, 'error' => 'غير مصرح به. يرجى تسجيل الدخول'], 401);
}

try {
    $pdo = getDBConnection();
    
    // الحصول على حجوزات الفنادق
    $stmt = $pdo->prepare("SELECT hb.*, h.name as hotel_name, h.location as hotel_location, h.price as hotel_price FROM hotel_bookings hb JOIN hotels h ON hb.hotel_id = h.id WHERE hb.user_id = ? ORDER BY hb.created_at DESC");
    $stmt->execute([$user_id]);
    $hotel_bookings = $stmt->fetchAll();
    
    // الحصول على حجوزات المطاعم
    $stmt = $pdo->prepare("SELECT rb.*, r.name as restaurant_name, r.location as restaurant_location, r.food_type FROM restaurant_bookings rb JOIN restaurants r ON rb.restaurant_id = r.id WHERE rb.user_id = ? ORDER BY rb.created_at DESC");
    $stmt->execute([$user_id]);
    $restaurant_bookings = $stmt->fetchAll();
    
    // الحصول على حجوزات الرحلات
    $stmt = $pdo->prepare("SELECT * FROM flight_bookings WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    $flight_bookings = $stmt->fetchAll();
    
    // الحصول على خطط السفر
    $stmt = $pdo->prepare("SELECT tp.*, c.country_name_ar, ci.city_name_ar FROM travel_plans tp LEFT JOIN arab_countries_asia c ON tp.country_id = c.id LEFT JOIN cities ci ON tp.city_id = ci.id WHERE tp.user_id = ? ORDER BY tp.created_at DESC");
    $stmt->execute([$user_id]);
    $travel_plans = $stmt->fetchAll();
    
    jsonResponse([
        'success' => true,
        'data' => [
            'hotel_bookings' => $hotel_bookings,
            'restaurant_bookings' => $restaurant_bookings,
            'flight_bookings' => $flight_bookings,
            'travel_plans' => $travel_plans
        ],
        'counts' => [
            'hotels' => count($hotel_bookings),
            'restaurants' => count($restaurant_bookings),
            'flights' => count($flight_bookings),
            'plans' => count($travel_plans)
        ]
    ]);
    
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'خطأ في قاعدة البيانات: ' . $e->getMessage()], 500);
} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => 'خطأ عام: ' . $e->getMessage()], 500);
}
?>

