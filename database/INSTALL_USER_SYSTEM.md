# تثبيت نظام المستخدمين والحجوزات

## خطوات التثبيت:

### 1. نفذ ملف SQL لإضافة الجداول:

في MySQL Workbench أو phpMyAdmin، نفذ:
```
database/ADD_USER_TABLES.sql
```

هذا الملف سيضيف الجداول التالية:
- ✅ `users` - جدول المستخدمين
- ✅ `user_sessions` - جدول جلسات المستخدمين
- ✅ `hotel_bookings` - جدول حجوزات الفنادق
- ✅ `restaurant_bookings` - جدول حجوزات المطاعم
- ✅ `flight_bookings` - جدول حجوزات الرحلات الجوية
- ✅ تحديث `travel_plans` لربطه بالمستخدمين

---

## ملفات API المتاحة:

### 1. تسجيل مستخدم جديد:
```
POST api/register.php
Body: {
  "full_name": "اسم المستخدم",
  "email": "email@example.com",
  "password": "password123",
  "phone": "1234567890",
  "country": "السعودية",
  "city": "الرياض"
}
```

### 2. تسجيل الدخول:
```
POST api/login.php
Body: {
  "email": "email@example.com",
  "password": "password123"
}
Response: {
  "success": true,
  "session_token": "abc123...",
  "user": {...}
}
```

### 3. حجز فندق:
```
POST api/book_hotel.php
Body: {
  "session_token": "abc123...",
  "hotel_id": 1,
  "check_in_date": "2024-12-25",
  "check_out_date": "2024-12-27",
  "guests": 2,
  "rooms": 1,
  "special_requests": "طلب خاص"
}
```

### 4. حجز مطعم:
```
POST api/book_restaurant.php
Body: {
  "session_token": "abc123...",
  "restaurant_id": 1,
  "booking_date": "2024-12-25",
  "booking_time": "19:00",
  "guests": 4,
  "special_requests": "طاولة بجانب النافذة"
}
```

### 5. حجز رحلة جوية:
```
POST api/book_flight.php
Body: {
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

### 6. حفظ خطة الرحلة:
```
POST api/save_travel_plan.php
Body: {
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
    "interests": ["تسوق", "ترفيه"],
    "activities": ["زيارة برج خليفة"],
    "selected_hotels": [1, 2],
    "selected_restaurants": [3, 4]
  }
}
```

### 7. الحصول على جميع حجوزات المستخدم:
```
GET api/get_user_bookings.php?session_token=abc123...
```

---

## كيفية الاستخدام في JavaScript:

### مثال: تسجيل مستخدم جديد
```javascript
async function register() {
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
  }
}
```

### مثال: تسجيل الدخول
```javascript
async function login() {
  const response = await fetch('api/login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'ahmed@example.com',
      password: 'password123'
    })
  });
  
  const result = await response.json();
  if (result.success) {
    // حفظ session_token في localStorage
    localStorage.setItem('session_token', result.session_token);
    localStorage.setItem('user', JSON.stringify(result.user));
    console.log('تم تسجيل الدخول بنجاح!');
  }
}
```

### مثال: حجز فندق
```javascript
async function bookHotel(hotelId, checkIn, checkOut, guests, rooms) {
  const sessionToken = localStorage.getItem('session_token');
  
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
    console.log('تم الحجز بنجاح!', result.booking_reference);
  }
}
```

---

## ملاحظات مهمة:

1. **حفظ session_token**: بعد تسجيل الدخول، احفظ `session_token` في `localStorage` أو `sessionStorage`
2. **إرسال session_token**: في كل طلب حجز، أرسل `session_token` في الـ body
3. **التحقق من الجلسة**: جميع APIs تتحقق تلقائياً من صحة الجلسة
4. **انتهاء الجلسة**: الجلسة تنتهي بعد 30 يوم

---

## التحقق من التثبيت:

بعد تنفيذ `ADD_USER_TABLES.sql`، تحقق من:
1. وجود الجداول الجديدة في قاعدة البيانات
2. أن APIs تعمل بشكل صحيح
3. أن الحجوزات تُحفظ في قاعدة البيانات

