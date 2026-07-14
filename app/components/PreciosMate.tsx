"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Title from "./Title";

type YerbaType = "Yerba con palo" | "Yerba sin palo" | "Yerba compuesta";

interface Marca {
  nombre: string;
  precios: Record<string, number>;
  tipo: YerbaType;
  minPrice: number;
  bestSuper: string;
}

const RAW_MARCAS: { nombre: string; precios: Record<string, number>; tipo: YerbaType }[] = [
  { nombre: "Playadito", precios: { Coto: 2800, ChangoMás: 2719, "Mariano Max": 2399, "La Anónima": 2200, Vea: 2138, Jumbo: 2079, Disco: 2079 }, tipo: "Yerba con palo" },
  { nombre: "Taragüi", precios: { Coto: 2893, ChangoMás: 2159, "Mariano Max": 2169, "La Anónima": 2450, Vea: 2950, Jumbo: 2550, Disco: 3050 }, tipo: "Yerba con palo" },
  { nombre: "Rosamonte", precios: { Coto: 2310, ChangoMás: 4199, "Mariano Max": 3849, "La Anónima": 2850, Vea: 1950, Jumbo: 2200, Disco: 2150 }, tipo: "Yerba con palo" },
  { nombre: "Amanda", precios: { Coto: 5100, ChangoMás: 4029, "Mariano Max": 1769, "La Anónima": 4190, Vea: 5300, Jumbo: 5300, Disco: 5300 }, tipo: "Yerba con palo" },
  { nombre: "La Tranquera", precios: { Coto: 2225, ChangoMás: 1950, "Mariano Max": 2050, "La Anónima": 2600, Vea: 2250, Jumbo: 2300, Disco: 2300 }, tipo: "Yerba con palo" },
  { nombre: "La Merced", precios: { Coto: 4646, ChangoMás: 4610, "Mariano Max": 4600, "La Anónima": 6500, Vea: 4800, Jumbo: 4572, Disco: 4644 }, tipo: "Yerba con palo" },
  { nombre: "CBSé", precios: { Coto: 2605, ChangoMás: 2979, "Mariano Max": 1799, "La Anónima": 2250, Vea: 2350, Jumbo: 2500, Disco: 2650 }, tipo: "Yerba compuesta" },
  { nombre: "Mañanita", precios: { Coto: 4370, ChangoMás: 4260, "Mariano Max": 4160, "La Anónima": 4310, Vea: 4150, Jumbo: 4200, Disco: 4350 }, tipo: "Yerba sin palo" },
  { nombre: "Unión", precios: { Coto: 2370, ChangoMás: 3159, "Mariano Max": 2029, "La Anónima": 2500, Vea: 2300, Jumbo: 2400, Disco: 2400 }, tipo: "Yerba con palo" },
];

const MARCAS: Marca[] = RAW_MARCAS
  .map((m) => {
    const entries = Object.entries(m.precios);
    const sorted = entries.sort((a, b) => a[1] - b[1]);
    return { ...m, minPrice: sorted[0][1], bestSuper: sorted[0][0] };
  })
  .sort((a, b) => a.minPrice - b.minPrice);

const GREEN = "#5C9465";
const GREEN_DARK = "#29493D";
const MUTED = "var(--foreground-muted)";
const BORDER = "rgba(0,0,0,0.12)";

function splitLines(nombre: string): string[] {
  const words = nombre.split(" ");
  if (words.length === 1) return [nombre];
  if (words.length === 2) return words;
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function PackSvg({ nombre, size }: { nombre: string; size: number }) {
  const w = size;
  const h = Math.round(size * 1.45);
  const fontSize = Math.max(9, Math.round(size * 0.115));
  const lines = useMemo(() => splitLines(nombre), [nombre]);
  const labelY = Math.round(h * 0.55);
  const lineH = fontSize + 3;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="5" fill={GREEN} stroke="var(--foreground)" strokeWidth="2" />
      <rect x="6" y="6" width={w - 12} height={Math.round(h * 0.28)} rx="3" fill={GREEN_DARK} />
      <rect x="6" y={Math.round(h * 0.38)} width={w - 12} height={Math.round(h * 0.5)} rx="3" fill="rgba(255,255,255,0.12)" />
      <text fontFamily="var(--font-body), sans-serif" fontSize={Math.round(fontSize * 0.85)} fontWeight="700" fill="#a8d4b0" letterSpacing="1">
        <tspan x={w / 2} y={Math.round(h * 0.22)} textAnchor="middle">
          YERBA MATE
        </tspan>
      </text>
      <text fontFamily="var(--font-body), sans-serif" fontSize={fontSize} fontWeight="700" fill="#fff">
        {lines.map((line, i) => (
          <tspan
            key={i}
            x={w / 2}
            y={i === 0 ? labelY - (lines.length - 1) * (lineH / 2) : undefined}
            dy={i === 0 ? undefined : lineH}
            textAnchor="middle"
          >
            {line}
          </tspan>
        ))}
      </text>
      <rect x={Math.round(w * 0.15)} y={Math.round(h * 0.78)} width={Math.round(w * 0.7)} height="2" rx="1" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

function PackIconSvg({ size }: { size: number }) {
  const w = size;
  const h = Math.round(size * 1.45);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="5" fill={GREEN} stroke="var(--foreground)" strokeWidth="2" />
      <rect x="6" y="6" width={w - 12} height={Math.round(h * 0.28)} rx="3" fill={GREEN_DARK} />
      <rect x="6" y={Math.round(h * 0.38)} width={w - 12} height={Math.round(h * 0.5)} rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x={Math.round(w * 0.15)} y={Math.round(h * 0.78)} width={Math.round(w * 0.7)} height="2" rx="1" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

function formatPrice(value: number) {
  return `$${value.toLocaleString("es-AR")}`;
}

function TooltipContent({ marca }: { marca: Marca }) {
  const sorted = useMemo(() => Object.entries(marca.precios).sort((a, b) => a[1] - b[1]), [marca.precios]);
  const minPrice = sorted[0][1];
  const maxPrice = sorted[sorted.length - 1][1];
  const range = Math.max(maxPrice - minPrice, 1);

  return (
    <>
      <div className="pm-tooltip-header">
        <PackIconSvg size={34} />
        <div className="pm-tooltip-brand">{marca.nombre}</div>
      </div>
      <span className="pm-tooltip-meta">{marca.tipo}</span>
      <p className="pm-tooltip-msg">
        El precio más bajo se encuentra en <strong>{marca.bestSuper}</strong>.
      </p>
      <div className="pm-tooltip-rows">
        {sorted.map(([supermercado, precio], i) => {
          const isBest = precio === minPrice;
          const barPct = 20 + Math.round(((precio - minPrice) / range) * 72);
          return (
            <div key={supermercado} className="pm-tooltip-row">
              <span className="pm-tooltip-rank">{i + 1}</span>
              <span className="pm-tooltip-super">{supermercado}</span>
              <div className="pm-tooltip-bar-wrap">
                <div className={`pm-tooltip-bar ${isBest ? "pm-tooltip-bar-best" : ""}`} style={{ width: `${barPct}%` }} />
              </div>
              <span className="pm-tooltip-price">{formatPrice(precio)}</span>
              {isBest ? <span className="pm-tooltip-badge">más barato</span> : <span style={{ width: 60, flexShrink: 0 }} />}
            </div>
          );
        })}
      </div>
    </>
  );
}

function ShelfSvg({ width }: { width: number }) {
  if (width <= 0) return null;
  const W = width;
  const H = 46;
  const bh = 22;
  const fh = 10;

  return (
    <svg className="pm-shelf-svg" viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0" y="0" width={W} height={bh} rx="3" fill="#c8ae7e" stroke="#8a6c38" strokeWidth="1.5" />

      <line x1={W * 0.07} y1="5" x2={W * 0.3} y2="5" stroke="rgba(90,55,10,0.15)" strokeWidth="1" />
      <line x1={W * 0.12} y1="11" x2={W * 0.28} y2="11" stroke="rgba(90,55,10,0.10)" strokeWidth="1" />
      <line x1={W * 0.4} y1="7" x2={W * 0.68} y2="7" stroke="rgba(90,55,10,0.13)" strokeWidth="1" />
      <line x1={W * 0.45} y1="13" x2={W * 0.62} y2="13" stroke="rgba(90,55,10,0.09)" strokeWidth="1" />
      <line x1={W * 0.74} y1="5" x2={W * 0.92} y2="5" stroke="rgba(90,55,10,0.14)" strokeWidth="1" />
      <line x1={W * 0.78} y1="12" x2={W * 0.9} y2="12" stroke="rgba(90,55,10,0.09)" strokeWidth="1" />

      <rect x="0" y={bh} width={W} height={fh} fill="#a88040" />
      <rect x="0" y={bh + fh - 2} width={W} height="2" fill="#8a6630" />

      <line x1="0" y1={bh} x2={W} y2={bh} stroke="#7a5a28" strokeWidth="1" />
    </svg>
  );
}

export default function PreciosMate() {
  const [activeMarca, setActiveMarca] = useState<Marca | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [shelfWidth, setShelfWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const shelfRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const measureShelf = useCallback(() => {
    if (shelfRef.current) {
      setShelfWidth(shelfRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measureShelf();
    const id = setTimeout(measureShelf, 100);
    return () => clearTimeout(id);
  }, [measureShelf]);

  useEffect(() => {
    if (!shelfRef.current) return;
    const el = shelfRef.current;
    const observer = new ResizeObserver(() => measureShelf());
    observer.observe(el);
    return () => observer.disconnect();
  }, [measureShelf]);

  useEffect(() => {
    const handleResize = () => {
      measureShelf();
      if (activeMarca) hideTooltip();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureShelf, activeMarca]);

  const positionTooltip = useCallback(() => {
    const btn = activeBtnRef.current;
    const tooltip = tooltipRef.current;
    if (!btn || !tooltip) return;

    const rect = btn.getBoundingClientRect();
    const tw = 290;
    const margin = 10;
    let left = rect.left + rect.width / 2 - tw / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - tw - margin));

    const tooltipH = tooltip.offsetHeight || 320;
    let top: number;
    if (rect.top - tooltipH < margin) {
      top = rect.bottom + 10;
    } else {
      top = rect.top - tooltipH - 8;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }, []);

  useEffect(() => {
    if (!activeMarca) {
      setTooltipVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      positionTooltip();
      setTooltipVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, [activeMarca, positionTooltip]);

  const showTooltip = useCallback((marca: Marca, btn: HTMLButtonElement) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    activeBtnRef.current = btn;
    setActiveMarca(marca);
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltipVisible(false);
    hideTimeoutRef.current = setTimeout(() => {
      setActiveMarca(null);
      activeBtnRef.current = null;
    }, 200);
  }, []);

  const handleToggle = useCallback(
    (marca: Marca, btn: HTMLButtonElement) => {
      if (activeMarca?.nombre === marca.nombre) {
        hideTooltip();
      } else {
        showTooltip(marca, btn);
      }
    },
    [activeMarca, hideTooltip, showTooltip]
  );

  if (!isMounted) return null;

  return (
    <>
      <style>{`
        .pm-view {
          width: 100%;
          padding: 6rem 1.5rem;
          background: var(--background);
          color: var(--foreground);
          font-family: var(--font-body), sans-serif;
        }
        .pm-intro {
          font-size: 1.05rem;
          color: var(--foreground-muted);
          text-align: center;
          font-style: italic;
          margin-top: 1.25rem;
          margin-bottom: 4rem;
        }
        .pm-shelf-unit {
          position: relative;
          margin: 0 auto 3rem;
          display: inline-block;
          padding: 16px 14px 0;
          left: 50%;
          transform: translateX(-50%);
          max-width: 100%;
        }
        .pm-shelf-items {
          display: flex;
          gap: clamp(4px, 0.8vw, 10px);
          justify-content: center;
          align-items: flex-end;
          flex-wrap: nowrap;
        }
        .pm-shelf-svg {
          display: block;
          width: 100%;
        }
        .pm-pack-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.18s ease;
          outline: none;
          position: relative;
        }
        .pm-pack-btn:hover { transform: translateY(-7px); }
        .pm-pack-btn:focus-visible {
          outline: 2px solid ${GREEN};
          outline-offset: 4px;
          border-radius: 4px;
        }
        .pm-tooltip {
          position: fixed;
          z-index: 1000;
          background: var(--background);
          border: 1.5px solid ${BORDER};
          border-radius: 10px;
          padding: 14px 16px;
          width: 290px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.12);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .pm-tooltip.pm-visible {
          opacity: 1;
        }
        .pm-tooltip-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .pm-tooltip-brand {
          font-size: 1rem;
          font-weight: 700;
          color: ${GREEN_DARK};
          line-height: 1;
        }
        .pm-tooltip-meta {
          font-size: 0.72rem;
          color: ${GREEN_DARK};
          background: #EAF3E2;
          border-radius: 999px;
          padding: 2px 8px;
          display: inline-block;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .pm-tooltip-msg {
          font-size: 0.78rem;
          color: var(--foreground-muted);
          font-style: italic;
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .pm-tooltip-msg strong {
          color: ${GREEN_DARK};
          font-style: normal;
        }
        .pm-tooltip-rows {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pm-tooltip-row {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .pm-tooltip-rank {
          font-size: 0.72rem;
          color: var(--foreground-muted);
          width: 16px;
          text-align: right;
          flex-shrink: 0;
        }
        .pm-tooltip-super {
          font-size: 0.8rem;
          width: 98px;
          flex-shrink: 0;
          color: var(--foreground);
        }
        .pm-tooltip-bar-wrap {
          flex: 1;
          height: 14px;
          background: rgba(0,0,0,0.06);
          border-radius: 2px;
          overflow: hidden;
        }
        .pm-tooltip-bar {
          height: 100%;
          border-radius: 2px;
          background: ${GREEN};
        }
        .pm-tooltip-bar-best {
          background: ${GREEN_DARK};
        }
        .pm-tooltip-price {
          font-size: 0.78rem;
          font-weight: 500;
          width: 58px;
          text-align: right;
          flex-shrink: 0;
          color: var(--foreground);
        }
        .pm-tooltip-badge {
          font-size: 0.64rem;
          background: #EAF3E2;
          color: ${GREEN_DARK};
          border-radius: 3px;
          padding: 1px 5px;
          flex-shrink: 0;
        }
      `}</style>

      <section className="pm-view" aria-labelledby="precios-yerba-titulo">
        <Title>¿Dónde conviene comprar cada yerba?</Title>
        <p className="pm-intro">Comparativa de precios de yerba mate (500 g) — pasá el cursor sobre un paquete para ver precios</p>

        <div className="pm-shelf-unit">
          <div ref={shelfRef} className="pm-shelf-items">
            {MARCAS.map((marca) => (
              <button
                key={marca.nombre}
                type="button"
                className="pm-pack-btn"
                aria-label={`Ver precios de ${marca.nombre}`}
                aria-describedby={activeMarca?.nombre === marca.nombre ? "pm-tooltip" : undefined}
                onMouseEnter={(e) => showTooltip(marca, e.currentTarget)}
                onMouseLeave={hideTooltip}
                onFocus={(e) => showTooltip(marca, e.currentTarget)}
                onBlur={hideTooltip}
                onClick={(e) => handleToggle(marca, e.currentTarget)}
              >
                <PackSvg nombre={marca.nombre} size={112} />
              </button>
            ))}
          </div>
          <ShelfSvg width={shelfWidth} />
        </div>
      </section>

      <div
        id="pm-tooltip"
        ref={tooltipRef}
        className={`pm-tooltip ${tooltipVisible ? "pm-visible" : ""}`}
        role="tooltip"
      >
        {activeMarca && <TooltipContent marca={activeMarca} />}
      </div>
    </>
  );
}

