import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AboutTeaser() {
  const { t } = useTranslation();
  const SQUARE_VIDEO_URL = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/b250e1a5-1348-45d7-991e-7863cf30108b_openart-94cd20faf5e2acec4ebcd021a4f0cc97-8189d78c-4de0-4ddb-ad0b-232ec955fcaa_1781368571842_470a7a21.mp4';

  const stats = [
    { value: '27+', label: t('home.stats.years') },
    { value: '500+', label: t('home.stats.clients') },
    { value: '1000+', label: t('home.stats.projects') },
    { value: '8', label: t('home.stats.services') },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-x-hidden relative" id="about-teaser">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
          <Reveal>
            <div>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('home.about.eyebrow')}</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-[1.15] mb-5 text-balance">{t('home.about.title')}</h2>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-4">{t('home.about.p1')}</p>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-3">{t('home.about.p2')}</p>
              <p className="text-sm md:text-base text-slate-300 font-medium mb-6">{t('home.about.p3')}</p>
              <Link to="/about" className="whitespace-nowrap cursor-pointer inline-flex items-center text-sm font-medium text-accent-500 hover:text-cyan-300 transition-colors">
                {t('home.about.learn_more')}
                <i className="ri-arrow-right-line ml-1.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-4">
              {/* Glassmorphism stats cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="glass-card p-4 sm:p-5 text-center hover:border-[rgba(0,220,255,0.38)] transition-all duration-400">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl group">
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline preload="metadata">
                  <source src={SQUARE_VIDEO_URL} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}