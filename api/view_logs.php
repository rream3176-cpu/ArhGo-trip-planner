<?php
/**
 * عرض آخر 50 سطر من سجل الأخطاء
 */

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html>
<html dir='rtl' lang='ar'>
<head>
    <meta charset='UTF-8'>
    <title>سجل الأخطاء - ArhGo</title>
    <style>
        body { font-family: 'Courier New', monospace; padding: 20px; direction: rtl; background: #1a1f2e; color: #fff; }
        h1 { color: #37D6C0; }
        pre { background: rgba(0,0,0,0.7); padding: 15px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; border: 2px solid rgba(55, 214, 192, 0.4); }
        .refresh { padding: 10px 20px; background: #37D6C0; color: #1a1f2e; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; margin: 10px 0; }
        .refresh:hover { background: #2fb8a0; }
    </style>
</head>
<body>
    <h1>📋 سجل الأخطاء - ArhGo</h1>
    <button class='refresh' onclick='location.reload()'>🔄 تحديث</button>
    <pre>";

// محاولة قراءة سجل الأخطاء
$log_files = [
    ini_get('error_log'),
    'C:/wamp64/logs/php_error.log',
    'C:/wamp64/logs/apache_error.log',
    'C:/xampp/apache/logs/error.log',
    'C:/xampp/php/logs/php_error_log.log',
    __DIR__ . '/../logs/error.log',
    __DIR__ . '/error.log'
];

$found_log = false;
$log_content = '';

foreach ($log_files as $log_file) {
    if ($log_file && file_exists($log_file) && is_readable($log_file)) {
        $found_log = true;
        $lines = file($log_file);
        if ($lines) {
            // آخر 100 سطر
            $recent_lines = array_slice($lines, -100);
            $log_content = implode('', $recent_lines);
        }
        echo "📁 ملف السجل: <strong>" . htmlspecialchars($log_file) . "</strong>\n\n";
        break;
    }
}

if (!$found_log) {
    echo "⚠️ لم يتم العثور على ملف سجل الأخطاء.\n\n";
    echo "الملفات التي تم البحث عنها:\n";
    foreach ($log_files as $file) {
        if ($file) {
            echo "  - " . htmlspecialchars($file) . "\n";
        }
    }
    echo "\n";
    echo "💡 نصيحة: تحقق من إعدادات PHP error_log في php.ini\n";
} else {
    if (empty($log_content)) {
        echo "📭 ملف السجل موجود لكنه فارغ.\n";
        echo "💡 جرّب إجراء حجز جديد ثم حدّث هذه الصفحة.\n";
    } else {
        // البحث عن سطور متعلقة بالحجوزات
        $booking_lines = [];
        $all_lines = explode("\n", $log_content);
        foreach ($all_lines as $line) {
            if (stripos($line, 'booking') !== false || 
                stripos($line, 'hotel') !== false || 
                stripos($line, 'restaurant') !== false || 
                stripos($line, 'flight') !== false ||
                stripos($line, 'travel_plan') !== false ||
                stripos($line, 'INSERT') !== false ||
                stripos($line, 'ERROR') !== false) {
                $booking_lines[] = $line;
            }
        }
        
        if (!empty($booking_lines)) {
            echo "🔍 السطور المتعلقة بالحجوزات (آخر " . count($booking_lines) . " سطر):\n\n";
            echo htmlspecialchars(implode("\n", array_slice($booking_lines, -50)));
        } else {
            echo "📋 آخر 100 سطر من السجل:\n\n";
            echo htmlspecialchars($log_content);
        }
    }
}

echo "</pre>
    <p style='color: #888; margin-top: 20px;'>
        💡 <strong>نصيحة:</strong> إذا كان السجل فارغاً، تأكد من أن error_log مفعّل في PHP.
        <br>يمكنك أيضاً فتح ملف السجل مباشرة من: C:/wamp64/logs/php_error.log أو C:/xampp/apache/logs/error.log
    </p>
</body>
</html>";
?>

