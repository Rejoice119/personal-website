CREATE DATABASE IF NOT EXISTS personal_website
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE personal_website;

CREATE TABLE IF NOT EXISTS Admin (
  id VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(191) NOT NULL,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_email (email),
  KEY idx_admin_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Project (
  id VARCHAR(191) NOT NULL,
  title VARCHAR(191) NOT NULL,
  description TEXT NOT NULL,
  shortDesc VARCHAR(191) NOT NULL,
  technologies JSON NOT NULL,
  imageUrl VARCHAR(191) NOT NULL,
  imageAlt VARCHAR(191) NOT NULL,
  projectUrl VARCHAR(191) DEFAULT NULL,
  githubUrl VARCHAR(191) DEFAULT NULL,
  caseStudy TEXT DEFAULT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  `order` INT NOT NULL DEFAULT 0,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_project_featured (featured),
  KEY idx_project_order (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Skill (
  id VARCHAR(191) NOT NULL,
  name VARCHAR(191) NOT NULL,
  level VARCHAR(191) NOT NULL,
  category VARCHAR(191) NOT NULL,
  icon VARCHAR(191) DEFAULT NULL,
  `order` INT NOT NULL DEFAULT 0,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_skill_category (category),
  KEY idx_skill_order (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Message (
  id VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL,
  name VARCHAR(191) NOT NULL,
  subject VARCHAR(191) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(191) NOT NULL DEFAULT 'unread',
  reply TEXT DEFAULT NULL,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_message_status (status),
  KEY idx_message_createdAt (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Testimonial (
  id VARCHAR(191) NOT NULL,
  author VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL,
  company VARCHAR(191) DEFAULT NULL,
  position VARCHAR(191) DEFAULT NULL,
  content TEXT NOT NULL,
  rating INT DEFAULT NULL,
  imageUrl VARCHAR(191) DEFAULT NULL,
  websiteUrl VARCHAR(191) DEFAULT NULL,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  `order` INT NOT NULL DEFAULT 0,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_testimonial_approved (approved),
  KEY idx_testimonial_featured (featured),
  KEY idx_testimonial_createdAt (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS SiteSettings (
  id VARCHAR(191) NOT NULL,
  siteName VARCHAR(191) NOT NULL DEFAULT 'Personal Portfolio',
  siteDescription TEXT NOT NULL,
  bio TEXT NOT NULL,
  email VARCHAR(191) NOT NULL,
  phone VARCHAR(191) DEFAULT NULL,
  location VARCHAR(191) DEFAULT NULL,
  socialTwitter VARCHAR(191) DEFAULT NULL,
  socialLinkedIn VARCHAR(191) DEFAULT NULL,
  socialGithub VARCHAR(191) DEFAULT NULL,
  socialInstagram VARCHAR(191) DEFAULT NULL,
  socialFacebook VARCHAR(191) DEFAULT NULL,
  resumeUrl VARCHAR(191) DEFAULT NULL,
  primaryColor VARCHAR(191) NOT NULL DEFAULT '#3B82F6',
  secondaryColor VARCHAR(191) NOT NULL DEFAULT '#1F2937',
  updatedAt DATETIME(3) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS PageView (
  id VARCHAR(191) NOT NULL,
  page VARCHAR(191) NOT NULL,
  referrer VARCHAR(191) DEFAULT NULL,
  userAgent VARCHAR(191) DEFAULT NULL,
  ipHash VARCHAR(191) DEFAULT NULL,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY idx_pageview_page (page),
  KEY idx_pageview_createdAt (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
