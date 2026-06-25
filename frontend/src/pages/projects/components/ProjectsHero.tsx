import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';
import Reveal from '@/components/feature/Reveal';

export default function ProjectsHero() {
  const { t } = useTranslation();
  const [videoReady, setVideoReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleCanPlay = useCallback(() => { setVideoReady(true); }, []);
  const toggleMute = useCallback(() => { if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setMuted(videoRef.current.muted); } }, []);

  return (
    <section id="hero-section" className="relative min-h-[50svh] md:min-h-[60dvh] flex items-center overflow-hidden noise-overlay">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover object-center lg:object-[62%_center] saturate-[0.9] brightness-[0.85]" autoPlay loop muted playsInline preload="auto" onCanPlay={handleCanPlay}>
        <source src="https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/7ca1a70e-61e6-49bf-a8b9-cf157258a24a_projects.mp4" type="video/mp4" />
      </video>
      <div className={`absolute inset-0 z-[1] transition-opacity duration-700 pointer-events-none ${videoReady ? 'opacity-0' : 'opacity-100'}`} style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.5) 0%, rgba(15,31,61,0.5) 30%, rgba(18,37,74,0.5) 55%, rgba(10,51,96,0.5) 75%, rgba(26,63,110,0.5) 100%)', filter: 'blur(20px)', transform: 'scale(1.05)' }} />
      <div className="block md:hidden absolute inset-0 z-[4] pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.60) 0%, rgba(10,22,40,0.50) 25%, rgba(10,22,40,0.35) 50%, rgba(10,22,40,0.15) 100%)' }} />
      <div className="hidden md:block lg:hidden absolute inset-0 z-[4] pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.45) 30%, rgba(10,22,40,0.25) 60%, rgba(10,22,40,0.12) 100%)' }} />
      <div className="hidden lg:block absolute inset-0 z-[4] pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.50) 0%, rgba(10,22,40,0.38) 30%, rgba(10,22,40,0.20) 60%, rgba(10,22,40,0.08) 100%)' }} />
      <div className="absolute inset-0 z-[4] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.35) 0%, transparent 20%, transparent 65%, rgba(10,22,40,0.50) 100%)' }} />
      <div className="absolute inset-0 z-[5] circuit-watermark pointer-events-none" />
      <button onClick={toggleMute} className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-md border ${muted ? 'bg-white/10 border-white/15 text-white/50 hover:bg-white/20 hover:text-white/80' : 'bg-white/90 border-white/40 text-navy hover:bg-white'}`} aria-label={muted ? t('home.hero.unmute') : t('home.hero.mute')}>
        {muted ? <i className="ri-volume-mute-line text-sm md:text-base" /> : <i className="ri-volume-up-line text-sm md:text-base" />}
      </button>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 pt-24 sm:pt-28 md:pt-36 pb-14 sm:pb-16 md:pb-20">
        <div className="max-w-[min(100%,720px)] lg:max-w-[min(100%,760px)]">
          <Reveal><span className="inline-block text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-accent-300 mb-3 sm:mb-4 md:mb-6">{t('projects.hero.label')}</span></Reveal>
          <Reveal delay={0.1}><h1 className="text-[clamp(2rem,10vw,2.625rem)] sm:text-[clamp(2.25rem,8vw,2.875rem)] md:text-[clamp(2.5rem,6.5vw,3.25rem)] lg:text-[clamp(3.25rem,5vw,4.5rem)] xl:text-[clamp(3.75rem,4.5vw,5rem)] font-semibold text-white leading-[1.1] sm:leading-[1.09] md:leading-[1.08] lg:leading-[1.07] xl:leading-[1.06] mb-4 sm:mb-5 md:mb-6 text-balance tracking-tight">{t('projects.hero.title')}</h1></Reveal>
          <Reveal delay={0.2}><p className="text-sm sm:text-sm md:text-base lg:text-lg text-foreground-200/80 max-w-xl leading-relaxed">{t('projects.hero.subtitle')}</p></Reveal>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[60px] sm:h-[80px] md:h-[100px] pointer-events-none hero-bottom-fade" />
    </section>
  );
}