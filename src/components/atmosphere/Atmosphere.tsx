"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * The atmosphere system.
 *
 * Water in sunlight throws caustics — the rippling net of light on the floor of
 * a pool. That is the subject's own material, and it is what a flat white page
 * is missing. These four layers stack to give every section its own weather
 * without putting a single decorative graphic on the page.
 *
 * All of them hold still under `prefers-reduced-motion`: the light stays, the
 * drift stops.
 */

/**
 * Caustics. Fractal noise displaced through itself, which is how you get the
 * branching net rather than a blur. Kept between 4–8% — at any more it stops
 * reading as light and starts reading as texture.
 */
export function Caustics({
  className,
  opacity = 0.06,
  scale = 1,
  speed = 34,
}: {
  className?: string;
  opacity?: number;
  /** Larger = broader, slower-feeling net. */
  scale?: number;
  /** Seconds for one full drift cycle. */
  speed?: number;
}) {
  const id = useId().replace(/:/g, "");

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        className="absolute left-[-10%] top-[-10%] h-[120%] w-[120%] motion-safe:animate-[caustic-drift_var(--dur)_ease-in-out_infinite]"
        style={{ opacity, ["--dur" as string]: `${speed}s` }}
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={`caustic-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${0.034 / scale} ${0.052 / scale}`}
              numOctaves="3"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur={`${speed * 1.6}s`}
                values={`${0.034 / scale} ${0.052 / scale};${0.041 / scale} ${
                  0.045 / scale
                };${0.034 / scale} ${0.052 / scale}`}
                repeatCount="indefinite"
              />
            </feTurbulence>
            {/* A narrow band of the noise range, kept and the rest discarded.
                That band is a contour through the noise field — which is what
                turns a cloud into the thin branching net light actually makes.
                A smooth gamma ramp instead gives blobs. */}
            <feComponentTransfer in="noise" result="net">
              <feFuncA
                type="table"
                tableValues="0 0 0 0.35 1 0.35 0 0 0"
              />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect
          width="400"
          height="400"
          filter={`url(#caustic-${id})`}
          fill="var(--color-teal)"
        />
      </svg>
    </div>
  );
}

/**
 * Off-screen pool light. Large, heavily blurred radial sources placed outside
 * the frame so the page is lit from somewhere rather than filled with a
 * gradient.
 */
export function PoolLight({
  className,
  lights = "default",
}: {
  className?: string;
  lights?: "default" | "wide" | "corner" | "deep";
}) {
  const sets = {
    default: [
      { c: "rgba(7,144,163,0.16)", x: "-8%", y: "-14%", s: 62 },
      { c: "rgba(130,174,186,0.15)", x: "84%", y: "72%", s: 54 },
    ],
    wide: [
      { c: "rgba(75,182,196,0.14)", x: "50%", y: "-22%", s: 78 },
      { c: "rgba(7,144,163,0.12)", x: "6%", y: "88%", s: 50 },
    ],
    corner: [
      { c: "rgba(7,144,163,0.18)", x: "94%", y: "-10%", s: 56 },
      { c: "rgba(169,201,210,0.20)", x: "-6%", y: "62%", s: 48 },
    ],
    deep: [
      { c: "rgba(75,182,196,0.22)", x: "88%", y: "-16%", s: 60 },
      { c: "rgba(7,144,163,0.20)", x: "4%", y: "96%", s: 52 },
    ],
  }[lights];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {sets.map((l, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[80px] motion-safe:animate-[light-breathe_var(--dur)_ease-in-out_infinite]"
          style={{
            background: `radial-gradient(circle, ${l.c} 0%, transparent 70%)`,
            left: l.x,
            top: l.y,
            width: `${l.s}rem`,
            height: `${l.s}rem`,
            transform: "translate(-50%,-50%)",
            ["--dur" as string]: `${18 + i * 7}s`,
            animationDelay: `${i * -6}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Survey grid. Hairline rules and tick marks that read as an engineering
 * drawing — the corporate half of the brand, stated in structure rather than
 * in an adjective. Used only where the content is technical.
 */
export function Survey({
  className,
  spacing = 88,
  ticks = true,
}: {
  className?: string;
  spacing?: number;
  ticks?: boolean;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(130,174,186,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(130,174,186,0.16) 1px, transparent 1px)",
          backgroundSize: `${spacing}px ${spacing}px`,
          maskImage:
            "radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 78%)",
        }}
      />
      {ticks && (
        <div
          className="absolute inset-x-0 top-0 h-8"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(7,144,163,0.30) 1px, transparent 1px)",
            backgroundSize: `${spacing / 4}px 100%`,
            maskImage:
              "linear-gradient(to bottom, #000 0%, transparent 100%), linear-gradient(to right, transparent, #000 20%, #000 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, transparent 100%), linear-gradient(to right, transparent, #000 20%, #000 80%, transparent)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      )}
    </div>
  );
}

/**
 * Convenience stack. Most sections want light plus a whisper of caustics; this
 * is that pairing with one prop instead of two elements.
 */
export function SectionAtmosphere({
  lights = "default",
  caustics = true,
  survey = false,
  className,
}: {
  lights?: "default" | "wide" | "corner" | "deep";
  caustics?: boolean;
  survey?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10", className)} aria-hidden="true">
      <PoolLight lights={lights} />
      {caustics && <Caustics opacity={0.05} scale={1.3} speed={44} />}
      {survey && <Survey />}
    </div>
  );
}
