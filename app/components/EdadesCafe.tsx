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
  { age: "Menores de 18", value: 1.25 },
  { age: "18 a 24 años", value: 1.54 },
  { age: "25 a 34 años", value: 1.69 },
  { age: "35 a 44 años", value: 1.86 },
  { age: "45 a 54 años", value: 2.0 },
  { age: "Más de 54 años", value: 2.2 },
];

const INNER_BOT_Y = 80;
const INNER_H = 60;
const LIQ_X = 16;
const LIQ_W = 62;

function parseTazas(value: number): number[] {
  const full = Math.floor(value);
  const partial = Math.round((value - full) * 100) / 100;
  const tazas: number[] = [];
  for (let i = 0; i < full; i++) tazas.push(1.0);
  if (partial > 0.001) tazas.push(partial);
  return tazas;
}

function formatText(value: number): string {
  if (value === Math.floor(value)) {
    return `${value.toFixed(0)} tazas de café por día`;
  }
  return `${value.toFixed(2)} tazas de café por día`;
}

function buildTazaSvg(id: string, fillFraction: number): string {
  const liquidH = Math.max(0, Math.min(INNER_H, Math.round(INNER_H * fillFraction)));
  const liquidY = INNER_BOT_Y - liquidH;

  const bodyPath = `
    M 14,14
    L 80,14
    L 73,84
    L 21,84
    Z
  `;

  const clipInner = `
    M ${LIQ_X},20
    L ${LIQ_X + LIQ_W},20
    L ${LIQ_X + LIQ_W - 6},${INNER_BOT_Y}
    L ${LIQ_X + 6},${INNER_BOT_Y}
    Z
  `;

  const asaPath = `
    M 80,30
    C 108,30 108,66 80,66
    L 80,58
    C 100,58 100,38 80,38
    Z
  `;

  const platilloPath = `
    M 10,86
    Q 10,92 47,92
    Q 84,92 84,86
    L 79,84
    L 15,84
    Z
  `;

  return `
<svg class="taza-svg" viewBox="0 0 110 96" width="100" height="87" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="clip-${id}">
      <path d="${clipInner}"/>
    </clipPath>
  </defs>

  <path d="${platilloPath}" fill="#f0f0ec" stroke="#1a1a1a" stroke-width="2" stroke-linejoin="round"/>
  <path d="${bodyPath}" fill="#fff" stroke="none"/>
  <rect
    class="liquid-fill"
    id="liq-${id}"
    x="${LIQ_X}"
    y="${liquidY}"
    width="${LIQ_W}"
    height="${liquidH}"
    fill="#6F4E37"
    clip-path="url(#clip-${id})"
  />
  <path d="${bodyPath}" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/>
  <line x1="16" y1="20" x2="78" y2="20" stroke="#1a1a1a" stroke-width="1.8" opacity="0.4"/>
  <path d="${asaPath}" fill="#f0f0ec" stroke="#1a1a1a" stroke-width="2.2" stroke-linejoin="round"/>
</svg>`;
}

function Taza({ id, fillFraction }: { id: string; fillFraction: number }) {
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
    const liquidY = INNER_BOT_Y - liquidH;

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
    const liquidY = INNER_BOT_Y - liquidH;

    el.style.transition =
      "y 1.1s cubic-bezier(0.22, 1, 0.36, 1), height 1.1s cubic-bezier(0.22, 1, 0.36, 1)";
    el.setAttribute("y", String(liquidY));
    el.setAttribute("height", String(liquidH));
  }, [fillFraction]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: buildTazaSvg(id, fillFraction) }}
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

export default function EdadesCafe() {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  const current = DATA[currentIndex];
  const fractions = useMemo(() => parseTazas(current.value), [current.value]);

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
              Cantidad de tazas consumidas por edad
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
              <h3 className="font-medium text-3xl font-bold tracking-tight leading-none text-black mt-8">
                {current.age}
              </h3>
            </motion.div>

            <div
              className="flex flex-wrap justify-center items-end mt-0 mb-4"
              style={{
                gap: "clamp(10px, 2vw, 24px)",
                minHeight: "180px",
              }}
            >
              {fractions.map((f, i) => (
                <Taza key={`${currentIndex}-${i}`} id={`${currentIndex}-${i}`} fillFraction={f} />
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
                      ? "scale-125 bg-accent-brown"
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
