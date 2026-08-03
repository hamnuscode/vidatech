"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Primitives";
import { Arrow } from "@/components/ui/Button";
import { WaterFill } from "@/components/water/WaterFill";
import { MAX_CAPACITY, PRODUCTS, RANGES, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * The catalogue, as a bento rather than eight alternating rows.
 *
 * Card size carries information: within each range the higher-capacity unit
 * takes the wide cell. So the grid itself tells you which is the bigger
 * machine before you read a single figure.
 */

function levelFor(p: Product) {
  return p.capacity
    ? 0.16 + (Math.log10(p.capacity) / Math.log10(MAX_CAPACITY)) * 0.66
    : 0.46;
}

export function ProductBento() {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      {RANGES.map((range) => {
        const models = PRODUCTS.filter((p) => p.range === range.id);
        // Widest cell goes to the biggest machine in the range.
        const lead = models.reduce((a, b) =>
          (b.capacity ?? 0) > (a.capacity ?? 0) ? b : a
        );

        return (
          <section key={range.id} id={range.id} className="scroll-mt-40">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-blue/35 pt-6">
                <h2 className="font-display text-[1.7rem] font-bold tracking-[-0.035em] text-navy">
                  {range.name}
                </h2>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-navy/50">
                  {range.blurb}
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-4 md:grid-cols-6">
              {models.map((product, i) => (
                <Reveal
                  key={product.slug}
                  delay={i * 0.07}
                  className={cn(
                    product.slug === lead.slug ? "md:col-span-4" : "md:col-span-2"
                  )}
                >
                  <ProductCard
                    product={product}
                    wide={product.slug === lead.slug}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ProductCard({ product, wide }: { product: Product; wide: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState<{ x: number; y: number } | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top });
    // Photo drifts against the pointer — parallax, not tilt.
    setTilt({ x: (px - 0.5) * -14, y: (py - 0.5) * -10 });
  };

  return (
    <article
      id={product.slug}
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        setGlow(null);
        setTilt({ x: 0, y: 0 });
      }}
      className="group relative flex h-full scroll-mt-40 flex-col overflow-hidden rounded-3xl border border-blue/30 bg-white transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_30px_60px_-30px_rgba(9,33,64,0.36)]"
    >
      {/* Caustic highlight following the pointer */}
      {glow && (
        <span
          className="pointer-events-none absolute -z-0 h-64 w-64 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            left: glow.x - 128,
            top: glow.y - 128,
            background:
              "radial-gradient(circle, rgba(7,144,163,0.14) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-blue-50/70",
          wide ? "h-56" : "h-44"
        )}
      >
        <WaterFill
          level={levelFor(product)}
          className="opacity-[0.14]"
          amplitude={8}
          speed={12}
        />
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} atmospheric water generator`}
            width={600}
            height={600}
            sizes="(max-width: 768px) 90vw, 420px"
            className="relative h-full w-auto py-6 object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)` }}
          />
        ) : (
          <span className="relative font-mono text-[0.64rem] uppercase tracking-[0.16em] text-navy/35">
            Photography pending
          </span>
        )}

        {!product.confirmed && (
          <span className="absolute right-4 top-4 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-navy/60 backdrop-blur-sm">
            Spec pending
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-teal">
          {product.kicker}
        </span>
        <h3 className="mt-2 font-display text-[1.28rem] font-bold text-navy">
          {product.name}
        </h3>
        <p className="mt-2 text-[0.9rem] font-medium leading-snug text-navy/75">
          {product.benefit}
        </p>

        {wide && (
          <p className="mt-3 max-w-[54ch] text-[0.88rem] leading-[1.7] text-navy/60">
            {product.body}
          </p>
        )}

        <dl
          className={cn(
            "mt-5 grid gap-x-5 gap-y-2.5 border-t border-blue/25 pt-4",
            wide ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"
          )}
        >
          {product.specs.slice(0, wide ? 4 : 2).map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-navy/45">
                {s.label}
              </dt>
              <dd className="tnum mt-0.5 text-[0.86rem] font-medium text-navy">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={`/contact?product=${product.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 font-display text-[0.86rem] font-semibold text-teal"
        >
          Request details <Arrow />
        </Link>
      </div>
    </article>
  );
}
