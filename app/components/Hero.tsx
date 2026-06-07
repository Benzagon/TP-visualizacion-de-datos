"use client";

import { motion, useMotionValueEvent } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";
import { HERO_SCROLL_VH, useHeroScroll } from "../hooks/useHeroScroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

export type DrinkSelection = "cafe" | "mate" | null;

const AUTHORS = ["Franco Arrieta", "Agustín Basmagi", "Gonzalo Benzaquen"];
const TITLE_INTRO = "Las infusiones.";
const TITLE_PROMPT = "Elegir mate o café";

const TITLE_BASE =
  "col-start-1 row-start-1 text-center font-display text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl";

/** Hero scroll progress at which the split image is visible and sides become interactive. */
const SELECTION_READY_PROGRESS = 0.55;

function HeroSelectionOverlays({
  interactive,
  onSelect,
}: {
  interactive: boolean;
  onSelect: (option: "cafe" | "mate") => void;
}) {
  const sideBase =
    "relative h-full w-1/2 border-0 bg-transparent p-0 transition-[background-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-hero-foreground";

  return (
    <div
      className={`absolute inset-0 z-[2] flex ${interactive ? "" : "pointer-events-none"}`}
      role="group"
      aria-label="Elegí tu infusión"
      aria-hidden={!interactive}
    >
      <button
        type="button"
        disabled={!interactive}
        tabIndex={interactive ? 0 : -1}
        className={`${sideBase} ${interactive ? "cursor-pointer hover:bg-[color-mix(in_srgb,var(--hero-split-brown)_24%,transparent)]" : "cursor-default"}`}
        onClick={() => onSelect("cafe")}
        aria-label="Seleccionar café"
      />
      <button
        type="button"
        disabled={!interactive}
        tabIndex={interactive ? 0 : -1}
        className={`${sideBase} ${interactive ? "cursor-pointer hover:bg-[color-mix(in_srgb,var(--hero-split-green)_24%,transparent)]" : "cursor-default"}`}
        onClick={() => onSelect("mate")}
        aria-label="Seleccionar mate"
      />
    </div>
  );
}

function HeroSplitCircle({
  circleClipPath,
  imageScale,
}: {
  circleClipPath: ReturnType<typeof useHeroScroll>["circleClipPath"];
  imageScale: ReturnType<typeof useHeroScroll>["imageScale"];
}) {
  return (
    <motion.div
      className="absolute inset-0 z-[1] will-change-[clip-path]"
      style={{ clipPath: circleClipPath }}
    >
      {/* herobg.png fills the clipped circle, revealed as the user scrolls */}
      <motion.div
        className="absolute inset-0 origin-center bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: "url('/herobg.png')", scale: imageScale }}
        aria-hidden
      />

      {/* Subtle dark vignette so the title stays legible over any image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden
      />
    </motion.div>
  );
}

function HeroSplitTitleLayer({
  text,
  opacity,
  y,
}: {
  text: string;
  opacity: ReturnType<typeof useHeroScroll>["introTitleOpacity"];
  y: ReturnType<typeof useHeroScroll>["introTitleY"];
}) {
  return (
    <motion.div
      className="col-start-1 row-start-1 grid w-full place-items-center will-change-[opacity,transform]"
      style={{ opacity, y }}
      aria-hidden
    >
      {/* Top-left half — white over the image */}
      <h1
        className={`${TITLE_BASE} text-hero-foreground`}
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      >
        {text}
      </h1>

      {/* Bottom-right half — slightly warm tint for visual contrast */}
      <h1
        className={TITLE_BASE}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          color:
            "color-mix(in srgb, var(--hero-foreground) 92%, var(--accent-brown))",
        }}
      >
        {text}
      </h1>
    </motion.div>
  );
}

function HeroTitles({
  introTitleOpacity,
  introTitleY,
  promptTitleOpacity,
  promptTitleY,
}: {
  introTitleOpacity: ReturnType<typeof useHeroScroll>["introTitleOpacity"];
  introTitleY: ReturnType<typeof useHeroScroll>["introTitleY"];
  promptTitleOpacity: ReturnType<typeof useHeroScroll>["promptTitleOpacity"];
  promptTitleY: ReturnType<typeof useHeroScroll>["promptTitleY"];
}) {
  return (
    <div className="pointer-events-none relative z-10 grid w-full max-w-4xl place-items-center px-6">
      <HeroSplitTitleLayer
        text={TITLE_INTRO}
        opacity={introTitleOpacity}
        y={introTitleY}
      />
      <HeroSplitTitleLayer
        text={TITLE_PROMPT}
        opacity={promptTitleOpacity}
        y={promptTitleY}
      />
      <p className="sr-only">
        {TITLE_INTRO} Desplázate para elegir entre mate o café.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scroll-triggered audio hook
// ---------------------------------------------------------------------------
function useScrollAudio(
  scrollProgress: ReturnType<typeof useHeroScroll>["scrollYProgress"],
  reduced: boolean,
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    // Skip audio entirely for users who prefer reduced motion
    if (reduced) return;

    // Lazily create the Audio instance on first interaction so we stay within
    // browser autoplay policies (gesture → scroll → Audio creation/play).
    if (!audioRef.current) {
      const audio = new Audio("/song.mp3");
      audio.loop = true;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    if (latest <= 0) {
      // Back at the very top — pause and rewind
      audio.pause();
      audio.currentTime = 0;
    } else {
      // Fade volume in with scroll (0 → 1 over the first 30% of the section)
      audio.volume = Math.min(latest / 0.3, 1);

      if (audio.paused) {
        // play() returns a Promise; swallow the rejection that fires when the
        // browser blocks autoplay before any user gesture has occurred.
        audio.play().catch(() => {});
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
type HeroProps = {
  onSelect: (option: "cafe" | "mate") => void;
};

const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { onSelect },
  ref,
) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [interactive, setInteractive] = useState(reduced);
  const {
    circleClipPath,
    imageScale,
    introTitleOpacity,
    introTitleY,
    promptTitleOpacity,
    promptTitleY,
    authorsOpacity,
    scrollHintOpacity,
    scrollYProgress,
  } = useHeroScroll(containerRef, reduced);

  useScrollAudio(scrollYProgress, reduced);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduced) {
      setInteractive(true);
      return;
    }
    setInteractive(progress >= SELECTION_READY_PROGRESS);
  });

  const setSectionRef = (node: HTMLElement | null) => {
    containerRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <section
      ref={setSectionRef}
      className="relative w-full"
      style={{ height: reduced ? "100vh" : `${HERO_SCROLL_VH * 100}vh` }}
      aria-label="Introducción"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <HeroSplitCircle circleClipPath={circleClipPath} imageScale={imageScale} />

        <HeroSelectionOverlays interactive={interactive} onSelect={onSelect} />

        <motion.div
          className="pointer-events-none absolute z-10 flex flex-col items-start justify-start gap-1 px-8 pt-10 md:px-12 md:pt-12"
          style={{ opacity: authorsOpacity }}
        >
          {AUTHORS.map((name) => (
            <p
              key={name}
              className="font-body text-sm font-medium tracking-wide text-hero-foreground/80"
            >
              {name}
            </p>
          ))}
        </motion.div>

        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center">
          <HeroTitles
            introTitleOpacity={introTitleOpacity}
            introTitleY={introTitleY}
            promptTitleOpacity={promptTitleOpacity}
            promptTitleY={promptTitleY}
          />
        </div>

        <motion.div
          className="pointer-events-none absolute left-1/2 z-10 flex h-full w-full bottom-0 -translate-x-1/2 flex-col items-center gap-3"
          style={{ opacity: scrollHintOpacity }}
          aria-hidden={reduced}
        >
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">
              Scroll
            </span>
            <div className="h-10 w-px overflow-hidden bg-foreground/15">
              <div className="h-1/2 w-full bg-accent animate-[scroll-line_1.8s_ease-in-out_infinite]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Hero;