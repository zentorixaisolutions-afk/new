import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useScrollPosition';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 68;
const FRAME_BASE = '/about-anim/frames/f_';
const frameSrc = (n: number) => `${FRAME_BASE}${String(n).padStart(3, '0')}.jpg`;

// feather only the outer edge so the frame fully covers the section yet dissolves into the page
const EDGE_MASK = 'radial-gradient(135% 130% at 50% 48%, #000 72%, transparent 100%)';

const PARAGRAPHS = [
  'Conquer Computers LLC is a trusted IT solutions company based in Deira, Dubai, serving businesses across the UAE since 1997. With over 27 years of experience, we deliver reliable technology services including IT support, managed services, CCTV systems, networking, cloud solutions, cybersecurity, business automation, and digital solutions.',
  'We believe technology should make your business easier, safer, and more efficient. Every solution we provide is designed to be practical, secure, scalable, and easy to manage \u2014 built around your business goals, not just technical requirements.',
  'Our team combines hands-on technical expertise with a strong commitment to customer satisfaction. Whether you need structured cabling for a new office, a complete network setup, cloud migration, CCTV installation, or ongoing IT support, we deliver professional solutions on time and within budget.',
];

function win(p: number, a: number, b: number) {
  return Math.max(0, Math.min(1, (p - a) / (b - a)));
}

export default function AIJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const paraRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  const imgs = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const prefersReduced = useReducedMotion();

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img = imgs.current[idx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
    } else {
      dw = cw;
      dh = cw / ir;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }, []);

  // preload frame sequence
  useEffect(() => {
    let cancelled = false;
    imgs.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i + 1);
      return img;
    });
    const ready = () => {
      if (cancelled) return;
      setLoaded(true);
      sizeCanvas();
      drawFrame(0);
    };
    const first = imgs.current[0];
    if (first.complete && first.naturalWidth > 0) ready();
    else {
      first.onload = ready;
      first.onerror = ready;
    }
    const fallback = setTimeout(ready, 3000);
    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [drawFrame, sizeCanvas]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const setEl = (el: Element | null | undefined, o: number, y: number) => {
      if (el) gsap.set(el, { opacity: o, y });
    };

    const render = (p: number) => {
      // scrub the scene frames with scroll (working -> transition -> handshake)
      const idx = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)));
      drawFrame(idx);

      if (barRef.current) barRef.current.style.transform = `scaleX(${0.06 + p * 0.94})`;

      const h = win(p, 0.02, 0.13);
      setEl(headingRef.current, h, (1 - h) * 28);
      const tg = win(p, 0.08, 0.2);
      setEl(taglineRef.current, tg, (1 - tg) * 24);
      [
        [0.18, 0.36],
        [0.4, 0.58],
        [0.62, 0.8],
      ].forEach((w, i) => {
        const t = win(p, w[0], w[1]);
        setEl(paraRefs.current[i], t, (1 - t) * 26);
      });
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 1 - win(p, 0, 0.1) });
    };

    if (prefersReduced) {
      drawFrame(0);
      setEl(headingRef.current, 1, 0);
      setEl(taglineRef.current, 1, 0);
      paraRefs.current.forEach((el) => setEl(el, 1, 0));
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=2600',
        pin: pin,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: () => {
          sizeCanvas();
          render(0);
        },
      });
      render(0);
    }, section);

    const onResize = () => {
      sizeCanvas();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [loaded, prefersReduced, drawFrame, sizeCanvas]);

  return (
    <div ref={sectionRef} data-testid="ai-journey-section" className="relative">
      <div
        ref={pinRef}
        data-testid="ai-journey-pin"
        className="relative h-screen w-full overflow-hidden flex items-center"
      >
        {/* === full-cover scene frames, blended into the page background === */}
        <canvas
          ref={canvasRef}
          data-testid="ai-journey-canvas"
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            filter: 'brightness(0.6) contrast(1.06) saturate(1.18)',
            opacity: 0.95,
            maskImage: EDGE_MASK,
            WebkitMaskImage: EDGE_MASK,
          }}
        />
        {/* navy tint pushes the light video into the site's dark palette */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: '#0a1628',
            mixBlendMode: 'multiply',
            opacity: 0.5,
            maskImage: EDGE_MASK,
            WebkitMaskImage: EDGE_MASK,
          }}
        />
        {/* legibility gradient on the left */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(3,9,22,0.94) 0%, rgba(3,9,22,0.66) 32%, rgba(3,9,22,0.2) 56%, transparent 78%)',
          }}
        />
        {/* top & bottom seam fade so it connects to the rest of the page */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(6,14,28,0.92) 0%, transparent 15%, transparent 80%, rgba(6,14,28,0.95) 100%)',
          }}
        />

        {/* === content === */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20">
          <div className="max-w-[min(100%,640px)]">
            <div ref={headingRef} style={{ opacity: 0 }}>
              <span className="block text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.34em] text-primary-300 mb-3">
                About Us
              </span>
              <h2
                data-testid="ai-journey-heading"
                className="text-[clamp(2rem,7vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-white"
                style={{ fontFamily: '"Space Grotesk", sans-serif', textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}
              >
                Conquer<br className="hidden sm:block" /> Computers
              </h2>
              <span className="mt-4 mb-5 block h-[3px] w-28 origin-left rounded-full bg-gradient-to-r from-primary-300 to-accent-500">
                <span ref={barRef} className="block h-full w-full origin-left rounded-full bg-primary-200" />
              </span>
            </div>

            <div
              ref={taglineRef}
              data-testid="ai-journey-tagline"
              style={{ opacity: 0 }}
              className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-200 mb-7"
            >
              Real Technology. Real Results.
            </div>

            <div className="space-y-4 sm:space-y-5">
              {PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  ref={(el) => {
                    paraRefs.current[i] = el;
                  }}
                  data-testid={`ai-journey-para-${i}`}
                  style={{ opacity: 0, textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
                  className="text-sm sm:text-base md:text-[1.05rem] leading-relaxed text-foreground-100/85 max-w-xl"
                >
                  {para}
                </p>
              ))}
            </div>

            <div
              ref={hintRef}
              className="mt-9 flex items-center gap-3 text-foreground-200/45 text-[0.7rem] tracking-[0.22em] uppercase"
            >
              <span>Scroll to read</span>
              <span className="relative flex h-6 w-4 items-start justify-center rounded-full border border-foreground-200/30">
                <span className="mt-1 h-1.5 w-0.5 rounded-full bg-primary-300 animate-bounce" />
              </span>
            </div>
          </div>
        </div>

        {!loaded && (
          <div className="absolute inset-0 z-[2] flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-2 border-primary-400/40 border-t-primary-300 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
