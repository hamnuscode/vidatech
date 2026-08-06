"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Product image viewer.
 *
 * Product photography is the thing buyers actually want a closer look at, and a
 * card-sized render is too small to judge a machine by. Hovering magnifies the
 * image in place; clicking opens it full size.
 *
 * The dialog is a real modal: focus moves into it, Escape closes it, the page
 * behind it cannot scroll, and focus returns to the trigger on close.
 */
export function ProductLightbox({
  src,
  alt,
  caption,
  className,
  imageClassName,
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  /** Optional overlay rendered on top of the thumbnail, e.g. a status tag. */
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Portals need a DOM target, which only exists after hydration.
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      // Only the close button is focusable inside, so any Tab returns to it.
      if (e.key === "Tab") {
        e.preventDefault();
        dialog.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  /**
   * Portalled to <body>. The product card is both overflow-hidden and inside a
   * transformed element (the scroll reveal animates transform), and a
   * transformed ancestor becomes the containing block for position:fixed — so
   * without this the "fullscreen" overlay renders trapped inside the card.
   */
  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 cursor-zoom-out bg-navy/70 backdrop-blur-md"
            onClick={close}
          />

          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="relative z-10 flex max-h-full w-full max-w-4xl flex-col items-center"
            initial={reduce ? undefined : { scale: 0.94, y: 12 }}
            animate={reduce ? undefined : { scale: 1, y: 0 }}
            exit={reduce ? undefined : { scale: 0.96, y: 8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              data-close
              type="button"
              onClick={close}
              aria-label="Close image"
              className="absolute -top-3 right-1 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform duration-300 hover:scale-105 sm:-right-4 sm:-top-4"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="flex max-h-[78vh] w-full items-center justify-center rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1600}
                sizes="90vw"
                className="max-h-[64vh] w-auto object-contain"
                priority
              />
            </div>

            {caption && (
              <p className="mt-4 text-center font-display text-[0.95rem] font-semibold text-white">
                {caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        aria-label={`View ${alt} full size`}
        className={cn(
          "relative block w-full cursor-zoom-in overflow-hidden",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={900}
          sizes="(max-width: 768px) 90vw, 480px"
          className={cn(
            "h-full w-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            imageClassName
          )}
          style={{ transform: hover && !reduce ? "scale(1.09)" : "scale(1)" }}
        />

        {children}

        {/* Affordance. Only on hover, so the card stays quiet at rest. */}
        <span
          className={cn(
            "pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy/85 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-opacity duration-300",
            hover ? "opacity-100" : "opacity-0"
          )}
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 14 14M7 5.2v3.6M5.2 7h3.6" />
          </svg>
          Enlarge
        </span>
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
