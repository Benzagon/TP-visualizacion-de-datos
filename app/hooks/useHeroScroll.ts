"use client";

import {
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { type RefObject } from "react";

/** Scroll distance through the hero (viewport heights). */
export const HERO_SCROLL_VH = 2.25;

function lerpRange(
  value: number,
  input: [number, number],
  output: [number, number]
): number {
  const [inMin, inMax] = input;
  const [outMin, outMax] = output;
  if (value <= inMin) return outMin;
  if (value >= inMax) return outMax;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

/** Intro title fades in after the first scroll gesture. */
const INTRO_FADE_IN: [number, number] = [0.06, 0.2];

/** Scroll window for crossfading intro → prompt title (ends before selection unlock). */
const TITLE_CROSSFADE: [number, number] = [0.47, 0.6];

type HeroScrollValues = {
  scrollYProgress: MotionValue<number>;
  circleClipPath: MotionValue<string>;
  imageScale: MotionValue<number>;
  introTitleOpacity: MotionValue<number>;
  introTitleY: MotionValue<number>;
  promptTitleOpacity: MotionValue<number>;
  promptTitleY: MotionValue<number>;
  authorsOpacity: MotionValue<number>;
  scrollHintOpacity: MotionValue<number>;
};

export function useHeroScroll(
  containerRef: RefObject<HTMLElement | null>,
  reduced: boolean
): HeroScrollValues {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const circleRadius = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 150;
    return lerpRange(progress, [0, 0.92], [0, 150]);
  });

  const circleClipPath = useMotionTemplate`circle(${circleRadius}% at 50% 50%)`;

  const imageScale = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 1;
    return lerpRange(progress, TITLE_CROSSFADE, [1, 1.07]);
  });

  const introTitleOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 0;
    const fadeIn = lerpRange(progress, INTRO_FADE_IN, [0, 1]);
    const fadeOut = lerpRange(progress, TITLE_CROSSFADE, [1, 0]);
    return fadeIn * fadeOut;
  });

  const introTitleY = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 0;
    if (progress < TITLE_CROSSFADE[0]) {
      return lerpRange(progress, INTRO_FADE_IN, [24, 0]);
    }
    return lerpRange(progress, TITLE_CROSSFADE, [0, -28]);
  });

  const promptTitleOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 1;
    return lerpRange(progress, TITLE_CROSSFADE, [0, 1]);
  });

  const promptTitleY = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 0;
    return lerpRange(progress, TITLE_CROSSFADE, [28, 0]);
  });

  const authorsOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 1;
    return lerpRange(progress, [0.44, 0.58], [0, 1]);
  });

  const scrollHintOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 0;
    return lerpRange(progress, [0, 0.22], [1, 0]);
  });

  return {
    scrollYProgress,
    circleClipPath,
    imageScale,
    introTitleOpacity,
    introTitleY,
    promptTitleOpacity,
    promptTitleY,
    authorsOpacity,
    scrollHintOpacity,
  };
}
