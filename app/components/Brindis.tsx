"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const SPRING = { stiffness: 120, damping: 18, mass: 0.85 };
const ROTATE_SPRING = { stiffness: 140, damping: 14, mass: 0.7 };

const IMAGE_WIDTH = 280;
const IMAGE_HEIGHT = 400;

const CUP_SEPARATION = 250;
const CUP_MEET_OFFSET = 58;

const TOUCH_START = 0.63;
const TOUCH_PEAK = 0.78;
const TOUCH_END = 0.8;

const COLORS = {
  brown: "var(--accent-brown)",
  green: "var(--accent)",
  gold: "#d4a853",
  cream: "#f5e6c8",
  mint: "#4e8b5f",
  espresso: "#3d2b1f",
} as const;

type ConfettiShape = "star" | "rect" | "circle";

type CenterSparkle = {
  dx: number;
  dy: number;
  dist: number;
  size: number;
  color: string;
  shape: ConfettiShape;
};

type SideConfetti = {
  side: "left" | "right";
  start: number;
  end: number;
  oy: number;
  travelX: number;
  travelY: number;
  size: number;
  color: string;
  shape: ConfettiShape;
  rotateEnd: number;
};

const CENTER_SPARKLES: CenterSparkle[] = [
  { dx: -0.55, dy: -1, dist: 88, size: 26, color: COLORS.brown, shape: "star" },
  { dx: 0.6, dy: -0.95, dist: 82, size: 22, color: COLORS.green, shape: "star" },
  { dx: -1, dy: -0.35, dist: 76, size: 18, color: COLORS.brown, shape: "rect" },
  { dx: 1, dy: -0.4, dist: 80, size: 20, color: COLORS.green, shape: "circle" },
  { dx: -0.25, dy: -1.15, dist: 98, size: 24, color: COLORS.gold, shape: "star" },
  { dx: 0.3, dy: -1.1, dist: 92, size: 20, color: COLORS.cream, shape: "star" },
  { dx: -0.85, dy: -0.65, dist: 68, size: 16, color: COLORS.mint, shape: "circle" },
  { dx: 0.9, dy: -0.55, dist: 72, size: 17, color: COLORS.brown, shape: "rect" },
  { dx: 0, dy: -1.25, dist: 105, size: 28, color: COLORS.cream, shape: "star" },
  { dx: -0.4, dy: -0.2, dist: 58, size: 14, color: COLORS.green, shape: "circle" },
  { dx: 0.45, dy: -0.15, dist: 60, size: 15, color: COLORS.espresso, shape: "rect" },
  { dx: -0.15, dy: -0.9, dist: 86, size: 19, color: COLORS.gold, shape: "star" },
  { dx: -0.7, dy: -0.85, dist: 94, size: 21, color: COLORS.cream, shape: "star" },
  { dx: 0.75, dy: -0.8, dist: 90, size: 22, color: COLORS.gold, shape: "rect" },
  { dx: -0.5, dy: -0.55, dist: 70, size: 16, color: COLORS.mint, shape: "circle" },
  { dx: 0.55, dy: -0.5, dist: 74, size: 18, color: COLORS.brown, shape: "star" },
];

const SIDE_CONFETTI: SideConfetti[] = [
  { side: "left", start: 0.22, end: 0.72, oy: -90, travelX: 220, travelY: -160, size: 22, color: COLORS.gold, shape: "rect", rotateEnd: 280 },
  { side: "left", start: 0.28, end: 0.78, oy: -30, travelX: 260, travelY: -100, size: 18, color: COLORS.green, shape: "circle", rotateEnd: 200 },
  { side: "left", start: 0.32, end: 0.82, oy: 40, travelX: 240, travelY: -60, size: 24, color: COLORS.brown, shape: "star", rotateEnd: 340 },
  { side: "left", start: 0.35, end: 0.85, oy: 100, travelX: 200, travelY: -20, size: 16, color: COLORS.cream, shape: "rect", rotateEnd: 160 },
  { side: "left", start: 0.4, end: 0.88, oy: -60, travelX: 280, travelY: -140, size: 20, color: COLORS.mint, shape: "circle", rotateEnd: 300 },
  { side: "left", start: 0.45, end: 0.9, oy: 20, travelX: 300, travelY: -80, size: 26, color: COLORS.gold, shape: "star", rotateEnd: 250 },
  { side: "left", start: 0.5, end: 0.92, oy: -120, travelX: 250, travelY: -200, size: 14, color: COLORS.espresso, shape: "rect", rotateEnd: 190 },
  { side: "left", start: 0.55, end: 0.95, oy: 70, travelX: 270, travelY: -40, size: 22, color: COLORS.green, shape: "star", rotateEnd: 320 },
  { side: "left", start: 0.58, end: 0.96, oy: -10, travelX: 230, travelY: -120, size: 19, color: COLORS.cream, shape: "circle", rotateEnd: 220 },
  { side: "left", start: 0.62, end: 1, oy: 50, travelX: 290, travelY: -90, size: 28, color: COLORS.brown, shape: "rect", rotateEnd: 270 },

  { side: "right", start: 0.22, end: 0.72, oy: -90, travelX: -220, travelY: -160, size: 22, color: COLORS.gold, shape: "rect", rotateEnd: -280 },
  { side: "right", start: 0.28, end: 0.78, oy: -30, travelX: -260, travelY: -100, size: 18, color: COLORS.green, shape: "circle", rotateEnd: -200 },
  { side: "right", start: 0.32, end: 0.82, oy: 40, travelX: -240, travelY: -60, size: 24, color: COLORS.brown, shape: "star", rotateEnd: -340 },
  { side: "right", start: 0.35, end: 0.85, oy: 100, travelX: -200, travelY: -20, size: 16, color: COLORS.cream, shape: "rect", rotateEnd: -160 },
  { side: "right", start: 0.4, end: 0.88, oy: -60, travelX: -280, travelY: -140, size: 20, color: COLORS.mint, shape: "circle", rotateEnd: -300 },
  { side: "right", start: 0.45, end: 0.9, oy: 20, travelX: -300, travelY: -80, size: 26, color: COLORS.gold, shape: "star", rotateEnd: -250 },
  { side: "right", start: 0.5, end: 0.92, oy: -120, travelX: -250, travelY: -200, size: 14, color: COLORS.espresso, shape: "rect", rotateEnd: -190 },
  { side: "right", start: 0.55, end: 0.95, oy: 70, travelX: -270, travelY: -40, size: 22, color: COLORS.green, shape: "star", rotateEnd: -320 },
  { side: "right", start: 0.58, end: 0.96, oy: -10, travelX: -230, travelY: -120, size: 19, color: COLORS.cream, shape: "circle", rotateEnd: -220 },
  { side: "right", start: 0.62, end: 1, oy: 50, travelX: -290, travelY: -90, size: 28, color: COLORS.brown, shape: "rect", rotateEnd: -270 },

  { side: "left", start: 0.65, end: 0.95, oy: -80, travelX: 180, travelY: -180, size: 30, color: COLORS.gold, shape: "star", rotateEnd: 310 },
  { side: "right", start: 0.65, end: 0.95, oy: -80, travelX: -180, travelY: -180, size: 30, color: COLORS.gold, shape: "star", rotateEnd: -310 },
  { side: "left", start: 0.68, end: 0.98, oy: 30, travelX: 160, travelY: -150, size: 24, color: COLORS.cream, shape: "circle", rotateEnd: 240 },
  { side: "right", start: 0.68, end: 0.98, oy: 30, travelX: -160, travelY: -150, size: 24, color: COLORS.cream, shape: "circle", rotateEnd: -240 },
];

function CupImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={IMAGE_WIDTH}
      height={IMAGE_HEIGHT}
      className="h-auto w-[min(40vw,170px)] sm:w-[min(34vw,210px)] md:w-[280px]"
      sizes="(max-width: 640px) 40vw, (max-width: 768px) 34vw, 280px"
      priority={false}
    />
  );
}

type CupMotionProps = {
  x: MotionValue<number>;
  rotate: MotionValue<number>;
  src: string;
  alt: string;
};

function AnimatedCup({ x, rotate, src, alt }: CupMotionProps) {
  return (
    <motion.div
      className="relative z-[2] shrink-0 will-change-transform"
      style={{ x, rotate, transformOrigin: "bottom center" }}
    >
      <CupImage src={src} alt={alt} />
    </motion.div>
  );
}

function ConfettiShapeGraphic({
  shape,
  size,
  color,
}: {
  shape: ConfettiShape;
  size: number;
  color: string;
}) {
  if (shape === "circle") {
    return (
      <span
        className="block rounded-full shadow-[0_0_10px_currentColor]"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    );
  }

  if (shape === "rect") {
    return (
      <span
        className="block rounded-[3px] shadow-[0_0_8px_currentColor]"
        style={{
          width: size * 0.55,
          height: size,
          backgroundColor: color,
        }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className="drop-shadow-[0_0_10px_currentColor]"
      style={{ color }}
    >
      <path d="M12 1.5 13.8 9.2 21.5 11 13.8 12.8 12 20.5 10.2 12.8 2.5 11 10.2 9.2Z" />
    </svg>
  );
}

function CenterSparkle({
  scrollYProgress,
  dx,
  dy,
  dist,
  size,
  color,
  shape,
}: CenterSparkle & { scrollYProgress: MotionValue<number> }) {
  const x = useTransform(scrollYProgress, [TOUCH_START, TOUCH_END], [0, dx * dist]);
  const y = useTransform(scrollYProgress, [TOUCH_START, TOUCH_END], [0, dy * dist]);
  const opacity = useTransform(
    scrollYProgress,
    [TOUCH_START, TOUCH_PEAK, TOUCH_END, 1],
    [0, 1, 0.85, 0.55],
  );
  const scale = useTransform(
    scrollYProgress,
    [TOUCH_START, TOUCH_PEAK, TOUCH_END],
    [0.1, 1.35, 1],
  );
  const rotate = useTransform(
    scrollYProgress,
    [TOUCH_START, TOUCH_END],
    [0, dx > 0 ? 70 : -70],
  );

  return (
    <motion.span
      className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
      style={{ x, y, opacity, scale, rotate }}
      aria-hidden
    >
      <ConfettiShapeGraphic shape={shape} size={size} color={color} />
    </motion.span>
  );
}

function SideConfettiPiece({
  scrollYProgress,
  side,
  start,
  end,
  oy,
  travelX,
  travelY,
  size,
  color,
  shape,
  rotateEnd,
}: SideConfetti & { scrollYProgress: MotionValue<number> }) {
  const x = useTransform(scrollYProgress, [start, end], [0, travelX]);
  const y = useTransform(scrollYProgress, [start, end], [oy, oy + travelY]);
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.08, end - 0.05, end],
    [0, 1, 1, 0.65],
  );
  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.12, end],
    [0.35, 1.15, 1],
  );
  const rotate = useTransform(scrollYProgress, [start, end], [0, rotateEnd]);

  return (
    <motion.span
      className="absolute top-1/2 block -translate-y-1/2"
      style={{
        left: side === "left" ? 0 : undefined,
        right: side === "right" ? 0 : undefined,
        x,
        y,
        opacity,
        scale,
        rotate,
      }}
      aria-hidden
    >
      <ConfettiShapeGraphic shape={shape} size={size} color={color} />
    </motion.span>
  );
}

function ExpandingSurfaceCircle({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const rawScale = useTransform(scrollYProgress, [0, 0.72, 1], [0, 1, 1.12]);
  const scale = useSpring(rawScale, { stiffness: 90, damping: 22 });
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[44%] z-0 h-[min(92vw,680px)] w-[min(92vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface"
      style={{ scale, opacity }}
      aria-hidden
    />
  );
}

function CelebrationEffects({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const flashOpacity = useTransform(
    scrollYProgress,
    [TOUCH_START, TOUCH_PEAK, TOUCH_END],
    [0, 0.75, 0],
  );
  const flashScale = useTransform(
    scrollYProgress,
    [TOUCH_START, TOUCH_PEAK],
    [0.5, 4.5],
  );
  const innerFlashScale = useTransform(
    scrollYProgress,
    [TOUCH_START, TOUCH_PEAK],
    [0.3, 3],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {/* Side confetti cannons */}
      <div className="absolute left-[4%] top-[38%] h-0 w-0 sm:left-[6%]">
        {SIDE_CONFETTI.filter((p) => p.side === "left").map((piece, index) => (
          <SideConfettiPiece
            key={`left-${index}`}
            scrollYProgress={scrollYProgress}
            {...piece}
          />
        ))}
      </div>

      <div className="absolute right-[4%] top-[38%] h-0 w-0 sm:right-[6%]">
        {SIDE_CONFETTI.filter((p) => p.side === "right").map((piece, index) => (
          <SideConfettiPiece
            key={`right-${index}`}
            scrollYProgress={scrollYProgress}
            {...piece}
          />
        ))}
      </div>

      {/* Center burst on clink */}
      <div className="absolute left-1/2 top-[34%] h-0 w-0 -translate-x-1/2 md:top-[32%]">
        <motion.span
          className="absolute left-1/2 top-1/2 block h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,248,220,0.95)_0%,rgba(212,168,83,0.5)_35%,rgba(78,139,95,0.2)_55%,transparent_72%)]"
          style={{ opacity: flashOpacity, scale: flashScale }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 block h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,white_0%,rgba(245,230,200,0.6)_40%,transparent_70%)]"
          style={{ opacity: flashOpacity, scale: innerFlashScale }}
        />

        {CENTER_SPARKLES.map((sparkle, index) => (
          <CenterSparkle
            key={`center-${index}`}
            scrollYProgress={scrollYProgress}
            {...sparkle}
          />
        ))}
      </div>
    </div>
  );
}

function StaticCelebration() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <div
        className="absolute left-1/2 top-[44%] z-0 h-[min(92vw,680px)] w-[min(92vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface"
        aria-hidden
      />
      <div className="absolute left-[5%] top-[36%]">
        {SIDE_CONFETTI.filter((p) => p.side === "left")
          .slice(0, 6)
          .map((piece, index) => (
            <span
              key={`static-left-${index}`}
              className="absolute block"
              style={{
                transform: `translate(${piece.travelX * 0.75}px, ${piece.oy + piece.travelY * 0.75}px) rotate(${piece.rotateEnd * 0.6}deg)`,
              }}
            >
              <ConfettiShapeGraphic
                shape={piece.shape}
                size={piece.size}
                color={piece.color}
              />
            </span>
          ))}
      </div>
      <div className="absolute right-[5%] top-[36%]">
        {SIDE_CONFETTI.filter((p) => p.side === "right")
          .slice(0, 6)
          .map((piece, index) => (
            <span
              key={`static-right-${index}`}
              className="absolute block"
              style={{
                transform: `translate(${piece.travelX * 0.75}px, ${piece.oy + piece.travelY * 0.75}px) rotate(${piece.rotateEnd * 0.6}deg)`,
              }}
            >
              <ConfettiShapeGraphic
                shape={piece.shape}
                size={piece.size}
                color={piece.color}
              />
            </span>
          ))}
      </div>
      <div className="absolute left-1/2 top-[32%] -translate-x-1/2">
        <span className="absolute left-1/2 top-1/2 block h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,248,220,0.85)_0%,transparent_70%)]" />
        {CENTER_SPARKLES.slice(0, 12).map((sparkle, index) => (
          <span
            key={`static-center-${index}`}
            className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(calc(-50% + ${sparkle.dx * sparkle.dist * 0.8}px), calc(-50% + ${sparkle.dy * sparkle.dist * 0.8}px))`,
            }}
          >
            <ConfettiShapeGraphic
              shape={sparkle.shape}
              size={sparkle.size}
              color={sparkle.color}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function StaticBrindis() {
  return (
    <section
      className="relative border-t border-border bg-background py-24 md:py-32"
      aria-label="Brindis"
    >
      <div className="relative flex min-h-[50vh] flex-col items-center justify-center gap-10 overflow-hidden px-6">
        <StaticCelebration />
        <div className="relative z-[2] flex items-end justify-center">
          <div
            className="relative shrink-0"
            style={{
              transform: "rotate(-24deg) translateX(52px)",
              transformOrigin: "bottom center",
            }}
          >
            <CupImage src="/mate_brindis.png" alt="Mate en brindis" />
          </div>
          <div
            className="relative shrink-0"
            style={{
              transform: "rotate(24deg) translateX(-52px)",
              transformOrigin: "bottom center",
            }}
          >
            <CupImage src="/cafe_brindis.png" alt="Café en brindis" />
          </div>
        </div>
        <p className="relative z-[2] font-display text-3xl font-bold tracking-tight text-foreground">
          ¡Salud!
        </p>
      </div>
    </section>
  );
}

export default function Brindis() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawMateX = useTransform(
    scrollYProgress,
    [0, 0.7],
    [-CUP_SEPARATION, CUP_MEET_OFFSET],
  );
  const rawCafeX = useTransform(
    scrollYProgress,
    [0, 0.7],
    [CUP_SEPARATION, -CUP_MEET_OFFSET],
  );
  const rawMateRotate = useTransform(scrollYProgress, [TOUCH_START, TOUCH_END], [0, -24]);
  const rawCafeRotate = useTransform(scrollYProgress, [TOUCH_START, TOUCH_END], [0, 24]);
  const rawGroupScale = useTransform(scrollYProgress, [0, 0.7], [0.86, 1]);
  const rawGroupY = useTransform(
    scrollYProgress,
    [TOUCH_START, TOUCH_END, 1],
    [0, -20, 64],
  );

  const saludOpacity = useTransform(scrollYProgress, [0.48, 0.65, 1], [0, 1, 1]);
  const saludY = useTransform(scrollYProgress, [0.48, 0.65, 1], [32, 0, 12]);
  const saludScale = useTransform(scrollYProgress, [0.48, 0.65, 1], [0.9, 1, 0.97]);

  const mateX = useSpring(rawMateX, SPRING);
  const cafeX = useSpring(rawCafeX, SPRING);
  const mateRotate = useSpring(rawMateRotate, ROTATE_SPRING);
  const cafeRotate = useSpring(rawCafeRotate, ROTATE_SPRING);
  const groupScale = useSpring(rawGroupScale, SPRING);
  const groupY = useSpring(rawGroupY, ROTATE_SPRING);
  const saludYspring = useSpring(saludY, SPRING);

  if (reduced) {
    return <StaticBrindis />;
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh]"
      aria-label="Brindis"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4">
        <ExpandingSurfaceCircle scrollYProgress={scrollYProgress} />
        <CelebrationEffects scrollYProgress={scrollYProgress} />

        <motion.div
          className="relative z-[2] flex flex-col items-center"
          style={{ scale: groupScale, y: groupY }}
        >
          <div className="relative flex items-end justify-center">
            <AnimatedCup
              x={mateX}
              rotate={mateRotate}
              src="/mate_brindis.png"
              alt="Mate en brindis"
            />
            <AnimatedCup
              x={cafeX}
              rotate={cafeRotate}
              src="/cafe_brindis.png"
              alt="Café en brindis"
            />
          </div>

          <motion.p
            style={{
              opacity: saludOpacity,
              y: saludYspring,
              scale: saludScale,
            }}
            className="mt-10 select-none font-display text-5xl font-bold tracking-tight text-foreground drop-shadow-[0_2px_18px_rgba(17,24,39,0.18)] md:mt-14 md:text-6xl lg:text-7xl"
          >
            ¡Salud!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
