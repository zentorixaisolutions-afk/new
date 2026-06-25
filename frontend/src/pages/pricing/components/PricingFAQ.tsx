import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';

export default function PricingFAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const FAQS = [
    { q: t('pricing.faq.q0'), a: t('pricing.faq.a0') },
    { q: t('pricing.faq.q1'), a: t('pricing.faq.a1') },
    { q: t('pricing.faq.q2'), a: t('pricing.faq.a2') },
    { q: t('pricing.faq.q3'), a: t('pricing.faq.a3') },
    { q: t('pricing.faq.q4'), a: t('pricing.faq.a4') },
    { q: t('pricing.faq.q5'), a: t('pricing.faq.a5') },
    { q: t('pricing.faq.q6'), a: t('pricing.faq.a6') },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-gradient-section-soft overflow-x-hidden" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground-900 leading-[1.15] mb-4 text-balance">
              {t('pricing.faq.heading')}
            </h2>
            <p className="text-sm sm:text-base text-foreground-500 leading-relaxed text-balance">
              {t('pricing.faq.subtitle')}{' '}
              <a href="/contact" className="text-accent-500 hover:text-accent-600 underline underline-offset-2 whitespace-nowrap">
                {t('pricing.faq.reach_out')}
              </a>
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.04}>
              <div className="glass-card overflow-hidden transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 cursor-pointer text-left hover:bg-[rgba(0,200,255,0.05)] transition-colors duration-150"
                >
                  <span className="text-sm sm:text-base font-medium text-foreground-800 pr-4">
                    {item.q}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full bg-background-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                  >
                    <i className="ri-arrow-down-s-line text-foreground-500 text-sm" />
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                    <p className="text-sm text-foreground-500 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}