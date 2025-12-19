# دليل نظام المستخدمين والحجوزات - ArhGo Trip Planner

## 📋 نظرة عامة

تم إنشاء نظام كامل لإدارة المستخدمين والحجوزات يتضمن:
- ✅ تسجيل المستخدمين الجدد
- ✅ تسجيل الدخول والخروج
- ✅ حجز الفنادق
- ✅ حجز المطاعم
- ✅ حجز الرحلات الجوية
- ✅ حفظ خطط السفر الكاملة

---

## 🗄️ قاعدة البيانات

### الجداول الجديدة:

1. **`users`** - بيانات المستخدمين
2. **`user_sessions`** - جلسات المستخدمين
3. **`hotel_bookings`** - حجوزات الفنادق
4. **`restaurant_bookings`** - حجوزات المطاعم
5. **`flight_bookings`** - حجوزات الرحلات الجوية
6. **`travel_plans`** - خطط السفر (محدث)

---

## 📝 خطوات التثبيت

### 1. نفذ ملف SQL:

في MySQL Workbench أو phpMyAdmin:
```
database/ADD_USER_TABLES.sql
```

هذا الملف سيضيف جميع الجداول المطلوبة.

---

## 🔌 APIs المتاحة

### 1. تسجيل مستخدم جديد
**Endpoint:** `POST api/register.php`

**Request:**
```json
{
  "full_name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "password123",
  "phone": "0501234567",
  "country": "السعودية",
  "city": "الرياض"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم التسجيل بنجاح",
  "user_id": 1
}
```

---

### 2. تسجيل الدخول
**Endpoint:** `POST api/login.php`

**Request:**
```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "session_token": "abc123...",
  "user": {
    "id": 1,
    "full_name": "أحمد محمد",
    "email": "ahmed@example.com",
    "phone": "0501234567",
    "country": "السعودية",
    "city": "الرياض"
  }
}
```

---

### 3. حجز فندق
**Endpoint:** `POST api/book_hotel.php`

**Request:**
```json
{
  "session_token": "abc123...",
  "hotel_id": 1,
  "check_in_date": "2024-12-25",
  "check_out_date": "2024-12-27",
  "guests": 2,
  "rooms": 1,
  "special_requests": "طاولة بجانب النافذة"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم الحجز بنجاح",
  "booking_id": 1,
  "booking_reference": "HTLABC123",
  "total_price": 900.00,
  "nights": 2
}
```

---

### 4. حجز مطعم
**Endpoint:** `POST api/book_restaurant.php`

**Request:**
```json
{
  "session_token": "abc123...",
  "restaurant_id": 1,
  "booking_date": "2024-12-25",
  "booking_time": "19:00",
  "guests": 4,
  "special_requests": "طاولة بجانب النافذة"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم الحجز بنجاح",
  "booking_id": 1,
  "booking_reference": "RSTABC123",
  "total_price": 400.00
}
```

---

### 5. حجز رحلة جوية
**Endpoint:** `POST api/book_flight.php`

**Request:**
```json
{
  "session_token": "abc123...",
  "from_city": "الرياض",
  "to_city": "دبي",
  "departure_date": "2024-12-25",
  "return_date": "2024-12-30",
  "passengers": 2,
  "class_type": "اقتصادية",
  "special_requests": "وجبة نباتية"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم الحجز بنجاح",
  "booking_id": 1,
  "booking_reference": "FLTABC123",
  "total_price": 1800.00
}
```

---

### 6. حفظ خطة الرحلة
**Endpoint:** `POST api/save_travel_plan.php`

**Request:**
```json
{
  "session_token": "abc123...",
  "plan_data": {
    "plan_name": "رحلة إلى دبي",
    "country_id": 2,
    "city_id": 8,
    "budget": "عالية",
    "start_date": "2024-12-25",
    "end_date": "2024-12-30",
    "duration_days": 5,
    "estimated_cost": 5000,
    "weather_preference": "دافئ",
    "view_preference": "بحر",
    "trip_type": "عائلي",
    "interests": ["تسوق", "ترفيه"],
    "activities": ["زيارة برج خليفة", "دبي مول"],
    "selected_hotels": [1, 2],
    "selected_restaurants": [3, 4]
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم حفظ الخطة بنجاح",
  "plan_id": 1,
  "share_link": "PLNABC123DEF456"
}
```

---

### 7. الحصول على جميع حجوزات المستخدم
**Endpoint:** `GET api/get_user_bookings.php?session_token=abc123...`

**Response:**
```json
{
  "success": true,
  "data": {
    "hotel_bookings": [...],
    "restaurant_bookings": [...],
    "flight_bookings": [...],
    "travel_plans": [...]
  },
  "counts": {
    "hotels": 5,
    "restaurants": 3,
    "flights": 2,
    "plans": 1
  }
}
```

---

### 8. تسجيل الخروج
**Endpoint:** `POST api/logout.php`

**Request:**
```json
{
  "session_token": "abc123..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم تسجيل الخروج بنجاح"
}
```

---

## 💻 أمثلة الاستخدام في JavaScript

### مثال 1: تسجيل مستخدم جديد
```javascript
async function registerUser() {
  try {
    const response = await fetch('api/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: 'أحمد محمد',
        email: 'ahmed@example.com',
        password: 'password123',
        phone: '0501234567',
        country: 'السعودية',
        city: 'الرياض'
      })
    });
    
    const result = await response.json();
    if (result.success) {
      console.log('تم التسجيل بنجاح!');
      // تسجيل الدخول تلقائياً
      await loginUser('ahmed@example.com', 'password123');
    } else {
      console.error('خطأ:', result.error);
    }
  } catch (error) {
    console.error('خطأ في الاتصال:', error);
  }
}
```

### مثال 2: تسجيل الدخول
```javascript
async function loginUser(email, password) {
  try {
    const response = await fetch('api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    
    const result = await response.json();
    if (result.success) {
      // حفظ session_token
      localStorage.setItem('session_token', result.session_token);
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log('تم تسجيل الدخول بنجاح!');
      return true;
    } else {
      console.error('خطأ:', result.error);
      return false;
    }
  } catch (error) {
    console.error('خطأ في الاتصال:', error);
    return false;
  }
}
```

### مثال 3: حجز فندق
```javascript
async function bookHotel(hotelId, checkIn, checkOut, guests, rooms) {
  const sessionToken = localStorage.getItem('session_token');
  
  if (!sessionToken) {
    alert('يرجى تسجيل الدخول أولاً');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const response = await fetch('api/book_hotel.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_token: sessionToken,
        hotel_id: hotelId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        guests: guests,
        rooms: rooms
      })
    });
    
    const result = await response.json();
    if (result.success) {
      alert(`تم الحجز بنجاح! رقم الحجز: ${result.booking_reference}`);
      console.log('الحجز:', result);
    } else {
      alert('خطأ: ' + result.error);
    }
  } catch (error) {
    console.error('خطأ في الاتصال:', error);
    alert('حدث خطأ في الاتصال بالخادم');
  }
}
```

### مثال 4: حجز مطعم
```javascript
async function bookRestaurant(restaurantId, date, time, guests) {
  const sessionToken = localStorage.getItem('session_token');
  
  if (!sessionToken) {
    alert('يرجى تسجيل الدخول أولاً');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const response = await fetch('api/book_restaurant.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_token: sessionToken,
        restaurant_id: restaurantId,
        booking_date: date,
        booking_time: time,
        guests: guests
      })
    });
    
    const result = await response.json();
    if (result.success) {
      alert(`تم الحجز بنجاح! رقم الحجز: ${result.booking_reference}`);
    } else {
      alert('خطأ: ' + result.error);
    }
  } catch (error) {
    console.error('خطأ في الاتصال:', error);
    alert('حدث خطأ في الاتصال بالخادم');
  }
}
```

### مثال 5: حفظ خطة الرحلة
```javascript
async function saveTravelPlan(planData) {
  const sessionToken = localStorage.getItem('session_token');
  
  if (!sessionToken) {
    alert('يرجى تسجيل الدخول أولاً');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const response = await fetch('api/save_travel_plan.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_token: sessionToken,
        plan_data: planData
      })
    });
    
    const result = await response.json();
    if (result.success) {
      alert(`تم حفظ الخطة بنجاح! رابط المشاركة: ${result.share_link}`);
      return result.share_link;
    } else {
      alert('خطأ: ' + result.error);
      return null;
    }
  } catch (error) {
    console.error('خطأ في الاتصال:', error);
    alert('حدث خطأ في الاتصال بالخادم');
    return null;
  }
}
```

### مثال 6: الحصول على جميع الحجوزات
```javascript
async function getUserBookings() {
  const sessionToken = localStorage.getItem('session_token');
  
  if (!sessionToken) {
    console.log('غير مسجل دخول');
    return null;
  }
  
  try {
    const response = await fetch(`api/get_user_bookings.php?session_token=${sessionToken}`);
    const result = await response.json();
    
    if (result.success) {
      console.log('حجوزات الفنادق:', result.data.hotel_bookings);
      console.log('حجوزات المطاعم:', result.data.restaurant_bookings);
      console.log('حجوزات الرحلات:', result.data.flight_bookings);
      console.log('خطط السفر:', result.data.travel_plans);
      return result.data;
    } else {
      console.error('خطأ:', result.error);
      return null;
    }
  } catch (error) {
    console.error('خطأ في الاتصال:', error);
    return null;
  }
}
```

---

## 🔐 الأمان

1. **كلمات المرور**: مشفرة باستخدام `password_hash()` في PHP
2. **الجلسات**: رموز عشوائية آمنة تنتهي بعد 30 يوم
3. **التحقق**: جميع APIs تتحقق من صحة الجلسة قبل تنفيذ العمليات
4. **SQL Injection**: محمية باستخدام Prepared Statements

---

## 📊 هيكل قاعدة البيانات

### جدول users:
- `id` - معرف المستخدم
- `full_name` - الاسم الكامل
- `email` - البريد الإلكتروني (فريد)
- `password` - كلمة المرور المشفرة
- `phone` - رقم الهاتف
- `country` - الدولة
- `city` - المدينة
- `created_at` - تاريخ الإنشاء
- `last_login` - آخر تسجيل دخول

### جدول hotel_bookings:
- `id` - معرف الحجز
- `user_id` - معرف المستخدم
- `hotel_id` - معرف الفندق
- `check_in_date` - تاريخ الدخول
- `check_out_date` - تاريخ الخروج
- `guests` - عدد الضيوف
- `rooms` - عدد الغرف
- `total_price` - السعر الإجمالي
- `status` - حالة الحجز
- `booking_reference` - رقم الحجز (فريد)

---

## ✅ التحقق من التثبيت

بعد تنفيذ `ADD_USER_TABLES.sql`:

1. افتح phpMyAdmin
2. تحقق من وجود الجداول الجديدة
3. جرب تسجيل مستخدم جديد من `signup.html`
4. جرب تسجيل الدخول من `login.html`
5. جرب حجز فندق أو مطعم

---

## 🐛 حل المشاكل

### المشكلة: "غير مصرح به"
- **الحل**: تأكد من إرسال `session_token` في كل طلب
- تأكد من أن الجلسة لم تنتهِ (30 يوم)

### المشكلة: "خطأ في قاعدة البيانات"
- **الحل**: تأكد من تنفيذ `ADD_USER_TABLES.sql`
- تأكد من أن MySQL يعمل

### المشكلة: "البريد الإلكتروني مستخدم بالفعل"
- **الحل**: استخدم بريد إلكتروني آخر أو سجل دخول

---

## 📝 ملاحظات مهمة

1. **حفظ session_token**: احفظه في `localStorage` بعد تسجيل الدخول
2. **إرسال session_token**: أرسله في كل طلب حجز
3. **انتهاء الجلسة**: الجلسة تنتهي بعد 30 يوم، يجب تسجيل الدخول مرة أخرى
4. **الأمان**: لا تعرض `session_token` في console.log في الإنتاج

---

## 🎯 الخطوات التالية

1. ✅ نفذ `ADD_USER_TABLES.sql`
2. ✅ جرب تسجيل مستخدم جديد
3. ✅ جرب تسجيل الدخول
4. ✅ جرب حجز فندق
5. ✅ جرب حجز مطعم
6. ✅ جرب حفظ خطة رحلة

جميع الملفات جاهزة! 🚀

