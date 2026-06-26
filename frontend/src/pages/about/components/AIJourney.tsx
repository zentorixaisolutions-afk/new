import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useScrollPosition';

gsap.registerPlugin(ScrollTrigger);

const ROBOT = '/about-anim/robot.png';

const PARAGRAPHS = [
  'Conquer Computers LLC is a trusted IT solutions company based in Deira, Dubai, serving businesses across the UAE since 1997. With over 27 years of experience, we deliver reliable technology services including IT support, managed services, CCTV systems, networking, cloud solutions, cybersecurity, business automation, and digital solutions.',
  'We believe technology should make your business easier, safer, and more efficient. Every solution we provide is designed to be practical, secure, scalable, and easy to manage \u2014 built around your business goals, not just technical requirements.',
  'Our team combines hands-on technical expertise with a strong commitment to customer satisfaction. Whether you need structured cabling for a new office, a complete network setup, cloud migration, CCTV installation, or ongoing IT support, we deliver professional solutions on time and within budget.',
];

// smooth 0..1 within a scroll window
function win(p: number, a: number, b: number) {
  return Math.max(0, Math.min(1, (p - a) / (b - a)));
}

export default function AIJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const paraRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const setEl = (el: Element | null | undefined, o: number, y: number) => {
      if (el) gsap.set(el, { opacity: o, y });
    };

    const render = (p: number) => {
      // robot: enter + gentle parallax / scale through the whole section
      const ep = win(p, 0, 0.12);
      if (robotRef.current) {
        gsap.set(robotRef.current, {
          opacity: 0.25 + ep * 0.75,
          x: (1 - ep) * 70,
          y: -p * 46,
          scale: 0.92 + ep * 0.08 + p * 0.05,
        });
      }
      // progress bar under heading
      if (barRef.current) barRef.current.style.transform = `scaleX(${0.06 + p * 0.94})`;

      // text reveals (accumulate, smooth)
      const h = win(p, 0.02, 0.13);
      setEl(headingRef.current, h, (1 - h) * 28);
      const tg = win(p, 0.08, 0.2);
      setEl(taglineRef.current, tg, (1 - tg) * 24);

      const windows = [
        [0.2, 0.4],
        [0.43, 0.63],
        [0.66, 0.86],
      ];
      windows.forEach((w, i) => {
        const t = win(p, w[0], w[1]);
        setEl(paraRefs.current[i], t, (1 - t) * 26);
      });

      // scroll hint fades early
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 1 - win(p, 0, 0.1) });
    };

    if (prefersReduced) {
      setEl(headingRef.current, 1, 0);
      setEl(taglineRef.current, 1, 0);
      paraRefs.current.forEach((el) => setEl(el, 1, 0));
      if (robotRef.current) gsap.set(robotRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=2200',
        pin: pin,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: () => render(0),
      });
      render(0);
    }, section);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div ref={sectionRef} data-testid="ai-journey-section" className="relative">
      <div
        ref={pinRef}
        data-testid="ai-journey-pin"
        className="relative h-screen w-full overflow-hidden flex items-center"
      >
        {/* robot — background already comes from the site Layout */}
        <div
          ref={robotRef}
          data-testid="ai-journey-robot"
          className="absolute z-0 right-[-6%] sm:right-[-3%] lg:right-[2%] bottom-0 h-[62%] sm:h-[78%] lg:h-[92%] pointer-events-none select-none"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* glow halo behind robot */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse"
            style={{
              width: '120%',
              height: '120%',
              background:
                'radial-gradient(circle at 50% 45%, rgba(34,211,238,0.28) 0%, rgba(37,99,235,0.12) 38%, transparent 68%)',
              filter: 'blur(14px)',
            }}
          />
          <img
            src={ROBOT}
            alt="Conquer Computers AI"
            className="h-full w-auto object-contain animate-float"
            style={{ filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.55))' }}
            draggable={false}
          />
        </div>

        {/* text */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20">
          <div className="max-w-[min(100%,640px)]">
            <div ref={headingRef} style={{ opacity: 0 }}>
              <span className="block text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.34em] text-primary-300 mb-3">
                About Us
              </span>
              <h2
                data-testid="ai-journey-heading"
                className="text-[clamp(2rem,7vw,3.75rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-white"
                style={{ fontFamily: '"Space Grotesk", sans-serif', textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
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
                  style={{ opacity: 0 }}
                  className="text-sm sm:text-base md:text-[1.05rem] leading-relaxed text-foreground-100/80 max-w-xl"
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
      </div>
    </div>
  );
}
