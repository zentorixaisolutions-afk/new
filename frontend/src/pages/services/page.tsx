import ServicesHero from './components/ServicesHero';
import ServicesOverview from './components/ServicesOverview';
import ServiceDetailSection from './components/ServiceDetailSection';
import TechStack from './components/TechStack';
import CTABand from '@/pages/home/components/CTABand';
import { SERVICE_DETAILS } from '@/mocks/services';

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      {SERVICE_DETAILS.map((detail, i) => (
        <ServiceDetailSection key={detail.id} detail={detail} index={i} />
      ))}
      <TechStack />
      <CTABand />
    </>
  );
}