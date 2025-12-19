// خوارزمية ذكية لاقتراح الدولة المناسبة
// بدون AI - منطق من صنعنا
// تقترح فقط الدول العربية في آسيا

// قائمة الدول العربية في آسيا فقط
const arabCountriesInAsia = [
  'السعودية', 'الإمارات', 'الكويت', 'البحرين', 'قطر', 'عُمان', 
  'اليمن', 'الأردن', 'لبنان', 'سوريا', 'العراق', 'فلسطين'
];

// قاعدة بيانات خصائص الدول العربية في آسيا
const countryFeatures = {
  'السعودية': {
    weather: ['دافئ', 'حار'],
    scenery: ['مدينة', 'صحراء', 'تاريخ', 'بحر'],
    tripTypes: ['ثقافي', 'ديني', 'مغامرة', 'تاريخ'],
    interests: ['ثقافة', 'تاريخ', 'دين', 'مغامرة', 'صحراء'],
    budget: 'medium',
    bestSeason: ['شتاء', 'ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'الإمارات': {
    weather: ['دافئ', 'حار'],
    scenery: ['مدينة', 'صحراء', 'حديث', 'بحر'],
    tripTypes: ['تسوق', 'ترفيه', 'عوائل', 'فاخر'],
    interests: ['تسوق', 'ترفيه', 'مغامرة', 'فاخر'],
    budget: 'high',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop'
  },
  'الكويت': {
    weather: ['دافئ', 'حار'],
    scenery: ['مدينة', 'بحر', 'حديث'],
    tripTypes: ['ثقافي', 'تسوق', 'عوائل', 'بحر'],
    interests: ['ثقافة', 'تسوق', 'بحر', 'طعام'],
    budget: 'medium',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'البحرين': {
    weather: ['دافئ', 'حار'],
    scenery: ['مدينة', 'بحر', 'تاريخ'],
    tripTypes: ['ثقافي', 'تاريخ', 'بحر', 'تسوق'],
    interests: ['ثقافة', 'تاريخ', 'بحر', 'طعام'],
    budget: 'medium',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'قطر': {
    weather: ['دافئ', 'حار'],
    scenery: ['مدينة', 'بحر', 'حديث'],
    tripTypes: ['ثقافي', 'فاخر', 'عوائل', 'تسوق'],
    interests: ['ثقافة', 'فن', 'تسوق', 'طعام'],
    budget: 'high',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'عُمان': {
    weather: ['دافئ', 'حار'],
    scenery: ['مدينة', 'صحراء', 'بحر', 'جبال'],
    tripTypes: ['مغامرة', 'طبيعة', 'ثقافي', 'بحر'],
    interests: ['مغامرة', 'طبيعة', 'ثقافة', 'بحر'],
    budget: 'medium',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'اليمن': {
    weather: ['دافئ', 'حار'],
    scenery: ['مدينة', 'تاريخ', 'جبال', 'بحر'],
    tripTypes: ['تاريخ', 'ثقافي', 'مغامرة'],
    interests: ['تاريخ', 'ثقافة', 'مغامرة', 'طعام'],
    budget: 'low',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'الأردن': {
    weather: ['معتدل', 'دافئ'],
    scenery: ['تاريخ', 'صحراء', 'بحر', 'مدينة'],
    tripTypes: ['تاريخ', 'ثقافي', 'مغامرة', 'بحر'],
    interests: ['تاريخ', 'ثقافة', 'مغامرة', 'بحر'],
    budget: 'medium',
    bestSeason: ['ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'لبنان': {
    weather: ['معتدل', 'دافئ'],
    scenery: ['مدينة', 'بحر', 'جبال', 'تاريخ'],
    tripTypes: ['ثقافي', 'بحر', 'طعام', 'ترفيه'],
    interests: ['ثقافة', 'بحر', 'طعام', 'ترفيه'],
    budget: 'medium',
    bestSeason: ['ربيع', 'صيف', 'خريف'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'سوريا': {
    weather: ['معتدل', 'دافئ'],
    scenery: ['تاريخ', 'مدينة', 'ثقافة'],
    tripTypes: ['تاريخ', 'ثقافي', 'مغامرة'],
    interests: ['تاريخ', 'ثقافة', 'مغامرة', 'طعام'],
    budget: 'low',
    bestSeason: ['ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'العراق': {
    weather: ['دافئ', 'حار'],
    scenery: ['تاريخ', 'مدينة', 'ثقافة'],
    tripTypes: ['تاريخ', 'ثقافي', 'ديني'],
    interests: ['تاريخ', 'ثقافة', 'دين', 'طعام'],
    budget: 'low',
    bestSeason: ['شتاء', 'ربيع'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  },
  'فلسطين': {
    weather: ['معتدل', 'دافئ'],
    scenery: ['تاريخ', 'ديني', 'مدينة'],
    tripTypes: ['ديني', 'تاريخ', 'ثقافي'],
    interests: ['دين', 'تاريخ', 'ثقافة', 'طعام'],
    budget: 'low',
    bestSeason: ['ربيع', 'خريف'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop'
  }
};

// خوارزمية اقتراح الدولة الذكية - فقط الدول العربية في آسيا
function suggestCountry(weather, scenery, tripType, interests, budget, numPeople) {
  const scores = {};
  
  // حساب النقاط لكل دولة عربية في آسيا فقط
  Object.keys(countryFeatures).forEach(country => {
    // التأكد من أن الدولة عربية في آسيا
    if (!arabCountriesInAsia.includes(country)) {
      return; // تخطي الدول غير العربية في آسيا
    }
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

