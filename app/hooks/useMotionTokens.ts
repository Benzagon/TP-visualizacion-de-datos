"use client";

import { useEffect, useState } from "react";

export type MotionTokens = {
  durationFast: number;
  durationBase: number;
  durationSlow: number;
  staggerChild: number;
  staggerSection: number;
  distanceY: number;
  springStiffness: number;
  springDamping: number;
};

const FALLBACK: MotionTokens = {
  durationFast: 0.3,
  durationBase: 0.5,
  durationSlow: 0.8,
  staggerChild: 0.08,
  staggerSection: 0.12,
  distanceY: 20,
  springStiffness: 260,
  springDamping: 24,
};

function readToken(name: string, fallback: number): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!raw) return fallback;
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readDuration(name: string, fallback: number): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!raw) return fallback;
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function readMotionTokens(): MotionTokens {
  return {
    durationFast: readDuration("--motion-duration-fast", FALLBACK.durationFast),
    durationBase: readDuration("--motion-duration-base", FALLBACK.durationBase),
    durationSlow: readDuration("--motion-duration-slow", FALLBACK.durationSlow),
    staggerChild: readDuration("--motion-stagger-child", FALLBACK.staggerChild),
    staggerSection: readDuration(
      "--motion-stagger-section",
      FALLBACK.staggerSection
    ),
    distanceY: readToken("--motion-distance-y", FALLBACK.distanceY),
    springStiffness: readToken(
      "--motion-spring-stiffness",
      FALLBACK.springStiffness
    ),
    springDamping: readToken("--motion-spring-damping", FALLBACK.springDamping),
  };
}

export function useMotionTokens(): MotionTokens {
  const [tokens, setTokens] = useState<MotionTokens>(FALLBACK);

  useEffect(() => {
    setTokens(readMotionTokens());
  }, []);

  return tokens;
}
