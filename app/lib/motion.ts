import type { Transition, Variants } from "framer-motion";
import type { MotionTokens } from "../hooks/useMotionTokens";

export function springTransition(tokens: MotionTokens): Transition {
  return {
    type: "spring",
    stiffness: tokens.springStiffness,
    damping: tokens.springDamping,
  };
}

export function easeOutTransition(
  tokens: MotionTokens,
  duration: "fast" | "base" | "slow" = "base"
): Transition {
  const durationMap = {
    fast: tokens.durationFast,
    base: tokens.durationBase,
    slow: tokens.durationSlow,
  };
  return {
    duration: durationMap[duration],
    ease: [0.22, 1, 0.36, 1],
  };
}

export function fadeUpVariants(
  tokens: MotionTokens,
  reduced: boolean
): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: tokens.distanceY },
    visible: {
      opacity: 1,
      y: 0,
      transition: easeOutTransition(tokens, "base"),
    },
  };
}

export function staggerContainerVariants(
  tokens: MotionTokens,
  reduced: boolean
): Variants {
  if (reduced) {
    return {
      hidden: {},
      visible: {},
    };
  }
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: tokens.staggerChild,
        delayChildren: 0.05,
      },
    },
  };
}

export function staggerItemVariants(
  tokens: MotionTokens,
  reduced: boolean
): Variants {
  return fadeUpVariants(tokens, reduced);
}

export const hoverLift = {
  scale: 1.02,
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverSubtle = {
  opacity: 1,
  y: 0,
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};
