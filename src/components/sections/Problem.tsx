"use client";

import CountUp from "@/components/reactbits/CountUp";
import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";
import { WaterFill } from "@/components/water/WaterFill";

/**
 * Four claims about the alternative. Two are quantities and count up; two are
 * absences and simply say so — a fake "0" would be a number pretending to be
 * evidence.
 */
type Chip = {
  value?: number;
  suffix?: string;
  headline?: string;
  label: string;
  detail: string;
  level: number;
};

const CHIPS: Chip[] = [
  {
    value: 30,
    suffix: "%+",
    label: "Relative humidity in most Pakistani cities",
    detail: "Enough moisture in the air to condense from, most of the year.",
    level: 0.34,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Off-grid capable operation",
    detail: "Runs on site power alone — no mains water connection required.",
    level: 0.82,
  },
  {
    headline: "No aquifer",
    label: "Free of groundwater contaminants",
    detail:
      "Nothing is carried up from below, because nothing is drawn from below.",
    level: 0.12,
  },
  {
    headline: "No bottles",
    label: "Zero plastic in the supply chain",
    detail: "No deliveries, no returns, no store room full of empties.",
    level: 0.12,
  },
];

export function Problem() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="absolute inset-0 -z-20 surface-field" aria-hidden="true" />
      <SectionAtmosphere lights="default" />
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="The problem"
              title={
                <>
                  Pakistan&rsquo;s water crisis is real
                  <span className="text-teal"> — and rising.</span>
                </>
              }
              lede="Shrinking groundwater, a growing population, and mounting pollution are pushing the country toward severe water stress. Traditional sources are depleting or unsafe. VidaTech offers a different path: water that doesn't come from a well, a tanker, or a plastic bottle — it comes from the air around us."
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {CHIPS.map((chip, i) => (
              <Reveal key={chip.label} delay={i * 0.08}>
                <div className="glass relative isolate h-full overflow-hidden rounded-3xl p-6">
                  {/* Wide, short boxes stretch the viewBox flat — the wave
                      needs more amplitude here to still read as a surface. */}
                  <WaterFill
                    level={chip.level}
                    className="opacity-[0.2]"
                    amplitude={9}
                    speed={11 + i}
                  />
                  <div className="relative z-10">
                    {chip.value !== undefined ? (
                      <span className="tnum block font-display text-[2.6rem] font-bold leading-none text-navy">
                        <CountUp to={chip.value} duration={1.6} />
                        {chip.suffix}
                      </span>
                    ) : (
                      <span className="block font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-navy">
                        {chip.headline}
                      </span>
                    )}
                    <p className="mt-3 font-display text-[0.95rem] font-semibold leading-snug text-navy">
                      {chip.label}
                    </p>
                    <p className="mt-2 text-[0.87rem] leading-relaxed text-navy/60">
                      {chip.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[64ch] font-mono text-[0.72rem] leading-relaxed text-navy/45">
            Humidity varies by city and season. Verify figures against a citable
            source before launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
