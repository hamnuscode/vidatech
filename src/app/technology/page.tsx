import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { WaveDivider } from "@/components/water/WaveDivider";
import { WaterFill } from "@/components/water/WaterFill";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How an atmospheric water generator works: intake, filtration, condensation, purification, and mineralisation — plus what humidity and temperature do to output.",
};

/**
 * Output against conditions. Indicative, and labelled as such — the honest
 * version of this chart is the one that shows output falling.
 */
const YIELD_CURVE = [
  { rh: "30%", level: 0.22, note: "Dry winter air" },
  { rh: "45%", level: 0.42, note: "Shoulder season" },
  { rh: "60%", level: 0.66, note: "Typical summer" },
  { rh: "75%", level: 0.86, note: "Monsoon humidity" },
  { rh: "90%", level: 1.0, note: "Coastal, peak" },
];

const STANDARDS = [
  {
    label: "pH",
    value: "7.0",
    body: "Held neutral by the mineral stage — neither aggressive nor alkaline.",
  },
  {
    label: "Sterilisation",
    value: "UV",
    body: "The reservoir is kept circulating and irradiated rather than standing still.",
  },
  {
    label: "Filtration",
    value: "Multi-stage",
    body: "Air-side before the coil, water-side after it. Nothing condenses that wasn't filtered first.",
  },
  {
    label: "Minerals",
    value: "Balanced",
    body: "Calcium and magnesium reintroduced to a consistent profile across every unit.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title={
          <>
            Condensing water is easy. Doing it{" "}
            <span className="text-teal">well is the engineering.</span>
          </>
        }
        lede="An atmospheric water generator is a dehumidifier that takes its output seriously. The difference between the two is what happens on either side of the coil — and how honestly the capacity is quoted."
      />

      <Process detailed />

      <WaveDivider from="var(--color-paper)" to="var(--color-blue-50)" />

      <section className="section-y bg-blue-50">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Humidity & output"
                title="Output follows the weather. So should the specification."
                lede="Every capacity figure assumes a temperature and a relative humidity. Quoted at 30 °C and 80% humidity, a unit will not produce the same in February — which is why we size against your difficult months, not your average ones."
              />
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="glass overflow-hidden rounded-3xl p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-2 sm:gap-4">
                    {YIELD_CURVE.map((point, i) => (
                      <div
                        key={point.rh}
                        className="flex flex-1 flex-col items-center gap-3"
                      >
                        <div
                          className="relative w-full overflow-hidden rounded-xl border border-blue/25 bg-white/50"
                          style={{ height: 190 }}
                        >
                          <WaterFill
                            level={point.level}
                            amplitude={4}
                            speed={8 + i}
                            showBubbles
                          />
                        </div>
                        <span className="tnum font-mono text-[0.78rem] font-medium text-navy">
                          {point.rh}
                        </span>
                        <span className="hidden text-center text-[0.72rem] leading-tight text-navy/50 sm:block">
                          {point.note}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 border-t border-blue/25 pt-4 font-mono text-[0.7rem] leading-relaxed text-navy/50">
                    Relative humidity, left to right. Levels are indicative of
                    the shape of the curve, not a datasheet — verify against
                    GENAQ&rsquo;s published performance data before publishing.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--color-blue-50)" to="var(--color-paper)" />

      <section className="section-y">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Water quality"
              title="What comes out of the tap, and how we hold it there."
            />
          </Reveal>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-blue/30 bg-blue/25 sm:grid-cols-2 lg:grid-cols-4">
            {STANDARDS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="bg-paper p-7">
                <dt>
                  <Eyebrow>{s.label}</Eyebrow>
                </dt>
                <dd>
                  <p className="mt-4 font-display text-[2rem] font-bold leading-none text-navy">
                    {s.value}
                  </p>
                  <p className="mt-3 text-[0.9rem] leading-[1.7] text-navy/62">
                    {s.body}
                  </p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CTABand
        heading="Want the numbers for your site?"
        sub="Give us your location and daily requirement. We'll model output across the year before recommending anything."
        cta="Request a consultation"
      />
    </>
  );
}
