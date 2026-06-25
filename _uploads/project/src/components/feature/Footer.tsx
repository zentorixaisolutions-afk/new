import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa6';
import LogoImage from '@/components/base/LogoImage';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(0,200,255,0.15)] bg-[rgba(0,200,255,0.05)] text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-cyan-400/60 hover:bg-[rgba(0,200,255,0.12)] hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
    >
      {children}
    </a>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { to: string; label: string }[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
      <ul className="space-y-2.5 text-sm text-slate-300">
        {links.map(({ to, label }) => (
          <li key={`${to}-${label}`}>
            <Link
              to={to}
              className="inline-block break-words transition-colors hover:text-cyan-300"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*  Footer wordmark styles — placed below footer content  */
const footerWordmarkStyles = `
  .footer {
    position: relative;
    overflow: hidden;
  }
  .footer-wordmark-wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    margin-top: clamp(18px, 3vw, 36px);
    margin-bottom: clamp(8px, 2vw, 18px);
    overflow: hidden;
  }
  .footer-bg-wordmark {
    width: 100%;
    text-align: center;
    font-size: clamp(42px, 7vw, 120px);
    font-weight: 900;
    line-height: 0.85;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.045);
    pointer-events: none;
    user-select: none;
  }
  @media (max-width: 768px) {
    .footer-wordmark-wrap {
      margin-top: 24px;
      margin-bottom: 10px;
    }
    .footer-bg-wordmark {
      font-size: clamp(24px, 8vw, 42px);
      letter-spacing: 0.005em;
    }
  }
  @media (max-width: 420px) {
    .footer-bg-wordmark {
      font-size: clamp(20px, 7vw, 32px);
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const { t } = useTranslation();
  const brand = 'Conquer Computers LLC';
  const footerRef = useRef<HTMLElement>(null);
  const [glowsVisible, setGlowsVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setGlowsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const email = 'info@conquercomputers.com';
  const phoneDisplay = '+971 54 343 3553';
  const phoneTel = '+971543433553';

  const companyLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const resourceLinks = [
    { to: '/blog', label: t('footer.blog') },
    { to: '/projects', label: t('footer.case_studies') },
    { to: '/contact', label: t('footer.support') },
    { to: '/contact', label: t('footer.faq') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const legalLinks = [
    { to: '/privacy', label: t('footer.privacy') },
    { to: '/terms', label: t('footer.terms') },
    { to: '/cookies', label: t('footer.cookies') },
  ];

  const socials = [
    { href: 'https://facebook.com/conquercomputersdubai.007', label: t('footer.facebook'), Icon: FaFacebookF },
    { href: 'https://instagram.com/conquerdxb', label: t('footer.instagram'), Icon: FaInstagram },
    { href: 'https://www.linkedin.com/search/results/all/?keywords=Conquer%20Computers%20LLC', label: t('footer.linkedin'), Icon: FaLinkedinIn },
    { href: 'https://wa.me/971543433553', label: t('footer.whatsapp'), Icon: FaTiktok },
  ];

  const description = t('footer.description');

  return (
    <footer ref={footerRef} className="footer relative mt-auto w-full overflow-hidden text-white">
      <style>{footerWordmarkStyles}</style>

      {/* Subtle ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className={`absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-blue-600/20 blur-[120px] transition-all duration-[1200ms] ease-out ${glowsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.85]'}`} />
        <div className={`absolute bottom-[-4rem] right-[6%] h-80 w-80 rounded-full bg-cyan-500/15 blur-[130px] transition-all duration-[1400ms] ease-out ${glowsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.85]'}`} />
        <div className={`absolute top-1/3 left-1/2 h-64 w-[44rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-indigo-700/10 blur-[140px] transition-all duration-[1600ms] ease-out ${glowsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.85]'}`} />
      </div>

      {/* Footer content */}
      <div className="relative z-[2] px-[clamp(18px,5vw,72px)] pt-[clamp(56px,7vw,100px)] pb-8 sm:pb-10">
        <div className="flex w-full flex-col gap-6 sm:gap-4 lg:flex-row lg:items-start lg:gap-16 max-w-[1400px] mx-auto">
          <div className="w-full lg:w-[340px] xl:w-[380px] lg:shrink-0">
            <Link to="/" className="inline-flex items-center gap-3 sm:gap-4 rounded-xl outline-offset-4">
              <LogoImage
                src="https://public.readdy.ai/ai/img_res/430aa2dc-e34b-494e-9720-e5eff724c394.png"
                alt="Conquer Computers LLC Logo"
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain block"
              />
              <div className="flex items-center gap-1 sm:gap-1.5 leading-none whitespace-nowrap brand-text-glow">
                <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold tracking-[0.12em] uppercase bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  CONQUER
                </span>
                <span className="text-[10px] sm:text-xs lg:text-sm font-light tracking-[0.08em] uppercase text-cyan-400/90">
                  COMPUTERS LLC
                </span>
              </div>
            </Link>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-sm">{description}</p>
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <SocialIcon key={label} href={href} label={label}>
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                </SocialIcon>
              ))}
            </div>
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-400">
              <a href={`tel:${phoneTel}`} className="font-medium text-white hover:text-cyan-300 hover:underline whitespace-nowrap transition-colors">{phoneDisplay}</a>
              <span className="text-slate-600" aria-hidden>·</span>
              <a href={`mailto:${email}`} className="break-all font-medium text-white hover:text-cyan-300 hover:underline transition-colors">{email}</a>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-6 sm:gap-y-8 lg:flex-1 lg:justify-items-start lg:mt-[clamp(24px,3vw,48px)]">
            <LinkColumn title={t('footer.company')} links={companyLinks} />
            <LinkColumn title={t('footer.resources')} links={resourceLinks} />
            <LinkColumn title={t('footer.legal')} links={legalLinks} />
          </div>
        </div>
      </div>

      {/* Wordmark below content */}
      <div className="footer-wordmark-wrap" aria-hidden>
        <div className="footer-bg-wordmark">CONQUER COMPUTERS</div>
      </div>

      {/* Copyright bar */}
      <div className="footer-bottom relative z-[2] w-full border-t border-[rgba(0,200,255,0.10)] backdrop-blur-sm bg-[rgba(7,18,38,0.35)] px-5 sm:px-10 py-3 sm:py-4 text-center text-[10px] sm:text-xs text-slate-300/85 lg:px-14 xl:px-16">
        &copy; {new Date().getFullYear()} {brand}. {t('footer.copyright')}
      </div>
    </footer>
  );
}