"use client";

import { useId, useMemo, useState } from "react";
import { Eyebrow } from "@/components/ui/Primitives";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { WaterFill } from "@/components/water/WaterFill";
import {
  PRESETS,
  RH_RANGE,
  TEMP_RANGE,
  outputLabel,
  relativeYield,
  yieldCurve,
} from "@/lib/yield";
import { cn } from "@/lib/utils";

/**
 * The Yield Instrument.
 *
 * ── No figures, deliberately ──────────────────────────────────────────────
 * This shows the *relationship* between weather and output and nothing more:
 * warmer, more humid air means more water; cooler, drier air means less.
 *
 * It publishes no percentages, no litres, no temperatures and no humidity
 * readings. A performance figure that is accurate today drifts as the range
 * and the conditions change, and a stale one on a public site is worse than
 * none at all. Stating the proportionality costs nothing to maintain and is
 * the part a non-technical reader actually needs.
 *
 * The physics still runs underneath to drive the curve shape and the fill
 * level. It just never surfaces as a number.
 */

const CHART = { w: 520, h: 200, padL: 18, padR: 18, padT: 14, padB: 30 };

/** Where a slider sits, in words. */
function band(value: number, min: number, max: number, words: string[]) {
  const t = (value - min) / (max - min);
  return words[Math.min(words.length - 1, Math.floor(t * words.length))];
}

export function YieldInstrument() {
  const [tempC, setTempC] = useState(31);
  const [rh, setRh] = useState(72);
  const id = useId().replace(/:/g, "");

  const fraction = relativeYield(tempC, rh);
  const curve = useMemo(() => yieldCurve(tempC), [tempC]);

  // The chart is a shape, not a measurement: fixed frame, no ticks, no scale.
  const yMax = 1.3;
  const x = (v: number) =>
    CHART.padL +
    ((v - RH_RANGE.min) / (RH_RANGE.max - RH_RANGE.min)) *
      (CHART.w - CHART.padL - CHART.padR);
  const y = (v: number) =>
    CHART.padT + (1 - v / yMax) * (CHART.h - CHART.padT - CHART.padB);

  const line = curve
    .map(
      (p, i) => `${i === 0 ? "M" : "L"}${x(p.rh).toFixed(1)} ${y(p.value).toFixed(1)}`
    )
    .join(" ");
  const area = `${line} L${x(RH_RANGE.max).toFixed(1)} ${y(0)} L${x(
    RH_RANGE.min
  ).toFixed(1)} ${y(0)} Z`;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* ── Controls ─────────────────────────────────────── */}
      <div className="glass-strong flex flex-col rounded-3xl p-6 sm:p-7 lg:col-span-5">
        <Eyebrow>Conditions</Eyebrow>

        <div className="mt-7 flex flex-col gap-8">
          <Slider
            label="Air temperature"
            value={tempC}
            min={TEMP_RANGE.min}
            max={TEMP_RANGE.max}
            lowLabel="Cool"
            highLabel="Hot"
            reading={band(tempC, TEMP_RANGE.min, TEMP_RANGE.max, [
              "Cool",
              "Mild",
              "Warm",
              "Hot",
            ])}
            onChange={setTempC}
          />
          <Slider
            label="Moisture in the air"
            value={rh}
            min={RH_RANGE.min}
            max={RH_RANGE.max}
            lowLabel="Dry"
            highLabel="Humid"
            reading={band(rh, RH_RANGE.min, RH_RANGE.max, [
              "Dry",
              "Fairly dry",
              "Humid",
              "Very humid",
            ])}
            onChange={setRh}
          />
        </div>

        <div className="mt-8">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-navy/50">
            Try a real day
          </span>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {PRESETS.map((p) => {
              const active = p.tempC === tempC && p.rh === rh;
              return (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setTempC(p.tempC);
                    setRh(p.rh);
                  }}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors duration-300",
                    active
                      ? "bg-teal text-white"
                      : "bg-white/70 text-navy/65 ring-1 ring-blue/35 hover:text-navy"
                  )}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-8 border-t border-blue/25 pt-5 text-[0.9rem] leading-[1.72] text-navy/62">
          Warm, humid air holds far more water than cool, dry air, and the unit
          harvests whatever is there. Move either control and the production
          level moves with it.
        </p>
      </div>

      {/* ── Production ───────────────────────────────────── */}
      <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-7 lg:col-span-7">
        <div className="flex items-stretch gap-6">
          {/* The vessel: the site's own device for showing a quantity. */}
          <div className="relative w-20 shrink-0 overflow-hidden rounded-2xl border border-blue/30 bg-blue-50 sm:w-24">
            <WaterFill
              level={0.06 + (fraction / 1.3) * 0.9}
              amplitude={7}
              speed={9}
              showBubbles
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-navy/50">
              Water production
            </span>
            <p className="mt-1.5 font-display text-[clamp(2.1rem,5vw,3rem)] font-bold leading-none tracking-[-0.035em] text-navy">
              {outputLabel(fraction)}
            </p>
            <p className="mt-3 text-[0.92rem] leading-[1.7] text-navy/62">
              {fraction >= 0.68
                ? "These are strong conditions. There is plenty of moisture in the air for the unit to draw on."
                : fraction >= 0.42
                  ? "Workable conditions. The air still carries enough moisture to produce steadily."
                  : "Thin conditions. Cool, dry air holds little water, so production drops away."}
            </p>
          </div>
        </div>

        {/* The relationship, drawn as a shape. No scale, no ticks, no values. */}
        <figure className="mt-6 border-t border-blue/25 pt-6">
          <figcaption className="sr-only">
            Water production rises as the air becomes more humid, and the whole
            curve rises further as the air becomes warmer.
          </figcaption>
          <svg
            viewBox={`0 0 ${CHART.w} ${CHART.h}`}
            className="w-full"
            role="img"
            aria-label="A curve rising from left to right: the more moisture in the air, the more water the unit produces. Raising the temperature lifts the whole curve."
          >
            <defs>
              <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0790a3" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#0790a3" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            <line
              x1={CHART.padL}
              x2={CHART.w - CHART.padR}
              y1={y(0)}
              y2={y(0)}
              stroke="#c9dfe5"
              strokeWidth="1"
            />

            <path d={area} fill={`url(#fill-${id})`} />
            <path
              d={line}
              fill="none"
              stroke="#06798a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Where the controls currently sit on the curve */}
            <line
              x1={x(rh)}
              x2={x(rh)}
              y1={y(fraction)}
              y2={y(0)}
              stroke="#092140"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <circle
              cx={x(rh)}
              cy={y(fraction)}
              r="6.5"
              fill="#06798a"
              stroke="#fff"
              strokeWidth="2.5"
            />

            <text
              x={CHART.padL}
              y={CHART.h - 8}
              className="fill-navy/45 font-mono"
              style={{ fontSize: 9.5, letterSpacing: "0.12em" }}
            >
              DRIER AIR
            </text>
            <text
              x={CHART.w - CHART.padR}
              y={CHART.h - 8}
              textAnchor="end"
              className="fill-navy/45 font-mono"
              style={{ fontSize: 9.5, letterSpacing: "0.12em" }}
            >
              MORE HUMID AIR
            </text>
          </svg>
          <p className="mt-3 text-center font-mono text-[0.66rem] uppercase tracking-[0.14em] text-navy/45">
            More moisture, more water
          </p>
        </figure>

        <div className="mt-6 border-t border-blue/25 pt-5">
          <ButtonLink href="/contact">
            Size a unit for your site <Arrow />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  lowLabel,
  highLabel,
  reading,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  lowLabel: string;
  highLabel: string;
  /** The qualitative position, e.g. "Warm". Never a number. */
  reading: string;
  onChange: (v: number) => void;
}) {
  const id = useId().replace(/:/g, "");
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-navy/50"
        >
          {label}
        </label>
        <span className="font-display text-[1.02rem] font-bold text-teal">
          {reading}
        </span>
      </div>

      <div className="relative mt-3 h-6">
        {/* Track fills like a vessel, same language as every other quantity. */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 overflow-hidden rounded-full bg-blue-100">
          <div
            className="h-full rounded-full transition-[width] duration-100"
            style={{ width: `${pct}%`, background: "var(--grad-water)" }}
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuetext={reading}
          className="slider-input absolute inset-0 w-full cursor-grab appearance-none bg-transparent active:cursor-grabbing"
        />
      </div>

      <div className="mt-1.5 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.14em] text-navy/40">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
