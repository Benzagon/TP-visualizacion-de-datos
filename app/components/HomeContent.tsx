"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollGate } from "../hooks/useScrollGate";
import Footer from "./Footer";
import Hero, { type DrinkSelection } from "./Hero";
import Mapas from "./Mapas";
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
            {/* <ConsumoCalendario /> */}
            <Mapas />
            <Brindis />
          </PageStagger>
        </>
      )}
    </>
  );
}
