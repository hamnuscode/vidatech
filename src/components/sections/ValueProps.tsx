"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";
import { VALUE_PROPS } from "@/lib/site";

/** One glyph per claim, drawn from the subject's own vocabulary. */
const GLYPHS: Record<string, React.ReactNode> = {
  "Sustainable by design": (
    <>
      <circle cx="16" cy="18" r="9" />
      <path d="M16 9c4 4 4 10 0 14-4-4-4-10 0-14Z" />
    </>
  ),
  "Independent & off-grid": (
    <>
      <path d="M6 24h20" />
      <path d="M16 24V9" />
      <path d="M10 15l6-6 6 6" />
    </>
  ),
  "Genuinely pure": (
    <>
      <path d="M16 5c5 6 8 10 8 14a8 8 0 1 1-16 0c0-4 3-8 8-14Z" />
      <path d="M12 20l3 3 5-6" />
    </>
  ),
  "Backed by GENAQ": (
    <>
      <circle cx="16" cy="16" r="10" />
      <path d="M6 16h20" />
      <path d="M16 6c3 3 4.5 6.5 4.5 10S19 23 16 26c-3-3-4.5-6.5-4.5-10S13 9 16 6Z" />
    </>
  ),
};

export function ValueProps() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="absolute inset-0 -z-20 surface-field" aria-hidden="true" />
      <SectionAtmosphere lights="corner" caustics={false} />
      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why VidaTech"
            title="Four reasons this works where wells don't."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((prop, i) => (
            <Reveal key={prop.title} delay={i * 0.07}>
              <SpotlightCard
                spotlightColor="rgba(7, 144, 163, 0.14)"
                className="group h-full rounded-3xl border border-blue/28 bg-white p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-teal/35 hover:shadow-[0_24px_50px_-26px_rgba(9,33,64,0.3)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-white">
                  <svg
                    viewBox="0 0 32 32"
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {GLYPHS[prop.title]}
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-[1.14rem] font-bold text-navy">
                  {prop.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-[1.72] text-navy/65">
                  {prop.body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
