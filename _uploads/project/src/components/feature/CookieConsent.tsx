import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'sins-cookie-consent';
type ConsentChoice = 'accepted' | 'essential' | 'declined' | null;

function getStoredConsent(): ConsentChoice {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted' || stored === 'essential' || stored === 'declined') return stored;
    return null;
  } catch {
    /* localStorage unavailable */
    return null;
  }
}

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = useCallback((choice: ConsentChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice || 'declined');
    } catch {
      /* noop */
    }
    setExiting(true);
    setTimeout(() => setVisible(false), 300);
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none px-3 sm:px-5 pb-3 sm:pb-5 transition-all duration-300 ${exiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} role="dialog" aria-label="Cookie consent">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <div className="bg-background-50/95 dark:bg-[#0a1628]/95 backdrop-blur-lg border border-background-200/80 dark:border-slate-700/60 rounded-2xl px-5 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className="ri-shield-check-line text-accent-500 text-xs sm:text-sm" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs md:text-sm text-foreground-800 dark:text-slate-300 leading-relaxed">
                  {t('cookie.text')}
                  {' '}
                  <a href="#" className="text-accent-500 hover:text-accent-600 underline underline-offset-2 whitespace-nowrap">{t('cookie.policy')}</a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 flex-wrap">
              <button type="button" onClick={() => handleChoice('declined')} className="whitespace-nowrap cursor-pointer text-[11px] sm:text-xs md:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-foreground-500 dark:text-slate-400 hover:text-foreground-700 dark:hover:text-white hover:bg-background-100 dark:hover:bg-white/5 transition-colors duration-200">{t('cookie.decline')}</button>
              <button type="button" onClick={() => handleChoice('essential')} className="whitespace-nowrap cursor-pointer text-[11px] sm:text-xs md:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-background-300 dark:border-slate-600 text-foreground-700 dark:text-slate-300 hover:bg-background-100 dark:hover:bg-white/5 transition-colors duration-200">{t('cookie.essential')}</button>
              <button type="button" onClick={() => handleChoice('accepted')} className="whitespace-nowrap cursor-pointer text-[11px] sm:text-xs md:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-accent-500 text-white hover:bg-accent-600 active:scale-[0.98] transition-all duration-200">{t('cookie.accept')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}