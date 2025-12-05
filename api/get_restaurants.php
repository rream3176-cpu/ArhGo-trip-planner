<?php
/**
 * API للحصول على قائمة المطاعم
 */

require_once 'config.php';

// تفعيل تسجيل الأخطاء
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

$country_id = isset($_GET['country_id']) ? (int)$_GET['country_id'] : 0;
$city_id = isset($_GET['city_id']) ? (int)$_GET['city_id'] : 0;
$food_type = isset($_GET['food_type']) ? sanitizeInput($_GET['food_type']) : '';
$location = isset($_GET['location']) ? sanitizeInput($_GET['location']) : '';

error_log("=== Get Restaurants Request ===");
error_log("Parameters: country_id=$country_id, city_id=$city_id, food_type=$food_type, location=$location");

try {
    $pdo = getDBConnection();
    
    // التحقق من وجود الجدول
    $stmt = $pdo->query("SHOW TABLES LIKE 'restaurants'");
    if ($stmt->rowCount() === 0) {
        error_log("ERROR: restaurants table does not exist!");
        jsonResponse([
            'success' => false,
            'error' => 'جدول restaurants غير موجود في قاعدة البيانات',
            'data' => [],
            'count' => 0
        ], 500);
    }
    
    // حساب عدد المطاعم الإجمالي
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM restaurants");
    $total_count = $stmt->fetch()['total'];
    error_log("Total restaurants in database: $total_count");
    
    $sql = "
        SELECT 
            r.id,
            r.name,
            r.description,
            r.location,
            r.city_id,
            r.country_id,
            r.food_type,
            r.rating,
            r.price_range,
            r.open_hour,
            r.close_hour,
            COALESCE(c.city_name_ar, r.location) as city_name_ar,
            COALESCE(a.country_name_ar, '') as country_name_ar
        FROM restaurants r
        LEFT JOIN cities c ON r.city_id = c.id
        LEFT JOIN arab_countries_asia a ON r.country_id = a.id
        WHERE 1=1
    ";
    
    $params = [];
    
    if ($country_id > 0) {
        $sql .= " AND r.country_id = ?";
        $params[] = $country_id;
    }
    
    if ($city_id > 0) {
        $sql .= " AND r.city_id = ?";
        $params[] = $city_id;
    }
    
    if ($food_type) {
        $sql .= " AND r.food_type LIKE ?";
        $params[] = "%$food_type%";
    }
    
    if ($location) {
        $sql .= " AND (
            r.location LIKE ? OR 
            COALESCE(c.city_name_ar, '') LIKE ? OR 
            COALESCE(c.city_name_en, '') LIKE ? OR
            COALESCE(a.country_name_ar, '') LIKE ? OR
            COALESCE(a.country_name_en, '') LIKE ? OR
            r.name LIKE ?
        )";
        $locationParam = "%$location%";
        $params[] = $locationParam;
        $params[] = $locationParam;
        $params[] = $locationParam;
        $params[] = $locationParam;
        $params[] = $locationParam;
        $params[] = $locationParam;
    }
    
    $sql .= " ORDER BY r.rating DESC LIMIT 100";
    
    error_log("SQL Query: $sql");
    error_log("Parameters: " . print_r($params, true));
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    $restaurants = $stmt->fetchAll();
    
    error_log("Found " . count($restaurants) . " restaurants");
    
    jsonResponse([
        'success' => true,
        'data' => $restaurants,
        'count' => count($restaurants),
        'total_in_db' => $total_count
    ]);
    
} catch (PDOException $e) {
    jsonResponse([
        'success' => false,
        'error' => 'خطأ في جلب البيانات: ' . $e->getMessage()
    ], 500);
}

?>

