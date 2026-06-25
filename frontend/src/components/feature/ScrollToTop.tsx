import { useState, useEffect, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useScrollPosition';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'instant' : 'smooth' });
  }, [prefersReduced]);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-40 w-[44px] h-[44px] md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-md border border-background-200/70 shadow-lg hover:shadow-xl hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{
        bottom: `calc(1.5rem + env(safe-area-inset-bottom))`,
        left: `calc(1.5rem + env(safe-area-inset-left))`,
      }}
      aria-label="Scroll to top"
    >
      <i className="ri-arrow-up-line text-lg md:text-xl text-navy" />
    </button>
  );
}