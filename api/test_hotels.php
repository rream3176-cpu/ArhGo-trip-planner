<?php
/**
 * صفحة اختبار بسيطة للتحقق من وجود البيانات
 */

require_once 'config.php';

header('Content-Type: text/html; charset=utf-8');

try {
    $pdo = getDBConnection();
    
    if (!$pdo) {
        die("❌ فشل الاتصال بقاعدة البيانات");
    }
    
    echo "<h1>اختبار قاعدة البيانات</h1>";
    echo "<hr>";
    
    // عدد الفنادق الإجمالي
    $countStmt = $pdo->query("SELECT COUNT(*) as total FROM hotels");
    $total = $countStmt->fetch()['total'];
    echo "<p><strong>عدد الفنادق في قاعدة البيانات:</strong> $total</p>";
    
    // عرض أول 5 فنادق
    $stmt = $pdo->query("SELECT id, name, location, budget, rating, price FROM hotels LIMIT 5");
    $hotels = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<h2>أول 5 فنادق:</h2>";
    echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
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
    
    // اختبار API
    echo "<hr>";
    echo "<h2>اختبار API:</h2>";
    echo "<p><a href='get_hotels.php' target='_blank'>افتح get_hotels.php</a></p>";
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ خطأ: " . htmlspecialchars($e->getMessage()) . "</p>";
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ خطأ عام: " . htmlspecialchars($e->getMessage()) . "</p>";
}

?>

