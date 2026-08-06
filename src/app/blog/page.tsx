import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { CTABand } from "@/components/sections/CTABand";
import { WaveDivider } from "@/components/water/WaveDivider";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Water scarcity, atmospheric water technology, sustainability, and deployment case studies from VidaTech, GENAQ's exclusive partner in Pakistan.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes on water, and{" "}
            <span className="text-teal">where it comes from.</span>
          </>
        }
        lede="Writing about atmospheric water generation with the working shown, including the limits. Water scarcity, the technology itself, sustainability arithmetic, and what we learn on deployments."
        className="pb-10 sm:pb-12"
      />
      <BlogGrid />
      <WaveDivider from="var(--color-paper)" to="var(--color-paper)" />
      <CTABand
        heading="Have a water problem worth writing about?"
        sub="Tell us your daily requirement and location and we'll recommend the right generator."
      />
    </>
  );
}
