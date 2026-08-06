import type { Metadata } from "next";
import { Partner } from "@/components/sections/Partner";
import { Certifications } from "@/components/sections/Certifications";
import { Applications } from "@/components/sections/Applications";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";
import { WaveDivider } from "@/components/water/WaveDivider";

export const metadata: Metadata = {
  title: "About",
  description:
    "VidaTech is the exclusive Pakistani partner of GENAQ, the Spanish pioneer engineering atmospheric water generators since 2008 and trusted in over 35 countries.",
};

const PILLARS = [
  {
    kind: "Mission",
    body: "Help solve Pakistan's water challenge with technology that is sustainable, reliable, and built for local conditions.",
  },
  {
    kind: "Vision",
    body: "A country where water security does not depend on a well still reaching, a pipeline still holding, or a tanker turning up.",
  },
  {
    kind: "Values",
    body: "Specify honestly, install properly, and stand behind it. We would rather quote a larger unit than a figure that only holds in July.",
  },
];

/** A real sequence: each entry depends on the one before it. */
const TIMELINE = [
  {
    year: "2008",
    title: "GENAQ begins",
    body: "Engineering on atmospheric water generation starts in Spain, aimed at making condensation efficient enough to matter at volume.",
  },
  {
    year: "2010s",
    title: "Proven across climates",
    body: "Units deploy into humanitarian, industrial, and military settings across a wide spread of temperature and humidity.",
  },
  {
    year: "Today",
    title: "35+ countries, five continents",
    body: "The range covers everything from a household dispenser to a containerised emergency unit, with one process behind all of it.",
  },
  {
    year: "Now",
    title: "VidaTech in Pakistan",
    body: "Exclusive local partnership: specification against Pakistani conditions, installation, service, and parts held in-country.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40 sm:pt-44">
        <div className="absolute inset-0 -z-20 surface-field" aria-hidden="true" />
        <SectionAtmosphere lights="corner" />

        <div className="shell relative">
          <Eyebrow>About VidaTech</Eyebrow>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.4rem)] text-navy">
            Local roots. <span className="text-teal">Global technology.</span>
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1.04rem] leading-[1.74] text-navy/68">
            VidaTech is the exclusive Pakistani partner of GENAQ, the Spanish
            pioneer that has been engineering atmospheric water generators since
            2008 and is now trusted in more than 35 countries across five continents.
            From homes and offices to industry, agriculture, and emergency
            response, we bring water security within reach.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-blue/30 bg-blue/25 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.kind}
                delay={i * 0.08}
                className="bg-white/85 p-8 transition-colors duration-500 hover:bg-white"
              >
                <Eyebrow>{p.kind}</Eyebrow>
                <p className="mt-5 text-[1rem] leading-[1.75] text-navy/72">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="var(--surface-field)" to="var(--surface-raised)" />

      <section className="section-y relative overflow-hidden">
        <div className="absolute inset-0 -z-20 surface-raised" aria-hidden="true" />
        <SectionAtmosphere lights="wide" caustics={false} />

        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="How we got here"
              title="Seventeen years of engineering, delivered locally."
            />
          </Reveal>

          <ol className="mt-14 grid gap-8 md:grid-cols-4 md:gap-5">
            {TIMELINE.map((entry, i) => (
              <Reveal as="li" key={entry.year} delay={i * 0.08}>
                <div className="group flex h-full flex-col">
                  <div
                    className="h-1 w-full overflow-hidden rounded-full bg-blue/30"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        width: `${((i + 1) / TIMELINE.length) * 100}%`,
                        background: "var(--grad-water)",
                      }}
                    />
                  </div>
                  <span className="tnum mt-5 font-mono text-[0.8rem] uppercase tracking-[0.16em] text-teal">
                    {entry.year}
                  </span>
                  <h3 className="mt-2 font-display text-[1.15rem] font-bold text-navy">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-[0.91rem] leading-[1.72] text-navy/62">
                    {entry.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Partner />

      <Certifications />

      <WaveDivider from="var(--surface-field)" to="var(--surface-raised)" />

      <Applications />

      <WaveDivider from="var(--surface-raised)" to="var(--surface-field)" />

      <CTABand
        heading="Bring water security within reach"
        sub="Whether it's a household, a hospital, or a housing scheme, tell us the requirement and we'll specify against your conditions."
        cta="Talk to VidaTech"
      />
    </>
  );
}
