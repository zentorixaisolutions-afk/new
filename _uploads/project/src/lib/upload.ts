const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || '';

export async function uploadImage(
  file: File,
  folder: 'services' | 'blog' = 'services',
): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch(`${SUPABASE_URL}functions/v1/upload-file`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
      },
      body: formData,
    });

    const result = await res.json();

    if (!result.success) {
      console.error('uploadImage error:', result.message);
      return null;
    }

    return result.url;
  } catch (err) {
    console.error('uploadImage error:', err);
    return null;
  }
}