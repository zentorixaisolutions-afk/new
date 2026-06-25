import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { ICON_FOCUS, ICON_STAR, ICON_CHECK, ICON_ZAP } from '@/mocks/icons';

const identityIcons = [ICON_FOCUS, ICON_STAR, ICON_CHECK, ICON_ZAP];

export default function WhoWeAre() {
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="who-we-are">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal y={48} duration={1.1}>
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.who.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.who.title')}</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
          <Reveal delay={0.1} duration={1.1} y={56}>
            <div className="space-y-4 sm:space-y-5">
              <Reveal delay={0.1} duration={0.9} y={36}>
                <p className="text-sm sm:text-base text-foreground-600 dark:text-slate-300 leading-relaxed">{t('about.who.p1')}</p>
              </Reveal>
              <Reveal delay={0.22} duration={0.9} y={36}>
                <p className="text-sm sm:text-base text-foreground-600 dark:text-slate-300 leading-relaxed">{t('about.who.p2')}</p>
              </Reveal>
            </div>
          </Reveal>
          <Reveal delay={0.3} duration={1.2} y={64}>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Abstract%20futuristic%20digital%20transformation%20visualization%20with%20interconnected%20glowing%20network%20nodes%2C%20flowing%20data%20streams%20in%20deep%20navy%20and%20electric%20blue%2C%20holographic%20technology%20landscape%2C%20clean%20minimalist%20tech%20aesthetic%2C%203D%20render%20with%20soft%20volumetric%20lighting%2C%20dark%20sophisticated%20background%2C%20professional%20corporate%20technology%20art%2C%20wide%20cinematic%20composition&width=800&height=550&seq=about-who-we-are-network&orientation=landscape"
                alt="Digital Transformation Network"
                className="w-full h-auto rounded-2xl object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background-900/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.35} staggerChildren={90} duration={1.1} y={48}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-5 sm:p-6 text-center group cursor-default">
                <img src={identityIcons[i]} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                <h3 className="font-semibold text-sm md:text-base text-foreground-950 dark:text-white mb-2">{t(`about.who.card${i + 1}_title`)}</h3>
                <p className="text-xs md:text-sm text-foreground-500 dark:text-slate-400 leading-relaxed">{t(`about.who.card${i + 1}_desc`)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}