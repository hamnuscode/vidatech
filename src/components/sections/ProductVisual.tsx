"use client";

import Image from "next/image";
import { WaterFill } from "@/components/water/WaterFill";
import type { Product } from "@/lib/products";
import { MAX_CAPACITY } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Product illustration, drawn rather than photographed.
 *
 * Each range gets its own silhouette — a dispenser, a cabinet, a container, an
 * array — and every unit shows a reservoir filled to its share of the range's
 * top capacity. The picture and the spec sheet say the same thing.
 */
export function ProductVisual({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const level = product.capacity
    ? 0.18 + (Math.log10(product.capacity) / Math.log10(MAX_CAPACITY)) * 0.62
    : 0.5;

  return (
    <div
      className={cn(
        "relative isolate flex items-end justify-center overflow-hidden rounded-[2rem] border border-blue/25 p-8 sm:p-12",
        className
      )}
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #f2f8fa 55%, #e4eff2 100%)",
      }}
    >
      {/* Ambient caustic light on the back wall */}
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          background:
            "radial-gradient(60% 45% at 24% 18%, rgba(75,182,196,0.20) 0%, transparent 70%), radial-gradient(46% 38% at 82% 30%, rgba(249,179,65,0.16) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Floor shadow */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 h-6 w-[62%] -translate-x-1/2 rounded-[50%] blur-xl sm:bottom-12"
        style={{ background: "rgba(9,33,64,0.16)" }}
        aria-hidden="true"
      />

      {product.image ? (
        <Photograph product={product} level={level} />
      ) : (
        <Silhouette product={product} level={level} />
      )}
    </div>
  );
}

/**
 * The manufacturer's own photograph, with the capacity read as a level in a
 * glass panel beside it — so a photographed unit and a drawn one still carry
 * the same piece of information.
 */
function Photograph({ product, level }: { product: Product; level: number }) {
  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center">
      <Image
        src={product.image!}
        alt={`${product.name} atmospheric water generator`}
        width={900}
        height={900}
        sizes="(max-width: 1024px) 90vw, 480px"
        className="h-full w-auto max-w-full object-contain drop-shadow-[0_28px_40px_rgba(9,33,64,0.16)]"
      />
      <div className="glass absolute bottom-0 left-0 flex items-center gap-3 rounded-2xl px-4 py-3">
        <span className="relative block h-9 w-4 overflow-hidden rounded-full border border-white/70 bg-white/60">
          <WaterFill level={level} amplitude={10} speed={9} />
        </span>
        <span>
          <span className="block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-navy/55">
            Output
          </span>
          <span className="tnum block font-display text-[0.95rem] font-bold leading-tight text-navy">
            {product.capacityLabel}
          </span>
        </span>
      </div>
    </div>
  );
}

function Silhouette({ product, level }: { product: Product; level: number }) {
  const shell =
    "relative z-10 overflow-hidden border border-white/70 bg-white/85 shadow-[0_28px_60px_-32px_rgba(9,33,64,0.5)] backdrop-blur-sm";

  if (product.range === "custom" && product.slug === "vidatech-agriflow") {
    // Bespoke systems are multiple units working as one
    return (
      <div className="relative z-10 flex items-end gap-3">
        {[0.72, 1, 0.86].map((scale, i) => (
          <div
            key={i}
            className={cn(shell, "rounded-2xl")}
            style={{ width: 74 * scale, height: 190 * scale }}
          >
            <Grille rows={3} />
            <Window level={level - i * 0.08} label={i === 1 ? "" : undefined} />
          </div>
        ))}
      </div>
    );
  }

  if (product.range === "custom") {
    // The add-on: a monitoring module, not a generator
    return (
      <div className={cn(shell, "z-10 w-[min(300px,80%)] rounded-3xl p-5")}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-navy/50">
            Live
          </span>
          <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_0_4px_rgba(7,144,163,0.16)]" />
        </div>
        <div className="mt-4 space-y-3">
          {[
            { k: "pH", v: "7.0", fill: 0.7 },
            { k: "TDS", v: "112 ppm", fill: 0.42 },
            { k: "Flow", v: "Nominal", fill: 0.88 },
          ].map((row) => (
            <div key={row.k}>
              <div className="flex items-baseline justify-between font-mono text-[0.72rem] text-navy/70">
                <span className="uppercase tracking-[0.12em]">{row.k}</span>
                <span className="tnum text-navy">{row.v}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${row.fill * 100}%`,
                    background: "var(--grad-water)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Standard generator formats, sized by range
  const dims = {
    stratus: { w: 168, h: 300, radius: "1.6rem", rows: 4 },
    nimbus: { w: 268, h: 258, radius: "1.4rem", rows: 5 },
    cumulus: { w: 372, h: 196, radius: "1rem", rows: 6 },
  }[product.range as "stratus" | "nimbus" | "cumulus"];

  return (
    <div
      className={cn(shell, "z-10")}
      style={{
        width: `min(${dims.w}px, 82%)`,
        aspectRatio: `${dims.w} / ${dims.h}`,
        borderRadius: dims.radius,
      }}
    >
      <Grille rows={dims.rows} />
      <Window level={level} />
    </div>
  );
}

/** The air intake — the first step of the process, made visible. */
function Grille({ rows }: { rows: number }) {
  return (
    <div
      className="absolute inset-x-0 top-0 flex flex-col gap-[3px] p-3.5"
      aria-hidden="true"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <span
          key={i}
          className="block h-[3px] rounded-full bg-navy/10"
          style={{ width: `${88 - i * 6}%` }}
        />
      ))}
    </div>
  );
}

/** The reservoir window. Level is the product's share of the range's top output. */
function Window({ level, label }: { level: number; label?: string }) {
  return (
    <div className="absolute inset-x-3.5 bottom-3.5 top-[46%] overflow-hidden rounded-xl border border-navy/8 bg-blue-50/70">
      <WaterFill level={Math.max(0.12, Math.min(0.92, level))} amplitude={4} speed={8} showBubbles />
      {label !== "" && (
        <span className="absolute left-2.5 top-2 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-navy/45">
          Reservoir
        </span>
      )}
    </div>
  );
}
