import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * VidaTech identity, matted off the supplied artwork.
 *
 * Two variants ship: the original lockup for light grounds, and one for the
 * navy footer where the monogram is lifted and the wordmark is cut as a white
 * silhouette. Sizing is driven by height — set `h-*` on the wrapper and the
 * width follows the artwork's own ratio.
 */

const LOCKUP_RATIO = 635 / 248;

export function LogoMark({
  className,
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "white";
}) {
  return (
    <Image
      src={tone === "white" ? "/vidatech-mark-onnavy.png" : "/vidatech-mark.png"}
      alt=""
      width={248}
      height={248}
      priority
      className={cn("h-full w-auto object-contain", className)}
    />
  );
}

export function Logo({
  className,
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "white";
}) {
  return (
    <span className={cn("inline-flex h-full items-center", className)}>
      <Image
        src={
          tone === "white"
            ? "/vidatech-lockup-onnavy.png"
            : "/vidatech-lockup.png"
        }
        alt="VidaTech"
        width={635}
        height={248}
        priority
        className="h-full w-auto object-contain"
        style={{ aspectRatio: LOCKUP_RATIO }}
      />
    </span>
  );
}
