import { ICONS as SERVICE_ICONS } from '@/mocks/services';
import { ICON_ROCKET } from '@/mocks/icons';

// Uploaded premium 3D transparent icons — backgrounds removed
export const UPLOADED_ICONS = {
  code: 'https://public.readdy.ai/ai/img_res/5695c1c2-1a6b-413b-a68a-fcf8d9e640c4.png',
  search: 'https://public.readdy.ai/ai/img_res/a929bd12-8fb6-48d8-8a7d-62cdfb6391dc.png',
  // New transparent icons — backgrounds removed
  serverCabling: 'https://public.readdy.ai/ai/img_res/c735fe7f-250d-4b16-b58e-40cfbd608051.png',
  routerFirewall: 'https://public.readdy.ai/ai/img_res/40ec70e5-d3ab-48b2-ac4a-8fff83c25b18.png',
  cloudPbx: 'https://public.readdy.ai/ai/img_res/bdf0ba48-08b6-45db-bc51-bd15f19b2cfa.png',
  accessControl: 'https://public.readdy.ai/ai/img_res/95f5e8f2-3e1e-4dd0-9112-d7452f552c31.png',
  cctv: 'https://public.readdy.ai/ai/img_res/6c02d499-2441-4995-b064-9af5586d9092.png',
  posBilling: 'https://public.readdy.ai/ai/img_res/07c3676e-31f4-4b49-9b1d-5537fd56f2f9.png',
  webDevSupport: 'https://public.readdy.ai/ai/img_res/3a9e6617-6d80-4bd5-aa5c-828fc9a953a2.png',
  // Process section icons — backgrounds removed
  iconDiscover: 'https://public.readdy.ai/ai/img_res/87e0cbb2-f6fa-49fa-a8e9-17b2e54ffa07.png',
  iconDesign: 'https://public.readdy.ai/ai/img_res/c743d9c3-cf85-4b4b-bc10-60804cde6e93.png',
  iconBuild: 'https://public.readdy.ai/ai/img_res/81d549ee-edb3-4848-a810-2ce8be36cf5d.png',
  iconDeliver: 'https://public.readdy.ai/ai/img_res/0d36814f-20aa-4fa3-9e42-9111299e3eba.png',
};

export const MARQUEE_KEYWORDS = [
  'Cloud Computing',
  'DevOps',
  'AI/ML',
  'Cybersecurity',
  'Software Engineering',
  'UI/UX Design',
  'Automation',
  'Data Analytics',
  'Microservices',
  'Blockchain',
  'IoT Solutions',
  'Edge Computing',
];

export const SERVICE_CARDS = [
  {
    icon: 'ri-server-line',
    iconImage: UPLOADED_ICONS.serverCabling,
    title: 'Structured Cabling & Server Management',
    description: 'Professional network cabling, rack installation, and server infrastructure setup with certified technicians and structured documentation.',
    link: '/services',
  },
  {
    icon: 'ri-shield-check-line',
    iconImage: UPLOADED_ICONS.routerFirewall,
    title: 'Router, Switches, VPN & Firewall Administration',
    description: 'Enterprise-grade network hardware configuration, secure VPN tunnels, firewall policies, and real-time threat monitoring for total protection.',
    link: '/services',
  },
  {
    icon: 'ri-cloud-line',
    iconImage: UPLOADED_ICONS.cloudPbx,
    title: 'Cloud Solutions & PBX Phone Systems',
    description: 'Cloud migration, VoIP and PBX phone system deployment, unified communications, and managed cloud infrastructure for modern businesses.',
    link: '/services',
  },
  {
    icon: 'ri-fingerprint-line',
    iconImage: UPLOADED_ICONS.accessControl,
    title: 'Access Control, Time Attendance & Entrance Management',
    description: 'Biometric and RFID access control systems, automated time tracking, and smart entry management for secure, efficient facilities.',
    link: '/services',
  },
  {
    icon: 'ri-camera-line',
    iconImage: UPLOADED_ICONS.cctv,
    title: 'CCTV & Anti-Theft EAS Solutions',
    description: 'HD surveillance camera installation, 24/7 remote monitoring, and electronic article surveillance systems to protect assets and people.',
    link: '/services',
  },
  {
    icon: 'ri-calculator-line',
    iconImage: UPLOADED_ICONS.posBilling,
    title: 'POS & Accounting / Billing Software',
    description: 'Integrated point-of-sale systems, automated invoicing, inventory-linked billing, and financial management software for retail and hospitality.',
    link: '/services',
  },
  {
    icon: 'ri-code-s-slash-line',
    iconImage: UPLOADED_ICONS.webDevSupport,
    title: 'Web Development & IT Support (Remote / Onsite)',
    description: 'Custom website and application development with responsive design, plus responsive remote and onsite IT support for uninterrupted operations.',
    link: '/services',
  },
];

export const FEATURED_PROJECTS = [
  {
    title: 'FinFlow — Digital Banking Platform',
    category: 'Fintech',
    description: 'A complete digital banking solution handling 2M+ transactions daily with real-time fraud detection and multi-currency support.',
    image: 'https://readdy.ai/api/search-image?query=Modern%20fintech%20dashboard%20interface%20on%20a%20dark%20sleek%20laptop%20screen%2C%20clean%20data%20visualization%20charts%20with%20teal%20and%20white%20accents%2C%20minimalist%20glassmorphism%20UI%20elements%2C%20soft%20ambient%20lighting%20on%20a%20dark%20wooden%20desk%2C%20professional%20editorial%20photography%2C%20high%20detail%2C%20neutral%20background&width=800&height=500&seq=project-finflow&orientation=landscape',
    tags: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
  },
  {
    title: 'MediTrack — Healthcare Logistics',
    category: 'Healthcare',
    description: 'Real-time pharmaceutical supply chain tracking across 12 countries with cold-chain monitoring and compliance automation.',
    image: 'https://readdy.ai/api/search-image?query=Healthcare%20logistics%20dashboard%20displayed%20on%20a%20modern%20monitor%2C%20clean%20white%20and%20cyan%20interface%20with%20supply%20chain%20maps%20and%20tracking%20data%2C%20minimalist%20medical%20aesthetic%2C%20soft%20clinic%20lighting%2C%20professional%20photography%2C%20clean%20white%20background&width=800&height=500&seq=project-meditrack&orientation=landscape',
    tags: ['Angular', 'Python', 'GCP', 'MongoDB'],
  },
  {
    title: 'RetailIQ — Smart Inventory System',
    category: 'Retail',
    description: 'AI-powered demand forecasting that reduced waste by 34% across 200+ retail locations with real-time stock optimization.',
    image: 'https://readdy.ai/api/search-image?query=Smart%20retail%20inventory%20management%20interface%20on%20a%20tablet%20screen%2C%20clean%20modern%20ecommerce%20dashboard%20with%20analytics%20charts%2C%20white%20and%20blue%20color%20scheme%2C%20minimalist%20workspace%20setting%2C%20soft%20natural%20window%20light%2C%20editorial%20product%20photography&width=800&height=500&seq=project-retailiq&orientation=landscape',
    tags: ['Next.js', 'TensorFlow', 'Azure', 'Redis'],
  },
];

export const WHY_CHOOSE_US = [
  {
    step: '01',
    title: 'Discover',
    description: 'We immerse ourselves in your business — understanding goals, pain points, and the competitive landscape before writing a single line of code.',
    icon: 'ri-search-eye-line',
    iconImage: UPLOADED_ICONS.iconDiscover,
  },
  {
    step: '02',
    title: 'Design',
    description: 'Architecture blueprints, wireframes, and prototypes crafted collaboratively. Every decision backed by research, not assumptions.',
    icon: 'ri-pencil-ruler-2-line',
    iconImage: UPLOADED_ICONS.iconDesign,
  },
  {
    step: '03',
    title: 'Build',
    description: 'Agile development with 2-week sprints, continuous integration, and transparent progress. You see working software from week one.',
    icon: 'ri-tools-line',
    iconImage: UPLOADED_ICONS.iconBuild,
  },
  {
    step: '04',
    title: 'Deliver & Support',
    description: 'Rigorous QA, seamless deployment, thorough documentation, and ongoing 24/7 support. We stay with you long after launch.',
    icon: 'ri-rocket-2-line',
    iconImage: UPLOADED_ICONS.iconDeliver,
  },
];

export const TRUST_STATS = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '24/7', label: 'Dedicated Support' },
];

export const TESTIMONIALS = [
  {
    quote: 'Samarat Infinity Network Solutions transformed our legacy systems into a modern cloud-native platform. The team\'s technical depth and project management were exceptional — we launched two weeks ahead of schedule.',
    author: 'Sarah Chen',
    role: 'CTO, Meridian Financial',
  },
  {
    quote: 'We\'ve worked with dozens of dev agencies. SINS is different — they think like partners, not vendors. Their AI automation saved us $2M in operational costs in the first year alone.',
    author: 'Marcus Rivera',
    role: 'VP Engineering, Nova Retail Group',
  },
  {
    quote: 'The cybersecurity audit SINS conducted was the most thorough we\'ve ever seen. They found vulnerabilities our previous auditors missed and helped us achieve SOC 2 compliance in record time.',
    author: 'Dr. Emily Park',
    role: 'CISO, HealthBridge Systems',
  },
  {
    quote: 'From concept to deployment, the SINS team delivered a mobile app that our users genuinely love. 4.8 stars on the App Store and 200K downloads in the first quarter.',
    author: 'James Okafor',
    role: 'Head of Product, SwiftLogix',
  },
  {
    quote: 'Their DevOps overhaul cut our deployment time from 3 days to 12 minutes. The ROI has been staggering — our engineering team is now 4x more productive.',
    author: 'Laura Whitfield',
    role: 'Director of Engineering, Pinnacle Tech',
  },
];

export const CLIENT_LOGOS = [
  { name: 'Dialog', style: 'font-bold tracking-tight' },
  { name: 'HNB', style: 'font-extrabold tracking-wider' },
  { name: 'John Keells', style: 'font-semibold tracking-normal' },
  { name: 'MAS Holdings', style: 'font-bold tracking-wide uppercase' },
  { name: 'Brandix', style: 'font-medium tracking-[0.15em]' },
  { name: 'Cargills', style: 'font-semibold tracking-tight' },
  { name: 'Commercial Bank', style: 'font-bold tracking-normal' },
  { name: 'SriLankan', style: 'font-medium tracking-[0.2em] uppercase' },
  { name: 'Softlogic', style: 'font-semibold tracking-wide' },
  { name: 'Lanka Hospitals', style: 'font-bold tracking-tight' },
  { name: 'Nations Trust', style: 'font-semibold tracking-[0.1em]' },
  { name: 'Hemas', style: 'font-bold tracking-wider uppercase' },
];