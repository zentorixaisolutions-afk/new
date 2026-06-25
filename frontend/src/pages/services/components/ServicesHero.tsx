import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';
import Reveal from '@/components/feature/Reveal';

export default function ServicesHero() {
  const { t } = useTranslation();
  const [videoReady, setVideoReady] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current; if (!section) return;
    const observer = new IntersectionObserver((entries) => { entries.forEach((e) => setHeroVisible(e.isIntersecting)); }, { rootMargin: '100px 0px', threshold: 0.01 });
    observer.observe(section); return () => observer.disconnect();
  }, []);
  useEffect(() => { const video = videoRef.current; if (!video) return; if (heroVisible) { video.play().catch(() => {}); } else { video.pause(); } }, [heroVisible]);
  const handleCanPlay = useCallback(() => { setVideoReady(true); requestAnimationFrame(() => setVideoVisible(true)); }, []);

  return (
    <section ref={sectionRef} id="hero-section" className="relative min-h-[50svh] md:min-h-[60dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-30" />
        <video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover object-center saturate-[0.95] brightness-[0.95] transition-opacity duration-700 ease-out ${videoVisible ? 'opacity-100' : 'opacity-0'}`} autoPlay={heroVisible} loop muted playsInline preload="metadata" onCanPlay={handleCanPlay}>
          <source src="https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/8e52c30f-1424-4cfa-a326-4d271b6aeac0_services.mp4" type="video/mp4" />
        </video>
        {!videoReady && (<div className="absolute inset-0 z-[2] pointer-events-none animate-pulse" style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.5) 0%, rgba(15,31,61,0.5) 30%, rgba(18,37,74,0.5) 55%, rgba(10,51,96,0.5) 75%, rgba(26,63,110,0.5) 100%)', filter: 'blur(10px)', transform: 'scale(1.05)' }} />)}
      </div>
      <div className="absolute inset-0 z-[3] circuit-watermark pointer-events-none" />
      <div className="block md:hidden absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.60) 0%, rgba(10,22,40,0.50) 25%, rgba(10,22,40,0.35) 50%, rgba(10,22,40,0.15) 100%)' }} />
      <div className="hidden md:block lg:hidden absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.45) 30%, rgba(10,22,40,0.25) 60%, rgba(10,22,40,0.12) 100%)' }} />
      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.50) 0%, rgba(10,22,40,0.38) 30%, rgba(10,22,40,0.20) 60%, rgba(10,22,40,0.08) 100%)' }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.35) 0%, transparent 20%, transparent 65%, rgba(10,22,40,0.50) 100%)' }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-[min(100%,720px)] lg:max-w-[min(100%,760px)]">
          <Reveal><span className="inline-block text-xs sm:text-xs md:text-sm font-semibold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-accent-300 mb-3 sm:mb-4 md:mb-6">{t('services.hero.label')}</span></Reveal>
          <Reveal delay={0.1}><h1 className="text-[clamp(1.75rem,9vw,2.5rem)] sm:text-[clamp(2.25rem,8vw,2.875rem)] md:text-[clamp(2.5rem,6.5vw,3.25rem)] lg:text-[clamp(3.25rem,5vw,4.5rem)] xl:text-[clamp(3.75rem,4.5vw,5rem)] font-semibold text-white leading-[1.15] sm:leading-[1.09] md:leading-[1.08] lg:leading-[1.07] xl:leading-[1.06] mb-4 sm:mb-5 md:mb-6 text-balance tracking-tight">{t('services.hero.title')}</h1></Reveal>
          <Reveal delay={0.2}><p className="text-sm sm:text-sm md:text-base lg:text-lg text-foreground-200/75 max-w-xl leading-relaxed">{t('services.hero.subtitle')}</p></Reveal>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[50px] sm:h-[80px] md:h-[100px] pointer-events-none hero-bottom-fade" />
    </section>
  );
}