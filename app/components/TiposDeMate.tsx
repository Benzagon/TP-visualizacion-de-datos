"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type MateScene = {
  id: string;
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  body: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const MATE_SCENES: MateScene[] = [
  {
    id: "calabaza",
    eyebrow: "1",
    title: "Mate de calabaza",
    image: "/tipos_de_mate/mate_calabazo.jpg",
    alt: "Mate tradicional de calabaza con bombilla",
    body: "El recipiente clasico conserva una relacion viva con la yerba: se cura, absorbe matices y gana caracter con cada ronda. Es el mate que convierte la costumbre en ritual.",
  },
  {
    id: "madera",
    eyebrow: "2",
    title: "Mate de madera",
    image: "/tipos_de_mate/mate_mader.jpg",
    alt: "Mate de madera con detalles tallados",
    body: "La madera aporta una presencia calida y tactil. Su textura vuelve el cebado mas cercano, con una estetica artesanal que conversa muy bien con preparaciones suaves y pausadas.",
  },
  {
    id: "metal",
    eyebrow: "3",
    title: "Mate de metal",
    image: "/tipos_de_mate/mate_metalo.jpg",
    alt: "Mate de metal moderno",
    body: "El metal propone una lectura mas precisa y urbana: limpio, durable y de mantenimiento simple. Es una pieza pensada para acompanar el mate fuera de casa sin perder presencia.",
  },
];

function getActiveSceneIndex(sections: (HTMLDivElement | null)[]) {
  const threshold = window.innerHeight / 2;
  const active = sections.findIndex((section) => {
    if (!section) return false;
    const rect = section.getBoundingClientRect();
    return rect.top <= threshold && rect.bottom > threshold;
  });

  if (active >= 0) return active;

  return sections.reduce(
    (closest, section, index) => {
      if (!section) return closest;
      const distance = Math.abs(section.getBoundingClientRect().top);
      return distance < closest.distance ? { index, distance } : closest;
    },
    { index: 0, distance: Infinity }
  ).index;
}

function StoryPanel({
  scene,
  index,
  reduced,
}: {
  scene: MateScene;
  index: number;
  reduced: boolean;
}) {
  const hidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 };
  const visible = { opacity: 1, y: 0 };

  return (
      <motion.article
    className="mx-auto max-w-md text-center text-hero-foreground"
    initial={hidden}
    whileInView={visible}
    exit={hidden}
    viewport={{ amount: 0.6, margin: "-8% 0px -8% 0px" }}
    transition={{ duration: reduced ? 0 : 0.85, ease: EASE }}
  >
    <p className="font-body text-xs uppercase tracking-[0.35em] text-hero-foreground/60">
      TIPO DE MATE
    </p>

    <h2 className="mt-4 font-display text-5xl font-bold leading-none tracking-tight text-hero-foreground">
      {scene.title}
    </h2>

    <p className="font-body text-lg font-normal leading-relaxed text-hero-foreground/60 mt-4">
      {scene.body}
    </p>
  </motion.article>
  );
}

export default function TiposDeMate() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const updateActiveScene = useCallback(() => {
    const next = getActiveSceneIndex(sectionRefs.current);
    setActiveIndex((current) => (current === next ? current : next));
  }, []);

  useEffect(() => {
    updateActiveScene();

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateActiveScene();
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
  }, [updateActiveScene]);

  const activeScene = MATE_SCENES[activeIndex];

  return (
    <section className="relative w-full bg-[#29493D] text-hero-foreground">
      <div className="grid min-h-screen grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
        <div className="sticky top-0 h-screen px-8 py-8">
          <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/12 bg-[#10231d]">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeScene.id}
                className="absolute inset-0"
                initial={
                  reduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                transition={{ duration: reduced ? 0 : 0.38, ease: EASE }}
              >
                <Image
                  src={activeScene.image}
                  alt={activeScene.alt}
                  fill
                  priority={activeIndex === 0}
                  sizes="50vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute inset-0 bg-[linear-gradient(90deg,rgb(9_24_19/.72),rgb(9_24_19/.16)_48%,rgb(9_24_19/.55)),linear-gradient(180deg,rgb(9_24_19/.18),rgb(9_24_19/.35))]"
              aria-hidden
            />

            <div
              className="absolute bottom-6 left-6 flex gap-2"
              aria-label="Progreso de tipos de mate"
            >
              {MATE_SCENES.map((scene, index) => (
                <span
                  key={scene.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-10 bg-hero-foreground"
                      : "w-4 bg-hero-foreground/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          {MATE_SCENES.map((scene, index) => (
            <div
              key={scene.id}
              ref={(element) => {
                sectionRefs.current[index] = element;
              }}
              className="flex min-h-screen items-center justify-center px-12 py-28"
            >
              <div className="mx-auto w-full max-w-2xl">
                <StoryPanel scene={scene} index={index} reduced={reduced} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
