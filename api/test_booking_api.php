<?php
/**
 * ملف اختبار لـ API الحجز
 * Test file for booking API
 */

require_once 'config.php';
require_once 'auth_helper.php';

header('Content-Type: application/json; charset=utf-8');

// اختبار الاتصال بقاعدة البيانات
try {
    $pdo = getDBConnection();
    echo json_encode([
        'success' => true,
        'message' => '✅ تم الاتصال بقاعدة البيانات: ' . DB_NAME,
        'database' => DB_NAME
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => '❌ خطأ في الاتصال: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// التحقق من وجود الجداول
try {
    $tables = ['users', 'hotel_bookings', 'restaurant_bookings', 'flight_bookings'];
    $existing_tables = [];
    
    foreach ($tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            $existing_tables[] = $table;
        }
    }
    
    echo "\n\n";
    echo json_encode([
        'success' => true,
        'message' => 'الجداول الموجودة:',
        'tables' => $existing_tables,
        'all_tables_exist' => count($existing_tables) === count($tables)
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
    // عرض عدد المستخدمين
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $user_count = $stmt->fetch()['count'];
    
    echo "\n\n";
    echo json_encode([
        'success' => true,
        'message' => 'عدد المستخدمين:',
        'user_count' => $user_count
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
    // عرض عدد الحجوزات
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM hotel_bookings");
    $hotel_bookings_count = $stmt->fetch()['count'];
    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM restaurant_bookings");
    $restaurant_bookings_count = $stmt->fetch()['count'];
    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM flight_bookings");
    $flight_bookings_count = $stmt->fetch()['count'];
    
    echo "\n\n";
    echo json_encode([
        'success' => true,
        'message' => 'عدد الحجوزات:',
        'hotel_bookings' => $hotel_bookings_count,
        'restaurant_bookings' => $restaurant_bookings_count,
        'flight_bookings' => $flight_bookings_count
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
    // عرض آخر 5 مستخدمين
    $stmt = $pdo->query("SELECT id, full_name, email, created_at FROM users ORDER BY created_at DESC LIMIT 5");
    $users = $stmt->fetchAll();
    
    echo "\n\n";
    echo json_encode([
        'success' => true,
        'message' => 'آخر 5 مستخدمين:',
        'users' => $users
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    echo "\n\n";
    echo json_encode([
        'success' => false,
        'error' => '❌ خطأ في التحقق من الجداول: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>

