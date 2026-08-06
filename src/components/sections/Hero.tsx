"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitText from "@/components/reactbits/SplitText";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";
import { HeroCanvas } from "@/components/water/HeroCanvas";
import { SplineRobot } from "@/components/interactive/SplineRobot";

export function Hero() {
  const reduce = useReducedMotion();

  /**
   * SplitText sets each word to opacity 0 and animates it back with GSAP,
   * which respects neither reduced motion nor a tab that never gets frames.
   * Only hand it the headline once we know it can finish the job; otherwise
   * the line renders as plain, visible text.
   */
  const [canSplit, setCanSplit] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const check = () => {
      if (!document.hidden) setCanSplit(true);
    };
    const initial = window.setTimeout(check, 0);
    document.addEventListener("visibilitychange", check);
    return () => {
      window.clearTimeout(initial);
      document.removeEventListener("visibilitychange", check);
    };
  }, [reduce]);

  return (
    // Content keeps the sky; the water gets the bottom of the frame.
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-[34vh] pt-32 sm:pb-[36vh]">
      {/* Sky above the waterline */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 88% at 18% 4%, #ffffff 0%, #f5fafb 42%, #e8f3f5 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>

      {/* The robot sits to the right of the copy, above the water and behind
          the text. A Spline scene fills whatever canvas it is given, so the
          box has to be roughly square or the framing crops to the head.
          Desktop only: on narrower screens the headline needs the full frame. */}
      <SplineRobot className="pointer-events-none absolute -right-[3%] top-[6%] -z-[5] hidden aspect-square w-[68%] max-w-[920px] opacity-90 lg:block" />

      {/* Text lets the pointer through so the water reacts across the whole
          hero; only the controls take clicks back. */}
      <div className="shell pointer-events-none relative [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        <div className="max-w-[52rem]">
          <div className="hero-rise" style={{ animationDelay: "0.15s" }}>
            <Eyebrow>Exclusive GENAQ partner in Pakistan</Eyebrow>
          </div>

          <h1 className="mt-6 text-[clamp(2.6rem,7.2vw,5.4rem)] leading-[0.98]">
            {canSplit ? (
              <SplitText
                tag="span"
                text="We turn Pakistan's air into"
                className="block text-navy"
                textAlign="left"
                splitType="words"
                delay={38}
                duration={1}
                from={{ opacity: 0, y: 34 }}
                to={{ opacity: 1, y: 0 }}
                rootMargin="0px"
                threshold={0}
              />
            ) : (
              <span className="block text-navy">
                We turn Pakistan&rsquo;s air into
              </span>
            )}
            {/* Not split: background-clip:text has to span the whole line for
                the gradient to read as one body of water. */}
            <span
              className="hero-rise block"
              style={{ animationDelay: "0.62s" }}
            >
              <span className="text-teal">pure drinking water.</span>
            </span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-[46rem] text-[1.06rem] leading-[1.72] text-navy/70 sm:text-[1.14rem]"
            style={{ animationDelay: "0.85s" }}
          >
            VidaTech&rsquo;s atmospheric water generators pull clean,
            mineral-balanced drinking water straight from humidity. Off-grid,
            sustainable, and free from the contaminants that plague groundwater.
            If there&rsquo;s moisture in the air, there&rsquo;s water on your
            table.
          </p>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "1s" }}
          >
            <ButtonLink href="/contact" size="lg">
              Request a consultation <Arrow />
            </ButtonLink>
            <ButtonLink href="/technology" variant="ghost" size="lg">
              See how it works
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Scroll cue — a drop falling toward the water */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-navy/40">
          Scroll
        </span>
        <span className="relative block h-10 w-px bg-gradient-to-b from-transparent via-teal/40 to-transparent">
          <span
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-teal"
            style={{ animation: "drop 2.4s cubic-bezier(0.4,0,0.6,1) infinite" }}
          />
        </span>
        <style>{`@keyframes drop { 0% { top: 0; opacity: 0 } 22% { opacity: 1 } 78% { opacity: 1 } 100% { top: 100%; opacity: 0 } }`}</style>
      </motion.div>
    </section>
  );
}
