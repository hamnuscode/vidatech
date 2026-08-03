import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard, PostArt } from "@/components/sections/BlogGrid";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/ui/Primitives";
import { Arrow } from "@/components/ui/Button";
import { WaveDivider } from "@/components/water/WaveDivider";
import { POSTS, getPost, relatedPosts, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(slug);

  return (
    <>
      <article>
        <header className="relative overflow-hidden pb-14 pt-36 sm:pt-40">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(110% 80% at 14% 0%, #ffffff 0%, #f6fafb 48%, #eaf3f5 100%)",
            }}
            aria-hidden="true"
          />
          <div className="shell">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy/55 transition-colors hover:text-teal"
            >
              <span aria-hidden="true">←</span> All posts
            </Link>

            <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-teal">
              {post.category}
            </p>
            <h1 className="mt-4 max-w-[20ch] text-[clamp(2.2rem,5vw,3.9rem)] text-navy">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[56ch] text-[1.06rem] leading-[1.72] text-navy/68">
              {post.excerpt}
            </p>
            <p className="mt-8 font-mono text-[0.76rem] text-navy/50">
              {post.author} · {formatDate(post.date)} · {post.readTime} min read
            </p>
          </div>
        </header>

        <div className="shell">
          <PostArt post={post} className="h-56 rounded-3xl sm:h-72" />
        </div>

        <div className="shell">
          <div className="mx-auto max-w-[38rem] py-16 sm:py-20">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <Reveal key={i}>
                    <h2 className="mt-14 text-[clamp(1.5rem,2.6vw,2rem)] text-navy first:mt-0">
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }
              if (block.type === "quote") {
                return (
                  <Reveal key={i}>
                    <blockquote className="my-12 border-l-2 border-teal pl-6 sm:pl-8">
                      <p className="font-display text-[clamp(1.25rem,2.4vw,1.6rem)] font-semibold leading-[1.36] tracking-[-0.025em] text-navy">
                        {block.text}
                      </p>
                      {block.attribution && (
                        <footer className="mt-4 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-navy/50">
                          {block.attribution}
                        </footer>
                      )}
                    </blockquote>
                  </Reveal>
                );
              }
              if (block.type === "list") {
                return (
                  <Reveal key={i}>
                    <ul className="my-8 flex flex-col gap-4">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-4">
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                            aria-hidden="true"
                          />
                          <span className="text-[1.02rem] leading-[1.8] text-navy/75">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              }
              return (
                <Reveal key={i}>
                  <p className="mt-6 text-[1.05rem] leading-[1.82] text-navy/78">
                    {block.text}
                  </p>
                </Reveal>
              );
            })}

            <div className="mt-14 border-t border-blue/30 pt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-display text-[1rem] font-semibold text-teal"
              >
                Talk to us about your site <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <>
          <WaveDivider from="var(--color-paper)" to="var(--color-blue-50)" />
          <section className="section-y bg-blue-50">
            <div className="shell">
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] text-navy">
                Keep reading
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.07}>
                    <PostCard post={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          <WaveDivider from="var(--color-blue-50)" to="var(--color-paper)" />
        </>
      )}

      <CTABand
        heading="Wondering what this looks like on your site?"
        sub="Reading about output is one thing. Tell us your location and daily requirement and we'll model it against your own conditions."
        cta="Request a consultation"
      />
    </>
  );
}
