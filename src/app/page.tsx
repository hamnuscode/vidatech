import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { ValueProps } from "@/components/sections/ValueProps";
import { ProductsOverview } from "@/components/sections/ProductsOverview";
import { Applications } from "@/components/sections/Applications";
import { Partner } from "@/components/sections/Partner";
import { Certifications } from "@/components/sections/Certifications";
import { CTABand } from "@/components/sections/CTABand";
import { WaveDivider } from "@/components/water/WaveDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <WaveDivider from="transparent" to="var(--color-blue-50)" />
      <Problem />
      <WaveDivider from="var(--color-blue-50)" to="var(--color-paper)" />
      <Process />
      <ValueProps />
      <WaveDivider from="var(--color-paper)" to="var(--color-blue-50)" />
      <ProductsOverview />
      <WaveDivider from="var(--color-blue-50)" to="var(--color-paper)" />
      <Applications />
      <WaveDivider from="var(--color-paper)" to="var(--color-blue-50)" />
      <Partner />
      <WaveDivider from="var(--color-blue-50)" to="var(--color-paper)" />
      <Certifications />
      <CTABand />
    </>
  );
}
