import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { COMPARISON_CATEGORIES } from '@/mocks/pricing';

function renderValue(value: boolean | string) {
  if (value === true) {
    return (
      <div className="w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center flex-shrink-0">
        <i className="ri-check-line text-accent-500 text-xs" />
      </div>
    );
  }
  if (value === false) {
    return <span className="text-foreground-300 text-base sm:text-lg leading-none">&mdash;</span>;
  }
  return <span className="text-[10px] sm:text-xs md:text-sm text-foreground-700 font-medium break-words">{value}</span>;
}

export default function FeatureComparison() {
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Team & Delivery': true,
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-white overflow-x-hidden" id="compare">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">
              {t('pricing.compare.full')}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground-900 leading-[1.15] mb-4 text-balance">
              {t('pricing.compare.heading')}
            </h2>
            <p className="text-sm sm:text-base text-foreground-500 leading-relaxed max-w-xl mx-auto text-balance">
              {t('pricing.compare.desc')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          {/* Scrollable wrapper for mobile */}
          <div className="glass-card overflow-hidden overflow-x-auto -mx-5 sm:mx-0 p-0">
            <div className="min-w-[560px] sm:min-w-0">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_repeat(3,minmax(100px,1fr))] border-b border-background-200">
                <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4" />
                {[t('pricing.plan.0.name'), t('pricing.plan.1.name'), t('pricing.plan.2.name')].map((plan, pi) => (
                  <div
                    key={plan}
                    className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center ${
                      pi === 1 ? 'bg-accent-50/50' : ''
                    }`}
                  >
                    <span className={`text-[11px] sm:text-sm font-semibold whitespace-nowrap ${
                      pi === 1 ? 'text-accent-600' : 'text-foreground-700'
                    }`}>
                      {plan}
                    </span>
                  </div>
                ))}
              </div>

              {/* Category groups */}
              {COMPARISON_CATEGORIES.map((group) => (
                <div key={group.category}>
                  <button
                    type="button"
                    onClick={() => toggleCategory(group.category)}
                    className="w-full grid grid-cols-[1fr_repeat(3,minmax(100px,1fr))] border-b border-background-200/70 cursor-pointer hover:bg-[rgba(0,200,255,0.05)] transition-colors duration-150"
                  >
                    <div className="px-3 sm:px-4 md:px-6 py-3 flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-foreground-600 whitespace-nowrap">
                        {group.category}
                      </span>
                      <div className={`w-4 h-4 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${expandedCategories[group.category] ? 'rotate-180' : ''}`}>
                        <i className="ri-arrow-down-s-line text-foreground-500 text-xs" />
                      </div>
                    </div>
                    <div />
                    <div />
                    <div />
                  </button>

                  {expandedCategories[group.category] && group.features.map((feature, fi) => (
                    <div
                      key={feature.name}
                      className={`grid grid-cols-[1fr_repeat(3,minmax(100px,1fr))] border-b border-background-100 transition-colors duration-150 ${
                        fi % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(0,200,255,0.04)]'
                      }`}
                    >
                      <div className="px-3 sm:px-4 md:px-6 py-3 flex items-center">
                        <span className="text-[10px] sm:text-xs md:text-sm text-foreground-700 leading-tight">{feature.name}</span>
                      </div>
                      <div className="px-3 sm:px-4 md:px-6 py-3 flex items-center justify-center text-center">
                        {renderValue(feature.starter)}
                      </div>
                      <div className="px-3 sm:px-4 md:px-6 py-3 flex items-center justify-center text-center bg-accent-50/30">
                        {renderValue(feature.professional)}
                      </div>
                      <div className="px-3 sm:px-4 md:px-6 py-3 flex items-center justify-center text-center">
                        {renderValue(feature.enterprise)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Footnote */}
        <Reveal delay={0.1}>
          <p className="text-xs text-foreground-400 text-center mt-6">
            {t('pricing.compare.footnote')}
            {' '}
            <a href="/contact" className="text-accent-500 hover:text-accent-600 underline underline-offset-2 whitespace-nowrap">
              {t('pricing.compare.contact')}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}