"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMotionTokens } from "../hooks/useMotionTokens";
import { easeOutTransition } from "../lib/motion";
import { StaggerReveal, StaggerItem } from "./motion/StaggerReveal";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  useEffect(() => {
    if (reduced) return;
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrollY * 0.45}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduced]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] h-[120%] w-full will-change-transform"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--hero-overlay)" }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={easeOutTransition(tokens, "slow")}
      />

      <StaggerReveal className="absolute z-10 flex flex-col items-start justify-start px-8 md:px-12 pt-10 md:pt-12 gap-1">
        {["Franco Arrieta", "Agustín Basmagi", "Gonzalo Benzaquen"].map(
          (name) => (
            <StaggerItem key={name}>
              <motion.p
                className="font-body text-sm font-medium tracking-wide text-hero-foreground/80 cursor-default"
                initial={reduced ? false : { opacity: 0.8 }}
                whileHover={
                  reduced ? undefined : { opacity: 1, x: 4 }
                }
                transition={easeOutTransition(tokens, "fast")}
              >
                {name}
              </motion.p>
            </StaggerItem>
          )
        )}
      </StaggerReveal>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-hero-foreground text-center"
          initial={reduced ? false : { opacity: 0, y: tokens.distanceY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...easeOutTransition(tokens, "slow"),
            delay: reduced ? 0 : tokens.staggerSection * 2,
          }}
        >
          Las infusiones.
        </motion.h1>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ...easeOutTransition(tokens, "base"),
          delay: reduced ? 0 : tokens.staggerSection * 4,
        }}
      >
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-hero-foreground/60">
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden bg-hero-foreground/20">
          <div className="w-full h-1/2 bg-accent animate-[scroll-line_1.8s_ease-in-out_infinite]" />
        </div>
      </motion.div>
    </section>
  );
}
