"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMotionTokens } from "../../hooks/useMotionTokens";
import { fadeUpVariants } from "../../lib/motion";

type PageStaggerProps = {
  children: React.ReactNode;
};

export default function PageStagger({ children }: PageStaggerProps) {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();

  const childArray = Array.isArray(children) ? children : [children];

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <>
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants(tokens, reduced)}
          transition={{
            delay: index * tokens.staggerSection,
            duration: tokens.durationBase,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}
