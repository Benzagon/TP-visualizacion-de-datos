"use client";

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { forwardRef, useRef } from "react";
import { useHeroScroll } from "../hooks/useHeroScroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

const CAFETO_SCROLL_VH = 4;
const CIRCLE_REVEAL_RANGE: [number, number] = [0.18, 0.72];
const CONTENT_ENTER_RANGE: [number, number] = [0.7, 0.86];

const DESCRIPTION =
  "Es un arbusto de hoja perenne originario de las tierras altas de Etiopía. Sus semillas, conocidas como granos de café, son una de las materias primas agrícolas más comercializadas del mundo y la base de una de las bebidas más populares a nivel global.";

function CafetoCircleReveal({
  circleClipPath,
  imageScale,
}: {
  circleClipPath: MotionValue<string>;
  imageScale: MotionValue<number>;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-[1] will-change-[clip-path]"
      style={{ clipPath: circleClipPath }}
    >
      <motion.img
        src="/cafeto.jpg"
        alt="Café arabica plant"
        className="absolute inset-0 h-full w-full origin-center object-cover object-center will-change-transform"
        style={{ scale: imageScale }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden
      />
    </motion.div>
  );
}

const Cafeto = forwardRef<HTMLElement>(function Cafeto(_, ref) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useHeroScroll(containerRef, reduced);

  const circleRadius = useTransform(
    scrollYProgress,
    CIRCLE_REVEAL_RANGE,
    reduced ? [150, 150] : [0, 150],
  );
  const circleClipPath = useMotionTemplate`circle(${circleRadius}% at 50% 50%)`;

  const imageScale = useTransform(
    scrollYProgress,
    CIRCLE_REVEAL_RANGE,
    reduced ? [1, 1] : [1, 1.07],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    CONTENT_ENTER_RANGE,
    reduced ? [1, 1] : [0, 1],
  );

  const contentY = useTransform(
    scrollYProgress,
    CONTENT_ENTER_RANGE,
    reduced ? [0, 0] : [24, 0],
  );

  const setSectionRef = (node: HTMLElement | null) => {
    containerRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <section
      ref={setSectionRef}
      className="relative w-full"
      style={{ height: reduced ? "100vh" : `${CAFETO_SCROLL_VH * 100}vh` }}
      aria-label="Café arabica"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <CafetoCircleReveal
          circleClipPath={circleClipPath}
          imageScale={imageScale}
        />

        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center">
          <motion.div
            className="flex w-full max-w-4xl flex-col items-center rounded-2xl bg-black/50 px-6 py-8 text-center shadow-2xl backdrop-blur-sm will-change-[opacity,transform] sm:px-10 sm:py-10"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            <h2 className="font-display text-7xl font-semibold italic tracking-tight text-hero-foreground">
              Café arábica
            </h2>

            <p className="mt-6 max-w-3xl font-body text-lg font-normal leading-relaxed text-hero-foreground">
              {DESCRIPTION}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Cafeto;
