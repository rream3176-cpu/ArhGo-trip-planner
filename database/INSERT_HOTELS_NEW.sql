-- ============================================
-- إدراج الفنادق للدول العربية في آسيا
-- قاعدة بيانات شاملة وضخمة
-- ============================================

USE arhgo_new_db;

-- السعودية - الرياض
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الفيصلية', 'فندق 5 نجوم فاخر في قلب الرياض مع إطلالة على برج الفيصلية', 'الرياض', 1, 1, 'عالية', 4.9, 450, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج", "جيم", "موقف سيارات"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الرياض', 'فندق راقي في وسط العاصمة مع خدمات ممتازة', 'الرياض', 1, 1, 'متوسطة', 4.6, 200, '["واي فاي مجاني", "مطعم", "جيم", "موقف سيارات"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق المطار', 'فندق اقتصادي قرب مطار الملك خالد', 'الرياض', 1, 1, 'منخفضة', 4.2, 120, '["واي فاي مجاني", "مطعم", "موقف سيارات"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('فندق قصر النخيل', 'فندق فاخر مع تصميم عربي أصيل', 'الرياض', 1, 1, 'عالية', 4.8, 380, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE);

-- السعودية - جدة
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الشاطئ الذهبي', 'فندق على الشاطئ مع إطلالة مباشرة على البحر الأحمر', 'جدة', 2, 1, 'عالية', 4.8, 320, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE),
('فندق الكورنيش', 'فندق راقي على كورنيش جدة', 'جدة', 2, 1, 'متوسطة', 4.5, 180, '["واي فاي مجاني", "مطعم", "مسبح", "جيم"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق المدينة', 'فندق اقتصادي في وسط جدة', 'جدة', 2, 1, 'منخفضة', 4.3, 100, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('فندق البحر الأحمر', 'منتجع فاخر على شاطئ البحر الأحمر', 'جدة', 2, 1, 'عالية', 4.9, 400, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "سبا", "مطعم فاخر", "كونسيرج"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- الإمارات - دبي
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق برج العرب', 'فندق 7 نجوم فاخر مع إطلالة خلابة على الخليج', 'دبي', 8, 2, 'عالية', 4.9, 800, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج", "جيم", "شاطئ خاص"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('فندق برج خليفة', 'فندق في أطول برج في العالم', 'دبي', 8, 2, 'عالية', 4.8, 600, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق دبي مول', 'فندق قرب أكبر مول في العالم', 'دبي', 8, 2, 'متوسطة', 4.6, 250, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق المدينة', 'فندق عصري في وسط دبي', 'دبي', 8, 2, 'متوسطة', 4.5, 200, '["واي فاي مجاني", "مطعم", "جيم"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق ديرة', 'فندق اقتصادي في منطقة ديرة', 'دبي', 8, 2, 'منخفضة', 4.2, 120, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE);

-- الإمارات - أبوظبي
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الأندلس', 'فندق 5 نجوم مع تصميم عربي أصيل', 'أبوظبي', 9, 2, 'عالية', 4.9, 450, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الإمارات', 'فندق فاخر في قلب أبوظبي', 'أبوظبي', 9, 2, 'عالية', 4.8, 380, '["واي فاي مجاني", "مسبح", "سبا", "مطعم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الياسمين', 'فندق راقي مع خدمات ممتازة', 'أبوظبي', 9, 2, 'متوسطة', 4.6, 220, '["واي فاي مجاني", "مطعم", "مسبح", "جيم"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- الكويت - الكويت
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الكويت', 'فندق فاخر في قلب الكويت', 'الكويت', 15, 3, 'عالية', 4.7, 300, '["واي فاي مجاني", "مسبح", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
('فندق الخليج', 'فندق على شاطئ الخليج العربي', 'الكويت', 15, 3, 'عالية', 4.8, 350, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('فندق السالمية', 'فندق راقي في منطقة السالمية', 'الكويت', 15, 3, 'متوسطة', 4.5, 180, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الكويت الدولي', 'فندق اقتصادي قرب المطار', 'الكويت', 15, 3, 'منخفضة', 4.2, 110, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE);

-- قطر - الدوحة
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق اللؤلؤة', 'فندق فاخر في جزيرة اللؤلؤة', 'الدوحة', 19, 4, 'عالية', 4.9, 500, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج", "شاطئ خاص"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('فندق الدوحة', 'فندق راقي في قلب العاصمة', 'الدوحة', 19, 4, 'عالية', 4.7, 400, '["واي فاي مجاني", "مسبح", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الكورنيش', 'فندق على كورنيش الدوحة', 'الدوحة', 19, 4, 'متوسطة', 4.6, 250, '["واي فاي مجاني", "مطعم", "مسبح", "جيم"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- البحرين - المنامة
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق البحرين', 'فندق فاخر في قلب المنامة', 'المنامة', 23, 5, 'عالية', 4.8, 350, '["واي فاي مجاني", "مسبح", "مطعم", "سبا", "كونسيرج"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الخليج', 'فندق على شاطئ الخليج', 'المنامة', 23, 5, 'عالية', 4.7, 320, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('فندق المدينة', 'فندق راقي في وسط المنامة', 'المنامة', 23, 5, 'متوسطة', 4.5, 200, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- عُمان - مسقط
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق مسقط', 'فندق فاخر في عاصمة عُمان', 'مسقط', 27, 6, 'عالية', 4.8, 380, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الجبال', 'فندق مع إطلالة على الجبال', 'مسقط', 27, 6, 'متوسطة', 4.6, 220, '["واي فاي مجاني", "مطعم", "مسبح", "جيم"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الساحل', 'فندق على ساحل خليج عمان', 'مسقط', 27, 6, 'عالية', 4.7, 300, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- اليمن - صنعاء
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق صنعاء', 'فندق في العاصمة اليمنية', 'صنعاء', 31, 7, 'متوسطة', 4.4, 150, '["واي فاي مجاني", "مطعم", "جيم"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق المدينة القديمة', 'فندق في المدينة القديمة التاريخية', 'صنعاء', 31, 7, 'منخفضة', 4.2, 80, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE);

-- العراق - بغداد
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق بابل', 'فندق راقي في قلب بغداد مع خدمة ممتازة', 'بغداد', 35, 8, 'متوسطة', 4.6, 180, '["واي فاي مجاني", "مطعم", "موقف سيارات", "جيم"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الكوثر', 'فندق اقتصادي نظيف ومركزي', 'بغداد', 35, 8, 'منخفضة', 4.2, 90, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('فندق الأصالة', 'فندق عائلي مريح مع خدمات ممتازة', 'بغداد', 35, 8, 'منخفضة', 4.3, 100, '["واي فاي مجاني", "مطعم", "موقف سيارات"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('فندق الرشيد', 'فندق فاخر في بغداد', 'بغداد', 35, 8, 'عالية', 4.7, 250, '["واي فاي مجاني", "مسبح", "مطعم", "سبا", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE);

-- سوريا - دمشق
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الشام', 'فندق في قلب دمشق القديمة', 'دمشق', 39, 9, 'متوسطة', 4.5, 150, '["واي فاي مجاني", "مطعم", "جيم"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الأموي', 'فندق قرب الجامع الأموي', 'دمشق', 39, 9, 'متوسطة', 4.4, 140, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE);

-- الأردن - عمان
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق عمان', 'فندق فاخر في عاصمة الأردن', 'عمان', 43, 10, 'عالية', 4.7, 280, '["واي فاي مجاني", "مسبح", "مطعم", "سبا", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق البحر الميت', 'منتجع فاخر على شاطئ البحر الميت', 'البحر الميت', 48, 10, 'عالية', 4.8, 350, '["واي فاي مجاني", "مسبح", "سبا", "شاطئ خاص", "مطعم فاخر"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('فندق البتراء', 'فندق قرب المدينة الأثرية', 'البتراء', 47, 10, 'متوسطة', 4.6, 200, '["واي فاي مجاني", "مطعم", "مسبح", "جيم"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- لبنان - بيروت
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الكرمل', 'فندق في قلب بيروت', 'بيروت', 49, 11, 'متوسطة', 4.5, 200, '["واي فاي مجاني", "مطعم", "جيم"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الكورنيش', 'فندق على كورنيش بيروت', 'بيروت', 49, 11, 'عالية', 4.7, 300, '["واي فاي مجاني", "مسبح", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق فينيسيا', 'فندق فاخر مع إطلالة على البحر', 'بيروت', 49, 11, 'عالية', 4.8, 350, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم فاخر", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- فلسطين - القدس
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق القدس', 'فندق في المدينة المقدسة', 'القدس', 55, 12, 'متوسطة', 4.6, 220, '["واي فاي مجاني", "مطعم", "جيم"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الأقصى', 'فندق قرب المسجد الأقصى', 'القدس', 55, 12, 'متوسطة', 4.5, 200, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('فندق بيت لحم', 'فندق في مدينة بيت لحم', 'بيت لحم', 57, 12, 'متوسطة', 4.4, 180, '["واي فاي مجاني", "مطعم", "جيم"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- ============================================
-- إضافة المزيد من الفنادق لجعل قاعدة البيانات ضخمة
-- ============================================

-- السعودية - الرياض (إضافية)
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الملك فهد', 'فندق 5 نجوم في قلب الرياض', 'الرياض', 1, 1, 'عالية', 4.7, 420, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق النور', 'فندق راقي مع خدمات ممتازة', 'الرياض', 1, 1, 'متوسطة', 4.5, 190, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الريان', 'فندق اقتصادي نظيف ومركزي', 'الرياض', 1, 1, 'منخفضة', 4.1, 110, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('فندق العليا', 'فندق في منطقة العليا الراقية', 'الرياض', 1, 1, 'عالية', 4.8, 400, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الملك خالد', 'فندق فاخر مع إطلالة على المدينة', 'الرياض', 1, 1, 'عالية', 4.9, 480, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE);

-- السعودية - جدة (إضافية)
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الحرمين', 'فندق قرب الحرمين الشريفين', 'جدة', 2, 1, 'متوسطة', 4.6, 200, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الكورنيش الذهبي', 'فندق على كورنيش جدة مع إطلالة على البحر', 'جدة', 2, 1, 'عالية', 4.8, 350, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE),
('فندق جدة الدولي', 'فندق قرب مطار جدة', 'جدة', 2, 1, 'منخفضة', 4.2, 95, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE),
('فندق الشاطئ', 'منتجع على شاطئ البحر الأحمر', 'جدة', 2, 1, 'عالية', 4.9, 450, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "سبا", "مطعم فاخر", "كونسيرج", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- السعودية - الدمام
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الدمام', 'فندق فاخر في المنطقة الشرقية', 'الدمام', 3, 1, 'عالية', 4.7, 320, '["واي فاي مجاني", "مسبح", "مطعم", "سبا", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الخليج', 'فندق على شاطئ الخليج العربي', 'الدمام', 3, 1, 'عالية', 4.8, 380, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('فندق الخبر', 'فندق راقي في الخبر', 'الخبر', 8, 1, 'متوسطة', 4.6, 220, '["واي فاي مجاني", "مطعم", "مسبح", "جيم"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- الإمارات - دبي (إضافية)
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق جميرا', 'منتجع فاخر على شاطئ جميرا', 'دبي', 8, 2, 'عالية', 4.9, 750, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "سبا", "مطعم فاخر", "كونسيرج", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
('فندق المارينا', 'فندق في منطقة المارينا', 'دبي', 8, 2, 'عالية', 4.8, 550, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق دبي فستيفال', 'فندق قرب دبي فستيفال سيتي', 'دبي', 8, 2, 'متوسطة', 4.6, 280, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق دبي لاند', 'فندق في دبي لاند', 'دبي', 8, 2, 'متوسطة', 4.5, 230, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق دبي مول 2', 'فندق آخر قرب دبي مول', 'دبي', 8, 2, 'متوسطة', 4.6, 260, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- الإمارات - الشارقة
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الشارقة', 'فندق فاخر في عاصمة الثقافة', 'الشارقة', 10, 2, 'عالية', 4.7, 350, '["واي فاي مجاني", "مسبح", "مطعم", "سبا", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الثقافة', 'فندق راقي في الشارقة', 'الشارقة', 10, 2, 'متوسطة', 4.5, 200, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- الكويت - الكويت (إضافية)
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الكويت تاور', 'فندق في برج الكويت', 'الكويت', 15, 3, 'عالية', 4.8, 380, '["واي فاي مجاني", "مسبح", "مطعم", "سبا", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق السالمية بلازا', 'فندق في منطقة السالمية', 'السالمية', 16, 3, 'متوسطة', 4.6, 200, '["واي فاي مجاني", "مطعم", "جيم", "مسبح"]', TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE);

-- قطر - الدوحة (إضافية)
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق قطر', 'فندق فاخر في الدوحة', 'الدوحة', 19, 4, 'عالية', 4.8, 450, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق اللؤلؤة 2', 'فندق آخر في جزيرة اللؤلؤة', 'الدوحة', 19, 4, 'عالية', 4.9, 550, '["واي فاي مجاني", "مسبح", "سبا", "مطعم فاخر", "كونسيرج", "شاطئ خاص"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- العراق - بغداد (إضافية)
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق بغداد الدولي', 'فندق راقي في بغداد', 'بغداد', 35, 8, 'متوسطة', 4.5, 170, '["واي فاي مجاني", "مطعم", "جيم"]', TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
('فندق الزوراء', 'فندق في منطقة الزوراء', 'بغداد', 35, 8, 'منخفضة', 4.3, 95, '["واي فاي مجاني", "مطعم"]', TRUE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE);

-- الأردن - عمان (إضافية)
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق الأردن', 'فندق فاخر في عمان', 'عمان', 43, 10, 'عالية', 4.8, 300, '["واي فاي مجاني", "مسبح", "مطعم", "سبا", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق العقبة', 'فندق على شاطئ العقبة', 'العقبة', 46, 10, 'عالية', 4.7, 320, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- لبنان - بيروت (إضافية)
INSERT IGNORE INTO hotels (name, description, location, city_id, country_id, budget, rating, price, features, wifi, pool, spa, restaurant, gym, beach_access, concierge) VALUES
('فندق لبنان', 'فندق فاخر في بيروت', 'بيروت', 49, 11, 'عالية', 4.8, 380, '["واي فاي مجاني", "مسبح", "مطعم", "سبا", "جيم"]', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
('فندق الشاطئ', 'منتجع على شاطئ بيروت', 'بيروت', 49, 11, 'عالية', 4.9, 420, '["واي فاي مجاني", "مسبح", "شاطئ خاص", "مطعم فاخر", "سبا"]', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

