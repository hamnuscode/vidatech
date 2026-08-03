"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { PROCESS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Condensation diagram.
 *
 * A cross-section through the machine, with air actually moving through it:
 * particles stream in at the intake, thin out through the filter, and — at the
 * coil, which is where the physics happens — turn into droplets and fall.
 *
 * The transformation at the coil is the whole point of the product, so it is
 * the one moment in the animation that is literal rather than suggestive.
 * Hovering or focusing a stage isolates it and annotates what happens there.
 */

const W = 900;
const H = 380;

/** Where each stage sits along the section, as x positions in viewBox units. */
const STAGES = [
  { x: 60, w: 130, label: "Intake" },
  { x: 200, w: 130, label: "Filter" },
  { x: 340, w: 180, label: "Condense" },
  { x: 530, w: 150, label: "Purify" },
  { x: 690, w: 150, label: "Mineralise" },
];

/** The x at which vapour becomes liquid. */
const DEW_X = 430;

/**
 * The reservoir surface. Droplets fall almost straight down once they condense,
 * so the collection has to start at the coil — a reservoir placed further right
 * would never actually catch anything, and the process would read as broken.
 */
const RESERVOIR_X = 436;
const RESERVOIR_Y = 252;

type Particle = {
  x: number;
  y: number;
  vx: number;
  /** Vertical drift while still airborne. */
  drift: number;
  phase: number;
  /** Set once the particle crosses the coil and becomes a droplet. */
  fallSpeed: number;
  condensed: boolean;
  size: number;
};

function spawn(atStart = true): Particle {
  return {
    x: atStart ? 40 + Math.random() * 30 : 40 + Math.random() * (DEW_X - 60),
    y: 92 + Math.random() * 104,
    vx: 46 + Math.random() * 30,
    drift: (Math.random() - 0.5) * 12,
    phase: Math.random() * Math.PI * 2,
    fallSpeed: 0,
    condensed: false,
    size: 1.7 + Math.random() * 1.5,
  };
}

export function CondensationDiagram() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const canvasRef = useRef<SVGGElement>(null);
  const particles = useRef<Particle[]>([]);
  const frame = useRef(0);

  // Static frame for reduced motion: the same picture, just not moving.
  const staticParticles = useMemo(() => {
    const out: Particle[] = [];
    for (let i = 0; i < 46; i++) {
      const p = spawn(false);
      p.x = 45 + (i / 46) * (W - 140);
      p.condensed = p.x > DEW_X;
      // Held frame: droplets sit above the reservoir line, vapour above them.
      p.y = p.condensed
        ? 150 + ((i * 37) % (RESERVOIR_Y - 156))
        : 100 + ((i * 53) % 140);
      out.push(p);
    }
    return out;
  }, []);

  useEffect(() => {
    if (reduce) return;
    const g = canvasRef.current;
    if (!g) return;

    particles.current = Array.from({ length: 54 }, () => spawn(false));
    let last = performance.now();
    let running = true;

    const tick = (now: number) => {
      if (!running) return;
      frame.current = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const dots = g.children;
      particles.current.forEach((p, i) => {
        p.x += p.vx * dt;

        if (!p.condensed) {
          p.y += Math.sin(now / 700 + p.phase) * p.drift * dt;
          // Crossing the coil is the transformation the product sells.
          if (p.x >= DEW_X) {
            p.condensed = true;
            p.fallSpeed = 30 + Math.random() * 50;
            p.vx *= 0.42;
          }
        } else {
          p.fallSpeed += 190 * dt; // gravity
          p.y += p.fallSpeed * dt;
        }

        // Absorbed at the reservoir surface, or gone off the right edge.
        if (p.y > RESERVOIR_Y || p.x > W - 40) {
          particles.current[i] = spawn(true);
          p = particles.current[i];
        }

        const dot = dots[i] as SVGCircleElement | undefined;
        if (!dot) return;
        dot.setAttribute("cx", p.x.toFixed(1));
        dot.setAttribute("cy", p.y.toFixed(1));
        if (p.condensed) {
          dot.setAttribute("r", (p.size * 1.5).toFixed(2));
          dot.setAttribute("fill", "#0790a3");
          dot.setAttribute("opacity", "0.85");
        } else {
          dot.setAttribute("r", p.size.toFixed(2));
          dot.setAttribute("fill", "#82aeba");
          dot.setAttribute("opacity", "0.5");
        }
      });
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(frame.current);
    };
  }, [reduce]);

  const shown = reduce ? staticParticles : Array.from({ length: 54 });

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem] border border-blue/30 bg-gradient-to-b from-white to-blue-50/70 p-3 sm:p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Cross-section of an atmospheric water generator: humid air enters at the intake, passes through filtration, condenses to liquid water at the cooling coil, then is purified and mineralised before dispensing."
        >
          <defs>
            <linearGradient id="cd-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f7f9" />
            </linearGradient>
            <linearGradient id="cd-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4bb6c4" />
              <stop offset="100%" stopColor="#0790a3" />
            </linearGradient>
            <clipPath id="cd-clip">
              <rect x="34" y="60" width={W - 74} height="250" rx="14" />
            </clipPath>
          </defs>

          {/* Machine shell */}
          <rect
            x="34"
            y="60"
            width={W - 74}
            height="250"
            rx="14"
            fill="url(#cd-body)"
            stroke="#82aeba"
            strokeWidth="1.5"
          />

          {/* Stage zones — dim when another stage is isolated */}
          {STAGES.map((s, i) => (
            <rect
              key={s.label}
              x={s.x}
              y="60"
              width={s.w}
              height="250"
              fill={active === i ? "#0790a3" : "transparent"}
              opacity={active === i ? 0.07 : 0}
              className="transition-opacity duration-300"
            />
          ))}

          {/* Intake louvres */}
          <g stroke="#82aeba" strokeWidth="2.5" strokeLinecap="round">
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="46" x2="70" y1={104 + i * 26} y2={104 + i * 26} />
            ))}
          </g>

          {/* Filter media */}
          <g opacity={active === null || active === 1 ? 1 : 0.35} className="transition-opacity duration-300">
            <rect x="232" y="88" width="46" height="200" rx="5" fill="#e4eff2" stroke="#82aeba" strokeWidth="1.2" />
            {Array.from({ length: 11 }).map((_, i) => (
              <path
                key={i}
                d={`M232 ${94 + i * 18} l46 9`}
                stroke="#a9c9d2"
                strokeWidth="1.6"
              />
            ))}
          </g>

          {/* Cooling coil — the dew point. Drawn as a real serpentine. */}
          <g opacity={active === null || active === 2 ? 1 : 0.35} className="transition-opacity duration-300">
            {/* Seven turns spanning y 96→292, which keeps the coil inside the
                shell (60→310). Each turn is 28px, not 52. */}
            <path
              d={`M400 96 ${"q 30 14 0 28 ".repeat(7)}`}
              fill="none"
              stroke="#0790a3"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.9"
            />
            <line
              x1={DEW_X}
              x2={DEW_X}
              y1="72"
              y2="298"
              stroke="#092140"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.3"
            />
            <text
              x={DEW_X + 7}
              y="84"
              className="fill-navy/55 font-mono"
              style={{ fontSize: 10, letterSpacing: "0.1em" }}
            >
              DEW POINT
            </text>
          </g>

          {/* Particles: vapour left of the coil, droplets right of it */}
          <g clipPath="url(#cd-clip)">
            <g ref={canvasRef}>
              {shown.map((p, i) => {
                const sp = reduce ? (p as Particle) : null;
                return (
                  <circle
                    key={i}
                    cx={sp ? sp.x : 40}
                    cy={sp ? sp.y : 140}
                    r={sp ? (sp.condensed ? sp.size * 1.5 : sp.size) : 2}
                    fill={sp ? (sp.condensed ? "#0790a3" : "#82aeba") : "#82aeba"}
                    opacity={sp ? (sp.condensed ? 0.85 : 0.5) : 0.5}
                  />
                );
              })}
            </g>
          </g>

          {/* Reservoir */}
          <g opacity={active === null || active >= 3 ? 1 : 0.35} className="transition-opacity duration-300">
            <rect
              x={RESERVOIR_X}
              y={RESERVOIR_Y}
              width={820 - RESERVOIR_X}
              height={296 - RESERVOIR_Y}
              rx="8"
              fill="url(#cd-water)"
              opacity="0.9"
            />
            <path
              d={`M${RESERVOIR_X} ${RESERVOIR_Y + 8} q 35 -8 70 0 t 70 0 t 70 0 t 70 0 t 70 0 t 70 0`}
              fill="none"
              stroke="#fff"
              strokeWidth="1.6"
              opacity="0.6"
            />
            {/* Mineral dosing, over the reservoir it doses into */}
            <circle cx="700" cy="160" r="17" fill="#fff" stroke="#82aeba" strokeWidth="1.4" />
            <text
              x="700"
              y="165"
              textAnchor="middle"
              className="fill-teal font-mono"
              style={{ fontSize: 11, fontWeight: 600 }}
            >
              pH7
            </text>
            <line
              x1="700"
              y1="178"
              x2="700"
              y2={RESERVOIR_Y - 4}
              stroke="#82aeba"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
          </g>

          {/* Outlet */}
          <path
            d={`M${W - 40} 250 h 22`}
            stroke="#82aeba"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Stage numbers along the base */}
          {STAGES.map((s, i) => (
            <text
              key={s.label}
              x={s.x + s.w / 2}
              y="336"
              textAnchor="middle"
              className={cn(
                "font-mono transition-colors duration-300",
                active === i ? "fill-teal" : "fill-navy/40"
              )}
              style={{ fontSize: 10, letterSpacing: "0.14em" }}
            >
              {String(i + 1).padStart(2, "0")} {s.label.toUpperCase()}
            </text>
          ))}
        </svg>
      </div>

      {/* Stage controls. Buttons, so this works from the keyboard too. */}
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {PROCESS.map((step, i) => (
          <li key={step.step}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              aria-pressed={active === i}
              className={cn(
                "h-full w-full rounded-2xl border p-4 text-left transition-[transform,border-color,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                active === i
                  ? "-translate-y-0.5 border-teal/50 bg-white shadow-[0_18px_36px_-22px_rgba(9,33,64,0.4)]"
                  : "border-blue/30 bg-white/55 hover:border-teal/35"
              )}
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-1.5 block font-display text-[1.02rem] font-bold text-navy">
                {step.step}
              </span>
              <span className="mt-1.5 block text-[0.84rem] leading-[1.65] text-navy/62">
                {active === i ? step.detail : step.body}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
