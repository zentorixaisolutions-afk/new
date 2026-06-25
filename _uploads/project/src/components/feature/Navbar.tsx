import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import LogoImage from '@/components/base/LogoImage';

const NAV_LINKS = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.services', path: '/services' },
  { labelKey: 'nav.projects', path: '/projects' },
  { labelKey: 'nav.blog', path: '/blog' },
  { labelKey: 'nav.contact', path: '/contact' },
];

const LANGUAGES: { code: string; labelKey: string; native: string }[] = [
  { code: 'en', labelKey: 'lang.en', native: 'EN' },
  { code: 'si', labelKey: 'lang.si', native: 'සිං' },
  { code: 'ar', labelKey: 'lang.ar', native: 'AR' },
  { code: 'zh', labelKey: 'lang.zh', native: '中文' },
  { code: 'ja', labelKey: 'lang.ja', native: '日本語' },
  { code: 'fr', labelKey: 'lang.fr', native: 'FR' },
  { code: 'it', labelKey: 'lang.it', native: 'IT' },
  { code: 'af', labelKey: 'lang.af', native: 'AF' },
  { code: 'hi', labelKey: 'lang.hi', native: 'हि' },
  { code: 'ur', labelKey: 'lang.ur', native: 'UR' },
  { code: 'ta', labelKey: 'lang.ta', native: 'த' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { scrollDirection, scrollY } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const langRefMobile = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileOpen]);

  // Close language dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      const node = e.target as Node;
      const insideDesktop = langRef.current?.contains(node);
      const insideMobile = langRefMobile.current?.contains(node);
      if (!insideDesktop && !insideMobile) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [langOpen]);

  // Set document dir for RTL
  const changeLang = useCallback((code: string) => {
    i18n.changeLanguage(code);
    try { localStorage.setItem('sins-lang', code); } catch { /* noop */ }
    setLangOpen(false);
    document.documentElement.dir = (code === 'ar' || code === 'ur') ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  }, [i18n]);

  // Restore language on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sins-lang');
      if (saved && ['en', 'si', 'ar', 'zh', 'ja', 'fr', 'it', 'af', 'hi', 'ur', 'ta'].includes(saved) && saved !== i18n.language) {
        i18n.changeLanguage(saved);
        document.documentElement.dir = (saved === 'ar' || saved === 'ur') ? 'rtl' : 'ltr';
        document.documentElement.lang = saved;
      }
    } catch { /* noop */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smart hide: hides on scroll down, reveals on scroll up
  const navClasses = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
    'pt-[env(safe-area-inset-top)]',
    scrollDirection === 'down' && scrollY > 40 && !mobileOpen ? '-translate-y-full' : 'translate-y-0',
    scrollY > 40
      ? 'bg-[rgba(2,8,20,0.5)] backdrop-blur-[16px]'
      : 'bg-transparent',
    'text-white',
  ]
    .filter(Boolean)
    .join(' ');

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  return (
    <nav ref={navRef} className={navClasses} role="navigation" aria-label={t('nav.menu_open')}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 xl:px-6">
        <div className="flex items-center justify-between h-20 sm:h-[80px] md:h-[88px] lg:h-[96px] xl:h-[104px]">
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 whitespace-nowrap cursor-pointer min-w-0 flex-shrink-0"
          >
            <LogoImage
              src="https://public.readdy.ai/ai/img_res/430aa2dc-e34b-494e-9720-e5eff724c394.png"
              alt="Conquer Computers LLC Logo"
              className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto object-contain flex-shrink-0"
            />
            <div className="flex items-center gap-1 sm:gap-1.5 leading-none whitespace-nowrap brand-text-glow">
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-[15px] xl:text-base font-extrabold tracking-[0.12em] uppercase bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                CONQUER
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-[15px] xl:text-base font-light tracking-[0.08em] uppercase text-cyan-400/90">
                COMPUTERS LLC
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5" role="menubar">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-all duration-300 group inline-block ${
                  location.pathname === link.path
                    ? 'text-cyan-300'
                    : 'text-white/75 hover:text-cyan-200 hover:scale-105'
                }`}
                role="menuitem"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Desktop controls */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-white/10 text-white"
              aria-label={theme === 'dark' ? t('theme.switch_light') : t('theme.switch_dark')}
            >
              {theme === 'dark' ? (
                <i className="ri-sun-line text-lg" />
              ) : (
                <i className="ri-moon-line text-lg" />
              )}
            </button>

            {/* Language Selector - Desktop */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-white/10 whitespace-nowrap text-white/90"
                aria-label={t('lang.select')}
              >
                <i className="ri-global-line text-base" />
                <span>{currentLang.native}</span>
                <i className={`ri-arrow-down-s-line text-xs transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="nav-lang-dropdown absolute top-full right-0 mt-1 bg-[rgba(7,18,38,0.95)] border border-[rgba(0,200,255,0.14)] rounded-xl shadow-lg py-1 min-w-[130px] z-50 backdrop-blur-xl">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 hover:bg-white/5 whitespace-nowrap ${
                        i18n.language === lang.code
                          ? 'text-cyan-300 font-semibold'
                          : 'text-white/80'
                      }`}
                    >
                      {t(lang.labelKey)}
                      {i18n.language === lang.code && (
                        <i className="ri-check-line ml-2 text-xs" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="whitespace-nowrap cursor-pointer px-5 py-2.5 rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors duration-200 ml-1 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              {t('nav.get_quote')}
            </Link>
          </div>

          {/* Mobile hamburger + controls */}
          <div className="flex lg:hidden items-center gap-0.5 sm:gap-1 flex-shrink-0">
            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 text-white/90"
              aria-label={theme === 'dark' ? t('theme.switch_light') : t('theme.switch_dark')}
            >
              {theme === 'dark' ? (
                <i className="ri-sun-line text-base sm:text-lg" />
              ) : (
                <i className="ri-moon-line text-base sm:text-lg" />
              )}
            </button>

            {/* Language Selector - Mobile */}
            <div ref={langRefMobile} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-0.5 px-1.5 sm:px-2 py-1.5 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap text-white/90"
                aria-label={t('lang.select')}
              >
                <i className="ri-global-line text-sm sm:text-base" />
                <span className="hidden xs:inline">
                  {currentLang.native}
                </span>
                <i className={`ri-arrow-down-s-line text-[10px] sm:text-xs transition-transform duration-200 ${langOpen ? 'rotate-180' : ''} hidden xs:inline`} />
              </button>

              {langOpen && (
                <div className="nav-lang-dropdown absolute top-full right-0 mt-1 bg-[rgba(7,18,38,0.95)] border border-[rgba(0,200,255,0.14)] rounded-xl shadow-lg py-1 min-w-[110px] sm:min-w-[130px] z-50 max-h-[60vh] overflow-y-auto backdrop-blur-xl">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors duration-150 hover:bg-white/5 whitespace-nowrap ${
                        i18n.language === lang.code
                          ? 'text-cyan-300 font-semibold'
                          : 'text-white/80'
                      }`}
                    >
                      {t(lang.labelKey)}
                      {i18n.language === lang.code && (
                        <i className="ri-check-line ml-2 text-xs" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg cursor-pointer flex-shrink-0 ml-0.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t('nav.close_menu') : t('nav.open_menu')}
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <span
                  className={`block w-4 sm:w-5 h-[2px] transition-all duration-300 bg-white ${mobileOpen ? 'rotate-45 translate-y-[5px] sm:translate-y-[7px]' : ''}`}
                />
                <span
                  className={`block w-4 sm:w-5 h-[2px] transition-all duration-300 bg-white ${mobileOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block w-4 sm:w-5 h-[2px] transition-all duration-300 bg-white ${mobileOpen ? '-rotate-45 -translate-y-[5px] sm:-translate-y-[7px]' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[rgba(7,18,38,0.95)] border-t border-[rgba(0,200,255,0.12)] px-4 py-5 space-y-1 backdrop-blur-xl">
          {/* Mobile nav links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3.5 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-cyan-300'
                  : 'text-white/75 hover:text-cyan-200'
              }`}
              onClick={closeMenu}
            >
              {t(link.labelKey)}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-[rgba(0,200,255,0.12)] my-3" />

          {/* Mobile CTA */}
          <div className="px-4 pt-1">
            <Link
              to="/contact"
              className="block w-full text-center whitespace-nowrap cursor-pointer px-5 py-3.5 rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              onClick={closeMenu}
            >
              {t('nav.get_quote')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}