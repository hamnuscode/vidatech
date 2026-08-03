"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Primitives";
import { LogoMarquee } from "@/components/reactbits/logo-marquee";

/**
 * Credentials strip, /about only.
 *
 * Third-party marks each carry their own visual identity, so they get one
 * frosted surface to share rather than five competing logo backgrounds on the
 * page. Motion comes from the 21st.dev marquee — it pauses on hover and on
 * keyboard focus, and holds still under reduced motion.
 */
const CERTIFICATIONS = [
  {
    id: "ec",
    src: "/certifications/european-commission.jpg",
    label: "European Commission Seal of Excellence",
  },
  { id: "iso", src: "/certifications/sgs-iso.jpg", label: "ISO 9001" },
  {
    id: "eu",
    src: "/certifications/european-union.jpg",
    label: "EU Drinking Water Directive",
  },
  { id: "ce", src: "/certifications/ce.jpg", label: "CE Declaration of Conformity" },
  {
    id: "climate",
    src: "/certifications/climate-chamber.jpg",
    label: "Tested in European climate chamber",
  },
];

export function Certifications() {
  const items = CERTIFICATIONS.map((c) => ({
    id: c.id,
    label: c.label,
    mark: (
      <span className="flex items-center gap-3">
        {/* Eager: the marquee duplicates its track inside a clipped viewport,
            so the copies never intersect and lazy loading never fires. Five
            small marks are cheap to load up front. */}
        <Image
          src={c.src}
          alt=""
          width={200}
          height={140}
          sizes="120px"
          loading="eager"
          className="h-14 w-auto object-contain mix-blend-multiply"
        />
        <span className="max-w-[13ch] whitespace-normal text-left font-display text-[0.78rem] font-semibold leading-tight text-navy/75">
          {c.label}
        </span>
      </span>
    ),
  }));

  return (
    <section className="relative pb-6">
      <div className="shell">
        <Reveal>
          <div className="glass-strong overflow-hidden rounded-[2rem] px-2 py-7 sm:px-4">
            <p className="mb-5 text-center font-mono text-[0.66rem] uppercase tracking-[0.2em] text-navy/50">
              GENAQ technology, independently certified
            </p>
            <LogoMarquee
              items={items}
              label="Certifications and approvals"
              speed={26}
              gap={28}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
