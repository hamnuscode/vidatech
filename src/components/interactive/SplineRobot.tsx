"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * The Spline robot, tinted to GENAQ blue and silver.
 *
 * The scene itself is a hosted asset, so its materials cannot be edited from
 * here. The tint is a CSS filter stack instead: desaturate the original
 * colours toward silver, then rotate what remains into the brand's blue. It is
 * an approximation, and the only one available without opening the scene in
 * Spline itself.
 *
 * ── Timing ───────────────────────────────────────────────────────────────
 * The scene opens with its own camera move, zooming out from a close-up of the
 * head. Left alone that plays *after* the loader lifts, so the first thing a
 * visitor sees is the robot lurching backwards.
 *
 * So the download starts immediately on mount — while the loader is still
 * covering the page — and the canvas is held at zero opacity until the scene
 * has loaded *and* its intro has had time to run. It then fades in already
 * settled. On a fast connection it is simply there when the loader lifts; on a
 * slow one it arrives a moment later, which is still better than showing the
 * zoom.
 */

const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/** How long the scene's opening camera move needs after load, in ms. */
const INTRO_SETTLE = 2600;

export function SplineRobot({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [allowed, setAllowed] = useState(false);
  const [settled, setSettled] = useState(false);
  const settleTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduce) return;

    const cores = navigator.hardwareConcurrency ?? 4;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    // A multi-megabyte 3D scene is not worth it on a low-core phone or a
    // metered connection.
    if (cores <= 4 || saveData) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    // No idle gate: the whole point is to be downloading behind the loader.
    const id = window.setTimeout(() => setAllowed(true), 0);
    return () => window.clearTimeout(id);
  }, [reduce]);

  useEffect(
    () => () => {
      window.clearTimeout(settleTimer.current);
    },
    []
  );

  if (!allowed) return null;

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        // Blue and silver: strip the original hue almost to metal, push the
        // remainder toward the brand teal-blue, and lift brightness so it
        // reads on a light background.
        filter:
          "grayscale(0.62) sepia(0.35) hue-rotate(158deg) saturate(2.1) brightness(1.06) contrast(0.96)",
        // The canvas is a hard-edged rectangle, weighted to the upper body so
        // the head and torso carry the frame and the legs fade out rather than
        // being cut off.
        maskImage:
          "radial-gradient(56% 46% at 50% 40%, #000 40%, transparent 92%)",
        WebkitMaskImage:
          "radial-gradient(56% 46% at 50% 40%, #000 40%, transparent 92%)",
        // Hidden until the opening camera move is done, then faded in.
        opacity: settled ? 1 : 0,
        transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <Suspense fallback={null}>
        <Spline
          scene={SCENE}
          style={{ width: "100%", height: "100%" }}
          onLoad={() => {
            settleTimer.current = window.setTimeout(
              () => setSettled(true),
              INTRO_SETTLE
            );
          }}
        />
      </Suspense>
    </div>
  );
}
