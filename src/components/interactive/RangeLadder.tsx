"use client";

import { useState } from "react";
import Image from "next/image";
import { MAX_CAPACITY, PRODUCTS, RANGES, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * The range ladder.
 *
 * Eight products spread across two orders of magnitude — 50 L/day to 5,000 —
 * which a list of eight rows flattens into eight things that all look the same
 * size. Putting them on one logarithmic axis is the only view where the range
 * is legible as a range: you can see that Stratus and Cumulus are not variants
 * of each other, they are different classes of machine.
 *
 * Confirmed models sit as filled markers. The four whose specifications are
 * still placeholders are hollow — the range reads as complete without
 * presenting unverified figures as settled.
 */

/** Where the non-numeric products park. Left of the axis end so their labels,
 *  which run to the right, stay inside the panel. */
const CONFIGURABLE_X = 68;

function positionFor(capacity: number) {
  // Log scale from 40 to MAX, leaving room at both ends.
  const min = Math.log10(40);
  const max = Math.log10(MAX_CAPACITY);
  return 4 + ((Math.log10(capacity) - min) / (max - min)) * 84;
}

const TICKS = [50, 100, 500, 1000, 5000];

/**
 * Several models share a capacity exactly (Stratus S50 and Cumulus C50 are both
 * 50 L/day), so raw log positions collide outright. Markers are nudged apart to
 * a minimum gap and labels are dealt across three heights, which means two
 * labels only ever share a height if they are three apart in the sorted order
 * and therefore far apart on the axis.
 */
const MIN_GAP = 5;
const LABEL_LEVELS = [40, 68, 96];

function layout(products: Product[]) {
  let previous = -Infinity;
  return products.map((p, i) => {
    const raw = positionFor(p.capacity!);
    const x = Math.max(raw, previous + MIN_GAP);
    previous = x;
    return { product: p, x, stem: LABEL_LEVELS[i % LABEL_LEVELS.length] };
  });
}

export function RangeLadder() {
  const [selected, setSelected] = useState<string | null>(null);

  // Sorted by capacity so neighbours on the axis are neighbours in the array,
  // which is what lets the stagger and the nudging work together.
  const rated = PRODUCTS.filter((p) => p.capacity !== null).sort(
    (a, b) => (a.capacity ?? 0) - (b.capacity ?? 0)
  );
  const placed = layout(rated);
  const configurable = PRODUCTS.filter((p) => p.capacity === null);
  const activeProduct = PRODUCTS.find((p) => p.slug === selected) ?? null;

  return (
    <div className="relative">
      <div className="glass-strong relative overflow-hidden rounded-[2rem] px-5 pb-8 pt-7 sm:px-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-navy/55">
            Daily output, logarithmic
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-navy/40">
            Select a unit
          </span>
        </div>

        {/* The axis. Top margin clears the tallest label stack: a level-3
            label, selected, sits ~146px above the line. */}
        <div className="relative mt-44 h-px w-full bg-blue/45">
          {TICKS.map((t) => (
            <div
              key={t}
              className="absolute top-0 -translate-x-1/2"
              style={{ left: `${positionFor(t)}%` }}
            >
              <span className="block h-2 w-px bg-blue/60" />
              <span className="tnum mt-2 block whitespace-nowrap font-mono text-[0.66rem] text-navy/50">
                {t.toLocaleString()}
              </span>
            </div>
          ))}
          <span className="absolute -top-1 right-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-navy/40">
            L/day
          </span>

          {/* Rated products */}
          {placed.map(({ product: p, x: left, stem }) => {
            const isActive = selected === p.slug;
            const height = stem + (isActive ? 20 : 0);
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() =>
                  setSelected((current) => (current === p.slug ? null : p.slug))
                }
                aria-pressed={isActive}
                className="group absolute bottom-0 -translate-x-1/2 cursor-pointer rounded-lg outline-offset-4"
                style={{ left: `${left}%` }}
                aria-label={`${p.name}, ${p.capacityLabel}${
                  p.confirmed ? "" : ", specification pending"
                }`}
              >
                {/* Stem length is the label's assigned height, so each marker
                    meets its own text. */}
                <span
                  className="mx-auto block w-px bg-blue/60 transition-[height,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-teal/70"
                  style={{
                    height,
                    background: isActive ? "var(--color-teal)" : undefined,
                  }}
                />
                {/* Marker: filled if confirmed, hollow if pending */}
                <span
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 rounded-full border-2 transition-[top,height,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "h-3.5 w-3.5" : "h-3 w-3",
                    p.confirmed ? "border-teal bg-teal" : "border-blue bg-white"
                  )}
                  style={{ top: -7 }}
                />
                <span
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[0.76rem] font-semibold transition-[top,color] duration-500",
                    isActive ? "text-navy" : "text-navy/55 group-hover:text-navy/80"
                  )}
                  style={{ top: -30 }}
                >
                  {p.name.replace("VidaTech ", "")}
                </span>
              </button>
            );
          })}

          {/* Configurable products park past the axis end */}
          {configurable.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() =>
                setSelected((current) => (current === p.slug ? null : p.slug))
              }
              aria-pressed={selected === p.slug}
              className="group absolute -translate-x-1/2 cursor-pointer rounded-lg outline-offset-4"
              style={{ left: `${CONFIGURABLE_X}%`, bottom: `${-38 - i * 26}px` }}
              aria-label={`${p.name}, configured to requirement, specification pending`}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-blue bg-white" />
                <span className="font-display text-[0.72rem] font-semibold text-navy/50">
                  {p.name.replace("VidaTech ", "")}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Preview panel — the reason hovering is worth doing */}
        <div className="mt-24 min-h-[7.5rem] border-t border-blue/25 pt-6 sm:mt-20">
          {activeProduct ? (
            <ProductPreview product={activeProduct} />
          ) : (
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {RANGES.map((r) => (
                <span key={r.id} className="flex items-baseline gap-2">
                  <span className="font-display text-[0.92rem] font-bold text-navy">
                    {r.name}
                  </span>
                  <span className="text-[0.84rem] text-navy/55">{r.blurb}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legend for the hollow markers — the distinction must be stated, not
          left to be inferred from a shape. */}
      <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.68rem] text-navy/45">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-teal" />
          Confirmed specification
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-blue bg-white" />
          Specification pending, verify before quoting
        </span>
      </p>
    </div>
  );
}

function ProductPreview({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-5 sm:gap-7">
      {product.image ? (
        <Image
          src={product.image}
          alt=""
          width={200}
          height={200}
          className="h-24 w-auto shrink-0 object-contain"
        />
      ) : (
        <span className="flex h-24 w-20 shrink-0 items-center justify-center rounded-xl border border-dashed border-blue/50 font-mono text-[0.58rem] uppercase leading-tight tracking-[0.1em] text-navy/40">
          No photo
          <br />
          yet
        </span>
      )}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-display text-[1.15rem] font-bold text-navy">
            {product.name}
          </span>
          {!product.confirmed && (
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-navy/60">
              Spec pending
            </span>
          )}
        </div>
        <p className="tnum mt-1 font-mono text-[0.82rem] text-teal">
          {product.capacityLabel}
        </p>
        <p className="mt-1.5 max-w-[52ch] text-[0.88rem] leading-[1.6] text-navy/62">
          {product.benefit}
        </p>
      </div>
    </div>
  );
}
