/**
 * نظام إدارة الحجوزات - ArhGo
 * يدير حجوزات الرحلات، المطاعم، والفنادق
 */

class BookingSystem {
  constructor() {
    this.storageKey = 'arhgo_bookings';
    this.init();
  }

  init() {
    // التأكد من وجود LocalStorage
    if (!this.getBookings()) {
      localStorage.setItem(this.storageKey, JSON.stringify({
        flights: [],
        restaurants: [],
        hotels: []
      }));
    }
  }

  // الحصول على جميع الحجوزات
  getBookings() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : { flights: [], restaurants: [], hotels: [] };
    } catch (e) {
      return { flights: [], restaurants: [], hotels: [] };
    }
  }

  // حفظ حجز رحلة
  bookFlight(bookingData) {
    const bookings = this.getBookings();
    const booking = {
      id: this.generateId(),
      type: 'flight',
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    bookings.flights.push(booking);
    localStorage.setItem(this.storageKey, JSON.stringify(bookings));
    return booking;
  }

  // حفظ حجز مطعم
  bookRestaurant(bookingData) {
    const bookings = this.getBookings();
    const booking = {
      id: this.generateId(),
      type: 'restaurant',
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    bookings.restaurants.push(booking);
    localStorage.setItem(this.storageKey, JSON.stringify(bookings));
    return booking;
  }

  // حفظ حجز فندق
  bookHotel(bookingData) {
    const bookings = this.getBookings();
    const booking = {
      id: this.generateId(),
      type: 'hotel',
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    bookings.hotels.push(booking);
    localStorage.setItem(this.storageKey, JSON.stringify(bookings));
    return booking;
  }

  // توليد معرف فريد
  generateId() {
    return 'BK-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // الحصول على حجز محدد
  getBooking(id, type) {
    const bookings = this.getBookings();
    const list = bookings[type + 's'] || [];
    return list.find(b => b.id === id);
  }

  // إلغاء حجز
  cancelBooking(id, type) {
    const bookings = this.getBookings();
    const list = bookings[type + 's'] || [];
    const index = list.findIndex(b => b.id === id);
    if (index > -1) {
      list[index].status = 'cancelled';
      list[index].cancelledAt = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(bookings));
      return true;
    }
    return false;
  }

  // حساب السعر للرحلة
  calculateFlightPrice(tripType, classType, passengers, from, to) {
    const basePrice = 150;
    let price = basePrice;

    // حسب نوع الرحلة
    if (tripType === 'ذهاب وعودة') price *= 1.8;
    else if (tripType === 'متعدد الوجهات') price *= 2.5;

    // حسب الدرجة
    if (classType === 'درجة رجال الأعمال') price *= 2.5;
    else if (classType === 'الأولى') price *= 4;

    // حسب المسافة (تقريبي)
    const distanceMultiplier = this.estimateDistanceMultiplier(from, to);
    price *= distanceMultiplier;

    return Math.round(price * passengers);
  }

  // تقدير مضاعف المسافة
  estimateDistanceMultiplier(from, to) {
    // قائمة بالمسافات التقريبية
    const routes = {
      'بغداد-دبي': 1.2,
      'بغداد-إسطنبول': 1.3,
      'بغداد-لندن': 1.8,
      'بغداد-باريس': 1.9,
      'بغداد-نيويورك': 2.5,
      'دبي-لندن': 1.5,
      'دبي-باريس': 1.6,
      'إسطنبول-لندن': 1.2,
      'إسطنبول-باريس': 1.3
    };

    const route = `${from}-${to}`;
    return routes[route] || 1.0;
  }

  // حساب سعر المطعم
  calculateRestaurantPrice(restaurantId, people, foodType) {
    const basePrices = {
      'arabic': 25,
      'western': 40,
      'seafood': 50,
      'asian': 35,
      'fastfood': 15
    };
    const basePrice = basePrices[foodType] || 30;
    return basePrice * people;
  }

  // حساب سعر الفندق
  calculateHotelPrice(hotelName, rooms, guests, checkin, checkout) {
    const nights = this.calculateNights(checkin, checkout);
    const basePrice = 80; // سعر الليلة الواحدة
    const roomPrice = basePrice * rooms;
    const guestExtra = guests > 2 ? (guests - 2) * 20 : 0;
    return Math.round((roomPrice + guestExtra) * nights);
  }

  // حساب عدد الليالي
  calculateNights(checkin, checkout) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const diffTime = checkoutDate - checkinDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }

  // إرسال الحجز للخادم (اختياري)
  async sendToServer(booking, endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      return await response.json();
    } catch (error) {
      console.warn('فشل الاتصال بالخادم، تم حفظ الحجز محلياً:', error);
      return { success: false, message: 'تم حفظ الحجز محلياً' };
    }
  }

  // طباعة تذكرة/إيصال
  printBooking(booking) {
    const printWindow = window.open('', '_blank');
    const content = this.generateBookingReceipt(booking);
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }

  // توليد إيصال الحجز
  generateBookingReceipt(booking) {
    const date = new Date(booking.createdAt).toLocaleString('ar-IQ');
    let content = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>إيصال الحجز - ${booking.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
          .details { margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .footer { margin-top: 30px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ArhGo - إيصال الحجز</h1>
          <p>رقم الحجز: ${booking.id}</p>
          <p>التاريخ: ${date}</p>
        </div>
        <div class="details">
    `;

    if (booking.type === 'flight') {
      content += `
        <div class="detail-row"><strong>نوع الرحلة:</strong> ${booking.trip}</div>
        <div class="detail-row"><strong>من:</strong> ${booking.from}</div>
        <div class="detail-row"><strong>إلى:</strong> ${booking.to}</div>
        <div class="detail-row"><strong>تاريخ المغادرة:</strong> ${booking.depart}</div>
        ${booking.return ? `<div class="detail-row"><strong>تاريخ العودة:</strong> ${booking.return}</div>` : ''}
        <div class="detail-row"><strong>عدد المسافرين:</strong> ${booking.pcount}</div>
        <div class="detail-row"><strong>الدرجة:</strong> ${booking.classType}</div>
        <div class="detail-row"><strong>الاسم:</strong> ${booking.fullname}</div>
        <div class="detail-row"><strong>البريد:</strong> ${booking.email}</div>
        <div class="detail-row"><strong>الهاتف:</strong> ${booking.phone}</div>
        <div class="detail-row"><strong>السعر:</strong> $${booking.price || 'N/A'}</div>
      `;
    } else if (booking.type === 'restaurant') {
      content += `
        <div class="detail-row"><strong>اسم المطعم:</strong> ${booking.restaurantName}</div>
        <div class="detail-row"><strong>الاسم:</strong> ${booking.name}</div>
        <div class="detail-row"><strong>الهاتف:</strong> ${booking.phone}</div>
        <div class="detail-row"><strong>عدد الأشخاص:</strong> ${booking.people}</div>
        <div class="detail-row"><strong>التاريخ والوقت:</strong> ${booking.date}</div>
        <div class="detail-row"><strong>السعر المتوقع:</strong> $${booking.price || 'N/A'}</div>
      `;
    } else if (booking.type === 'hotel') {
      content += `
        <div class="detail-row"><strong>اسم الفندق:</strong> ${booking.hotelName}</div>
        <div class="detail-row"><strong>الاسم:</strong> ${booking.userName}</div>
        <div class="detail-row"><strong>عدد الغرف:</strong> ${booking.rooms}</div>
        <div class="detail-row"><strong>عدد الأشخاص:</strong> ${booking.guests}</div>
        <div class="detail-row"><strong>تاريخ الوصول:</strong> ${booking.checkin}</div>
        <div class="detail-row"><strong>تاريخ المغادرة:</strong> ${booking.checkout}</div>
        <div class="detail-row"><strong>السعر:</strong> $${booking.price || 'N/A'}</div>
      `;
    }

    content += `
        </div>
        <div class="footer">
          <p>شكراً لاستخدام ArhGo</p>
          <p>للاستفسار: support@arhgo.com</p>
        </div>
      </body>
      </html>
    `;

    return content;
  }
}

// إنشاء instance عام
const bookingSystem = new BookingSystem();

