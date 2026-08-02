"use client";

import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { APPLICATIONS } from "@/lib/site";

export function Applications() {
  return (
    <section className="section-y" id="applications">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Who it's for"
              title="Anywhere the air is humid and the water isn't."
              lede="The technology does not care whether it is supplying a kitchen or a field hospital. What changes is the unit, the siting, and the service plan."
            />
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="grid gap-px overflow-hidden rounded-3xl border border-blue/30 bg-blue/25 sm:grid-cols-2">
              {APPLICATIONS.map((app, i) => (
                <Reveal
                  as="li"
                  key={app.title}
                  delay={i * 0.04}
                  className="group relative bg-paper px-6 py-7 transition-colors duration-500 hover:bg-blue-50"
                >
                  <div className="flex items-start gap-4">
                    {/* Level rises across the list — the deployments get bigger */}
                    <span
                      className="mt-1.5 block h-9 w-1 shrink-0 overflow-hidden rounded-full bg-blue/30"
                      aria-hidden="true"
                    >
                      <span
                        className="block w-full origin-bottom rounded-full transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          height: `${28 + (i / (APPLICATIONS.length - 1)) * 72}%`,
                          marginTop: `${72 - (i / (APPLICATIONS.length - 1)) * 72}%`,
                          background: "var(--grad-water-v)",
                        }}
                      />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.02rem] font-bold text-navy">
                        {app.title}
                      </h3>
                      <p className="mt-1.5 text-[0.89rem] leading-[1.7] text-navy/60">
                        {app.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
