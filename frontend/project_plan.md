# Samarat Infinity Network Solutions - Corporate Website

## 1. Project Description
A premium, modern corporate website for SINS Technology — an IT services and software solutions company. The site targets enterprise clients and decision-makers, conveying trust, technical expertise, and a refined brand identity. The aesthetic is calm, spacious, and expensive (Linear/Vercel/Stripe-inspired), with restrained motion and clear information hierarchy.

## 2. Page Structure
- `/` — Home (hero, marquee, about teaser, services teaser, featured projects, why-choose-us, trust stats, testimonials, CTA band)
- `/about` — About (company story, mission, values, team, why-choose-us)
- `/company-profile` — Company Profile (vision, leadership, milestones/timeline, certifications, downloadable profile CTA)
- `/services` — Services (grid of IT services with detail cards)
- `/projects` — Projects (portfolio grid with category filters and case-study cards)
- `/projects/:slug` — Project Detail (full case study with gallery, videos, demo access, technologies, features)
- `/blog` — Blog (article grid with categories, featured post, individual post layout)
- `/contact` — Contact (contact form, office info, map placeholder, social links)
- `/admin/login` — Admin Login (Supabase Auth email/password)
- `/admin` — Admin Dashboard (stats, quick links)
- `/admin/services` — Services Admin (CRUD table)
- `/admin/services/new` — New Service Form (with image upload)
- `/admin/services/:id` — Edit Service Form (with image upload)
- `/admin/blog` — Blog Admin (CRUD table)
- `/admin/blog/new` — New Blog Post Form (with image upload)
- `/admin/blog/:id` — Edit Blog Post Form (with image upload)
- `/admin/messages` — Messages Admin (contact submissions viewer)
- `/admin/projects` — Projects Admin (CRUD table)
- `/admin/projects/new` — New Project Form (with image/video upload)
- `/admin/projects/:id` — Edit Project Form (with image/video upload)

## 3. Core Features
- [x] Sticky navbar with scroll behavior (transparent→solid, hide/show)
- [x] Deep navy footer with link columns, social icons, contact info
- [x] Floating contact/chat button (bottom-right)
- [x] GSAP + ScrollTrigger scroll-reveal animations
- [x] Hero parallax background effect
- [x] Marquee/ticker band with tech keywords
- [x] Gradient-mesh hero backgrounds with multi-stop transitions
- [x] Alternating soft section bands for visual rhythm
- [x] Trust stats row
- [x] Client logo/testimonial marquee
- [x] Category-filtered portfolio grid
- [x] Blog with featured post and article layout
- [x] Contact form with validation
- [x] Responsive mobile-first layout with hamburger menu
- [x] prefers-reduced-motion support throughout
- [x] Supabase backend integration (services, blog, contact)
- [x] Admin panel with authentication (Supabase Auth)
- [x] Services CRUD with image upload
- [x] Blog CRUD with image upload
- [x] Contact submissions viewer with status management
- [x] Public pages wired to live Supabase data with mock fallbacks
- [x] Full Projects/Portfolio system with Supabase backend
- [x] Project categories with dynamic filtering
- [x] Project detail pages with galleries, videos, and demo access
- [x] Demo login credential display with copy-to-clipboard
- [x] Admin projects CRUD with image upload, gallery management, and video URLs

## 4. Data Model Design

### Table: services
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| title | text | Service title |
| slug | text | URL-friendly unique slug |
| description | text | Short description |
| icon | text | Lucide icon name |
| image_url | text | Public URL from Storage |
| features | text[] | Array of feature strings |
| sort_order | int | Display ordering |
| published | boolean | Visibility toggle |
| created_at | timestamptz | Creation timestamp |

### Table: blog_posts
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| title | text | Post title |
| slug | text | URL-friendly unique slug |
| excerpt | text | Short excerpt |
| content | text | Markdown/HTML body |
| category | text | Post category |
| cover_image_url | text | Public URL from Storage |
| author | text | Author name |
| published | boolean | Visibility toggle |
| published_at | timestamptz | Publication date |
| created_at | timestamptz | Creation timestamp |

### Table: contact_submissions
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| name | text | Sender name |
| email | text | Sender email |
| phone | text | Phone number |
| company | text | Company name |
| service_type | text | Service of interest |
| message | text | Message body |
| status | text | new / read / archived |
| created_at | timestamptz | Submission timestamp |

### Table: projects
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| title | text | Project title |
| slug | text | URL-friendly unique slug |
| category_id | uuid | FK to project_categories |
| short_description | text | Card summary |
| full_description | text | Detail page body |
| thumbnail_url | text | Main project image |
| demo_url | text | Optional demo link |
| demo_username | text | Demo login user |
| demo_password | text | Demo login password |
| admin_username | text | Admin demo user |
| admin_password | text | Admin demo password |
| demo_notes | text | Demo instructions |
| client | text | Client name |
| project_year | text | Year completed |
| duration | text | Project timeline |
| team_size | int | Team members |
| metric | text | Key metric value |
| metric_label | text | Metric description |
| service_link | text | Related service URL |
| technologies | jsonb | Array of tech tags |
| features | jsonb | Array of feature strings |
| gallery_images | jsonb | Array of {url, title, type} objects |
| videos | jsonb | Array of {url, title, type} objects |
| featured | boolean | Featured flag |
| published | boolean | Visibility toggle |
| sort_order | int | Display ordering |
| meta_title | text | SEO title |
| meta_description | text | SEO description |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update |

### Table: project_categories
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| name | text | Category display name |
| slug | text | URL-friendly unique slug |
| sort_order | int | Display ordering |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update |

## 5. Backend / Third-party Integration Plan
- MySQL/PHP: Connected — Auth, Database (services, blog_posts, contact_submissions), Storage (media bucket for images)
- Shopify: Not required
- Stripe: Not required
- Contact form: MySQL via PHP API, submissions stored in contact_submissions table

## 6. Development Phase Plan

### Phase 1: Design System + Global Components + Home Page
- Goal: Establish the visual foundation and build the most complex page
- Deliverable: Tailwind config, CSS variables, Google Fonts, shared components, Home page, route setup

### Phase 2: About + Company Profile Pages
- Goal: Build the two corporate identity pages
- Deliverable: /about and /company-profile pages

### Phase 3: Services + Projects Pages
- Goal: Build the services catalog and portfolio showcase
- Deliverable: /services and /projects pages with filtering

### Phase 4: Blog + Contact Pages
- Goal: Build content hub and contact page with form
- Deliverable: /blog and /contact pages

### Phase 5: Animation Refinement + Responsive Polish
- Goal: Fine-tune all motion, responsive breakpoints, and accessibility
- Deliverable: Smooth animations, mobile perfection, reduced-motion support

### Phase 6: Supabase Backend + Admin Panel (Current)
- Goal: Add complete backend, admin panel, and wire public pages to live data
- Deliverable: Data layer, admin panel (dashboard, services CRUD, blog CRUD, messages), public page wiring with mock fallbacks
- Status: Code complete — awaiting Supabase connection to run SQL schema and create storage buckets