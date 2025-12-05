# 🚀 دليل تنفيذ مشروع ArhGo Trip Planner

## 📋 المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:
- ✅ **XAMPP** أو **WAMP** أو **MAMP** (يحتوي على Apache + MySQL + PHP)
- ✅ **MySQL** يعمل
- ✅ **PHP 7.4+** يعمل

---

## 🎯 خطوات التنفيذ

### الخطوة 1: تشغيل الخوادم

#### أ) تشغيل Apache و MySQL:
- افتح **XAMPP Control Panel**
- اضغط **Start** على **Apache**
- اضغط **Start** على **MySQL**

#### ب) التحقق من التشغيل:
- افتح المتصفح واذهب إلى: `http://localhost`
- يجب أن ترى صفحة XAMPP

---

### الخطوة 2: إعداد قاعدة البيانات

#### الطريقة الأولى: PowerShell (الأسهل)

افتح **PowerShell** في مجلد المشروع واكتب:

```powershell
# 1. إنشاء قاعدة البيانات والجداول
Get-Content database\install_all.sql | mysql -u root -p

# 2. إدراج الدول (12 دولة)
Get-Content database\insert_countries.sql | mysql -u root -p arhgo_trip_planner

# 3. إدراج المدن (60+ مدينة)
Get-Content database\insert_cities.sql | mysql -u root -p arhgo_trip_planner

# 4. إدراج الفنادق
Get-Content database\insert_hotels.sql | mysql -u root -p arhgo_trip_planner

# 5. إدراج المطاعم
Get-Content database\insert_restaurants.sql | mysql -u root -p arhgo_trip_planner
```

> **ملاحظة:** سيطلب منك إدخال كلمة مرور MySQL (عادة فارغة في XAMPP)

#### الطريقة الثانية: CMD

افتح **Command Prompt** في مجلد المشروع:

```cmd
mysql -u root -p < database\install_all.sql
mysql -u root -p arhgo_trip_planner < database\insert_countries.sql
mysql -u root -p arhgo_trip_planner < database\insert_cities.sql
mysql -u root -p arhgo_trip_planner < database\insert_hotels.sql
mysql -u root -p arhgo_trip_planner < database\insert_restaurants.sql
```

#### الطريقة الثالثة: phpMyAdmin (الأسهل للمبتدئين)

1. افتح المتصفح واذهب إلى: `http://localhost/phpmyadmin`
2. اضغط على **Import** في القائمة العلوية
3. استورد الملفات بالترتيب:
   - `database/install_all.sql`
   - `database/insert_countries.sql`
   - `database/insert_cities.sql`
   - `database/insert_hotels.sql`
   - `database/insert_restaurants.sql`

---

### الخطوة 3: إعداد ملف الاتصال بقاعدة البيانات

افتح ملف `api/config.php` وتأكد من الإعدادات:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');        // غيّر إذا كان مختلف
define('DB_PASS', '');            // غيّر إذا كان لديك كلمة مرور
define('DB_NAME', 'arhgo_trip_planner');
```

---

### الخطوة 4: نقل المشروع إلى مجلد الخادم

#### إذا كنت تستخدم XAMPP:
انسخ مجلد المشروع إلى:
```
C:\xampp\htdocs\ArhGo-trip-planner
```

#### إذا كنت تستخدم WAMP:
انسخ مجلد المشروع إلى:
```
C:\wamp64\www\ArhGo-trip-planner
```

---

### الخطوة 5: اختبار API

افتح المتصفح واختبر الروابط التالية:

1. **الدول:**
   ```
   http://localhost/ArhGo-trip-planner/api/get_countries.php
   ```
   يجب أن ترى 12 دولة

2. **المدن:**
   ```
   http://localhost/ArhGo-trip-planner/api/get_cities.php?country_id=1
   ```
   يجب أن ترى مدن السعودية

3. **الفنادق:**
   ```
   http://localhost/ArhGo-trip-planner/api/get_hotels.php?country_id=1
   ```
   يجب أن ترى فنادق السعودية

4. **المطاعم:**
   ```
   http://localhost/ArhGo-trip-planner/api/get_restaurants.php?country_id=1
   ```
   يجب أن ترى مطاعم السعودية

---

### الخطوة 6: فتح المشروع

افتح المتصفح واذهب إلى:
```
http://localhost/ArhGo-trip-planner/index.html
```

---

## ✅ التحقق من نجاح التثبيت

### 1. قاعدة البيانات:
- ✅ قاعدة البيانات `arhgo_trip_planner` موجودة
- ✅ جدول `arab_countries_asia` يحتوي على 12 دولة
- ✅ جدول `cities` يحتوي على 60+ مدينة
- ✅ جدول `hotels` يحتوي على فنادق
- ✅ جدول `restaurants` يحتوي على مطاعم

### 2. API:
- ✅ جميع روابط API تعمل وتُرجع JSON
- ✅ البيانات بالعربية تظهر بشكل صحيح

### 3. الموقع:
- ✅ الصفحة الرئيسية تفتح بدون أخطاء
- ✅ قائمة الدول تعرض 12 دولة عربية
- ✅ البحث عن الفنادق يعمل
- ✅ البحث عن المطاعم يعمل

---

## 🔧 حل المشاكل الشائعة

### مشكلة: خطأ "Connection failed"
**الحل:** تأكد من:
- MySQL يعمل في XAMPP
- كلمة المرور في `api/config.php` صحيحة
- اسم قاعدة البيانات `arhgo_trip_planner` موجود

### مشكلة: خطأ "Foreign key constraint"
**الحل:** تأكد من تنفيذ الملفات بالترتيب:
1. `install_all.sql`
2. `insert_countries.sql`
3. `insert_cities.sql`
4. `insert_hotels.sql`
5. `insert_restaurants.sql`

### مشكلة: البيانات لا تظهر بالعربية
**الحل:** تأكد من:
- قاعدة البيانات تستخدم `utf8mb4`
- ملفات PHP تستخدم `utf8mb4`
- رأس HTTP يحتوي على `charset=utf-8`

### مشكلة: API لا يعمل (404 Not Found)
**الحل:** تأكد من:
- المشروع في مجلد `htdocs` أو `www`
- المسار في المتصفح صحيح
- Apache يعمل

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. تحقق من ملف `database/QUICK_INSTALL.md`
2. تحقق من ملف `INSTALLATION_GUIDE.md`
3. تأكد من تنفيذ جميع الخطوات بالترتيب

---

## 🎉 تهانينا!

إذا وصلت إلى هنا وكل شيء يعمل، فأنت جاهز لاستخدام ArhGo Trip Planner!

**الخطوة التالية:** ابدأ بتخطيط رحلتك! 🗺️✈️

