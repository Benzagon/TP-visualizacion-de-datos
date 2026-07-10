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
    image: "/tipos_de_mate/mateCalabaza.jpg",
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

function SceneImage({ scene, index, activeIndex, reduced }: { scene: MateScene; index: number; activeIndex: number; reduced: boolean }) {
  return (
    <div className="sticky top-0 flex h-screen w-1/2 shrink-0 items-center self-start overflow-hidden p-16">
      <div className="relative h-[76vh] w-full overflow-hidden rounded-2xl">
        <AnimatePresence mode="sync">
          {index === activeIndex && (
            <motion.div
              key={scene.id}
              className="absolute inset-0"
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
              transition={{ duration: reduced ? 0 : 0.38, ease: EASE }}
            >
              <Image
                src={scene.image}
                alt={scene.alt}
                fill
                priority={index === 0}
                sizes="50vw"
                className="object-cover object-center"
              />
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </div>
  );
}

function SceneText({ scene, reduced }: { scene: MateScene; reduced: boolean }) {
  const hidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 };
  const visible = { opacity: 1, y: 0 };

  return (
    <div className="w-1/2 bg-background">
      <div className="flex min-h-[140vh] items-center px-16 py-32">
        <div className="max-w-md">
          <motion.article
            className="text-hero-foreground"
            initial={hidden}
            whileInView={visible}
            exit={hidden}
            viewport={{ amount: 0.6, margin: "-8% 0px -8% 0px" }}
            transition={{ duration: reduced ? 0 : 0.85, ease: EASE }}
          >
            <p className="font-body text-xs uppercase tracking-[0.35em] text-muted">
              TIPO DE MATE
            </p>

            <h2 className="mt-4 font-display text-5xl font-bold leading-none tracking-tight text-foreground">
              {scene.title}
            </h2>

            <p className="mt-6 font-body text-lg font-normal leading-relaxed text-muted">
              {scene.body}
            </p>
          </motion.article>
        </div>
      </div>
    </div>
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

  return (
    <section className="w-full border-t border-border bg-background">
      {MATE_SCENES.map((scene, index) => (
        <section
          key={scene.id}
          ref={(element: HTMLDivElement | null) => {
            sectionRefs.current[index] = element;
          }}
          className="flex w-full flex-row bg-background"
        >
          {index % 2 === 0 ? (
            <>
              <SceneImage
                scene={scene}
                index={index}
                activeIndex={activeIndex}
                reduced={reduced}
              />
              <SceneText scene={scene} reduced={reduced} />
            </>
          ) : (
            <>
              <SceneText scene={scene} reduced={reduced} />
              <SceneImage
                scene={scene}
                index={index}
                activeIndex={activeIndex}
                reduced={reduced}
              />
            </>
          )}
        </section>
      ))}
    </section>
  );
}
