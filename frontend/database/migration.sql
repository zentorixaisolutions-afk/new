-- ============================================================================
-- SINS Technology - MySQL Database Migration
-- Database: technic9_it_services
-- Host: localhost
-- Port: 3306
-- ============================================================================

-- ─── Admin Users ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `display_name` VARCHAR(150) DEFAULT NULL,
    `last_login` DATETIME DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Services ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `services` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT,
    `icon` VARCHAR(100) DEFAULT NULL,
    `image_path` VARCHAR(500) DEFAULT NULL,
    `features` TEXT DEFAULT NULL COMMENT 'JSON array of feature strings',
    `sort_order` INT NOT NULL DEFAULT 0,
    `published` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Blog Posts ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `blog_posts` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `excerpt` TEXT,
    `content` LONGTEXT,
    `category` VARCHAR(100) DEFAULT NULL,
    `cover_image_path` VARCHAR(500) DEFAULT NULL,
    `author` VARCHAR(150) DEFAULT NULL,
    `published` TINYINT(1) NOT NULL DEFAULT 0,
    `published_at` DATETIME DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Gallery / Images ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `gallery` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `image_path` VARCHAR(500) NOT NULL,
    `sort_order` INT NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Contact Form Submissions ────────────────────────────────
CREATE TABLE IF NOT EXISTS `contact_submissions` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) DEFAULT NULL,
    `company` VARCHAR(200) DEFAULT NULL,
    `service_type` VARCHAR(200) DEFAULT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('new', 'read', 'archived') NOT NULL DEFAULT 'new',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Seed: Default Services ──────────────────────────────────
INSERT INTO `services` (`title`, `slug`, `description`, `icon`, `features`, `sort_order`, `published`) VALUES
(
    'Structured Cabling & Server Management',
    'structured-cabling-server-management',
    'Comprehensive network infrastructure solutions including structured cabling design, installation, testing, and server management for maximum uptime and performance.',
    'Server',
    '["Cat6/6A/7 structured cabling","Fiber optic backbone installation","Server rack setup & cable management","Network testing & certification","Server monitoring & maintenance","Data center optimization"]',
    1,
    1
),
(
    'Router, Switches, VPN & Firewall Administration',
    'router-switches-vpn-firewall',
    'Enterprise-grade network device configuration, security hardening, VPN setup, and firewall administration to protect your business network.',
    'Shield',
    '["Router & switch configuration","VLAN segmentation & QoS","Site-to-site & remote VPN","Firewall rule management","Network security audits","Intrusion detection & prevention"]',
    2,
    1
),
(
    'Cloud Solutions & PBX Phone Systems',
    'cloud-solutions-pbx-phone',
    'Scalable cloud migration, hybrid infrastructure, and modern PBX VoIP phone systems to streamline communication and reduce operational costs.',
    'Cloud',
    '["Cloud migration & deployment","Hybrid cloud architecture","AWS/Azure/GCP management","VoIP PBX phone systems","SIP trunking & call routing","Unified communications"]',
    3,
    1
),
(
    'Access Control, Time Attendance & Entrance Management',
    'access-control-time-attendance',
    'Advanced security solutions for physical access control, biometric time attendance tracking, and entrance management systems.',
    'Lock',
    '["Biometric & RFID access control","Time attendance tracking","Visitor management systems","Electric locks & gates","Elevator floor control","24/7 monitoring & alerts"]',
    4,
    1
),
(
    'CCTV & Anti-Theft EAS Solutions',
    'cctv-anti-theft-eas',
    'High-definition surveillance systems and electronic article surveillance for comprehensive security monitoring and theft prevention.',
    'Video',
    '["IP & analog CCTV systems","NVR/DVR configuration","Remote mobile viewing","Motion detection alerts","Anti-theft EAS gates","Retail loss prevention"]',
    5,
    1
),
(
    'POS & Accounting / Billing Software',
    'pos-accounting-billing-software',
    'Integrated point-of-sale hardware and software solutions with accounting and billing systems for retail, hospitality, and service businesses.',
    'Monitor',
    '["POS hardware & software","Inventory management","Barcode & receipt printers","Accounting integration","Multi-store reporting","Cloud-based billing"]',
    6,
    1
),
(
    'Web Development & IT Support (Remote / Onsite)',
    'web-development-it-support',
    'Custom web development, application design, and comprehensive IT support services available both remotely and on-site for your business.',
    'Code',
    '["Custom web applications","Responsive website design","E-commerce development","Remote & onsite IT support","Help desk ticketing system","IT consulting & strategy"]',
    7,
    1
);

-- ─── Indexes ─────────────────────────────────────────────────
CREATE INDEX idx_services_slug ON `services`(`slug`);
CREATE INDEX idx_services_published ON `services`(`published`);
CREATE INDEX idx_services_sort_order ON `services`(`sort_order`);
CREATE INDEX idx_blog_slug ON `blog_posts`(`slug`);
CREATE INDEX idx_blog_published ON `blog_posts`(`published`);
CREATE INDEX idx_blog_created ON `blog_posts`(`created_at`);
CREATE INDEX idx_contact_status ON `contact_submissions`(`status`);
CREATE INDEX idx_contact_created ON `contact_submissions`(`created_at`);
CREATE INDEX idx_gallery_sort ON `gallery`(`sort_order`);
CREATE INDEX idx_admin_email ON `admin_users`(`email`);