// نظام إدارة الخطط - حفظ ومشاركة
class PlanManager {
  constructor() {
    this.storageKey = 'arhgo_saved_plans';
    this.sharedPlansKey = 'arhgo_shared_plans';
  }

  // التحقق من تسجيل الدخول
  isLoggedIn() {
    return localStorage.getItem('loggedIn') !== null;
  }

  // الحصول على اسم المستخدم الحالي
  getCurrentUser() {
    return localStorage.getItem('loggedIn');
  }

  // توليد معرف فريد للخطة
  generatePlanId() {
    return 'plan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // توليد رابط قصير للخطة
  generateShortLink(planId) {
    const baseUrl = window.location.origin + window.location.pathname.replace('smart-planner.html', '');
    return `${baseUrl}share-plan.html?id=${planId}`;
  }

  // حفظ الخطة في حساب المستخدم
  savePlan(planData) {
    if (!this.isLoggedIn()) {
      return {
        success: false,
        message: 'يجب تسجيل الدخول أولاً لحفظ الخطة'
      };
    }

    const username = this.getCurrentUser();
    const planId = this.generatePlanId();
    
    const plan = {
      id: planId,
      username: username,
      ...planData,
      savedAt: new Date().toISOString(),
      isShared: false
    };

    // الحصول على الخطط المحفوظة
    const savedPlans = this.getSavedPlans();
    savedPlans.push(plan);
    
    // حفظ في localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(savedPlans));

    return {
      success: true,
      message: 'تم حفظ الخطة بنجاح!',
      planId: planId
    };
  }

  // الحصول على جميع الخطط المحفوظة للمستخدم الحالي
  getSavedPlans() {
    if (!this.isLoggedIn()) {
      return [];
    }

    const username = this.getCurrentUser();
    const allPlans = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    
    // تصفية الخطط الخاصة بالمستخدم الحالي
    return allPlans.filter(plan => plan.username === username);
  }

  // الحصول على خطة محددة
  getPlan(planId) {
    const savedPlans = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const sharedPlans = JSON.parse(localStorage.getItem(this.sharedPlansKey) || '[]');
    
    const plan = savedPlans.find(p => p.id === planId) || 
                 sharedPlans.find(p => p.id === planId);
    
    return plan || null;
  }

  // مشاركة الخطة (إنشاء رابط قصير)
  sharePlan(planId) {
    const plan = this.getPlan(planId);
    
    if (!plan) {
      return {
        success: false,
        message: 'الخطة غير موجودة'
      };
    }

    // تحديث حالة المشاركة
    plan.isShared = true;
    plan.sharedAt = new Date().toISOString();
    
    // حفظ في قائمة الخطط المشتركة
    const sharedPlans = JSON.parse(localStorage.getItem(this.sharedPlansKey) || '[]');
    const existingIndex = sharedPlans.findIndex(p => p.id === planId);
    
    if (existingIndex >= 0) {
      sharedPlans[existingIndex] = plan;
    } else {
      sharedPlans.push(plan);
    }
    
    localStorage.setItem(this.sharedPlansKey, JSON.stringify(sharedPlans));

    // تحديث في قائمة الخطط المحفوظة أيضاً
    const savedPlans = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const savedIndex = savedPlans.findIndex(p => p.id === planId);
    if (savedIndex >= 0) {
      savedPlans[savedIndex] = plan;
      localStorage.setItem(this.storageKey, JSON.stringify(savedPlans));
    }

    const shortLink = this.generateShortLink(planId);

    return {
      success: true,
      message: 'تم إنشاء رابط المشاركة بنجاح!',
      link: shortLink,
      planId: planId
    };
  }

  // حذف خطة محفوظة
  deletePlan(planId) {
    if (!this.isLoggedIn()) {
      return {
        success: false,
        message: 'يجب تسجيل الدخول أولاً'
      };
    }

    const username = this.getCurrentUser();
    const savedPlans = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const filteredPlans = savedPlans.filter(plan => 
      !(plan.id === planId && plan.username === username)
    );
    
    localStorage.setItem(this.storageKey, JSON.stringify(filteredPlans));

    // حذف من الخطط المشتركة أيضاً
    const sharedPlans = JSON.parse(localStorage.getItem(this.sharedPlansKey) || '[]');
    const filteredShared = sharedPlans.filter(plan => plan.id !== planId);
    localStorage.setItem(this.sharedPlansKey, JSON.stringify(filteredShared));

    return {
      success: true,
      message: 'تم حذف الخطة بنجاح'
    };
  }

  // نسخ الرابط إلى الحافظة
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return {
        success: true,
        message: 'تم نسخ الرابط إلى الحافظة!'
      };
    } catch (err) {
      // طريقة بديلة للمتصفحات القديمة
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return {
          success: true,
          message: 'تم نسخ الرابط إلى الحافظة!'
        };
      } catch (err2) {
        document.body.removeChild(textArea);
        return {
          success: false,
          message: 'فشل نسخ الرابط. يرجى نسخه يدوياً'
        };
      }
    }
  }
}

// إنشاء مثيل عام
const planManager = new PlanManager();

