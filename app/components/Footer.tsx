"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMotionTokens } from "../hooks/useMotionTokens";
import { easeOutTransition } from "../lib/motion";
import ScrollReveal from "./motion/ScrollReveal";

function Footer() {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  return (
    <footer className="w-full border-t border-border bg-surface py-16 md:py-20 px-6">
      <ScrollReveal className="max-w-3xl mx-auto flex flex-col items-center gap-2 text-center">
        <motion.p
          className="font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground"
          transition={easeOutTransition(tokens, "fast")}
        >
          Visualización de datos
        </motion.p>
        <p className="font-body text-sm text-muted tracking-wide">2026</p>
      </ScrollReveal>
    </footer>
  );
}

export default Footer;
