import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ParallaxHero from '@/components/feature/ParallaxHero';

const VIDEO_DESKTOP_16_9 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/c899c714-fc85-44b8-be6e-9c5daa10a265_home.mp4';
const VIDEO_TABLET_3_2 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/fb90a0e2-e280-44c1-b04b-07d5b23c00ad_3.2.mp4';
const VIDEO_TABLET_2_3 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/c6e78f9d-6139-432e-bb55-9e6c96c07beb_2.3.mp4';
const VIDEO_MOBILE_9_16 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/8dd271f6-a7a9-4a04-92a6-bec34d47449e_9.16.mp4';

function getVideoSrc(): string {
  if (typeof window === 'undefined') return VIDEO_DESKTOP_16_9;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isPortrait = h > w;
  if (w <= 640 && isPortrait) return VIDEO_MOBILE_9_16;
  if (w <= 640) return VIDEO_DESKTOP_16_9;
  if (w <= 1024 && isPortrait) return VIDEO_TABLET_2_3;
  if (w <= 1024) return VIDEO_TABLET_3_2;
  return VIDEO_DESKTOP_16_9;
}

export default function HeroSection() {
  const { t } = useTranslation();
  const [videoSrc, setVideoSrc] = useState(VIDEO_DESKTOP_16_9);
  const [videoReady, setVideoReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setVideoSrc(getVideoSrc());
    setVideoReady(false);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const next = getVideoSrc();
        setVideoSrc((prev) => { if (prev !== next) { setVideoReady(false); return next; } return prev; });
      }, 250);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('orientationchange', handleResize); clearTimeout(resizeTimer); };
  }, []);

  const handleCanPlay = useCallback(() => { setVideoReady(true); }, []);
  const toggleMute = useCallback(() => {
    if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setMuted(videoRef.current.muted); }
  }, []);

  return (
    <ParallaxHero className="min-h-[100svh] md:min-h-dvh md:max-h-[900px] 2xl:max-h-[1000px] flex items-center overflow-hidden" id="hero-section">
      <div className="parallax-bg absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#01040a] via-[#020814] to-[#01040a]" />
        <video ref={videoRef} key={videoSrc} className="absolute inset-0 w-full h-full object-cover object-center lg:object-[62%_center] saturate-[0.9] brightness-[0.7]" autoPlay loop muted playsInline preload="auto" onCanPlay={handleCanPlay}>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 z-[1] transition-opacity duration-700 pointer-events-none ${videoReady ? 'opacity-0' : 'opacity-100'}`} style={{ background: 'linear-gradient(180deg, #01040a 0%, #020814 30%, #030c18 55%, #020814 75%, #01040a 100%)', filter: 'blur(20px)', transform: 'scale(1.05)' }} />
      </div>
      <div className="absolute inset-0 z-[3] circuit-watermark pointer-events-none" />
      <div className="block md:hidden absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(1,4,10,0.97) 0%, rgba(1,4,10,0.9) 25%, rgba(1,4,10,0.7) 50%, rgba(1,4,10,0.45) 100%)' }} />
      <div className="hidden md:block lg:hidden absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(1,4,10,0.96) 0%, rgba(1,4,10,0.82) 30%, rgba(1,4,10,0.55) 60%, rgba(1,4,10,0.3) 100%)' }} />
      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(1,4,10,0.94) 0%, rgba(1,4,10,0.78) 30%, rgba(1,4,10,0.45) 60%, rgba(1,4,10,0.2) 100%)' }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(1,4,10,0.6) 0%, transparent 20%, transparent 65%, rgba(1,4,10,0.8) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none h-[80px] sm:h-[120px] md:h-[180px] hero-bottom-fade" />
      <button onClick={toggleMute} className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-md border ${muted ? 'bg-white/10 border-white/15 text-white/50 hover:bg-white/20 hover:text-white/80' : 'bg-white/90 border-white/40 text-navy hover:bg-white'}`} aria-label={muted ? t('home.hero.unmute') : t('home.hero.mute')}>
        {muted ? <i className="ri-volume-mute-line text-sm md:text-base" /> : <i className="ri-volume-up-line text-sm md:text-base" />}
      </button>
      <div className="parallax-content relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-[min(100%,720px)] lg:max-w-[min(100%,760px)]">
          <span className="inline-block text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-accent-300 mb-2 sm:mb-4 md:mb-6">{t('home.hero.eyebrow')}</span>
          <h1 className="text-[clamp(1.5rem,7vw,2.5rem)] sm:text-[clamp(2.25rem,8vw,2.875rem)] md:text-[clamp(2.5rem,6.5vw,3.25rem)] lg:text-[clamp(3.25rem,5vw,4.5rem)] xl:text-[clamp(3.75rem,4.5vw,5rem)] font-semibold text-white leading-[1.15] sm:leading-[1.09] md:leading-[1.08] lg:leading-[1.07] xl:leading-[1.06] mb-3 sm:mb-5 md:mb-6 text-balance tracking-tight break-words hyphens-none">{t('home.hero.title')}</h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300/80 max-w-xl lg:max-w-2xl leading-relaxed mb-5 sm:mb-7 md:mb-10">{t('home.hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
            <Link to="/contact" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 rounded-full bg-accent-500 text-white text-xs sm:text-sm md:text-base font-medium hover:bg-accent-600 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto min-h-[44px]">{t('home.hero.get_quote')}</Link>
            <Link to="/projects" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 rounded-full border border-white/25 text-white text-xs sm:text-sm md:text-base font-medium hover:bg-white/10 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto min-h-[44px]">{t('home.hero.view_work')}</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden sm:block">
        <i className="ri-arrow-down-line text-white/40 text-lg" />
      </div>
    </ParallaxHero>
  );
}