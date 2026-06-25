import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { PRICING_PLANS, ANNUAL_DISCOUNT_PCT } from '@/mocks/pricing';

export default function PricingPlans() {
  const { t } = useTranslation();
  const [annual, setAnnual] = useState(false);

  const plans = PRICING_PLANS.map((plan, i) => ({
    ...plan,
    name: t(`pricing.plan.${i}.name`),
    description: t(`pricing.plan.${i}.desc`),
    highlight: t(`pricing.plan.${i}.highlight`),
    features: plan.features.map((_, fi) => t(`pricing.plan.${i}.f${fi}`)),
  }));

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-50 overflow-x-hidden" id="plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        {/* Toggle */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${!annual ? 'text-foreground-900' : 'text-foreground-400'}`}>
              {t('pricing.monthly')}
            </span>
            <button
              type="button"
              onClick={() => setAnnual((v) => !v)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer flex items-center px-0.5 ${
                annual ? 'bg-accent-500' : 'bg-background-300'
              }`}
              aria-label={`Switch to ${annual ? 'monthly' : 'annual'} billing`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${annual ? 'text-foreground-900' : 'text-foreground-400'}`}>
              {t('pricing.annual')}
            </span>
            <span className="text-xs font-semibold text-accent-500 bg-accent-50 px-2 py-0.5 rounded-full whitespace-nowrap">
              {t('pricing.save')} {ANNUAL_DISCOUNT_PCT}%
            </span>
          </div>
        </Reveal>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {plans.map((plan, idx) => (
            <Reveal key={plan.id} delay={idx * 0.08}>
              <div
                className={`relative glass-card p-5 sm:p-8 flex flex-col h-full ${
                  plan.popular
                    ? 'border-accent-400 ring-1 ring-accent-400/30'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-semibold bg-accent-500 text-white px-4 py-1 rounded-full whitespace-nowrap">
                      {t('pricing.most_popular')}
                    </span>
                  </div>
                )}

                <div className="mb-5 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground-900 mb-1.5">{plan.name}</h3>
                  <p className="text-sm text-foreground-500 leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-5 sm:mb-6">
                  {plan.id === 'enterprise' ? (
                    <div className="text-2xl sm:text-3xl font-bold text-foreground-900 tracking-tight">
                      {t('pricing.custom')}
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-foreground-400">{plan.currency}</span>
                      <span className="text-2xl sm:text-3xl font-bold text-foreground-900 tracking-tight">
                        {annual
                          ? (plan.annualPrice! / 12).toLocaleString()
                          : plan.monthlyPrice!.toLocaleString()}
                      </span>
                      <span className="text-sm text-foreground-400">{plan.period}</span>
                    </div>
                  )}
                  {plan.id !== 'enterprise' && annual && (
                    <p className="text-xs text-foreground-400 mt-1">
                      {plan.currency}{plan.annualPrice!.toLocaleString()} {t('pricing.billed_annually')}
                    </p>
                  )}
                  {plan.id === 'enterprise' && (
                    <p className="text-xs text-foreground-400 mt-1">
                      {t('pricing.tailored')}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={plan.id === 'enterprise' ? '/contact' : '/contact'}
                  className={`whitespace-nowrap cursor-pointer inline-flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.98] mb-6 sm:mb-7 min-h-[44px] ${
                    plan.popular
                      ? 'bg-accent-500 text-white hover:bg-accent-600'
                      : 'bg-background-100 text-foreground-800 hover:bg-background-200'
                  }`}
                >
                  {plan.ctaLabel || t('pricing.get_started')}
                  <i className="ri-arrow-right-line ml-2 text-base" />
                </a>

                {/* Features */}
                <div className="space-y-3 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground-400">
                    {t('pricing.whats_included')}
                  </p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center flex-shrink-0 mt-px">
                        <i className="ri-check-line text-accent-500 text-xs" />
                      </div>
                      <span className="text-sm text-foreground-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom highlight */}
                <p className="text-xs text-foreground-400 italic mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-background-100">
                  {plan.highlight}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}