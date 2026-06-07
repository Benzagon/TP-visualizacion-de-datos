"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollGate } from "../hooks/useScrollGate";
import Footer from "./Footer";
import Hero, { type DrinkSelection } from "./Hero";
import Mapas from "./Mapas";
import MasToman from "./MasToman";
import CafeSection from "./CafeSection";
import MateSection from "./MateSection";
import PageStagger from "./motion/PageStagger";
import Produccion from "./Produccion";

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
            {selection === "cafe" && <CafeSection />}
            {selection === "mate" && <MateSection />}
          </div>

          <PageStagger>
            <Mapas />
            <Produccion />
            <MasToman />
            {/* <ConsumoCalendario /> */}
            <Footer />
          </PageStagger>
        </>
      )}
    </>
  );
}
