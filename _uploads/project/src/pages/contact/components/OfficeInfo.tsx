import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import {
  FaLinkedinIn,
  FaXTwitter,
  FaGithub,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa6';
import Reveal from '@/components/feature/Reveal';

const socials = [
  { name: 'Facebook', Icon: FaFacebookF, url: 'https://facebook.com/conquercomputersdubai.007' },
  { name: 'Instagram', Icon: FaInstagram, url: 'https://instagram.com/conquerdxb' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, url: 'https://www.linkedin.com/search/results/all/?keywords=Conquer%20Computers%20LLC' },
  { name: 'WhatsApp', Icon: FaTiktok, url: 'https://wa.me/971543433553' },
];

export default function OfficeInfo() {
  const { t } = useTranslation();
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-50 relative" id="office-info">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-16">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('contact.office.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy dark:text-white leading-[1.15] text-balance">{t('contact.office.title')}</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <Reveal>
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-background-200/70 dark:border-slate-700/50">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2041!2d55.3047!3d25.2711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2sDeira%2C%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Conquer Computers LLC Office Location" aria-label="Google Map showing Conquer Computers LLC office in Deira, Dubai" className="absolute inset-0" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="glass-card p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center mb-4 flex-shrink-0"><MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} /></div>
                <h3 className="font-semibold text-sm text-white mb-2">{t('contact.info.address')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Deira<br />Dubai<br />United Arab Emirates</p>
              </div>
              <div className="glass-card p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center mb-4 flex-shrink-0"><Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} /></div>
                <h3 className="font-semibold text-sm text-white mb-2">{t('contact.info.phone')}</h3>
                <a href="tel:+971543433553" className="text-sm text-accent-500 hover:text-accent-600 leading-relaxed transition-colors">+971 54 343 3553</a>
              </div>
              <div className="glass-card p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center mb-4 flex-shrink-0"><Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} /></div>
                <h3 className="font-semibold text-sm text-white mb-2">{t('contact.info.email')}</h3>
                <a href="mailto:info@conquercomputers.com" className="text-sm text-accent-500 hover:text-accent-600 leading-relaxed break-all transition-colors">info@conquercomputers.com</a>
              </div>
              <div className="glass-card p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center mb-4 flex-shrink-0"><Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} /></div>
                <h3 className="font-semibold text-sm text-white mb-2">{t('contact.info.business_hours')}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">{t('contact.info.mon_fri')}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12">
            <span className="text-xs sm:text-sm text-foreground-400">{t('contact.connect')}</span>
            {socials.map(({ name, Icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[rgba(0,200,255,0.08)] border border-[rgba(0,200,255,0.14)] flex items-center justify-center text-foreground-500 hover:text-[#2563eb] hover:border-[rgba(0,200,255,0.35)] transition-all duration-200" aria-label={name}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}