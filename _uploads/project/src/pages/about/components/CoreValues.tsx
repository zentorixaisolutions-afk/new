import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { ICON_FOCUS, ICON_HANDSHAKE, ICON_LIGHTBULB, ICON_EYE, ICON_GLOBE, ICON_HEART_PULSE } from '@/mocks/icons';

const valueIcons = [ICON_FOCUS, ICON_HANDSHAKE, ICON_LIGHTBULB, ICON_EYE, ICON_GLOBE, ICON_HEART_PULSE];

export default function CoreValues() {
  const { t } = useTranslation();
  const keys = ['quality', 'partnership', 'innovation', 'transparency', 'inclusive', 'longterm'];

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="values">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal y={48} duration={1.1}>
          <div className="text-center mb-10 md:mb-16 lg:mb-20">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.values.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.values.title')}</h2>
            <p className="text-foreground-500 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">{t('about.values.subtitle')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} staggerChildren={80} duration={1.1} y={48}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {keys.map((key, i) => (
              <div key={i} className="group glass-card p-5 sm:p-6 md:p-7 cursor-default">
                <img src={valueIcons[i]} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-4 group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                <h3 className="font-semibold text-sm sm:text-base text-foreground-950 dark:text-white mb-2">{t(`about.values.${key}.title`)}</h3>
                <p className="text-xs sm:text-sm text-foreground-500 dark:text-slate-400 leading-relaxed">{t(`about.values.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}