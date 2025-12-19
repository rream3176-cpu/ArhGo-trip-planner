<?php
/**
 * ملف اختبار لعرض جميع الحجوزات في قاعدة البيانات
 * Test file to display all bookings in the database
 */

require_once 'config.php';

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html>
<html dir='rtl' lang='ar'>
<head>
    <meta charset='UTF-8'>
    <title>اختبار الحجوزات - ArhGo</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; background: #1a1f2e; color: #fff; }
        h1 { color: #37D6C0; }
        h2 { color: #37D6C0; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; background: rgba(22, 58, 95, 0.9); }
        th, td { padding: 12px; border: 1px solid rgba(55, 214, 192, 0.3); text-align: right; }
        th { background: rgba(55, 214, 192, 0.2); color: #37D6C0; font-weight: bold; }
        tr:hover { background: rgba(55, 214, 192, 0.1); }
        .error { color: #ff6b6b; background: rgba(255, 107, 107, 0.1); padding: 10px; border-radius: 5px; margin: 10px 0; }
        .success { color: #51cf66; background: rgba(81, 207, 102, 0.1); padding: 10px; border-radius: 5px; margin: 10px 0; }
        .info { color: #4dabf7; background: rgba(77, 171, 247, 0.1); padding: 10px; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <h1>🔍 اختبار الحجوزات - ArhGo</h1>
";

try {
    $pdo = getDBConnection();
    
    echo "<div class='success'>✅ تم الاتصال بقاعدة البيانات: " . DB_NAME . "</div>";
    
    // عرض حجوزات الفنادق
    echo "<h2>🏨 حجوزات الفنادق</h2>";
    $stmt = $pdo->query("SELECT hb.*, h.name as hotel_name, h.location as hotel_location, u.full_name as user_name, u.email as user_email 
                         FROM hotel_bookings hb 
                         LEFT JOIN hotels h ON hb.hotel_id = h.id 
                         LEFT JOIN users u ON hb.user_id = u.id 
                         ORDER BY hb.created_at DESC");
    $hotel_bookings = $stmt->fetchAll();
    
    if (count($hotel_bookings) > 0) {
        echo "<table>";
        echo "<tr>
                <th>ID</th>
                <th>المستخدم</th>
                <th>اسم الفندق</th>
                <th>الموقع</th>
                <th>تاريخ الوصول</th>
                <th>تاريخ المغادرة</th>
                <th>الضيوف</th>
                <th>الغرف</th>
                <th>السعر</th>
                <th>الحالة</th>
                <th>رقم الحجز</th>
                <th>تاريخ الحجز</th>
              </tr>";
        foreach ($hotel_bookings as $booking) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($booking['id']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['user_name'] ?? 'غير معروف') . "</td>";
            echo "<td>" . htmlspecialchars($booking['hotel_name'] ?? 'غير معروف') . "</td>";
            echo "<td>" . htmlspecialchars($booking['hotel_location'] ?? 'غير معروف') . "</td>";
            echo "<td>" . htmlspecialchars($booking['check_in_date']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['check_out_date']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['guests']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['rooms']) . "</td>";
            echo "<td>$" . number_format($booking['total_price'], 2) . "</td>";
            echo "<td>" . htmlspecialchars($booking['status']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['booking_reference']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['created_at']) . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        echo "<div class='info'>📊 العدد الإجمالي: " . count($hotel_bookings) . " حجز</div>";
    } else {
        echo "<div class='error'>⚠️ لا توجد حجوزات فنادق في قاعدة البيانات</div>";
    }
    
    // عرض حجوزات المطاعم
    echo "<h2>🍽️ حجوزات المطاعم</h2>";
    $stmt = $pdo->query("SELECT rb.*, r.name as restaurant_name, r.location as restaurant_location, u.full_name as user_name, u.email as user_email 
                         FROM restaurant_bookings rb 
                         LEFT JOIN restaurants r ON rb.restaurant_id = r.id 
                         LEFT JOIN users u ON rb.user_id = u.id 
                         ORDER BY rb.created_at DESC");
    $restaurant_bookings = $stmt->fetchAll();
    
    if (count($restaurant_bookings) > 0) {
        echo "<table>";
        echo "<tr>
                <th>ID</th>
                <th>المستخدم</th>
                <th>اسم المطعم</th>
                <th>الموقع</th>
                <th>التاريخ</th>
                <th>الوقت</th>
                <th>عدد الأشخاص</th>
                <th>السعر</th>
                <th>الحالة</th>
                <th>رقم الحجز</th>
                <th>تاريخ الحجز</th>
              </tr>";
        foreach ($restaurant_bookings as $booking) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($booking['id']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['user_name'] ?? 'غير معروف') . "</td>";
            echo "<td>" . htmlspecialchars($booking['restaurant_name'] ?? 'غير معروف') . "</td>";
            echo "<td>" . htmlspecialchars($booking['restaurant_location'] ?? 'غير معروف') . "</td>";
            echo "<td>" . htmlspecialchars($booking['booking_date']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['booking_time']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['guests']) . "</td>";
            echo "<td>$" . number_format($booking['total_price'], 2) . "</td>";
            echo "<td>" . htmlspecialchars($booking['status']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['booking_reference']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['created_at']) . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        echo "<div class='info'>📊 العدد الإجمالي: " . count($restaurant_bookings) . " حجز</div>";
    } else {
        echo "<div class='error'>⚠️ لا توجد حجوزات مطاعم في قاعدة البيانات</div>";
    }
    
    // عرض حجوزات الرحلات
    echo "<h2>✈️ حجوزات الرحلات الجوية</h2>";
    $stmt = $pdo->query("SELECT fb.*, u.full_name as user_name, u.email as user_email 
                         FROM flight_bookings fb 
                         LEFT JOIN users u ON fb.user_id = u.id 
                         ORDER BY fb.created_at DESC");
    $flight_bookings = $stmt->fetchAll();
    
    if (count($flight_bookings) > 0) {
        echo "<table>";
        echo "<tr>
                <th>ID</th>
                <th>المستخدم</th>
                <th>من</th>
                <th>إلى</th>
                <th>تاريخ المغادرة</th>
                <th>تاريخ العودة</th>
                <th>المسافرون</th>
                <th>الدرجة</th>
                <th>السعر</th>
                <th>الحالة</th>
                <th>رقم الحجز</th>
                <th>تاريخ الحجز</th>
              </tr>";
        foreach ($flight_bookings as $booking) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($booking['id']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['user_name'] ?? 'غير معروف') . "</td>";
            echo "<td>" . htmlspecialchars($booking['from_city']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['to_city']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['departure_date']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['return_date'] ?? '—') . "</td>";
            echo "<td>" . htmlspecialchars($booking['passengers']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['class_type']) . "</td>";
            echo "<td>$" . number_format($booking['total_price'], 2) . "</td>";
            echo "<td>" . htmlspecialchars($booking['status']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['booking_reference']) . "</td>";
            echo "<td>" . htmlspecialchars($booking['created_at']) . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        echo "<div class='info'>📊 العدد الإجمالي: " . count($flight_bookings) . " حجز</div>";
    } else {
        echo "<div class='error'>⚠️ لا توجد حجوزات رحلات في قاعدة البيانات</div>";
    }
    
    // عرض المستخدمين
    echo "<h2>👥 المستخدمون</h2>";
    $stmt = $pdo->query("SELECT id, full_name, email, created_at FROM users ORDER BY created_at DESC");
    $users = $stmt->fetchAll();
    
    if (count($users) > 0) {
        echo "<table>";
        echo "<tr>
                <th>ID</th>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>تاريخ التسجيل</th>
              </tr>";
        foreach ($users as $user) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($user['id']) . "</td>";
            echo "<td>" . htmlspecialchars($user['full_name']) . "</td>";
            echo "<td>" . htmlspecialchars($user['email']) . "</td>";
            echo "<td>" . htmlspecialchars($user['created_at']) . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        echo "<div class='info'>📊 العدد الإجمالي: " . count($users) . " مستخدم</div>";
    } else {
        echo "<div class='error'>⚠️ لا يوجد مستخدمون في قاعدة البيانات</div>";
    }
    
} catch (PDOException $e) {
    echo "<div class='error'>❌ خطأ في قاعدة البيانات: " . htmlspecialchars($e->getMessage()) . "</div>";
    echo "<div class='info'>💡 تأكد من أن قاعدة البيانات '" . DB_NAME . "' موجودة وأن الجداول تم إنشاؤها</div>";
} catch (Exception $e) {
    echo "<div class='error'>❌ خطأ عام: " . htmlspecialchars($e->getMessage()) . "</div>";
}

echo "</body></html>";
?>

