import { PRICING_HERO } from '@/mocks/pricing';
import PricingHero from './components/PricingHero';
import PricingPlans from './components/PricingPlans';
import FeatureComparison from './components/FeatureComparison';
import PricingFAQ from './components/PricingFAQ';
import CTABand from '@/pages/home/components/CTABand';

export default function PricingPage() {
  return (
    <>
      <PricingHero
        label={PRICING_HERO.label}
        title={PRICING_HERO.title}
        subtitle={PRICING_HERO.subtitle}
      />
      <PricingPlans />
      <FeatureComparison />
      <PricingFAQ />
      <CTABand />
    </>
  );
}