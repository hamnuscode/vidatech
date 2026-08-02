"use client";

import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Primitives";
import Waves from "@/components/reactbits/Waves";

/**
 * The repeating ask. Navy panel, gold button, and a live wave field behind it
 * that answers the cursor — the one place the CTA itself is made of water.
 */
export function CTABand({
  heading = "Ready to make water from air?",
  sub = "Tell us your daily water needs and location — we'll recommend the right generator.",
  cta = "Get a free assessment",
  href = "/contact",
}: {
  heading?: string;
  sub?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="section-y">
      <div className="shell">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy px-7 py-16 sm:px-14 sm:py-20">
            <div className="absolute inset-0 opacity-45" aria-hidden="true">
              <Waves
                lineColor="rgba(130,174,186,0.42)"
                backgroundColor="transparent"
                waveAmpX={26}
                waveAmpY={11}
                xGap={14}
                yGap={38}
                waveSpeedX={0.008}
                waveSpeedY={0.004}
                maxCursorMove={70}
              />
            </div>
            <div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(249,179,65,0.32) 0%, rgba(249,179,65,0) 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-start gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="max-w-[16ch] text-[clamp(1.9rem,4vw,3rem)] text-white">
                  {heading}
                </h2>
                <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-[1.72] text-blue-300">
                  {sub}
                </p>
              </div>
              <ButtonLink href={href} variant="gold" size="lg" className="shrink-0">
                {cta} <Arrow />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
