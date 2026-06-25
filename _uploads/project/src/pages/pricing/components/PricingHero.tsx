import Reveal from '@/components/feature/Reveal';

interface PricingHeroProps {
  label: string;
  title: string;
  subtitle: string;
}

export default function PricingHero({ label, title, subtitle }: PricingHeroProps) {
  return (
    <section id="hero-section" className="gradient-hero noise-overlay relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-hidden" style={{ opacity: 0.65 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/5" />

      {/* Circuit watermark — subtle animated pattern overlay */}
      <div className="absolute inset-0 z-[3] circuit-watermark pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 text-center w-full">
        <Reveal>
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-300 mb-4 block">
            {label}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-[clamp(2rem,10vw,2.625rem)] sm:text-[clamp(2.25rem,8vw,2.875rem)] md:text-[clamp(2.5rem,6.5vw,3.25rem)] lg:text-[clamp(3.25rem,5vw,4.5rem)] xl:text-[clamp(3.75rem,4.5vw,5rem)] font-semibold text-white leading-[1.1] sm:leading-[1.09] md:leading-[1.08] lg:leading-[1.07] xl:leading-[1.06] mb-5 tracking-tight text-balance">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-sm sm:text-base md:text-lg text-foreground-200/80 leading-relaxed max-w-xl mx-auto text-balance">
            {subtitle}
          </p>
        </Reveal>
      </div>

      {/* Bottom gradient dissolve */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-transparent to-background-50 pointer-events-none" />
    </section>
  );
}