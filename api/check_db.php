<?php
/**
 * صفحة بسيطة للتحقق من قاعدة البيانات
 */

require_once 'config.php';

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html><html dir='rtl' lang='ar'><head><meta charset='UTF-8'><title>فحص قاعدة البيانات</title>";
echo "<style>body{font-family:Arial;padding:20px;background:#1a1a2e;color:#fff;}";
echo "table{border-collapse:collapse;width:100%;margin:20px 0;}";
echo "th,td{border:1px solid #37D6C0;padding:10px;text-align:right;}";
echo "th{background:#37D6C0;color:#1a1a2e;}";
echo ".success{color:#4ade80;}.error{color:#f87171;}</style></head><body>";

echo "<h1>فحص قاعدة البيانات</h1>";

try {
    $pdo = getDBConnection();
    
    if (!$pdo) {
        echo "<p class='error'>❌ فشل الاتصال بقاعدة البيانات</p>";
        exit;
    }
    
    echo "<p class='success'>✅ الاتصال بقاعدة البيانات نجح</p>";
    echo "<hr>";
    
    // التحقق من وجود الجدول
    $tables = $pdo->query("SHOW TABLES LIKE 'hotels'")->fetchAll();
    if (empty($tables)) {
        echo "<p class='error'>❌ جدول 'hotels' غير موجود</p>";
    } else {
        echo "<p class='success'>✅ جدول 'hotels' موجود</p>";
    }
    
    // عدد الفنادق
    try {
        $countStmt = $pdo->query("SELECT COUNT(*) as total FROM hotels");
        $total = $countStmt->fetch()['total'];
        echo "<h2>عدد الفنادق في قاعدة البيانات: <span style='color:#37D6C0;'>{$total}</span></h2>";
        
        if ($total == 0) {
            echo "<p class='error'>⚠️ قاعدة البيانات فارغة! يجب إدخال البيانات أولاً.</p>";
            echo "<p>افتح phpMyAdmin ونفذ ملفات SQL من مجلد <code>database/</code></p>";
        } else {
            // عرض أول 10 فنادق
            $stmt = $pdo->query("SELECT id, name, location, budget, rating, price FROM hotels LIMIT 10");
            $hotels = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo "<h3>أول 10 فنادق:</h3>";
            echo "<table>";
            echo "<tr><th>ID</th><th>الاسم</th><th>الموقع</th><th>الميزانية</th><th>التقييم</th><th>السعر</th></tr>";
            
            foreach ($hotels as $hotel) {
                echo "<tr>";
                echo "<td>" . htmlspecialchars($hotel['id']) . "</td>";
                echo "<td>" . htmlspecialchars($hotel['name'] ?? '') . "</td>";
                echo "<td>" . htmlspecialchars($hotel['location'] ?? '') . "</td>";
                echo "<td>" . htmlspecialchars($hotel['budget'] ?? '') . "</td>";
                echo "<td>" . htmlspecialchars($hotel['rating'] ?? '0') . "</td>";
                echo "<td>" . htmlspecialchars($hotel['price'] ?? '0') . "</td>";
                echo "</tr>";
            }
            
            echo "</table>";
        }
    } catch (PDOException $e) {
        echo "<p class='error'>❌ خطأ في الاستعلام: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
    
    // اختبار API
    echo "<hr>";
    echo "<h2>اختبار API:</h2>";
    echo "<p><a href='get_hotels.php' target='_blank' style='color:#37D6C0;'>افتح get_hotels.php</a></p>";
    echo "<p><a href='get_hotels.php?location=دبي' target='_blank' style='color:#37D6C0;'>افتح get_hotels.php?location=دبي</a></p>";
    
} catch (PDOException $e) {
    echo "<p class='error'>❌ خطأ: " . htmlspecialchars($e->getMessage()) . "</p>";
} catch (Exception $e) {
    echo "<p class='error'>❌ خطأ عام: " . htmlspecialchars($e->getMessage()) . "</p>";
}

echo "</body></html>";

?>

