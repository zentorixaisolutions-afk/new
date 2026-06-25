import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Service } from '@/lib/types';

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

const SUPABASE_FETCH_TIMEOUT_MS = 8000;

function fetchWithTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase request timed out')), timeoutMs),
    ),
  ]);
}

export function useSupabaseServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchWithTimeout(
      supabase!
        .from('services')
        .select('*')
        .eq('published', true)
        .order('sort_order'),
      SUPABASE_FETCH_TIMEOUT_MS,
    )
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.warn('useSupabaseServices: falling back to mock data —', error.message);
          setServices([]);
        } else {
          setServices((data || []).map(mapService));
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('useSupabaseServices: falling back to mock data —', err?.message || err);
        setServices([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { services, loading, hasLiveData: services.length > 0 };
}