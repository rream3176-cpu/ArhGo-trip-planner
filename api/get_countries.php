<?php
/**
 * API للحصول على قائمة الدول العربية في آسيا
 */

require_once 'config.php';

try {
    $pdo = getDBConnection();
    
    $stmt = $pdo->query("
        SELECT 
            id,
            country_name_ar,
            country_name_en,
            country_code,
            capital,
            currency
        FROM arab_countries_asia
        ORDER BY country_name_ar ASC
    ");
    
    $countries = $stmt->fetchAll();
    
    jsonResponse([
        'success' => true,
        'data' => $countries,
        'count' => count($countries)
    ]);
    
} catch (PDOException $e) {
    jsonResponse([
        'success' => false,
        'error' => 'خطأ في جلب البيانات: ' . $e->getMessage()
    ], 500);
}

?>

