<?php
/**
 * صفحة اختبار لإدخال فندق واحد للتحقق من أن الإدخال يعمل
 */

require_once 'config.php';

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html><html dir='rtl' lang='ar'><head><meta charset='UTF-8'><title>اختبار الإدخال</title>";
echo "<style>body{font-family:Arial;padding:20px;background:#1a1a2e;color:#fff;}";
echo ".success{color:#4ade80;}.error{color:#f87171;}</style></head><body>";

echo "<h1>اختبار إدخال فندق</h1>";

try {
    $pdo = getDBConnection();
    
    if (!$pdo) {
        die("<p class='error'>❌ فشل الاتصال بقاعدة البيانات</p>");
    }
    
    echo "<p class='success'>✅ الاتصال بقاعدة البيانات نجح</p>";
    
    // التحقق من عدد الفنادق قبل الإدخال
    $countBefore = $pdo->query("SELECT COUNT(*) as total FROM hotels")->fetch()['total'];
    echo "<p>عدد الفنادق قبل الإدخال: <strong>{$countBefore}</strong></p>";
    
    // محاولة إدخال فندق واحد
    $sql = "INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([
        'فندق الاختبار',
        'فندق للاختبار فقط',
        'الرياض',
        1,
        1,
        'متوسطة',
        4.5,
        200,
        '["واي فاي مجاني", "مطعم"]',
        TRUE,
        FALSE,
        FALSE,
        TRUE,
        FALSE,
        FALSE,
        FALSE
    ]);
    
    if ($result) {
        echo "<p class='success'>✅ تم إدخال الفندق بنجاح</p>";
    } else {
        echo "<p class='error'>❌ فشل إدخال الفندق</p>";
        $error = $stmt->errorInfo();
        echo "<p class='error'>خطأ: " . htmlspecialchars($error[2]) . "</p>";
    }
    
    // التحقق من عدد الفنادق بعد الإدخال
    $countAfter = $pdo->query("SELECT COUNT(*) as total FROM hotels")->fetch()['total'];
    echo "<p>عدد الفنادق بعد الإدخال: <strong>{$countAfter}</strong></p>";
    
    if ($countAfter > $countBefore) {
        echo "<p class='success'>✅ الإدخال نجح! تم إضافة " . ($countAfter - $countBefore) . " فندق</p>";
    } else {
        echo "<p class='error'>⚠️ لم يتم إضافة أي فندق. قد يكون الفندق موجوداً مسبقاً أو هناك خطأ.</p>";
    }
    
    // عرض جميع الفنادق
    echo "<hr><h2>جميع الفنادق:</h2>";
    $hotels = $pdo->query("SELECT id, name, location, budget, rating, price FROM hotels")->fetchAll();
    
    if (empty($hotels)) {
        echo "<p class='error'>❌ لا توجد فنادق في قاعدة البيانات</p>";
    } else {
        echo "<table border='1' cellpadding='10' style='border-collapse: collapse; width: 100%;'>";
        echo "<tr><th>ID</th><th>الاسم</th><th>الموقع</th><th>الميزانية</th><th>التقييم</th><th>السعر</th></tr>";
        foreach ($hotels as $hotel) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($hotel['id']) . "</td>";
            echo "<td>" . htmlspecialchars($hotel['name']) . "</td>";
            echo "<td>" . htmlspecialchars($hotel['location']) . "</td>";
            echo "<td>" . htmlspecialchars($hotel['budget'] ?? '') . "</td>";
            echo "<td>" . htmlspecialchars($hotel['rating'] ?? '0') . "</td>";
            echo "<td>" . htmlspecialchars($hotel['price'] ?? '0') . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    }
    
} catch (PDOException $e) {
    echo "<p class='error'>❌ خطأ: " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p class='error'>كود الخطأ: " . $e->getCode() . "</p>";
} catch (Exception $e) {
    echo "<p class='error'>❌ خطأ عام: " . htmlspecialchars($e->getMessage()) . "</p>";
}

echo "</body></html>";

?>

