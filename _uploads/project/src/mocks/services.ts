import { ICON_CODE, ICON_CLOUD, ICON_BOT, ICON_SHIELD, ICON_CPU, ICON_LIGHTBULB, ICON_PALETTE, ICON_WRENCH, ICON_LAYERS, ICON_ZAP, ICON_MEGAPHONE, ICON_FOCUS, ICON_EYE, ICON_SHOPPING_BAG, ICON_HANDSHAKE } from '@/mocks/icons';

export const ICONS = {
  code: ICON_CODE,
  ai: ICON_BOT,
  shield: ICON_SHIELD,
  web: ICON_CPU,
  bulb: ICON_LIGHTBULB,
  design: ICON_PALETTE,
  cloud: ICON_CLOUD,
  server: ICON_LAYERS,
  network: ICON_ZAP,
  pbx: ICON_MEGAPHONE,
  access: ICON_FOCUS,
  cctv: ICON_EYE,
  pos: ICON_SHOPPING_BAG,
  support: ICON_HANDSHAKE,
};

export const SERVICES_HERO = {
  label: 'Our Capabilities',
  title: 'Enterprise Technology Services',
  subtitle:
    'From cloud architecture to AI-powered automation, we deliver the full spectrum of technology services that modern enterprises need to compete and win.',
};

export const SERVICES_OVERVIEW = [
  {
    icon: 'ri-code-s-slash-line',
    iconImage: ICONS.code,
    title: 'Custom Software Development',
    description:
      'Tailored enterprise applications built from the ground up — clean architecture, scalable infrastructure, and code your team will thank us for.',
    link: '#custom-dev',
  },
  {
    icon: 'ri-cloud-line',
    iconImage: ICONS.cloud,
    title: 'Cloud & DevOps',
    description:
      'Multi-cloud infrastructure on AWS, Azure, and GCP. CI/CD pipelines, Kubernetes orchestration, and zero-downtime deployment strategies.',
    link: '#cloud-devops',
  },
  {
    icon: 'ri-robot-2-line',
    iconImage: ICONS.ai,
    title: 'AI & Automation',
    description:
      'Machine learning models, NLP pipelines, computer vision, and intelligent process automation that turn data into decisions.',
    link: '#ai-automation',
  },
  {
    icon: 'ri-shield-check-line',
    iconImage: ICONS.shield,
    title: 'Cybersecurity',
    description:
      'End-to-end security posture — penetration testing, SOC 2 compliance, real-time threat monitoring, and incident response planning.',
    link: '#cybersecurity',
  },
  {
    icon: 'ri-smartphone-line',
    iconImage: ICONS.web,
    title: 'Web & Mobile Apps',
    description:
      'High-performance React, React Native, and Flutter applications with pixel-perfect UI and buttery-smooth 60fps animations.',
    link: '#web-mobile',
  },
  {
    icon: 'ri-lightbulb-line',
    iconImage: ICONS.bulb,
    title: 'IT Consulting',
    description:
      'Strategic technology advisory — architecture reviews, digital transformation roadmaps, vendor selection, and technical due diligence.',
    link: '#consulting',
  },
  {
    icon: 'ri-palette-line',
    iconImage: ICONS.design,
    title: 'UI/UX Design',
    description:
      'Research-driven product design, comprehensive design systems, interactive prototyping, and usability testing that puts users first.',
    link: '#uiux',
  },
  {
    icon: 'ri-server-line',
    iconImage: ICONS.cloud,
    title: 'Managed IT Support',
    description:
      '24/7 proactive infrastructure monitoring, helpdesk, patch management, and disaster recovery — we keep your systems running.',
    link: '#managed-support',
  },
  {
    icon: 'ri-hard-drive-2-line',
    iconImage: ICONS.server,
    title: 'Structured Cabling & Server Management',
    description:
      'Professional structured cabling infrastructure design and deployment, plus end-to-end server rack management, configuration, and ongoing maintenance for reliable data center operations.',
    link: '#cabling-server',
  },
  {
    icon: 'ri-router-line',
    iconImage: ICONS.network,
    title: 'Router, Switches, VPN & Firewall Administration',
    description:
      'Enterprise-grade network infrastructure management — configure and maintain routers, managed switches, site-to-site VPNs, and next-gen firewall policies for secure, high-performance connectivity.',
    link: '#network-admin',
  },
  {
    icon: 'ri-phone-line',
    iconImage: ICONS.pbx,
    title: 'Cloud Solutions & PBX Phone Systems',
    description:
      'Scalable cloud migration strategies and IP-PBX telephony deployment — unified communications, VoIP setup, and hybrid cloud architectures tailored to your business needs.',
    link: '#cloud-pbx',
  },
  {
    icon: 'ri-door-lock-line',
    iconImage: ICONS.access,
    title: 'Access Control, Time Attendance & Entrance Management',
    description:
      'Biometric and RFID-based access control systems with integrated time and attendance tracking — secure your premises while streamlining workforce management.',
    link: '#access-control',
  },
  {
    icon: 'ri-camera-line',
    iconImage: ICONS.cctv,
    title: 'CCTV & Anti-Theft EAS Solutions',
    description:
      'HD IP camera surveillance systems with remote monitoring, plus electronic article surveillance anti-theft solutions — protect your assets with comprehensive security coverage.',
    link: '#cctv-eas',
  },
  {
    icon: 'ri-archive-line',
    iconImage: ICONS.pos,
    title: 'POS & Accounting / Billing Software',
    description:
      'Point-of-sale systems and integrated accounting software — streamline retail transactions, invoicing, inventory tracking, and financial reporting in one unified platform.',
    link: '#pos-accounting',
  },
  {
    icon: 'ri-headphone-line',
    iconImage: ICONS.support,
    title: 'Web Development & IT Support, Remote / Onsite',
    description:
      'Custom web development paired with responsive IT support — remote troubleshooting, onsite technical assistance, and ongoing maintenance to keep your digital operations running smoothly.',
    link: '#web-support',
  },
];

export const SERVICE_DETAILS = [
  {
    id: 'custom-dev',
    icon: 'ri-code-s-slash-line',
    iconImage: ICONS.code,
    number: '01',
    title: 'Custom Software Development',
    heading: 'Software Built for Scale, Not Just for Launch',
    description:
      'We engineer enterprise applications that handle millions of users, process terabytes of data, and evolve with your business — not against it. Every line of code is written with maintainability and extensibility in mind.',
    highlights: [
      'Microservices and event-driven architectures designed for horizontal scaling',
      'API-first development with comprehensive documentation and versioning',
      'Test-driven development with 90%+ code coverage as standard',
      'Continuous integration and deployment pipelines from day one',
      'Legacy system modernization without disrupting business operations',
      'Dedicated quality assurance engineers embedded in every sprint',
    ],
    caseStudy: {
      title: 'FinFlow — Digital Banking Platform',
      metric: '2M+',
      metricLabel: 'Daily Transactions',
      description:
        'Built a complete digital banking platform from scratch — core ledger, fraud detection engine, multi-currency support, and regulatory compliance modules. Deployed across 3 AWS regions with 99.99% uptime SLA.',
      tags: ['React', 'Node.js', 'AWS Lambda', 'PostgreSQL', 'Redis'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20enterprise%20fintech%20banking%20dashboard%20interface%20on%20a%20dark%20sleek%20laptop%20screen%20with%20clean%20data%20visualization%20charts%2C%20teal%20and%20white%20accent%20colors%2C%20minimalist%20glassmorphism%20UI%20with%20transaction%20monitoring%20panels%2C%20soft%20ambient%20lighting%20on%20a%20dark%20wooden%20desk%2C%20professional%20editorial%20product%20photography%2C%20high%20detail%2C%20neutral%20studio%20background&width=900&height=550&seq=service-fintech-case&orientation=landscape',
    },
    bgClass: 'bg-circuit-50',
  },
  {
    id: 'cloud-devops',
    icon: 'ri-cloud-line',
    iconImage: ICONS.cloud,
    number: '02',
    title: 'Cloud & DevOps',
    heading: 'Infrastructure That Scales Before You Need It To',
    description:
      'We architect cloud environments that are secure, cost-optimized, and automated from the ground up. Whether you are migrating from on-prem, going multi-cloud, or optimizing existing spend — we have done it before.',
    highlights: [
      'Multi-cloud architecture across AWS, Azure, and Google Cloud',
      'Kubernetes orchestration with auto-scaling and self-healing clusters',
      'Infrastructure as Code using Terraform and Pulumi',
      'CI/CD pipelines with automated testing, security scanning, and canary deployments',
      'Cloud cost optimization — typical 30-40% reduction in monthly spend',
      'Disaster recovery with cross-region replication and sub-15-minute RTO',
    ],
    caseStudy: {
      title: 'Pinnacle Tech — Deployment Pipeline Overhaul',
      metric: '12 min',
      metricLabel: 'Deployment Time',
      description:
        'Transformed a 3-day manual deployment process into a fully automated 12-minute pipeline. Containerized 47 microservices, migrated to Kubernetes, and implemented blue-green deployments with zero production incidents during cutover.',
      tags: ['Docker', 'Kubernetes', 'Terraform', 'AWS EKS', 'GitHub Actions'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20cloud%20DevOps%20infrastructure%20dashboard%20on%20a%20large%20monitor%2C%20clean%20server%20architecture%20diagrams%20with%20Kubernetes%20clusters%20and%20pipeline%20visualizations%2C%20blue%20and%20white%20interface%20design%2C%20dark%20minimalist%20tech%20workspace%20with%20ambient%20blue%20LED%20lighting%2C%20professional%20enterprise%20technology%20photography%2C%20datacenter%20aesthetic&width=900&height=550&seq=service-devops-case&orientation=landscape',
    },
    bgClass: 'bg-circuit-white',
  },
  {
    id: 'ai-automation',
    icon: 'ri-robot-2-line',
    iconImage: ICONS.ai,
    number: '03',
    title: 'AI & Automation',
    heading: 'Turn Your Data Into Decisions, Not Just Dashboards',
    description:
      'We build machine learning systems that do more than generate reports — they predict outcomes, automate workflows, and surface insights your team can act on immediately. From NLP chatbots to computer vision quality control, we ship AI that works in production.',
    highlights: [
      'Custom ML model development with TensorFlow and PyTorch',
      'Natural language processing for chatbots, sentiment analysis, and document parsing',
      'Computer vision for quality inspection, object detection, and OCR workflows',
      'Intelligent process automation reducing manual work by 60-80%',
      'MLOps pipelines with model versioning, A/B testing, and automated retraining',
      'Real-time inference at scale using GPU clusters and edge deployment',
    ],
    caseStudy: {
      title: 'RetailIQ — AI Demand Forecasting',
      metric: '34%',
      metricLabel: 'Waste Reduction',
      description:
        'Deployed an AI-powered demand forecasting engine across 200+ retail locations. The system ingests weather data, local events, historical sales, and social sentiment to predict daily inventory needs — reducing food waste by 34% and increasing revenue by 12%.',
      tags: ['Python', 'TensorFlow', 'Azure ML', 'Spark', 'Power BI'],
      image: 'https://readdy.ai/api/search-image?query=AI%20machine%20learning%20analytics%20dashboard%20on%20a%20modern%20screen%2C%20neural%20network%20visualization%20with%20data%20flow%20diagrams%2C%20clean%20white%20and%20teal%20interface%20with%20predictive%20analytics%20charts%2C%20bright%20minimalist%20tech%20office%20setting%2C%20soft%20natural%20daylight%20through%20windows%2C%20professional%20product%20photography%2C%20high%20detail%2C%20clean%20composition&width=900&height=550&seq=service-ai-case&orientation=landscape',
    },
    bgClass: 'gradient-section-soft',
  },
  {
    id: 'cybersecurity',
    icon: 'ri-shield-check-line',
    iconImage: ICONS.shield,
    number: '04',
    title: 'Cybersecurity',
    heading: 'Security Is Not a Feature — It Is the Foundation',
    description:
      'Our security practice covers the full spectrum — from offensive penetration testing to defensive SOC operations and compliance certification. We find the gaps your current team missed and build a security posture that protects your business, your customers, and your reputation.',
    highlights: [
      'Black-box, grey-box, and white-box penetration testing',
      'SOC 2 Type II, ISO 27001, and HIPAA compliance preparation and auditing',
      'Real-time SIEM deployment with automated threat detection and response',
      'Zero-trust architecture implementation across cloud and on-prem environments',
      'Incident response planning with tabletop exercises and forensic readiness',
      'Continuous vulnerability scanning integrated into your CI/CD pipeline',
    ],
    caseStudy: {
      title: 'HealthBridge — SOC 2 Compliance & Security Overhaul',
      metric: '47',
      metricLabel: 'Vulnerabilities Fixed',
      description:
        'Conducted the most thorough security audit in HealthBridge history, identifying 47 critical and high-severity vulnerabilities across their cloud infrastructure. Achieved SOC 2 Type II certification in 4 months — half the industry average timeline.',
      tags: ['Penetration Testing', 'SOC 2', 'SIEM', 'AWS Security Hub', 'OWASP'],
      image: 'https://readdy.ai/api/search-image?query=Cybersecurity%20operations%20center%20dark%20blue%20dashboard%20interface%20with%20threat%20monitoring%20maps%2C%20network%20security%20visualizations%20and%20real-time%20alert%20panels%2C%20modern%20security%20analyst%20workspace%20with%20multiple%20monitors%2C%20dark%20ambient%20blue%20lighting%2C%20professional%20enterprise%20security%20photography%2C%20high-tech%20command%20center%20aesthetic&width=900&height=550&seq=service-security-case&orientation=landscape',
    },
    bgClass: 'bg-circuit-50',
  },
  {
    id: 'cabling-server',
    icon: 'ri-hard-drive-2-line',
    iconImage: ICONS.server,
    number: '05',
    title: 'Structured Cabling & Server Management',
    heading: 'The Backbone Your Business Runs On — Built Right the First Time',
    description:
      'Messy cables and poorly managed server rooms are silent productivity killers. We design and deploy structured cabling systems that meet TIA/EIA standards, paired with server rack management that ensures every watt of power and every byte of data flows where it should — without bottlenecks, without downtime, and without surprises.',
    highlights: [
      'TIA/EIA-568 structured cabling design with certified copper and fiber optic runs',
      'Server rack layout, cable management, and thermal optimization for maximum uptime',
      'Patch panel, floor distributor, and building distributor documentation and labeling',
      'Power distribution planning with redundant UPS and PDU configurations',
      'Server hardware provisioning, OS installation, and firmware baseline hardening',
      'Ongoing maintenance contracts with 4-hour onsite SLA for critical infrastructure',
    ],
    caseStudy: {
      title: 'Al Mirfa Group — 200-Node Office Infrastructure Build',
      metric: '99.99%',
      metricLabel: 'Infrastructure Uptime',
      description:
        'Designed and deployed a complete structured cabling system across 3 floors for a 200-employee headquarters. Installed 48U server racks with redundant power, fiber backbone between floors, and a centralized patch management system. Zero unplanned outages in the first 18 months of operation.',
      tags: ['Cat6A', 'Fiber Optics', 'Dell PowerEdge', 'APC UPS', 'Cable Mgmt'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20data%20center%20server%20room%20with%20neatly%20organized%20structured%20cabling%20in%20cable%20trays%2C%20clean%20rack-mounted%20servers%20with%20LED%20indicators%2C%20modern%20fiber%20optic%20patch%20panels%20with%20organized%20cable%20management%2C%20cool%20ambient%20blue%20lighting%2C%20pristine%20IT%20infrastructure%20facility%2C%20professional%20enterprise%20technology%20photography%2C%20high%20detail%2C%20technical%20aesthetic&width=900&height=550&seq=svc-detail-cabling-142&orientation=landscape',
    },
    bgClass: 'bg-circuit-white',
  },
  {
    id: 'network-admin',
    icon: 'ri-router-line',
    iconImage: ICONS.network,
    number: '06',
    title: 'Router, Switches, VPN & Firewall Administration',
    heading: 'Your Network Is Either a Weapon or a Weakness — We Make It the Former',
    description:
      'A misconfigured VLAN or an outdated firewall rule is all it takes to expose your entire operation. We harden, monitor, and manage your network infrastructure — from core routers and managed switches to site-to-site VPN tunnels and next-generation firewalls — giving you a network that is fast, resilient, and invisible to attackers.',
    highlights: [
      'Enterprise router and L2/L3 managed switch configuration with VLAN segmentation',
      'Site-to-site and remote-access VPN deployment using IPsec, OpenVPN, and WireGuard',
      'Next-gen firewall (NGFW) policy design with application-layer filtering and IPS/IDS',
      'Network access control (NAC) with 802.1X authentication and device posture checks',
      'Real-time network monitoring with SNMP, NetFlow, and automated alerting',
      'Quarterly security audits with penetration testing and configuration compliance reviews',
    ],
    caseStudy: {
      title: 'GulfTrade Logistics — Multi-Site Network Overhaul',
      metric: '8',
      metricLabel: 'Sites Connected',
      description:
        'Unified 8 warehouse locations across the UAE with a site-to-site VPN mesh, replaced aging switches with Cisco Catalyst stack, deployed Palo Alto NGFWs at each perimeter, and implemented VLAN segmentation that isolated OT and IT traffic for the first time. Network latency dropped 62% and security incidents fell to zero.',
      tags: ['Cisco Catalyst', 'Palo Alto', 'IPsec VPN', 'VLAN', 'SNMP'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20network%20operations%20center%20with%20glowing%20network%20topology%20diagrams%20on%20large%20wall-mounted%20screens%2C%20router%20and%20switch%20rack%20equipment%20in%20a%20clean%20server%20room%20with%20blue%20indicator%20lights%2C%20enterprise%20network%20management%20dashboard%20with%20traffic%20flow%20visualizations%20and%20security%20status%20panels%2C%20professional%20data%20center%20photography%2C%20high-tech%20command%20center%20aesthetic&width=900&height=550&seq=svc-detail-network-142&orientation=landscape',
    },
    bgClass: 'gradient-section-soft',
  },
  {
    id: 'cloud-pbx',
    icon: 'ri-phone-line',
    iconImage: ICONS.pbx,
    number: '07',
    title: 'Cloud Solutions & PBX Phone Systems',
    heading: 'Move Your Business to the Cloud — Including Your Phone System',
    description:
      'Legacy phone systems and on-prem servers are eating your budget in maintenance and missed features. We migrate your workloads to the cloud and deploy IP-PBX phone systems that give you enterprise-grade calling — auto attendants, call queues, voicemail-to-email — all managed through a web dashboard, accessible from anywhere.',
    highlights: [
      'Cloud migration strategy with AWS, Azure, or GCP — lift-and-shift to full re-architecture',
      'IP-PBX deployment with FreeSWITCH, Asterisk, or 3CX for up to 500+ extensions',
      'VoIP trunking with SIP provider integration and QoS-optimized traffic routing',
      'Unified communications — voice, video conferencing, instant messaging in one platform',
      'Hybrid cloud architecture design with on-prem failover for business continuity',
      'Ongoing cloud cost optimization with reserved instance planning and right-sizing',
    ],
    caseStudy: {
      title: 'RoyalCrest Hospitality — Cloud PBX for 12 Properties',
      metric: 'AED 180K',
      metricLabel: 'Annual Savings',
      description:
        'Consolidated separate phone systems across 12 hotel properties into a single cloud-hosted 3CX PBX. Deployed SIP trunks, configured 600+ extensions with hotel-specific call flows, and integrated with the PMS for guest wake-up calls and room status updates. Cut telecom costs by 64% in year one.',
      tags: ['3CX', 'SIP Trunking', 'AWS', 'VoIP', 'QoS'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20unified%20communications%20dashboard%20on%20a%20large%20monitor%20showing%20VoIP%20call%20analytics%20and%20PBX%20management%20interface%2C%20sleek%20IP%20desk%20phones%20on%20a%20bright%20minimalist%20office%20desk%2C%20cloud%20architecture%20diagram%20with%20phone%20system%20nodes%20on%20a%20secondary%20screen%2C%20clean%20professional%20IT%20workspace%20with%20soft%20natural%20window%20light%2C%20enterprise%20technology%20photography%2C%20high%20detail%2C%20warm%20neutral%20tones&width=900&height=550&seq=svc-detail-pbx-142&orientation=landscape',
    },
    bgClass: 'bg-circuit-50',
  },
  {
    id: 'access-control',
    icon: 'ri-door-lock-line',
    iconImage: ICONS.access,
    number: '08',
    title: 'Access Control, Time Attendance & Entrance Management',
    heading: 'Know Who Enters. Know Who Exits. Know Everything in Between.',
    description:
      'Keys get lost. Sign-in sheets get ignored. We deploy biometric and RFID-based access control systems that give you granular control over who enters which door at what time — integrated with time and attendance tracking that feeds directly into payroll. Your security posture starts at the front door, and we make sure it stays airtight.',
    highlights: [
      'Biometric fingerprint, facial recognition, and RFID card-based access control systems',
      'Multi-door controller deployment with centralized management software',
      'Time and attendance integration with automated shift scheduling and payroll export',
      'Visitor management kiosks with pre-registration, badge printing, and host notifications',
      'Elevator floor access control and vehicle gate/barrier integration',
      'Real-time monitoring dashboard with entry logs, anomaly alerts, and audit trail reports',
    ],
    caseStudy: {
      title: 'NexGen Manufacturing — 500-Employee Facility Access Deployment',
      metric: '500+',
      metricLabel: 'Employees Managed',
      description:
        'Deployed biometric access control across 42 doors in a manufacturing facility with 500+ employees. Integrated fingerprint and facial recognition terminals with ZKTeco controllers, linked to a centralized time attendance system that automated payroll calculations. Eliminated buddy punching and reduced attendance disputes by 95%.',
      tags: ['ZKTeco', 'Biometric', 'RFID', 'Time Attendance', 'Payroll API'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20biometric%20access%20control%20turnstile%20gate%20at%20a%20corporate%20building%20entrance%20with%20fingerprint%20scanner%20and%20facial%20recognition%20terminal%2C%20sleek%20glass%20doors%20with%20LED%20indicators%2C%20professional%20security%20technology%20setup%20with%20clean%20minimalist%20design%2C%20bright%20lobby%20environment%20with%20natural%20light%2C%20enterprise%20security%20photography%2C%20high%20detail%2C%20corporate%20aesthetic&width=900&height=550&seq=svc-detail-access-142&orientation=landscape',
    },
    bgClass: 'bg-circuit-white',
  },
  {
    id: 'cctv-eas',
    icon: 'ri-camera-line',
    iconImage: ICONS.cctv,
    number: '09',
    title: 'CCTV & Anti-Theft EAS Solutions',
    heading: 'Eyes Everywhere. Losses Nowhere.',
    description:
      'A camera that records in 480p and an anti-theft gate that beeps at random is not security — it is theater. We deploy HD IP camera systems with AI-powered analytics and electronic article surveillance solutions that actually deter theft and produce usable evidence when you need it. Full coverage, zero blind spots, and remote access from your phone.',
    highlights: [
      'HD and 4K IP camera deployment with NVR storage and 90-day retention',
      'AI-powered video analytics — intrusion detection, line crossing, loitering alerts',
      'Remote viewing via mobile app and web dashboard with PTZ camera control',
      'EAS AM/RF anti-theft gate installation for retail with deactivator integration',
      'Thermal camera options for perimeter security in low-light environments',
      'Annual maintenance contracts with camera cleaning, firmware updates, and health checks',
    ],
    caseStudy: {
      title: 'CityMart Retail Chain — 18-Store CCTV & EAS Rollout',
      metric: '73%',
      metricLabel: 'Shrinkage Reduction',
      description:
        'Deployed 8-24 cameras per store across 18 retail locations with centralized NVR management, plus AM EAS pedestals at all entrances. AI analytics flagged suspicious behavior patterns and alerted store managers in real time. Shoplifting incidents dropped 73% in the first quarter post-deployment.',
      tags: ['Hikvision', 'NVR', 'AI Analytics', 'EAS AM', 'Remote Viewing'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20CCTV%20surveillance%20camera%20monitoring%20wall%20with%20multiple%20screens%20showing%20live%20security%20camera%20feeds%20from%20retail%20store%2C%20modern%20security%20control%20room%20with%20clean%20desk%20setup%2C%20network%20video%20recorder%20with%20status%20LEDs%2C%20professional%20surveillance%20technology%20environment%2C%20dark%20ambient%20blue%20monitor%20glow%2C%20enterprise%20security%20photography%2C%20high%20detail&width=900&height=550&seq=svc-detail-cctv-142&orientation=landscape',
    },
    bgClass: 'gradient-section-soft',
  },
  {
    id: 'pos-accounting',
    icon: 'ri-archive-line',
    iconImage: ICONS.pos,
    number: '10',
    title: 'POS & Accounting / Billing Software',
    heading: 'Every Transaction, Every Invoice, Every Dirham — Tracked and Optimized',
    description:
      'Your cash register and your accounting software should not be strangers. We deploy point-of-sale systems that talk to your inventory, your CRM, and your general ledger in real time. Combine that with accounting and billing software configured for UAE VAT compliance, and you have a financial command center — not a collection of disconnected tools.',
    highlights: [
      'POS terminal deployment with barcode scanning, receipt printing, and kitchen display integration',
      'Inventory management with real-time stock sync across multiple locations',
      'Accounting software setup (Tally, Zoho Books, QuickBooks) with chart of accounts customization',
      'VAT-compliant invoicing with automated tax calculations and FTA audit readiness',
      'CRM integration for customer loyalty programs and targeted marketing campaigns',
      'Daily sales reconciliation with bank deposit matching and discrepancy alerts',
    ],
    caseStudy: {
      title: 'FreshMart Supermarkets — 5-Branch POS & Accounting Integration',
      metric: '40%',
      metricLabel: 'Faster Month-End Close',
      description:
        'Replaced standalone cash registers across 5 supermarket branches with a unified POS system integrated to Zoho Books. Automated daily sales journals, purchase entries, and VAT calculations — reducing month-end closing from 8 days to under 5. Real-time stock visibility across all branches eliminated over-ordering.',
      tags: ['POS Terminal', 'Zoho Books', 'Inventory Sync', 'VAT', 'CRM'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20retail%20point%20of%20sale%20checkout%20counter%20with%20sleek%20touchscreen%20POS%20terminal%2C%20barcode%20scanner%20and%20receipt%20printer%20on%20a%20clean%20white%20counter%2C%20retail%20store%20environment%20with%20bright%20warm%20lighting%2C%20professional%20product%20display%20shelving%20in%20background%2C%20modern%20retail%20technology%20photography%2C%20high%20detail%2C%20clean%20minimalist%20aesthetic&width=900&height=550&seq=svc-detail-pos-142&orientation=landscape',
    },
    bgClass: 'bg-circuit-50',
  },
  {
    id: 'web-support',
    icon: 'ri-headphone-line',
    iconImage: ICONS.support,
    number: '11',
    title: 'Web Development & IT Support, Remote / Onsite',
    heading: 'Your Website Works. Your Tech Works. And When It Does Not — We Fix It.',
    description:
      'Your business needs a website that converts and technology that does not crash on a Monday morning. We build custom websites with modern frameworks, then back them with IT support that covers everything — password resets, printer nightmares, server meltdowns, and software that refuses to cooperate. Remote for speed, onsite when it matters.',
    highlights: [
      'Custom website development with React, Next.js, and modern headless CMS platforms',
      'E-commerce storefronts with payment gateway integration and inventory sync',
      'Remote IT helpdesk with ticketing system and average 15-minute first response time',
      'Onsite technical support with 2-hour SLA for critical business disruptions',
      'Microsoft 365 and Google Workspace administration, migration, and user management',
      'Endpoint security — antivirus deployment, patch management, and device hardening',
    ],
    caseStudy: {
      title: 'Al Hadi Legal — Full Digital Transformation',
      metric: '2 hr',
      metricLabel: 'Avg Support Response',
      description:
        'Built a modern corporate website with case management portal for a 40-attorney law firm, then provided ongoing remote and onsite IT support. Migrated 85 users to Microsoft 365, deployed endpoint security across all workstations, and established a ticketed helpdesk — average resolution time under 2 hours for critical issues.',
      tags: ['Next.js', 'Microsoft 365', 'Helpdesk', 'Endpoint Security', 'Onsite SLA'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20IT%20support%20helpdesk%20workspace%20with%20dual%20monitors%20showing%20support%20ticket%20dashboard%20and%20remote%20desktop%20session%2C%20professional%20technician%20wearing%20headset%20at%20a%20clean%20desk%2C%20bright%20modern%20office%20environment%20with%20natural%20window%20light%2C%20organized%20tech%20workspace%20with%20minimal%20clutter%2C%20corporate%20IT%20support%20photography%2C%20high%20detail%2C%20warm%20professional%20aesthetic&width=900&height=550&seq=svc-detail-support-142&orientation=landscape',
    },
    bgClass: 'bg-circuit-white',
  },
];

export const TECH_STACK = [
  {
    category: 'Frontend',
    icon: 'ri-window-line',
    iconImage: ICONS.code,
    items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Angular', 'Vue.js', 'React Native', 'Flutter'],
  },
  {
    category: 'Backend & APIs',
    icon: 'ri-terminal-box-line',
    iconImage: ICONS.code,
    items: ['Node.js', 'Python', 'Go', 'Java', '.NET', 'GraphQL', 'REST', 'gRPC'],
  },
  {
    category: 'Cloud & Infrastructure',
    icon: 'ri-cloud-windy-line',
    iconImage: ICONS.cloud,
    items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'Pulumi', 'Vercel'],
  },
  {
    category: 'Data & AI',
    icon: 'ri-database-2-line',
    iconImage: ICONS.ai,
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'TensorFlow', 'PyTorch', 'Spark', 'Kafka', 'Snowflake'],
  },
  {
    category: 'DevOps & Security',
    icon: 'ri-shield-keyhole-line',
    iconImage: ICONS.shield,
    items: ['GitHub Actions', 'GitLab CI', 'SonarQube', 'Snyk', 'Datadog', 'Splunk', 'Vault', 'Cloudflare'],
  },
];