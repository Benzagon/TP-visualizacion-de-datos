"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrollY * 0.45}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] h-[120%] w-full will-change-transform"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Nombres */}
      <div className="absolute flex flex-col z-10 items-start justify-start px-12 pt-12 gap-2">
        <p className="font-jakarta font-semibold text-xl text-[#FFE6D0]">Franco Arrieta.</p>
        <p className="font-jakarta font-semibold text-xl text-[#FFE6D0]">Agustín Basmagi.</p>
        <p className="font-jakarta font-semibold text-xl text-[#FFE6D0]">Gonzalo Benzaquen.</p>
      </div>
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <h1
          className="text-5xl font-jakarta text-[#FFE6D0] font-bold"
        >
          Las infusiones.
        </h1>
      </div>

      {/* ── Scroll indicator ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-80">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#FFE6D0]">
            Scroll
            </span>
            <div className="w-px h-10 overflow-hidden bg-white/10">
            <div className="w-full h-1/2 bg-white animate-[scrollDot_1.8s_ease-in-out_infinite]" />
            </div>
        </div> 
        {/* ── Keyframes ── */}
        <style>{`
        @keyframes scrollDot {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(300%); }
        }`}
        </style>
    </section>
  );
}
