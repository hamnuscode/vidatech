"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Eyebrow, Reveal } from "@/components/ui/Primitives";
import { ProductVisual } from "@/components/sections/ProductVisual";
import { WaterFill } from "@/components/water/WaterFill";
import {
  PRODUCTS,
  RANGES,
  USE_CASES,
  MAX_CAPACITY,
  type Product,
  type RangeId,
} from "@/lib/products";
import { cn } from "@/lib/utils";

const CAPACITY_BANDS = [
  { id: "all", label: "Any output", test: () => true },
  {
    id: "small",
    label: "Up to 250 L/day",
    test: (p: Product) => p.capacity !== null && p.capacity <= 250,
  },
  {
    id: "mid",
    label: "250 – 1,000 L/day",
    test: (p: Product) =>
      p.capacity !== null && p.capacity > 250 && p.capacity <= 1000,
  },
  {
    id: "large",
    label: "Over 1,000 L/day",
    test: (p: Product) => p.capacity !== null && p.capacity > 1000,
  },
  {
    id: "configured",
    label: "Configured to site",
    test: (p: Product) => p.capacity === null,
  },
] as const;

export function ProductCatalogue() {
  const [range, setRange] = useState<RangeId | "all">("all");
  const [useCase, setUseCase] = useState<string>("all");
  const [band, setBand] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [activeRange, setActiveRange] = useState<string>(RANGES[0].id);
  const rowRefs = useRef<Map<string, HTMLElement>>(new Map());

  const results = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        if (range !== "all" && p.range !== range) return false;
        if (useCase !== "all" && !p.useCases.includes(useCase)) return false;
        const bandDef = CAPACITY_BANDS.find((b) => b.id === band);
        if (bandDef && !bandDef.test(p)) return false;
        return true;
      }),
    [range, useCase, band]
  );

  const extraFilters = useCase !== "all" || band !== "all";
  const filtered = range !== "all" || extraFilters;

  // Track which range the reader is inside, but only when showing everything —
  // once filtered, the sub-nav would be pointing at sections that aren't there.
  useEffect(() => {
    if (filtered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        const r = visible?.target.getAttribute("data-range");
        if (r) setActiveRange(r);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    rowRefs.current.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [filtered, results]);

  return (
    <section className="bg-blue-50 pb-24">
      {/* Slim while you read; the extra filters open only when asked for. */}
      <div className="sticky top-[70px] z-30 py-3">
        <div className="shell">
          <div className="glass-strong rounded-full px-2 py-2 sm:rounded-3xl sm:px-3">
            <div className="flex items-center gap-2">
              {/* Fades at the edge so a clipped range reads as "scroll me",
                  not as a broken chip. */}
              <div
                className="flex flex-1 gap-1 overflow-x-auto pr-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, #000 0, #000 calc(100% - 20px), transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, #000 0, #000 calc(100% - 20px), transparent 100%)",
                }}
              >
                <Chip active={range === "all"} onClick={() => setRange("all")}>
                  All ranges
                </Chip>
                {RANGES.map((r) => (
                  <Chip
                    key={r.id}
                    active={range === r.id}
                    onClick={() => setRange(r.id)}
                  >
                    {r.name}
                  </Chip>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="product-filters"
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-[0.82rem] font-medium transition-colors duration-300",
                  extraFilters
                    ? "bg-navy text-white"
                    : "text-navy/65 ring-1 ring-blue/35 hover:text-navy"
                )}
              >
                Filters
                {extraFilters && (
                  <span className="tnum rounded-full bg-white/20 px-1.5 text-[0.7rem]">
                    {(band !== "all" ? 1 : 0) + (useCase !== "all" ? 1 : 0)}
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "transition-transform duration-300",
                    open && "rotate-180"
                  )}
                >
                  ▾
                </span>
              </button>
            </div>

            {open && (
              <div
                id="product-filters"
                className="mt-3 flex flex-col gap-3 border-t border-blue/25 px-2 pb-2 pt-3"
              >
                <FilterRow label="Output">
                  {CAPACITY_BANDS.map((b) => (
                    <Chip
                      key={b.id}
                      active={band === b.id}
                      onClick={() => setBand(b.id)}
                    >
                      {b.label}
                    </Chip>
                  ))}
                </FilterRow>

                <FilterRow label="Use case">
                  <Chip
                    active={useCase === "all"}
                    onClick={() => setUseCase("all")}
                  >
                    Any
                  </Chip>
                  {USE_CASES.map((u) => (
                    <Chip
                      key={u}
                      active={useCase === u}
                      onClick={() => setUseCase(u)}
                    >
                      {u}
                    </Chip>
                  ))}
                </FilterRow>

                <div className="flex items-center justify-between pt-1">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy/55">
                    {results.length} of {PRODUCTS.length} products
                  </p>
                  {filtered && (
                    <button
                      type="button"
                      onClick={() => {
                        setRange("all");
                        setUseCase("all");
                        setBand("all");
                      }}
                      className="font-display text-[0.82rem] font-semibold text-teal underline-offset-4 hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="shell mt-10">
        {results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-blue/45 bg-white/60 px-8 py-20 text-center">
            <h2 className="font-display text-[1.4rem] font-bold text-navy">
              No product matches that combination
            </h2>
            <p className="mx-auto mt-3 max-w-[46ch] text-[0.95rem] leading-[1.7] text-navy/62">
              Widen the filters, or tell us your daily requirement and location
              and we&rsquo;ll size a system for you.
            </p>
            <ButtonLink href="/contact" className="mt-7">
              Get a free assessment <Arrow />
            </ButtonLink>
          </div>
        ) : filtered ? (
          <div className="flex flex-col gap-20 sm:gap-24">
            {results.map((product, i) => (
              <ProductRow key={product.slug} product={product} flip={i % 2 === 1} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-20 sm:gap-28">
            {RANGES.map((r) => (
              <div key={r.id} id={r.id} className="scroll-mt-56">
                <div className="flex flex-col gap-2 border-t border-blue/35 pt-6">
                  <Eyebrow>{r.name}</Eyebrow>
                  <p className="font-display text-[1.05rem] font-semibold text-navy/70">
                    {r.blurb}
                  </p>
                </div>
                <div className="mt-12 flex flex-col gap-20 sm:gap-24">
                  {PRODUCTS.filter((p) => p.range === r.id).map((product, i) => (
                    <ProductRow
                      key={product.slug}
                      product={product}
                      flip={i % 2 === 1}
                      register={(el) => {
                        if (el) rowRefs.current.set(product.slug, el);
                        else rowRefs.current.delete(product.slug);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Screen-reader-invisible marker so the sticky nav has something to say */}
      <span className="sr-only" aria-live="polite">
        Showing {results.length} products
        {!filtered && `, currently in the ${activeRange} range`}
      </span>
    </section>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-20 shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-navy/50">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-[0.82rem] font-medium transition-colors duration-300",
        active
          ? "bg-teal text-white"
          : "bg-white/70 text-navy/65 ring-1 ring-blue/35 hover:text-navy"
      )}
    >
      {children}
    </button>
  );
}

export function ProductRow({
  product,
  flip,
  register,
}: {
  product: Product;
  flip: boolean;
  register?: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={register}
      id={product.slug}
      data-range={product.range}
      className="scroll-mt-56"
    >
      <div
        className={cn(
          "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
          flip && "lg:[&>*:first-child]:order-2"
        )}
      >
        <Reveal y={30}>
          <ProductVisual product={product} className="aspect-[4/3] w-full" />
        </Reveal>

        <Reveal delay={0.1} y={30}>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-navy px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white">
                {product.range}
              </span>
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy/55">
                {product.kicker}
              </span>
            </div>

            <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] text-navy">
              {product.name}
            </h2>
            <p className="mt-3 font-display text-[1.08rem] font-semibold leading-snug text-teal">
              {product.benefit}
            </p>
            <p className="mt-4 max-w-[52ch] text-[0.97rem] leading-[1.75] text-navy/68">
              {product.body}
            </p>

            <SpecPanel product={product} />

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <ButtonLink href={`/contact?product=${product.slug}`}>
                Request details <Arrow />
              </ButtonLink>
              <span className="font-mono text-[0.76rem] text-navy/50">
                Best for: {product.bestFor}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

/** Glass spec sheet. The output row is a level, not a line of text. */
function SpecPanel({ product }: { product: Product }) {
  const level = product.capacity
    ? 0.15 + (Math.log10(product.capacity) / Math.log10(MAX_CAPACITY)) * 0.7
    : 0.5;

  return (
    <div className="glass mt-7 overflow-hidden rounded-2xl">
      <div className="relative isolate flex items-end justify-between gap-4 overflow-hidden px-5 py-4">
        <WaterFill level={level} className="opacity-25" amplitude={10} speed={10} />
        <div className="relative z-10">
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-navy/60">
            Output
          </span>
          <span className="tnum mt-0.5 block font-display text-[1.7rem] font-bold leading-none text-navy">
            {product.capacityLabel}
          </span>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-blue/25">
        {product.specs.slice(1).map((spec) => (
          <div key={spec.label} className="bg-white/70 px-5 py-3.5">
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-navy/50">
              {spec.label}
            </dt>
            <dd className="tnum mt-1 text-[0.92rem] font-medium text-navy">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
