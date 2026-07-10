"use client";

import { motion } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const STEPS = [
  {
    tag: "Armado",
    title: "Armado del mate",
    text: "Comenzamos preparando el mate. Este es el primer paso del ritual.",
    detail: "El recipiente, listo y vacío",
  },
  {
    tag: "Yerba",
    title: "Colocación de la yerba",
    text: "Agregamos la yerba dentro del mate, inclinándolo suavemente para formar una pendiente.",
    detail: "Se forma el montículo característico",
  },
  {
    tag: "Asentado",
    title: "Sacudida y asentado",
    text: "Sacudimos suavemente para que la yerba se acomode y se distribuya de forma pareja.",
    detail: "Las hojas finas se asientan en el fondo",
  },
  {
    tag: "El hueco",
    title: "Creación del hueco",
    text: "Formamos un espacio en un costado para colocar el agua.",
    detail: "El espacio donde todo comienza",
  },
  {
    tag: "Agua tibia",
    title: "Primera agua tibia",
    text: "Agregamos agua tibia en el hueco para preparar la yerba.",
    detail: "Hidratación lenta, sin apurar",
  },
  {
    tag: "Bombilla",
    title: "Inserción de la bombilla",
    text: "Colocamos la bombilla en el mismo lugar donde hidratamos la yerba.",
    detail: "Siempre en el mismo punto húmedo",
  },
  {
    tag: "Agua caliente",
    title: "Agua caliente final",
    text: "Ahora sí, agregamos el agua caliente y comenzamos a disfrutar.",
    detail: "Listo para cebar y compartir",
  },
] as const;

const VIEWPORT = { once: true, margin: "-15%" } as const;
const EASE = [0.25, 0.1, 0.25, 1] as const;
const REVEAL = { duration: 0.9, ease: EASE };

function StepCard({
  step,
  index,
  active,
  ref,
}: {
  step: (typeof STEPS)[number];
  index: number;
  active: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className="flex min-h-[80vh] items-center px-6 py-24 md:min-h-screen md:px-16 md:py-32"
    >
      <article
        className={`max-w-md transition-all duration-500 ${
          active
            ? "opacity-100 translate-y-0"
            : "opacity-40 translate-y-3 scale-[0.99]"
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-400 ${
              active
                ? "border-accent bg-accent text-hero-foreground"
                : "border-accent text-accent"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <p className="font-body text-xs tracking-[0.35em] uppercase text-muted">
            {step.tag}
          </p>
        </div>

        <h2 className="font-display text-4xl font-bold leading-none tracking-tight text-foreground md:text-5xl">
          {step.title}
        </h2>

        <p className="mt-6 font-body text-lg font-normal leading-relaxed text-muted">
          {step.text}
        </p>

        <div
          className={`mt-4 flex items-center gap-2 text-sm font-medium text-accent transition-all duration-400 ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
          <span>{step.detail}</span>
        </div>
      </article>
    </div>
  );
}

function MateSvg({ activeStep }: { activeStep: number }) {
  const svgId = useId().replace(/:/g, "");
  const ids = {
    gourdGrad: `gourdGrad-${svgId}`,
    gourdShine: `gourdShine-${svgId}`,
    yerbaGrad: `yerbaGrad-${svgId}`,
    yerbaWetGrad: `yerbaWetGrad-${svgId}`,
    waterGrad: `waterGrad-${svgId}`,
    bombillaGrad: `bombillaGrad-${svgId}`,
    softShadow: `softShadow-${svgId}`,
    gourdClip: `gourdClip-${svgId}`,
  };

  const shakeTransform =
    activeStep === 1 ? "rotate(-12deg)" : "rotate(0deg)";

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 400 420"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={ids.gourdGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A876" />
          <stop offset="55%" stopColor="#A9844F" />
          <stop offset="100%" stopColor="#7D5E33" />
        </linearGradient>
        <linearGradient id={ids.gourdShine} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.yerbaGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8AAE6E" />
          <stop offset="100%" stopColor="#5E7E45" />
        </linearGradient>
        <linearGradient id={ids.yerbaWetGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F6B3C" />
          <stop offset="100%" stopColor="#3C5230" />
        </linearGradient>
        <radialGradient id={ids.waterGrad} cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#E7F3EA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#BFD9C2" stopOpacity="0.85" />
        </radialGradient>
        <linearGradient id={ids.bombillaGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E8E2C8" />
          <stop offset="50%" stopColor="#C8BD92" />
          <stop offset="100%" stopColor="#A89968" />
        </linearGradient>
        <filter id={ids.softShadow} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="6"
            floodColor="#2C4A36"
            floodOpacity="0.18"
          />
        </filter>
        <clipPath id={ids.gourdClip}>
          <path d="M 130 230 C 130 165, 150 130, 200 128 C 250 130, 270 165, 270 230 C 270 290, 250 330, 200 332 C 150 330, 130 290, 130 230 Z" />
        </clipPath>
      </defs>

      <ellipse cx="200" cy="365" rx="92" ry="14" fill="#2C4A36" opacity="0.10" />

      <g
        style={{
          transformOrigin: "200px 330px",
          transition:
            "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
          transform: shakeTransform,
        }}
      >
        <path
          d="M 130 230 C 130 165, 150 130, 200 128 C 250 130, 270 165, 270 230 C 270 290, 250 330, 200 332 C 150 330, 130 290, 130 230 Z"
          fill={`url(#${ids.gourdGrad})`}
          filter={`url(#${ids.softShadow})`}
        />

        <g clipPath={`url(#${ids.gourdClip})`}>
          <path
            style={{
              transition:
                "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
            d="M 130 290 Q 165 220 200 215 Q 245 222 270 270 L 270 332 L 130 332 Z"
            fill={`url(#${ids.yerbaGrad})`}
            opacity={activeStep === 1 ? 1 : 0}
          />
          <path
            style={{
              transition:
                "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
            d="M 130 250 Q 165 238 200 237 Q 245 238 270 250 L 270 332 L 130 332 Z"
            fill={`url(#${ids.yerbaGrad})`}
            opacity={[2, 3, 4, 5].includes(activeStep) ? 1 : 0}
          />
          <ellipse
            style={{
              transition:
                "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
            cx="225"
            cy="246"
            rx="26"
            ry="16"
            fill="#EFE7D2"
            opacity={activeStep === 3 ? 1 : 0}
          />
          <ellipse
            style={{
              transition:
                "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
            cx="225"
            cy="252"
            rx="34"
            ry="20"
            fill={`url(#${ids.yerbaWetGrad})`}
            opacity={[4, 5, 6].includes(activeStep) ? 1 : 0}
          />
          <ellipse
            style={{
              transition:
                "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
            cx="225"
            cy="248"
            rx="22"
            ry="12"
            fill={`url(#${ids.waterGrad})`}
            opacity={activeStep === 4 ? 1 : activeStep === 5 ? 0.35 : 0}
          />
          <path
            style={{
              transition:
                "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
            d="M 130 228 Q 165 220 200 220 Q 245 220 270 228 L 270 260 L 130 260 Z"
            fill={`url(#${ids.waterGrad})`}
            opacity={activeStep === 6 ? 1 : 0}
          />
          <g
            style={{
              transition:
                "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
              opacity: activeStep === 1 ? 1 : 0,
            }}
          >
            <circle cx="195" cy="150" r="2.4" fill="#5E7E45" />
            <circle cx="205" cy="160" r="2" fill="#8AAE6E" />
            <circle cx="188" cy="170" r="2.2" fill="#5E7E45" />
            <circle cx="212" cy="178" r="1.8" fill="#8AAE6E" />
            <circle cx="198" cy="188" r="2.4" fill="#5E7E45" />
            <circle cx="206" cy="198" r="2" fill="#8AAE6E" />
            <circle cx="190" cy="205" r="2.1" fill="#5E7E45" />
          </g>
        </g>

        <path
          d="M 145 180 C 145 230 150 280 165 310"
          stroke={`url(#${ids.gourdShine})`}
          strokeWidth="14"
          fill="none"
          opacity="0.6"
        />

        <ellipse
          cx="200"
          cy="130"
          rx="38"
          ry="13"
          fill="#E8DCC0"
          stroke="#A9844F"
          strokeWidth="3"
        />
        <ellipse cx="200" cy="128" rx="34" ry="10" fill="#F2E9D3" />

        <g
          style={{
            transition:
              "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
            opacity: activeStep === 6 ? 1 : 0,
          }}
        >
          <path
            d="M 195 110 C 190 95 205 90 198 75 C 192 62 205 58 200 45"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
          <path
            d="M 212 112 C 218 98 206 92 214 78 C 220 66 208 60 215 48"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        </g>

        <g
          style={{
            transition:
              "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
            opacity: [5, 6].includes(activeStep) ? 1 : 0,
          }}
        >
          <rect
            x="221"
            y="60"
            width="9"
            height="190"
            rx="4.5"
            fill={`url(#${ids.bombillaGrad})`}
            stroke="#8C7A4C"
            strokeWidth="1.2"
            transform="rotate(8 225 246)"
          />
          <ellipse
            cx="222"
            cy="58"
            rx="13"
            ry="9"
            fill="#D9CFA6"
            stroke="#8C7A4C"
            strokeWidth="1.4"
            transform="rotate(8 225 246)"
          />
          <circle
            cx="222"
            cy="58"
            r="3.6"
            fill="#8C7A4C"
            transform="rotate(8 225 246)"
          />
        </g>
      </g>
    </svg>
  );
}

function getActiveStepIndex(
  steps: (HTMLDivElement | null)[]
): number {
  const viewportCenter = window.innerHeight / 2;
  let activeIndex = 0;
  let closestDistance = Infinity;

  steps.forEach((step, index) => {
    if (!step) return;
    const rect = step.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const distance = Math.abs(center - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      activeIndex = index;
    }
  });

  return activeIndex;
}

export default function ComoPrepararMate() {
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const updateActiveStep = () => {
    const next = getActiveStepIndex(stepRefs.current);
    setActiveStep((prev) => (prev === next ? prev : next));
  };

  useEffect(() => {
    updateActiveStep();

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateActiveStep();
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
  }, []);

  return (
    <section
      className="w-full border-t border-border bg-background"
      aria-labelledby="como-preparar-mate-title"
    >
      <div className="flex flex-row w-full">
        {/* Sticky stage */}
        <div className="sticky top-0 hidden h-screen w-1/2 shrink-0 items-center justify-center self-start overflow-hidden p-16 md:flex">
          <div className="relative flex h-[76vh] w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-2xl bg-surface shadow-lg">
            <div className="absolute left-6 top-6 z-10 flex items-center gap-2 font-body text-xs tracking-[0.35em] uppercase text-muted">
              <span className="font-display text-sm font-semibold text-foreground">
                {String(activeStep + 1).padStart(2, "0")}
              </span>
              <span>{STEPS[activeStep].tag}</span>
            </div>

            <div className="h-[55%] w-[55%]">
              <MateSvg activeStep={activeStep} />
            </div>

            <div
              className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2"
              aria-hidden="true"
            >
              {STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-400 ${
                    activeStep === index
                      ? "scale-125 bg-accent"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling text */}
        <div className="w-full md:w-1/2">
          <div className="px-6 pt-24 md:hidden">
            <motion.p
              className="font-body text-xs tracking-[0.35em] uppercase text-muted"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...REVEAL, delay: 0 }}
              viewport={VIEWPORT}
            >
              Un ritual, paso a paso
            </motion.p>
            <motion.h2
              id="como-preparar-mate-title"
              className="mt-4 font-display text-4xl font-bold leading-none tracking-tight text-foreground"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...REVEAL, delay: reduced ? 0 : 0.1 }}
              viewport={VIEWPORT}
            >
              Cómo preparar mate
            </motion.h2>
          </div>

          {STEPS.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              active={activeStep === index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* Outro */}
      <div className="flex w-full flex-col items-center justify-center border-t border-border bg-background px-6 py-24 text-center md:py-32">
        <h2 className="max-w-xl font-display text-3xl font-semibold italic tracking-tight text-foreground md:text-4xl lg:text-5xl">
          &quot;El mate no se toma. Se comparte.&quot;
        </h2>
        <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-muted">
          Ahora que conocés cada paso, el único ingrediente que falta es
          alguien con quien cebarlo.
        </p>
      </div>
    </section>
  );
}
