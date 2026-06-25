import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';

export default function BlogHero() {
  const { t } = useTranslation();

  return (
    <section
      id="blog-hero"
      className="relative pt-28 sm:pt-32 md:pt-40 pb-14 sm:pb-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.45) 0%, rgba(15,31,61,0.45) 40%, rgba(10,41,82,0.45) 70%, rgba(7,18,32,0.45) 100%)' }}
    >
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 z-[1] circuit-watermark pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] h-20 sm:h-28 pointer-events-none hero-bottom-fade" />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-500/10 blur-[120px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/15 border border-accent-500/30 text-accent-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-5">
            <i className="ri-article-line" />
            {t('blog.hero.label')}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="text-[clamp(1.75rem,7vw,3.25rem)] lg:text-[clamp(3rem,5vw,4rem)] font-bold text-white leading-[1.12] mb-5 text-balance tracking-tight">
            {t('blog.hero.title')}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-sm sm:text-base md:text-lg text-slate-300/85 max-w-2xl mx-auto leading-relaxed text-balance">
            {t('blog.hero.subtitle')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}