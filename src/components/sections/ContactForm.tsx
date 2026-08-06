"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { PRODUCTS, RANGES } from "@/lib/products";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<string, string>>;

const INTERESTS = [
  { value: "", label: "Select what you're interested in" },
  ...RANGES.map((r) => ({
    value: `range:${r.id}`,
    label: `${r.name} range, ${r.blurb}`,
  })),
  ...PRODUCTS.map((p) => ({
    value: p.slug,
    label: `${p.name} (${p.capacityLabel})`,
  })),
  { value: "unsure", label: "Not sure yet, recommend something" },
];

export function ContactForm() {
  const params = useSearchParams();
  const preselected = params.get("product") ?? "";

  // Arriving from a product's "Request details" prefills the interest field.
  const [values, setValues] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    interest: PRODUCTS.some((p) => p.slug === preselected) ? preselected : "",
    message: "",
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Enter your name so we know who to reply to.";
    if (!values.email.trim()) {
      next.email = "Enter an email address so we can send the recommendation.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "That address is missing an @ or a domain.";
    }
    if (!values.interest) next.interest = "Pick a range, a model, or ask us to recommend one.";
    if (values.message.trim().length < 10) {
      next.message = "Tell us your daily requirement and location. A line or two is plenty.";
    }
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("sending");
    // No backend wired yet — swap this for the real submit when the endpoint exists.
    window.setTimeout(() => setStatus("sent"), 1400);
  };

  if (status === "sent") {
    return (
      <div className="glass-strong relative isolate overflow-hidden rounded-[2rem] p-10 sm:p-12">
        <Splash />
        <div className="relative z-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <h2 className="mt-7 text-[clamp(1.6rem,3vw,2.2rem)] text-navy">
            Request received
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1rem] leading-[1.74] text-navy/68">
            We&rsquo;ll come back within one working day with a recommended unit
            and an indicative output for your location. If it&rsquo;s urgent,
            WhatsApp is faster.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setValues({
                name: "",
                email: "",
                phone: "",
                organisation: "",
                interest: "",
                message: "",
              });
            }}
            className="mt-8 font-display text-[0.92rem] font-semibold text-teal underline-offset-4 hover:underline"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass-strong rounded-[2rem] p-7 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          optional
          autoComplete="tel"
        />
        <Field
          label="Organisation"
          value={values.organisation}
          onChange={set("organisation")}
          optional
          autoComplete="organization"
        />
      </div>

      <div className="mt-5">
        <SelectField
          label="Interest"
          value={values.interest}
          onChange={set("interest")}
          error={errors.interest}
          options={INTERESTS}
        />
      </div>

      <div className="mt-5">
        <Field
          label="Message"
          value={values.message}
          onChange={set("message")}
          error={errors.message}
          multiline
          hint="Daily water requirement, location, and available power, if you know them."
        />
      </div>

      <SubmitButton status={status} reduce={!!reduce} />

      <p className="mt-4 text-[0.8rem] leading-relaxed text-navy/50">
        We use your details to answer this request. Nothing is shared with
        anyone else.
      </p>
    </form>
  );
}

/** The submit control fills with water as it sends. */
function SubmitButton({
  status,
  reduce,
}: {
  status: Status;
  reduce: boolean;
}) {
  const sending = status === "sending";
  return (
    <button
      type="submit"
      disabled={sending}
      className="group relative mt-8 h-13 w-full overflow-hidden rounded-full bg-navy font-display text-[0.98rem] font-semibold text-white transition-colors duration-300 hover:bg-navy-800 disabled:cursor-progress sm:w-auto sm:px-9"
    >
      <motion.span
        className="absolute inset-x-0 bottom-0"
        initial={{ height: "0%" }}
        animate={{ height: sending ? "100%" : "0%" }}
        transition={{ duration: reduce ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "var(--grad-water-v)" }}
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center justify-center gap-2 px-8 sm:px-0">
        {sending ? "Sending…" : "Send request"}
        {!sending && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        )}
      </span>
    </button>
  );
}

/** Confirmation splash: three rings, then still. */
function Splash() {
  return (
    <div className="pointer-events-none absolute left-8 top-8" aria-hidden="true">
      {[0, 0.18, 0.36].map((delay) => (
        <span
          key={delay}
          className="absolute h-14 w-14 rounded-full border border-teal/45"
          style={{
            animation: `ripple-out 1.6s ${delay}s cubic-bezier(0.22,1,0.36,1) forwards`,
          }}
        />
      ))}
    </div>
  );
}

function useRipple() {
  const [ripple, setRipple] = useState<{ x: number; y: number; k: number } | null>(
    null
  );
  const seq = useRef(0);
  const spawn = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seq.current += 1;
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, k: seq.current });
  };
  const node = ripple && (
    <span
      key={ripple.k}
      className="pointer-events-none absolute h-8 w-8 rounded-full bg-teal/18"
      style={{
        left: ripple.x - 16,
        top: ripple.y - 16,
        animation: "ripple-out 700ms cubic-bezier(0.22,1,0.36,1) forwards",
      }}
      aria-hidden="true"
    />
  );
  return { spawn, node };
}

const fieldShell =
  "relative isolate overflow-hidden rounded-2xl border bg-white/70 transition-colors duration-300";

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  optional = false,
  multiline = false,
  hint,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  multiline?: boolean;
  hint?: string;
  autoComplete?: string;
}) {
  const id = useId();
  const { spawn, node } = useRipple();

  return (
    <div className={multiline ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy/60"
      >
        {label}
        {optional && <span className="text-navy/35">Optional</span>}
      </label>
      <div
        className={cn(
          fieldShell,
          "mt-2",
          error ? "border-red-400" : "border-blue/35 focus-within:border-teal"
        )}
        onPointerDown={spawn}
      >
        {node}
        {multiline ? (
          <textarea
            id={id}
            rows={5}
            value={value}
            data-invalid={error ? "true" : undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            onChange={(e) => onChange(e.target.value)}
            className="relative z-10 w-full resize-none bg-transparent px-4 py-3 text-[0.96rem] text-navy placeholder:text-navy/35 focus:outline-none"
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            autoComplete={autoComplete}
            data-invalid={error ? "true" : undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(e) => onChange(e.target.value)}
            className="relative z-10 w-full bg-transparent px-4 py-3 text-[0.96rem] text-navy placeholder:text-navy/35 focus:outline-none"
          />
        )}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8rem] text-navy/50">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.82rem] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  error,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: { value: string; label: string }[];
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy/60"
      >
        {label}
      </label>
      <div
        className={cn(
          fieldShell,
          "mt-2",
          error ? "border-red-400" : "border-blue/35 focus-within:border-teal"
        )}
      >
        <select
          id={id}
          value={value}
          data-invalid={error ? "true" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className="relative z-10 w-full appearance-none bg-transparent px-4 py-3 text-[0.96rem] text-navy focus:outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.value === ""}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-navy/45"
          aria-hidden="true"
        >
          ▾
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.82rem] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
