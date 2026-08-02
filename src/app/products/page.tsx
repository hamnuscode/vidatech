import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCatalogue } from "@/components/sections/ProductShowcase";
import { CTABand } from "@/components/sections/CTABand";
import { WaveDivider } from "@/components/water/WaveDivider";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Eight atmospheric water generators, from a 50 L/day home dispenser to a 5,000 L/day containerised emergency unit. Filter by range, output, and use case.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Eight ways to put water{" "}
            <span className="text-teal">where it isn&rsquo;t.</span>
          </>
        }
        lede="Every model runs the same five-step process. What changes is how much it produces and what it has to survive. Filter by range, output, or use case — or tell us your daily requirement and we'll size it for you."
        className="pb-12 sm:pb-14"
      />
      <ProductCatalogue />
      <WaveDivider from="var(--color-blue-50)" to="var(--color-paper)" />
      <CTABand
        heading="Not sure which unit fits?"
        sub="Send us your daily requirement, your location, and your available power. We'll come back with a specification, not a brochure."
        cta="Get a free assessment"
      />
    </>
  );
}
