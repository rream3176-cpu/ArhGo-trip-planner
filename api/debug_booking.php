<?php
/**
 * ملف تشخيص شامل لحل مشكلة الحجوزات
 */

require_once 'config.php';
require_once 'auth_helper.php';

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html>
<html dir='rtl' lang='ar'>
<head>
    <meta charset='UTF-8'>
    <title>تشخيص الحجوزات - ArhGo</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; background: #1a1f2e; color: #fff; }
        h1 { color: #37D6C0; }
        h2 { color: #37D6C0; margin-top: 30px; border-bottom: 2px solid #37D6C0; padding-bottom: 10px; }
        .check { padding: 15px; margin: 10px 0; border-radius: 8px; }
        .success { background: rgba(81, 207, 102, 0.2); border: 2px solid #51cf66; color: #51cf66; }
        .error { background: rgba(255, 107, 107, 0.2); border: 2px solid #ff6b6b; color: #ff6b6b; }
        .warning { background: rgba(251, 191, 36, 0.2); border: 2px solid #FBBF24; color: #FBBF24; }
        .info { background: rgba(77, 171, 247, 0.2); border: 2px solid #4dabf7; color: #4dabf7; }
        pre { background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px; overflow-x: auto; }
        code { color: #37D6C0; }
    </style>
</head>
<body>
    <h1>🔍 تشخيص مشكلة الحجوزات - ArhGo</h1>
";

// 1. التحقق من الاتصال بقاعدة البيانات
echo "<h2>1. التحقق من الاتصال بقاعدة البيانات</h2>";
try {
    $pdo = getDBConnection();
    echo "<div class='check success'>✅ تم الاتصال بقاعدة البيانات: <code>" . DB_NAME . "</code></div>";
} catch (Exception $e) {
    echo "<div class='check error'>❌ فشل الاتصال: " . htmlspecialchars($e->getMessage()) . "</div>";
    echo "</body></html>";
    exit;
}

// 2. التحقق من وجود الجداول
echo "<h2>2. التحقق من وجود الجداول</h2>";
$required_tables = ['users', 'hotel_bookings', 'restaurant_bookings', 'flight_bookings', 'travel_plans'];
$existing_tables = [];

try {
    $stmt = $pdo->query("SHOW TABLES");
    $all_tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    foreach ($required_tables as $table) {
        if (in_array($table, $all_tables)) {
            echo "<div class='check success'>✅ جدول <code>$table</code> موجود</div>";
            $existing_tables[] = $table;
        } else {
            echo "<div class='check error'>❌ جدول <code>$table</code> غير موجود!</div>";
        }
    }
} catch (Exception $e) {
    echo "<div class='check error'>❌ خطأ في التحقق من الجداول: " . htmlspecialchars($e->getMessage()) . "</div>";
}

// 3. التحقق من عدد المستخدمين
echo "<h2>3. التحقق من المستخدمين</h2>";
try {
    if (in_array('users', $existing_tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
        $user_count = $stmt->fetch()['count'];
        echo "<div class='check info'>📊 عدد المستخدمين: <code>$user_count</code></div>";
        
        if ($user_count > 0) {
            $stmt = $pdo->query("SELECT id, full_name, email FROM users ORDER BY created_at DESC LIMIT 5");
            $users = $stmt->fetchAll();
            echo "<div class='check info'><strong>آخر 5 مستخدمين:</strong><pre>";
            foreach ($users as $user) {
                echo "ID: {$user['id']} - {$user['full_name']} ({$user['email']})\n";
            }
            echo "</pre></div>";
        } else {
            echo "<div class='check warning'>⚠️ لا يوجد مستخدمون في قاعدة البيانات. يجب إنشاء حساب أولاً.</div>";
        }
    }
} catch (Exception $e) {
    echo "<div class='check error'>❌ خطأ: " . htmlspecialchars($e->getMessage()) . "</div>";
}

// 4. التحقق من عدد الحجوزات
echo "<h2>4. التحقق من الحجوزات الموجودة</h2>";
$booking_tables = [
    'hotel_bookings' => 'حجوزات الفنادق',
    'restaurant_bookings' => 'حجوزات المطاعم',
    'flight_bookings' => 'حجوزات الرحلات',
    'travel_plans' => 'خطط السفر'
];

foreach ($booking_tables as $table => $name) {
    try {
        if (in_array($table, $existing_tables)) {
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM $table");
            $count = $stmt->fetch()['count'];
            echo "<div class='check info'>📊 $name: <code>$count</code> حجز</div>";
            
            if ($count > 0) {
                $stmt = $pdo->query("SELECT * FROM $table ORDER BY created_at DESC LIMIT 3");
                $bookings = $stmt->fetchAll();
                echo "<div class='check success'><strong>آخر 3 حجوزات:</strong><pre>";
                foreach ($bookings as $booking) {
                    echo json_encode($booking, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n\n";
                }
                echo "</pre></div>";
            }
        }
    } catch (Exception $e) {
        echo "<div class='check error'>❌ خطأ في $name: " . htmlspecialchars($e->getMessage()) . "</div>";
    }
}

// 5. اختبار API مباشرة
echo "<h2>5. اختبار APIs مباشرة</h2>";
echo "<div class='check info'>";
echo "<p><strong>لاختبار APIs، افتح Console (F12) في المتصفح واكتب:</strong></p>";
echo "<pre style='background: rgba(0,0,0,0.5); padding: 15px; border-radius: 5px;'>";
echo "// 1. اختبار تسجيل الدخول\n";
echo "fetch('api/login.php', {\n";
echo "  method: 'POST',\n";
echo "  headers: { 'Content-Type': 'application/json' },\n";
echo "  body: JSON.stringify({ email: 'adffdddr@gmail.com', password: 'كلمة_المرور' })\n";
echo "}).then(r => r.json()).then(console.log);\n\n";
echo "// 2. اختبار حجز فندق (بعد تسجيل الدخول)\n";
echo "const token = localStorage.getItem('session_token');\n";
echo "fetch('api/book_hotel.php', {\n";
echo "  method: 'POST',\n";
echo "  headers: { 'Content-Type': 'application/json' },\n";
echo "  body: JSON.stringify({\n";
echo "    session_token: token,\n";
echo "    hotel_id: 1,\n";
echo "    check_in_date: '2025-12-15',\n";
echo "    check_out_date: '2025-12-17',\n";
echo "    guests: 2,\n";
echo "    rooms: 1\n";
echo "  })\n";
echo "}).then(r => r.json()).then(console.log);\n";
echo "</pre>";
echo "</div>";

// 6. التحقق من ملفات API
echo "<h2>6. التحقق من ملفات API</h2>";
$api_files = [
    'api/config.php',
    'api/auth_helper.php',
    'api/book_hotel.php',
    'api/book_restaurant.php',
    'api/book_flight.php',
    'api/save_travel_plan.php'
];

foreach ($api_files as $file) {
    if (file_exists($file)) {
        echo "<div class='check success'>✅ ملف <code>$file</code> موجود</div>";
    } else {
        echo "<div class='check error'>❌ ملف <code>$file</code> غير موجود!</div>";
    }
}

// 7. نصائح
echo "<h2>7. نصائح لحل المشكلة</h2>";
echo "<div class='check warning'>";
echo "<ol style='line-height: 2;'>";
echo "<li>تأكد من أنك مسجل دخول - افتح Console واكتب: <code>localStorage.getItem('session_token')</code></li>";
echo "<li>تأكد من أن قاعدة البيانات <code>" . DB_NAME . "</code> موجودة</li>";
echo "<li>تأكد من أن جميع الجداول موجودة (انظر القسم 2 أعلاه)</li>";
echo "<li>افتح Console (F12) عند الحجز وراقب الرسائل</li>";
echo "<li>تحقق من ملف سجل الأخطاء في PHP (عادة في logs/php_error.log)</li>";
echo "<li>تأكد من أنك تستخدم <code>http://localhost</code> وليس <code>file://</code></li>";
echo "</ol>";
echo "</div>";

echo "</body></html>";
?>

