import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { YieldSection } from "@/components/sections/YieldSection";
import { ValueProps } from "@/components/sections/ValueProps";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { CTABand } from "@/components/sections/CTABand";
import { WaveDivider } from "@/components/water/WaveDivider";

/**
 * Home answers one question: how much water would I actually get?
 *
 * The five-step process lives on /technology, applications and the GENAQ
 * partnership on /about, the full catalogue on /products. Nothing here is
 * repeated on another page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WaveDivider from="transparent" to="var(--surface-field)" />
      <Problem />
      <YieldSection />
      <ValueProps />
      <WaveDivider from="var(--surface-field)" to="var(--surface-raised)" />
      <ProductsOverview />
      <WaveDivider from="var(--surface-raised)" to="var(--surface-field)" />
      <CTABand
        heading="Ready to make water from air?"
        sub="Tell us your daily requirement and your location and we'll recommend the right generator and show you what it produces across the year."
        cta="Get a free assessment"
      />
    </>
  );
}
