-- ============================================
-- إنشاء قاعدة بيانات جديدة ضخمة - ArhGo Trip Planner
-- قاعدة بيانات شاملة للدول العربية في قارة آسيا
-- ============================================

-- حذف قاعدة البيانات القديمة (إذا كانت موجودة)
DROP DATABASE IF EXISTS arhgo_new_db;

-- إنشاء قاعدة البيانات الجديدة
CREATE DATABASE arhgo_new_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE arhgo_new_db;

-- ============================================
-- جدول الدول العربية في آسيا
-- ============================================
CREATE TABLE IF NOT EXISTS arab_countries_asia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_name_ar VARCHAR(100) NOT NULL UNIQUE,
    country_name_en VARCHAR(100) NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    continent VARCHAR(50) DEFAULT 'آسيا',
    capital VARCHAR(100),
    currency VARCHAR(50),
    language VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_country_name (country_name_ar),
    INDEX idx_country_code (country_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- جدول المدن
-- ============================================
CREATE TABLE IF NOT EXISTS cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city_name_ar VARCHAR(100) NOT NULL,
    city_name_en VARCHAR(100),
    country_id INT NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES arab_countries_asia(id) ON DELETE CASCADE,
    INDEX idx_city_name (city_name_ar),
    INDEX idx_country (country_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- جدول الفنادق
-- ============================================
CREATE TABLE IF NOT EXISTS hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(100) NOT NULL,
    city_id INT NOT NULL,
    country_id INT NOT NULL,
    budget ENUM('منخفضة', 'متوسطة', 'عالية') NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    price DECIMAL(10,2) DEFAULT 0.00,
    features JSON,
    wifi BOOLEAN DEFAULT TRUE,
    pool BOOLEAN DEFAULT FALSE,
    spa BOOLEAN DEFAULT FALSE,
    restaurant BOOLEAN DEFAULT FALSE,
    gym BOOLEAN DEFAULT FALSE,
    beach_access BOOLEAN DEFAULT FALSE,
    concierge BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(500),
    website_url VARCHAR(500),
    phone VARCHAR(50),
    email VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE,
    FOREIGN KEY (country_id) REFERENCES arab_countries_asia(id) ON DELETE CASCADE,
    INDEX idx_location (location),
    INDEX idx_country (country_id),
    INDEX idx_city (city_id),
    INDEX idx_budget (budget),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- جدول المطاعم
-- ============================================
CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(100) NOT NULL,
    city_id INT NOT NULL,
    country_id INT NOT NULL,
    food_type ENUM('عربي', 'غربي', 'آسيوي', 'إيطالي', 'مكسيكي', 'مأكولات بحرية', 'وجبات سريعة', 'حلويات', 'مشروبات') NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    price_range ENUM('$', '$$', '$$$', '$$$$') DEFAULT '$',
    open_hour INT DEFAULT 10,
    close_hour INT DEFAULT 22,
    image_url VARCHAR(500),
    website_url VARCHAR(500),
    phone VARCHAR(50),
    email VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE,
    FOREIGN KEY (country_id) REFERENCES arab_countries_asia(id) ON DELETE CASCADE,
    INDEX idx_location (location),
    INDEX idx_country (country_id),
    INDEX idx_city (city_id),
    INDEX idx_food_type (food_type),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- جدول خطط السفر
-- ============================================
CREATE TABLE IF NOT EXISTS travel_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    plan_name VARCHAR(200) NOT NULL,
    user_name VARCHAR(100),
    country_id INT NOT NULL,
    city_id INT,
    weather_preference VARCHAR(50),
    view_preference VARCHAR(50),
    trip_type VARCHAR(50),
    interests JSON,
    activities JSON,
    budget ENUM('منخفضة', 'متوسطة', 'عالية') NOT NULL,
    start_date DATE,
    end_date DATE,
    duration_days INT,
    estimated_cost DECIMAL(10,2) DEFAULT 0.00,
    selected_hotels JSON,
    selected_restaurants JSON,
    plan_data JSON,
    share_link VARCHAR(255) UNIQUE,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES arab_countries_asia(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_country (country_id),
    INDEX idx_share_link (share_link)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

