"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const VIEWPORT = { once: true, margin: "-15%" } as const;
const EASE = [0.25, 0.1, 0.25, 1] as const;
const REVEAL = { duration: 0.9, ease: EASE };
const ARROW_EASE = [0.25, 0.1, 0.25, 1] as const;
const ORIGIN_X = 91;

const SECTIONS = [
  {
    num: "01",
    title: "La Yerba",
    body: "La yerba mate son las hojas secas y molidas del árbol Ilex paraguariensis, originario de las selvas subtropicales de Argentina, Brasil y Paraguay. Rica en cafeína, teobromina y antioxidantes, fue utilizada durante siglos por el pueblo guaraní como bebida sagrada y medicina natural.",
    arrow: { x: 48, y: 48 },
  },
  {
    num: "02",
    title: "La Bombilla",
    body: "La bombilla es el sorbete metálico con filtro que permite beber el mate sin tragar las hojas. Su extremo inferior —plano o en forma de resorte— retiene la yerba mientras deja pasar el líquido. Las mejores son de alpaca, plata o acero inoxidable, y mejoran con el uso.",
    arrow: { x: 57, y: 20 },
  },
  {
    num: "03",
    title: "El Mate",
    body: "El mate es el recipiente que da nombre al ritual: un calabacín seco o madera tallada que contiene la yerba. Antes del primer uso se lo cura con yerba húmeda para cerrar sus poros. Con el tiempo, cada mate absorbe los aceites de la yerba y desarrolla un sabor propio e irreproducible.",
    arrow: { x: 49, y: 72 },
  },
  {
    num: "04",
    title: "El Agua",
    body: "El agua es el elemento más delicado del mate. Debe estar entre 70 y 80 °C (nunca hirviendo) porque el agua a 100 °C quema la yerba y la vuelve amarga. Un buen cebador vierte poca cantidad cada vez y repite el cebado con paciencia, respetando los tiempos de cada mate.",
    arrow: { x: 50, y: 50 },
  },
] as const;

function MateImagePointer({
  target,
  reduced,
  label,
}: {
  target: { x: number; y: number };
  reduced: boolean;
  label: string;
}) {
  const transition = {
    duration: reduced ? 0 : 0.55,
    ease: ARROW_EASE,
  };

  return (
    <svg
      className="absolute inset-0 z-10 h-full w-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <motion.line
        stroke="var(--hero-foreground)"
        strokeWidth={0.35}
        strokeLinecap="round"
        markerEnd="url(#mate-arrowhead)"
        initial={false}
        animate={{
          x1: ORIGIN_X,
          y1: target.y,
          x2: target.x,
          y2: target.y,
        }}
        transition={transition}
      />

      <motion.circle
        r={0.8}
        fill="var(--accent)"
        stroke="var(--hero-foreground)"
        strokeWidth={0.25}
        initial={false}
        animate={{
          cx: target.x,
          cy: target.y,
        }}
        transition={transition}
      />
    </svg>
  );
}

function EditorialBlock({
  num,
  title,
  body,
  reduced,
}: {
  num: string;
  title: string;
  body: string;
  reduced: boolean;
}) {
  const hidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 };
  const visible = { opacity: 1, y: 0 };

  return (
    <div>
      <motion.p
        className="font-body text-xs tracking-[0.35em] uppercase text-hero-foreground/60"
        initial={hidden}
        whileInView={visible}
        transition={{ ...REVEAL, delay: 0 }}
        viewport={VIEWPORT}
      >
        {num}
      </motion.p>

      <motion.h2
        className="mt-4 font-display text-5xl font-bold tracking-tight leading-none text-hero-foreground"
        initial={hidden}
        whileInView={visible}
        transition={{ ...REVEAL, delay: reduced ? 0 : 0.1 }}
        viewport={VIEWPORT}
      >
        {title}
      </motion.h2>

      <motion.div
        className="w-8 h-px my-6 bg-border"
        initial={hidden}
        whileInView={visible}
        transition={{ ...REVEAL, delay: reduced ? 0 : 0.15 }}
        viewport={VIEWPORT}
        aria-hidden
      />

      <motion.p
        className="font-body text-lg font-normal leading-relaxed max-w-md text-hero-foreground/60"
        initial={hidden}
        whileInView={visible}
        transition={{ ...REVEAL, delay: reduced ? 0 : 0.25 }}
        viewport={VIEWPORT}
      >
        {body}
      </motion.p>
    </div>
  );
}

function getActiveSectionIndex(
  sections: (HTMLDivElement | null)[]
): number {
  const viewportCenter = window.innerHeight / 2;
  let activeIndex = 0;
  let closestDistance = Infinity;

  sections.forEach((section, index) => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      activeIndex = index;
    }
  });

  return activeIndex;
}

export default function MateSection() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const updateActiveSection = useCallback(() => {
    const next = getActiveSectionIndex(sectionRefs.current);
    setActiveIndex((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    updateActiveSection();

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateActiveSection();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateActiveSection]);

  const active = SECTIONS[activeIndex];
  const pointerLabel = `Señalando: ${active.title}`;

  return (
    <section className="flex flex-row w-full">
      <div className="w-1/2 sticky top-0 h-screen shrink-0 self-start overflow-hidden will-change-transform">
        <motion.div
          className="relative w-full h-full"
          initial={reduced ? { scale: 1 } : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduced ? 0 : 1.8, ease: "easeOut" }}
        >
          <Image
            src="/mate.jpg"
            alt="Mate tradicional"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />

          <MateImagePointer
            target={active.arrow}
            reduced={reduced}
            label={pointerLabel}
          />

          <div
            className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#29493D] to-transparent z-20"
            aria-hidden
          />
        </motion.div>
      </div>

      <div className="w-1/2 bg-[#29493D]">
        {SECTIONS.map((section, index) => (
          <div
            key={section.num}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={`min-h-screen flex items-center px-16 py-24 ${
              index === SECTIONS.length - 1 ? "pb-48" : ""
            }`}
          >
            <EditorialBlock
              num={section.num}
              title={section.title}
              body={section.body}
              reduced={reduced}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
