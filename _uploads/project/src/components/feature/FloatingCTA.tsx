import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '@/hooks/useScrollPosition';

const WHATSAPP_NUMBER = '+971543433553';
const WHATSAPP_MESSAGE = encodeURIComponent('Hi Conquer Computers Team, I need IT support. Please contact me with more details and a quotation.');

export default function FloatingCTA() {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-40 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${prefersReduced ? '' : 'animate-float'}`}
      style={{
        bottom: `calc(1rem + env(safe-area-inset-bottom, 0px))`,
        right: `calc(0.75rem + env(safe-area-inset-right, 0px))`,
      }}
      aria-label={t('floating.chat')}
    >
      <img src="https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/76a6e9fa-b159-45c1-9374-f161ee5cde3f_whatsapp-icon-free-png.webp" alt="WhatsApp" className="w-full h-full object-cover" />
    </a>
  );
}