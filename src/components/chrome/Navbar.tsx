"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Reading progress, drawn as a waterline across the bottom of the bar.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Deferred so the first read happens after paint — the server has no
    // scroll position to render from, so syncing it during the effect would
    // just cause a cascading render.
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile panel when the route changes. Adjusting during render
  // rather than in an effect keeps it from flashing open on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        animate={{
          height: scrolled ? 64 : 88,
          backgroundColor: scrolled
            ? "rgba(252,252,252,0.78)"
            : "rgba(252,252,252,0)",
          borderBottomColor: scrolled
            ? "rgba(130,174,186,0.32)"
            : "rgba(130,174,186,0)",
          boxShadow: scrolled
            ? "0 1px 2px rgba(9,33,64,0.04), 0 14px 34px -18px rgba(9,33,64,0.28)"
            : "0 0 0 rgba(9,33,64,0)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative border-b",
          scrolled &&
            "backdrop-blur-[18px] backdrop-saturate-150 [-webkit-backdrop-filter:blur(18px)_saturate(150%)]"
        )}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="VidaTech home"
            className="shrink-0 rounded-md"
          >
            <motion.span
              className="flex items-center"
              animate={{ height: scrolled ? 28 : 38 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo className="h-full text-[1.05rem]" />
            </motion.span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-300",
                    active ? "text-teal" : "text-navy/72 hover:text-navy"
                  )}
                >
                  {link.label}
                  {/* Active marker: a small wave, not a straight rule */}
                  <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-[6px] overflow-hidden">
                    <svg
                      viewBox="0 0 40 6"
                      preserveAspectRatio="none"
                      className={cn(
                        "h-full w-[200%] text-teal transition-opacity duration-300",
                        active
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-40"
                      )}
                      style={
                        active
                          ? { animation: "drift 3.2s linear infinite" }
                          : undefined
                      }
                      aria-hidden="true"
                    >
                      <path
                        d="M0 3 q 5 -2.6 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/contact"
              variant="gold"
              className="hidden sm:inline-flex"
            >
              Get a quote <Arrow />
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-blue/40 bg-white/70 text-navy lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute left-0 block h-[1.5px] w-full rounded bg-current"
                  animate={
                    open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute left-0 block h-[1.5px] w-full rounded bg-current"
                  animate={
                    open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress as a rising waterline */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
          style={{
            scaleX: progress,
            background: "var(--grad-water)",
            opacity: scrolled ? 1 : 0,
          }}
          aria-hidden="true"
        />
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed inset-0 -z-10 bg-navy/25 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              aria-label="Main"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong fixed inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col gap-1 rounded-l-3xl px-6 pb-8 pt-24 lg:hidden"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-blue/25 py-3.5 font-display text-lg font-semibold",
                      isActive(link.href) ? "text-teal" : "text-navy"
                    )}
                  >
                    {link.label}
                    <Arrow className="text-navy/30" />
                  </Link>
                </motion.div>
              ))}
              <ButtonLink href="/contact" variant="gold" size="lg" className="mt-6">
                Get a quote <Arrow />
              </ButtonLink>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
