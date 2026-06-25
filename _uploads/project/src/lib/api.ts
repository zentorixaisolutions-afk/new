import supabase from './supabase';
import { getAdminToken } from './adminAuth';
import type { Service, ServiceInput, ContactSubmission, ContactSubmissionInput, DashboardStats } from './types';

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || '';

// ─── Edge Function Helpers ────────────────────────────────

async function callPublic(resource: string, params?: Record<string, string>, body?: Record<string, unknown>) {
  const qs = new URLSearchParams({ resource, ...params }).toString();
  const res = await fetch(`${SUPABASE_URL}functions/v1/public-data?${qs}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function callAdmin(resource: string, method = 'GET', body?: Record<string, unknown>) {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const qs = new URLSearchParams({ resource }).toString();
  const res = await fetch(`${SUPABASE_URL}functions/v1/admin-data?${qs}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': token,
      apikey: SUPABASE_ANON_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

// ─── Services ────────────────────────────────────────────────

export async function getServices(publishedOnly = true): Promise<Service[]> {
  try {
    const params: Record<string, string> = {};
    if (publishedOnly) params.published = 'true';
    const result = await callPublic('services', params);
    if (!result.success) throw new Error(result.message);
    return (result.data || []).map(mapService);
  } catch (err) {
    console.error('getServices error:', err);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const result = await callPublic('services');
    if (!result.success) throw new Error(result.message);
    const services: Service[] = (result.data || []).map(mapService);
    return services.find((s) => s.slug === slug) || null;
  } catch (err) {
    console.error('getServiceBySlug error:', err);
    return null;
  }
}

export async function saveService(input: ServiceInput): Promise<Service | null> {
  try {
    const payload: Record<string, unknown> = {
      id: input.id,
      title: input.title,
      slug: input.slug,
      description: input.description || '',
      icon: input.icon || '',
      image_url: input.image_url || null,
      features: input.features || [],
      sort_order: input.sort_order ?? 0,
      published: input.published ?? true,
    };
    const result = await callAdmin('services', 'POST', payload);
    if (!result.success) throw new Error(result.message);
    return mapService(result.data);
  } catch (err) {
    console.error('saveService error:', err);
    return null;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const result = await callAdmin('services', 'DELETE', { id });
    if (!result.success) throw new Error(result.message);
    return true;
  } catch (err) {
    console.error('deleteService error:', err);
    return false;
  }
}

// ─── Contact Submissions ─────────────────────────────────────

export async function submitContact(input: ContactSubmissionInput): Promise<boolean> {
  try {
    const result = await callPublic('contact-submit', {}, {
      name: input.name,
      email: input.email,
      phone: input.phone || '',
      company: input.company || '',
      service_type: input.service_type || '',
      message: input.message,
    });
    if (!result.success) throw new Error(result.message);
    return true;
  } catch (err) {
    console.error('submitContact error:', err);
    return false;
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const result = await callAdmin('contacts', 'GET');
    if (!result.success) throw new Error(result.message);
    return (result.data || []).map(mapContactSubmission);
  } catch (err) {
    console.error('getContactSubmissions error:', err);
    return [];
  }
}

export async function markContactRead(id: string, status: 'new' | 'read' | 'archived'): Promise<boolean> {
  try {
    const result = await callAdmin('contacts', 'PATCH', { id, status });
    if (!result.success) throw new Error(result.message);
    return true;
  } catch (err) {
    console.error('markContactRead error:', err);
    return false;
  }
}

export async function deleteContact(id: string): Promise<boolean> {
  try {
    const result = await callAdmin('contacts', 'DELETE', { id });
    if (!result.success) throw new Error(result.message);
    return true;
  } catch (err) {
    console.error('deleteContact error:', err);
    return false;
  }
}

// ─── Dashboard Stats ─────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const result = await callAdmin('dashboard', 'GET');
    if (!result.success) throw new Error(result.message);
    return {
      totalServices: result.data.totalServices ?? 0,
      totalPosts: result.data.totalPosts ?? 0,
      totalMessages: result.data.totalMessages ?? 0,
      unreadMessages: result.data.unreadMessages ?? 0,
    };
  } catch (err) {
    console.error('getDashboardStats error:', err);
    return { totalServices: 0, totalPosts: 0, totalMessages: 0, unreadMessages: 0 };
  }
}

// ─── Auth ────────────────────────────────────────────────────

export async function signIn(email: string, password: string): Promise<boolean> {
  try {
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('signIn error:', err);
    return false;
  }
}

export async function signOut(): Promise<void> {
  await supabase!.auth.signOut();
}

export async function getCurrentUser() {
  try {
    const { data } = await supabase!.auth.getSession();
    return data.session?.user ?? null;
  } catch {
    return null;
  }
}

export function onAuthChange(callback: (user: unknown) => void) {
  const { data } = supabase!.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return { data };
}

// ─── Field Mapping Helpers ───────────────────────────────────

function mapService(raw: any): Service {
  return {
    id: String(raw.id),
    title: raw.title,
    slug: raw.slug,
    description: raw.description || '',
    icon: raw.icon || '',
    image_url: raw.image_url || null,
    features: Array.isArray(raw.features) ? raw.features : [],
    sort_order: raw.sort_order ?? 0,
    published: Boolean(raw.published),
    created_at: raw.created_at || '',
  };
}

function mapContactSubmission(raw: any): ContactSubmission {
  return {
    id: String(raw.id),
    name: raw.name,
    email: raw.email,
    phone: raw.phone || '',
    company: raw.company || '',
    service_type: raw.service_type || '',
    message: raw.message,
    status: raw.status,
    created_at: raw.created_at || '',
  };
}