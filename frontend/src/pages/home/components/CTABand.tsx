import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';

export default function CTABand() {
  const { t } = useTranslation();
  return (
    <section className="py-20 sm:py-24 lg:py-32 relative overflow-hidden" id="cta-band">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[200px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-[1.15] mb-4 text-balance">{t('home.cta.title')}</h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8 sm:mb-10 text-pretty">{t('home.cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-accent-500 text-white text-sm md:text-base font-semibold hover:bg-accent-600 transition-all duration-200 w-full sm:w-auto">
              {t('home.cta.start')}
              <i className="ri-arrow-right-line ml-2" />
            </Link>
            <Link to="/services" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[rgba(0,200,255,0.14)] text-white text-sm md:text-base font-medium hover:bg-[rgba(0,200,255,0.08)] hover:border-[rgba(0,220,255,0.38)] transition-all duration-200 w-full sm:w-auto">
              {t('home.cta.explore')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}