"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * The signature primitive.
 *
 * Every quantity on this site is expressed as a water level: product capacity,
 * loader progress, stat magnitude, form completion. One device, one gradient,
 * used at five different scales — so the page teaches you to read it once.
 *
 * `level` is 0–1. The surface is a real wave that travels, not a flat edge.
 */
export function WaterFill({
  level,
  className,
  amplitude = 4,
  speed = 7,
  showBubbles = false,
  rounded = true,
}: {
  level: number;
  className?: string;
  /** Wave height in viewBox units (viewBox is 100 wide, 100 tall). */
  amplitude?: number;
  /** Seconds for one full wave traverse. Lower is choppier. */
  speed?: number;
  showBubbles?: boolean;
  rounded?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const clamped = Math.min(1, Math.max(0, level));

  // Surface sits at this y. 0 = top of the box, 100 = bottom.
  const surfaceY = 100 - clamped * 100;

  // Two stacked wave cycles so the path can slide a full period seamlessly.
  const wave = (a: number) =>
    `M0 ${a} q 25 -${amplitude} 50 0 t 50 0 t 50 0 t 50 0 V 110 H 0 Z`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        rounded && "rounded-[inherit]",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={`fill-${id}`} x1="0" y1="1" x2="0.35" y2="0">
            <stop offset="0%" stopColor="#0790a3" />
            <stop offset="42%" stopColor="#3aa9b8" />
            <stop offset="76%" stopColor="#82aeba" />
            <stop offset="100%" stopColor="#b4d2da" />
          </linearGradient>
        </defs>

        <motion.g
          initial={{ y: 0 }}
          animate={
            reduce ? { y: 0 } : { x: [0, -100] }
          }
          transition={
            reduce
              ? undefined
              : { duration: speed, repeat: Infinity, ease: "linear" }
          }
          style={{ transformBox: "view-box" }}
        >
          <path d={wave(surfaceY)} fill={`url(#fill-${id})`} />
        </motion.g>

        {/* Highlight line riding the surface */}
        <motion.path
          d={`M0 ${surfaceY} q 25 -${amplitude} 50 0 t 50 0 t 50 0 t 50 0`}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          animate={reduce ? undefined : { x: [0, -100] }}
          transition={
            reduce
              ? undefined
              : { duration: speed, repeat: Infinity, ease: "linear" }
          }
        />
      </svg>

      {showBubbles && !reduce && clamped > 0.05 && (
        <div className="absolute inset-0">
          {[
            { left: "22%", delay: "0s", size: 5, dur: "3.6s" },
            { left: "52%", delay: "1.1s", size: 3, dur: "4.4s" },
            { left: "76%", delay: "2.2s", size: 4, dur: "3.9s" },
          ].map((b) => (
            <span
              key={b.left}
              className="absolute bottom-0 rounded-full bg-white/45"
              style={{
                left: b.left,
                width: b.size,
                height: b.size,
                animation: `rise ${b.dur} ${b.delay} ease-in infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Capacity read as a level in a vessel, with the figure set against it.
 * Used on every product card so 50 L/day and 5,000 L/day are visibly different
 * quantities rather than two similar-looking strings.
 */
export function CapacityGauge({
  level,
  label,
  sublabel,
  className,
}: {
  level: number;
  label: string;
  sublabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-blue/30 bg-blue-50",
        className
      )}
    >
      <WaterFill level={level} amplitude={3} speed={9} showBubbles />
      <div className="relative z-10 flex h-full flex-col justify-end gap-0.5 p-4">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-navy/70">
          {sublabel ?? "Capacity"}
        </span>
        <span className="tnum font-display text-2xl font-bold text-navy">
          {label}
        </span>
      </div>
    </div>
  );
}
