"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { HERO_SCROLL_VH, useHeroScroll } from "../hooks/useHeroScroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

const AUTHORS = ["Franco Arrieta", "Agustín Basmagi", "Gonzalo Benzaquen"];
const TITLE = "Las infusiones.";

const TITLE_BASE =
  "col-start-1 row-start-1 text-center font-display text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl";

function HeroSplitCircle({
  circleClipPath,
}: {
  circleClipPath: ReturnType<typeof useHeroScroll>["circleClipPath"];
}) {
  return (
    <motion.div
      className="absolute inset-0 z-[1] will-change-[clip-path]"
      style={{ clipPath: circleClipPath }}
      aria-hidden
    >
      {/* herobg.png fills the clipped circle, revealed as the user scrolls */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/herobg.png')" }}
      />

      {/* Subtle dark vignette so the title stays legible over any image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </motion.div>
  );
}

function HeroSplitTitle({
  titleOpacity,
  titleY,
}: {
  titleOpacity: ReturnType<typeof useHeroScroll>["titleOpacity"];
  titleY: ReturnType<typeof useHeroScroll>["titleY"];
}) {
  return (
    <motion.div
      className="pointer-events-none relative z-10 grid w-full max-w-4xl place-items-center px-6"
      style={{ opacity: titleOpacity, y: titleY }}
    >
      {/* Top-left half — white over the image */}
      <h1
        className={`${TITLE_BASE} text-hero-foreground`}
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        aria-hidden
      >
        {TITLE}
      </h1>

      {/* Bottom-right half — slightly warm tint for visual contrast */}
      <h1
        className={`${TITLE_BASE}`}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          color:
            "color-mix(in srgb, var(--hero-foreground) 92%, var(--accent-brown))",
        }}
        aria-hidden
      >
        {TITLE}
      </h1>

      <p className="sr-only">{TITLE}</p>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const {
    circleClipPath,
    titleOpacity,
    titleY,
    authorsOpacity,
    scrollHintOpacity,
  } = useHeroScroll(containerRef, reduced);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: reduced ? "100vh" : `${HERO_SCROLL_VH * 100}vh` }}
      aria-label="Introducción"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <HeroSplitCircle circleClipPath={circleClipPath} />

        <motion.div
          className="absolute z-10 flex flex-col items-start justify-start gap-1 px-8 pt-10 md:px-12 md:pt-12"
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

        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <HeroSplitTitle titleOpacity={titleOpacity} titleY={titleY} />
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
          style={{ opacity: scrollHintOpacity }}
          aria-hidden={reduced}
        >
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-muted">
            Scroll
          </span>
          <div className="h-10 w-px overflow-hidden bg-foreground/15">
            <div className="h-1/2 w-full bg-accent animate-[scroll-line_1.8s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}