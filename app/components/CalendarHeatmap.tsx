"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMotionTokens } from "../hooks/useMotionTokens";
import {
  buildHeatmapGrid,
  formatDisplayDate,
  getHeatmapColor,
  type HeatmapDay,
} from "../lib/heatmap-data";
import { easeOutTransition, hoverLift } from "../lib/motion";
import AnimatedCount from "./motion/AnimatedCount";

const CELL = 12;
const GAP = 3;
const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

type CalendarHeatmapProps = {
  title?: string;
  description?: string;
};

export default function CalendarHeatmap({
  title = "Consumo diario de infusiones",
  description = "Tazas registradas por día en los últimos 12 meses (datos de ejemplo)",
}: CalendarHeatmapProps) {
  const reduced = useReducedMotion();
  const tokens = useMotionTokens();
  const grid = useMemo(() => buildHeatmapGrid(), []);
  const [tooltip, setTooltip] = useState<{
    day: HeatmapDay;
    x: number;
    y: number;
  } | null>(null);

  const totalCups = useMemo(
    () => grid.days.reduce((sum, d) => sum + d.value, 0),
    [grid.days]
  );

  const weekColumns = useMemo(() => {
    const cols: (HeatmapDay | null)[][] = Array.from(
      { length: grid.weeks },
      () => Array.from({ length: 7 }, () => null)
    );
    for (const day of grid.days) {
      cols[day.weekIndex][day.dayOfWeek] = day;
    }
    return cols;
  }, [grid.days, grid.weeks]);

  const chartWidth = grid.weeks * (CELL + GAP);

  return (
    <figure className="relative w-full font-body">
      <div className="relative z-10 pb-6 text-foreground">
        {title && (
          <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight leading-snug">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-2 text-sm text-muted leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      <div className="relative bg-background rounded-sm border border-border/60 p-4 md:p-6 overflow-x-auto">
        <div className="flex items-baseline justify-between gap-4 mb-4 min-w-[280px]">
          <p className="font-body text-sm text-muted">
            <AnimatedCount
              value={totalCups}
              className="font-medium text-foreground tabular-nums"
            />{" "}
            tazas en el período
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-body text-[10px] text-muted mr-1">Menos</span>
            {([0, 1, 2, 3, 4] as const).map((level) => (
              <span
                key={level}
                className="rounded-[2px]"
                style={{
                  width: CELL,
                  height: CELL,
                  backgroundColor: getHeatmapColor(level),
                }}
                aria-hidden
              />
            ))}
            <span className="font-body text-[10px] text-muted ml-1">Más</span>
          </div>
        </div>

        <div className="relative min-w-fit">
          <div
            className="grid mb-1 font-body text-[10px] text-muted"
            style={{
              gridTemplateColumns: `28px ${chartWidth}px`,
              marginLeft: 0,
            }}
          >
            <span />
            <div
              className="relative h-4"
              style={{ width: chartWidth }}
            >
              {grid.monthLabels.map(({ label, weekIndex }) => (
                <span
                  key={`${label}-${weekIndex}`}
                  className="absolute top-0 whitespace-nowrap"
                  style={{ left: weekIndex * (CELL + GAP) }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-0">
            <div
              className="flex flex-col justify-between py-0 font-body text-[10px] text-muted shrink-0"
              style={{ width: 28, height: 7 * (CELL + GAP) - GAP }}
            >
              {DAY_LABELS.map((label, i) => (
                <span
                  key={label}
                  className="leading-none"
                  style={{
                    visibility: i % 2 === 1 ? "visible" : "hidden",
                    height: CELL,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              className="flex"
              style={{ gap: GAP }}
              role="img"
              aria-label="Calendario de consumo diario de infusiones"
            >
              {weekColumns.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex flex-col"
                  style={{ gap: GAP }}
                >
                  {week.map((day, rowIndex) => {
                    if (!day) {
                      return (
                        <span
                          key={`empty-${weekIndex}-${rowIndex}`}
                          style={{ width: CELL, height: CELL }}
                          aria-hidden
                        />
                      );
                    }

                    const staggerDelay = reduced
                      ? 0
                      : weekIndex * tokens.staggerChild * 0.35;

                    return (
                      <motion.button
                        key={day.date}
                        type="button"
                        className="rounded-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
                        style={{
                          width: CELL,
                          height: CELL,
                          backgroundColor: getHeatmapColor(day.level),
                        }}
                        initial={
                          reduced
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.6 }
                        }
                        whileInView={
                          reduced
                            ? undefined
                            : { opacity: 1, scale: 1 }
                        }
                        viewport={{ once: true }}
                        transition={{
                          ...easeOutTransition(tokens, "fast"),
                          delay: staggerDelay,
                        }}
                        whileHover={reduced ? undefined : hoverLift}
                        aria-label={`${formatDisplayDate(day.dateObj)}: ${day.value} tazas`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onBlur={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {tooltip && (
          <motion.div
            role="tooltip"
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full px-3 py-2 rounded-md border border-border bg-background shadow-sm font-body text-xs"
            style={{
              left: tooltip.x,
              top: tooltip.y - 8,
            }}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={easeOutTransition(tokens, "fast")}
          >
            <p className="font-medium text-foreground">
              {formatDisplayDate(tooltip.day.dateObj)}
            </p>
            <p className="text-muted mt-0.5 tabular-nums">
              {tooltip.day.value}{" "}
              {tooltip.day.value === 1 ? "taza" : "tazas"}
            </p>
          </motion.div>
        )}
      </div>
    </figure>
  );
}
