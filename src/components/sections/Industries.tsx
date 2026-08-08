"use client";

import { useState } from "react";
import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";
import { INDUSTRIES } from "@/lib/industries";
import { cn } from "@/lib/utils";

/**
 * Industries, stated as problem and answer.
 *
 * A grid of sector names would tell a buyer nothing they could act on. Each
 * card names the specific way water fails in that industry first, and only
 * then what the machine does about it — so a reader recognises their own
 * situation before they are sold anything.
 *
 * Selection is on click, matching the range ladder: hovering across a grid of
 * expanding cards makes the whole section twitch.
 */
export function Industries() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="section-y relative overflow-hidden" id="industries">
      <div className="absolute inset-0 -z-20 surface-field" aria-hidden="true" />
      <SectionAtmosphere lights="corner" />

      <div className="shell relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title={
                <>
                  Every sector has its own{" "}
                  <span className="text-teal">water problem.</span>
                </>
              }
              lede="The failure is never generic. A construction site loses water to scheduling, a pharmaceutical plant to seasonal variation, a hospital to a mains it cannot control. Here is what on-site generation changes in each case."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/contact" variant="ghost" size="lg">
              Discuss your sector <Arrow />
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, i) => {
            const isOpen = open === industry.id;
            return (
              <Reveal as="li" key={industry.id} delay={(i % 3) * 0.06}>
                <button
                  type="button"
                  onClick={() =>
                    setOpen((current) =>
                      current === industry.id ? null : industry.id
                    )
                  }
                  aria-expanded={isOpen}
                  className={cn(
                    "group flex h-full w-full flex-col rounded-3xl border p-6 text-left transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen
                      ? "-translate-y-1 border-teal/45 bg-white shadow-[0_26px_54px_-28px_rgba(9,33,64,0.32)]"
                      : "border-blue/30 bg-white/70 hover:-translate-y-0.5 hover:border-teal/35 hover:bg-white"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[1.08rem] font-bold leading-snug text-navy">
                      {industry.name}
                    </h3>
                    {/* A waterline that fills when the card is open. */}
                    <span
                      className="mt-1.5 block h-1.5 w-8 shrink-0 overflow-hidden rounded-full bg-blue/30"
                      aria-hidden="true"
                    >
                      <span
                        className="block h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          width: isOpen ? "100%" : "38%",
                          background: "var(--grad-water)",
                        }}
                      />
                    </span>
                  </div>

                  <p className="mt-3 text-[0.89rem] leading-[1.7] text-navy/62">
                    {industry.problem}
                  </p>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-blue/30 pt-4 text-[0.89rem] leading-[1.7] text-navy/80">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-teal">
                          What changes
                        </span>
                        <span className="mt-1.5 block">{industry.answer}</span>
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "mt-auto pt-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-colors duration-300",
                      isOpen ? "text-navy/40" : "text-teal"
                    )}
                  >
                    {isOpen ? "Close" : "What changes"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.14}>
          <p className="mt-10 max-w-[64ch] font-mono text-[0.72rem] leading-relaxed text-navy/45">
            Sector not listed? The requirement is the same everywhere: a daily
            volume, a location, and the power available on site.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
