/**
 * قاعدة بيانات شاملة للفنادق من جميع أنحاء العالم
 */

const hotelsDatabase = [
  // الشرق الأوسط
  { id: 1, name: 'فندق برج العرب', desc: 'فندق 5 نجوم فاخر مع إطلالة خلابة على الخليج', location: 'دبي', country: 'الإمارات', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مسبح', 'سبا', 'مطعم فاخر', 'كونسيرج'], price: 250 },
  { id: 2, name: 'فندق بابل', desc: 'فندق راقي في قلب بغداد مع خدمة ممتازة', location: 'بغداد', country: 'العراق', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'موقف سيارات', 'جيم'], price: 120 },
  { id: 3, name: 'فندق الشاطئ الذهبي', desc: 'فندق على الشاطئ مع إطلالة مباشرة على البحر', location: 'جدة', country: 'السعودية', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مسبح', 'شاطئ خاص', 'مطعم', 'سبا'], price: 220 },
  { id: 4, name: 'فندق الكويت', desc: 'فندق فاخر في قلب الكويت', location: 'الكويت', country: 'الكويت', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مسبح', 'مطعم', 'سبا'], price: 200 },
  { id: 5, name: 'فندق الأندلس', desc: 'فندق 5 نجوم مع تصميم عربي أصيل', location: 'أبوظبي', country: 'الإمارات', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مسبح', 'سبا', 'مطعم فاخر'], price: 280 },
  { id: 6, name: 'فندق الكوثر', desc: 'فندق اقتصادي نظيف ومركزي', location: 'بغداد', country: 'العراق', budget: 'منخفضة', rating: 4.2, features: ['واي فاي مجاني', 'مطعم'], price: 60 },
  { id: 7, name: 'فندق الأصالة', desc: 'فندق عائلي مريح مع خدمات ممتازة', location: 'بغداد', country: 'العراق', budget: 'منخفضة', rating: 4.3, features: ['واي فاي مجاني', 'مطعم', 'موقف سيارات'], price: 75 },
  { id: 8, name: 'فندق المدينة', desc: 'فندق عصري في وسط المدينة', location: 'دبي', country: 'الإمارات', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 130 },
  { id: 9, name: 'فندق السلطان', desc: 'فندق تاريخي أنيق في إسطنبول', location: 'إسطنبول', country: 'تركيا', budget: 'متوسطة', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'مسبح', 'جيم'], price: 150 },
  { id: 10, name: 'فندق القصر الملكي', desc: 'فندق فاخر مع تصميم كلاسيكي أنيق', location: 'إسطنبول', country: 'تركيا', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مسبح', 'سبا', 'مطعم فاخر', 'كونسيرج'], price: 280 },
  { id: 11, name: 'فندق الأهرام', desc: 'فندق فاخر مع إطلالة على الأهرامات', location: 'الجيزة', country: 'مصر', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مسبح', 'مطعم', 'سبا'], price: 200 },
  { id: 12, name: 'فندق النيل', desc: 'فندق على ضفاف النيل', location: 'القاهرة', country: 'مصر', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 140 },
  { id: 13, name: 'فندق الكرمل', desc: 'فندق في قلب بيروت', location: 'بيروت', country: 'لبنان', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 120 },
  { id: 14, name: 'فندق البحر الميت', desc: 'منتجع فاخر على شاطئ البحر الميت', location: 'البحر الميت', country: 'الأردن', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مسبح', 'سبا', 'شاطئ خاص'], price: 180 },
  
  // أوروبا
  { id: 15, name: 'Hotel Eiffel', desc: 'فندق فاخر مع إطلالة على برج إيفل', location: 'باريس', country: 'فرنسا', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مطعم فاخر', 'سبا', 'كونسيرج'], price: 300 },
  { id: 16, name: 'Paris Central', desc: 'فندق راقي في قلب باريس', location: 'باريس', country: 'فرنسا', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 150 },
  { id: 17, name: 'Roma Colosseum', desc: 'فندق تاريخي قرب الكولوسيوم', location: 'روما', country: 'إيطاليا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مطعم', 'سبا'], price: 220 },
  { id: 18, name: 'Milan Fashion', desc: 'فندق عصري في منطقة الموضة', location: 'ميلان', country: 'إيطاليا', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 140 },
  { id: 19, name: 'London Bridge', desc: 'فندق كلاسيكي قرب جسر لندن', location: 'لندن', country: 'بريطانيا', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'سبا'], price: 200 },
  { id: 20, name: 'London Central', desc: 'فندق اقتصادي في وسط لندن', location: 'لندن', country: 'بريطانيا', budget: 'منخفضة', rating: 4.3, features: ['واي فاي مجاني', 'مطعم'], price: 80 },
  { id: 21, name: 'Barcelona Beach', desc: 'فندق على الشاطئ في برشلونة', location: 'برشلونة', country: 'إسبانيا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مسبح', 'شاطئ خاص', 'مطعم'], price: 210 },
  { id: 22, name: 'Madrid Central', desc: 'فندق في قلب مدريد', location: 'مدريد', country: 'إسبانيا', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 130 },
  { id: 23, name: 'Berlin Wall', desc: 'فندق عصري قرب جدار برلين', location: 'برلين', country: 'ألمانيا', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 120 },
  { id: 24, name: 'Munich Oktoberfest', desc: 'فندق قرب ميدان أكتوبر', location: 'ميونخ', country: 'ألمانيا', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'بار'], price: 140 },
  { id: 25, name: 'Athens Acropolis', desc: 'فندق مع إطلالة على الأكروبوليس', location: 'أثينا', country: 'اليونان', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 180 },
  { id: 26, name: 'Amsterdam Canal', desc: 'فندق على قناة أمستردام', location: 'أمستردام', country: 'هولندا', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم'], price: 150 },
  { id: 27, name: 'Vienna Opera', desc: 'فندق فاخر قرب دار الأوبرا', location: 'فيينا', country: 'النمسا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مطعم فاخر', 'سبا'], price: 220 },
  { id: 28, name: 'Prague Castle', desc: 'فندق مع إطلالة على قلعة براغ', location: 'براغ', country: 'التشيك', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم'], price: 110 },
  { id: 29, name: 'Stockholm Archipelago', desc: 'فندق على الأرخبيل', location: 'ستوكهولم', country: 'السويد', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'سبا'], price: 200 },
  { id: 30, name: 'Oslo Fjord', desc: 'فندق مع إطلالة على الفيورد', location: 'أوسلو', country: 'النرويج', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 240 },
  
  // آسيا
  { id: 31, name: 'Tokyo Skytree', desc: 'فندق فاخر مع إطلالة على سكاي تري', location: 'طوكيو', country: 'اليابان', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مطعم فاخر', 'سبا', 'كونسيرج'], price: 320 },
  { id: 32, name: 'Tokyo Central', desc: 'فندق اقتصادي في وسط طوكيو', location: 'طوكيو', country: 'اليابان', budget: 'منخفضة', rating: 4.4, features: ['واي فاي مجاني', 'مطعم'], price: 90 },
  { id: 33, name: 'Beijing Forbidden City', desc: 'فندق قرب المدينة المحرمة', location: 'بكين', country: 'الصين', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مطعم', 'سبا'], price: 200 },
  { id: 34, name: 'Shanghai Bund', desc: 'فندق فاخر على الواجهة البحرية', location: 'شنغهاي', country: 'الصين', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مطعم فاخر', 'سبا'], price: 280 },
  { id: 35, name: 'Bangkok Riverside', desc: 'فندق على نهر تشاو فرايا', location: 'بانكوك', country: 'تايلاند', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 100 },
  { id: 36, name: 'Seoul Gangnam', desc: 'فندق عصري في منطقة جانجنام', location: 'سيول', country: 'كوريا', budget: 'متوسطة', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 150 },
  { id: 37, name: 'Mumbai Gateway', desc: 'فندق قرب بوابة الهند', location: 'مومباي', country: 'الهند', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم'], price: 80 },
  { id: 38, name: 'Delhi Red Fort', desc: 'فندق قرب القلعة الحمراء', location: 'دلهي', country: 'الهند', budget: 'منخفضة', rating: 4.3, features: ['واي فاي مجاني', 'مطعم'], price: 60 },
  { id: 39, name: 'Singapore Marina', desc: 'فندق فاخر على خليج مارينا', location: 'سنغافورة', country: 'سنغافورة', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مطعم فاخر', 'مسبح', 'سبا'], price: 300 },
  { id: 40, name: 'Kuala Lumpur Twin Towers', desc: 'فندق مع إطلالة على البرجين التوأم', location: 'كوالالمبور', country: 'ماليزيا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 180 },
  { id: 41, name: 'Bali Beach Resort', desc: 'منتجع فاخر على شاطئ بالي', location: 'بالي', country: 'إندونيسيا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مسبح', 'شاطئ خاص', 'سبا'], price: 200 },
  { id: 42, name: 'Manila Bay', desc: 'فندق مع إطلالة على خليج مانيلا', location: 'مانيلا', country: 'الفلبين', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 110 },
  
  // أمريكا الشمالية
  { id: 43, name: 'New York Times Square', desc: 'فندق في قلب تايمز سكوير', location: 'نيويورك', country: 'أمريكا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مطعم فاخر', 'سبا'], price: 350 },
  { id: 44, name: 'New York Central', desc: 'فندق اقتصادي في وسط نيويورك', location: 'نيويورك', country: 'أمريكا', budget: 'منخفضة', rating: 4.2, features: ['واي فاي مجاني', 'مطعم'], price: 100 },
  { id: 45, name: 'LA Hollywood', desc: 'فندق في قلب هوليوود', location: 'لوس أنجلوس', country: 'أمريكا', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 250 },
  { id: 46, name: 'Chicago Downtown', desc: 'فندق في وسط شيكاغو', location: 'شيكاغو', country: 'أمريكا', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 160 },
  { id: 47, name: 'Miami Beach', desc: 'فندق على شاطئ ميامي', location: 'ميامي', country: 'أمريكا', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مسبح', 'شاطئ خاص', 'سبا'], price: 300 },
  { id: 48, name: 'Las Vegas Strip', desc: 'فندق فاخر على الستريب', location: 'لاس فيغاس', country: 'أمريكا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'كازينو', 'مطعم', 'مسبح'], price: 280 },
  { id: 49, name: 'San Francisco Bay', desc: 'فندق مع إطلالة على الخليج', location: 'سان فرانسيسكو', country: 'أمريكا', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 220 },
  { id: 50, name: 'Toronto CN Tower', desc: 'فندق مع إطلالة على برج CN', location: 'تورونتو', country: 'كندا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مطعم', 'سبا'], price: 200 },
  { id: 51, name: 'Vancouver Mountain', desc: 'فندق مع إطلالة على الجبال', location: 'فانكوفر', country: 'كندا', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 180 },
  { id: 52, name: 'Mexico City Zocalo', desc: 'فندق في قلب مكسيكو سيتي', location: 'مكسيكو سيتي', country: 'المكسيك', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم'], price: 90 },
  
  // أمريكا الجنوبية
  { id: 53, name: 'Rio Copacabana', desc: 'فندق على شاطئ كوباكابانا', location: 'ريو دي جانيرو', country: 'البرازيل', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مسبح', 'شاطئ خاص', 'مطعم'], price: 200 },
  { id: 54, name: 'Sao Paulo Central', desc: 'فندق في قلب ساو باولو', location: 'ساو باولو', country: 'البرازيل', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 120 },
  { id: 55, name: 'Buenos Aires Tango', desc: 'فندق في حي التانغو', location: 'بوينس آيرس', country: 'الأرجنتين', budget: 'متوسطة', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 140 },
  { id: 56, name: 'Lima Historic', desc: 'فندق في المركز التاريخي', location: 'ليما', country: 'بيرو', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم'], price: 100 },
  { id: 57, name: 'Santiago Andes', desc: 'فندق مع إطلالة على جبال الأنديز', location: 'سانتياغو', country: 'تشيلي', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 130 },
  
  // أفريقيا
  { id: 58, name: 'Cairo Nile', desc: 'فندق على ضفاف النيل', location: 'القاهرة', country: 'مصر', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 140 },
  { id: 59, name: 'Marrakech Medina', desc: 'فندق في المدينة القديمة', location: 'مراكش', country: 'المغرب', budget: 'متوسطة', rating: 4.7, features: ['واي فاي مجاني', 'مطعم', 'سبا'], price: 120 },
  { id: 60, name: 'Cape Town Table Mountain', desc: 'فندق مع إطلالة على جبل الطاولة', location: 'كيب تاون', country: 'جنوب أفريقيا', budget: 'عالية', rating: 4.8, features: ['واي فاي مجاني', 'مطعم', 'مسبح', 'سبا'], price: 180 },
  { id: 61, name: 'Nairobi Safari', desc: 'فندق قرب محمية السفاري', location: 'نيروبي', country: 'كينيا', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم'], price: 100 },
  
  // أستراليا
  { id: 62, name: 'Sydney Opera House', desc: 'فندق فاخر مع إطلالة على دار الأوبرا', location: 'سيدني', country: 'أستراليا', budget: 'عالية', rating: 4.9, features: ['واي فاي مجاني', 'مطعم فاخر', 'مسبح', 'سبا'], price: 320 },
  { id: 63, name: 'Melbourne Central', desc: 'فندق في قلب ملبورن', location: 'ملبورن', country: 'أستراليا', budget: 'متوسطة', rating: 4.6, features: ['واي فاي مجاني', 'مطعم', 'جيم'], price: 150 },
  { id: 64, name: 'Brisbane River', desc: 'فندق على نهر بريسبان', location: 'بريسبان', country: 'أستراليا', budget: 'متوسطة', rating: 4.5, features: ['واي فاي مجاني', 'مطعم', 'مسبح'], price: 140 },
  { id: 65, name: 'Perth Beach', desc: 'فندق على شاطئ بيرث', location: 'بيرث', country: 'أستراليا', budget: 'عالية', rating: 4.7, features: ['واي فاي مجاني', 'مسبح', 'شاطئ خاص', 'مطعم'], price: 200 }
];

