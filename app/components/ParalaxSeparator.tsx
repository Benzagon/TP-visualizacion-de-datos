"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type ParalaxSeparatorProps = {
  title: string;
  image: string;
};

const ParalaxSeparator = ({ title, image }: ParalaxSeparatorProps) => {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-30%", "34%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden h-96"
      aria-label={title}
    >
      {reduced ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
          aria-hidden
        />
      ) : (
        <motion.div
          className="absolute -top-[20%] left-0 h-[140%] w-full bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url('${image}')`,
            y: backgroundY,
          }}
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 bg-[var(--hero-overlay)]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h2 className="text-center font-display text-3xl font-light tracking-wider text-hero-foreground md:text-4xl lg:text-5xl">
          {title.toUpperCase()}
        </h2>
      </div>
    </div>
  );
};

export default ParalaxSeparator;
