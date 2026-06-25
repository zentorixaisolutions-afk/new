// ─── PHP API Client ─────────────────────────────────────────
// Detects API base URL from environment or defaults to same-origin /api

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

async function request<T = any>(
  endpoint: string,
  options: Record<string, any> = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;

  const config: Record<string, any> = {
    credentials: 'include', // Send cookies for PHP sessions
    headers: {
      'Accept': 'application/json',
    },
    ...options,
  };

  // Only set Content-Type for requests with a body
  if (options.body && !(options.body instanceof FormData)) {
    (config.headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, config);

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ success: false, message: `HTTP ${res.status}` }));
    return errorBody as ApiResponse<T>;
  }

  return res.json();
}

// ─── Auth ────────────────────────────────────────────────────

export async function phpSignIn(email: string, password: string) {
  return request<{ user: any }>('/auth/login.php', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function phpSignOut() {
  return request('/auth/logout.php', { method: 'POST' });
}

export async function phpCheckAuth() {
  return request<{ user: any }>('/auth/check.php');
}

// ─── Services ────────────────────────────────────────────────

export async function phpGetServices(publishedOnly = true) {
  const qs = publishedOnly ? '' : '?published=0';
  return request<any[]>('/services/list.php' + qs);
}

export async function phpGetService(idOrSlug: string) {
  const isNumeric = /^\d+$/.test(idOrSlug);
  const qs = isNumeric ? `?id=${idOrSlug}` : `?slug=${encodeURIComponent(idOrSlug)}`;
  return request<any>('/services/get.php' + qs);
}

export async function phpSaveService(input: Record<string, any>) {
  return request<any>('/services/save.php', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function phpDeleteService(id: string | number) {
  return request('/services/delete.php', {
    method: 'POST',
    body: JSON.stringify({ id: Number(id) }),
  });
}

// ─── Blog Posts ──────────────────────────────────────────────

export async function phpGetBlogPosts(publishedOnly = true) {
  const qs = publishedOnly ? '' : '?published=0';
  return request<any[]>('/blogs/list.php' + qs);
}

export async function phpGetBlogPost(idOrSlug: string) {
  const isNumeric = /^\d+$/.test(idOrSlug);
  const qs = isNumeric ? `?id=${idOrSlug}` : `?slug=${encodeURIComponent(idOrSlug)}`;
  return request<any>('/blogs/get.php' + qs);
}

export async function phpSaveBlogPost(input: Record<string, any>) {
  return request<any>('/blogs/save.php', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function phpDeleteBlogPost(id: string | number) {
  return request('/blogs/delete.php', {
    method: 'POST',
    body: JSON.stringify({ id: Number(id) }),
  });
}

// ─── Contact ─────────────────────────────────────────────────

export async function phpSubmitContact(input: Record<string, string>) {
  return request('/contacts/submit.php', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function phpGetContactSubmissions() {
  return request<any[]>('/contacts/list.php');
}

export async function phpUpdateContactStatus(id: string | number, status: string) {
  return request('/contacts/update-status.php', {
    method: 'POST',
    body: JSON.stringify({ id: Number(id), status }),
  });
}

export async function phpDeleteContact(id: string | number) {
  return request('/contacts/delete.php', {
    method: 'POST',
    body: JSON.stringify({ id: Number(id) }),
  });
}

// ─── Dashboard ───────────────────────────────────────────────

export async function phpGetDashboardStats() {
  return request<any>('/dashboard.php');
}

// ─── Upload ──────────────────────────────────────────────────

export async function phpUploadImage(file: File, folder: 'services' | 'blog' | 'gallery' = 'services') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const url = `${API_BASE}/upload.php`;

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ success: false, message: `HTTP ${res.status}` }));
    return errorBody;
  }

  return res.json();
}

// ─── Gallery ─────────────────────────────────────────────────

export async function phpGetGallery() {
  return request<any[]>('/gallery/list.php');
}

export async function phpSaveGalleryImage(input: Record<string, any>) {
  return request<any>('/gallery/save.php', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function phpDeleteGalleryImage(id: string | number) {
  return request('/gallery/delete.php', {
    method: 'POST',
    body: JSON.stringify({ id: Number(id) }),
  });
}