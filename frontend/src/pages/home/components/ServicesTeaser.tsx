import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSupabaseServices } from '@/hooks/useSupabaseData';
import { UPLOADED_ICONS } from '@/mocks/home';

const SERVICE_TRANSLATION_KEYS = [
  { titleKey: 'service.cabling', descKey: 'service.cabling.desc', iconImage: UPLOADED_ICONS.serverCabling },
  { titleKey: 'service.network', descKey: 'service.network.desc', iconImage: UPLOADED_ICONS.routerFirewall },
  { titleKey: 'service.cloud_pbx', descKey: 'service.cloud_pbx.desc', iconImage: UPLOADED_ICONS.cloudPbx },
  { titleKey: 'service.access_control', descKey: 'service.access_control.desc', iconImage: UPLOADED_ICONS.accessControl },
  { titleKey: 'service.cctv', descKey: 'service.cctv.desc', iconImage: UPLOADED_ICONS.cctv },
  { titleKey: 'service.pos', descKey: 'service.pos.desc', iconImage: UPLOADED_ICONS.posBilling },
  { titleKey: 'service.web_dev', descKey: 'service.web_dev.desc', iconImage: UPLOADED_ICONS.webDevSupport },
];

function getIconForTitle(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('cabling') || lower.includes('server')) return UPLOADED_ICONS.serverCabling;
  if (lower.includes('router') || lower.includes('switch') || lower.includes('vpn') || lower.includes('firewall')) return UPLOADED_ICONS.routerFirewall;
  if (lower.includes('cloud') || lower.includes('pbx') || lower.includes('phone')) return UPLOADED_ICONS.cloudPbx;
  if (lower.includes('access') || lower.includes('attendance') || lower.includes('entrance')) return UPLOADED_ICONS.accessControl;
  if (lower.includes('cctv') || lower.includes('anti-theft') || lower.includes('eas') || lower.includes('surveillance')) return UPLOADED_ICONS.cctv;
  if (lower.includes('pos') || lower.includes('accounting') || lower.includes('billing')) return UPLOADED_ICONS.posBilling;
  if (lower.includes('web') || lower.includes('development') || lower.includes('support')) return UPLOADED_ICONS.webDevSupport;
  return UPLOADED_ICONS.serverCabling;
}

export default function ServicesTeaser() {
  const { t } = useTranslation();
  const { services, hasLiveData } = useSupabaseServices();

  const displayCards = hasLiveData
    ? services.slice(0, 7).map((s) => ({
        iconImage: s.image_url || getIconForTitle(s.title),
        title: s.title,
        description: s.description || '',
        link: `/services#${s.slug}`,
      }))
    : SERVICE_TRANSLATION_KEYS.slice(0, 7).map((k) => ({
        iconImage: k.iconImage,
        title: t(k.titleKey),
        description: t(k.descKey),
        link: '/services',
      }));

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-x-hidden relative" id="services-teaser">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16 relative z-10">
        <Reveal>
          <div className="text-center mb-10 md:mb-14 lg:mb-20">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('home.services.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-[1.15] mb-4 text-balance">{t('home.services.title')}</h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed text-pretty">{t('home.services.subtitle')}</p>
          </div>
        </Reveal>
        <Reveal staggerChildren={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayCards.map((service, i) => (
              <Link key={i} to={service.link} className="group glass-card p-5 sm:p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col min-w-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none" />
                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem] flex items-center justify-center mb-4 sm:mb-6 flex-shrink-0 transition-all duration-500 group-hover:scale-110">
                  <img src={service.iconImage} alt={service.title} className="w-full h-full p-1 object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm md:text-base text-white mb-2 sm:mb-3 leading-snug group-hover:text-cyan-300 transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm md:text-sm text-slate-400 leading-relaxed flex-1 mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-500 mt-auto group-hover:gap-2 transition-all duration-300 whitespace-nowrap group-hover:text-cyan-300">
                    {t('home.services.learn_more')}
                    <i className="ri-arrow-right-line ml-1 text-xs" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="text-center mt-8 md:mt-12">
            <Link to="/services" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-full border border-[rgba(0,200,255,0.14)] text-white text-sm font-medium hover:border-[rgba(0,220,255,0.38)] hover:text-cyan-300 transition-all duration-200 w-full sm:w-auto min-h-[44px]">
              {t('home.services.view_all')}
              <i className="ri-arrow-right-line ml-2" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}