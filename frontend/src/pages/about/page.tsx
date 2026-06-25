import AboutHero from './components/AboutHero';
import AIJourney from './components/AIJourney';
import CompanyIntroduction from './components/CompanyIntroduction';
import WhoWeAre from './components/WhoWeAre';
import MissionVision from './components/MissionVision';
import WhatWeDo from './components/WhatWeDo';
import WhyChooseUsAbout from './components/WhyChooseUsAbout';
import CompanyStats from './components/CompanyStats';
import OurProcess from './components/OurProcess';
import TechnologiesWeWorkWith from './components/TechnologiesWeWorkWith';
import IndustriesWeServe from './components/IndustriesWeServe';
import CoreValues from './components/CoreValues';
import DownloadProfile from './components/DownloadProfile';
import CTABand from '@/pages/home/components/CTABand';

export default function About() {
  return (
    <>
      <AboutHero />
      <AIJourney />
      <CompanyIntroduction />
      <WhoWeAre />
      <MissionVision />
      <WhatWeDo />
      <WhyChooseUsAbout />
      <CompanyStats />
      <OurProcess />
      <TechnologiesWeWorkWith />
      <IndustriesWeServe />
      <CoreValues />
      <DownloadProfile />
      <CTABand />
    </>
  );
}