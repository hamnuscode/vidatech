"use client";

import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";

/**
 * Three beats, home page only.
 *
 * The five-step process lives on /technology as the condensation diagram —
 * repeating it here would be the same content twice. What the home page needs
 * is the shape of the idea, not the engineering: air goes in, water comes out,
 * and the middle is the part worth reading about elsewhere.
 */
const BEATS = [
  {
    state: "Air",
    figure: "24 g",
    unit: "per m³",
    body: "A humid Lahore afternoon carries roughly this much water in every cubic metre of air — already there, already free.",
  },
  {
    state: "Cold",
    figure: "26 °C",
    unit: "dew point",
    body: "Cool that air past its dew point and the water stops being vapour. This is the whole trick, and it is not a new one.",
  },
  {
    state: "Water",
    figure: "pH 7",
    unit: "balanced",
    body: "What condenses is nearly pure — and nearly tasteless. Minerals go back in before it reaches the glass.",
  },
];

export function AirToGlass() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="absolute inset-0 -z-20 surface-raised" aria-hidden="true" />
      <SectionAtmosphere lights="wide" />

      <div className="shell relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="The idea"
              title={
                <>
                  Air already holds the water.{" "}
                  <span className="text-teal">We just cool it out.</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/technology" variant="ghost" size="lg">
              See the full process <Arrow />
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {BEATS.map((beat, i) => (
            <Reveal as="li" key={beat.state} delay={i * 0.09}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-blue/30 bg-white/70 p-7 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_26px_54px_-30px_rgba(9,33,64,0.32)]">
                {/* The state change, drawn as three dots that condense */}
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-teal transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        width: i === 2 ? 9 : i === 1 ? 6 : 4,
                        height: i === 2 ? 9 : i === 1 ? 6 : 4,
                        opacity: 0.3 + i * 0.28 + d * 0.06,
                      }}
                    />
                  ))}
                </div>

                <p className="mt-6 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-navy/50">
                  {beat.state}
                </p>
                <p className="tnum mt-2 font-display text-[2.4rem] font-bold leading-none text-navy">
                  {beat.figure}
                  <span className="ml-1.5 font-mono text-[0.32em] font-medium uppercase tracking-[0.12em] text-navy/50">
                    {beat.unit}
                  </span>
                </p>
                <p className="mt-4 text-[0.92rem] leading-[1.72] text-navy/65">
                  {beat.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
