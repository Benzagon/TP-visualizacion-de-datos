"use client";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0E0B08] py-12 flex flex-col items-center justify-center">
      {/* ── Grain texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Radial warm glow behind illustration ── */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgb(111,78,55) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Thin horizontal rule lines (atmosphere) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[15, 35, 65, 85].map((top) => (
          <div
            key={top}
            className="absolute w-full h-px opacity-[0.04]"
            style={{ top: `${top}%`, background: "rgb(111,78,55)" }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: typography ── */}
        <div className="flex flex-col gap-8">

          {/* headline */}
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-white">
              Café y mate
            </h1>
          </div>

          {/* body */}
          <p className="text-[#A8917C] text-lg leading-relaxed max-w-md">
            Explora el mundo de las infusiones
          </p>

          {/* stats row */}
          <div className="flex gap-10 pt-4 border-t border-white/5">
            {[
              { value: "70+", label: "Países de origen" },
              { value: "12",  label: "Visualizaciones" },
              { value: "3B",  label: "Vasos por día" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl font-serif text-white">{value}</span>
                <span className="text-xs text-[#6B5744] tracking-wide uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: illustration ── */}
        <div className="flex items-center justify-center">
          <IllustrationDuo />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white">Scroll</span>
        <div className="w-px h-10 overflow-hidden bg-white/10">
          <div className="w-full h-1/2 bg-white animate-[scrollDot_1.8s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        @keyframes steam1 {
          0%,100% { transform: translateY(0)   scaleX(1);   opacity: 0; }
          15%      { opacity: 0.5; }
          80%      { opacity: 0.15; }
          100%     { transform: translateY(-52px) scaleX(1.3); opacity: 0; }
        }
        @keyframes steam2 {
          0%,100% { transform: translateY(0)   scaleX(1);   opacity: 0; }
          15%      { opacity: 0.4; }
          80%      { opacity: 0.1; }
          100%     { transform: translateY(-48px) scaleX(0.8); opacity: 0; }
        }
        @keyframes steam3 {
          0%,100% { transform: translateY(0)   scaleX(1);   opacity: 0; }
          15%      { opacity: 0.35; }
          80%      { opacity: 0.1; }
          100%     { transform: translateY(-44px) scaleX(1.1); opacity: 0; }
        }
        @keyframes floatUp {
          0%,100% { transform: translateY(0px);   }
          50%      { transform: translateY(-10px); }
        }
        @keyframes floatUpAlt {
          0%,100% { transform: translateY(0px);  }
          50%      { transform: translateY(-7px); }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Inline SVG illustration — coffee (left) + mate (right)
───────────────────────────────────────────── */
function IllustrationDuo() {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[640px]"
      aria-label="Coffee cup on the left and mate gourd on the right"
    >
      {/* ── Shadow / base ellipses ── */}
      <ellipse cx="155" cy="420" rx="90" ry="12" fill="#6F4E37" opacity="0.18" />
      <ellipse cx="330" cy="430" rx="75" ry="10" fill="#6BAA75" opacity="0.15" />

      {/* ══════════════════════════════
          COFFEE CUP  (left)
      ══════════════════════════════ */}
      <g style={{ animation: "floatUp 4s ease-in-out infinite" }}>

        {/* Saucer */}
        <ellipse cx="155" cy="408" rx="78" ry="11" fill="#3A2518" />
        <ellipse cx="155" cy="406" rx="78" ry="11" fill="#4A3020" />
        <ellipse cx="155" cy="404" rx="72" ry="8"  fill="#5A3A28" />

        {/* Cup body */}
        <path d="M102 320 C100 360 108 395 155 400 C202 395 210 360 208 320 Z" fill="#6F4E37" />
        <path d="M102 320 C100 360 108 395 155 400 C202 395 210 360 208 320 Z" fill="url(#coffeeBodyShade)" />

        {/* Cup rim */}
        <ellipse cx="155" cy="320" rx="53" ry="10" fill="#8B6347" />
        <ellipse cx="155" cy="318" rx="53" ry="10" fill="#9B7357" />

        {/* Coffee liquid surface */}
        <ellipse cx="155" cy="318" rx="48" ry="8" fill="#2C1810" />
        {/* Crema ring */}
        <ellipse cx="155" cy="318" rx="48" ry="8" fill="none" stroke="#C8935A" strokeWidth="3" opacity="0.6" />
        {/* Latte art — simple heart */}
        <path
          d="M148 316 C148 313 152 311 155 314 C158 311 162 313 162 316 C162 320 155 324 155 324 C155 324 148 320 148 316Z"
          fill="#C8935A"
          opacity="0.5"
        />

        {/* Handle */}
        <path d="M208 335 C230 335 238 348 238 358 C238 368 230 378 208 376" stroke="#8B6347" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M208 335 C228 335 234 348 234 358 C234 368 228 376 208 374" stroke="#6F4E37" strokeWidth="6"  strokeLinecap="round" fill="none" />

        {/* Cup highlight */}
        <path d="M118 330 C116 355 120 385 130 394" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.08" />

        {/* Steam wisps */}
        <g transform="translate(135, 270)">
          <path d="M0 48 C-6 36 6 24 0 12 C-6 0 0 -8 0 -8" stroke="#C8935A" strokeWidth="2.5" strokeLinecap="round" fill="none"
            style={{ animation: "steam1 2.8s ease-in-out infinite" }} />
        </g>
        <g transform="translate(155, 265)">
          <path d="M0 48 C5 36 -5 24 0 12 C5 0 0 -8 0 -8" stroke="#C8935A" strokeWidth="2" strokeLinecap="round" fill="none"
            style={{ animation: "steam2 2.8s ease-in-out infinite 0.6s" }} />
        </g>
        <g transform="translate(173, 272)">
          <path d="M0 44 C-4 33 4 22 0 11 C-4 0 0 -6 0 -6" stroke="#C8935A" strokeWidth="1.8" strokeLinecap="round" fill="none"
            style={{ animation: "steam3 2.8s ease-in-out infinite 1.2s" }} />
        </g>
      </g>

      {/* ══════════════════════════════
          MATE GOURD  (right)
      ══════════════════════════════ */}
      <g style={{ animation: "floatUpAlt 4.5s ease-in-out infinite 0.8s" }}>

        {/* Gourd body */}
        <path d="M285 290 C278 310 275 350 278 375 C281 400 300 420 328 420 C356 420 372 400 374 375 C376 350 372 310 365 290 Z" fill="#4A6B3A" />
        {/* Gourd shading */}
        <path d="M285 290 C278 310 275 350 278 375 C281 400 300 420 328 420 C356 420 372 400 374 375 C376 350 372 310 365 290 Z"
          fill="#3A5530" opacity="0.4" style={{ mixBlendMode: "multiply" }} />

        {/* Gourd texture lines */}
        <path d="M292 320 C290 345 291 370 296 390" stroke="#2D4424" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <path d="M364 320 C366 345 364 370 360 390" stroke="#2D4424" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <path d="M310 295 C308 320 309 360 314 392" stroke="#2D4424" strokeWidth="1"   opacity="0.3" strokeLinecap="round" />

        {/* Gourd highlight */}
        <path d="M295 305 C291 332 292 365 298 388" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.07" />

        {/* Gourd neck / rim */}
        <rect x="308" y="272" width="40" height="22" rx="6" fill="#3A5530" />
        <rect x="304" y="268" width="48" height="12" rx="6" fill="#4A6B3A" />
        <rect x="306" y="266" width="44" height="8"  rx="4" fill="#5A7B48" />

        {/* Mate liquid surface */}
        <ellipse cx="328" cy="292" rx="18" ry="5" fill="#2D4A1E" />

        {/* Bombilla (metal straw) */}
        <line x1="338" y1="240" x2="322" y2="380" stroke="#B8A070" strokeWidth="4"  strokeLinecap="round" />
        <line x1="338" y1="240" x2="322" y2="380" stroke="#D4BC8A" strokeWidth="2"  strokeLinecap="round" opacity="0.5" />
        {/* Bombilla filter bulb */}
        <ellipse cx="323" cy="378" rx="7" ry="5" fill="#B8A070" />
        <ellipse cx="323" cy="378" rx="5" ry="3.5" fill="#8B7550" />
        {/* Bombilla mouthpiece end */}
        <ellipse cx="339" cy="241" rx="5" ry="3" fill="#C4AC7C" />

        {/* Foam / mate bubbles */}
        <circle cx="316" cy="291" r="2.5" fill="#3D6028" opacity="0.7" />
        <circle cx="325" cy="289" r="2"   fill="#3D6028" opacity="0.5" />
        <circle cx="333" cy="292" r="1.8" fill="#3D6028" opacity="0.6" />

        {/* Yerba leaves decoration */}
        <g transform="translate(370, 350)" opacity="0.6">
          <path d="M0 0 C8 -12 20 -14 22 -4 C24 6 14 12 0 0Z"  fill="#6BAA75" />
          <path d="M0 0 C-8 -10 -6 -22 4 -20 C14 -18 12 -6 0 0Z" fill="#5A9A64" />
          <line x1="0" y1="0" x2="11" y2="-9"  stroke="#4A8A54" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="-2" y2="-12" stroke="#4A8A54" strokeWidth="0.8" />
        </g>
        <g transform="translate(278, 380) rotate(-20)" opacity="0.5">
          <path d="M0 0 C6 -10 16 -11 17 -3 C18 5 10 9 0 0Z" fill="#6BAA75" />
          <line x1="0" y1="0" x2="8" y2="-7" stroke="#4A8A54" strokeWidth="0.8" />
        </g>

        {/* Steam from mate */}
        <g transform="translate(318, 248)">
          <path d="M0 40 C-4 30 4 20 0 10 C-4 0 0 -6 0 -6" stroke="#6BAA75" strokeWidth="2" strokeLinecap="round" fill="none"
            style={{ animation: "steam1 3.2s ease-in-out infinite 0.4s" }} />
        </g>
        <g transform="translate(334, 244)">
          <path d="M0 38 C4 28 -3 19 0 9 C3 0 0 -5 0 -5" stroke="#6BAA75" strokeWidth="1.8" strokeLinecap="round" fill="none"
            style={{ animation: "steam2 3.2s ease-in-out infinite 1.1s" }} />
        </g>
      </g>

      {/* ── Coffee beans scattered (left side) ── */}
      {[
        { cx: 80,  cy: 450, r: 9,  rot: 20  },
        { cx: 62,  cy: 435, r: 7,  rot: -10 },
        { cx: 96,  cy: 438, r: 6,  rot: 40  },
        { cx: 225, cy: 445, r: 8,  rot: 15  },
        { cx: 210, cy: 432, r: 6,  rot: -25 },
      ].map(({ cx, cy, r, rot }, i) => (
        <g key={i} transform={`translate(${cx},${cy}) rotate(${rot})`}>
          <ellipse rx={r} ry={r * 0.62} fill="#6F4E37" opacity="0.7" />
          <line x1={0} y1={-r * 0.55} x2={0} y2={r * 0.55} stroke="#3A2518" strokeWidth="1" opacity="0.6" />
        </g>
      ))}

      {/* ── Yerba leaves scattered (right side) ── */}
      {[
        { x: 390, y: 445, scale: 0.8,  rot: 30  },
        { x: 408, y: 432, scale: 0.65, rot: -15 },
        { x: 418, y: 455, scale: 0.7,  rot: 50  },
      ].map(({ x, y, scale, rot }, i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${rot}) scale(${scale})`} opacity="0.55">
          <path d="M0 0 C7 -11 18 -13 19 -4 C20 5 11 10 0 0Z" fill="#6BAA75" />
          <line x1="0" y1="0" x2="9" y2="-8" stroke="#4A8A54" strokeWidth="0.9" />
        </g>
      ))}

      {/* ── Defs ── */}
      <defs>
        <linearGradient id="coffeeBodyShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#3A2010" stopOpacity="0.5" />
          <stop offset="40%"  stopColor="#3A2010" stopOpacity="0"   />
          <stop offset="85%"  stopColor="#3A2010" stopOpacity="0"   />
          <stop offset="100%" stopColor="#1A0A00" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}