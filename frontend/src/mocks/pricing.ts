export const PRICING_HERO = {
  label: 'Pricing',
  title: 'Transparent Plans, No Hidden Fees',
  subtitle:
    'Choose the plan that fits your team. Whether you are a startup shipping an MVP or an enterprise scaling globally, we have a partnership model that works.',
};

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For startups and small teams shipping their first product.',
    monthlyPrice: 4999,
    annualPrice: 49990,
    currency: '$',
    period: '/month',
    popular: false,
    features: [
      'Dedicated engineering team (2-3 devs)',
      'Up to 80 hours per month',
      'Weekly progress reports',
      'Slack & email support',
      'Code reviews and QA included',
      'Monthly strategy call',
      'Standard SLA (24h response)',
    ],
    highlight: 'Best for MVP development',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing companies that need a full-stack engineering partner.',
    monthlyPrice: 11999,
    annualPrice: 119990,
    currency: '$',
    period: '/month',
    popular: true,
    features: [
      'Dedicated engineering team (4-6 devs)',
      'Up to 200 hours per month',
      'Daily standups & bi-weekly demos',
      'Priority Slack & phone support',
      'Dedicated QA engineer',
      'Architecture consulting included',
      'CI/CD pipeline setup & management',
      'Priority SLA (8h response)',
      'Cloud cost optimization reviews',
      'Bi-weekly strategy sessions',
    ],
    highlight: 'Most popular for scaling teams',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with complex infrastructure and compliance needs.',
    monthlyPrice: null,
    annualPrice: null,
    currency: '',
    period: '',
    popular: false,
    features: [
      'Custom team size & composition',
      'Unlimited hours',
      'Dedicated project manager',
      '24/7 phone, Slack & email support',
      'Full QA team embedded',
      'Architecture & security audits',
      'Custom CI/CD with zero-downtime deploys',
      'Critical SLA (2h response)',
      'Compliance support (SOC 2, HIPAA, ISO)',
      'Weekly executive briefings',
      'Dedicated cloud environment',
      'On-site visits (quarterly)',
    ],
    highlight: 'For mission-critical systems',
    ctaLabel: 'Contact Sales',
  },
];

export const ANNUAL_DISCOUNT_PCT = 17;

export const COMPARISON_CATEGORIES = [
  {
    category: 'Team & Delivery',
    features: [
      { name: 'Dedicated developers', starter: '2–3', professional: '4–6', enterprise: 'Custom' },
      { name: 'Monthly hours', starter: 'Up to 80', professional: 'Up to 200', enterprise: 'Unlimited' },
      { name: 'Project manager', starter: false, professional: true, enterprise: true },
      { name: 'QA engineer', starter: false, professional: true, enterprise: 'Full team' },
      { name: 'On-site visits', starter: false, professional: false, enterprise: 'Quarterly' },
    ],
  },
  {
    category: 'Communication & Support',
    features: [
      { name: 'Slack & email support', starter: true, professional: true, enterprise: true },
      { name: 'Phone support', starter: false, professional: true, enterprise: '24/7' },
      { name: 'Standups & demos', starter: 'Weekly', professional: 'Daily / Bi-weekly', enterprise: 'Daily / Weekly' },
      { name: 'SLA response time', starter: '24 hours', professional: '8 hours', enterprise: '2 hours' },
      { name: 'Executive briefings', starter: false, professional: false, enterprise: 'Weekly' },
    ],
  },
  {
    category: 'Technical Services',
    features: [
      { name: 'Code reviews', starter: true, professional: true, enterprise: true },
      { name: 'Architecture consulting', starter: false, professional: true, enterprise: true },
      { name: 'CI/CD pipeline setup', starter: false, professional: true, enterprise: 'Custom' },
      { name: 'Security audits', starter: false, professional: false, enterprise: true },
      { name: 'Compliance support', starter: false, professional: false, enterprise: true },
      { name: 'Cloud cost optimization', starter: false, professional: true, enterprise: true },
      { name: 'Dedicated cloud environment', starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: 'Strategy & Planning',
    features: [
      { name: 'Strategy calls', starter: 'Monthly', professional: 'Bi-weekly', enterprise: 'Weekly' },
      { name: 'Roadmap planning', starter: false, professional: true, enterprise: true },
      { name: 'Tech debt assessment', starter: false, professional: true, enterprise: true },
      { name: 'Hiring consultation', starter: false, professional: false, enterprise: true },
    ],
  },
];

export const PRICING_FAQ = [
  {
    question: 'Can I switch plans mid-engagement?',
    answer:
      'Absolutely. You can upgrade or downgrade at any time. If you upgrade, the difference is prorated for the remainder of the billing period. If you downgrade, the new rate applies from the next billing cycle.',
  },
  {
    question: 'What happens if I exceed the monthly hour cap?',
    answer:
      'For Starter and Professional plans, hours beyond the cap are billed at a discounted overflow rate of $75/hour. We will always notify you before incurring overflow hours so there are never surprises on your invoice.',
  },
  {
    question: 'Do you offer annual contracts?',
    answer:
      'Yes — and you save 17% compared to monthly billing. Annual plans also include a dedicated customer success manager and quarterly business reviews at no extra cost.',
  },
  {
    question: 'How quickly can you onboard a new team?',
    answer:
      'Typical team assembly takes 5-10 business days depending on the skill set required. We maintain a bench of pre-vetted engineers across all major technology stacks to minimize ramp-up time.',
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'Our core stack includes React, Next.js, TypeScript, Node.js, Python, Go, AWS, Azure, GCP, Kubernetes, and PostgreSQL — but we have delivered projects across 40+ technology stacks. If it runs in production, we have probably built with it.',
  },
  {
    question: 'Is there a minimum commitment?',
    answer:
      'Starter plans have a 3-month minimum. Professional plans have a 6-month minimum. Enterprise engagements are structured as 12-month partnerships to ensure we can deliver meaningful, lasting impact.',
  },
  {
    question: 'Do you handle ongoing maintenance after delivery?',
    answer:
      'Yes. All plans include post-launch support during the engagement period. For long-term maintenance after the engagement ends, we offer retainers starting at $2,500/month for ongoing monitoring, updates, and minor enhancements.',
  },
];