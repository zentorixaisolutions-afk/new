# SINS Technology - cPanel Deployment Guide

## Quick Setup (5 Steps)

### Step 1 — Create the Database

1. Log into **cPanel → MySQL Databases**
2. Create database: `technic9_it_services`
3. Create user: `technic9_ruwan` with a strong password
4. Add user to database with **ALL PRIVILEGES**

### Step 2 — Import the SQL Migration

Open **phpMyAdmin** → select `technic9_it_services` → Import tab:

1. Upload `database/migration.sql`
2. Click **Go**

This creates all 5 tables and seeds 7 default services.

### Step 3 — Create Admin User

Run this SQL in phpMyAdmin (replace credentials):

```sql
-- Generate password hash first at: https://bcrypt-generator.com/
-- Then run:
INSERT INTO admin_users (username, email, password_hash, display_name)
VALUES ('admin', 'admin@yourdomain.com', '$2y$12$...', 'Admin');
```

Or use the helper script via cPanel Terminal:
```bash
php database/seed_admin.php "admin@yourdomain.com" "your-password" "Admin Name"
```

**Important:** Delete `database/seed_admin.php` after creating the admin user.

### Step 4 — Configure Database Password

In `api/.htaccess`, replace the placeholder:

```apache
SetEnv DB_PASSWORD "YOUR_DATABASE_PASSWORD_HERE"
```

With your actual database password.

**Security tip:** For production, set environment variables through cPanel's "Set Environment Variables" feature instead of .htaccess, then remove the SetEnv lines from .htaccess.

### Step 5 — Build and Upload

1. Build the React frontend locally:
```bash
npm install
npm run build
```

2. Upload the `dist/` contents to your cPanel **public_html** directory.

3. Upload the `api/` folder to **public_html/api/**.

4. Create upload directories:
```
public_html/uploads/
public_html/uploads/services/
public_html/uploads/blog/
public_html/uploads/gallery/
```

5. Set permissions for uploads:
```bash
chmod 755 public_html/uploads
chmod 755 public_html/uploads/services
chmod 755 public_html/uploads/blog
chmod 755 public_html/uploads/gallery
```

---

## File Structure (on cPanel)

```
public_html/
├── index.html              (React SPA entry)
├── assets/                 (Vite build output)
├── api/
│   ├── .htaccess           (CORS, env vars, security)
│   ├── config.php          (DB connection, helpers)
│   ├── dashboard.php       (Admin stats)
│   ├── upload.php          (Image upload handler)
│   ├── auth/
│   │   ├── login.php
│   │   ├── logout.php
│   │   └── check.php
│   ├── services/
│   │   ├── list.php
│   │   ├── get.php
│   │   ├── save.php
│   │   └── delete.php
│   ├── blogs/
│   │   ├── list.php
│   │   ├── get.php
│   │   ├── save.php
│   │   └── delete.php
│   ├── contacts/
│   │   ├── list.php
│   │   ├── submit.php
│   │   ├── update-status.php
│   │   └── delete.php
│   └── gallery/
│       ├── list.php
│       ├── save.php
│       └── delete.php
├── uploads/
│   ├── services/
│   ├── blog/
│   └── gallery/
└── .htaccess               (React SPA rewrite rules)
```

---

## React SPA Rewrite Rules

Create or update `public_html/.htaccess`:

```apache
RewriteEngine On
RewriteBase /

# Don't rewrite API requests
RewriteCond %{REQUEST_URI} !^/api/
# Don't rewrite existing files/directories
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Rewrite everything else to index.html
RewriteRule ^ index.html [L]
```

---

## Database Tables

| Table | Purpose |
|---|---|
| `admin_users` | Admin authentication |
| `services` | Service listings (7 pre-seeded) |
| `blog_posts` | Blog articles |
| `gallery` | Uploaded images |
| `contact_submissions` | Contact form entries |

---

## Admin Panel URLs

| URL | Description |
|---|---|
| `/admin/login` | Admin login page |
| `/admin` | Dashboard with stats |
| `/admin/services` | Services CRUD |
| `/admin/blog` | Blog posts CRUD |
| `/admin/messages` | Contact form submissions |

---

## Troubleshooting

**"Database connection failed"**
→ Check DB_PASSWORD in `api/.htaccess` matches cPanel MySQL user password

**"Unauthorized" on admin pages**
→ Clear browser cookies and log in again at `/admin/login`

**Image upload fails**
→ Check uploads/ folder permissions (chmod 755) and that the folders exist

**API returns 404**
→ Ensure `api/` folder and `.htaccess` are uploaded correctly
→ Check cPanel PHP version is 7.4 or higher
→ Ensure `mod_rewrite` is enabled in cPanel

**Frontend shows blank page**
→ Add the React SPA rewrite rules to `public_html/.htaccess` (see above)