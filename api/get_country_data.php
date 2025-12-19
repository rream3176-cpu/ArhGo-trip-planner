<?php
/**
 * API للحصول على بيانات دولة معينة (مدن، أماكن سياحية)
 */

require_once 'config.php';

$country_name = isset($_GET['country']) ? sanitizeInput($_GET['country']) : '';

if (empty($country_name)) {
    jsonResponse([
        'success' => false,
        'error' => 'يرجى تحديد اسم الدولة'
    ], 400);
    exit;
}

try {
    $pdo = getDBConnection();
    
    // البحث عن الدولة
    $stmt = $pdo->prepare("SELECT * FROM arab_countries_asia WHERE country_name_ar = ? OR country_name_en = ?");
    $stmt->execute([$country_name, $country_name]);
    $country = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$country) {
        jsonResponse([
            'success' => false,
            'error' => 'الدولة غير موجودة في قاعدة البيانات'
        ], 404);
        exit;
    }
    
    $country_id = $country['id'];
    
    // جلب المدن
    $stmt = $pdo->prepare("SELECT * FROM cities WHERE country_id = ? ORDER BY city_name_ar ASC");
    $stmt->execute([$country_id]);
    $cities = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $citiesList = array_map(function($city) {
        return $city['city_name_ar'];
    }, $cities);
    
    // جلب المطاعم (للطعام)
    $stmt = $pdo->prepare("SELECT name, description, location, address, open_hour, close_hour FROM restaurants WHERE country_id = ? LIMIT 20");
    $stmt->execute([$country_id]);
    $restaurants = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $foodList = array_map(function($rest) {
        return $rest['name'];
    }, $restaurants);
    
    // بيانات افتراضية للأماكن السياحية (يمكن إضافة جدول منفصل لاحقاً)
    $cultural = [];
    $nature = [];
    $adventure = [];
    
    // محاولة الحصول من وصف المطاعم أو استخدام بيانات افتراضية
    if (count($restaurants) > 0) {
        // يمكن استخدام أسماء المطاعم كأماكن ثقافية
        foreach ($restaurants as $rest) {
            if (stripos($rest['description'], 'متحف') !== false || 
                stripos($rest['description'], 'قصر') !== false ||
                stripos($rest['description'], 'معبد') !== false) {
                $cultural[] = $rest['name'];
            }
        }
    }
    
    // إذا لم توجد أماكن ثقافية، استخدم أسماء افتراضية حسب الدولة
    $defaultAttractions = [
        'السعودية' => [
            'cultural' => ['قصر المصمك', 'متحف الملك عبدالعزيز', 'قلعة الرياض', 'متحف قصر المربع'],
            'nature' => ['وادي حنيفة', 'منتزه الملك عبدالله', 'وادي نمار', 'حديقة الملك فهد'],
            'adventure' => ['رحلة صحراوية', 'تسلق الجبال', 'رياضات مائية']
        ],
        'الإمارات' => [
            'cultural' => ['برج خليفة', 'متحف اللوفر أبوظبي', 'مسجد الشيخ زايد', 'قصر الإمارات'],
            'nature' => ['شاطئ جميرا', 'حديقة دبي', 'وادي المغامرات', 'الصحراء'],
            'adventure' => ['قفز بالمظلة', 'رياضات مائية', 'رحلة صحراوية']
        ],
        'الكويت' => [
            'cultural' => ['أبراج الكويت', 'متحف الكويت الوطني', 'قصر السيف', 'المتحف العلمي'],
            'nature' => ['شاطئ الكويت', 'حديقة الشهيد', 'جزيرة فيلكا'],
            'adventure' => ['رياضات مائية', 'رحلة بحرية']
        ],
        'قطر' => [
            'cultural' => ['متحف قطر الوطني', 'متحف الفن الإسلامي', 'سوق واقف', 'قصر الدوحة'],
            'nature' => ['شاطئ الخور', 'حديقة أسباير', 'الصحراء'],
            'adventure' => ['رياضات مائية', 'رحلة صحراوية']
        ],
        'البحرين' => [
            'cultural' => ['قلعة البحرين', 'متحف البحرين الوطني', 'مسجد الفاتح', 'بيت القرآن'],
            'nature' => ['شاطئ البحرين', 'حديقة العرين', 'جزيرة أمواج'],
            'adventure' => ['رياضات مائية', 'رحلة بحرية']
        ],
        'عُمان' => [
            'cultural' => ['قصر السلطان', 'متحف عمان الوطني', 'قلعة نزوى', 'سوق مطرح'],
            'nature' => ['وادي شاب', 'جبل شمس', 'شاطئ مسقط', 'وادي بني خالد'],
            'adventure' => ['تسلق الجبال', 'رحلة صحراوية', 'رياضات مائية']
        ],
        'اليمن' => [
            'cultural' => ['صنعاء القديمة', 'قصر غمدان', 'متحف اليمن الوطني', 'سوق صنعاء'],
            'nature' => ['جبل صبر', 'وادي حضرموت', 'شاطئ عدن'],
            'adventure' => ['تسلق الجبال', 'رحلة صحراوية']
        ],
        'العراق' => [
            'cultural' => ['المتحف العراقي', 'أطلال بابل', 'المسجد الذهبي', 'قصر العاشق'],
            'nature' => ['نهر دجلة', 'نهر الفرات', 'جبال كردستان'],
            'adventure' => ['رحلة نهرية', 'تسلق الجبال']
        ],
        'سوريا' => [
            'cultural' => ['قلعة حلب', 'تدمر', 'المتحف الوطني', 'مسجد الأموي'],
            'nature' => ['جبال اللاذقية', 'وادي النهر', 'شاطئ اللاذقية'],
            'adventure' => ['تسلق الجبال', 'رحلة صحراوية']
        ],
        'الأردن' => [
            'cultural' => ['البتراء', 'قلعة عمان', 'متحف الأردن', 'جبل نيبو'],
            'nature' => ['البحر الميت', 'وادي رم', 'جبال عجلون'],
            'adventure' => ['تسلق الجبال', 'رحلة صحراوية', 'رياضات مائية']
        ],
        'لبنان' => [
            'cultural' => ['متحف بيروت', 'قلعة بعلبك', 'متحف جبيل', 'قصر بيت الدين'],
            'nature' => ['جبال لبنان', 'شاطئ بيروت', 'وادي قاديشا'],
            'adventure' => ['تسلق الجبال', 'رياضات مائية']
        ],
        'فلسطين' => [
            'cultural' => ['المسجد الأقصى', 'كنيسة القيامة', 'متحف فلسطين', 'قصر هشام'],
            'nature' => ['البحر الميت', 'جبل الزيتون', 'وادي الأردن'],
            'adventure' => ['تسلق الجبال', 'رحلة صحراوية']
        ]
    ];
    
    if (isset($defaultAttractions[$country_name])) {
        $cultural = array_merge($cultural, $defaultAttractions[$country_name]['cultural']);
        $nature = $defaultAttractions[$country_name]['nature'];
        $adventure = $defaultAttractions[$country_name]['adventure'];
    }
    
    // تحديد الميزانية حسب الدولة
    $budget = [
        'low' => 30,
        'medium' => 60,
        'high' => 120
    ];
    
    // تحديد الأوقات المناسبة
    $timeSlots = [
        'morning' => '08:00-12:00',
        'afternoon' => '14:00-17:00',
        'evening' => '19:00-22:00'
    ];
    
    jsonResponse([
        'success' => true,
        'data' => [
            'cities' => $citiesList,
            'attractions' => [
                'cultural' => array_unique($cultural),
                'nature' => $nature,
                'adventure' => $adventure,
                'food' => $foodList
            ],
            'budget' => $budget,
            'timeSlots' => $timeSlots,
            'optimalRoute' => true
        ]
    ]);
    
} catch (PDOException $e) {
    jsonResponse([
        'success' => false,
        'error' => 'خطأ في جلب البيانات: ' . $e->getMessage()
    ], 500);
}

?>

