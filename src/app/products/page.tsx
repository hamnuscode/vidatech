import type { Metadata } from "next";
import { RangeLadder } from "@/components/interactive/RangeLadder";
import { ProductBento } from "@/components/sections/ProductBento";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Primitives";
import { SectionAtmosphere, Survey } from "@/components/atmosphere/Atmosphere";
import { WaveDivider } from "@/components/water/WaveDivider";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Eight atmospheric water generators, from a 50 L/day home dispenser to a 5,000 L/day containerised unit — laid out on one capacity scale so the range reads as a range.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-40 sm:pt-44">
        <div className="absolute inset-0 -z-10 surface-field" aria-hidden="true" />
        <SectionAtmosphere lights="corner" survey />
        <Survey className="opacity-70" />

        <div className="shell relative">
          <Eyebrow>Products</Eyebrow>
          <h1 className="mt-6 max-w-[17ch] text-[clamp(2.4rem,5.6vw,4.4rem)] text-navy">
            Two orders of magnitude,{" "}
            <span className="text-teal">one process.</span>
          </h1>
          <p className="mt-6 max-w-[56ch] text-[1.04rem] leading-[1.74] text-navy/68">
            Every model condenses water the same way. What separates a kitchen
            dispenser from a containerised field unit is how much it makes and
            what it has to survive — which is easier to see on a scale than in a
            list.
          </p>

          <div className="mt-14">
            <RangeLadder />
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="absolute inset-0 -z-10 surface-field" aria-hidden="true" />
        <div className="shell relative">
          <ProductBento />
        </div>
      </section>

      <WaveDivider from="var(--surface-field)" to="var(--surface-raised)" />

      <CTABand
        heading="Not sure which unit fits?"
        sub="Send your daily requirement, your location, and the power available on site. We'll come back with a specification, not a brochure."
        cta="Get a free assessment"
      />
    </>
  );
}
