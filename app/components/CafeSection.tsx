"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const VIEWPORT = { once: true, margin: "-15%" } as const;
const EASE = [0.25, 0.1, 0.25, 1] as const;
const REVEAL = { duration: 0.9, ease: EASE };
const ARROW_EASE = [0.25, 0.1, 0.25, 1] as const;
const ORIGIN_X = 9;
const PANEL_BG = "#3D2B1F";

const SECTIONS = [
  {
    num: "01",
    title: "El Grano",
    body: "Todo comienza con el grano de café: la semilla tostada del fruto del cafeto. Durante el tostado, cientos de compuestos aromáticos se desarrollan en su interior, dando origen a notas que pueden recordar al chocolate, los frutos secos, las flores o las frutas maduras. Aunque parece pequeño, cada grano concentra el potencial de toda la taza.",
    arrow: { x: 65, y: 88 },
  },
  {
    num: "02",
    title: "La Molienda",
    body: "Una vez molido, el café libera aromas que permanecían atrapados en el interior del grano. El tamaño de la molienda determina cómo interactuará con el agua: demasiado fina produce una extracción intensa; demasiado gruesa, una bebida más ligera. Por eso, el café alcanza su máxima expresión cuando se muele justo antes de prepararlo.",
    arrow: { x: 30, y: 50 },
  },
  {
    num: "03",
    title: "La Extracción",
    body: "El agua caliente atraviesa el café molido y disuelve sus compuestos solubles: aceites, azúcares, ácidos y aromas. Este proceso, conocido como extracción, transforma partículas sólidas en una bebida compleja y equilibrada. Pequeñas variaciones de tiempo, temperatura o molienda pueden cambiar por completo el resultado final.",
    arrow:  { x: 30, y: 50 },
  },
  {
    num: "04",
    title: "La Taza",
    body: "La taza es el destino final del recorrido. En ella convergen el origen del grano, el perfil de tostado, la molienda y la técnica de preparación. La crema y el arte latte que coronan la superficie son la última huella visible de un proceso que comenzó mucho antes, en una plantación de café.",
    arrow: { x: 60, y: 10 },
  },
] as const;

function CafeImagePointer({
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
        markerEnd="url(#cafe-arrowhead)"
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
        fill="var(--accent-brown)"
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

export default function CafeSection() {
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
      <div className="w-1/2 bg-[#3D2B1F]">
        {SECTIONS.map((section, index) => (
          <div
            key={section.num}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={`min-h-screen flex items-center pl-36 pr-8 py-24 ${
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

      <div className="w-1/2 sticky top-0 h-screen shrink-0 self-start overflow-hidden will-change-transform">
        <motion.div
          className="relative w-full h-full"
          initial={reduced ? { scale: 1 } : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduced ? 0 : 1.8, ease: "easeOut" }}
        >
          <Image
            src="/cafe.jpg"
            alt="Preparación de café en portafiltros"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />

          <CafeImagePointer
            target={active.arrow}
            reduced={reduced}
            label={pointerLabel}
          />

          <div
            className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r z-20"
            style={{
              backgroundImage: `linear-gradient(to right, ${PANEL_BG}, transparent)`,
            }}
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
