import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';
import { ICON_CHECK, ICON_ARROW_RIGHT } from '@/mocks/icons';

interface ServiceDetail { id: string; icon: string; iconImage: string; number: string; title: string; heading: string; description: string; highlights: string[]; caseStudy: { title: string; metric: string; metricLabel: string; description: string; tags: string[]; image: string }; bgClass: string; }
interface ServiceDetailSectionProps { detail: ServiceDetail; index: number; }

export default function ServiceDetailSection({ detail, index }: ServiceDetailSectionProps) {
  const { t } = useTranslation();
  const isEven = index % 2 === 0;

  return (
    <section className={`py-14 sm:py-20 lg:py-28 ${detail.bgClass} overflow-hidden`} id={detail.id}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16">
        <Reveal>
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-14">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
              <img src={detail.iconImage} alt={detail.title} className="w-full h-full object-contain" loading="lazy" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-accent-500 tracking-[0.15em] uppercase">{t('services.service')} {detail.number}</span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-navy dark:text-white leading-[1.15] text-balance mt-1">{detail.heading}</h2>
            </div>
          </div>
        </Reveal>
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-10 lg:gap-14`}>
          <div className="flex-1 min-w-0">
            <Reveal delay={0.1}><p className="text-sm sm:text-base text-foreground-500 leading-relaxed mb-6 sm:mb-8">{detail.description}</p></Reveal>
            <Reveal staggerChildren={40}>
              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {detail.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 min-w-0">
                    <div className="w-5 h-5 rounded-full bg-accent-50 dark:bg-accent-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><img src={ICON_CHECK} alt="Check" className="w-3 h-3 object-contain" loading="lazy" /></div>
                    <span className="text-sm sm:text-base text-foreground-600 dark:text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="flex-1 min-w-0">
            <Reveal delay={0.2}>
              <div className="glass-card overflow-hidden">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img src={detail.caseStudy.image} alt={detail.caseStudy.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4"><span className="px-2.5 py-1 rounded-full bg-accent-500 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">{t('services.case_study')}</span></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-baseline gap-1 mb-1"><span className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-500 leading-none">{detail.caseStudy.metric}</span><span className="text-xs sm:text-sm text-foreground-400 font-medium">{detail.caseStudy.metricLabel}</span></div>
                  <h4 className="font-semibold text-sm sm:text-base text-navy dark:text-white mb-2 sm:mb-3">{detail.caseStudy.title}</h4>
                  <p className="text-xs sm:text-sm text-foreground-500 leading-relaxed mb-4">{detail.caseStudy.description}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {detail.caseStudy.tags.map((tag, i) => (<span key={i} className="px-2.5 py-1 rounded-full bg-background-100 dark:bg-slate-800 text-foreground-500 text-[10px] sm:text-xs font-medium whitespace-nowrap">{tag}</span>))}
                  </div>
                  <Link to="/projects" className="inline-flex items-center gap-1 text-xs font-medium text-accent-500 hover:text-accent-600 transition-colors mt-4">{t('services.view_project')}<img src={ICON_ARROW_RIGHT} alt="Arrow" className="w-3 h-3 object-contain" loading="lazy" /></Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}