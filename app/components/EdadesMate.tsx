"use client";

import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMotionTokens } from "../hooks/useMotionTokens";
import { easeOutTransition } from "../lib/motion";

const DATA = [
  { age: "15 a 24 años", value: 2.0 },
  { age: "25 a 34 años", value: 1.68 },
  { age: "35 a 44 años", value: 2.08 },
  { age: "45 a 54 años", value: 1.93 },
  { age: "Más de 54 años", value: 2.38 },
];

const INNER_X = 10;
const INNER_Y = 56;
const INNER_W = 60;
const INNER_H = 111;

function parseTermos(value: number): number[] {
  const full = Math.floor(value);
  const partial = Math.round((value - full) * 100) / 100;
  const termos: number[] = [];
  for (let i = 0; i < full; i++) termos.push(1.0);
  if (partial > 0.001) termos.push(partial);
  return termos;
}

function formatText(value: number): string {
  if (value === Math.floor(value)) {
    return `${value.toFixed(0)} termos por día`;
  }
  return `${value.toFixed(2)} termos por día`;
}

function buildTermoSvg(id: string, fillFraction: number): string {
  const liquidH = Math.max(
    0,
    Math.min(INNER_H, Math.round(INNER_H * fillFraction))
  );
  const liquidY = INNER_Y + INNER_H - liquidH;

  const bodyPath = `
    M 14,38
    Q 8,38 8,55
    L 8,168
    Q 8,176 16,176
    L 64,176
    Q 72,176 72,168
    L 72,55
    Q 72,38 66,38
    Z
  `;

  const clipPath = `
    M 10,56
    L 10,167
    Q 10,174 16,174
    L 64,174
    Q 70,174 70,167
    L 70,56
    Z
  `;

  return `
<svg class="termo-svg" viewBox="0 0 80 180" width="72" height="162" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="clip-${id}">
      <path d="${clipPath}"/>
    </clipPath>
  </defs>

  <path d="${bodyPath}" fill="#fff" stroke="none"/>

  <rect
    class="liquid-fill"
    id="liq-${id}"
    x="${INNER_X}"
    y="${liquidY}"
    width="${INNER_W}"
    height="${liquidH}"
    fill="#29493D"
    clip-path="url(#clip-${id})"
  />

  <path d="${bodyPath}" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>

  <line x1="8" y1="38" x2="72" y2="38" stroke="#1a1a1a" stroke-width="2.5"/>

  <rect x="14" y="4" width="52" height="34" rx="0" fill="#f0f0ec" stroke="none"/>
  <rect x="14" y="4" width="52" height="34" rx="0" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>

  <rect x="18" y="0" width="44" height="6" rx="2" fill="#1a1a1a"/>

  <line x1="14" y1="26" x2="66" y2="26" stroke="#1a1a1a" stroke-width="1.2" opacity="0.35"/>
</svg>`;
}

function Termo({ id, fillFraction }: { id: string; fillFraction: number }) {
  const liquidRef = useRef<SVGRectElement | null>(null);
  const fillFractionRef = useRef(fillFraction);

  useEffect(() => {
    fillFractionRef.current = fillFraction;
  }, [fillFraction]);

  useEffect(() => {
    const el = liquidRef.current;
    if (!el) return;

    const liquidH = Math.max(
      0,
      Math.min(INNER_H, Math.round(INNER_H * fillFractionRef.current))
    );
    const liquidY = INNER_Y + INNER_H - liquidH;

    el.style.transition =
      "y 1.1s cubic-bezier(0.22, 1, 0.36, 1), height 1.1s cubic-bezier(0.22, 1, 0.36, 1)";
    el.setAttribute("y", String(liquidY));
    el.setAttribute("height", String(liquidH));
  }, []);

  useEffect(() => {
    const el = liquidRef.current;
    if (!el) return;

    const liquidH = Math.max(
      0,
      Math.min(INNER_H, Math.round(INNER_H * fillFraction))
    );
    const liquidY = INNER_Y + INNER_H - liquidH;

    el.style.transition =
      "y 1.1s cubic-bezier(0.22, 1, 0.36, 1), height 1.1s cubic-bezier(0.22, 1, 0.36, 1)";
    el.setAttribute("y", String(liquidY));
    el.setAttribute("height", String(liquidH));
  }, [fillFraction]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: buildTermoSvg(id, fillFraction) }}
      ref={(node) => {
        if (node) {
          liquidRef.current = node.querySelector(
            `#liq-${CSS.escape(id)}`
          ) as SVGRectElement | null;
        }
      }}
    />
  );
}

export default function EdadesMate() {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  const current = DATA[currentIndex];
  const fractions = useMemo(() => parseTermos(current.value), [current.value]);

  const updateIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const relativeScroll = -rect.top;
    const segmentHeight = viewportHeight;
    const idx = Math.min(
      DATA.length - 1,
      Math.max(0, Math.floor(relativeScroll / segmentHeight))
    );

    setCurrentIndex((prev) => (prev === idx ? prev : idx));
  }, []);

  useEffect(() => {
    updateIndex();

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateIndex();
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
  }, [updateIndex]);

  return (
    <section className="w-full bg-background">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${DATA.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 py-8 bg-background">
          <div className="w-full max-w-4xl flex flex-col items-center">
            <motion.h2
              className="max-w-3xl mx-auto font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center leading-tight text-black"
              initial={reduced ? false : { opacity: 0, y: tokens.distanceY * 0.75 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={easeOutTransition(tokens, "base")}
            >
              Cantidad de termos de mate consumidos por edad
            </motion.h2>

            <motion.div
              key={current.age}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
              className="text-center mt-2"
            >
              <h3 className="font-medium text-3xl font-bold tracking-tight leading-none text-black">
                {current.age}
              </h3>
            </motion.div>

            <div
              className="flex flex-wrap justify-center items-end mt-6 mb-4"
              style={{
                gap: "clamp(10px, 2vw, 24px)",
                minHeight: "180px",
              }}
            >
              {fractions.map((f, i) => (
                <Termo key={`${currentIndex}-${i}`} id={`${currentIndex}-${i}`} fillFraction={f} />
              ))}
            </div>

            <motion.p
              key={current.value}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
              className="font-medium text-3xl font-bold tracking-tight leading-none text-black"
            >
              {formatText(current.value)}
            </motion.p>

            <p className="mt-6 text-sm text-black/70 text-center font-body">
              Encuesta de 2023 a 3000 personas
            </p>

            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
              aria-hidden="true"
            >
              {DATA.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    currentIndex === index
                      ? "scale-125 bg-accent"
                      : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
