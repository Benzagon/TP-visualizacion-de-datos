"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMotionTokens } from "../hooks/useMotionTokens";
import { easeOutTransition, hoverLift } from "../lib/motion";

interface FlourishChartProps {
  /** Flourish visualisation ID, e.g. "29147316" */
  visualisationId: string;
  /** Flourish chart type for the class, e.g. "map", "bar-chart-race", "survey" */
  type?: string;
  /** Optional title shown above the chart */
  title?: string;
  /** Optional description / caption shown below */
  description?: string;
  /** Explicit height — defaults to 500px */
  height?: number | string;
  /** Extra className on the wrapper */
  className?: string;
  dark?: boolean;
  width?: string;
}

// IDs of already-injected Flourish embed scripts (module-level, survives re-renders)
const injectedScripts = new Set<string>();

const FLOURISH_SCRIPT = "https://public.flourish.studio/resources/embed.js";

function ensureFlourishScript(): Promise<void> {
  return new Promise((resolve) => {
    if (injectedScripts.has(FLOURISH_SCRIPT)) {
      // Script already in DOM — if Flourish is ready, re-trigger it
      if (typeof (window as any).Flourish !== "undefined") {
        (window as any).Flourish.loadEmbed?.();
      }
      resolve();
      return;
    }

    const existing = document.querySelector(`script[src="${FLOURISH_SCRIPT}"]`);
    if (existing) {
      injectedScripts.add(FLOURISH_SCRIPT);
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = FLOURISH_SCRIPT;
    script.async = true;
    script.onload = () => {
      injectedScripts.add(FLOURISH_SCRIPT);
      resolve();
    };
    script.onerror = () => resolve(); // resolve anyway, error state handled by UI
    document.body.appendChild(script);
  });
}

export default function FlourishChart({
  visualisationId,
  type = "chart",
  title,
  description,
  height = 1000,
  dark = false,
  width = "100%",
  className = "",
}: FlourishChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  useEffect(() => {
    setLoaded(false);
    setError(false);

    ensureFlourishScript()
      .then(() => {
        // Small delay so the Flourish script can scan new .flourish-embed nodes
        const t = setTimeout(() => setLoaded(true), 600);
        return () => clearTimeout(t);
      })
      .catch(() => setError(true));
  }, [visualisationId]);

  const thumbnailUrl = `https://public.flourish.studio/visualisation/${visualisationId}/thumbnail`;

  return (
    <motion.figure
      className={`relative w-full overflow-hidden font-body ${className}`}
      initial={reduced ? false : { opacity: 0, y: tokens.distanceY * 0.5 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={easeOutTransition(tokens, "base")}
    >
      {(title || description) && (
        <motion.div
          className={`relative z-10 pb-6 text-foreground ${dark ? "" : ""}`}
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
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

      <motion.div
        className={`relative ${dark ? "bg-surface" : "bg-background"} flex items-center justify-end`}
        style={{
          width: typeof width === "number" ? `${width}px` : (width ?? "100%"),
          minHeight: typeof height === "number" ? `${height}px` : height,
        }}
        initial={reduced ? false : { opacity: 0, scaleY: 0.98 }}
        whileInView={reduced ? undefined : { opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{
          ...easeOutTransition(tokens, "slow"),
          delay: reduced ? 0 : 0.1,
        }}
      >
        {!loaded && !error && (
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
              Cargando visualización…
            </p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 px-8 text-center">
            <p className="font-body text-sm text-muted">
              No se pudo cargar la visualización.
            </p>
            <p className="font-body text-xs text-muted/70">{visualisationId}</p>
          </div>
        )}

        <motion.div
          ref={containerRef}
          initial={false}
          animate={
            loaded
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: reduced ? 1 : 0.99 }
          }
          transition={easeOutTransition(tokens, "base")}
          style={{
            width: typeof width === "number" ? `${width}px` : (width ?? "100%"),
            height: typeof height === "number" ? `${height}px` : height,
          }}
        >
          <div
            className={`flourish-embed flourish-${type}`}
            data-src={`visualisation/${visualisationId}`}
            style={{
              width: typeof width === "number" ? `${width}px` : width,
            }}
          >
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                width={width}
                alt={title ?? `${type} visualization`}
                height={height}
              />
            </noscript>
          </div>
        </motion.div>
      </motion.div>
    </motion.figure>
  );
}
