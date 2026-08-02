"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "ghost" | "onNavy";
type Size = "md" | "lg";

const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display font-semibold tracking-[-0.01em] transition-[transform,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-white shadow-[0_10px_24px_-12px_rgba(7,144,163,0.9)] hover:bg-teal-600 hover:shadow-[0_16px_34px_-14px_rgba(7,144,163,0.95)]",
  gold: "bg-gold text-navy shadow-[0_10px_24px_-12px_rgba(201,134,31,0.85)] hover:bg-[#f7a92a]",
  ghost:
    "border border-blue/45 bg-white/60 text-navy backdrop-blur-sm hover:border-teal/50 hover:bg-white",
  onNavy: "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/18",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-13 px-7 text-[0.98rem]",
};

type Ripple = { id: number; x: number; y: number };

/** Ripple that spreads from the pointer — press reads as a drop landing. */
function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const next = useRef(0);

  const spawn = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = next.current++;
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    window.setTimeout(
      () => setRipples((r) => r.filter((item) => item.id !== id)),
      650
    );
  }, []);

  const layer = (
    <span className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute h-6 w-6 rounded-full bg-white/45"
          style={{
            left: r.x - 12,
            top: r.y - 12,
            animation: "ripple-out 620ms cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        />
      ))}
    </span>
  );

  return { spawn, layer };
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { spawn, layer } = useRipples();
  return (
    <button
      {...props}
      onPointerDown={(e) => {
        spawn(e);
        props.onPointerDown?.(e);
      }}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {layer}
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  const { spawn, layer } = useRipples();
  return (
    <Link
      href={href}
      {...props}
      onPointerDown={spawn}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {layer}
      {children}
    </Link>
  );
}

/** Trailing arrow that leans forward on hover. */
export function Arrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1",
        className
      )}
    >
      →
    </span>
  );
}
