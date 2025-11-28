// قاعدة بيانات شاملة لكل الدول - خوارزمية تخطيط ذكية
const countriesDatabase = {
  'فرنسا': {
    cities: ['باريس', 'ليون', 'نيس', 'مرسيليا', 'بوردو'],
    attractions: {
      cultural: ['متحف اللوفر', 'قصر فرساي', 'كاتدرائية نوتردام', 'متحف أورسيه', 'قوس النصر'],
      nature: ['نهر السين', 'حدائق لوكسمبورغ', 'جبل سانت ميشيل', 'شاطئ نيس', 'وادي لوار'],
      adventure: ['تسلق جبال الألب', 'رحلة بالدراجة', 'رياضات مائية', 'تسلق الصخور'],
      food: ['مطعم Le Comptoir', 'مطعم L\'Ambroisie', 'مطعم Guy Savoy', 'مطعم L\'Astrance'],
      budget: { low: 60, medium: 120, high: 250 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'إيطاليا': {
    cities: ['روما', 'فلورنسا', 'البندقية', 'ميلانو', 'نابولي'],
    attractions: {
      cultural: ['الكولوسيوم', 'متحف الفاتيكان', 'برج بيزا', 'قناة البندقية', 'متحف أوفيزي'],
      nature: ['بحيرة كومو', 'جبل فيزوف', 'ساحل أمالفي', 'توسكانا', 'دولوميت'],
      adventure: ['تسلق جبال الألب', 'رحلة بالدراجة', 'رياضات مائية'],
      food: ['مطعم Osteria Francescana', 'مطعم La Pergola', 'مطعم Enoteca Pinchiorri'],
      budget: { low: 55, medium: 110, high: 220 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'اليابان': {
    cities: ['طوكيو', 'كيوتو', 'أوساكا', 'هيروشيما', 'سابورو'],
    attractions: {
      cultural: ['معبد كيوتو', 'قصر طوكيو', 'جبل فوجي', 'حديقة شنشو', 'متحف طوكيو'],
      nature: ['جبل فوجي', 'حدائق كيوتو', 'غابات بامبو', 'شاطئ أوكيناوا'],
      adventure: ['تسلق جبل فوجي', 'رياضات مائية', 'تزلج'],
      food: ['مطعم Sukiyabashi Jiro', 'مطعم Kikunoi', 'مطعم Narisawa'],
      budget: { low: 70, medium: 140, high: 280 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'مصر': {
    cities: ['القاهرة', 'الأقصر', 'أسوان', 'الإسكندرية', 'شرم الشيخ'],
    attractions: {
      cultural: ['الأهرامات', 'معبد الكرنك', 'متحف القاهرة', 'قلعة صلاح الدين', 'معبد أبو سمبل'],
      nature: ['نهر النيل', 'البحر الأحمر', 'الصحراء البيضاء', 'وادي الملوك'],
      adventure: ['رحلة نيلية', 'غوص', 'رحلة صحراوية', 'تسلق'],
      food: ['مطعم Abou El Sid', 'مطعم Sequoia', 'مطعم Koshary Abou Tarek'],
      budget: { low: 30, medium: 60, high: 120 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'دبي': {
    cities: ['دبي', 'أبوظبي', 'الشارقة'],
    attractions: {
      cultural: ['برج خليفة', 'دبي مول', 'متحف اللوفر أبوظبي', 'مسجد الشيخ زايد', 'جزيرة النخيل'],
      nature: ['الصحراء', 'شاطئ جميرا', 'حديقة دبي', 'وادي المغامرات'],
      adventure: ['رحلة صحراوية', 'قفز بالمظلة', 'رياضات مائية', 'تزلج على الجليد'],
      food: ['مطعم At.mosphere', 'مطعم Zuma', 'مطعم Nobu'],
      budget: { low: 80, medium: 160, high: 320 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '15:00-18:00', evening: '20:00-23:00' }
  },
  'أستراليا': {
    cities: ['سيدني', 'ملبورن', 'بريسبان', 'بيرث', 'أديلايد'],
    attractions: {
      cultural: ['دار الأوبرا', 'جسر هاربور', 'معرض فيكتوريا الوطني', 'متحف أستراليا'],
      nature: ['الحاجز المرجاني', 'أولورو', 'غابات دينتري', 'شاطئ بوندي'],
      adventure: ['غوص', 'رحلة صحراوية', 'تسلق', 'رياضات مائية'],
      food: ['مطعم Quay', 'مطعم Attica', 'مطعم Vue de Monde'],
      budget: { low: 75, medium: 150, high: 300 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'إسبانيا': {
    cities: ['مدريد', 'برشلونة', 'إشبيلية', 'غرناطة', 'فالنسيا'],
    attractions: {
      cultural: ['قصر الحمراء', 'متحف برادو', 'كاتدرائية ساغرادا فاميليا', 'متحف غوغنهايم'],
      nature: ['ساحل كوستا برافا', 'جبال البرانس', 'جزر الكناري', 'وادي الحجارة'],
      adventure: ['تسلق', 'رياضات مائية', 'رحلة بالدراجة'],
      food: ['مطعم El Celler de Can Roca', 'مطعم DiverXO', 'مطعم Arzak'],
      budget: { low: 50, medium: 100, high: 200 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '20:00-23:00' }
  },
  'اليونان': {
    cities: ['أثينا', 'سانتوريني', 'ميكونوس', 'كريت', 'ثيسالونيكي'],
    attractions: {
      cultural: ['الأكروبوليس', 'متحف الأكروبوليس', 'دلفي', 'أولمبيا', 'ميكونوس القديمة'],
      nature: ['جزر سانتوريني', 'شواطئ ميكونوس', 'جبال أوليمبوس', 'بحيرة بلاسيتيدا'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة'],
      food: ['مطعم Funky Gourmet', 'مطعم Spondi', 'مطعم Varoulko'],
      budget: { low: 45, medium: 90, high: 180 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'تايلاند': {
    cities: ['بانكوك', 'بوكيت', 'تشيانغ ماي', 'كوه ساموي', 'باتايا'],
    attractions: {
      cultural: ['القصر الكبير', 'معبد وات فو', 'معبد وات آرون', 'معبد دوي سوثيب'],
      nature: ['شواطئ بوكيت', 'غابات تشيانغ ماي', 'جزر كوه ساموي', 'حدائق لومبيني'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة فيل', 'تزلج على الماء'],
      food: ['مطعم Nahm', 'مطعم Gaggan', 'مطعم Le Du'],
      budget: { low: 25, medium: 50, high: 100 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'سويسرا': {
    cities: ['زيورخ', 'جنيف', 'برن', 'لوسيرن', 'إنترلاكن'],
    attractions: {
      cultural: ['متحف زيورخ', 'كاتدرائية برن', 'قصر شيلون', 'متحف الفنون'],
      nature: ['جبال الألب', 'بحيرة جنيف', 'بحيرة لوسيرن', 'جبل تيتليس'],
      adventure: ['تزلج', 'تسلق', 'رحلة بالقطار', 'قفز بالمظلة'],
      food: ['مطعم Restaurant de l\'Hôtel de Ville', 'مطعم Cheval Blanc', 'مطعم Kronenhalle'],
      budget: { low: 90, medium: 180, high: 360 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'المغرب': {
    cities: ['الدار البيضاء', 'مراكش', 'فاس', 'طنجة', 'أغادير'],
    attractions: {
      cultural: ['ساحة جامع الفنا', 'قصر الباهية', 'مدينة فاس القديمة', 'مسجد الحسن الثاني'],
      nature: ['الصحراء الكبرى', 'جبال الأطلس', 'شاطئ أغادير', 'وادي درعة'],
      adventure: ['رحلة صحراوية', 'تسلق', 'رحلة بالجمل', 'رياضات مائية'],
      food: ['مطعم Le Jardin', 'مطعم Dar Moha', 'مطعم Al Fassia'],
      budget: { low: 35, medium: 70, high: 140 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'تركيا': {
    cities: ['إسطنبول', 'أنطاليا', 'كابادوكيا', 'بودروم', 'أنقرة'],
    attractions: {
      cultural: ['آيا صوفيا', 'قصر توبكابي', 'المسجد الأزرق', 'كابادوكيا', 'أفسس'],
      nature: ['البوسفور', 'شاطئ أنطاليا', 'كابادوكيا', 'باموكالي'],
      adventure: ['رحلة بالمنطاد', 'رياضات مائية', 'تسلق', 'رحلة صحراوية'],
      food: ['مطعم Mikla', 'مطعم Neolokal', 'مطعم Sunset Grill'],
      budget: { low: 40, medium: 80, high: 160 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'ماليزيا': {
    cities: ['كوالالمبور', 'بينانغ', 'لانكاوي', 'ملقا', 'كوتا كينابالو'],
    attractions: {
      cultural: ['برجا بتروناس', 'معبد باتو كافز', 'قصر السلطان', 'متحف ماليزيا'],
      nature: ['غابات بورنيو', 'شواطئ لانكاوي', 'جبل كينابالو', 'حدائق كوالالمبور'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة فيل', 'غوص'],
      food: ['مطعم Nobu', 'مطعم Cilantro', 'مطعم Bijan'],
      budget: { low: 30, medium: 60, high: 120 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'سنغافورة': {
    cities: ['سنغافورة'],
    attractions: {
      cultural: ['مارينا باي', 'حدائق الخليج', 'متحف سنغافورة', 'معبد بوذا'],
      nature: ['حدائق الخليج', 'جزيرة سينتوسا', 'حديقة الطيور', 'حديقة الحيوانات'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة'],
      food: ['مطعم Odette', 'مطعم Les Amis', 'مطعم Waku Ghin'],
      budget: { low: 70, medium: 140, high: 280 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'النمسا': {
    cities: ['فيينا', 'سالزبورغ', 'إنسبروك', 'غراز', 'هالشتات'],
    attractions: {
      cultural: ['قصر شونبرون', 'دار الأوبرا', 'متحف الفنون', 'قصر هوفبورغ'],
      nature: ['جبال الألب', 'بحيرة هالشتات', 'وادي سالزكامرغوت', 'غابات فيينا'],
      adventure: ['تزلج', 'تسلق', 'رحلة بالقطار', 'رحلة بالدراجة'],
      food: ['مطعم Steirereck', 'مطعم Mraz & Sohn', 'مطعم Konstantin Filippou'],
      budget: { low: 65, medium: 130, high: 260 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'ألمانيا': {
    cities: ['برلين', 'ميونخ', 'هامبورغ', 'فرانكفورت', 'كولونيا'],
    attractions: {
      cultural: ['بوابة براندنبورغ', 'قصر نويشفانشتاين', 'كاتدرائية كولونيا', 'متحف بيرغامون'],
      nature: ['الغابة السوداء', 'جبال الألب البافارية', 'نهر الراين', 'بحيرة كونستانس'],
      adventure: ['تسلق', 'رحلة بالدراجة', 'رياضات مائية'],
      food: ['مطعم Tim Raue', 'مطعم Facil', 'مطعم Vendôme'],
      budget: { low: 60, medium: 120, high: 240 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'بريطانيا': {
    cities: ['لندن', 'إدنبرة', 'مانشستر', 'ليفربول', 'باث'],
    attractions: {
      cultural: ['برج لندن', 'قصر باكنغهام', 'ستون هنج', 'كاتدرائية وستمنستر', 'متحف بريطانيا'],
      nature: ['حدائق كيو', 'بحيرة لوخ نس', 'ساحل دورست', 'جبال اسكتلندا'],
      adventure: ['رحلة بالدراجة', 'تسلق', 'رياضات مائية'],
      food: ['مطعم The Fat Duck', 'مطعم Gordon Ramsay', 'مطعم The Ledbury'],
      budget: { low: 70, medium: 140, high: 280 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'هولندا': {
    cities: ['أمستردام', 'روتردام', 'لاهاي', 'أوتريخت', 'خاودا'],
    attractions: {
      cultural: ['متحف ريكز', 'متحف فان جوخ', 'قنوات أمستردام', 'منزل آن فرانك'],
      nature: ['حدائق كيوكينهوف', 'شواطئ شيفينينغن', 'حدائق هورتوس', 'متنزه هوخ فيلوفي'],
      adventure: ['رحلة بالدراجة', 'رياضات مائية', 'تسلق'],
      food: ['مطعم De Librije', 'مطعم Ciel Bleu', 'مطعم Restaurant De Kas'],
      budget: { low: 65, medium: 130, high: 260 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'البرتغال': {
    cities: ['لشبونة', 'بورتو', 'فارو', 'كوايمبرا', 'براغا'],
    attractions: {
      cultural: ['برج بيليم', 'دير جيرونيموس', 'قصر بينا', 'متحف غولبنكيان'],
      nature: ['ساحل الغارف', 'جزر الأزور', 'حدائق سينترا', 'شواطئ البرتغال'],
      adventure: ['رياضات مائية', 'رحلة بالدراجة', 'تسلق'],
      food: ['مطعم Belcanto', 'مطعم Eleven', 'مطعم Feitoria'],
      budget: { low: 45, medium: 90, high: 180 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'كرواتيا': {
    cities: ['دوبروفنيك', 'زغرب', 'سبليت', 'بولا', 'رييكا'],
    attractions: {
      cultural: ['أسوار دوبروفنيك', 'قصر دقلديانوس', 'كاتدرائية زغرب', 'متحف كرواتيا'],
      nature: ['شواطئ دالماسيا', 'بحيرات بليتفيتش', 'جزر كرواتيا', 'حدائق زغرب'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة'],
      food: ['مطعم 360', 'مطعم Pelegrini', 'مطعم Noel'],
      budget: { low: 40, medium: 80, high: 160 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'أيسلندا': {
    cities: ['ريكيافيك', 'أكوريري', 'هفنارفيوردور', 'إيسافيوردور'],
    attractions: {
      cultural: ['متحف أيسلندا', 'كنيسة هالجريمسكيركجا', 'متحف الفايكنغ', 'قصر ريكيافيك'],
      nature: ['الشفق القطبي', 'شلالات جولفوس', 'الينابيع الساخنة', 'الأنهار الجليدية'],
      adventure: ['مشاهدة الشفق', 'تسلق', 'رياضات مائية', 'رحلة بالدراجة'],
      food: ['مطعم Dill', 'مطعم Matur og Drykkur', 'مطعم Grillmarkaðurinn'],
      budget: { low: 85, medium: 170, high: 340 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'نيوزيلندا': {
    cities: ['أوكلاند', 'ويلينغتون', 'كريستشيرش', 'كوينزتاون', 'روتوروا'],
    attractions: {
      cultural: ['متحف نيوزيلندا', 'متحف أوكلاند', 'قصر ويلينغتون', 'متحف كريستشيرش'],
      nature: ['جبال الألب الجنوبية', 'فيوردلاند', 'بحيرة تاوبو', 'شواطئ باي أوف آيلاندز'],
      adventure: ['قفز بالمظلة', 'رياضات مائية', 'تسلق', 'رحلة بالدراجة'],
      food: ['مطعم The Grove', 'مطعم The French Cafe', 'مطعم Sidart'],
      budget: { low: 70, medium: 140, high: 280 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'كندا': {
    cities: ['تورونتو', 'فانكوفر', 'مونتريال', 'أوتاوا', 'كالجاري'],
    attractions: {
      cultural: ['برج CN', 'متحف كندا', 'متحف الفنون', 'قصر أوتاوا'],
      nature: ['جبال روكي', 'شلالات نياجرا', 'حدائق بانف', 'بحيرات كندا'],
      adventure: ['تزلج', 'تسلق', 'رياضات مائية', 'رحلة بالدراجة'],
      food: ['مطعم Alo', 'مطعم Toqué!', 'مطعم Hawksworth'],
      budget: { low: 65, medium: 130, high: 260 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'الولايات المتحدة': {
    cities: ['نيويورك', 'لوس أنجلوس', 'شيكاغو', 'سان فرانسيسكو', 'ميامي'],
    attractions: {
      cultural: ['تمثال الحرية', 'جسر البوابة الذهبية', 'متحف متروبوليتان', 'متحف سميثسونيان'],
      nature: ['غراند كانيون', 'يوسمايت', 'حديقة يلوستون', 'شواطئ كاليفورنيا'],
      adventure: ['تسلق', 'رياضات مائية', 'رحلة بالدراجة', 'قفز بالمظلة'],
      food: ['مطعم Eleven Madison Park', 'مطعم The French Laundry', 'مطعم Per Se'],
      budget: { low: 80, medium: 160, high: 320 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'المكسيك': {
    cities: ['مكسيكو سيتي', 'كانكون', 'غوادالاخارا', 'مونتيري', 'بويبلا'],
    attractions: {
      cultural: ['أهرامات تيوتيهواكان', 'متحف الأنثروبولوجيا', 'قصر الفنون الجميلة', 'كاتدرائية مكسيكو'],
      nature: ['شواطئ كانكون', 'غوادالوبي', 'حدائق مكسيكو', 'جبال سييرا مادري'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة', 'غوص'],
      food: ['مطعم Pujol', 'مطعم Quintonil', 'مطعم Biko'],
      budget: { low: 35, medium: 70, high: 140 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'بيرو': {
    cities: ['ليما', 'كوسكو', 'أريكويبا', 'تروخيو', 'إيكا'],
    attractions: {
      cultural: ['ماتشو بيتشو', 'مدينة كوسكو', 'خطوط نازكا', 'متحف بيرو'],
      nature: ['جبال الأنديز', 'غابات الأمازون', 'بحيرة تيتيكاكا', 'وادي كولكا'],
      adventure: ['تسلق', 'رحلة صحراوية', 'رياضات مائية', 'رحلة بالدراجة'],
      food: ['مطعم Central', 'مطعم Maido', 'مطعم Astrid y Gastón'],
      budget: { low: 30, medium: 60, high: 120 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'البرازيل': {
    cities: ['ريو دي جانيرو', 'ساو باولو', 'برازيليا', 'سلفادور', 'فورتاليزا'],
    attractions: {
      cultural: ['تمثال المسيح', 'متحف البرازيل', 'كاتدرائية برازيليا', 'متحف ساو باولو'],
      nature: ['شواطئ ريو', 'غابات الأمازون', 'شلالات إجوازو', 'حدائق البرازيل'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة', 'غوص'],
      food: ['مطعم D.O.M.', 'مطعم Lasai', 'مطعم Maní'],
      budget: { low: 40, medium: 80, high: 160 }
    },
    optimalRoute: true,
    timeSlots: { morning: '09:00-12:00', afternoon: '14:00-17:00', evening: '19:00-22:00' }
  },
  'جنوب أفريقيا': {
    cities: ['كيب تاون', 'جوهانسبرغ', 'ديربان', 'بريتوريا', 'بورت إليزابيث'],
    attractions: {
      cultural: ['متحف جنوب أفريقيا', 'جزيرة روبن', 'متحف الفصل العنصري', 'قصر كيب تاون'],
      nature: ['جبل الطاولة', 'حديقة كروغر', 'شواطئ كيب تاون', 'حدائق كيب تاون'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة صحراوية', 'رحلة سفاري'],
      food: ['مطعم The Test Kitchen', 'مطعم La Colombe', 'مطعم The Pot Luck Club'],
      budget: { low: 45, medium: 90, high: 180 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'كينيا': {
    cities: ['نيروبي', 'مومباسا', 'كيسومو', 'ناكورو', 'إلدوريت'],
    attractions: {
      cultural: ['متحف كينيا', 'قصر نيروبي', 'متحف كارين بليكسن', 'متحف مومباسا'],
      nature: ['محمية ماساي مارا', 'جبل كينيا', 'شواطئ مومباسا', 'بحيرة ناكورو'],
      adventure: ['رحلة سفاري', 'تسلق', 'رياضات مائية', 'رحلة صحراوية'],
      food: ['مطعم Carnivore', 'مطعم Talisman', 'مطعم Tamarind'],
      budget: { low: 35, medium: 70, high: 140 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'الهند': {
    cities: ['دلهي', 'مومباي', 'بنغالور', 'أغرا', 'جايبور'],
    attractions: {
      cultural: ['تاج محل', 'القصر الأحمر', 'معبد الذهبي', 'قصر جايبور', 'معبد لوتس'],
      nature: ['جبال الهيمالايا', 'شواطئ غوا', 'حدائق الهند', 'بحيرة دال'],
      adventure: ['تسلق', 'رياضات مائية', 'رحلة بالدراجة', 'رحلة صحراوية'],
      food: ['مطعم Indian Accent', 'مطعم Bukhara', 'مطعم Gaggan'],
      budget: { low: 25, medium: 50, high: 100 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'سريلانكا': {
    cities: ['كولومبو', 'كاندي', 'غالي', 'أنورادهابورا', 'نوارا إيليا'],
    attractions: {
      cultural: ['معبد كاندي', 'قلعة غالي', 'معبد أنورادهابورا', 'متحف سريلانكا'],
      nature: ['شواطئ سريلانكا', 'حدائق كاندي', 'جبال سريلانكا', 'حدائق نوارا إيليا'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة', 'رحلة فيل'],
      food: ['مطعم Ministry of Crab', 'مطعم Nihonbashi', 'مطعم The Lagoon'],
      budget: { low: 30, medium: 60, high: 120 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'إندونيسيا': {
    cities: ['جاكرتا', 'بالي', 'يوجياكارتا', 'باندونغ', 'سورابايا'],
    attractions: {
      cultural: ['معبد برامبانان', 'معبد بوروبودور', 'قصر يوجياكارتا', 'متحف إندونيسيا'],
      nature: ['شواطئ بالي', 'بركان برومو', 'حدائق بالي', 'غابات سومطرة'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة', 'غوص'],
      food: ['مطعم Locavore', 'مطعم Mozaic', 'مطعم Merah Putih'],
      budget: { low: 30, medium: 60, high: 120 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'فيتنام': {
    cities: ['هانوي', 'هو تشي منه', 'دا نانغ', 'هوي أن', 'نها ترانغ'],
    attractions: {
      cultural: ['معبد الأدب', 'قصر هو تشي منه', 'معبد هوي أن', 'متحف فيتنام'],
      nature: ['خليج هالونغ', 'شواطئ نها ترانغ', 'حدائق فيتنام', 'جبال فيتنام'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة', 'غوص'],
      food: ['مطعم La Verticale', 'مطعم Anan Saigon', 'مطعم The Deck'],
      budget: { low: 25, medium: 50, high: 100 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'كمبوديا': {
    cities: ['بنوم بنه', 'سييم ريب', 'باتامبانغ', 'كامبوت', 'كوه كونغ'],
    attractions: {
      cultural: ['معبد أنغكور وات', 'قصر بنوم بنه', 'معبد بايون', 'متحف كمبوديا'],
      nature: ['بحيرة تونلي ساب', 'شواطئ كمبوديا', 'حدائق كمبوديا', 'غابات كمبوديا'],
      adventure: ['رياضات مائية', 'تسلق', 'رحلة بالدراجة', 'غوص'],
      food: ['مطعم Cuisine Wat Damnak', 'مطعم Malis', 'مطعم Topaz'],
      budget: { low: 20, medium: 40, high: 80 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  },
  'الفلبين': {
    cities: ['مانيلا', 'سيبو', 'بوراكاي', 'بالاوان', 'دافاو'],
    attractions: {
      cultural: ['قصر مانيلا', 'معبد سيبو', 'متحف الفلبين', 'كاتدرائية مانيلا'],
      nature: ['شواطئ بوراكاي', 'بحيرات بالاوان', 'حدائق الفلبين', 'جبال الفلبين'],
      adventure: ['رياضات مائية', 'غوص', 'تسلق', 'رحلة بالدراجة'],
      food: ['مطعم Antonio\'s', 'مطعم Gallery Vask', 'مطعم Toyo Eatery'],
      budget: { low: 30, medium: 60, high: 120 }
    },
    optimalRoute: true,
    timeSlots: { morning: '08:00-11:00', afternoon: '13:00-16:00', evening: '18:00-21:00' }
  }
};

// دالة للحصول على بيانات دولة معينة أو دولة افتراضية
function getCountryData(countryName) {
  return countriesDatabase[countryName] || countriesDatabase['فرنسا'];
}

