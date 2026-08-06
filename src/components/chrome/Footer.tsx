"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button, Arrow } from "@/components/ui/Button";
import { WaveDivider } from "@/components/water/WaveDivider";
import { PRODUCTS } from "@/lib/products";
import { NAV_LINKS, SITE } from "@/lib/site";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative">
      <WaveDivider from="transparent" to="var(--color-navy)" />

      <div className="bg-navy text-blue-300">
        <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="flex flex-col gap-5 md:col-span-4">
            <Logo tone="white" className="h-9 text-[1.05rem]" />
            <p className="max-w-[34ch] text-[0.95rem] leading-[1.75] text-blue-300/85">
              Clean drinking water pulled from the humidity in the air, for
              homes, industry, agriculture, and emergency response across
              Pakistan.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[0.85rem] text-blue-300/75 underline-offset-4 transition-colors hover:text-gold hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <FooterHeading>Site</FooterHeading>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <FooterHeading>Products</FooterHeading>
            <ul className="mt-4 flex flex-col gap-2.5">
              {PRODUCTS.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <FooterLink href={`/products#${p.slug}`}>{p.name}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/products">All products</FooterLink>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
              <li className="text-blue-300/80">{SITE.address}</li>
              <li>
                <FooterLink href={SITE.phoneHref}>{SITE.phone}</FooterLink>
              </li>
              <li>
                <FooterLink href={SITE.emailHref}>{SITE.email}</FooterLink>
              </li>
              <li className="text-blue-300/60">{SITE.hours}</li>
            </ul>

            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <label
                htmlFor="footer-email"
                className="block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-blue-300/70"
              >
                Water notes, monthly
              </label>
              {subscribed ? (
                <p className="mt-3 text-[0.9rem] text-gold">
                  Subscribed. Look out for the next issue.
                </p>
              ) : (
                <div className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] p-1 backdrop-blur-md focus-within:border-gold/50">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.pk"
                    className="min-w-0 flex-1 bg-transparent px-3 text-[0.9rem] text-white placeholder:text-blue-300/45 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    variant="gold"
                    className="h-9 shrink-0 px-4 text-[0.82rem]"
                  >
                    Join <Arrow />
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="shell flex flex-col gap-2 py-6 text-[0.82rem] text-blue-300/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} VidaTech. All rights reserved.
            </p>
            <p className="text-gold/80">
              Exclusive GENAQ partner in Pakistan.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-gold">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("mailto:") || href.startsWith("tel:");
  const className =
    "text-[0.9rem] text-blue-300/80 underline-offset-4 transition-colors hover:text-white hover:underline";

  if (external) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
