"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal. Everything eases like liquid: long, soft, slightly late.
 * Wraps children in a single motion element so stagger stays cheap.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Small caps label above a heading. Teal rule, then the words. */
export function Eyebrow({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode;
  tone?: "teal" | "gold" | "white";
  className?: string;
}) {
  const colours = {
    teal: "text-teal before:bg-teal",
    gold: "text-gold-600 before:bg-gold",
    white: "text-blue-300 before:bg-gold",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.2em]",
        "before:block before:h-px before:w-8 before:content-['']",
        colours,
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "navy",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "navy" | "white";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow tone={tone === "white" ? "white" : "teal"}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={cn(
          "max-w-[19ch] text-[clamp(2rem,4.4vw,3.4rem)]",
          align === "center" && "max-w-[22ch]",
          tone === "white" ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "max-w-[58ch] text-[1.02rem] leading-[1.72]",
            tone === "white" ? "text-blue-300" : "text-navy/68"
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function GlassPanel({
  children,
  className,
  strong = false,
}: {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return (
    <div className={cn(strong ? "glass-strong" : "glass", "rounded-3xl", className)}>
      {children}
    </div>
  );
}
