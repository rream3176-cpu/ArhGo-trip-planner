<?php
require_once 'config.php';
header('Content-Type: text/html; charset=utf-8');

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);

echo "<!DOCTYPE html><html lang='ar' dir='rtl'><head><meta charset='UTF-8'><title>اختبار المطاعم</title>";
echo "<style>
    body { font-family: Arial; background: #1a2a3a; color: #fff; padding: 20px; }
    .success { background: #28a745; padding: 10px; margin: 10px 0; border-radius: 5px; }
    .error { background: #dc3545; padding: 10px; margin: 10px 0; border-radius: 5px; }
    .info { background: #17a2b8; padding: 10px; margin: 10px 0; border-radius: 5px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #3a4a5a; padding: 8px; text-align: right; }
    th { background: #37D6C0; color: #1a2a3a; }
</style></head><body>";
echo "<h1>🔍 اختبار المطاعم - ArhGo</h1>";

try {
    $pdo = getDBConnection();
    echo "<div class='success'>✅ تم الاتصال بقاعدة البيانات: " . DB_NAME . "</div>";
    
    // التحقق من وجود الجدول
    $stmt = $pdo->query("SHOW TABLES LIKE 'restaurants'");
    if ($stmt->rowCount() === 0) {
        echo "<div class='error'>❌ جدول restaurants غير موجود!</div>";
        echo "<div class='info'>💡 نصيحة: نفّذ ملف database/CREATE_NEW_DATABASE.sql أولاً</div>";
        exit;
    }
    echo "<div class='success'>✅ جدول restaurants موجود</div>";
    
    // عدد المطاعم الإجمالي
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM restaurants");
    $total = $stmt->fetch()['total'];
    echo "<div class='info'>📊 إجمالي المطاعم في قاعدة البيانات: <strong>$total</strong></div>";
    
    if ($total == 0) {
        echo "<div class='error'>❌ لا توجد مطاعم في قاعدة البيانات!</div>";
        echo "<div class='info'>💡 نصيحة: نفّذ ملف database/INSERT_RESTAURANTS_NEW.sql في MySQL Workbench</div>";
        exit;
    }
    
    // عرض أول 10 مطاعم
    $stmt = $pdo->query("
        SELECT 
            r.id,
            r.name,
            r.location,
            r.food_type,
            r.rating,
            r.price_range,
            r.city_id,
            r.country_id,
            COALESCE(c.city_name_ar, 'غير محدد') as city_name,
            COALESCE(a.country_name_ar, 'غير محدد') as country_name
        FROM restaurants r
        LEFT JOIN cities c ON r.city_id = c.id
        LEFT JOIN arab_countries_asia a ON r.country_id = a.id
        ORDER BY r.id
        LIMIT 10
    ");
    $restaurants = $stmt->fetchAll();
    
    echo "<h2>أول 10 مطاعم:</h2>";
    echo "<table>";
    echo "<thead><tr><th>ID</th><th>الاسم</th><th>الموقع</th><th>نوع الطعام</th><th>التقييم</th><th>السعر</th><th>المدينة</th><th>الدولة</th></tr></thead>";
    echo "<tbody>";
    foreach ($restaurants as $r) {
        echo "<tr>";
        echo "<td>{$r['id']}</td>";
        echo "<td>{$r['name']}</td>";
        echo "<td>{$r['location']}</td>";
        echo "<td>{$r['food_type']}</td>";
        echo "<td>{$r['rating']}</td>";
        echo "<td>{$r['price_range']}</td>";
        echo "<td>{$r['city_name']}</td>";
        echo "<td>{$r['country_name']}</td>";
        echo "</tr>";
    }
    echo "</tbody></table>";
    
    // اختبار API مباشرة
    echo "<h2>اختبار API:</h2>";
    echo "<div class='info'>🔗 <a href='get_restaurants.php' target='_blank' style='color: #37D6C0;'>افتح get_restaurants.php</a></div>";
    echo "<div class='info'>🔗 <a href='get_restaurants.php?food_type=عربي' target='_blank' style='color: #37D6C0;'>افتح get_restaurants.php?food_type=عربي</a></div>";
    
} catch (PDOException $e) {
    echo "<div class='error'>❌ خطأ في قاعدة البيانات: " . $e->getMessage() . "</div>";
} catch (Exception $e) {
    echo "<div class='error'>❌ خطأ عام: " . $e->getMessage() . "</div>";
}

echo "</body></html>";
?>

