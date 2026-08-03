"use client";

import Link from "next/link";
import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { WaterFill } from "@/components/water/WaterFill";
import { PRODUCTS, RANGES, MAX_CAPACITY } from "@/lib/products";

/**
 * Home-page preview of the catalogue: four ranges, not eight datasheets.
 * Each card is filled to the top capacity in its range, so the four cards read
 * as one rising scale before anyone opens the products page.
 */
export function ProductsOverview() {
  return (
    <section className="section-y relative overflow-hidden" id="products">
      <div className="absolute inset-0 -z-20 surface-raised" aria-hidden="true" />
      <SectionAtmosphere lights="wide" />
      <div className="shell relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="The range"
              title={
                <>
                  Four ranges, from a kitchen{" "}
                  <span className="text-teal">to a field hospital.</span>
                </>
              }
              lede="Every model runs the same five-step process. What changes is how much it produces and what it has to survive."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/products" variant="ghost" size="lg">
              See all 8 products <Arrow />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RANGES.map((range, i) => {
            const models = PRODUCTS.filter((p) => p.range === range.id);
            const top = Math.max(
              ...models.map((m) => m.capacity ?? 0)
            );
            const level = top
              ? 0.16 + (Math.log10(top) / Math.log10(MAX_CAPACITY)) * 0.66
              : 0.5;

            return (
              <Reveal key={range.id} delay={i * 0.07}>
                <Link
                  href={`/products#${range.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-blue/30 bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_26px_54px_-28px_rgba(9,33,64,0.34)]"
                >
                  <div className="relative isolate h-32 overflow-hidden bg-blue-50">
                    <WaterFill level={level} amplitude={4} speed={9 + i} showBubbles />
                    <span className="absolute left-5 top-4 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-navy/60">
                      {models.length} model{models.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-[1.3rem] font-bold text-navy">
                      {range.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.9rem] leading-[1.65] text-navy/62">
                      {range.blurb}
                    </p>
                    <p className="tnum mt-5 border-t border-blue/25 pt-4 font-mono text-[0.78rem] text-navy/55">
                      {top
                        ? `Up to ${top.toLocaleString()} L/day`
                        : "Configured to requirement"}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[0.86rem] font-semibold text-teal">
                      View range <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
