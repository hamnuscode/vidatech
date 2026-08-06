"use client";

import { Suspense, lazy, useEffect, useState } from "react";
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
 * Gated like the water scene: it costs several megabytes over the network, so
 * it waits for an idle browser on a capable device and never loads at all when
 * motion is unwelcome.
 */

const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function SplineRobot({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

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

    const id =
      window.requestIdleCallback?.(() => setReady(true), { timeout: 2600 }) ??
      window.setTimeout(() => setReady(true), 1400);

    return () => {
      window.cancelIdleCallback?.(id as number);
      window.clearTimeout(id as number);
    };
  }, [reduce]);

  if (!ready) return null;

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
        // The canvas is a hard-edged rectangle. Feather it so the figure
        // emerges from the page instead of sitting in a visible box.
        // Weighted to the upper body: the visible area is centred high in the
        // canvas so the head and torso carry the frame and the legs fade out
        // rather than being cut by a hard canvas edge.
        maskImage:
          "radial-gradient(56% 46% at 50% 40%, #000 40%, transparent 92%)",
        WebkitMaskImage:
          "radial-gradient(56% 46% at 50% 40%, #000 40%, transparent 92%)",
      }}
    >
      <Suspense fallback={null}>
        <Spline
          scene={SCENE}
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>
  );
}
