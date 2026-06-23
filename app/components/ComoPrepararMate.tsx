"use client";

import { useEffect, useId, useRef, useState } from "react";

import styles from "./ComoPrepararMate.module.css";

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

export default function ComoPrepararMate() {
  const svgId = useId().replace(/:/g, "");
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shakeTimers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [shakeTransform, setShakeTransform] = useState("");

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

  useEffect(() => {
    shakeTimers.current.forEach(clearTimeout);
    shakeTimers.current = [];

    if (activeStep !== 2) {
      setShakeTransform("");
      return;
    }

    const sequence = [
      "translateX(-3px) rotate(-1.2deg)",
      "translateX(3px) rotate(1.2deg)",
      "translateX(-2px) rotate(-0.8deg)",
      "translateX(2px) rotate(0.8deg)",
      "translateX(0px) rotate(0deg)",
      "",
    ];

    sequence.forEach((transform, index) => {
      shakeTimers.current.push(
        setTimeout(() => setShakeTransform(transform), index * 90),
      );
    });

    return () => {
      shakeTimers.current.forEach(clearTimeout);
      shakeTimers.current = [];
    };
  }, [activeStep]);

  const mateTransform =
    shakeTransform || (activeStep === 1 ? "rotate(-12deg)" : "rotate(0deg)");

  return (
    <section
      className={styles.mateRitual}
      aria-labelledby="como-preparar-mate-title"
    >
      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>Un ritual, paso a paso</div>
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
                className={styles.mateSvg}
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
                  className={styles.mateGroup}
                  style={{ transform: mateTransform }}
                >
                  <path
                    d="M 130 230 C 130 165, 150 130, 200 128 C 250 130, 270 165, 270 230 C 270 290, 250 330, 200 332 C 150 330, 130 290, 130 230 Z"
                    fill={`url(#${ids.gourdGrad})`}
                    filter={`url(#${ids.softShadow})`}
                  />

                  <g clipPath={`url(#${ids.gourdClip})`}>
                    <path
                      className={styles.svgAnimated}
                      d="M 130 290 Q 165 220 200 215 Q 245 222 270 270 L 270 332 L 130 332 Z"
                      fill={`url(#${ids.yerbaGrad})`}
                      opacity={activeStep === 1 ? 1 : 0}
                    />
                    <path
                      className={styles.svgAnimated}
                      d="M 130 250 Q 165 238 200 237 Q 245 238 270 250 L 270 332 L 130 332 Z"
                      fill={`url(#${ids.yerbaGrad})`}
                      opacity={[2, 3, 4, 5].includes(activeStep) ? 1 : 0}
                    />
                    <ellipse
                      className={styles.svgAnimated}
                      cx="225"
                      cy="246"
                      rx="26"
                      ry="16"
                      fill="#EFE7D2"
                      opacity={activeStep === 3 ? 1 : 0}
                    />
                    <ellipse
                      className={styles.svgAnimated}
                      cx="225"
                      cy="252"
                      rx="34"
                      ry="20"
                      fill={`url(#${ids.yerbaWetGrad})`}
                      opacity={[4, 5, 6].includes(activeStep) ? 1 : 0}
                    />
                    <ellipse
                      className={styles.svgAnimated}
                      cx="225"
                      cy="248"
                      rx="22"
                      ry="12"
                      fill={`url(#${ids.waterGrad})`}
                      opacity={activeStep === 4 ? 1 : activeStep === 5 ? 0.35 : 0}
                    />
                    <path
                      className={styles.svgAnimated}
                      d="M 130 228 Q 165 220 200 220 Q 245 220 270 228 L 270 260 L 130 260 Z"
                      fill={`url(#${ids.waterGrad})`}
                      opacity={activeStep === 6 ? 1 : 0}
                    />
                    <g
                      className={styles.svgAnimated}
                      opacity={activeStep === 1 ? 1 : 0}
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
                    className={styles.svgAnimated}
                    opacity={activeStep === 6 ? 1 : 0}
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
                    className={styles.svgAnimated}
                    opacity={[5, 6].includes(activeStep) ? 1 : 0}
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

      <div className={styles.outro}>
        <h2>&quot;El mate no se toma. Se comparte.&quot;</h2>
        <p>
          Ahora que conocés cada paso, el único ingrediente que falta es alguien
          con quien cebarlo.
        </p>
      </div>
    </section>
  );
}
