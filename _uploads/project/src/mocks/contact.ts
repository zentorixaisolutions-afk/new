export const CONTACT_HERO = {
  label: 'Get in Touch',
  title: 'Start a Conversation',
  subtitle:
    'Whether you have a project in mind, need a technology assessment, or just want to learn what we do — we are here to talk.',
};

export const OFFICE_INFO = {
  address: {
    street: 'Doz 11, Academic City',
    city: 'Dubai',
    state: '',
    zip: '',
    country: 'United Arab Emirates',
  },
  phone: '+971 558343973',
  email: 'info.sinstechnology@gmail.com',
  hours: 'Monday – Friday: 9:00 AM – 6:00 PM GST',
  socials: [
    { name: 'Facebook', icon: 'ri-facebook-fill', url: 'https://www.facebook.com/share/1EUkwbC7VZ/' },
    { name: 'Instagram', icon: 'ri-instagram-fill', url: 'https://www.instagram.com/sins.technology?igsh=MXJvcHdveHo1bHhmaQ==' },
    { name: 'TikTok', icon: 'ri-tiktok-fill', url: 'https://www.tiktok.com/@sins.technology.u?_r=1&_t=ZS-97BJ4u2Nngw' },
    { name: 'LinkedIn', icon: 'ri-linkedin-fill', url: 'https://linkedin.com' },
    { name: 'X', icon: 'ri-twitter-x-fill', url: 'https://x.com' },
    { name: 'GitHub', icon: 'ri-github-fill', url: 'https://github.com' },
    { name: 'YouTube', icon: 'ri-youtube-fill', url: 'https://youtube.com' },
  ],
};

export const FORM_FIELDS = {
  name: { label: 'Full Name', placeholder: 'John Doe', required: true, type: 'text' },
  email: { label: 'Email Address', placeholder: 'john@company.com', required: true, type: 'email' },
  company: { label: 'Company', placeholder: 'Acme Inc.', required: false, type: 'text' },
  phone: { label: 'Phone Number', placeholder: '+971 5X XXX XXXX', required: false, type: 'tel' },
  service: {
    label: 'Service of Interest',
    required: false,
    options: [
      'Custom Software Development',
      'Cloud & DevOps',
      'AI & Automation',
      'Cybersecurity',
      'Web & Mobile Apps',
      'IT Consulting',
      'UI/UX Design',
      'Managed IT Support',
      'Other',
    ],
  },
  budget: {
    label: 'Estimated Budget',
    required: false,
    options: [
      'Under $50,000',
      '$50,000 – $100,000',
      '$100,000 – $250,000',
      '$250,000 – $500,000',
      '$500,000+',
      'Not sure yet',
    ],
  },
  message: {
    label: 'Tell Us About Your Project',
    placeholder: 'Describe your goals, timeline, and any specific requirements...',
    required: true,
    type: 'textarea',
  },
};