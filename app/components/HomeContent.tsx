"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollGate } from "../hooks/useScrollGate";
import Hero, { type DrinkSelection } from "./Hero";
import PageStagger from "./motion/PageStagger";
import CafePage from "./pages/CafePage";
import MatePage from "./pages/MatePage";
import Brindis from "./Brindis";

function getInitialPath(): DrinkSelection {
  if (typeof window === "undefined") return null;
  const param = new URL(window.location.href).searchParams.get("path");
  if (param === "cafe" || param === "mate") return param;
  return null;
}

export default function HomeContent() {
  const [selection, setSelection] = useState<DrinkSelection>(() => getInitialPath());
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const unlocked = selection !== null;
  useScrollGate(heroRef, unlocked);

  const handleSelect = useCallback((option: "cafe" | "mate") => {
    setSelection(option);
  }, []);

  useEffect(() => {
    if (!selection) return;
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selection]);

  const handleTogglePath = () => {
    const target = selection === "cafe" ? "mate" : "cafe";
    const url = new URL(window.location.href);
    url.searchParams.set("path", target);
    window.location.assign(url.toString());
  };

  return (
    <>
      <Hero ref={heroRef} onSelect={handleSelect} />

      {unlocked && (
        <>
          <div ref={contentRef}>
            {selection === "cafe" && <CafePage />}
            {selection === "mate" && <MatePage />}
          </div>

          <button
            type="button"
            onClick={handleTogglePath}
            aria-label={selection === "cafe" ? "Ir al camino del mate" : "Ir al camino del café"}
            className="
              fixed
              top-6 right-6
              z-50
              rounded-full
              bg-foreground
              text-background
              px-4 py-2
              text-sm
              font-medium
              shadow-lg
              transition-transform
              duration-300
              hover:scale-105
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-foreground
            "
          >
            {selection === "cafe" ? "Ir a mate" : "Ir a café"}
          </button>

          <PageStagger>
            <Brindis />

            <section className="flex justify-center py-24 px-6">
              <button
                type="button"
                onClick={handleTogglePath}
                className="
                  group
                  rounded-full
                  border border-current
                  px-8 py-4
                  text-lg
                  font-medium
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:opacity-80
                  cursor-grab
                "
              >
                {selection === "cafe" ? "Explorar camino del mate" : "Explorar camino del café"}
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </section>
          </PageStagger>
        </>
      )}
    </>
  );
}
