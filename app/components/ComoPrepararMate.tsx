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
    gCuerpo: `gCuerpo-${svgId}`,
    gCuerpoV: `gCuerpoV-${svgId}`,
    gCuello: `gCuello-${svgId}`,
    gBorde: `gBorde-${svgId}`,
    gInterior: `gInterior-${svgId}`,
    gBrillo: `gBrillo-${svgId}`,
    gYerbaSeca: `gYerbaSeca-${svgId}`,
    gYerbaHumeda: `gYerbaHumeda-${svgId}`,
    gAgua: `gAgua-${svgId}`,
    gAguaBrillo: `gAguaBrillo-${svgId}`,
    gBombillaTubo: `gBombillaTubo-${svgId}`,
    gBombillaFiltro: `gBombillaFiltro-${svgId}`,
    fSombra: `fSombra-${svgId}`,
    clipInterior: `clipInterior-${svgId}`,
  };

  const transition =
    "opacity .75s cubic-bezier(.22,.61,.36,1), transform .85s cubic-bezier(.22,.61,.36,1)";

  const showMontaña = [2, 3, 4, 5, 6].includes(activeStep);
  const showHumedo = [4, 5, 6].includes(activeStep);

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
        <linearGradient id={ids.gCuerpo} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A87A3C" />
          <stop offset="22%" stopColor="#CD9D5C" />
          <stop offset="48%" stopColor="#BD8A48" />
          <stop offset="75%" stopColor="#946625" />
          <stop offset="100%" stopColor="#714C18" />
        </linearGradient>
        <linearGradient id={ids.gCuerpoV} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0B878" stopOpacity=".65" />
          <stop offset="42%" stopColor="#C49850" stopOpacity="0" />
          <stop offset="100%" stopColor="#5E3E12" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id={ids.gCuello} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8E6430" />
          <stop offset="30%" stopColor="#D2A868" />
          <stop offset="55%" stopColor="#C2954E" />
          <stop offset="100%" stopColor="#6E4A18" />
        </linearGradient>
        <linearGradient id={ids.gBorde} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAC988" />
          <stop offset="55%" stopColor="#C49A52" />
          <stop offset="100%" stopColor="#7C5420" />
        </linearGradient>
        <radialGradient id={ids.gInterior} cx="50%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#E8CC96" />
          <stop offset="55%" stopColor="#B6863F" />
          <stop offset="100%" stopColor="#714C18" />
        </radialGradient>
        <linearGradient id={ids.gBrillo} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity=".3" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.gYerbaSeca} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9AC178" />
          <stop offset="55%" stopColor="#739E52" />
          <stop offset="100%" stopColor="#4E7034" />
        </linearGradient>
        <linearGradient id={ids.gYerbaHumeda} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#46662F" />
          <stop offset="100%" stopColor="#2C4420" />
        </linearGradient>
        <linearGradient id={ids.gAgua} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D2EBDA" stopOpacity=".92" />
          <stop offset="55%" stopColor="#AED8BE" stopOpacity=".82" />
          <stop offset="100%" stopColor="#8FBFA4" stopOpacity=".88" />
        </linearGradient>
        <linearGradient id={ids.gAguaBrillo} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity=".55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.gBombillaTubo} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8C7A36" />
          <stop offset="25%" stopColor="#E4D084" />
          <stop offset="50%" stopColor="#C2AE5C" />
          <stop offset="75%" stopColor="#F2E0A8" />
          <stop offset="100%" stopColor="#94843A" />
        </linearGradient>
        <linearGradient id={ids.gBombillaFiltro} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#766A28" />
          <stop offset="35%" stopColor="#D8C074" />
          <stop offset="65%" stopColor="#B8A050" />
          <stop offset="100%" stopColor="#685A1C" />
        </linearGradient>
        <filter id={ids.fSombra} x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="6"
            floodColor="#243D2C"
            floodOpacity=".22"
          />
        </filter>
        <clipPath id={ids.clipInterior}>
          <path d="M 136 160 C 134 204 138 248 147 278 C 156 306 176 324 200 326 C 224 324 244 306 253 278 C 262 248 266 204 264 160 Z" />
        </clipPath>
      </defs>

      <ellipse cx="200" cy="348" rx="82" ry="11" fill="#243D2C" opacity=".11" />

      <g
        style={{
          transformOrigin: "200px 332px",
          transition,
          transform:
            activeStep === 1 ? "rotate(-10deg)" : "rotate(0deg)",
        }}
      >
        <path
          d="M 126 162 C 124 206 128 250 138 282 C 148 312 172 332 200 335 C 228 332 252 312 262 282 C 272 250 276 206 274 162 C 274 158 270 156 266 156 L 256 156 C 258 200 254 244 244 274 C 235 300 219 316 200 318 C 181 316 165 300 156 274 C 146 244 142 200 144 156 L 134 156 C 130 156 126 158 126 162 Z"
          fill={`url(#${ids.gCuerpo})`}
          filter={`url(#${ids.fSombra})`}
        />
        <path
          d="M 126 162 C 124 206 128 250 138 282 C 148 312 172 332 200 335 C 228 332 252 312 262 282 C 272 250 276 206 274 162 C 274 158 270 156 266 156 L 256 156 C 258 200 254 244 244 274 C 235 300 219 316 200 318 C 181 316 165 300 156 274 C 146 244 142 200 144 156 L 134 156 C 130 156 126 158 126 162 Z"
          fill={`url(#${ids.gCuerpoV})`}
        />

        <path
          d="M 142 188 C 137 222 140 260 150 288"
          stroke="#8A6228"
          strokeWidth="1.3"
          fill="none"
          opacity=".4"
        />
        <path
          d="M 258 188 C 263 222 260 260 250 288"
          stroke="#6E4A18"
          strokeWidth="1.3"
          fill="none"
          opacity=".35"
        />
        <path
          d="M 168 168 C 162 210 165 256 178 296"
          stroke="#9A7232"
          strokeWidth="1"
          fill="none"
          opacity=".28"
        />
        <path
          d="M 232 168 C 238 210 235 256 222 296"
          stroke="#7C5420"
          strokeWidth="1"
          fill="none"
          opacity=".25"
        />
        <path
          d="M 200 160 C 198 216 198 276 200 318"
          stroke="#A6824A"
          strokeWidth=".8"
          fill="none"
          opacity=".2"
        />

        <g clipPath={`url(#${ids.clipInterior})`}>
          <rect x="120" y="150" width="160" height="190" fill={`url(#${ids.gInterior})`} />
          <ellipse cx="200" cy="300" rx="58" ry="22" fill="#5A3E14" opacity=".22" />

          <path
            d="M 150 180 C 146 220 149 264 160 300"
            stroke="#8A6228"
            strokeWidth="1"
            fill="none"
            opacity=".22"
          />
          <path
            d="M 250 180 C 254 220 251 264 240 300"
            stroke="#6E4A18"
            strokeWidth="1"
            fill="none"
            opacity=".2"
          />
          <path
            d="M 200 160 C 199 210 199 270 200 320"
            stroke="#9A7232"
            strokeWidth=".7"
            fill="none"
            opacity=".15"
          />

          <g
            style={{
              transition,
              opacity: activeStep === 1 ? 1 : 0,
            }}
          >
            <path
              d="M 136 290 Q 165 232 210 218 Q 248 222 264 256 L 264 326 L 136 326 Z"
              fill={`url(#${ids.gYerbaSeca})`}
            />
            <ellipse cx="178" cy="262" rx="5" ry="2.1" fill="#6A9A48" opacity=".6" transform="rotate(-18 178 262)" />
            <ellipse cx="198" cy="250" rx="5.4" ry="2.1" fill="#88B268" opacity=".55" transform="rotate(8 198 250)" />
            <ellipse cx="222" cy="244" rx="5" ry="2" fill="#5E8A40" opacity=".58" transform="rotate(-6 222 244)" />
            <ellipse cx="244" cy="252" rx="4.6" ry="2" fill="#78A658" opacity=".5" transform="rotate(14 244 252)" />
            <circle cx="188" cy="256" r="1.6" fill="#5C8838" opacity=".5" />
            <circle cx="210" cy="246" r="1.7" fill="#7AAA58" opacity=".48" />
            <circle cx="233" cy="248" r="1.5" fill="#5A8636" opacity=".5" />
          </g>

          <path
            style={{ transition, opacity: showMontaña ? 1 : 0 }}
            d="M 136 306 Q 148 296 160 290 Q 178 280 196 266 Q 214 250 232 230 Q 246 214 258 198 Q 262 192 264 188 L 264 326 L 136 326 Z"
            fill={`url(#${ids.gYerbaSeca})`}
          />
          <g
            style={{
              transition,
              opacity: showMontaña ? 1 : 0,
            }}
          >
            <path
              d="M 140 304 Q 152 294 164 288 Q 182 278 200 264 Q 218 248 236 228 Q 250 212 260 196"
              stroke="#7EAA5A"
              strokeWidth="1.4"
              fill="none"
              opacity=".55"
            />
            <ellipse cx="156" cy="292" rx="4.6" ry="1.9" fill="#6A9A48" opacity=".55" transform="rotate(-28 156 292)" />
            <ellipse cx="178" cy="278" rx="5" ry="2" fill="#88B268" opacity=".5" transform="rotate(-32 178 278)" />
            <ellipse cx="202" cy="260" rx="5.2" ry="2" fill="#5E8A40" opacity=".55" transform="rotate(-38 202 260)" />
            <ellipse cx="226" cy="238" rx="4.8" ry="1.9" fill="#78A658" opacity=".5" transform="rotate(-42 226 238)" />
            <ellipse cx="248" cy="214" rx="4.2" ry="1.8" fill="#6A9848" opacity=".46" transform="rotate(-46 248 214)" />
            <circle cx="148" cy="299" r="1.5" fill="#5C8838" opacity=".48" />
            <circle cx="170" cy="284" r="1.6" fill="#7AAA58" opacity=".46" />
            <circle cx="192" cy="268" r="1.5" fill="#5A8636" opacity=".48" />
            <circle cx="214" cy="248" r="1.6" fill="#6A9848" opacity=".46" />
            <circle cx="238" cy="222" r="1.4" fill="#7EAE5C" opacity=".44" />
            <circle cx="254" cy="202" r="1.4" fill="#5C8838" opacity=".4" />
          </g>

          <ellipse
            style={{ transition, opacity: activeStep === 3 ? 1 : 0 }}
            cx="160"
            cy="288"
            rx="20"
            ry="13"
            fill="#D8C292"
          />

          <g
            style={{
              transition,
              opacity: showHumedo ? 1 : 0,
            }}
          >
            <ellipse cx="160" cy="291" rx="28" ry="18" fill={`url(#${ids.gYerbaHumeda})`} />
            <ellipse cx="153" cy="288" rx="4" ry="1.7" fill="#324E22" opacity=".5" transform="rotate(-12 153 288)" />
            <ellipse cx="167" cy="290" rx="4.2" ry="1.6" fill="#324E22" opacity=".45" transform="rotate(8 167 290)" />
          </g>

          <g
            style={{
              transition,
              opacity:
                activeStep === 4 ? 1 : activeStep === 5 ? 0.4 : 0,
            }}
          >
            <ellipse cx="160" cy="289" rx="18" ry="10" fill={`url(#${ids.gAgua})`} />
            <ellipse cx="155" cy="285" rx="8" ry="3" fill={`url(#${ids.gAguaBrillo})`} opacity=".8" />
            <ellipse cx="166" cy="292" rx="3.6" ry="1.3" fill="#fff" opacity=".18" />
          </g>

          <g
            style={{
              transition,
              opacity: activeStep === 6 ? 1 : 0,
            }}
          >
            <path
              d="M 136 312 Q 140 286 152 268 Q 166 250 184 244 Q 200 240 208 248 Q 214 258 206 274 Q 196 296 176 310 Q 156 320 140 318 Z"
              fill={`url(#${ids.gAgua})`}
            />
            <path
              d="M 140 300 Q 152 282 168 270 Q 182 261 196 258"
              stroke="#cfe9da"
              strokeWidth="1.4"
              fill="none"
              opacity=".6"
            />
            <path
              d="M 144 286 Q 158 270 174 259 Q 186 252 198 250"
              stroke="#e4f3ea"
              strokeWidth="1.1"
              fill="none"
              opacity=".5"
            />
            <ellipse cx="154" cy="296" rx="8" ry="2.8" fill="#fff" opacity=".22" />
            <ellipse cx="174" cy="278" rx="6.5" ry="2.3" fill="#fff" opacity=".2" />
            <ellipse cx="190" cy="262" rx="5" ry="1.8" fill="#fff" opacity=".18" />
          </g>

          <g
            style={{
              transition,
              opacity: activeStep === 6 ? 1 : 0,
            }}
          >
            <ellipse cx="172" cy="278" rx="22" ry="9" fill="none" stroke="#cfe9da" strokeWidth=".9" opacity=".4" />
            <ellipse cx="172" cy="278" rx="14" ry="6" fill="none" stroke="#e4f3ea" strokeWidth=".8" opacity=".35" />
          </g>

          <g
            style={{
              transition,
              opacity: activeStep === 1 ? 1 : 0,
            }}
          >
            <ellipse cx="190" cy="172" rx="3.4" ry="1.5" fill="#6E9A50" opacity=".8" transform="rotate(-12 190 172)" />
            <ellipse cx="206" cy="182" rx="3" ry="1.3" fill="#88B268" opacity=".75" transform="rotate(18 206 182)" />
            <ellipse cx="196" cy="196" rx="3.1" ry="1.3" fill="#5E8A40" opacity=".7" transform="rotate(-6 196 196)" />
            <circle cx="214" cy="204" r="1.8" fill="#7AAA58" opacity=".62" />
            <circle cx="184" cy="210" r="1.6" fill="#5C8838" opacity=".58" />
          </g>
        </g>

        <path
          d="M 144 196 C 138 232 140 272 150 302"
          stroke={`url(#${ids.gBrillo})`}
          strokeWidth="15"
          fill="none"
          opacity="0.85"
          strokeLinecap="round"
        />

        <path
          d="M 134 156 C 132 150 134 145 140 142 L 260 142 C 266 145 268 150 266 156 Z"
          fill={`url(#${ids.gCuello})`}
          opacity=".92"
        />
        <path
          d="M 142 154 C 140 149 142 145 146 143"
          stroke="#8E6430"
          strokeWidth=".8"
          fill="none"
          opacity=".4"
        />
        <path
          d="M 258 154 C 260 149 258 145 254 143"
          stroke="#6E4A18"
          strokeWidth=".8"
          fill="none"
          opacity=".35"
        />

        <ellipse cx="200" cy="146" rx="64" ry="18" fill={`url(#${ids.gInterior})`} />
        <ellipse cx="200" cy="152" rx="58" ry="13" fill="#5A3E14" opacity=".25" />
        <path
          d="M 138 142 C 138 130 165 122 200 122 C 235 122 262 130 262 142 C 262 154 235 162 200 162 C 165 162 138 154 138 142 Z"
          fill="none"
          stroke={`url(#${ids.gBorde})`}
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <ellipse cx="200" cy="142" rx="64" ry="19" fill="none" stroke="#6E4A18" strokeWidth="1.2" opacity=".5" />
        <path
          d="M 156 130 Q 178 124 200 124 Q 222 124 244 130"
          stroke="#F0D9A0"
          strokeWidth="2"
          fill="none"
          opacity=".6"
          strokeLinecap="round"
        />

        <g
          style={{
            transition,
            opacity: activeStep === 6 ? 1 : 0,
          }}
        >
          <path
            d="M 156 120 C 150 105 163 97 157 82 C 151 70 163 64 158 50"
            stroke="#CFE3DA"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            opacity=".55"
          />
          <path
            d="M 170 122 C 176 108 166 100 173 86 C 178 75 168 68 175 56"
            stroke="#CFE3DA"
            strokeWidth="2.7"
            strokeLinecap="round"
            fill="none"
            opacity=".42"
          />
          <path
            d="M 163 118 C 159 108 167 102 163 92"
            stroke="#DCEEE6"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity=".34"
          />
        </g>

        <g
          style={{
            transition,
            opacity: [5, 6].includes(activeStep) ? 1 : 0,
          }}
        >
          <g transform="rotate(-8, 160, 289)">
            <rect x="155" y="58" width="9" height="232" rx="4.5" fill={`url(#${ids.gBombillaTubo})`} />
            <rect x="158" y="64" width="2.4" height="218" rx="1.2" fill="#F2E4A8" opacity=".45" />
            <rect x="153" y="116" width="14" height="7" rx="3.5" fill={`url(#${ids.gBombillaFiltro})`} />
            <ellipse cx="160" cy="288" rx="13" ry="8.5" fill={`url(#${ids.gBombillaFiltro})`} />
            <line x1="151" y1="285" x2="169" y2="285" stroke="#907820" strokeWidth=".9" opacity=".5" />
            <line x1="150" y1="288" x2="170" y2="288" stroke="#907820" strokeWidth=".9" opacity=".5" />
            <line x1="151" y1="291" x2="169" y2="291" stroke="#907820" strokeWidth=".9" opacity=".45" />
            <line x1="155" y1="281" x2="155" y2="295" stroke="#907820" strokeWidth=".8" opacity=".4" />
            <line x1="160" y1="280" x2="160" y2="296" stroke="#907820" strokeWidth=".8" opacity=".4" />
            <line x1="165" y1="281" x2="165" y2="295" stroke="#907820" strokeWidth=".8" opacity=".38" />
            <ellipse cx="156" cy="284" rx="4.5" ry="2.2" fill="#F0E0A0" opacity=".35" />
            <ellipse cx="160" cy="60" rx="9" ry="5.5" fill={`url(#${ids.gBombillaTubo})`} />
            <ellipse cx="160" cy="59" rx="6.3" ry="3.4" fill="#F2E4B0" opacity=".7" />
            <ellipse cx="160" cy="60" rx="9" ry="5.5" fill="none" stroke="#906820" strokeWidth="1.4" />
          </g>
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
