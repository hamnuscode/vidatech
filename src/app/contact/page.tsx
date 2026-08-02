import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell VidaTech your daily water requirement and location, and we'll recommend the right atmospheric water generator.",
};

const DETAILS = [
  { label: "Address", value: SITE.address },
  { label: "Phone", value: SITE.phone, href: SITE.phoneHref },
  { label: "Email", value: SITE.email, href: SITE.emailHref },
  { label: "Hours", value: SITE.hours },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
      {/* Still water background — the page's job is the form, not the scenery */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(100% 70% at 80% 0%, #ffffff 0%, #f4fafb 44%, #e6f2f4 100%)",
        }}
        aria-hidden="true"
      />
      <svg
        className="absolute inset-x-0 bottom-0 -z-10 h-40 w-[200%] text-blue/20"
        style={{ animation: "drift 28s linear infinite" }}
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 88 C 200 52 300 118 500 86 C 700 54 800 114 1000 84 C 1100 70 1150 78 1200 74 L1200 160 L0 160 Z M1200 88 C 1400 52 1500 118 1700 86 C 1900 54 2000 114 2200 84 C 2300 70 2350 78 2400 74 L2400 160 L1200 160 Z"
          fill="currentColor"
        />
      </svg>

      <div className="shell">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.2rem)] text-navy">
          Tell us what you need,{" "}
          <span className="text-teal">and where.</span>
        </h1>
        <p className="mt-6 max-w-[54ch] text-[1.04rem] leading-[1.74] text-navy/68">
          Daily requirement in litres, your location, and the power available on
          site. That&rsquo;s enough for us to come back with a specific
          recommendation rather than a brochure.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="glass rounded-3xl p-7">
              <h2 className="font-display text-[1.12rem] font-bold text-navy">
                Reach us directly
              </h2>
              <dl className="mt-6 flex flex-col gap-5">
                {DETAILS.map((d) => (
                  <div key={d.label}>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-navy/50">
                      {d.label}
                    </dt>
                    <dd className="mt-1 text-[0.96rem] text-navy">
                      {d.href ? (
                        <a
                          href={d.href}
                          className="underline-offset-4 transition-colors hover:text-teal hover:underline"
                        >
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-7 flex items-center justify-between rounded-2xl bg-navy px-5 py-4 text-white transition-colors duration-300 hover:bg-navy-800"
              >
                <span>
                  <span className="block font-display text-[0.96rem] font-semibold">
                    Quick quote on WhatsApp
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.74rem] text-blue-300">
                    Fastest route if it&rsquo;s urgent
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-gold transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>

            <div className="overflow-hidden rounded-3xl border border-blue/30">
              <iframe
                title="VidaTech location in Lahore, Pakistan"
                src="https://www.openstreetmap.org/export/embed.html?bbox=74.20%2C31.42%2C74.45%2C31.62&layer=mapnik"
                loading="lazy"
                className="h-64 w-full border-0 grayscale-[0.35]"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FormSkeleton() {
  return (
    <div
      className="glass-strong h-[36rem] rounded-[2rem]"
      aria-hidden="true"
    />
  );
}
