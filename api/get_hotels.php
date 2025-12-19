<?php
/**
 * API للحصول على قائمة الفنادق
 */

require_once 'config.php';

// تفعيل عرض الأخطاء للتشخيص (في بيئة التطوير فقط)
error_reporting(E_ALL);
ini_set('display_errors', 1);

$country_id = isset($_GET['country_id']) ? (int)$_GET['country_id'] : 0;
$city_id = isset($_GET['city_id']) ? (int)$_GET['city_id'] : 0;
$budget = isset($_GET['budget']) ? sanitizeInput($_GET['budget']) : '';
$location = isset($_GET['location']) ? sanitizeInput($_GET['location']) : '';

try {
    $pdo = getDBConnection();
    
    // اختبار الاتصال
    if (!$pdo) {
        throw new Exception('فشل الاتصال بقاعدة البيانات');
    }
    
    // التحقق من وجود البيانات أولاً
    $countStmt = $pdo->query("SELECT COUNT(*) as total FROM hotels");
    $totalCount = $countStmt->fetch()['total'];
    
    // جلب مباشر من جدول hotels بدون JOIN (للتأكد من أن البيانات موجودة)
    $sql = "SELECT * FROM hotels WHERE 1=1";
    $params = [];
    
    if ($country_id > 0) {
        $sql .= " AND country_id = ?";
        $params[] = $country_id;
    }
    
    if ($city_id > 0) {
        $sql .= " AND city_id = ?";
        $params[] = $city_id;
    }
    
    if ($budget) {
        $sql .= " AND budget = ?";
        $params[] = $budget;
    }
    
    if ($location) {
        // البحث في location و name و description
        $sql .= " AND (location LIKE ? OR name LIKE ? OR description LIKE ?)";
        $locationParam = "%$location%";
        $params[] = $locationParam;
        $params[] = $locationParam;
        $params[] = $locationParam;
    }
    
    $sql .= " ORDER BY rating DESC, price ASC LIMIT 100";
    
    // تسجيل الاستعلام للتشخيص
    error_log("SQL Query: $sql");
    error_log("Params: " . json_encode($params, JSON_UNESCAPED_UNICODE));
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $hotels = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // تسجيل عدد النتائج
    error_log("Hotels found: " . count($hotels));
    
    // تحويل البيانات إلى التنسيق المطلوب
    $formattedHotels = [];
    
    // تسجيل تشخيصي
    error_log("Total hotels in DB: $totalCount");
    error_log("Hotels found after query: " . count($hotels));
    error_log("SQL: $sql");
    error_log("Params: " . json_encode($params));
    
    foreach ($hotels as $hotel) {
        // معالجة features
        $features = [];
        if (isset($hotel['features']) && $hotel['features']) {
            $decoded = json_decode($hotel['features'], true);
            $features = is_array($decoded) ? $decoded : [];
        }
        
        // بناء features من الأعمدة المنفصلة إذا لم تكن موجودة
        if (empty($features)) {
            if (!empty($hotel['wifi'])) $features[] = 'واي فاي مجاني';
            if (!empty($hotel['pool'])) $features[] = 'مسبح';
            if (!empty($hotel['spa'])) $features[] = 'سبا';
            if (!empty($hotel['restaurant'])) $features[] = 'مطعم';
            if (!empty($hotel['gym'])) $features[] = 'جيم';
            if (!empty($hotel['beach_access'])) $features[] = 'شاطئ خاص';
            if (!empty($hotel['concierge'])) $features[] = 'كونسيرج';
        }
        
        $formattedHotels[] = [
            'id' => $hotel['id'],
            'name' => $hotel['name'],
            'description' => $hotel['description'] ?? '',
            'location' => $hotel['location'] ?? '',
            'city_name_ar' => $hotel['location'] ?? '', // استخدام location كاسم المدينة
            'country_name_ar' => '', // سنتركه فارغاً مؤقتاً
            'city_id' => $hotel['city_id'] ?? null,
            'country_id' => $hotel['country_id'] ?? null,
            'budget' => $hotel['budget'] ?? '',
            'rating' => floatval($hotel['rating'] ?? 0),
            'price' => floatval($hotel['price'] ?? 0),
            'features' => $features,
            'wifi' => !empty($hotel['wifi']),
            'pool' => !empty($hotel['pool']),
            'spa' => !empty($hotel['spa']),
            'restaurant' => !empty($hotel['restaurant']),
            'gym' => !empty($hotel['gym']),
            'beach_access' => !empty($hotel['beach_access']),
            'concierge' => !empty($hotel['concierge'])
        ];
    }
    
    // إرجاع النتيجة مع معلومات تشخيصية
    jsonResponse([
        'success' => true,
        'data' => $formattedHotels,
        'count' => count($formattedHotels),
        'total_in_db' => $totalCount,
        'query_params' => [
            'country_id' => $country_id,
            'city_id' => $city_id,
            'budget' => $budget,
            'location' => $location
        ],
        'debug' => [
            'sql' => $sql,
            'params_count' => count($params),
            'raw_hotels_count' => count($hotels),
            'formatted_hotels_count' => count($formattedHotels)
        ]
    ]);
    
} catch (PDOException $e) {
    jsonResponse([
        'success' => false,
        'error' => 'خطأ في جلب البيانات: ' . $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ], 500);
} catch (Exception $e) {
    jsonResponse([
        'success' => false,
        'error' => 'خطأ عام: ' . $e->getMessage()
    ], 500);
}

?>

