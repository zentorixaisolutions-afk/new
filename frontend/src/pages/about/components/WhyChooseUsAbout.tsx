import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { ICON_AWARD, ICON_CHART, ICON_GLOBE, ICON_LAYERS } from '@/mocks/icons';

const featureIcons = [ICON_AWARD, ICON_CHART, ICON_GLOBE, ICON_LAYERS];

export default function WhyChooseUsAbout() {
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 md:mb-16">
          <Reveal delay={0} duration={1.1} y={56}>
            <div>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.why_us.eyebrow')}</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.why_us.title')}</h2>
              <p className="text-foreground-500 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">{t('about.why_us.subtitle')}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2} duration={1.2} y={64}>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Abstract%20technology%20partnership%20visualization%20with%20two%20glowing%20network%20spheres%20connecting%20through%20luminous%20data%20bridges%2C%20deep%20navy%20and%20electric%20blue%20gradient%2C%20floating%20digital%20particles%2C%20clean%20modern%203D%20composition%2C%20soft%20volumetric%20light%20rays%2C%20professional%20corporate%20tech%20atmosphere%2C%20cinematic%20wide%20shot%2C%20harmonious%20balanced%20composition&width=800&height=500&seq=about-why-choose-us-v2&orientation=landscape"
                alt="Why Choose Samarat Infinity Network Solutions"
                className="w-full h-auto rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} staggerChildren={90} duration={1.1} y={48}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[0, 1, 2, 3].map((i) => {
              const keys = ['certified', 'proven', 'global', 'fullstack'];
              return (
                <div key={i} className="glass-card p-5 sm:p-6 md:p-7 text-center group cursor-default">
                  <img src={featureIcons[i]} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                  <h3 className="font-semibold text-sm md:text-base text-foreground-950 dark:text-white mb-2">{t(`about.why_us.${keys[i]}.title`)}</h3>
                  <p className="text-xs md:text-sm text-foreground-500 dark:text-slate-400 leading-relaxed">{t(`about.why_us.${keys[i]}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}