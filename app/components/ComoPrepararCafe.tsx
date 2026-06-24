"use client";

import { useEffect, useId, useRef, useState } from "react";

import styles from "./ComoPrepararMate.module.css";

const STEPS = [
  {
    tag: "Moler",
    title: "Moler el cafe",
    text: "Utiliza un molido medio para lograr una extraccion equilibrada.",
    detail: "Molido medio, textura de arena gruesa",
  },
  {
    tag: "Filtro",
    title: "Preparar el filtro",
    text: "Coloca el filtro de papel y asegurate de que quede bien apoyado.",
    detail: "Enjuaga el filtro con agua caliente primero",
  },
  {
    tag: "Cafe",
    title: "Agregar el cafe",
    text: "Distribui el cafe de manera uniforme para favorecer una extraccion pareja.",
    detail: "Aproximadamente 15 g por cada 250 ml",
  },
  {
    tag: "Preinfusion",
    title: "Preinfusion",
    text: "Verte una pequena cantidad de agua y espera unos segundos para liberar los gases del cafe.",
    detail: "30 segundos de reposo: el cafe florece",
  },
  {
    tag: "Extraccion",
    title: "Extraccion",
    text: "Continua vertiendo el agua lentamente con movimientos circulares.",
    detail: "Temperatura ideal: 90-95 C",
  },
  {
    tag: "Listo",
    title: "Listo para disfrutar",
    text: "El cafe ya esta preparado. Servilo de inmediato para apreciar todos sus aromas.",
    detail: "Mejor sin tapa para que respire",
  },
] as const;

const TIPS = [
  "Utiliza cafe recien molido para conservar mejor los aromas y sabores.",
  "Agua entre 90 y 95 C, nunca hirviendo para no quemar el cafe.",
  "No viertas toda el agua de una sola vez. La paciencia hace la diferencia.",
  "Mantene movimientos circulares suaves durante la extraccion.",
  "Usa una molienda media-gruesa para cafe de filtro.",
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

export default function ComoPrepararCafe() {
  const svgId = useId().replace(/:/g, "");
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);

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

  useEffect(() => {
    const pickActiveStep = () => {
      const viewportCenter = window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;

      stepRefs.current.forEach((stepEl, index) => {
        if (!stepEl) return;
        const rect = stepEl.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);

        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });

      setActiveStep(best);
    };

    window.addEventListener("scroll", pickActiveStep, { passive: true });
    window.addEventListener("resize", pickActiveStep);
    pickActiveStep();

    return () => {
      window.removeEventListener("scroll", pickActiveStep);
      window.removeEventListener("resize", pickActiveStep);
    };
  }, []);

  const isBrewing = activeStep === 3 || activeStep === 4;
  const coffeeTopY = activeStep >= 5 ? 348 : activeStep === 4 ? 376 : activeStep === 3 ? 398 : CUP.liquidBottomY;
  const coffeeVisible = coffeeTopY < CUP.liquidBottomY;
  const liquidX = CUP.bodyLeftX + CUP.liquidInsetX;
  const liquidWidth = CUP.bodyRightX - CUP.bodyLeftX - CUP.liquidInsetX * 2;

  return (
    <section
      className={styles.cafeRitual}
      aria-labelledby="como-preparar-cafe-title"
    >
      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>Cafe filtrado, paso a paso</div>
      </div>

      <div className={styles.story}>
        <div className={styles.stageCol}>
          <div className={styles.stageFrame}>
            <div className={styles.stageLabel}>
              <span className={styles.stageNum}>
                {String(activeStep + 1).padStart(2, "0")}
              </span>
              <span>{STEPS[activeStep].tag}</span>
            </div>

            <div className={styles.svgMount}>
              <svg
                className={styles.coffeeSvg}
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
                    <ellipse cx={CUP.centerX} cy={CUP.rimY} rx={CUP.rimRx} ry={CUP.rimRy} />
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
                <rect x="55" y="388" width="290" height="28" rx="14" fill={`url(#${ids.table})`} opacity="0.86" />
                <path d="M 85 396 C 140 389 255 404 318 394" stroke="#f4d890" strokeWidth="2" opacity="0.34" fill="none" />

                <g className={styles.coffeeBaseGroup}>
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
                  <ellipse cx={CUP.centerX} cy={CUP.rimY} rx={CUP.rimRx} ry={CUP.rimRy} fill={`url(#${ids.cupInside})`} />
                  <g id="coffee-liquid-clipped" clipPath={`url(#${ids.cupClip})`}>
                    <rect
                      className={styles.svgAnimated}
                      x={liquidX}
                      y={coffeeTopY + 3}
                      width={liquidWidth}
                      height={Math.max(0, CUP.liquidBottomY - (coffeeTopY + 3))}
                      fill={`url(#${ids.coffee})`}
                      opacity={coffeeVisible ? 1 : 0}
                    />
                    <ellipse
                      className={styles.svgAnimated}
                      cx={CUP.centerX}
                      cy={coffeeTopY}
                      rx={CUP.rimRx - CUP.liquidInsetX * 2 - 2}
                      ry={CUP.rimRy - 4}
                      fill={`url(#${ids.coffee})`}
                      opacity={coffeeVisible ? 1 : 0}
                    />
                    <ellipse
                      className={styles.svgAnimated}
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
                  <g className={styles.coffeeSteam} opacity={activeStep === 5 ? 1 : 0}>
                    <path d="M 185 326 C 176 308 194 301 187 284" />
                    <path d="M 204 326 C 198 310 212 303 205 286" />
                    <path d="M 222 328 C 234 310 214 303 223 286" />
                  </g>
                </g>

                <g className={styles.svgAnimated} opacity={activeStep < 5 ? 1 : 0}>
                  <path
                    d="M 128 210 C 136 246 151 279 168 304 L 232 304 C 249 279 264 246 272 210 Z"
                    fill={`url(#${ids.dripper})`}
                    filter={`url(#${ids.shadow})`}
                  />
                  <ellipse cx="200" cy="210" rx="78" ry="16" fill="#d4a06a" stroke="#9a6030" strokeWidth="3" />
                  <g clipPath={`url(#${ids.dripperClip})`}>
                    <path
                      d="M 150 214 L 250 214 L 228 298 L 172 298 Z"
                      fill={activeStep >= 3 ? `url(#${ids.wetFilter})` : `url(#${ids.filter})`}
                      opacity={activeStep === 1 ? 0.9 : 1}
                    />
                    <path d="M 168 230 L 182 296 M 200 224 L 200 300 M 232 230 L 218 296" stroke="#b8955a" strokeWidth="1.4" opacity="0.4" />
                    <g className={styles.svgAnimated} opacity={activeStep >= 2 && activeStep < 5 ? 1 : 0}>
                      <path
                        className={activeStep >= 3 ? styles.coffeeBloom : undefined}
                        d="M 162 260 Q 200 250 238 260 L 226 296 L 174 296 Z"
                        fill={`url(#${ids.grounds})`}
                      />
                      {[
                        [174, 267], [186, 264], [199, 263], [213, 264], [226, 268],
                        [181, 279], [194, 276], [207, 276], [220, 280], [190, 288], [210, 288],
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
                          className={styles.coffeeBubble}
                          key={cx}
                          cx={cx}
                          cy={260 + index}
                          r="3"
                          fill="none"
                          stroke="#c08840"
                          strokeWidth="0.9"
                          opacity={activeStep === 3 ? 0.72 : 0}
                          style={{ animationDelay: `${index * 0.35}s` }}
                        />
                      ))}
                    </g>
                    <g className={styles.svgAnimated} opacity={activeStep === 1 ? 1 : 0}>
                      <ellipse cx="200" cy="288" rx="18" ry="5" fill="#9fc7dc" opacity="0.38" />
                      <path d="M 183 238 Q 188 262 189 288 M 200 228 Q 200 258 200 290 M 217 238 Q 212 262 211 288" stroke="#9fc7dc" strokeWidth="1.7" opacity="0.48" fill="none" />
                    </g>
                  </g>
                </g>

                <g className={styles.svgAnimated} opacity={activeStep === 0 ? 1 : 0}>
                  <g className={styles.grinderHandle}>
                    <rect x="198" y="87" width="4" height="20" rx="2" fill="#9a7a50" />
                    <rect x="198" y="86" width="28" height="4" rx="2" fill="#9a7a50" />
                    <circle cx="226" cy="88" r="5" fill="#6f4e37" />
                  </g>
                  <path d="M 176 110 L 186 92 L 214 92 L 224 110 Z" fill="#6a4a30" />
                  <rect x="174" y="106" width="52" height="13" rx="5" fill="#7a5a40" />
                  <rect x="176" y="118" width="48" height="68" rx="8" fill="#9b6a42" />
                  <rect x="178" y="184" width="44" height="24" rx="4" fill="#5a3a22" />
                  <path d="M 184 124 C 182 145 182 164 184 178" stroke="#fff1d0" strokeWidth="4" strokeLinecap="round" opacity="0.28" />
                  <g className={styles.coffeeFalling}>
                    <circle cx="194" cy="212" r="2" fill="#5a3018" />
                    <circle cx="205" cy="225" r="1.8" fill="#7a4a28" />
                    <circle cx="198" cy="238" r="1.6" fill="#4a2814" />
                  </g>
                </g>

                <g
                  className={`${styles.svgAnimated} ${isBrewing ? styles.kettlePour : ""}`}
                  opacity={isBrewing ? 1 : 0}
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
                  id="coffee-stream"
                  className={styles.svgAnimated}
                  clipPath={`url(#${ids.streamClip})`}
                  opacity={isBrewing ? 1 : 0}
                >
                  <path
                    className={styles.coffeeFlow}
                    d={`M ${CUP.centerX} 304 C ${CUP.centerX - 2} 318 ${CUP.centerX + 2} 331 ${CUP.centerX} ${CUP.rimY - 2}`}
                    stroke="#9b6a42"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    strokeDasharray="6 5"
                    fill="none"
                  />
                  <circle className={styles.coffeeDrop} cx={CUP.centerX} cy="318" r="2.1" fill="#c4956a" />
                  <circle className={styles.coffeeDrop} cx={CUP.centerX + 1} cy="335" r="1.7" fill="#8c5430" style={{ animationDelay: "0.35s" }} />
                </g>

                <g className={styles.coffeeSteam} opacity={isBrewing ? 1 : 0}>
                  <path d="M 190 224 C 184 208 195 203 190 190" />
                  <path d="M 202 224 C 198 209 207 203 202 190" />
                  <path d="M 214 224 C 221 209 210 204 214 191" />
                </g>
              </svg>
            </div>

            <div className={styles.stageProgress} aria-hidden="true">
              {STEPS.map((_, index) => (
                <div
                  className={`${styles.dot} ${activeStep === index ? styles.active : ""}`}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.textCol}>
          {STEPS.map((step, index) => (
            <div
              className={styles.step}
              key={step.title}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
            >
              <article
                className={`${styles.stepCard} ${activeStep === index ? styles.active : ""}`}
              >
                <div className={styles.stepEyebrow}>
                  <div className={styles.stepNum}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.stepTag}>{step.tag}</div>
                </div>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
                <div className={styles.stepDetail}>
                  <svg
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
          ))}
        </div>
      </div>

      <section className={styles.tips} aria-labelledby="consejos-cafe-title">
        <h2 id="consejos-cafe-title">Algunos consejos</h2>
        <div className={styles.tipsList}>
          {TIPS.map((tip, index) => (
            <div className={styles.tipItem} key={tip}>
              <div className={styles.tipIcon}>{String(index + 1).padStart(2, "0")}</div>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.outro}>
        <h2>&quot;El buen cafe no se apura. Se prepara.&quot;</h2>
        <p>
          Ahora que conoces cada paso, solo falta elegir los granos y disfrutarlo.
        </p>
      </div>
    </section>
  );
}
