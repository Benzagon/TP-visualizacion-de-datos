"use client";

import Script from "next/script";
import type { ReactNode } from "react";

export interface FlourishStoryStep {
  slide: number;
  content: ReactNode;
  hide?: boolean
}

interface FlourishStoryProps {
  storyId: string;
  steps?: FlourishStoryStep[];
  title?: string;
  description?: string;
  className?: string;
}

declare global {
  interface Window {
    initFlourishScrolly?: () => void;
  }
}

export default function FlourishStory({
  storyId,
  steps = [],
  title,
  description,
  className = "",
}: FlourishStoryProps) {
  return (
    <>
      <Script
        src="https://public.flourish.studio/resources/embed.js"
        strategy="afterInteractive"
      />

      <Script
        src="https://cdn.flourish.rocks/flourish-scrolly-v3.1.0.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          setTimeout(() => {
            window.initFlourishScrolly?.();
          }, 100);
        }}
      />

      <figure className={`w-full font-body bg-transparent ${className}`}>
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight">
                {title}
              </h3>
            )}

            {description && (
              <p className="mt-2 text-sm text-muted leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
        )}

        <div
          id={`flourish-scrolly-${storyId}`}
          className="relative w-full bg-transparent"
        >
          <div
            className="flourish-embed"
            data-src={`story/${storyId}`}
            data-url={`https://flo.uri.sh/story/${storyId}/embed`}
            data-height="100vh"
          />

          {steps.map((step) => (
            !step.hide ? 
              <section
                key={step.slide}
                className="relative min-[2rem]"
              >
                <div className="w-full max-w-5xl rounded-3xl px-10 py-8 md:px-12 md:py-10">
                  {step.content}
                </div>
  
                <a
                  href={`#story/${storyId}/slide-${step.slide}`}
                  aria-hidden="true"
                />
              </section>
              :
              <></>
          ))}
        </div>
      </figure>
    </>
  );
}