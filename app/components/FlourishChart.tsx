"use client";

import { useEffect, useRef, useState } from "react";

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
  height = 500,
  dark = false,
  className = "",
}: FlourishChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

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
    <figure
      className={`group relative w-full overflow-hidden rounded-md font-jakarta ${className}`}
    >
      {/* Warm top accent line */}

      {/* Header */}
      {(title || description) && (
        <div className={`relative z-10 pb-4 ${dark? "text-dark-foreground" : "text-foreground"}`}>
          {title && (
            <h3 className="text-2xl font-semibold tracking-wide leading-snug">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-small leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Chart area */}
      <div
        className={`relative w-full ${dark ? "bg-dark-background" : "bg-background"}`}
        style={{ minHeight: typeof height === "number" ? `${height}px` : height }}
      >
        {/* Loading shimmer */}
        {!loaded && !error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 pointer-events-none">
            <div className="relative w-10 h-10">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute inset-0 rounded-full border border-[#C8A97E]/30 animate-ping"
                  style={{ animationDelay: `${i * 0.4}s`, animationDuration: "1.6s" }}
                />
              ))}
              <span className="absolute inset-2 rounded-full bg-[#C8A97E]/10" />
            </div>
            <p className="text-[#C8A97E]/50 text-xs tracking-widest uppercase">
              Brewing chart…
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 px-8 text-center">
            <span className="text-2xl">☕</span>
            <p className="text-[#C8A97E]/60 text-sm">Could not load the visualisation.</p>
            <p className="text-[#C8A97E]/30 text-xs">{visualisationId}</p>
          </div>
        )}

        {/* Flourish embed — exact markup Flourish recommends */}
        <div
          ref={containerRef}
          className={`w-full transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`flourish-embed flourish-${type}`}
            data-src={`visualisation/${visualisationId}`}
          >
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                width="100%"
                alt={title ?? `${type} visualization`}
              />
            </noscript>
          </div>
        </div>
      </div>
    </figure>
  );
}