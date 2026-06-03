"use client";

import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMotionTokens } from "../../hooks/useMotionTokens";

type AnimatedCountProps = {
  value: number;
  className?: string;
};

export default function AnimatedCount({ value, className }: AnimatedCountProps) {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: tokens.durationSlow,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduced, tokens.durationSlow]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("es-AR")}
    </span>
  );
}
