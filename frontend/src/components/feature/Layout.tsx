import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingCTA from '@/components/feature/FloatingCTA';
import CookieConsent from '@/components/feature/CookieConsent';
import ScrollToTop from '@/components/feature/ScrollToTop';
import PageTransition from '@/components/feature/PageTransition';
import useSmoothScroll from '@/hooks/useSmoothScroll';

export default function Layout() {
  useSmoothScroll();

  return (
    <ThemeProvider>
      <div className="min-h-dvh flex flex-col overflow-x-hidden relative">
        {/* Fixed background layer — stays locked, content scrolls over it */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'url(https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/cb30e3b4-1318-4933-9c0b-e7f03eed4578_compressed_b4297cee5011eb5c0c601ed9dd32a701.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            opacity: 0.55,
            imageRendering: 'auto',
          }}
        />
        {/* Dark overlay — reduced so background shines through */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#01040a]/70 via-[#01040a]/60 to-[#01040a]/70" />
        {/* Glowing radial accents */}
        <div className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 20%, rgba(0,174,255,0.12) 0%, transparent 35%), radial-gradient(circle at 80% 40%, rgba(88,80,255,0.08) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(0,200,255,0.06) 0%, transparent 50%)',
          }}
        />
        <Navbar />
        <main className="flex-1 relative z-10">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        <FloatingCTA />
        <ScrollToTop />
        <CookieConsent />
      </div>
    </ThemeProvider>
  );
}