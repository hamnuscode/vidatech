"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/brand/Logo";

/**
 * First-load sequence: water rises through the mark, then drains upward to
 * reveal the hero. Same waterline language as the rest of the site, at full
 * screen scale — this is where the reader learns to read it.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (reduce) {
      // Nothing renders in this case anyway — just publish the flag.
      document.body.dataset.loaded = "true";
      return;
    }

    const start = performance.now();
    const DURATION = 1900;
    let frame = 0;

    const finish = () => {
      setLevel(1);
      setDone(true);
      document.body.dataset.loaded = "true";
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // Ease-out so the fill decelerates as it tops up
      setLevel(1 - Math.pow(1 - t, 2.2));
      if (t < 1) frame = requestAnimationFrame(tick);
      else finish();
    };

    frame = requestAnimationFrame(tick);

    // Animation frames stop in a background tab, and so does the exit
    // transition — never leave the page behind a loader waiting on frames that
    // will not arrive. Time out, and give up entirely if the tab goes hidden.
    const failsafe = window.setTimeout(finish, DURATION + 400);
    // A hidden tab gets no frames, so the exit transition would never play
    // either — drop the overlay outright rather than animate it away.
    const onHidden = () => {
      if (document.hidden) {
        setSkip(true);
        finish();
      }
    };
    document.addEventListener("visibilitychange", onHidden);
    // Timers still run in a hidden tab, unlike animation frames.
    const initialCheck = window.setTimeout(onHidden, 0);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(failsafe);
      window.clearTimeout(initialCheck);
      document.removeEventListener("visibilitychange", onHidden);
    };
  }, [reduce]);

  if (reduce || skip) return null;

  const surface = 100 - level * 100;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading VidaTech"
        >
          <div className="relative h-32 w-32 sm:h-40 sm:w-40">
            {/* Empty mark, faint */}
            <div className="absolute inset-0 opacity-15 grayscale">
              <LogoMark />
            </div>

            {/* The same mark, revealed only below the waterline */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(${surface}% 0 0 0)`,
                transition: "clip-path 60ms linear",
              }}
            >
              <LogoMark />
            </div>

            {/* Travelling surface line */}
            <svg
              className="pointer-events-none absolute inset-x-0 h-3"
              style={{ top: `calc(${surface}% - 6px)` }}
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <g style={{ animation: "drift 2.4s linear infinite" }}>
                <path
                  d="M0 6 q 12.5 -4 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0"
                  fill="none"
                  stroke="url(#loader-grad)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
              <defs>
                <linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0790a3" />
                  <stop offset="55%" stopColor="#4bb6c4" />
                  <stop offset="100%" stopColor="#82aeba" />
                </linearGradient>
              </defs>
            </svg>

            {/* Bubbles rising through the fill */}
            {[
              { left: "34%", delay: "0.2s", size: 4, dur: "1.9s" },
              { left: "58%", delay: "0.8s", size: 3, dur: "2.3s" },
              { left: "46%", delay: "1.3s", size: 5, dur: "2.1s" },
            ].map((b) => (
              <span
                key={b.left}
                className="absolute bottom-2 rounded-full bg-teal/35"
                style={{
                  left: b.left,
                  width: b.size,
                  height: b.size,
                  animation: `rise ${b.dur} ${b.delay} ease-in infinite`,
                }}
              />
            ))}
          </div>

          {/* Slim progress line, no percentage */}
          <div className="mt-10 h-px w-40 overflow-hidden bg-navy/10">
            <div
              className="h-full origin-left"
              style={{
                background: "var(--grad-water)",
                transform: `scaleX(${level})`,
              }}
            />
          </div>
          <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-navy/45">
            Drawing water from air
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
