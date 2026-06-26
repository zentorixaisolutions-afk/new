import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useScrollPosition';

gsap.registerPlugin(ScrollTrigger);

// feather mask so the video dissolves into the page (no hard edges / no box)
const EDGE_MASK =
  'radial-gradient(125% 125% at 68% 45%, #000 38%, rgba(0,0,0,0.65) 62%, transparent 82%)';

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
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const paraRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // keep the ambient video playing only while the section is on screen
  useEffect(() => {
    const v = videoRef.current;
    const pin = pinRef.current;
    if (!v || !pin) return;
    v.play().catch(() => {});
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.01 }
    );
    io.observe(pin);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const setEl = (el: Element | null | undefined, o: number, y: number) => {
      if (el) gsap.set(el, { opacity: o, y });
    };

    const render = (p: number) => {
      // video: subtle scroll-driven parallax + scale so it feels alive while scrolling
      if (videoWrapRef.current) {
        gsap.set(videoWrapRef.current, {
          scale: 1.06 + p * 0.06,
          yPercent: -p * 6,
          xPercent: p * 2,
        });
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${0.06 + p * 0.94})`;

      const h = win(p, 0.02, 0.13);
      setEl(headingRef.current, h, (1 - h) * 28);
      const tg = win(p, 0.08, 0.2);
      setEl(taglineRef.current, tg, (1 - tg) * 24);

      [
        [0.2, 0.4],
        [0.43, 0.63],
        [0.66, 0.86],
      ].forEach((w, i) => {
        const t = win(p, w[0], w[1]);
        setEl(paraRefs.current[i], t, (1 - t) * 26);
      });

      if (hintRef.current) gsap.set(hintRef.current, { opacity: 1 - win(p, 0, 0.1) });
    };

    if (prefersReduced) {
      setEl(headingRef.current, 1, 0);
      setEl(taglineRef.current, 1, 0);
      paraRefs.current.forEach((el) => setEl(el, 1, 0));
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 0 });
      if (videoWrapRef.current) gsap.set(videoWrapRef.current, { scale: 1.06 });
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
        {/* === blended robot video background (no box, feathered into the page) === */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          <video
            ref={videoRef}
            data-testid="ai-journey-video"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: '72% center',
              filter: 'brightness(0.62) contrast(1.06) saturate(1.18)',
              opacity: 0.92,
              maskImage: EDGE_MASK,
              WebkitMaskImage: EDGE_MASK,
            }}
            poster="/about-anim/robot-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
          >
            <source src="/about-anim/robot-bg.webm" type="video/webm" />
            <source src="/about-anim/robot-bg.mp4" type="video/mp4" />
          </video>
          {/* navy tint pushes the light video into the site's dark palette */}
          <div
            className="absolute inset-0"
            style={{
              background: '#0a1628',
              mixBlendMode: 'multiply',
              opacity: 0.55,
              maskImage: EDGE_MASK,
              WebkitMaskImage: EDGE_MASK,
            }}
          />
        </div>

        {/* legibility gradient on the left (transparent over the robot on the right) */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(3,9,22,0.92) 0%, rgba(3,9,22,0.62) 34%, rgba(3,9,22,0.18) 58%, transparent 78%)',
          }}
        />
        {/* top & bottom seam fade so it connects to the rest of the page */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(6,14,28,0.85) 0%, transparent 16%, transparent 82%, rgba(6,14,28,0.9) 100%)',
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
                  style={{ opacity: 0, textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}
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
      </div>
    </div>
  );
}
