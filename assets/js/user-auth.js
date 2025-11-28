// نظام إدارة المستخدمين والمصادقة
class UserAuth {
  constructor() {
    this.storageKey = 'arhgo_users';
    this.currentUserKey = 'arhgo_current_user';
    this.userFormsKey = 'arhgo_user_forms';
  }

  // التحقق من تسجيل الدخول
  isLoggedIn() {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  // الحصول على المستخدم الحالي
  getCurrentUser() {
    const userData = localStorage.getItem(this.currentUserKey);
    if (!userData) return null;
    
    const username = userData;
    const allUsers = this.getAllUsers();
    return allUsers.find(u => u.username === username) || null;
  }

  // الحصول على جميع المستخدمين
  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // حفظ مستخدم جديد
  saveUser(userData) {
    const users = this.getAllUsers();
    
    // التحقق من عدم وجود مستخدم بنفس البريد الإلكتروني
    if (users.find(u => u.email === userData.email)) {
      return {
        success: false,
        message: 'البريد الإلكتروني مستخدم بالفعل'
      };
    }

    // التحقق من عدم وجود مستخدم بنفس اسم المستخدم
    if (users.find(u => u.username === userData.username)) {
      return {
        success: false,
        message: 'اسم المستخدم مستخدم بالفعل'
      };
    }

    const user = {
      ...userData,
      createdAt: new Date().toISOString(),
      forms: []
    };

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return {
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      user: user
    };
  }

  // تسجيل الدخول
  login(email, password) {
    const users = this.getAllUsers();
    const user = users.find(u => 
      u.email.trim().toLowerCase() === email.trim().toLowerCase() && 
      u.password === password
    );

    if (!user) {
      return {
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      };
    }

    // حفظ المستخدم الحالي
    localStorage.setItem(this.currentUserKey, user.username);
    localStorage.setItem('loggedIn', user.username); // للتوافق مع الكود القديم

    return {
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      user: user
    };
  }

  // تسجيل الخروج
  logout() {
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem('loggedIn');
    return {
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    };
  }

  // حفظ معلومات الفورم للمستخدم الحالي
  saveFormData(formData) {
    if (!this.isLoggedIn()) {
      return {
        success: false,
        message: 'يجب تسجيل الدخول أولاً'
      };
    }

    const username = this.getCurrentUser().username;
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex === -1) {
      return {
        success: false,
        message: 'المستخدم غير موجود'
      };
    }

    const formEntry = {
      ...formData,
      savedAt: new Date().toISOString(),
      id: 'form_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    };

    if (!users[userIndex].forms) {
      users[userIndex].forms = [];
    }

    users[userIndex].forms.push(formEntry);
    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return {
      success: true,
      message: 'تم حفظ معلومات الفورم بنجاح',
      formId: formEntry.id
    };
  }

  // الحصول على جميع نماذج المستخدم الحالي
  getUserForms() {
    if (!this.isLoggedIn()) {
      return [];
    }

    const user = this.getCurrentUser();
    return user ? (user.forms || []) : [];
  }

  // تحديث معلومات المستخدم
  updateUser(updatedData) {
    if (!this.isLoggedIn()) {
      return {
        success: false,
        message: 'يجب تسجيل الدخول أولاً'
      };
    }

    const username = this.getCurrentUser().username;
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex === -1) {
      return {
        success: false,
        message: 'المستخدم غير موجود'
      };
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(this.storageKey, JSON.stringify(users));

    return {
      success: true,
      message: 'تم تحديث المعلومات بنجاح',
      user: users[userIndex]
    };
  }
}

// إنشاء مثيل عام
const userAuth = new UserAuth();

