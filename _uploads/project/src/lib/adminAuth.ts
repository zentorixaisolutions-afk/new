// ─── Admin Auth (Edge Function based) ────────────────────────
// Uses admin-login and admin-check Supabase Edge Functions
// Session token stored in sessionStorage

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || '';

const SESSION_KEY = 'sins_admin_session';

interface AdminUser {
  id: number;
  username: string;
  display_name: string;
}

interface AdminSession {
  token: string;
  user: AdminUser;
}

function getStoredSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredSession(session: AdminSession | null): void {
  if (session) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

export async function adminSignIn(username: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${SUPABASE_URL}functions/v1/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success && data.data) {
      setStoredSession({ token: data.data.token, user: data.data.user });
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: data.message || 'Invalid credentials' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error' };
  }
}

export async function adminSignOut(): Promise<void> {
  const session = getStoredSession();
  if (session?.token) {
    try {
      await fetch(`${SUPABASE_URL}functions/v1/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ action: 'logout', token: session.token }),
      });
    } catch { /* best effort */ }
  }
  setStoredSession(null);
}

export async function adminCheckAuth(): Promise<AdminUser | null> {
  const session = getStoredSession();
  if (!session?.token) return null;

  try {
    const res = await fetch(`${SUPABASE_URL}functions/v1/admin-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ token: session.token }),
    });

    const data = await res.json();

    if (data.success && data.data?.user) {
      // Refresh stored user info
      setStoredSession({ token: session.token, user: data.data.user });
      return data.data.user;
    }

    // Session expired
    setStoredSession(null);
    return null;
  } catch {
    // Network error - keep session if we have one
    return session.user;
  }
}

export function getAdminToken(): string | null {
  return getStoredSession()?.token ?? null;
}