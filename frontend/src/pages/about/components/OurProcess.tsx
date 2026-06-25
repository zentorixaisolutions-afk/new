import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { ICON_SEARCH_GLASS, ICON_PALETTE, ICON_WRENCH, ICON_ROCKET } from '@/mocks/icons';

const stepIcons = [ICON_SEARCH_GLASS, ICON_PALETTE, ICON_WRENCH, ICON_ROCKET];

export default function OurProcess() {
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal y={48} duration={1.1}>
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.process.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.process.title')}</h2>
            <p className="text-foreground-500 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">{t('about.process.subtitle')}</p>
          </div>
        </Reveal>

        <div className="relative">
          <div className="hidden lg:block absolute top-[32px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-accent-300/50 via-accent-500 to-accent-300/50" />

          <Reveal delay={0.15} staggerChildren={120} duration={1.1} y={48}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative group text-center">
                  <div className="relative z-10 inline-block mb-4 sm:mb-5 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {/* Pulsing glow ring behind badge — staggered wave */}
                    <span
                      className="absolute -top-[10px] -right-[10px] w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent-500/20 z-10 pointer-events-none"
                      style={{
                        animation: 'processPulse 2.8s ease-in-out infinite',
                        animationDelay: `${i * 0.7}s`,
                      }}
                    />
                    <span className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs font-bold shadow-sm z-20">{i + 1}</span>
                    <img src={stepIcons[i]} alt="" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" loading="lazy" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-foreground-950 dark:text-white mb-2 sm:mb-3">{t(`about.process.step${i + 1}_title`)}</h3>
                  <p className="text-xs sm:text-sm text-foreground-500 dark:text-slate-400 leading-relaxed">{t(`about.process.step${i + 1}_desc`)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes processPulse {
          0%, 100% { transform: scale(0.8); opacity: 0.35; }
          50% { transform: scale(1.2); opacity: 0.08; }
        }
      `}</style>
    </section>
  );
}