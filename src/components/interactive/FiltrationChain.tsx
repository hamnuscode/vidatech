"use client";

import { useState } from "react";
import { PROCESS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The purification chain, laid out the way GENAQ publishes it: one continuous
 * bar running light to dark, five component icons along it, the part number
 * above and the stage name below.
 *
 * The bar itself is the point. Reading left to right you can see that this is
 * a single sealed path — air in one end, drinking water out the other — rather
 * than five separate boxes a plant engineer has to connect.
 *
 * Selecting a stage is on click, matching the rest of the site. Hovering across
 * five adjacent targets makes the whole strip flicker.
 */

const ICONS: Record<string, React.ReactNode> = {
  // G3 pre-filter: coarse intake grille behind a fan
  "Air pre-filtration": (
    <>
      <rect x="5" y="5" width="30" height="30" rx="4" />
      <circle cx="20" cy="20" r="8" />
      <path d="M20 12v16M12 20h16" />
    </>
  ),
  // F7 filter: a pleated cartridge
  "Air filtration": (
    <>
      <rect x="7" y="5" width="26" height="30" rx="3" />
      <path d="M12 5v30M16 5v30M20 5v30M24 5v30M28 5v30" />
    </>
  ),
  // Filtration system: three treatment vessels
  "Water treatment": (
    <>
      <rect x="6" y="9" width="8" height="26" rx="4" />
      <rect x="16" y="9" width="8" height="26" rx="4" />
      <rect x="26" y="9" width="8" height="26" rx="4" />
      <path d="M6 16h8M16 16h8M26 16h8" />
    </>
  ),
  // Minerals addition: a molecular lattice
  Mineralisation: (
    <>
      <circle cx="10" cy="14" r="3.2" />
      <circle cx="30" cy="11" r="3.2" />
      <circle cx="20" cy="22" r="3.2" />
      <circle cx="9" cy="30" r="3.2" />
      <circle cx="31" cy="29" r="3.2" />
      <path d="M12.6 15.6 17.6 20.4M27 12.4 22.2 19.8M17.7 24.2 11.4 28M22.6 23.6 28.4 27.4" />
    </>
  ),
  // UV technology: emitter and rays
  Purification: (
    <>
      <circle cx="20" cy="20" r="7" />
      <path d="M20 4v5M20 31v5M4 20h5M31 20h5M8.7 8.7l3.5 3.5M27.8 27.8l3.5 3.5M31.3 8.7l-3.5 3.5M12.2 27.8l-3.5 3.5" />
    </>
  ),
};

/** Light to dark along the chain, so the bar reads as a direction. */
const STOPS = ["#a9c9d2", "#6fc0cc", "#0790a3", "#12688a", "#123f6b"];

export function FiltrationChain() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      {/* ── The chain ─────────────────────────────────────── */}
      <div className="relative">
        {/* Component names, above the bar */}
        <ol className="hidden grid-cols-5 gap-2 sm:grid">
          {PROCESS.map((step, i) => (
            <li key={step.step} className="px-1 text-center">
              <span
                className={cn(
                  "block font-mono text-[0.68rem] uppercase leading-tight tracking-[0.12em] transition-colors duration-300",
                  active === i ? "text-teal" : "text-navy/50"
                )}
              >
                {step.spec}
              </span>
            </li>
          ))}
        </ol>

        {/* The bar. One continuous run, light to dark. */}
        <div
          className="mt-3 hidden overflow-hidden rounded-full p-1 shadow-[0_18px_40px_-24px_rgba(9,33,64,0.55)] sm:block"
          style={{
            background: `linear-gradient(100deg, ${STOPS.join(", ")})`,
          }}
        >
          <ul className="grid grid-cols-5">
            {PROCESS.map((step, i) => (
              <li key={step.step}>
                <button
                  type="button"
                  onClick={() =>
                    setActive((current) => (current === i ? null : i))
                  }
                  aria-pressed={active === i}
                  aria-label={`${step.step}, ${step.spec}`}
                  className={cn(
                    "flex w-full items-center justify-center rounded-full py-6 transition-[background-color,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active === i
                      ? "bg-white/25"
                      : "hover:bg-white/12 focus-visible:bg-white/20"
                  )}
                >
                  <svg
                    viewBox="0 0 40 40"
                    className={cn(
                      "h-11 w-11 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      active === i && "scale-110"
                    )}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[step.step]}
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Stage names, below the bar */}
        <ol className="mt-3 hidden grid-cols-5 gap-2 sm:grid">
          {PROCESS.map((step, i) => (
            <li key={step.step} className="px-1 text-center">
              <span
                className={cn(
                  "block font-display text-[0.9rem] font-bold leading-tight transition-colors duration-300",
                  active === i ? "text-teal" : "text-navy"
                )}
              >
                {step.step}
              </span>
            </li>
          ))}
        </ol>

        {/* Below sm the bar becomes a vertical run: five icons on a stem, same
            order, same reading direction. */}
        <ol className="flex flex-col gap-3 sm:hidden">
          {PROCESS.map((step, i) => (
            <li key={step.step}>
              <button
                type="button"
                onClick={() =>
                  setActive((current) => (current === i ? null : i))
                }
                aria-pressed={active === i}
                className={cn(
                  "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors duration-300",
                  active === i
                    ? "border-teal/45 bg-white"
                    : "border-blue/30 bg-white/70"
                )}
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                  style={{ background: STOPS[i] }}
                >
                  <svg
                    viewBox="0 0 40 40"
                    className="h-8 w-8"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[step.step]}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-navy/50">
                    {step.spec}
                  </span>
                  <span className="mt-0.5 block font-display text-[1rem] font-bold text-navy">
                    {step.step}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* ── What each stage does ──────────────────────────── */}
      <div className="mt-10 rounded-3xl border border-blue/30 bg-white/70 p-6 sm:p-8">
        {active === null ? (
          <p className="max-w-[68ch] text-[0.96rem] leading-[1.75] text-navy/68">
            Air enters at the left and drinking water leaves at the right. Two
            filtration stages clean the air before it ever reaches the cooling
            coil, and three treat the water after it forms.{" "}
            <span className="text-navy">
              Select any stage to see what happens there.
            </span>
          </p>
        ) : (
          <div>
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-teal">
                Stage {String(active + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[1.24rem] font-bold text-navy">
                {PROCESS[active].step}
              </span>
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-navy/45">
                {PROCESS[active].spec}
              </span>
            </span>
            <p className="mt-3 max-w-[68ch] text-[0.96rem] leading-[1.75] text-navy/72">
              {PROCESS[active].body}
            </p>
            <p className="mt-3 max-w-[68ch] border-l-2 border-blue/40 pl-4 text-[0.9rem] leading-[1.72] text-navy/58">
              {PROCESS[active].detail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
