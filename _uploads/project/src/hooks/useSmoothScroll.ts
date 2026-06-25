import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useSmoothScroll() {
  const { hash, pathname } = useLocation();

  // Handle hash changes on same-page navigation
  useEffect(() => {
    if (!hash) return;

    const id = hash.replace('#', '');
    if (!id) return;

    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hash, pathname]);

  // Intercept click on anchor links for same-page smooth scroll
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const id = href.replace('#', '');
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Update URL hash without full navigation
      window.history.replaceState(null, '', href);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}