"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMotionTokens } from "../hooks/useMotionTokens";
import { easeOutTransition } from "../lib/motion";

export interface FlourishStoryStep {
  slide: number;
  content: ReactNode;
}

interface FlourishStoryProps {
  /** Flourish Story ID, e.g. "3696959" */
  storyId: string;
  /** Optional scroll-driven slide steps */
  steps?: FlourishStoryStep[];
  /** Optional title shown above the story */
  title?: string;
  /** Optional description shown below */
  description?: string;
  /** Explicit height - defaults to 800px */
  height?: number | string;
  /** Extra className on wrapper */
  className?: string;
  dark?: boolean;
  width?: string;
}

export default function FlourishStory({
  storyId,
  steps,
  title,
  description,
  height = 800,
  dark = false,
  width = "100%",
  className = "",
}: FlourishStoryProps) {
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const orderedSteps = useMemo(() => steps ?? [], [steps]);
  const hasSteps = orderedSteps.length > 0;
  const firstSlide = orderedSteps[0]?.slide ?? 1;

  const [activeSlide, setActiveSlide] = useState(firstSlide);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, orderedSteps.length);
  }, [orderedSteps.length]);

  useEffect(() => {
    setActiveSlide(firstSlide);
    setLoaded(false);
    setError(false);
  }, [storyId, firstSlide]);

  useEffect(() => {
    if (!hasSteps) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const slide = Number(
          (visibleEntry.target as HTMLElement).dataset.slide
        );

        if (Number.isFinite(slide)) {
          setActiveSlide(slide);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) {
        observer.observe(step);
      }
    });

    return () => observer.disconnect();
  }, [hasSteps, orderedSteps]);

  const setStepRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      stepRefs.current[index] = node;
    },
    []
  );

  const iframeTitle = title ?? `Flourish story ${storyId}`;
  const thumbnailUrl = `https://public.flourish.studio/story/${storyId}/thumbnail`;
  const storyHeight = hasSteps
    ? "100vh"
    : typeof height === "number"
      ? `${height}px`
      : height;
  const storyWidth = typeof width === "number" ? `${width}px` : width ?? "100%";
  const storySrc = hasSteps
    ? `https://flo.uri.sh/story/${storyId}/embed#slide-${activeSlide}`
    : `https://flo.uri.sh/story/${storyId}/embed`;

  const loadingOverlay = !loaded && !error && (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 pointer-events-none">
      <motion.div
        className="h-8 w-8 rounded-full border-2 border-border border-t-accent"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={
          reduced
            ? undefined
            : {
                duration: tokens.durationSlow,
                repeat: Infinity,
                ease: "linear",
              }
        }
        aria-hidden
      />
      <p className="font-body text-xs tracking-widest uppercase text-muted">
        Cargando historia...
      </p>
    </div>
  );

  const errorOverlay = error && (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 px-8 text-center">
      <p className="font-body text-sm text-muted">
        No se pudo cargar la historia.
      </p>
      <p className="font-body text-xs text-muted/70">{storyId}</p>
    </div>
  );

  const storyEmbed = (
    <motion.div
      className={`relative ${
        dark ? "bg-surface" : "bg-background"
      } flex items-center justify-center`}
      style={{
        width: storyWidth,
        minHeight: storyHeight,
      }}
      initial={reduced ? false : { opacity: 0, scaleY: 0.98 }}
      whileInView={reduced ? undefined : { opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{
        ...easeOutTransition(tokens, "slow"),
        delay: reduced ? 0 : 0.1,
      }}
    >
      {loadingOverlay}
      {errorOverlay}

      <motion.div
        className="relative"
        initial={false}
        animate={
          loaded
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: reduced ? 1 : 0.99 }
        }
        transition={easeOutTransition(tokens, "base")}
        style={{
          width: storyWidth,
          height: storyHeight,
        }}
      >
        <iframe
          src={storySrc}
          title={iframeTitle}
          className="block h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />

        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            width={width}
            height={height}
            alt={iframeTitle}
          />
        </noscript>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.figure
      className={`relative w-full ${
        hasSteps ? "overflow-visible" : "overflow-hidden"
      } font-body ${className}`}
      initial={reduced ? false : { opacity: 0, y: tokens.distanceY * 0.5 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={easeOutTransition(tokens, "base")}
    >
      {(title || description) && (
        <motion.div
          className="relative z-10 pb-6 text-foreground"
          initial={reduced ? false : { opacity: 0 }}
          viewport={{ once: true }}
          transition={{
            ...easeOutTransition(tokens, "fast"),
            delay: reduced ? 0 : 0.05,
          }}
        >
          {title && (
            <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight leading-snug">
              {title}
            </h3>
          )}

          {description && (
            <p className="mt-2 text-sm text-muted leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </motion.div>
      )}

      {hasSteps ? (
        <div className="relative w-full">
          <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
            {storyEmbed}
          </div>

          <div className="relative z-10 -mt-[100vh] w-full">
            <div className="pointer-events-none min-h-screen" aria-hidden />

            {orderedSteps.map((step, index) => (
              <motion.section
                ref={setStepRef(index)}
                data-slide={step.slide}
                aria-current={activeSlide === step.slide ? "step" : undefined}
                key={`${step.slide}-${index}`}
                className="relative mx-auto flex min-h-[80vh] max-w-prose flex-col justify-center px-6 py-[15vh] text-foreground md:px-10"
                initial={
                  reduced ? false : { opacity: 0, y: tokens.distanceY * 0.5 }
                }
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{
                  ...easeOutTransition(tokens, "base"),
                  delay: reduced ? 0 : 0.05,
                }}
              >
                <motion.div
                  className={`pointer-events-auto rounded-lg border border-border/70 px-6 py-5 shadow-lg backdrop-blur-md md:px-8 md:py-6 ${
                    dark
                      ? "bg-background/85 text-foreground"
                      : "bg-white/85 text-foreground"
                  }`}
                  animate={{
                    opacity: activeSlide === step.slide ? 1 : 0.72,
                    scale: activeSlide === step.slide ? 1 : 0.98,
                  }}
                  transition={easeOutTransition(tokens, "fast")}
                >
                  {step.content}
                </motion.div>
              </motion.section>
            ))}

            <div className="pointer-events-none min-h-[30vh]" aria-hidden />
          </div>
        </div>
      ) : (
        storyEmbed
      )}
    </motion.figure>
  );
}
