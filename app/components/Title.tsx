"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMotionTokens } from "../hooks/useMotionTokens";
import { easeOutTransition } from "../lib/motion";

const Title = ({
  children,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  return (
    <motion.h2
      className="max-w-3xl mx-auto font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center leading-tight text-foreground"
      initial={reduced ? false : { opacity: 0, y: tokens.distanceY * 0.75 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={easeOutTransition(tokens, "base")}
    >
      {children}
    </motion.h2>
  );
};

export default Title;
