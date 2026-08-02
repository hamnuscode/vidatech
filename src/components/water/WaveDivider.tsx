import { cn } from "@/lib/utils";

/**
 * Section boundary. Two wave layers drifting at different rates — the parallax
 * reads as depth rather than as a decorative squiggle.
 *
 * `from` is the colour above the divider, `to` the colour below.
 */
export function WaveDivider({
  from = "transparent",
  to = "var(--color-blue-50)",
  flip = false,
  className,
}: {
  from?: string;
  to?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative h-16 w-full overflow-hidden sm:h-24", className)}
      style={{ background: from }}
      aria-hidden="true"
    >
      <div
        className={cn("absolute inset-0", flip && "scale-y-[-1]")}
        style={{ background: from }}
      >
        {/* Back wave — slower, and faint enough that it reads as depth rather
            than as a second colour sitting on the page */}
        <svg
          className="absolute inset-x-0 bottom-0 h-full w-[200%] opacity-25"
          style={{ animation: "drift 26s linear infinite", color: to }}
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 62 C 150 20 250 92 400 58 C 550 24 650 88 800 56 C 950 24 1050 84 1200 54 L1200 100 L0 100 Z M1200 62 C 1350 20 1450 92 1600 58 C 1750 24 1850 88 2000 56 C 2150 24 2250 84 2400 54 L2400 100 L1200 100 Z"
            fill="currentColor"
          />
        </svg>
        {/* Front wave — carries the actual colour change */}
        <svg
          className="absolute inset-x-0 bottom-0 h-full w-[200%]"
          style={{ animation: "drift 18s linear infinite", color: to }}
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 76 C 180 44 280 100 450 74 C 620 48 700 96 880 72 C 1040 50 1100 88 1200 74 L1200 100 L0 100 Z M1200 76 C 1380 44 1480 100 1650 74 C 1820 48 1900 96 2080 72 C 2240 50 2300 88 2400 74 L2400 100 L1200 100 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
