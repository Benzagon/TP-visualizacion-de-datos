"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMotionTokens } from "../../hooks/useMotionTokens";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "../../lib/motion";

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerReveal({ children, className }: StaggerRevealProps) {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants(tokens, reduced)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  return (
    <motion.div
      className={className}
      variants={staggerItemVariants(tokens, reduced)}
    >
      {children}
    </motion.div>
  );
}
