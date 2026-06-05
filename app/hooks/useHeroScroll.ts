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

type HeroScrollValues = {
  scrollYProgress: MotionValue<number>;
  circleClipPath: MotionValue<string>;
  titleOpacity: MotionValue<number>;
  titleY: MotionValue<number>;
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

  const titleOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 1;
    return lerpRange(progress, [0.58, 0.72], [0, 1]);
  });

  const titleY = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 0;
    return lerpRange(progress, [0.58, 0.72], [24, 0]);
  });

  const authorsOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 1;
    return lerpRange(progress, [0.62, 0.76], [0, 1]);
  });

  const scrollHintOpacity = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 0;
    return lerpRange(progress, [0, 0.22], [1, 0]);
  });

  return {
    scrollYProgress,
    circleClipPath,
    titleOpacity,
    titleY,
    authorsOpacity,
    scrollHintOpacity,
  };
}
