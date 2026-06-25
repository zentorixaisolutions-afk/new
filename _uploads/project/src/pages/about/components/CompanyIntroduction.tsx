import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { ICON_SCREEN, ICON_STAR, ICON_ROCKET, ICON_GLOBE } from '@/mocks/icons';

const statIcons = [ICON_SCREEN, ICON_STAR, ICON_ROCKET, ICON_GLOBE];
const stats = [
  { valueKey: 'about.intro.stat1_value', labelKey: 'about.intro.stat1_label' },
  { valueKey: 'about.intro.stat2_value', labelKey: 'about.intro.stat2_label' },
  { valueKey: 'about.intro.stat3_value', labelKey: 'about.intro.stat3_label' },
  { valueKey: 'about.intro.stat4_value', labelKey: 'about.intro.stat4_label' },
];

export default function CompanyIntroduction() {
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden" id="introduction">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal y={48} duration={1.1}>
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.intro.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.intro.title')}</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <Reveal className="lg:col-span-3" delay={0.1} duration={1.1} y={56}>
            <div className="space-y-4 sm:space-y-5">
              <Reveal delay={0.1} duration={0.9} y={40}>
                <p className="text-sm sm:text-base text-foreground-600 dark:text-slate-300 leading-relaxed">{t('about.intro.p1')}</p>
              </Reveal>
              <Reveal delay={0.2} duration={0.9} y={40}>
                <p className="text-sm sm:text-base text-foreground-600 dark:text-slate-300 leading-relaxed">{t('about.intro.p2')}</p>
              </Reveal>
              <Reveal delay={0.3} duration={0.9} y={40}>
                <p className="text-sm sm:text-base text-foreground-600 dark:text-slate-300 leading-relaxed">{t('about.intro.p3')}</p>
              </Reveal>
            </div>
          </Reveal>

          <Reveal delay={0.3} duration={1.2} y={64} className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Abstract%20futuristic%20technology%20visualization%20with%20glowing%20blue%20circuit%20board%20patterns%2C%20holographic%20data%20nodes%20floating%20in%20dark%20space%2C%20electric%20blue%20and%20deep%20navy%20color%20palette%2C%203D%20isometric%20render%20style%2C%20clean%20minimal%20tech%20aesthetic%20with%20soft%20volumetric%20glow%2C%20professional%20corporate%20technology%20artwork%2C%20cinematic%20depth%20of%20field%2C%20no%20text&width=800&height=1000&seq=about-company-intro-v2&orientation=portrait"
                alt="Samarat Infinity Network Solutions Innovation"
                className="w-full h-auto rounded-2xl object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background-50/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4} staggerChildren={80} duration={1.1} y={48}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 md:mt-16">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-4 sm:p-6 border border-background-200/40 dark:border-[rgba(0,200,255,0.12)] text-center hover:border-accent-200 dark:hover:border-[rgba(0,200,255,0.3)] transition-all duration-300 group">
                <img src={statIcons[i]} alt="" className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-500 mb-1">{t(stat.valueKey)}</div>
                <div className="text-xs sm:text-sm text-foreground-500 dark:text-slate-400 leading-tight">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}