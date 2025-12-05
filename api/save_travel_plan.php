<?php
require_once 'config.php';
require_once 'auth_helper.php';
header('Content-Type: application/json; charset=utf-8');

// تفعيل تسجيل الأخطاء
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'طريقة الطلب غير صحيحة'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

// تسجيل البيانات المستلمة
error_log("=== Travel Plan Save Request ===");
error_log("Received data keys: " . implode(', ', array_keys($data ?? [])));

$session_token = $data['session_token'] ?? '';
$plan_data = $data['plan_data'] ?? [];

error_log("Session token: " . substr($session_token, 0, 20) . "...");
error_log("Plan data keys: " . implode(', ', array_keys($plan_data ?? [])));

// التحقق من الجلسة
$user_id = verifySession($session_token);
error_log("User ID from session: " . ($user_id ? $user_id : 'NULL'));

if (!$user_id) {
    error_log("ERROR: User not authenticated");
    jsonResponse(['success' => false, 'error' => 'غير مصرح به. يرجى تسجيل الدخول'], 401);
}

if (empty($plan_data)) {
    jsonResponse(['success' => false, 'error' => 'بيانات الخطة مطلوبة'], 400);
}

try {
    $pdo = getDBConnection();
    
    // الحصول على بيانات المستخدم
    $stmt = $pdo->prepare("SELECT full_name FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch();
    
    // إعداد بيانات الخطة
    $plan_name = sanitizeInput($plan_data['plan_name'] ?? 'خطة سفر جديدة');
    $country_id = (int)($plan_data['country_id'] ?? 0);
    $city_id = (int)($plan_data['city_id'] ?? null);
    $weather_preference = sanitizeInput($plan_data['weather_preference'] ?? '');
    $view_preference = sanitizeInput($plan_data['view_preference'] ?? '');
    $trip_type = sanitizeInput($plan_data['trip_type'] ?? '');
    $budget = sanitizeInput($plan_data['budget'] ?? 'متوسطة');
    $start_date = $plan_data['start_date'] ?? null;
    $end_date = $plan_data['end_date'] ?? null;
    $duration_days = (int)($plan_data['duration_days'] ?? 0);
    $estimated_cost = (float)($plan_data['estimated_cost'] ?? 0);
    
    $interests = json_encode($plan_data['interests'] ?? [], JSON_UNESCAPED_UNICODE);
    $activities = json_encode($plan_data['activities'] ?? [], JSON_UNESCAPED_UNICODE);
    $selected_hotels = json_encode($plan_data['selected_hotels'] ?? [], JSON_UNESCAPED_UNICODE);
    $selected_restaurants = json_encode($plan_data['selected_restaurants'] ?? [], JSON_UNESCAPED_UNICODE);
    $full_plan_data = json_encode($plan_data, JSON_UNESCAPED_UNICODE);
    
    // إنشاء رابط مشاركة
    $share_link = 'PLN' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 12));
    
    // إدراج الخطة
    error_log("Inserting plan: user_id=$user_id, plan_name=$plan_name, country_id=$country_id, duration_days=$duration_days");
    
    // التحقق من وجود الجدول
    $stmt = $pdo->query("SHOW TABLES LIKE 'travel_plans'");
    if ($stmt->rowCount() === 0) {
        error_log("ERROR: travel_plans table does not exist!");
        jsonResponse(['success' => false, 'error' => 'جدول travel_plans غير موجود في قاعدة البيانات'], 500);
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO travel_plans (user_id, plan_name, user_name, country_id, city_id, weather_preference, view_preference, trip_type, interests, activities, budget, start_date, end_date, duration_days, estimated_cost, selected_hotels, selected_restaurants, plan_data, share_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $result = $stmt->execute([$user_id, $plan_name, $user['full_name'], $country_id, $city_id ?: null, $weather_preference, $view_preference, $trip_type, $interests, $activities, $budget, $start_date, $end_date, $duration_days, $estimated_cost, $selected_hotels, $selected_restaurants, $full_plan_data, $share_link]);
        
        if (!$result) {
            $errorInfo = $stmt->errorInfo();
            error_log("ERROR: INSERT failed - " . print_r($errorInfo, true));
            jsonResponse(['success' => false, 'error' => 'فشل إدراج الخطة: ' . $errorInfo[2]], 500);
        }
        
        // الحصول على ID قبل أي شيء آخر
        $plan_id = $pdo->lastInsertId();
        error_log("lastInsertId returned: $plan_id");
        
        if (!$plan_id) {
            error_log("ERROR: lastInsertId returned 0 or false");
            // التحقق من أن الخطة تم إدراجها
            $stmt = $pdo->prepare("SELECT id FROM travel_plans WHERE share_link = ?");
            $stmt->execute([$share_link]);
            $existing = $stmt->fetch();
            if ($existing) {
                $plan_id = $existing['id'];
                error_log("Found existing plan with same share_link: $plan_id");
            } else {
                error_log("ERROR: Plan was not inserted and lastInsertId is 0");
                jsonResponse(['success' => false, 'error' => 'فشل إدراج الخطة في قاعدة البيانات'], 500);
            }
        }
        
        error_log("Plan inserted successfully! Plan ID: $plan_id, Share link: $share_link");
        
        // التحقق من أن الخطة موجودة فعلاً
        $stmt = $pdo->prepare("SELECT * FROM travel_plans WHERE id = ?");
        $stmt->execute([$plan_id]);
        $verify = $stmt->fetch();
        if ($verify) {
            error_log("Verified: Plan exists in database");
        } else {
            error_log("WARNING: Plan ID $plan_id not found after insertion!");
        }
        
    } catch (PDOException $e) {
        error_log("PDO Exception during INSERT: " . $e->getMessage());
        error_log("SQL State: " . $e->getCode());
        error_log("Error Info: " . print_r($stmt->errorInfo() ?? [], true));
        throw $e;
    }
    
    jsonResponse([
        'success' => true,
        'message' => 'تم حفظ الخطة بنجاح',
        'plan_id' => $plan_id,
        'share_link' => $share_link
    ]);
    
} catch (PDOException $e) {
    error_log("PDO Exception: " . $e->getMessage());
    error_log("SQL State: " . $e->getCode());
    jsonResponse(['success' => false, 'error' => 'خطأ في قاعدة البيانات: ' . $e->getMessage()], 500);
} catch (Exception $e) {
    error_log("General Exception: " . $e->getMessage());
    jsonResponse(['success' => false, 'error' => 'خطأ عام: ' . $e->getMessage()], 500);
}
?>

