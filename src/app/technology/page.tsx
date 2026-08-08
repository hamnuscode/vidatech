import type { Metadata } from "next";
import { CondensationDiagram } from "@/components/interactive/CondensationDiagram";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";
import { WaveDivider } from "@/components/water/WaveDivider";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How an atmospheric water generator works: intake, filtration, condensation at the dew point, purification, and mineralisation, shown as a working cross-section.",
};

const STANDARDS = [
  {
    label: "Balanced pH",
    value: "7.0",
    body: "Clean, natural-tasting water for everyday use.",
  },
  {
    label: "UV Protection",
    value: "24/7",
    body: "Helps keep stored water clean and safe.",
  },
  {
    label: "Advanced Filtration",
    value: "Multi-Stage",
    body: "Removes impurities for consistently clean water.",
  },
  {
    label: "Mineral Balance",
    value: "Optimised",
    body: "Essential minerals are added back for a fresh, natural taste.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40 sm:pt-44">
        <div className="absolute inset-0 -z-20 surface-field" aria-hidden="true" />
        <SectionAtmosphere lights="wide" survey />

        <div className="shell relative">
          <Eyebrow>Technology</Eyebrow>
          <h1 className="mt-6 max-w-[18ch] text-[clamp(2.4rem,5.6vw,4.4rem)] text-navy">
            Condensing water is easy.{" "}
            <span className="text-teal">Doing it well is the engineering.</span>
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1.04rem] leading-[1.74] text-navy/68">
            The process begins with condensation. Everything that follows is
            engineered to deliver consistent performance and water you can
            trust.
          </p>

          <Reveal delay={0.1}>
            <div className="mt-14">
              <CondensationDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="var(--surface-field)" to="var(--surface-raised)" />

      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 -z-20 surface-raised" aria-hidden="true" />
        <SectionAtmosphere lights="corner" caustics={false} />

        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="Water quality"
              title="Water Quality You Can Trust"
              lede="Every drop produced by our system is carefully filtered, protected, and balanced to deliver clean, safe, and refreshing drinking water. From advanced filtration to UV protection and mineral balancing, every stage is designed to ensure consistent quality before the water reaches your tap."
            />
          </Reveal>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-blue/30 bg-blue/25 sm:grid-cols-2 lg:grid-cols-4">
            {STANDARDS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.06}
                className="group relative bg-white p-7 transition-colors duration-500 hover:bg-blue-50/60"
              >
                <dt>
                  <Eyebrow>{s.label}</Eyebrow>
                </dt>
                <dd>
                  <p className="mt-4 font-display text-[2.1rem] font-bold leading-none tracking-[-0.04em] text-navy">
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

      <WaveDivider from="var(--surface-raised)" to="var(--surface-field)" />

      <CTABand
        heading="Want numbers for your project?"
        sub="Give us your location and daily requirement and we'll model output across the year before recommending anything."
        cta="Get a Quote"
      />
    </>
  );
}
