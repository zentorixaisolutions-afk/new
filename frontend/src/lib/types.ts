export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image_url: string | null;
  features: string[];
  sort_order: number;
  published: boolean;
  created_at: string;
}

export interface ServiceInput {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  image_url?: string | null;
  features?: string[];
  sort_order?: number;
  published?: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service_type: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
}

export interface ContactSubmissionInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type?: string;
  message: string;
}

export interface DashboardStats {
  totalServices: number;
  totalPosts: number;
  totalMessages: number;
  unreadMessages: number;
}

// ─── Projects ────────────────────────────────────────────────

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface ProjectMedia {
  url: string;
  title?: string;
  type?: 'image' | 'video';
  is_cover?: boolean;
  sort_order?: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  category: ProjectCategory | null;
  short_description: string;
  full_description: string;
  thumbnail_url: string | null;
  demo_url: string | null;
  demo_username: string | null;
  demo_password: string | null;
  admin_username: string | null;
  admin_password: string | null;
  demo_notes: string | null;
  client: string | null;
  project_year: string | null;
  duration: string | null;
  team_size: number | null;
  metric: string | null;
  metric_label: string | null;
  service_link: string | null;
  technologies: string[];
  features: string[];
  gallery_images: ProjectMedia[];
  videos: ProjectMedia[];
  featured: boolean;
  published: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  id?: string;
  title: string;
  slug: string;
  category_id: string | null;
  short_description?: string;
  full_description?: string;
  thumbnail_url?: string | null;
  demo_url?: string | null;
  demo_username?: string | null;
  demo_password?: string | null;
  admin_username?: string | null;
  admin_password?: string | null;
  demo_notes?: string | null;
  client?: string | null;
  project_year?: string | null;
  duration?: string | null;
  team_size?: number | null;
  metric?: string | null;
  metric_label?: string | null;
  service_link?: string | null;
  technologies?: string[];
  features?: string[];
  gallery_images?: ProjectMedia[];
  videos?: ProjectMedia[];
  featured?: boolean;
  published?: boolean;
  sort_order?: number;
  meta_title?: string | null;
  meta_description?: string | null;
}