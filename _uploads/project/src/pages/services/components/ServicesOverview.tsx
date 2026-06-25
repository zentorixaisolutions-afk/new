import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { SERVICES_OVERVIEW } from '@/mocks/services';
import { ICON_ARROW_RIGHT } from '@/mocks/icons';

export default function ServicesOverview() {
  const { t } = useTranslation();
  const items = SERVICES_OVERVIEW.map((svc, i) => ({
    ...svc,
    title: t(`services.overview.${i}.title`),
    description: t(`services.overview.${i}.desc`),
  }));
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-50 overflow-x-hidden" id="services-overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal>
          <div className="text-center mb-8 sm:mb-14 md:mb-18">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('services.overview.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-navy dark:text-white leading-[1.15] mb-3 sm:mb-4 text-balance">{t('services.overview.title')}</h2>
            <p className="text-sm sm:text-base text-foreground-500 max-w-xl mx-auto leading-relaxed text-pretty">{t('services.overview.subtitle')}</p>
          </div>
        </Reveal>
        <Reveal staggerChildren={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {items.map((service, i) => (
              <a key={i} href={service.link} className="group glass-card p-4 sm:p-5 md:p-6 min-w-0 cursor-pointer block">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <img src={service.iconImage} alt={service.title} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-navy dark:text-white mb-2 group-hover:text-accent-600 transition-colors duration-200">{service.title}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">{service.description}</p>
                <div className="mt-4 flex items-center gap-1 text-accent-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>{t('services.overview.learn_more')}</span>
                  <img src={ICON_ARROW_RIGHT} alt="Arrow" className="w-3 h-3 object-contain" loading="lazy" />
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}