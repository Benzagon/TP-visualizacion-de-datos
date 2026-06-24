"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollGate } from "../hooks/useScrollGate";
import Hero, { type DrinkSelection } from "./Hero";
import PageStagger from "./motion/PageStagger";
import CafePage from "./pages/CafePage";
import MatePage from "./pages/MatePage";
import Brindis from "./Brindis";

export default function HomeContent() {
  const [selection, setSelection] = useState<DrinkSelection>(null);
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
  
    const handleExploreOtherPath = () => {
    window.location.reload();
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

          <PageStagger>
            <Brindis />

            <section className="flex justify-center py-24 px-6">
              <button
                type="button"
                onClick={handleExploreOtherPath}
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
                Explorá el otro camino
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
