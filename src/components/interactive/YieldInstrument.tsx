"use client";

import { useId, useMemo, useState } from "react";
import { Eyebrow } from "@/components/ui/Primitives";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/products";
import {
  PRESETS,
  RH_RANGE,
  TEMP_RANGE,
  relativeYield,
  yieldCurve,
} from "@/lib/yield";
import { cn } from "@/lib/utils";

/**
 * The Yield Instrument.
 *
 * The site's central claim is "if there's moisture in the air, there's water on
 * your table" — and the honest footnote is that how much depends entirely on
 * the weather. Rather than write that in a paragraph, this lets you hold both
 * ends of it: drag temperature and the whole curve moves, and you learn the
 * dependency by feeling it.
 *
 * Chart design follows the palette validator's verdict. The brand ramp fails as
 * a *categorical* palette (adjacent hues are too close for reliable colour-vision
 * separation), so three static lines in three brand hues were never an option.
 * One series that redraws is both more truthful and more instructive.
 */

const CHART = { w: 560, h: 240, padL: 46, padR: 18, padT: 18, padB: 34 };

/** Units that carry a numeric rating, largest first. */
const RATED = PRODUCTS.filter((p) => p.capacity !== null).sort(
  (a, b) => (b.capacity ?? 0) - (a.capacity ?? 0)
);

export function YieldInstrument() {
  const [tempC, setTempC] = useState(31);
  const [rh, setRh] = useState(72);
  const [unitSlug, setUnitSlug] = useState(
    RATED.find((p) => p.capacity === 500)?.slug ?? RATED[0].slug
  );
  const [showTable, setShowTable] = useState(false);
  const id = useId().replace(/:/g, "");

  const unit = RATED.find((p) => p.slug === unitSlug) ?? RATED[0];
  const fraction = relativeYield(tempC, rh);
  const curve = useMemo(() => yieldCurve(tempC), [tempC]);

  const litres = Math.round(((unit.capacity ?? 0) * fraction) / 5) * 5;

  // Chart geometry. y is fixed to 0–130% so the curve moves against a stable
  // frame — an axis that rescales would hide the very change we're showing.
  const yMax = 1.3;
  const x = (v: number) =>
    CHART.padL +
    ((v - RH_RANGE.min) / (RH_RANGE.max - RH_RANGE.min)) *
      (CHART.w - CHART.padL - CHART.padR);
  const y = (v: number) =>
    CHART.padT + (1 - v / yMax) * (CHART.h - CHART.padT - CHART.padB);

  const line = curve
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.rh).toFixed(1)} ${y(p.value).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(RH_RANGE.max).toFixed(1)} ${y(0)} L${x(
    RH_RANGE.min
  ).toFixed(1)} ${y(0)} Z`;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* ── Controls ─────────────────────────────────────── */}
      <div className="glass-strong flex flex-col rounded-3xl p-6 sm:p-7 lg:col-span-5">
        <Eyebrow>Conditions</Eyebrow>

        <div className="mt-7 flex flex-col gap-7">
          <Slider
            label="Air temperature"
            value={tempC}
            min={TEMP_RANGE.min}
            max={TEMP_RANGE.max}
            step={1}
            unit="°C"
            onChange={setTempC}
          />
          <Slider
            label="Relative humidity"
            value={rh}
            min={RH_RANGE.min}
            max={RH_RANGE.max}
            step={1}
            unit="%"
            onChange={setRh}
          />
        </div>

        <div className="mt-7">
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

        <div className="mt-7 border-t border-blue/25 pt-5">
          <label
            htmlFor={`unit-${id}`}
            className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-navy/50"
          >
            Unit
          </label>
          <select
            id={`unit-${id}`}
            value={unitSlug}
            onChange={(e) => setUnitSlug(e.target.value)}
            className="mt-2 w-full rounded-xl border border-blue/35 bg-white/70 px-3 py-2.5 text-[0.92rem] text-navy focus:border-teal focus:outline-none"
          >
            {RATED.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} at {p.capacityLabel} rated
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Readout + chart ──────────────────────────────── */}
      <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-7 lg:col-span-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-navy/50">
              Output at these conditions
            </span>
            <p className="tnum mt-1.5 font-display text-[clamp(2.6rem,6vw,3.6rem)] font-bold leading-none text-navy">
              {Math.round(fraction * 100)}
              <span className="text-[0.42em] font-semibold text-navy/55">
                % of rated
              </span>
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-navy/50">
              {unit.name}
            </span>
            <p className="tnum mt-1.5 font-display text-[1.5rem] font-bold leading-none text-teal">
              ≈{litres.toLocaleString()} L
              <span className="text-[0.62em] font-semibold text-navy/50">
                /day
              </span>
            </p>
          </div>
        </div>


        {/* The chart. One series, redrawn as temperature changes. */}
        <figure className="mt-6 border-t border-blue/25 pt-6">
          <figcaption className="sr-only">
            Output as a percentage of rated capacity against relative humidity,
            at {tempC} °C.
          </figcaption>
          <svg
            viewBox={`0 0 ${CHART.w} ${CHART.h}`}
            className="w-full"
            role="img"
            aria-label={`At ${tempC} degrees Celsius, output rises from left to right with humidity, reaching ${Math.round(
              fraction * 100
            )} percent of rated capacity at ${rh} percent humidity.`}
          >
            <defs>
              <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0790a3" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#0790a3" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Recessive grid, with the 100% line called out — it's the one
                value that means something. */}
            {[0, 0.25, 0.5, 0.75, 1, 1.25].map((v) => (
              <g key={v}>
                <line
                  x1={CHART.padL}
                  x2={CHART.w - CHART.padR}
                  y1={y(v)}
                  y2={y(v)}
                  stroke={v === 1 ? "#82aeba" : "#e4eff2"}
                  strokeWidth="1"
                  strokeDasharray={v === 1 ? "3 3" : undefined}
                />
                <text
                  x={CHART.padL - 8}
                  y={y(v) + 3.5}
                  textAnchor="end"
                  className="fill-navy/45 font-mono"
                  style={{ fontSize: 9 }}
                >
                  {v * 100}%
                </text>
              </g>
            ))}

            <path d={area} fill={`url(#fill-${id})`} />
            <path
              d={line}
              fill="none"
              stroke="#06798a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Where you are now */}
            <line
              x1={x(rh)}
              x2={x(rh)}
              y1={CHART.padT}
              y2={y(0)}
              stroke="#092140"
              strokeWidth="1"
              strokeOpacity="0.22"
            />
            <circle
              cx={x(rh)}
              cy={y(fraction)}
              r="6"
              fill="#06798a"
              stroke="#fff"
              strokeWidth="2.5"
            />

            {[10, 30, 50, 70, 95].map((v) => (
              <text
                key={v}
                x={x(v)}
                y={CHART.h - 12}
                textAnchor="middle"
                className="fill-navy/45 font-mono"
                style={{ fontSize: 9 }}
              >
                {v}%
              </text>
            ))}
            <text
              x={(CHART.w + CHART.padL) / 2}
              y={CHART.h - 1}
              textAnchor="middle"
              className="fill-navy/40 font-mono"
              style={{ fontSize: 8.5, letterSpacing: "0.14em" }}
            >
              RELATIVE HUMIDITY
            </text>
          </svg>
        </figure>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-[46ch] font-mono text-[0.66rem] leading-relaxed text-navy/45">
            Modelled from psychrometric relationships and normalised to the
            rating point. Indicative only, so confirm against GENAQ&rsquo;s performance
            data before quoting.
          </p>
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            aria-expanded={showTable}
            className="shrink-0 font-display text-[0.8rem] font-semibold text-teal underline-offset-4 hover:underline"
          >
            {showTable ? "Hide table" : "View as table"}
          </button>
        </div>

        {showTable && (
          <div className="mt-4 max-h-56 overflow-y-auto rounded-2xl border border-blue/30">
            <table className="w-full text-left">
              <caption className="sr-only">
                Output against relative humidity at {tempC} °C
              </caption>
              <thead className="sticky top-0 bg-blue-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-navy/60"
                  >
                    Humidity
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-navy/60"
                  >
                    % of rated
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-navy/60"
                  >
                    {unit.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {curve
                  .filter((_, i) => i % 4 === 0)
                  .map((p) => (
                    <tr key={p.rh} className="border-t border-blue/20">
                      <td className="tnum px-4 py-1.5 text-[0.84rem] text-navy/70">
                        {Math.round(p.rh)}%
                      </td>
                      <td className="tnum px-4 py-1.5 text-[0.84rem] text-navy">
                        {Math.round(p.value * 100)}%
                      </td>
                      <td className="tnum px-4 py-1.5 text-[0.84rem] text-navy/70">
                        ≈
                        {Math.round(
                          ((unit.capacity ?? 0) * p.value) / 5
                        ) * 5}{" "}
                        L/day
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-5 border-t border-blue/25 pt-5">
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
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const id = useId().replace(/:/g, "");
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-navy/50"
        >
          {label}
        </label>
        <span className="tnum font-display text-[1.15rem] font-bold text-navy">
          {value}
          <span className="ml-0.5 text-[0.62em] font-semibold text-navy/55">
            {unit}
          </span>
        </span>
      </div>

      <div className="relative mt-3 h-6">
        {/* Track fills like a vessel — same language as every other quantity
            on the site. */}
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
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input absolute inset-0 w-full cursor-grab appearance-none bg-transparent active:cursor-grabbing"
        />
      </div>
    </div>
  );
}
