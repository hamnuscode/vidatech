"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Primitives";
import { Arrow } from "@/components/ui/Button";
import { CATEGORIES, POSTS, formatDate, type Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function BlogGrid() {
  const [category, setCategory] = useState<string>("All");

  const posts = useMemo(
    () =>
      (category === "All"
        ? POSTS
        : POSTS.filter((p) => p.category === category)
      ).slice().sort((a, b) => b.date.localeCompare(a.date)),
    [category]
  );

  return (
    <section className="section-y">
      <div className="shell">
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Filter posts by category"
        >
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "rounded-full px-4 py-2 text-[0.84rem] font-medium transition-colors duration-300",
                category === c
                  ? "bg-navy text-white"
                  : "bg-blue-50 text-navy/65 ring-1 ring-blue/30 hover:text-navy"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.07}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-blue/28 bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-teal/35 hover:shadow-[0_26px_54px_-28px_rgba(9,33,64,0.32)]"
    >
      <PostArt post={post} />
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-teal">
          {post.category}
        </span>
        <h2 className="mt-3 font-display text-[1.2rem] font-bold leading-[1.24] text-navy">
          {post.title}
        </h2>
        <p className="mt-3 flex-1 text-[0.9rem] leading-[1.7] text-navy/62">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-blue/25 pt-4">
          <span className="font-mono text-[0.72rem] text-navy/50">
            {formatDate(post.date)} · {post.readTime} min read
          </span>
          <Arrow className="text-teal" />
        </div>
      </div>
    </Link>
  );
}

/**
 * Card art in place of stock photography: a still section through water, cut
 * from the post's own two hues. Every card is recognisably part of one set.
 */
export function PostArt({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  return (
    <div
      className={cn("relative h-40 overflow-hidden", className)}
      style={{
        background: `linear-gradient(150deg, ${post.hues[0]} 0%, ${post.hues[1]} 100%)`,
      }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-[200%] text-white/25"
        style={{ animation: "drift 30s linear infinite" }}
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 C 200 84 300 152 500 118 C 700 84 800 148 1000 116 C 1100 100 1150 110 1200 106 L1200 200 L0 200 Z M1200 120 C 1400 84 1500 152 1700 118 C 1900 84 2000 148 2200 116 C 2300 100 2350 110 2400 106 L2400 200 L1200 200 Z"
          fill="currentColor"
        />
        <path
          d="M0 152 C 220 122 320 178 520 150 C 720 122 820 176 1020 148 C 1110 136 1160 142 1200 140 L1200 200 L0 200 Z M1200 152 C 1420 122 1520 178 1720 150 C 1920 122 2020 176 2220 148 C 2310 136 2360 142 2400 140 L2400 200 L1200 200 Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
      <span className="absolute right-5 top-4 h-2.5 w-2.5 rounded-full bg-white/60" />
    </div>
  );
}
