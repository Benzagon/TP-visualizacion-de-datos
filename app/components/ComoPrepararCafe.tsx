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
    tag: "Moler",
    title: "Moler el café",
    text: "Utilizá un molido medio para lograr una extracción equilibrada.",
    detail: "Molido medio, textura de arena gruesa",
  },
  {
    tag: "Filtro",
    title: "Preparar el filtro",
    text: "Colocá el filtro de papel y asegurate de que quede bien apoyado.",
    detail: "Enjuagá el filtro con agua caliente primero",
  },
  {
    tag: "Café",
    title: "Agregar el café",
    text: "Distribuí el café de manera uniforme para favorecer una extracción pareja.",
    detail: "Aproximadamente 15 g por cada 250 ml",
  },
  {
    tag: "Preinfusión",
    title: "Preinfusión",
    text: "Verté una pequeña cantidad de agua y esperá unos segundos para liberar los gases del café.",
    detail: "30 segundos de reposo: el café florece",
  },
  {
    tag: "Extracción",
    title: "Extracción",
    text: "Continuá vertiendo el agua lentamente con movimientos circulares.",
    detail: "Temperatura ideal: 90-95 °C",
  },
  {
    tag: "Listo",
    title: "Listo para disfrutar",
    text: "El café ya está preparado. Servilo de inmediato para apreciar todos sus aromas.",
    detail: "Mejor sin tapa para que respire",
  },
] as const;

const TIPS = [
  "Utilizá café recién molido para conservar mejor los aromas y sabores.",
  "Agua entre 90 y 95 °C, nunca hirviendo para no quemar el café.",
  "No viertas toda el agua de una sola vez. La paciencia hace la diferencia.",
  "Mantené movimientos circulares suaves durante la extracción.",
  "Usá una molienda media-gruesa para café de filtro.",
];

const CUP = {
  centerX: 200,
  rimY: 345,
  rimRx: 62,
  rimRy: 15,
  bodyLeftX: 138,
  bodyRightX: 262,
  bottomY: 406,
  liquidInsetX: 5,
  liquidBottomY: 404,
};

const CUP_BODY_PATH = `M ${CUP.bodyLeftX} ${CUP.rimY} C 143 ${CUP.bottomY} 257 ${CUP.bottomY} ${CUP.bodyRightX} ${CUP.rimY} Z`;
const CUP_HANDLE_PATH = "M 260 356 C 294 354 300 386 270 391";

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
                ? "border-accent-brown bg-accent-brown text-hero-foreground"
                : "border-accent-brown text-accent-brown"
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
          className={`mt-4 flex items-center gap-2 text-sm font-medium text-accent-brown transition-all duration-400 ${
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

function CoffeeSvg({ activeStep }: { activeStep: number }) {
  const svgId = useId().replace(/:/g, "");
  const ids = {
    table: `coffeeTable-${svgId}`,
    cup: `coffeeCup-${svgId}`,
    cupInside: `coffeeCupInside-${svgId}`,
    coffee: `coffeeLiquid-${svgId}`,
    saucer: `coffeeSaucer-${svgId}`,
    dripper: `coffeeDripper-${svgId}`,
    filter: `coffeeFilter-${svgId}`,
    wetFilter: `coffeeWetFilter-${svgId}`,
    grounds: `coffeeGrounds-${svgId}`,
    kettle: `coffeeKettle-${svgId}`,
    stream: `coffeeStream-${svgId}`,
    shadow: `coffeeShadow-${svgId}`,
    dripperClip: `coffeeDripperClip-${svgId}`,
    cupClip: `coffeeCupClip-${svgId}`,
    streamClip: `coffeeStreamClip-${svgId}`,
  };

  const isBrewing = activeStep === 3 || activeStep === 4;
  const coffeeTopY =
    activeStep >= 5
      ? 348
      : activeStep === 4
        ? 376
        : activeStep === 3
          ? 398
          : CUP.liquidBottomY;
  const coffeeVisible = coffeeTopY < CUP.liquidBottomY;
  const liquidX = CUP.bodyLeftX + CUP.liquidInsetX;
  const liquidWidth = CUP.bodyRightX - CUP.bodyLeftX - CUP.liquidInsetX * 2;

  const animatedStyle: React.CSSProperties = {
    transition:
      "opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
  };

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 400 440"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={ids.table} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4b87a" />
          <stop offset="100%" stopColor="#9a7a40" />
        </linearGradient>
        <linearGradient id={ids.saucer} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4eee4" />
          <stop offset="100%" stopColor="#c8bca8" />
        </linearGradient>
        <linearGradient id={ids.cup} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d8cfbf" />
          <stop offset="48%" stopColor="#fffaf2" />
          <stop offset="100%" stopColor="#c8bca8" />
        </linearGradient>
        <linearGradient id={ids.cupInside} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8e0ce" />
          <stop offset="100%" stopColor="#c8bca8" />
        </linearGradient>
        <linearGradient id={ids.coffee} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5e34" />
          <stop offset="62%" stopColor="#3e2210" />
          <stop offset="100%" stopColor="#2a160a" />
        </linearGradient>
        <linearGradient id={ids.dripper} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b87c4c" />
          <stop offset="48%" stopColor="#e8bf8a" />
          <stop offset="100%" stopColor="#9a6030" />
        </linearGradient>
        <linearGradient id={ids.filter} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="100%" stopColor="#d8c9ad" />
        </linearGradient>
        <linearGradient id={ids.wetFilter} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0dfc5" />
          <stop offset="100%" stopColor="#c9a777" />
        </linearGradient>
        <linearGradient id={ids.grounds} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c4c2a" />
          <stop offset="100%" stopColor="#3a1e0e" />
        </linearGradient>
        <linearGradient id={ids.kettle} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2f3030" />
          <stop offset="52%" stopColor="#6a6a68" />
          <stop offset="100%" stopColor="#272728" />
        </linearGradient>
        <linearGradient id={ids.stream} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5f5ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9fc7dc" stopOpacity="0.65" />
        </linearGradient>
        <filter id={ids.shadow} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="7"
            floodColor="#2e1a0e"
            floodOpacity="0.16"
          />
        </filter>
        <clipPath id={ids.dripperClip}>
          <path d="M 146 210 L 254 210 L 232 304 L 168 304 Z" />
        </clipPath>
        <clipPath id={ids.cupClip}>
          <ellipse
            cx={CUP.centerX}
            cy={CUP.rimY}
            rx={CUP.rimRx}
            ry={CUP.rimRy}
          />
          <path d={CUP_BODY_PATH} />
        </clipPath>
        <clipPath id={ids.streamClip}>
          <rect
            x={CUP.centerX - CUP.rimRx}
            y="304"
            width={CUP.rimRx * 2}
            height={CUP.rimY - 304}
          />
        </clipPath>
      </defs>

      <ellipse cx="200" cy="405" rx="124" ry="18" fill="#2e1a0e" opacity="0.1" />
      <rect
        x="55"
        y="388"
        width="290"
        height="28"
        rx="14"
        fill={`url(#${ids.table})`}
        opacity="0.86"
      />
      <path
        d="M 85 396 C 140 389 255 404 318 394"
        stroke="#f4d890"
        strokeWidth="2"
        opacity="0.34"
        fill="none"
      />

      <g style={{ transformOrigin: "200px 408px" }}>
        <ellipse cx="200" cy="408" rx="86" ry="16" fill={`url(#${ids.saucer})`} />
        <ellipse cx="200" cy="405" rx="48" ry="8" fill="#b9aa96" opacity="0.35" />
        <path
          d={CUP_BODY_PATH}
          fill={`url(#${ids.cup})`}
          filter={`url(#${ids.shadow})`}
        />
        <path
          d={CUP_HANDLE_PATH}
          fill="none"
          stroke="#d8cfbf"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <ellipse
          cx={CUP.centerX}
          cy={CUP.rimY}
          rx={CUP.rimRx}
          ry={CUP.rimRy}
          fill={`url(#${ids.cupInside})`}
        />
        <g id="coffee-liquid-clipped" clipPath={`url(#${ids.cupClip})`}>
          <rect
            style={animatedStyle}
            x={liquidX}
            y={coffeeTopY + 3}
            width={liquidWidth}
            height={Math.max(0, CUP.liquidBottomY - (coffeeTopY + 3))}
            fill={`url(#${ids.coffee})`}
            opacity={coffeeVisible ? 1 : 0}
          />
          <ellipse
            style={animatedStyle}
            cx={CUP.centerX}
            cy={coffeeTopY}
            rx={CUP.rimRx - CUP.liquidInsetX * 2 - 2}
            ry={CUP.rimRy - 4}
            fill={`url(#${ids.coffee})`}
            opacity={coffeeVisible ? 1 : 0}
          />
          <ellipse
            style={animatedStyle}
            cx={CUP.centerX - 15}
            cy={coffeeTopY - 2}
            rx="18"
            ry="4"
            fill="#c4956a"
            opacity={activeStep >= 4 ? 0.48 : 0}
          />
        </g>
        <g id="cup-outline">
          <path
            d={CUP_BODY_PATH}
            fill="none"
            stroke="#c8bca8"
            strokeWidth="2"
            opacity="0.78"
          />
          <ellipse
            cx={CUP.centerX}
            cy={CUP.rimY}
            rx={CUP.rimRx}
            ry={CUP.rimRy}
            fill="none"
            stroke="#fffaf2"
            strokeWidth="5"
          />
          <ellipse
            cx={CUP.centerX}
            cy={CUP.rimY}
            rx={CUP.rimRx - 5}
            ry={CUP.rimRy - 4}
            fill="none"
            stroke="#b9aa96"
            strokeWidth="1.4"
            opacity="0.52"
          />
        </g>
        <g
          style={{
            transition: "opacity 0.7s ease",
            opacity: activeStep === 5 ? 1 : 0,
          }}
        >
          <path
            d="M 185 326 C 176 308 194 301 187 284"
            fill="none"
            stroke="rgba(245, 239, 224, 0.72)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              animation: "vaporRise 2.8s ease-in-out infinite",
            }}
          />
          <path
            d="M 204 326 C 198 310 212 303 205 286"
            fill="none"
            stroke="rgba(245, 239, 224, 0.72)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.82"
            style={{
              animation: "vaporRise 2.8s ease-in-out infinite",
              animationDelay: "0.55s",
            }}
          />
          <path
            d="M 222 328 C 234 310 214 303 223 286"
            fill="none"
            stroke="rgba(245, 239, 224, 0.72)"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.68"
            style={{
              animation: "vaporRise 2.8s ease-in-out infinite",
              animationDelay: "1.1s",
            }}
          />
        </g>
      </g>

      <g
        style={{
          ...animatedStyle,
          opacity: activeStep < 5 ? 1 : 0,
        }}
      >
        <path
          d="M 128 210 C 136 246 151 279 168 304 L 232 304 C 249 279 264 246 272 210 Z"
          fill={`url(#${ids.dripper})`}
          filter={`url(#${ids.shadow})`}
        />
        <ellipse
          cx="200"
          cy="210"
          rx="78"
          ry="16"
          fill="#d4a06a"
          stroke="#9a6030"
          strokeWidth="3"
        />
        <g clipPath={`url(#${ids.dripperClip})`}>
          <path
            d="M 150 214 L 250 214 L 228 298 L 172 298 Z"
            fill={activeStep >= 3 ? `url(#${ids.wetFilter})` : `url(#${ids.filter})`}
            opacity={activeStep === 1 ? 0.9 : 1}
          />
          <path
            d="M 168 230 L 182 296 M 200 224 L 200 300 M 232 230 L 218 296"
            stroke="#b8955a"
            strokeWidth="1.4"
            opacity="0.4"
          />
          <g
            style={{
              ...animatedStyle,
              opacity: activeStep >= 2 && activeStep < 5 ? 1 : 0,
            }}
          >
            <path
              d="M 162 260 Q 200 250 238 260 L 226 296 L 174 296 Z"
              fill={`url(#${ids.grounds})`}
              style={{
                transformOrigin: "200px 280px",
                animation:
                  activeStep >= 3 ? "bloomPulse 2.4s ease-in-out infinite" : "none",
              }}
            />
            {[
              [174, 267],
              [186, 264],
              [199, 263],
              [213, 264],
              [226, 268],
              [181, 279],
              [194, 276],
              [207, 276],
              [220, 280],
              [190, 288],
              [210, 288],
            ].map(([cx, cy], index) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={index % 3 === 0 ? 1.8 : 1.4}
                fill={index % 2 === 0 ? "#5a3018" : "#7a4a28"}
                opacity="0.78"
              />
            ))}
            {[188, 204, 218].map((cx, index) => (
              <circle
                key={cx}
                cx={cx}
                cy={260 + index}
                r="3"
                fill="none"
                stroke="#c08840"
                strokeWidth="0.9"
                opacity={activeStep === 3 ? 0.72 : 0}
                style={{
                  transformOrigin: "center",
                  animation: activeStep === 3 ? "burbujaPop 1.8s ease-out infinite" : "none",
                  animationDelay: `${index * 0.35}s`,
                }}
              />
            ))}
          </g>
          <g
            style={{
              ...animatedStyle,
              opacity: activeStep === 1 ? 1 : 0,
            }}
          >
            <ellipse cx="200" cy="288" rx="18" ry="5" fill="#9fc7dc" opacity="0.38" />
            <path
              d="M 183 238 Q 188 262 189 288 M 200 228 Q 200 258 200 290 M 217 238 Q 212 262 211 288"
              stroke="#9fc7dc"
              strokeWidth="1.7"
              opacity="0.48"
              fill="none"
            />
          </g>
        </g>
      </g>

      <g
        style={{
          ...animatedStyle,
          opacity: activeStep === 0 ? 1 : 0,
        }}
      >
        <g
          style={{
            transformOrigin: "226px 88px",
            animation: activeStep === 0 ? "girarManivela 1.1s linear infinite" : "none",
          }}
        >
          <rect x="198" y="87" width="4" height="20" rx="2" fill="#9a7a50" />
          <rect x="198" y="86" width="28" height="4" rx="2" fill="#9a7a50" />
          <circle cx="226" cy="88" r="5" fill="#6f4e37" />
        </g>
        <path d="M 176 110 L 186 92 L 214 92 L 224 110 Z" fill="#6a4a30" />
        <rect x="174" y="106" width="52" height="13" rx="5" fill="#7a5a40" />
        <rect x="176" y="118" width="48" height="68" rx="8" fill="#9b6a42" />
        <rect x="178" y="184" width="44" height="24" rx="4" fill="#5a3a22" />
        <path
          d="M 184 124 C 182 145 182 164 184 178"
          stroke="#fff1d0"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.28"
        />
        <g>
          <circle cx="194" cy="212" r="2" fill="#5a3018" style={{ animation: activeStep === 0 ? "particulaCae 1.2s ease-in infinite" : "none" }} />
          <circle cx="205" cy="225" r="1.8" fill="#7a4a28" style={{ animation: activeStep === 0 ? "particulaCae 1.2s ease-in infinite" : "none", animationDelay: "0.22s" }} />
          <circle cx="198" cy="238" r="1.6" fill="#4a2814" style={{ animation: activeStep === 0 ? "particulaCae 1.2s ease-in infinite" : "none", animationDelay: "0.44s" }} />
        </g>
      </g>

      <g
        style={{
          ...animatedStyle,
          opacity: isBrewing ? 1 : 0,
          transformOrigin: "310px 160px",
          animation: isBrewing ? "pavaSway 2.8s ease-in-out infinite" : "none",
        }}
      >
        <ellipse cx="310" cy="192" rx="42" ry="48" fill={`url(#${ids.kettle})`} />
        <ellipse cx="310" cy="146" rx="30" ry="7" fill="#4a4a4a" />
        <circle cx="310" cy="141" r="5" fill="#3a3a3a" />
        <path
          d="M 350 175 C 370 176 374 198 366 214 C 360 228 348 224 348 217"
          fill="none"
          stroke="#383838"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 273 173 C 258 165 250 151 247 134 C 245 120 241 108 234 109 C 225 111 224 130 210 148"
          fill="none"
          stroke={`url(#${ids.kettle})`}
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 207 156 C 200 178 198 203 200 228"
          stroke={`url(#${ids.stream})`}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.86"
        />
      </g>

      <g
        style={{
          ...animatedStyle,
          opacity: isBrewing ? 1 : 0,
        }}
        clipPath={`url(#${ids.streamClip})`}
      >
        <path
          d={`M ${CUP.centerX} 304 C ${CUP.centerX - 2} 318 ${CUP.centerX + 2} 331 ${CUP.centerX} ${CUP.rimY - 2}`}
          stroke="#9b6a42"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeDasharray="6 5"
          fill="none"
          style={{
            animation: isBrewing ? "chorroFluye 0.8s linear infinite" : "none",
          }}
        />
        <circle
          cx={CUP.centerX}
          cy="318"
          r="2.1"
          fill="#c4956a"
          style={{
            animation: isBrewing ? "caidaGota 1s ease-in infinite" : "none",
          }}
        />
        <circle
          cx={CUP.centerX + 1}
          cy="335"
          r="1.7"
          fill="#8c5430"
          style={{
            animation: isBrewing ? "caidaGota 1s ease-in infinite" : "none",
            animationDelay: "0.35s",
          }}
        />
      </g>

      <g
        style={{
          transition: "opacity 0.7s ease",
          opacity: isBrewing ? 1 : 0,
        }}
      >
        <path
          d="M 190 224 C 184 208 195 203 190 190"
          fill="none"
          stroke="rgba(245, 239, 224, 0.72)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ animation: isBrewing ? "vaporRise 2.8s ease-in-out infinite" : "none" }}
        />
        <path
          d="M 202 224 C 198 209 207 203 202 190"
          fill="none"
          stroke="rgba(245, 239, 224, 0.72)"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.82"
          style={{
            animation: isBrewing ? "vaporRise 2.8s ease-in-out infinite" : "none",
            animationDelay: "0.55s",
          }}
        />
        <path
          d="M 214 224 C 221 209 210 204 214 191"
          fill="none"
          stroke="rgba(245, 239, 224, 0.72)"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.68"
          style={{
            animation: isBrewing ? "vaporRise 2.8s ease-in-out infinite" : "none",
            animationDelay: "1.1s",
          }}
        />
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

export default function ComoPrepararCafe() {
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
      aria-labelledby="como-preparar-cafe-title"
    >
      <div className="flex w-full flex-row">
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
              Café filtrado, paso a paso
            </motion.p>
            <motion.h2
              id="como-preparar-cafe-title"
              className="mt-4 font-display text-4xl font-bold leading-none tracking-tight text-foreground"
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...REVEAL, delay: reduced ? 0 : 0.1 }}
              viewport={VIEWPORT}
            >
              Cómo preparar café
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
              <CoffeeSvg activeStep={activeStep} />
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
                      ? "scale-125 bg-accent-brown"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Outro */}
      <div className="flex w-full flex-col items-center justify-center border-t border-border bg-background px-6 py-24 text-center md:py-32">
        <h2 className="max-w-xl font-display text-3xl font-semibold italic tracking-tight text-foreground md:text-4xl lg:text-5xl">
          &quot;El buen café no se apura. Se prepara.&quot;
        </h2>
        <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-muted">
          Ahora que conocés cada paso, solo falta elegir los granos y
          disfrutarlo.
        </p>
      </div>
    </section>
  );
}
