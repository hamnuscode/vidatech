import type { Metadata } from "next";
import { CondensationDiagram } from "@/components/interactive/CondensationDiagram";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";
import { WaveDivider } from "@/components/water/WaveDivider";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How an atmospheric water generator works: intake, filtration, condensation at the dew point, purification, and mineralisation — shown as a working cross-section.",
};

const STANDARDS = [
  {
    label: "pH",
    value: "7.0",
    body: "Held neutral by the mineral stage — neither aggressive to pipework nor alkaline to taste.",
  },
  {
    label: "Sterilisation",
    value: "UV",
    body: "The reservoir is kept circulating and irradiated rather than left standing.",
  },
  {
    label: "Filtration",
    value: "Multi-stage",
    body: "Air-side before the coil, water-side after it. Nothing condenses that was not filtered first.",
  },
  {
    label: "Minerals",
    value: "Balanced",
    body: "Calcium and magnesium reintroduced to a consistent profile across every unit in the range.",
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
            An atmospheric water generator is a dehumidifier that takes its
            output seriously. The difference between the two is everything that
            happens on either side of the coil.
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
              title="What comes out of the tap, and how it is held there."
              lede="Condensate leaves the coil almost perfectly pure — and almost undrinkable. Everything after the coil exists to turn it back into water you recognise."
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

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[62ch] font-mono text-[0.72rem] leading-relaxed text-navy/45">
              Output varies with temperature and humidity. Try the yield
              instrument on the home page to see how much, then verify against
              GENAQ&rsquo;s published performance data before quoting.
            </p>
          </Reveal>
        </div>
      </section>

      <WaveDivider from="var(--surface-raised)" to="var(--surface-field)" />

      <CTABand
        heading="Want the numbers for your site?"
        sub="Give us your location and daily requirement. We'll model output across the year before recommending anything."
        cta="Request a consultation"
      />
    </>
  );
}
