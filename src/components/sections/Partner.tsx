"use client";

import CountUp from "@/components/reactbits/CountUp";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { SectionAtmosphere } from "@/components/atmosphere/Atmosphere";

/**
 * A year is a label, not a quantity — 2008 counting up from zero would be a
 * number pretending to be a measurement. Only the counts animate.
 */
const CREDENTIALS: {
  label: string;
  to?: number;
  suffix?: string;
  fixed?: string;
}[] = [
  { fixed: "2008", label: "Engineering AWGs since" },
  { to: 35, suffix: "+", label: "Countries in service" },
  { to: 5, label: "Continents covered" },
];

export function Partner() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="absolute inset-0 -z-20 surface-field" aria-hidden="true" />
      <SectionAtmosphere lights="deep" />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>The partnership</Eyebrow>
            <blockquote className="mt-6">
              <p className="font-display text-[clamp(1.4rem,2.8vw,2rem)] font-semibold leading-[1.28] tracking-[-0.03em] text-navy">
                &ldquo;The technology has been proven across a wide range of
                climates. What has been missing in Pakistan is someone to
                specify it correctly for local conditions{" "}
                <span className="text-teal">
                  and stand behind it afterwards.
                </span>
                &rdquo;
              </p>
              <footer className="mt-6 font-mono text-[0.76rem] uppercase tracking-[0.16em] text-navy/55">
                VidaTech — on becoming GENAQ&rsquo;s exclusive Pakistan partner
              </footer>
            </blockquote>
          </Reveal>

          <div className="lg:col-span-7">
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-blue/30 bg-blue/25 sm:grid-cols-3">
              {CREDENTIALS.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08} className="bg-white/85 px-6 py-9">
                  <dt className="font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.16em] text-navy/55">
                    {c.label}
                  </dt>
                  <dd className="tnum mt-3 font-display text-[2.4rem] font-bold leading-none text-navy">
                    {c.fixed ?? <CountUp to={c.to!} duration={1.8} />}
                    {c.suffix}
                  </dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[54ch] text-[0.94rem] leading-[1.75] text-navy/62">
                GENAQ has been engineering atmospheric water generators in Spain
                since 2008. VidaTech brings the local half: sizing units against
                Pakistani humidity and temperature, installing them, and holding
                parts in-country so a filter change is not an import.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
