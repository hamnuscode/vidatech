"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { PROCESS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The five steps.
 *
 * This is the one place on the site where numbering earns its keep: the order
 * is the process, and step four cannot happen before step three. The connecting
 * pipe fills with water as you scroll, so reading position and process position
 * are the same thing.
 */
export function Process({ detailed = false }: { detailed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 62%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-y relative overflow-hidden" id="how-it-works">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From air to glass, in five{" "}
                <span className="text-teal">clean steps.</span>
              </>
            }
            lede="Condensing water from air is not difficult. Doing it efficiently, at volume, and producing something you would want to drink is the engineering."
          />
        </Reveal>

        <div ref={ref} className="relative mt-16 md:mt-20">
          {/* The pipe. Vertical on mobile, horizontal from md up. */}
          <div
            className="absolute left-[27px] top-2 hidden h-[calc(100%-1rem)] w-[3px] overflow-hidden rounded-full bg-blue/25 max-md:block"
            aria-hidden="true"
          >
            <motion.div
              className="w-full origin-top rounded-full"
              style={{
                height: reduce ? "100%" : fill,
                background: "var(--grad-water-v)",
              }}
            />
          </div>
          <div
            className="absolute left-0 top-[27px] hidden h-[3px] w-full overflow-hidden rounded-full bg-blue/25 md:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: reduce ? "100%" : fill,
                background: "var(--grad-water)",
              }}
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {PROCESS.map((item, i) => (
              <Reveal as="li" key={item.step} delay={i * 0.07}>
                <div className="flex gap-5 md:block">
                  <StepMarker index={i} />
                  <div className="md:mt-6">
                    <h3 className="font-display text-[1.22rem] font-bold text-navy">
                      {item.step}
                    </h3>
                    <p className="mt-2.5 text-[0.92rem] leading-[1.7] text-navy/65">
                      {item.body}
                    </p>
                    {detailed && (
                      <p className="mt-3 border-l-2 border-blue/40 pl-4 text-[0.87rem] leading-[1.7] text-navy/55">
                        {item.detail}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[58ch] text-[0.95rem] leading-[1.75] text-navy/60">
              Condensate leaves the coil almost perfectly pure — and almost
              undrinkable. The mineral stage is what turns it back into water
              you recognise, held at{" "}
              <span className="font-mono text-navy">pH 7</span>.
            </p>
            {!detailed && (
              <ButtonLink href="/technology" variant="ghost" className="shrink-0">
                Read the full process <Arrow />
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Each marker is a vessel filled to its position in the sequence. */
function StepMarker({ index }: { index: number }) {
  const level = (index + 1) / 5;
  return (
    <div className="relative z-10 shrink-0">
      <div
        className={cn(
          "relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border-2 border-white bg-blue-50",
          "shadow-[0_6px_18px_-8px_rgba(9,33,64,0.35)]"
        )}
      >
        <span
          className="absolute inset-x-0 bottom-0"
          style={{
            height: `${level * 100}%`,
            background: "var(--grad-water-v)",
            opacity: 0.9,
          }}
          aria-hidden="true"
        />
        <span className="relative z-10 font-mono text-[0.95rem] font-medium text-navy mix-blend-multiply">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
