import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { UPLOADED_ICONS } from '@/mocks/home';

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const WHY_CHOOSE_US = [
    { step: '01', title: t('home.process.step1_title'), description: t('home.process.step1_desc'), iconImage: UPLOADED_ICONS.iconDiscover },
    { step: '02', title: t('home.process.step2_title'), description: t('home.process.step2_desc'), iconImage: UPLOADED_ICONS.iconDesign },
    { step: '03', title: t('home.process.step3_title'), description: t('home.process.step3_desc'), iconImage: UPLOADED_ICONS.iconBuild },
    { step: '04', title: t('home.process.step4_title'), description: t('home.process.step4_desc'), iconImage: UPLOADED_ICONS.iconDeliver },
  ];

  return (
    <section className="relative py-14 md:py-20 lg:py-28 overflow-hidden" id="our-process">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-10 lg:px-14">
        <Reveal staggerChildren={0.12} once>
          <div className="text-center mb-8 md:mb-14 lg:mb-18">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent-500 mb-2 sm:mb-3">{t('home.process.eyebrow')}</p>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.15]">{t('home.process.title')}</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed text-pretty">{t('home.process.subtitle')}</p>
          </div>
        </Reveal>
        <Reveal staggerChildren={0.1} once>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5">
            {WHY_CHOOSE_US.map((item, i) => (
              <div key={i} className="h-full">
                <div className="relative glass-card p-5 sm:p-6 lg:p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(0,220,255,0.38)] group">
                  {i < 3 && (
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center w-8 h-8 bg-[rgba(7,18,38,0.8)] border border-[rgba(0,200,255,0.14)] rounded-full backdrop-blur-sm">
                      <i className="ri-arrow-right-s-line text-cyan-400 text-lg" />
                    </div>
                  )}
                  <div className="flex flex-col gap-0">
                    <span className="text-3xl sm:text-6xl lg:text-8xl font-extrabold text-[rgba(0,200,255,0.08)] leading-none select-none pointer-events-none tracking-tight shrink-0">{item.step}</span>
                    <div className="flex-1 min-w-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem] flex items-center justify-center sm:mt-1 lg:mt-2 shrink-0 transition-all duration-500 group-hover:scale-110">
                        <img src={item.iconImage} alt={item.title} className="w-full h-full p-1 object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      </div>
                      <h3 className="mt-3 sm:mt-4 lg:mt-5 text-sm sm:text-lg lg:text-xl font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                      <p className="mt-1.5 sm:mt-2 lg:mt-3 text-sm sm:text-sm text-slate-400 leading-relaxed text-pretty">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}