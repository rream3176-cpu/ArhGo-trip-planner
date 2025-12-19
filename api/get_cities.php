<?php
/**
 * API للحصول على قائمة المدن حسب الدولة
 */

require_once 'config.php';

$country_id = isset($_GET['country_id']) ? (int)$_GET['country_id'] : 0;

try {
    $pdo = getDBConnection();
    
    if ($country_id > 0) {
        $stmt = $pdo->prepare("
            SELECT 
                id,
                city_name_ar,
                city_name_en,
                country_id,
                description,
                latitude,
                longitude
            FROM cities
            WHERE country_id = ?
            ORDER BY city_name_ar ASC
        ");
        $stmt->execute([$country_id]);
    } else {
        $stmt = $pdo->query("
            SELECT 
                c.id,
                c.city_name_ar,
                c.city_name_en,
                c.country_id,
                c.description,
                c.latitude,
                c.longitude,
                a.country_name_ar
            FROM cities c
            INNER JOIN arab_countries_asia a ON c.country_id = a.id
            ORDER BY a.country_name_ar ASC, c.city_name_ar ASC
        ");
    }
    
    $cities = $stmt->fetchAll();
    
    jsonResponse([
        'success' => true,
        'data' => $cities,
        'count' => count($cities)
    ]);
    
} catch (PDOException $e) {
    jsonResponse([
        'success' => false,
        'error' => 'خطأ في جلب البيانات: ' . $e->getMessage()
    ], 500);
}

?>

