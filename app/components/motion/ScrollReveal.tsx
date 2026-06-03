"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMotionTokens } from "../../hooks/useMotionTokens";
import { fadeUpVariants } from "../../lib/motion";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  ...rest
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      variants={fadeUpVariants(tokens, reduced)}
      transition={reduced ? undefined : { delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
