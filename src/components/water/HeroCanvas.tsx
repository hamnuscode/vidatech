"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { heroPointer, setHeroPointer } from "./heroPointer";

const HeroWater = dynamic(() => import("./HeroWater"), { ssr: false });

/**
 * Gate and input layer for the WebGL hero.
 *
 * The scene only mounts once the page is idle, on a device that can carry it,
 * and only when motion is welcome. Everything else gets the still version —
 * the same water, just not moving.
 *
 * This layer also captures the pointer for the whole hero, so the surface
 * answers the cursor even where the headline sits on top of it.
 */
export function HeroCanvas() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    // Skip WebGL on low-core devices and when the OS is saving data
    const cores = navigator.hardwareConcurrency ?? 4;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData === true;
    if (cores <= 3 || saveData) return;

    const id =
      window.requestIdleCallback?.(() => setReady(true), { timeout: 1600 }) ??
      window.setTimeout(() => setReady(true), 600);

    return () => {
      window.cancelIdleCallback?.(id as number);
      window.clearTimeout(id as number);
    };
  }, [reduce]);

  return (
    <div
      ref={layer}
      className="absolute inset-0"
      onPointerMove={(e) => {
        if (layer.current) setHeroPointer(layer.current, e.clientX, e.clientY);
      }}
      onPointerDown={(e) => {
        if (layer.current) setHeroPointer(layer.current, e.clientX, e.clientY);
        heroPointer.clickSeq += 1;
      }}
      onPointerLeave={() => {
        heroPointer.active = false;
      }}
      aria-hidden="true"
    >
      <StillWater />
      {ready && (
        <div className="absolute inset-0 animate-[hero-fade_1.2s_ease-out_forwards] opacity-0">
          <HeroWater />
        </div>
      )}
      <style>{`@keyframes hero-fade { to { opacity: 1 } }`}</style>
    </div>
  );
}

/** The fallback, and the first paint underneath the canvas. */
function StillWater() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background:
            "linear-gradient(to top, rgba(39,165,182,0.30) 0%, rgba(75,182,196,0.19) 40%, rgba(130,174,186,0.09) 72%, rgba(252,252,252,0) 100%)",
        }}
      />
      <svg
        className="absolute inset-x-0 bottom-[34%] h-20 w-[200%] text-teal/22"
        style={{ animation: "drift 22s linear infinite" }}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 C 200 26 300 88 500 58 C 700 28 800 84 1000 56 C 1100 42 1150 50 1200 46 M1200 60 C 1400 26 1500 88 1700 58 C 1900 28 2000 84 2200 56 C 2300 42 2350 50 2400 46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
