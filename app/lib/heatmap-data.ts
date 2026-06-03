export type HeatmapLevel = 0 | 1 | 2 | 3 | 4;

export type HeatmapDay = {
  date: string;
  dateObj: Date;
  value: number;
  level: HeatmapLevel;
  weekIndex: number;
  dayOfWeek: number;
};

export type HeatmapGrid = {
  days: HeatmapDay[];
  weeks: number;
  monthLabels: { label: string; weekIndex: number }[];
};

const MONTHS_ES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

/** Mulberry32 — deterministic PRNG for stable placeholder data */
function createSeededRandom(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toLevel(value: number): HeatmapLevel {
  if (value <= 0) return 0;
  if (value <= 2) return 1;
  if (value <= 4) return 2;
  if (value <= 6) return 3;
  return 4;
}

function formatDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDisplayDate(d: Date): string {
  return d.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export { formatDisplayDate };

const HEATMAP_DATA_SEED = 20260402;

export function buildHeatmapGrid(): HeatmapGrid {
  const random = createSeededRandom(HEATMAP_DATA_SEED);
  const end = new Date();
  end.setHours(12, 0, 0, 0);
  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 1);
  start.setDate(start.getDate() + 1);
  start.setHours(12, 0, 0, 0);

  const days: HeatmapDay[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const dateObj = new Date(cursor);
    const dayOfWeek = dateObj.getDay();
    const msFromStart = dateObj.getTime() - start.getTime();
    const weekIndex = Math.floor(msFromStart / (7 * 24 * 60 * 60 * 1000));

    const seasonal =
      0.35 +
      0.25 * Math.sin((dateObj.getMonth() / 12) * Math.PI * 2) +
      (dayOfWeek === 0 || dayOfWeek === 6 ? 0.15 : 0);
    const noise = random();
    const value = Math.round(seasonal * 10 * noise);

    days.push({
      date: formatDateKey(dateObj),
      dateObj,
      value,
      level: toLevel(value),
      weekIndex,
      dayOfWeek,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks = Math.max(...days.map((d) => d.weekIndex), 0) + 1;

  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  for (const day of days) {
    const m = day.dateObj.getMonth();
    if (m !== lastMonth) {
      monthLabels.push({
        label: MONTHS_ES[m],
        weekIndex: day.weekIndex,
      });
      lastMonth = m;
    }
  }

  return { days, weeks, monthLabels };
}

export function getHeatmapColor(level: HeatmapLevel): string {
  const map: Record<HeatmapLevel, string> = {
    0: "var(--heatmap-0)",
    1: "var(--heatmap-1)",
    2: "var(--heatmap-2)",
    3: "var(--heatmap-3)",
    4: "var(--heatmap-4)",
  };
  return map[level];
}
