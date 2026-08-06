"use client";

import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { YieldInstrument } from "@/components/interactive/YieldInstrument";
import { SectionAtmosphere, Survey } from "@/components/atmosphere/Atmosphere";

/**
 * The instrument's home on the page.
 *
 * Kept deliberately plain around it — the instrument is the loudest thing on
 * the site and everything adjacent should get out of its way.
 */
export function YieldSection() {
  return (
    <section className="section-y relative overflow-hidden" id="yield">
      <div className="absolute inset-0 -z-20 surface-field-2" aria-hidden="true" />
      <SectionAtmosphere lights="deep" />
      <Survey className="opacity-60" spacing={104} />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="Try it"
            title={
              <>
                Output follows the weather.{" "}
                <span className="text-teal">Move it and see.</span>
              </>
            }
            lede="Every capacity figure assumes a temperature and a humidity. Drag both and watch what happens to the curve. This is the honest version of a spec sheet, and the reason we size units against your difficult months rather than your average ones."
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12">
            <YieldInstrument />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
