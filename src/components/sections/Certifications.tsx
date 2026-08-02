"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Primitives";

/**
 * Credentials stripe. Third-party marks carry their own visual identity, so
 * the frosted panel gives them one shared surface to sit on instead of letting
 * five different logo backgrounds collide with the page.
 */
const CERTIFICATIONS = [
  {
    src: "/certifications/european-commission.jpg",
    label: "European Commission\nSeal of Excellence",
    alt: "European Commission Seal of Excellence",
  },
  {
    src: "/certifications/sgs-iso.jpg",
    label: "ISO 9001",
    alt: "SGS ISO 9001 system certification",
  },
  {
    src: "/certifications/european-union.jpg",
    label: "Water Quality",
    alt: "European Union drinking water directive",
  },
  {
    src: "/certifications/ce.jpg",
    label: "CE Declaration\nof Conformity",
    alt: "CE marking",
  },
  {
    src: "/certifications/climate-chamber.jpg",
    label: "European Tested\nin Climate Chamber",
    alt: "Climate chamber testing facility",
  },
];

export function Certifications() {
  return (
    <section className="relative pb-4">
      <div className="shell">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[2rem] px-6 py-9 sm:px-10">
            <p className="relative text-center font-mono text-[0.66rem] uppercase tracking-[0.2em] text-navy/55">
              GENAQ technology, independently certified
            </p>

            <ul className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
              {CERTIFICATIONS.map((cert) => (
                <li
                  key={cert.src}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <span className="flex h-20 items-center justify-center">
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      width={220}
                      height={160}
                      sizes="160px"
                      className="h-full w-auto max-w-full object-contain mix-blend-multiply"
                    />
                  </span>
                  <span className="whitespace-pre-line font-display text-[0.86rem] font-semibold leading-snug text-navy">
                    {cert.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
