<?php
/**
 * ملف اختبار شامل لجميع أنواع الحجوزات
 */

require_once 'config.php';
require_once 'auth_helper.php';

header('Content-Type: text/html; charset=utf-8');

echo "<!DOCTYPE html>
<html dir='rtl' lang='ar'>
<head>
    <meta charset='UTF-8'>
    <title>اختبار شامل - ArhGo</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; background: #1a1f2e; color: #fff; }
        h1 { color: #37D6C0; }
        h2 { color: #37D6C0; margin-top: 30px; }
        .test-section { background: rgba(22, 58, 95, 0.9); padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid rgba(55, 214, 192, 0.4); }
        .success { color: #51cf66; }
        .error { color: #ff6b6b; }
        .info { color: #4dabf7; }
        button { padding: 10px 20px; margin: 5px; background: #37D6C0; color: #1a1f2e; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
        button:hover { background: #2fb8a0; }
        #result { margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🧪 اختبار شامل - ArhGo</h1>
    <div class='test-section'>
        <h2>1. اختبار الاتصال بقاعدة البيانات</h2>
        <button onclick='testConnection()'>اختبار الاتصال</button>
        <div id='connectionResult'></div>
    </div>
    
    <div class='test-section'>
        <h2>2. اختبار تسجيل الدخول</h2>
        <input type='email' id='testEmail' placeholder='البريد الإلكتروني' style='padding: 8px; margin: 5px; width: 200px;'>
        <input type='password' id='testPassword' placeholder='كلمة المرور' style='padding: 8px; margin: 5px; width: 200px;'>
        <button onclick='testLogin()'>اختبار تسجيل الدخول</button>
        <div id='loginResult'></div>
    </div>
    
    <div class='test-section'>
        <h2>3. اختبار حجز فندق</h2>
        <button onclick='testHotelBooking()'>اختبار حجز فندق</button>
        <div id='hotelResult'></div>
    </div>
    
    <div class='test-section'>
        <h2>4. اختبار حجز مطعم</h2>
        <button onclick='testRestaurantBooking()'>اختبار حجز مطعم</button>
        <div id='restaurantResult'></div>
    </div>
    
    <div class='test-section'>
        <h2>5. اختبار حجز رحلة</h2>
        <button onclick='testFlightBooking()'>اختبار حجز رحلة</button>
        <div id='flightResult'></div>
    </div>
    
    <div class='test-section'>
        <h2>6. اختبار حفظ خطة سفر</h2>
        <button onclick='testTravelPlan()'>اختبار حفظ خطة</button>
        <div id='planResult'></div>
    </div>
    
    <div id='result'></div>
    
    <script>
        let sessionToken = localStorage.getItem('session_token') || '';
        
        async function testConnection() {
            const result = document.getElementById('connectionResult');
            result.innerHTML = '⏳ جاري الاختبار...';
            
            try {
                const response = await fetch('api/test_booking_api.php');
                const text = await response.text();
                result.innerHTML = '<pre style=\"color: #fff; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px; overflow-x: auto;\">' + text + '</pre>';
            } catch (error) {
                result.innerHTML = '<span class=\"error\">❌ خطأ: ' + error.message + '</span>';
            }
        }
        
        async function testLogin() {
            const email = document.getElementById('testEmail').value;
            const password = document.getElementById('testPassword').value;
            const result = document.getElementById('loginResult');
            
            if (!email || !password) {
                result.innerHTML = '<span class=\"error\">❌ يرجى إدخال البريد وكلمة المرور</span>';
                return;
            }
            
            result.innerHTML = '⏳ جاري تسجيل الدخول...';
            
            try {
                const response = await fetch('api/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    sessionToken = data.session_token;
                    localStorage.setItem('session_token', sessionToken);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    result.innerHTML = '<span class=\"success\">✅ تم تسجيل الدخول بنجاح! Session Token: ' + sessionToken.substring(0, 20) + '...</span>';
                } else {
                    result.innerHTML = '<span class=\"error\">❌ فشل تسجيل الدخول: ' + (data.error || 'خطأ غير معروف') + '</span>';
                }
            } catch (error) {
                result.innerHTML = '<span class=\"error\">❌ خطأ: ' + error.message + '</span>';
            }
        }
        
        async function testHotelBooking() {
            if (!sessionToken) {
                document.getElementById('hotelResult').innerHTML = '<span class=\"error\">❌ يرجى تسجيل الدخول أولاً</span>';
                return;
            }
            
            const result = document.getElementById('hotelResult');
            result.innerHTML = '⏳ جاري اختبار حجز الفندق...';
            
            try {
                const response = await fetch('api/book_hotel.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session_token: sessionToken,
                        hotel_id: 1,
                        check_in_date: '2025-12-15',
                        check_out_date: '2025-12-17',
                        guests: 2,
                        rooms: 1,
                        special_requests: 'اختبار'
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    result.innerHTML = '<span class=\"success\">✅ تم الحجز بنجاح! رقم الحجز: ' + data.booking_reference + '</span>';
                } else {
                    result.innerHTML = '<span class=\"error\">❌ فشل الحجز: ' + (data.error || 'خطأ غير معروف') + '</span>';
                }
            } catch (error) {
                result.innerHTML = '<span class=\"error\">❌ خطأ: ' + error.message + '</span>';
            }
        }
        
        async function testRestaurantBooking() {
            if (!sessionToken) {
                document.getElementById('restaurantResult').innerHTML = '<span class=\"error\">❌ يرجى تسجيل الدخول أولاً</span>';
                return;
            }
            
            const result = document.getElementById('restaurantResult');
            result.innerHTML = '⏳ جاري اختبار حجز المطعم...';
            
            try {
                const response = await fetch('api/book_restaurant.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session_token: sessionToken,
                        restaurant_id: 1,
                        booking_date: '2025-12-15',
                        booking_time: '19:00:00',
                        guests: 2,
                        special_requests: 'اختبار'
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    result.innerHTML = '<span class=\"success\">✅ تم الحجز بنجاح! رقم الحجز: ' + data.booking_reference + '</span>';
                } else {
                    result.innerHTML = '<span class=\"error\">❌ فشل الحجز: ' + (data.error || 'خطأ غير معروف') + '</span>';
                }
            } catch (error) {
                result.innerHTML = '<span class=\"error\">❌ خطأ: ' + error.message + '</span>';
            }
        }
        
        async function testFlightBooking() {
            if (!sessionToken) {
                document.getElementById('flightResult').innerHTML = '<span class=\"error\">❌ يرجى تسجيل الدخول أولاً</span>';
                return;
            }
            
            const result = document.getElementById('flightResult');
            result.innerHTML = '⏳ جاري اختبار حجز الرحلة...';
            
            try {
                const response = await fetch('api/book_flight.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session_token: sessionToken,
                        from_city: 'بغداد',
                        to_city: 'دبي',
                        departure_date: '2025-12-20',
                        return_date: null,
                        passengers: 1,
                        class_type: 'اقتصادية',
                        special_requests: 'اختبار'
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    result.innerHTML = '<span class=\"success\">✅ تم الحجز بنجاح! رقم الحجز: ' + data.booking_reference + '</span>';
                } else {
                    result.innerHTML = '<span class=\"error\">❌ فشل الحجز: ' + (data.error || 'خطأ غير معروف') + '</span>';
                }
            } catch (error) {
                result.innerHTML = '<span class=\"error\">❌ خطأ: ' + error.message + '</span>';
            }
        }
        
        async function testTravelPlan() {
            if (!sessionToken) {
                document.getElementById('planResult').innerHTML = '<span class=\"error\">❌ يرجى تسجيل الدخول أولاً</span>';
                return;
            }
            
            const result = document.getElementById('planResult');
            result.innerHTML = '⏳ جاري اختبار حفظ الخطة...';
            
            try {
                const response = await fetch('api/save_travel_plan.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session_token: sessionToken,
                        plan_data: {
                            plan_name: 'رحلة اختبار',
                            country_id: 1,
                            city_id: null,
                            weather_preference: 'دافئ',
                            view_preference: 'ساحلي',
                            trip_type: 'متوسطة',
                            budget: 'متوسطة',
                            start_date: null,
                            end_date: null,
                            duration_days: 5,
                            estimated_cost: 500,
                            interests: ['سياحة', 'تسوق'],
                            activities: [],
                            selected_hotels: [],
                            selected_restaurants: []
                        }
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    result.innerHTML = '<span class=\"success\">✅ تم الحفظ بنجاح! Plan ID: ' + data.plan_id + ', Share Link: ' + data.share_link + '</span>';
                } else {
                    result.innerHTML = '<span class=\"error\">❌ فشل الحفظ: ' + (data.error || 'خطأ غير معروف') + '</span>';
                }
            } catch (error) {
                result.innerHTML = '<span class=\"error\">❌ خطأ: ' + error.message + '</span>';
            }
        }
    </script>
</body>
</html>
";

?>

