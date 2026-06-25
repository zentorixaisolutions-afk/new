import supabase, { isSupabaseConfigured } from './supabase';
import type { Project, ProjectInput, ProjectCategory } from './types';

// ─── Public API (anon key — RLS allows SELECT on published projects) ───

export async function getProjects(publishedOnly = true): Promise<Project[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    let query = supabase!
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    if (publishedOnly) query = query.eq('published', true);
    const { data, error } = await query;
    if (error) { console.error('getProjects error:', error); return []; }

    // Fetch categories separately and join
    const { data: cats } = await supabase!.from('project_categories').select('*');
    const catMap = new Map((cats || []).map((c: any) => [c.id, { id: c.id, name: c.name, slug: c.slug, sort_order: c.sort_order }]));

    return (data || []).map((raw: any) => mapProject(raw, catMap.get(raw.category_id) || null));
  } catch (err) { console.error('getProjects error:', err); return []; }
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await supabase!
      .from('projects')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .limit(limit);
    if (error) { console.error('getFeaturedProjects error:', error); return []; }

    const { data: cats } = await supabase!.from('project_categories').select('*');
    const catMap = new Map((cats || []).map((c: any) => [c.id, { id: c.id, name: c.name, slug: c.slug, sort_order: c.sort_order }]));

    return (data || []).map((raw: any) => mapProject(raw, catMap.get(raw.category_id) || null));
  } catch (err) { console.error('getFeaturedProjects error:', err); return []; }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase!
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error || !data) { return null; }

    let category = null;
    if (data.category_id) {
      const { data: cat } = await supabase!.from('project_categories').select('*').eq('id', data.category_id).maybeSingle();
      if (cat) category = { id: cat.id, name: cat.name, slug: cat.slug, sort_order: cat.sort_order };
    }

    return mapProject(data, category);
  } catch (err) { console.error('getProjectBySlug error:', err); return null; }
}

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await supabase!
      .from('project_categories')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) { console.error('getProjectCategories error:', error); return []; }
    return (data || []).map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      sort_order: c.sort_order,
    }));
  } catch (err) { console.error('getProjectCategories error:', err); return []; }
}

// ─── Admin API (authenticated user — RLS allows full CRUD) ───

export async function adminGetProjects(): Promise<Project[]> {
  return getProjects(false);
}

export async function adminGetProject(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase!
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error || !data) { return null; }

    let category = null;
    if (data.category_id) {
      const { data: cat } = await supabase!.from('project_categories').select('*').eq('id', data.category_id).maybeSingle();
      if (cat) category = { id: cat.id, name: cat.name, slug: cat.slug, sort_order: cat.sort_order };
    }

    return mapProject(data, category);
  } catch (err) { console.error('adminGetProject error:', err); return null; }
}

export async function saveProject(input: ProjectInput): Promise<Project | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const payload: Record<string, any> = {
      title: input.title,
      slug: input.slug,
      category_id: input.category_id || null,
      short_description: input.short_description || '',
      full_description: input.full_description || '',
      thumbnail_url: input.thumbnail_url || null,
      demo_url: input.demo_url || null,
      demo_username: input.demo_username || null,
      demo_password: input.demo_password || null,
      admin_username: input.admin_username || null,
      admin_password: input.admin_password || null,
      demo_notes: input.demo_notes || null,
      client: input.client || null,
      project_year: input.project_year || null,
      duration: input.duration || null,
      team_size: input.team_size ?? null,
      metric: input.metric || null,
      metric_label: input.metric_label || null,
      service_link: input.service_link || null,
      technologies: input.technologies || [],
      features: input.features || [],
      gallery_images: input.gallery_images || [],
      videos: input.videos || [],
      featured: input.featured ?? false,
      published: input.published ?? true,
      sort_order: input.sort_order ?? 0,
      meta_title: input.meta_title || null,
      meta_description: input.meta_description || null,
    };

    let resultId: string | null = null;

    if (input.id) {
      const { error } = await supabase!
        .from('projects')
        .update(payload)
        .eq('id', input.id);
      if (error) { console.error('saveProject update error:', error); return null; }
      resultId = input.id;
    } else {
      const { data, error } = await supabase!
        .from('projects')
        .insert(payload)
        .select('id')
        .single();
      if (error) { console.error('saveProject insert error:', error); return null; }
      resultId = data.id;
    }

    // Refetch with category
    if (resultId) {
      return adminGetProject(resultId);
    }
    return null;
  } catch (err) { console.error('saveProject error:', err); return null; }
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase!.from('projects').delete().eq('id', id);
    if (error) { console.error('deleteProject error:', error); return false; }
    return true;
  } catch (err) { console.error('deleteProject error:', err); return false; }
}

export async function getProjectCount(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;
  try {
    const { count, error } = await supabase!
      .from('projects')
      .select('*', { count: 'exact', head: true });
    if (error) return 0;
    return count ?? 0;
  } catch { return 0; }
}

// ─── Mapping ─────────────────────────────────────────────────

function mapProject(raw: any, category?: any): Project {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    category_id: raw.category_id,
    category: category ? { id: category.id, name: category.name, slug: category.slug, sort_order: category.sort_order } : null,
    short_description: raw.short_description || '',
    full_description: raw.full_description || '',
    thumbnail_url: raw.thumbnail_url || null,
    demo_url: raw.demo_url || null,
    demo_username: raw.demo_username || null,
    demo_password: raw.demo_password || null,
    admin_username: raw.admin_username || null,
    admin_password: raw.admin_password || null,
    demo_notes: raw.demo_notes || null,
    client: raw.client || null,
    project_year: raw.project_year || null,
    duration: raw.duration || null,
    team_size: raw.team_size ?? null,
    metric: raw.metric || null,
    metric_label: raw.metric_label || null,
    service_link: raw.service_link || null,
    technologies: Array.isArray(raw.technologies) ? raw.technologies : [],
    features: Array.isArray(raw.features) ? raw.features : [],
    gallery_images: Array.isArray(raw.gallery_images) ? raw.gallery_images : [],
    videos: Array.isArray(raw.videos) ? raw.videos : [],
    featured: raw.featured ?? false,
    published: raw.published ?? true,
    sort_order: raw.sort_order ?? 0,
    meta_title: raw.meta_title || null,
    meta_description: raw.meta_description || null,
    created_at: raw.created_at || '',
    updated_at: raw.updated_at || '',
  };
}