# Conquer Computers LLC — Website (Vite + React 19 + TS)

## Original Problem Statement
User provided their existing website (ZIP) + asset packs (robot image frame sequences + a robot video).
Request: On the **About page**, replace/upgrade the animation with a premium **3D-style scroll animation**:
1. On scroll, a robot appears **thinking**.
2. On further scroll, the robot **takes a tablet and checks it**.
3. On further scroll, a **time/clock animation** shows time passing (preview-style).
Goal: make it a polished "3D animated website".

## Tech Stack / Architecture
- Frontend: **Vite 8 + React 19 + TypeScript + Tailwind**, GSAP (ScrollTrigger), react-i18next, Supabase (external, readdy.ai export).
- The user's Vite project was migrated into `/app/frontend` and runs via supervisor `yarn start` -> `vite` on port 3000 (vite.config: host 0.0.0.0, allowedHosts true, hmr clientPort 443/wss).
- Backend: FastAPI boilerplate in `/app/backend` (unused by this site; data comes from external Supabase).

## What's Been Implemented (2026-06-25)
- Migrated full Vite project into `/app/frontend`; site builds & runs in preview.
- New component **`src/pages/about/components/AIJourney.tsx`** inserted on About page right after `AboutHero`:
  - GSAP ScrollTrigger **pinned** stage (100vh), scrubbed over 2600px.
  - Beat 1 (0–40%): canvas scrubs **thinking** frame sequence (51 frames) — caption "We understand the problem".
  - Beat 2 (40–72%): canvas scrubs **tablet** frame sequence (51 frames) — caption "We analyse & diagnose".
  - Beat 3 (72–100%): cross-fades to a custom **neon SVG clock** (spinning hands + progress arc + Orbitron digital readout) — caption "Solved — right on time".
  - Step indicator (01/02/03), radial mask blends light robot frames into dark navy bg, reduced-motion fallback.
- Assets copied to `public/about-anim/{thinking,tablet}/ezgif-frame-XXX.jpg` and `public/about-anim/robot-clip.mp4`.
- Fix: removed `will-change: transform` from `.page-transition-content` in `index.css` (it created a containing block that broke ScrollTrigger pin). Kept `will-change: opacity`.

### Asset mapping (from uploads)
- thinking = ezgif seq "73b2d2073ecaa93d" (seq2 hand-on-chin)… actually thinking=seq3, tablet=seq2 after analysis. Frames are 1168x784 light-blue bg.
- No uploaded asset showed a clock, so the time scene is a built-from-scratch neon SVG clock.

## Verified
- Pin holds (pinTop=0) through all 3 beats; captions/canvas/clock crossfade at correct scroll points (desktop 1920 + mobile 414). Page flows into CompanyIntroduction after.

## Notes / Known
- Site shows a one-time **IntroLoader** (external readdy video; 10s fallback). To test, set `sessionStorage['conquer-intro-shown']='true'` then reload.
- Some external readdy-site.link media (hero/about videos) may not load in preview (ERR_ABORTED) — pre-existing, not in scope.

## Update (2026-06-26) — Revised AIJourney per user feedback
- Replaced the 3-beat (thinking/tablet/clock) version with a SINGLE scroll-reveal section (still pinned, right after AboutHero).
- Robot image background removed via `rembg` -> transparent `public/about-anim/robot.png` (cut from uploaded image 1). Old frame folders + clock removed.
- Section background is now TRANSPARENT so the site's own Layout background shows through (per user request).
- On scroll: robot cutout animates (entrance + parallax drift + scale + idle float + glow halo) while text builds progressively & smoothly: heading "CONQUER COMPUTERS" -> tagline "Real Technology. Real Results." -> 3 company paragraphs (exact copy from user's storyboard images).
- testids: ai-journey-section, ai-journey-pin, ai-journey-robot, ai-journey-heading, ai-journey-tagline, ai-journey-para-0/1/2.
- Verified pin holds (pinTop=0) and progressive reveal works (desktop + mobile data).
- NOTE: text overlaps in content with the existing `CompanyIntroduction` section below — left intact per instructions; can be removed on request.

## Backlog / Next
- P1: Soften top edge of robot frames slightly more / optional parallax on robot.
- P2: Add subtle ambient particle layer behind clock; localize AIJourney copy via i18n.
- P2: Replace external readdy media with self-hosted if user wants full offline reliability.
