# كيفية فتح المشروع بشكل صحيح

## ⚠️ مهم جداً:

**لا تفتح الملفات مباشرة من النظام!**

❌ **خطأ:**
```
C:/Users/lenovo/OneDrive/Desktop/GPIS/ArhGo-trip-planner/hotel.html
```

✅ **صحيح:**
```
http://localhost/ArhGo-trip-planner/hotel.html
```

---

## الخطوات:

### 1. تأكد من أن WAMP/XAMPP يعمل:
- ✅ WAMP: يجب أن يكون اللون **أخضر**
- ✅ XAMPP: اضغط **Start** على Apache و MySQL

### 2. افتح المتصفح واكتب:
```
http://localhost/ArhGo-trip-planner/hotel.html
```

**أو:**

```
http://localhost/ArhGo-trip-planner/index.html
```

---

## لماذا؟

عند فتح الملف مباشرة من النظام (`file://`):
- ❌ JavaScript لا يستطيع الوصول إلى API
- ❌ `fetch()` لا يعمل
- ❌ PHP لا يعمل
- ❌ قاعدة البيانات لا تعمل

عند فتحه من `http://localhost`:
- ✅ كل شيء يعمل بشكل صحيح
- ✅ API يعمل
- ✅ قاعدة البيانات متصلة
- ✅ البحث يعمل

---

## روابط سريعة:

- الرئيسية: `http://localhost/ArhGo-trip-planner/index.html`
- الفنادق: `http://localhost/ArhGo-trip-planner/hotel.html`
- المطاعم: `http://localhost/ArhGo-trip-planner/Restuarnt.html`
- الرحلات: `http://localhost/ArhGo-trip-planner/flights.html`
- الطقس: `http://localhost/ArhGo-trip-planner/weather.html`

---

## إذا لم يعمل:

1. تأكد من أن الملفات موجودة في:
   ```
   C:\wamp64\www\ArhGo-trip-planner\
   ```
   أو
   ```
   C:\xampp\htdocs\ArhGo-trip-planner\
   ```

2. تأكد من أن Apache و MySQL يعملان

3. جرب إعادة تشغيل WAMP/XAMPP

