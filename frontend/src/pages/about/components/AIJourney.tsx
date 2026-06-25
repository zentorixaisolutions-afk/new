import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useScrollPosition';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 51;
const THINK_BASE = '/about-anim/thinking/ezgif-frame-';
const TABLET_BASE = '/about-anim/tablet/ezgif-frame-';

function framePath(base: string, n: number) {
  return `${base}${String(n).padStart(3, '0')}.jpg`;
}

// scroll-progress windows for each beat
const W = {
  thinkStart: 0.0,
  thinkEnd: 0.4,
  tabletStart: 0.4,
  tabletEnd: 0.72,
  clockStart: 0.72,
  clockEnd: 1.0,
};

const BEATS = [
  {
    step: '01',
    tag: 'Listen',
    title: 'We understand the problem',
    desc: 'Every engagement starts with deep thinking. Our specialists study your environment, ask the right questions and map the real challenge before touching a single cable.',
  },
  {
    step: '02',
    tag: 'Diagnose',
    title: 'We analyse & diagnose',
    desc: 'Live diagnostics on the move. We assess your network, hardware and security in real time — pinpointing exactly what needs to be fixed, upgraded or protected.',
  },
  {
    step: '03',
    tag: 'Deliver',
    title: 'Solved — right on time',
    desc: 'Fast, dependable turnaround. With 27+ years of expertise across Dubai, we deliver the resolution precisely when you need it — every single time.',
  },
];

export default function AIJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clockWrapRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);

  const thinkImgs = useRef<HTMLImageElement[]>([]);
  const tabletImgs = useRef<HTMLImageElement[]>([]);
  const lastBeat = useRef<number>(-1);

  const [activeBeat, setActiveBeat] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const prefersReduced = useReducedMotion();

  const drawFrame = useCallback((img: HTMLImageElement | undefined) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    // contain fit
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number;
    if (ir > cr) {
      dw = cw;
      dh = cw / ir;
    } else {
      dh = ch;
      dw = ch * ir;
    }
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

  // preload frames
  useEffect(() => {
    let cancelled = false;
    const load = (base: string) =>
      Array.from({ length: FRAME_COUNT }, (_, i) => {
        const img = new Image();
        img.src = framePath(base, i + 1);
        return img;
      });
    thinkImgs.current = load(THINK_BASE);
    tabletImgs.current = load(TABLET_BASE);

    const first = thinkImgs.current[0];
    const markReady = () => {
      if (cancelled) return;
      setLoaded(true);
      sizeCanvas();
      drawFrame(thinkImgs.current[0]);
    };
    if (first.complete && first.naturalWidth > 0) markReady();
    else {
      first.onload = markReady;
      first.onerror = markReady;
    }
    // safety: never hang the loader
    const fallback = setTimeout(markReady, 3000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [drawFrame, sizeCanvas]);

  // scroll-driven render
  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const render = (p: number) => {
      let beat = 0;
      if (p >= W.clockStart) beat = 2;
      else if (p >= W.tabletStart) beat = 1;

      if (beat !== lastBeat.current) {
        lastBeat.current = beat;
        setActiveBeat(beat);
      }

      const canvas = canvasRef.current;
      const clock = clockWrapRef.current;

      if (beat === 0) {
        const t = gsap.utils.clamp(0, 1, (p - W.thinkStart) / (W.thinkEnd - W.thinkStart));
        const idx = Math.min(FRAME_COUNT - 1, Math.floor(t * (FRAME_COUNT - 1)));
        drawFrame(thinkImgs.current[idx]);
        if (canvas) gsap.set(canvas, { opacity: 1 });
        if (clock) gsap.set(clock, { opacity: 0 });
      } else if (beat === 1) {
        const t = gsap.utils.clamp(0, 1, (p - W.tabletStart) / (W.tabletEnd - W.tabletStart));
        const idx = Math.min(FRAME_COUNT - 1, Math.floor(t * (FRAME_COUNT - 1)));
        drawFrame(tabletImgs.current[idx]);
        if (canvas) gsap.set(canvas, { opacity: 1 });
        if (clock) gsap.set(clock, { opacity: 0 });
      } else {
        const t = gsap.utils.clamp(0, 1, (p - W.clockStart) / (W.clockEnd - W.clockStart));
        // cross-fade canvas -> clock
        const fade = gsap.utils.clamp(0, 1, t / 0.18);
        if (canvas) gsap.set(canvas, { opacity: 1 - fade });
        if (clock) gsap.set(clock, { opacity: fade });
        // spin hands — time-lapse feel
        const minuteDeg = t * 360 * 12; // 12 full minute revolutions
        const hourDeg = t * 360; // 1 full hour-hand revolution
        const secondDeg = t * 360 * 60;
        if (minuteRef.current) gsap.set(minuteRef.current, { rotate: minuteDeg });
        if (hourRef.current) gsap.set(hourRef.current, { rotate: hourDeg });
        if (secondRef.current) gsap.set(secondRef.current, { rotate: secondDeg });
        if (arcRef.current) {
          const circ = 2 * Math.PI * 132;
          arcRef.current.style.strokeDashoffset = String(circ * (1 - t));
        }
        if (digitalRef.current) {
          const totalMin = Math.floor(t * 12 * 60); // up to 12h
          const hh = String(Math.floor(totalMin / 60)).padStart(2, '0');
          const mm = String(totalMin % 60).padStart(2, '0');
          digitalRef.current.textContent = `${hh}:${mm}`;
        }
      }
    };

    if (prefersReduced) {
      drawFrame(thinkImgs.current[0]);
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
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(8,51,68,0.55) 0%, rgba(6,14,28,0) 55%), linear-gradient(180deg, #060e1c 0%, #0a1628 100%)' }}
      >
        {/* grid texture */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'radial-gradient(circle at 50% 50%, #000 0%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 0%, transparent 78%)',
          }}
        />

        {/* eyebrow header */}
        <div className="absolute top-[max(5.5rem,9vh)] left-1/2 -translate-x-1/2 z-20 text-center px-4">
          <span className="block text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.32em] text-primary-300">
            How We Work
          </span>
          <h2
            className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-white"
            style={{ fontFamily: '"Orbitron", "Space Grotesk", sans-serif', letterSpacing: '0.02em' }}
          >
            Intelligence in Motion
          </h2>
        </div>

        {/* stage */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-10 items-center">
          {/* visual stage */}
          <div className="relative mx-auto w-full" style={{ maxWidth: 760 }}>
            <div className="relative w-full" style={{ aspectRatio: '1168 / 784' }}>
              {/* glow ring behind */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 60% at 50% 45%, rgba(34,211,238,0.22) 0%, rgba(37,99,235,0.10) 35%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
              <canvas
                ref={canvasRef}
                data-testid="ai-journey-canvas"
                className="absolute inset-0 w-full h-full"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 78% 80% at 50% 46%, #000 52%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 78% 80% at 50% 46%, #000 52%, transparent 100%)',
                }}
              />

              {/* CLOCK overlay */}
              <div
                ref={clockWrapRef}
                data-testid="ai-journey-clock"
                className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
              >
                <div className="relative" style={{ width: 'min(58%, 320px)', aspectRatio: '1 / 1' }}>
                  <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="clockArc" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#67e8f9" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    {/* outer rings */}
                    <circle cx="150" cy="150" r="146" fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="1" />
                    <circle cx="150" cy="150" r="132" fill="none" stroke="rgba(34,211,238,0.14)" strokeWidth="10" />
                    {/* progress arc */}
                    <circle
                      ref={arcRef}
                      cx="150"
                      cy="150"
                      r="132"
                      fill="none"
                      stroke="url(#clockArc)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 132}
                      strokeDashoffset={2 * Math.PI * 132}
                      transform="rotate(-90 150 150)"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }}
                    />
                    {/* tick marks */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const a = (i / 12) * Math.PI * 2;
                      const r1 = 116;
                      const r2 = i % 3 === 0 ? 100 : 108;
                      return (
                        <line
                          key={i}
                          x1={150 + r1 * Math.sin(a)}
                          y1={150 - r1 * Math.cos(a)}
                          x2={150 + r2 * Math.sin(a)}
                          y2={150 - r2 * Math.cos(a)}
                          stroke={i % 3 === 0 ? '#67e8f9' : 'rgba(143,170,227,0.55)'}
                          strokeWidth={i % 3 === 0 ? 3 : 1.5}
                          strokeLinecap="round"
                        />
                      );
                    })}
                    <circle cx="150" cy="150" r="7" fill="#67e8f9" style={{ filter: 'drop-shadow(0 0 5px rgba(34,211,238,0.9))' }} />
                  </svg>

                  {/* hands */}
                  <div ref={hourRef} className="absolute left-1/2 top-1/2 origin-bottom" style={{ width: 6, height: '26%', transform: 'translate(-50%,-100%)', background: 'linear-gradient(180deg,#e0f2fe,#67e8f9)', borderRadius: 6, boxShadow: '0 0 8px rgba(103,232,249,0.6)' }} />
                  <div ref={minuteRef} className="absolute left-1/2 top-1/2 origin-bottom" style={{ width: 4, height: '36%', transform: 'translate(-50%,-100%)', background: 'linear-gradient(180deg,#ffffff,#93c5fd)', borderRadius: 6, boxShadow: '0 0 8px rgba(147,197,253,0.6)' }} />
                  <div ref={secondRef} className="absolute left-1/2 top-1/2 origin-bottom" style={{ width: 2, height: '40%', transform: 'translate(-50%,-100%)', background: '#22d3ee', borderRadius: 6 }} />

                  {/* digital readout */}
                  <div
                    ref={digitalRef}
                    className="absolute left-1/2 -bottom-12 -translate-x-1/2 text-primary-200 text-lg sm:text-xl"
                    style={{ fontFamily: '"Orbitron", monospace', letterSpacing: '0.18em', textShadow: '0 0 12px rgba(34,211,238,0.6)' }}
                  >
                    00:00
                  </div>
                </div>
              </div>

              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full border-2 border-primary-400/40 border-t-primary-300 animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* caption */}
          <div className="relative z-10 text-center lg:text-left">
            {/* step indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-5">
              {BEATS.map((b, i) => (
                <div key={b.step} className="flex items-center gap-2.5">
                  <span
                    data-testid={`ai-journey-step-${i}`}
                    className="text-[0.65rem] font-semibold tracking-[0.2em] transition-colors duration-500"
                    style={{
                      fontFamily: '"Orbitron", sans-serif',
                      color: i === activeBeat ? '#67e8f9' : 'rgba(143,170,227,0.5)',
                    }}
                  >
                    {b.step}
                  </span>
                  {i < BEATS.length - 1 && (
                    <span
                      className="h-px w-7 transition-colors duration-500"
                      style={{ background: i < activeBeat ? '#22d3ee' : 'rgba(143,170,227,0.25)' }}
                    />
                  )}
                </div>
              ))}
            </div>

            {BEATS.map((b, i) => (
              <div
                key={b.step}
                data-testid={`ai-journey-caption-${i}`}
                className="transition-all duration-700 ease-out"
                style={{
                  display: i === activeBeat ? 'block' : 'none',
                }}
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.28em] text-primary-300 mb-3">
                  {b.tag}
                </span>
                <h3
                  className="text-2xl sm:text-3xl md:text-[2.5rem] font-semibold text-white leading-tight mb-4"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {b.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground-200/75 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {b.desc}
                </p>
              </div>
            ))}

            {/* scroll hint */}
            <div className="mt-8 hidden lg:flex items-center gap-3 text-foreground-200/40 text-xs tracking-[0.2em] uppercase">
              <span>Scroll to explore</span>
              <span className="relative flex h-6 w-4 items-start justify-center rounded-full border border-foreground-200/30">
                <span className="mt-1 h-1.5 w-0.5 rounded-full bg-primary-300 animate-bounce" />
              </span>
            </div>
          </div>
        </div>

        {/* bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0a1628)' }} />
      </div>
    </div>
  );
}
