// خوارزمية ذكية لاقتراح الدولة المناسبة
// بدون AI - منطق من صنعنا

// قاعدة بيانات خصائص الدول
const countryFeatures = {
  'فرنسا': {
    weather: ['معتدل', 'بارد'],
    scenery: ['مدينة', 'تاريخ', 'ثقافة'],
    tripTypes: ['ثقافي', 'رومانسي', 'تسوق', 'طعام'],
    interests: ['ثقافة', 'تاريخ', 'فن', 'طعام', 'تسوق'],
    budget: 'medium',
    bestSeason: ['ربيع', 'صيف', 'خريف'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&h=1080&fit=crop'
  },
  'إيطاليا': {
    weather: ['معتدل', 'دافئ'],
    scenery: ['مدينة', 'تاريخ', 'ساحل'],
    tripTypes: ['ثقافي', 'رومانسي', 'طعام', 'تاريخ'],
    interests: ['ثقافة', 'تاريخ', 'طعام', 'فن'],
    budget: 'medium',
    bestSeason: ['ربيع', 'صيف', 'خريف'],
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1920&h=1080&fit=crop'
  },
  'اليابان': {
    weather: ['معتدل', 'بارد', 'دافئ'],
    scenery: ['مدينة', 'طبيعة', 'ثقافة'],
    tripTypes: ['ثقافي', 'طبيعة', 'طعام', 'تسوق'],
    interests: ['ثقافة', 'طعام', 'طبيعة', 'تكنولوجيا'],
    budget: 'high',
    bestSeason: ['ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&h=1080&fit=crop'
  },
  'دبي': {
    weather: ['دافئ', 'حار'],
    scenery: ['مدينة', 'صحراء', 'حديث'],
    tripTypes: ['تسوق', 'ترفيه', 'عوائل', 'فاخر'],
    interests: ['تسوق', 'ترفيه', 'مغامرة', 'فاخر'],
    budget: 'high',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop'
  },
  'مصر': {
    weather: ['دافئ', 'حار'],
    scenery: ['تاريخ', 'صحراء', 'بحر'],
    tripTypes: ['تاريخ', 'ثقافي', 'مغامرة', 'بحر'],
    interests: ['تاريخ', 'ثقافة', 'مغامرة', 'بحر'],
    budget: 'low',
    bestSeason: ['شتاء', 'ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1539650116579-7ae0a4f53f98?w=1920&h=1080&fit=crop'
  },
  'تايلاند': {
    weather: ['دافئ', 'حار'],
    scenery: ['بحر', 'طبيعة', 'مدينة'],
    tripTypes: ['مغامرة', 'بحر', 'طبيعة', 'اقتصادي'],
    interests: ['بحر', 'طبيعة', 'طعام', 'مغامرة'],
    budget: 'low',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&h=1080&fit=crop'
  },
  'تركيا': {
    weather: ['معتدل', 'دافئ'],
    scenery: ['تاريخ', 'مدينة', 'بحر'],
    tripTypes: ['تاريخ', 'ثقافي', 'بحر', 'اقتصادي'],
    interests: ['تاريخ', 'ثقافة', 'بحر', 'طعام'],
    budget: 'low',
    bestSeason: ['ربيع', 'صيف', 'خريف'],
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7203?w=1920&h=1080&fit=crop'
  },
  'سويسرا': {
    weather: ['بارد', 'معتدل'],
    scenery: ['طبيعة', 'جبال', 'بحيرات'],
    tripTypes: ['طبيعة', 'مغامرة', 'رومانسي', 'فاخر'],
    interests: ['طبيعة', 'جبال', 'مغامرة', 'استرخاء'],
    budget: 'high',
    bestSeason: ['صيف', 'شتاء'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
  },
  'إسبانيا': {
    weather: ['دافئ', 'معتدل'],
    scenery: ['مدينة', 'ساحل', 'تاريخ'],
    tripTypes: ['ثقافي', 'بحر', 'طعام', 'ترفيه'],
    interests: ['ثقافة', 'بحر', 'طعام', 'ترفيه'],
    budget: 'medium',
    bestSeason: ['ربيع', 'صيف', 'خريف'],
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&h=1080&fit=crop'
  },
  'اليونان': {
    weather: ['دافئ', 'معتدل'],
    scenery: ['بحر', 'جزر', 'تاريخ'],
    tripTypes: ['بحر', 'تاريخ', 'رومانسي', 'اقتصادي'],
    interests: ['بحر', 'تاريخ', 'ثقافة', 'استرخاء'],
    budget: 'medium',
    bestSeason: ['صيف', 'ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop'
  },
  'المغرب': {
    weather: ['دافئ', 'معتدل'],
    scenery: ['صحراء', 'مدينة', 'تاريخ'],
    tripTypes: ['ثقافي', 'مغامرة', 'تاريخ', 'اقتصادي'],
    interests: ['ثقافة', 'تاريخ', 'مغامرة', 'طعام'],
    budget: 'low',
    bestSeason: ['ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1539650116579-7ae0a4f53f98?w=1920&h=1080&fit=crop'
  },
  'ماليزيا': {
    weather: ['دافئ', 'حار'],
    scenery: ['طبيعة', 'بحر', 'مدينة'],
    tripTypes: ['طبيعة', 'بحر', 'تسوق', 'اقتصادي'],
    interests: ['طبيعة', 'بحر', 'تسوق', 'طعام'],
    budget: 'low',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&h=1080&fit=crop'
  },
  'أستراليا': {
    weather: ['دافئ', 'معتدل'],
    scenery: ['طبيعة', 'بحر', 'مدينة'],
    tripTypes: ['مغامرة', 'طبيعة', 'بحر', 'عوائل'],
    interests: ['طبيعة', 'بحر', 'مغامرة', 'حيوانات'],
    budget: 'high',
    bestSeason: ['صيف', 'ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
  },
  'أيسلندا': {
    weather: ['بارد'],
    scenery: ['طبيعة', 'جبال', 'أضواء'],
    tripTypes: ['مغامرة', 'طبيعة', 'رومانسي'],
    interests: ['طبيعة', 'مغامرة', 'أضواء', 'استرخاء'],
    budget: 'high',
    bestSeason: ['صيف', 'شتاء'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
  },
  'الهند': {
    weather: ['دافئ', 'حار'],
    scenery: ['تاريخ', 'ثقافة', 'طبيعة'],
    tripTypes: ['ثقافي', 'تاريخ', 'روحاني', 'اقتصادي'],
    interests: ['ثقافة', 'تاريخ', 'روحاني', 'طعام'],
    budget: 'low',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  }
};

// خوارزمية اقتراح الدولة الذكية
function suggestCountry(weather, scenery, tripType, interests, budget, numPeople) {
  const scores = {};
  
  // حساب النقاط لكل دولة
  Object.keys(countryFeatures).forEach(country => {
    let score = 0;
    const features = countryFeatures[country];
    
    // مطابقة الجو (40 نقطة)
    if (features.weather.includes(weather)) {
      score += 40;
    } else if (features.weather.some(w => w.includes(weather) || weather.includes(w))) {
      score += 20;
    }
    
    // مطابقة المنظر (30 نقطة)
    const sceneryMatch = features.scenery.filter(s => scenery.includes(s)).length;
    score += (sceneryMatch / features.scenery.length) * 30;
    
    // مطابقة نوع الرحلة (20 نقطة)
    if (features.tripTypes.includes(tripType)) {
      score += 20;
    } else if (features.tripTypes.some(t => t.includes(tripType) || tripType.includes(t))) {
      score += 10;
    }
    
    // مطابقة الاهتمامات (30 نقطة)
    if (interests && interests.length > 0) {
      const interestsList = Array.isArray(interests) ? interests : interests.split(',').map(i => i.trim());
      const interestsMatch = features.interests.filter(i => 
        interestsList.some(userInterest => 
          i.includes(userInterest) || userInterest.includes(i)
        )
      ).length;
      score += (interestsMatch / Math.max(interestsList.length, features.interests.length)) * 30;
    }
    
    // مطابقة الميزانية (20 نقطة)
    if (features.budget === budget) {
      score += 20;
    } else if (budget === 'medium' && (features.budget === 'low' || features.budget === 'high')) {
      score += 10;
    }
    
    // خصم إذا كانت الميزانية منخفضة والدولة باهظة (10 نقاط)
    if (budget === 'low' && features.budget === 'high') {
      score -= 10;
    }
    
    // مكافأة للدول المناسبة للعوائل (5 نقاط)
    if (numPeople > 2 && features.tripTypes.includes('عوائل')) {
      score += 5;
    }
    
    scores[country] = score;
  });
  
  // ترتيب الدول حسب النقاط
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  
  // إرجاع أفضل 3 اقتراحات
  return sorted.slice(0, 3).map(([country, score]) => ({
    country,
    score,
    match: Math.round((score / 100) * 100),
    image: countryFeatures[country].image
  }));
}

// الحصول على صورة الدولة
function getCountryImage(country) {
  return countryFeatures[country]?.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop';
}

// تصدير الدوال
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { suggestCountry, getCountryImage, countryFeatures };
}

