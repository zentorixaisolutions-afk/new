import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';
import Reveal from '@/components/feature/Reveal';

const VIDEO_DESKTOP_16_9 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/d3ca4901-2645-4e6f-81ac-07bf506e1139_about.mp4';
const VIDEO_TABLET_3_2 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/eeb0e7f1-58d7-44e1-b1a9-b0c6fcf50762_A3.2.mp4';
const VIDEO_TABLET_2_3 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/f2d31f91-adf1-44f7-8440-abb2c93c91eb_A2.3.mp4';
const VIDEO_TABLET_1_1 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/5da3b32b-a9f7-4afe-83b1-f5072f5e3e20_A1.1.mp4';
const VIDEO_MOBILE_9_16 = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/7c571f81-28e9-4413-84d3-e1de7629f67d_A9.16.mp4';

const POSTER_16_9 = 'https://readdy.ai/api/search-image?query=Dark%20moody%20abstract%20technology%20background%20with%20subtle%20blue%20neon%20glow%20and%20digital%20grid%20lines%2C%20cinematic%20atmospheric%20lighting%2C%20deep%20navy%20and%20teal%20color%20palette%2C%20minimalist%20modern%20aesthetic%2C%20no%20text%2C%20smooth%20gradients%2C%20professional%20corporate%20style&width=1920&height=1080&seq=about-poster-16x9&orientation=landscape';
const POSTER_3_2 = 'https://readdy.ai/api/search-image?query=Dark%20moody%20abstract%20technology%20background%20with%20subtle%20blue%20neon%20glow%20and%20digital%20grid%20lines%2C%20cinematic%20atmospheric%20lighting%2C%20deep%20navy%20and%20teal%20color%20palette%2C%20minimalist%20modern%20aesthetic%2C%20no%20text%2C%20smooth%20gradients%2C%20professional%20corporate%20style&width=1200&height=800&seq=about-poster-3x2&orientation=landscape';
const POSTER_2_3 = 'https://readdy.ai/api/search-image?query=Dark%20moody%20abstract%20technology%20background%20with%20subtle%20blue%20neon%20glow%20and%20digital%20grid%20lines%2C%20cinematic%20atmospheric%20lighting%2C%20deep%20navy%20and%20teal%20color%20palette%2C%20minimalist%20modern%20aesthetic%2C%20no%20text%2C%20smooth%20gradients%2C%20professional%20corporate%20style&width=800&height=1200&seq=about-poster-2x3&orientation=portrait';
const POSTER_1_1 = 'https://readdy.ai/api/search-image?query=Dark%20moody%20abstract%20technology%20background%20with%20subtle%20blue%20neon%20glow%20and%20digital%20grid%20lines%2C%20cinematic%20atmospheric%20lighting%2C%20deep%20navy%20and%20teal%20color%20palette%2C%20minimalist%20modern%20aesthetic%2C%20no%20text%2C%20smooth%20gradients%2C%20professional%20corporate%20style&width=900&height=900&seq=about-poster-1x1&orientation=squarish';
const POSTER_9_16 = 'https://readdy.ai/api/search-image?query=Dark%20moody%20abstract%20technology%20background%20with%20subtle%20blue%20neon%20glow%20and%20digital%20grid%20lines%2C%20cinematic%20atmospheric%20lighting%2C%20deep%20navy%20and%20teal%20color%20palette%2C%20minimalist%20modern%20aesthetic%2C%20no%20text%2C%20smooth%20gradients%2C%20professional%20corporate%20style&width=600&height=1067&seq=about-poster-9x16&orientation=portrait';

const VIDEOS = [
  { src: VIDEO_MOBILE_9_16, poster: POSTER_9_16, ratio: 9 / 16 },
  { src: VIDEO_TABLET_2_3, poster: POSTER_2_3, ratio: 2 / 3 },
  { src: VIDEO_TABLET_1_1, poster: POSTER_1_1, ratio: 1 },
  { src: VIDEO_TABLET_3_2, poster: POSTER_3_2, ratio: 3 / 2 },
  { src: VIDEO_DESKTOP_16_9, poster: POSTER_16_9, ratio: 16 / 9 },
];

function getVideo(): { src: string; poster: string } {
  if (typeof window === 'undefined') return { src: VIDEO_DESKTOP_16_9, poster: POSTER_16_9 };
  const w = window.innerWidth, h = window.innerHeight, currentRatio = w / h;
  let closest = VIDEOS[0], minDiff = Math.abs(currentRatio - closest.ratio);
  for (const video of VIDEOS) { const diff = Math.abs(currentRatio - video.ratio); if (diff < minDiff) { minDiff = diff; closest = video; } }
  return { src: closest.src, poster: closest.poster };
}

export default function AboutHero() {
  const { t } = useTranslation();
  const [videoSrc, setVideoSrc] = useState(VIDEO_DESKTOP_16_9);
  const [posterSrc, setPosterSrc] = useState(POSTER_16_9);
  const [videoReady, setVideoReady] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current; if (!section) return;
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { setHeroVisible(entry.isIntersecting); }); }, { rootMargin: '100px 0px', threshold: 0.01 });
    observer.observe(section); return () => observer.disconnect();
  }, []);
  useEffect(() => { const video = videoRef.current; if (!video) return; if (heroVisible) { video.play().catch(() => {}); } else { video.pause(); } }, [heroVisible]);
  useEffect(() => {
    const initial = getVideo(); setVideoSrc(initial.src); setPosterSrc(initial.poster); setVideoReady(false); setVideoVisible(false);
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { const next = getVideo(); setVideoSrc((prev) => { if (prev !== next.src) { setVideoReady(false); setVideoVisible(false); setPosterSrc(next.poster); return next.src; } return prev; }); }, 250); };
    window.addEventListener('resize', handleResize); window.addEventListener('orientationchange', handleResize);
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('orientationchange', handleResize); clearTimeout(resizeTimer); };
  }, []);
  const handleCanPlay = useCallback(() => { setVideoReady(true); requestAnimationFrame(() => { setVideoVisible(true); }); }, []);

  return (
    <section ref={sectionRef} id="hero-section" className="relative pt-24 sm:pt-32 md:pt-40 pb-14 sm:pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="absolute inset-0 z-[1] transition-opacity duration-500" style={{ backgroundImage: posterSrc ? `url(${posterSrc})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', opacity: videoVisible ? 0 : 1 }} />
        <video ref={videoRef} key={videoSrc} poster={posterSrc} className={`absolute inset-0 w-full h-full object-cover object-center lg:object-[62%_center] saturate-[0.95] brightness-[0.95] transition-opacity duration-700 ease-out ${videoVisible ? 'opacity-100' : 'opacity-0'}`} autoPlay={heroVisible} loop muted playsInline preload="metadata" onCanPlay={handleCanPlay}>
          <source src={videoSrc} type="video/mp4" />
        </video>
        {!videoReady && (<div className="absolute inset-0 z-[2] pointer-events-none animate-pulse" style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.5) 0%, rgba(15,31,61,0.5) 30%, rgba(18,37,74,0.5) 55%, rgba(10,51,96,0.5) 75%, rgba(26,63,110,0.5) 100%)', filter: 'blur(10px)', transform: 'scale(1.05)' }} />)}
      </div>
      <div className="absolute inset-0 z-[3] circuit-watermark pointer-events-none" />
      <div className="block md:hidden absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.60) 0%, rgba(10,22,40,0.50) 25%, rgba(10,22,40,0.35) 50%, rgba(10,22,40,0.15) 100%)' }} />
      <div className="hidden md:block lg:hidden absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.45) 30%, rgba(10,22,40,0.25) 60%, rgba(10,22,40,0.12) 100%)' }} />
      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.50) 0%, rgba(10,22,40,0.38) 30%, rgba(10,22,40,0.20) 60%, rgba(10,22,40,0.08) 100%)' }} />
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.35) 0%, transparent 20%, transparent 65%, rgba(10,22,40,0.50) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none h-[60px] sm:h-[120px] md:h-[180px] hero-bottom-fade" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <Reveal>
          <div className="max-w-[min(100%,720px)] lg:max-w-[min(100%,760px)]">
            <span className="text-xs sm:text-xs md:text-sm font-semibold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-accent-300 mb-3 sm:mb-4 md:mb-6 block">{t('about.hero.eyebrow')}</span>
            <h1 className="text-[clamp(1.75rem,9vw,2.5rem)] sm:text-[clamp(2.25rem,8vw,2.875rem)] md:text-[clamp(2.5rem,6.5vw,3.25rem)] lg:text-[clamp(3.25rem,5vw,4.5rem)] xl:text-[clamp(3.75rem,4.5vw,5rem)] font-semibold text-white leading-[1.15] sm:leading-[1.09] md:leading-[1.08] lg:leading-[1.07] xl:leading-[1.06] mb-4 sm:mb-5 md:mb-6 text-balance tracking-tight">{t('about.hero.title')}</h1>
            <p className="text-sm sm:text-sm md:text-base lg:text-lg text-foreground-200/80 leading-relaxed max-w-lg lg:max-w-xl">{t('about.hero.subtitle')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}