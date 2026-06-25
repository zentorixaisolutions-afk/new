import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { ICON_CODE, ICON_BOT, ICON_CPU, ICON_SEARCH_GLASS, ICON_BUILDING, ICON_LIGHTBULB, ICON_MEGAPHONE, ICON_LAYERS, ICON_SHIELD, ICON_SCREEN } from '@/mocks/icons';

const serviceIcons = [ICON_SCREEN, ICON_CODE, ICON_BOT, ICON_CPU, ICON_SEARCH_GLASS, ICON_BUILDING, ICON_LIGHTBULB, ICON_MEGAPHONE, ICON_LAYERS, ICON_SHIELD];

export default function WhatWeDo() {
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="what-we-do">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal y={48} duration={1.1}>
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.what_we_do.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.what_we_do.title')}</h2>
            <p className="text-foreground-500 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">{t('about.what_we_do.subtitle')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} staggerChildren={70} duration={1.1} y={48}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="group glass-card p-5 sm:p-6 cursor-default"
              >
                <img src={serviceIcons[i]} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-4 group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                <h3 className="font-semibold text-sm md:text-base text-foreground-950 dark:text-white mb-2 leading-tight">{t(`about.what_we_do.${i}.title`)}</h3>
                <p className="text-xs md:text-sm text-foreground-500 dark:text-slate-400 leading-relaxed">{t(`about.what_we_do.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}