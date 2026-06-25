import { useState, useEffect, useRef, useCallback } from "react";

const DESKTOP_VIDEO_URL = "https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/061d066c-fd51-41d8-a9d4-67fcabcaeae0_grok-video-e296e4ce-9447-4c13-b96c-f7c2c4bddce1.mp4";
const MOBILE_VIDEO_URL = "https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/419900ab-8282-40bc-9f2f-d9753ba06ec6_grok-video-95125cde-3833-4603-b863-0850e3270cff.mp4";

const INTRO_SHOWN_KEY = "conquer-intro-shown";

interface IntroLoaderProps {
  onComplete: () => void;
}

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<"loading" | "playing" | "fading" | "done">("loading");
  const [isMobile] = useState(() => isMobileDevice());
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videoUrl = isMobile ? MOBILE_VIDEO_URL : DESKTOP_VIDEO_URL;

  const finishIntro = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPhase("fading");
    setTimeout(() => {
      setPhase("done");
      onComplete();
      sessionStorage.setItem(INTRO_SHOWN_KEY, "true");
    }, 900);
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setPhase("playing");
      video.play().catch(() => {
        // Autoplay blocked — fallback timer handles it
      });
    };

    const handleEnded = () => {
      finishIntro();
    };

    const handleError = () => {
      // Video failed — fallback timer handles it
    };

    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Global fallback: hide intro after 10 seconds no matter what
    timeoutRef.current = setTimeout(() => {
      finishIntro();
    }, 10000);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [finishIntro]);

  const isVisible = phase !== "done";
  const isFading = phase === "fading";

  if (!isVisible) return null;

  return (
    <div className={`intro-loader ${isFading ? "intro-loader--fade-out" : ""}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="intro-loader__video"
        src={videoUrl}
        preload="auto"
        muted
        playsInline
        autoPlay
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      />
      {phase === "loading" && (
        <div className="intro-loader__spinner">
          <div className="intro-loader__spinner-ring" />
        </div>
      )}
    </div>
  );
}

export function shouldShowIntro(): boolean {
  return sessionStorage.getItem(INTRO_SHOWN_KEY) !== "true";
}

export function resetIntro(): void {
  sessionStorage.removeItem(INTRO_SHOWN_KEY);
}