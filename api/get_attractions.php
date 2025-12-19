<?php
/**
 * API للحصول على الأماكن السياحية
 */

require_once 'config.php';

$country_id = isset($_GET['country_id']) ? (int)$_GET['country_id'] : 0;
$city_id = isset($_GET['city_id']) ? (int)$_GET['city_id'] : 0;
$type = isset($_GET['type']) ? sanitizeInput($_GET['type']) : ''; // cultural, nature, adventure, food

try {
    $pdo = getDBConnection();
    
    // استخدام جدول restaurants للطعام
    if ($type === 'food') {
        $sql = "
            SELECT 
                r.id,
                r.name,
                r.description,
                r.location,
                r.city_id,
                r.country_id,
                r.food_type as type,
                r.rating,
                r.price_range,
                r.open_hour,
                r.close_hour,
                r.address,
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
        
        $sql .= " ORDER BY r.rating DESC LIMIT 50";
        
    } else {
        // للأنواع الأخرى، نستخدم جدول منفصل أو نعيد بيانات من JavaScript
        // حالياً سنعيد بيانات فارغة ونستخدم JavaScript
        jsonResponse([
            'success' => true,
            'data' => [],
            'count' => 0,
            'message' => 'استخدم قاعدة البيانات JavaScript'
        ]);
        exit;
    }
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    $attractions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    jsonResponse([
        'success' => true,
        'data' => $attractions,
        'count' => count($attractions)
    ]);
    
} catch (PDOException $e) {
    jsonResponse([
        'success' => false,
        'error' => 'خطأ في جلب البيانات: ' . $e->getMessage()
    ], 500);
}

?>

