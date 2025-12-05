<?php
/**
 * ملف إعدادات الاتصال بقاعدة البيانات
 * ArhGo Trip Planner - Database Configuration
 */

// إعدادات قاعدة البيانات
define('DB_HOST', 'localhost');
define('DB_USER', 'root'); // غيّر حسب إعداداتك
define('DB_PASS', ''); // غيّر حسب إعداداتك
define('DB_NAME', 'arhgo_new_db');

// إعدادات الاتصال
define('DB_CHARSET', 'utf8mb4');

// إنشاء الاتصال
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND  => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ];
        
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        die("خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage());
    }
}

// دالة لإرجاع JSON
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// دالة للتحقق من صحة البيانات
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

?>

