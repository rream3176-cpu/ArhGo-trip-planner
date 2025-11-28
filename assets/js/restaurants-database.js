/**
 * قاعدة بيانات شاملة للمطاعم من جميع أنحاء العالم
 */

const restaurantsDatabase = [
  // الشرق الأوسط
  { id: 1, name: 'مطعم الشام', desc: 'مطعم شرقي أصيل يقدم أشهى الأطباق العربية التقليدية', foodType: 'arabic', rating: 4.8, priceRange: '$', hours: { open: 11, close: 23 }, location: 'بغداد', country: 'العراق' },
  { id: 2, name: 'مطعم النخيل', desc: 'مطعم عائلي هادئ مع حديقة خارجية', foodType: 'arabic', rating: 4.6, priceRange: '$$', hours: { open: 10, close: 22 }, location: 'بغداد', country: 'العراق' },
  { id: 3, name: 'مطعم البحر الأحمر', desc: 'أفضل المأكولات البحرية الطازجة', foodType: 'seafood', rating: 4.9, priceRange: '$$', hours: { open: 12, close: 22 }, location: 'جدة', country: 'السعودية' },
  { id: 4, name: 'مطعم الكويت', desc: 'مطعم كويتي أصيل مع أطباق تقليدية شهية', foodType: 'arabic', rating: 4.7, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'الكويت', country: 'الكويت' },
  { id: 5, name: 'مطعم الأندلس', desc: 'مطعم فاخر يقدم المأكولات العربية والشرقية', foodType: 'arabic', rating: 4.8, priceRange: '$$$', hours: { open: 18, close: 24 }, location: 'دبي', country: 'الإمارات' },
  { id: 6, name: 'مطعم الشرق الأوسط', desc: 'مطعم راقي مع أجواء شرقية أصيلة', foodType: 'arabic', rating: 4.6, priceRange: '$$', hours: { open: 12, close: 23 }, location: 'أبوظبي', country: 'الإمارات' },
  { id: 7, name: 'مطعم الفردوس', desc: 'مطعم لبناني أصيل مع أطباق تقليدية', foodType: 'arabic', rating: 4.7, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'بيروت', country: 'لبنان' },
  { id: 8, name: 'مطعم السلطان', desc: 'مطعم تركي أصيل في قلب إسطنبول', foodType: 'arabic', rating: 4.8, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'إسطنبول', country: 'تركيا' },
  { id: 9, name: 'مطعم القاهرة', desc: 'مطعم مصري أصيل مع أطباق تقليدية', foodType: 'arabic', rating: 4.6, priceRange: '$', hours: { open: 10, close: 22 }, location: 'القاهرة', country: 'مصر' },
  { id: 10, name: 'مطعم الأهرام', desc: 'مطعم فاخر مع إطلالة على الأهرامات', foodType: 'arabic', rating: 4.9, priceRange: '$$$', hours: { open: 12, close: 24 }, location: 'الجيزة', country: 'مصر' },
  
  // أوروبا
  { id: 11, name: 'Le Bistro Parisien', desc: 'مطعم فرنسي أصيل في قلب باريس', foodType: 'western', rating: 4.8, priceRange: '$$$', hours: { open: 18, close: 23 }, location: 'باريس', country: 'فرنسا' },
  { id: 12, name: 'Pizza Italia', desc: 'بيتزا إيطالية أصلية من فرن حجري', foodType: 'italian', rating: 4.5, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'روما', country: 'إيطاليا' },
  { id: 13, name: 'Roma Trattoria', desc: 'مطعم إيطالي تقليدي مع أطباق منزلية', foodType: 'italian', rating: 4.7, priceRange: '$$', hours: { open: 12, close: 22 }, location: 'ميلان', country: 'إيطاليا' },
  { id: 14, name: 'The British Pub', desc: 'مطعم بريطاني تقليدي مع أجواء دافئة', foodType: 'western', rating: 4.4, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'لندن', country: 'بريطانيا' },
  { id: 15, name: 'Tapas Barcelona', desc: 'مطعم إسباني يقدم التاباس الأصيل', foodType: 'western', rating: 4.6, priceRange: '$$', hours: { open: 13, close: 23 }, location: 'برشلونة', country: 'إسبانيا' },
  { id: 16, name: 'Berlin Biergarten', desc: 'مطعم ألماني تقليدي مع بيرة محلية', foodType: 'western', rating: 4.5, priceRange: '$$', hours: { open: 12, close: 24 }, location: 'برلين', country: 'ألمانيا' },
  { id: 17, name: 'Athens Taverna', desc: 'مطعم يوناني أصيل مع أطباق بحرية', foodType: 'seafood', rating: 4.6, priceRange: '$$', hours: { open: 12, close: 23 }, location: 'أثينا', country: 'اليونان' },
  { id: 18, name: 'Amsterdam Cafe', desc: 'مقهى ومطعم هولندي مع أجواء مريحة', foodType: 'western', rating: 4.4, priceRange: '$$', hours: { open: 10, close: 22 }, location: 'أمستردام', country: 'هولندا' },
  { id: 19, name: 'Vienna Schnitzel', desc: 'مطعم نمساوي متخصص في السنتزل', foodType: 'western', rating: 4.7, priceRange: '$$', hours: { open: 12, close: 22 }, location: 'فيينا', country: 'النمسا' },
  { id: 20, name: 'Prague Castle', desc: 'مطعم تشيكي مع إطلالة على القلعة', foodType: 'western', rating: 4.5, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'براغ', country: 'التشيك' },
  
  // آسيا
  { id: 21, name: 'Sushi Master', desc: 'مطعم ياباني أصيل مع شيف محترف', foodType: 'asian', rating: 4.7, priceRange: '$$$', hours: { open: 17, close: 23 }, location: 'طوكيو', country: 'اليابان' },
  { id: 22, name: 'Tokyo Ramen', desc: 'مطعم رامن ياباني أصيل', foodType: 'asian', rating: 4.6, priceRange: '$', hours: { open: 11, close: 23 }, location: 'طوكيو', country: 'اليابان' },
  { id: 23, name: 'Beijing Duck', desc: 'مطعم صيني متخصص في البط المشوي', foodType: 'asian', rating: 4.8, priceRange: '$$', hours: { open: 11, close: 22 }, location: 'بكين', country: 'الصين' },
  { id: 24, name: 'Shanghai Dim Sum', desc: 'مطعم صيني يقدم الديم سوم الأصيل', foodType: 'asian', rating: 4.7, priceRange: '$$', hours: { open: 10, close: 22 }, location: 'شنغهاي', country: 'الصين' },
  { id: 25, name: 'Bangkok Street Food', desc: 'مطعم تايلندي يقدم الأطباق الشعبية', foodType: 'asian', rating: 4.6, priceRange: '$', hours: { open: 11, close: 23 }, location: 'بانكوك', country: 'تايلاند' },
  { id: 26, name: 'Seoul BBQ', desc: 'مطعم كوري متخصص في الشواء', foodType: 'asian', rating: 4.7, priceRange: '$$', hours: { open: 17, close: 23 }, location: 'سيول', country: 'كوريا' },
  { id: 27, name: 'Mumbai Curry', desc: 'مطعم هندي أصيل مع أطباق حارة', foodType: 'asian', rating: 4.6, priceRange: '$$', hours: { open: 12, close: 23 }, location: 'مومباي', country: 'الهند' },
  { id: 28, name: 'Delhi Tandoor', desc: 'مطعم هندي متخصص في التندوري', foodType: 'asian', rating: 4.7, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'دلهي', country: 'الهند' },
  { id: 29, name: 'Singapore Hawker', desc: 'مطعم سنغافوري يقدم الأطباق الآسيوية', foodType: 'asian', rating: 4.6, priceRange: '$', hours: { open: 10, close: 22 }, location: 'سنغافورة', country: 'سنغافورة' },
  { id: 30, name: 'Kuala Lumpur Nasi', desc: 'مطعم ماليزي يقدم الناسي ليماك', foodType: 'asian', rating: 4.5, priceRange: '$', hours: { open: 11, close: 22 }, location: 'كوالالمبور', country: 'ماليزيا' },
  
  // أمريكا الشمالية
  { id: 31, name: 'New York Steakhouse', desc: 'مطعم لحوم فاخر في نيويورك', foodType: 'western', rating: 4.8, priceRange: '$$$', hours: { open: 17, close: 23 }, location: 'نيويورك', country: 'أمريكا' },
  { id: 32, name: 'LA Taco', desc: 'مطعم مكسيكي أصيل في لوس أنجلوس', foodType: 'mexican', rating: 4.6, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'لوس أنجلوس', country: 'أمريكا' },
  { id: 33, name: 'Chicago Deep Dish', desc: 'مطعم بيتزا شيكاغو الشهير', foodType: 'italian', rating: 4.7, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'شيكاغو', country: 'أمريكا' },
  { id: 34, name: 'Miami Seafood', desc: 'مطعم بحري فاخر في ميامي', foodType: 'seafood', rating: 4.8, priceRange: '$$$', hours: { open: 12, close: 23 }, location: 'ميامي', country: 'أمريكا' },
  { id: 35, name: 'San Francisco Sushi', desc: 'مطعم سوشي ياباني في سان فرانسيسكو', foodType: 'asian', rating: 4.7, priceRange: '$$$', hours: { open: 17, close: 23 }, location: 'سان فرانسيسكو', country: 'أمريكا' },
  { id: 36, name: 'Toronto Poutine', desc: 'مطعم كندي يقدم البوتين الكلاسيكي', foodType: 'western', rating: 4.5, priceRange: '$$', hours: { open: 11, close: 23 }, location: 'تورونتو', country: 'كندا' },
  { id: 37, name: 'Vancouver Seafood', desc: 'مطعم بحري مع إطلالة على المحيط', foodType: 'seafood', rating: 4.7, priceRange: '$$$', hours: { open: 12, close: 22 }, location: 'فانكوفر', country: 'كندا' },
  { id: 38, name: 'Mexico City Tacos', desc: 'مطعم تاكو مكسيكي أصيل', foodType: 'mexican', rating: 4.8, priceRange: '$', hours: { open: 10, close: 24 }, location: 'مكسيكو سيتي', country: 'المكسيك' },
  
  // أمريكا الجنوبية
  { id: 39, name: 'Rio Churrasco', desc: 'مطعم برازيلي متخصص في الشواء', foodType: 'western', rating: 4.7, priceRange: '$$', hours: { open: 18, close: 24 }, location: 'ريو دي جانيرو', country: 'البرازيل' },
  { id: 40, name: 'Buenos Aires Steak', desc: 'مطعم لحوم أرجنتيني فاخر', foodType: 'western', rating: 4.8, priceRange: '$$$', hours: { open: 19, close: 24 }, location: 'بوينس آيرس', country: 'الأرجنتين' },
  { id: 41, name: 'Lima Ceviche', desc: 'مطعم بيروفي متخصص في السيفيتشي', foodType: 'seafood', rating: 4.6, priceRange: '$$', hours: { open: 12, close: 22 }, location: 'ليما', country: 'بيرو' },
  { id: 42, name: 'Santiago Empanadas', desc: 'مطعم تشيلي يقدم الإمبانادا', foodType: 'western', rating: 4.5, priceRange: '$', hours: { open: 11, close: 22 }, location: 'سانتياغو', country: 'تشيلي' },
  
  // أفريقيا
  { id: 43, name: 'Cairo Koshary', desc: 'مطعم مصري يقدم الكشري الأصيل', foodType: 'arabic', rating: 4.6, priceRange: '$', hours: { open: 10, close: 22 }, location: 'القاهرة', country: 'مصر' },
  { id: 44, name: 'Marrakech Tagine', desc: 'مطعم مغربي متخصص في الطاجين', foodType: 'arabic', rating: 4.7, priceRange: '$$', hours: { open: 12, close: 23 }, location: 'مراكش', country: 'المغرب' },
  { id: 45, name: 'Cape Town Braai', desc: 'مطعم جنوب أفريقي مع شواء تقليدي', foodType: 'western', rating: 4.6, priceRange: '$$', hours: { open: 18, close: 23 }, location: 'كيب تاون', country: 'جنوب أفريقيا' },
  { id: 46, name: 'Nairobi Nyama', desc: 'مطعم كيني يقدم اللحوم المشوية', foodType: 'western', rating: 4.5, priceRange: '$$', hours: { open: 12, close: 22 }, location: 'نيروبي', country: 'كينيا' },
  
  // أستراليا
  { id: 47, name: 'Sydney Seafood', desc: 'مطعم بحري فاخر مع إطلالة على المرفأ', foodType: 'seafood', rating: 4.8, priceRange: '$$$', hours: { open: 12, close: 23 }, location: 'سيدني', country: 'أستراليا' },
  { id: 48, name: 'Melbourne Brunch', desc: 'مطعم أسترالي يقدم برانش مميز', foodType: 'western', rating: 4.6, priceRange: '$$', hours: { open: 8, close: 15 }, location: 'ملبورن', country: 'أستراليا' },
  { id: 49, name: 'Brisbane BBQ', desc: 'مطعم أسترالي مع شواء في الهواء الطلق', foodType: 'western', rating: 4.5, priceRange: '$$', hours: { open: 17, close: 23 }, location: 'بريسبان', country: 'أستراليا' },
  
  // وجبات سريعة عالمية
  { id: 50, name: 'Burger King', desc: 'وجبات سريعة شهية ومشروبات منعشة', foodType: 'fastfood', rating: 4.3, priceRange: '$', hours: { open: 10, close: 2 }, location: 'بغداد', country: 'العراق' },
  { id: 51, name: 'McDonald\'s', desc: 'سلسلة مطاعم الوجبات السريعة العالمية', foodType: 'fastfood', rating: 4.2, priceRange: '$', hours: { open: 6, close: 2 }, location: 'دبي', country: 'الإمارات' },
  { id: 52, name: 'KFC', desc: 'دجاج مقلي شهي مع وجبات جانبية', foodType: 'fastfood', rating: 4.3, priceRange: '$', hours: { open: 10, close: 24 }, location: 'لندن', country: 'بريطانيا' },
  { id: 53, name: 'Subway', desc: 'ساندويتشات طازجة ومخصصة', foodType: 'fastfood', rating: 4.1, priceRange: '$', hours: { open: 7, close: 23 }, location: 'نيويورك', country: 'أمريكا' },
  { id: 54, name: 'Pizza Hut', desc: 'بيتزا لذيذة مع خيارات متنوعة', foodType: 'fastfood', rating: 4.2, priceRange: '$', hours: { open: 11, close: 24 }, location: 'روما', country: 'إيطاليا' }
];

