import { Eyebrow } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

/**
 * Interior page opener. Quieter than the home hero by design — one still
 * waterline at the base instead of a live surface, so the depth stays where
 * the content is.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pb-20 pt-40 sm:pb-24 sm:pt-44",
        className
      )}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(110% 80% at 12% 0%, #ffffff 0%, #f5fafb 45%, #e8f3f5 100%)",
        }}
        aria-hidden="true"
      />
      <svg
        className="absolute inset-x-0 bottom-0 -z-10 h-24 w-[200%] text-blue/25"
        style={{ animation: "drift 24s linear infinite" }}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 58 C 200 24 300 86 500 56 C 700 26 800 82 1000 54 C 1100 40 1150 48 1200 44 L1200 100 L0 100 Z M1200 58 C 1400 24 1500 86 1700 56 C 1900 26 2000 82 2200 54 C 2300 40 2350 48 2400 44 L2400 100 L1200 100 Z"
          fill="currentColor"
        />
      </svg>

      <div className="shell relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[18ch] text-[clamp(2.4rem,5.6vw,4.4rem)] text-navy">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-[58ch] text-[1.04rem] leading-[1.74] text-navy/68">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
