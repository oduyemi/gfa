"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, MessageCircle } from "lucide-react";
import { useContactSubmission } from "@/hooks/useContactSubmission";

const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-brand-electric/30 focus:border-brand-electric focus:ring-4 focus:ring-brand-electric/10";
const labelClass = "mb-2 block text-sm font-semibold text-foreground";


export const GeneralContactForm = () => {
  const { status, errorMessage, submit, reset } = useContactSubmission();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const success = await submit({
      fullname: form.fullname,
      email: form.email,
      phone: form.phone,
      service: "General Enquiry",
      serviceInterest: "I'm not sure yet",
      subject: form.subject.trim() || "General enquiry",
      message: form.message,
    });

    if (success) {
      setForm({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  }

  if (status === "success") {
    return (
      <div className="relative flex min-h-[420px] flex-col justify-center overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-electric/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-brand-gold/[0.08] blur-3xl" />

        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-600">
            <CheckCircle2 className="h-8 w-8" strokeWidth={1.7} />
          </div>

          <span className="mt-7 block text-[10px] font-bold uppercase tracking-[0.2em] text-green-600">
            Message received
          </span>

          <h3 className="mt-3 max-w-md font-brand-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Well, this is a good start.
          </h3>

          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            Thank you for reaching out. We'll read through your message and
            get back to you as soon as we can.
          </p>

          <button
            type="button"
            onClick={reset}
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand-electric/40 hover:text-brand-electric"
          >
            Send another message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="mt-12 flex items-center gap-2 border-t border-border pt-5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Go Far Agency · Your extended digital team
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Intro */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-subtle p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-brand-electric/[0.07] blur-2xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
            <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Not quite sure where to start?
            </p>
            <p className="mt-1 max-w-md text-xs leading-6 text-muted-foreground">
              That's completely fine. Tell us what's on your mind. A question,
              an idea or just a starting point is all we need.
            </p>
          </div>
        </div>
      </div>

      {/* Your details */}
      <section className="space-y-5">
        <SectionHeading
          number="01"
          title="A little about you."
          description="So we know who we're speaking with."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="general-fullname" className={labelClass}>
              Your name <Required />
            </label>

            <input
              id="general-fullname"
              name="fullname"
              autoComplete="name"
              required
              maxLength={120}
              value={form.fullname}
              onChange={(e) => updateField("fullname", e.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="general-email" className={labelClass}>
              Email address <Required />
            </label>

            <input
              id="general-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="general-phone" className={labelClass}>
            Phone number <Required />
          </label>

          <input
            id="general-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+44 7700 900000"
            className={inputClass}
          />

          <p className="mt-2 text-xs text-muted-foreground">
            Include your country code so we can reach you.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Your message */}
      <section className="space-y-5">
        <SectionHeading
          number="02"
          title="What's on your mind?"
          description="There's no need to have everything figured out."
        />

        <div>
          <label htmlFor="general-subject" className={labelClass}>
            Subject{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </label>

          <input
            id="general-subject"
            name="subject"
            maxLength={500}
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            placeholder="What would you like to discuss?"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="general-message" className={labelClass}>
            Your message <Required />
          </label>

          <textarea
            id="general-message"
            name="message"
            required
            rows={5}
            minLength={10}
            maxLength={10000}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Share a question, an idea, a challenge, or simply tell us what's on your mind..."
            className={`${inputClass} min-h-[155px] resize-y leading-7`}
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xs leading-5 text-muted-foreground">
              A few sentences are more than enough to get us started.
            </p>

            <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
              {form.message.length} characters
            </span>
          </div>
        </div>
      </section>

      {/* Error */}
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3.5 text-sm text-red-600 dark:text-red-400"
        >
          <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="leading-6">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <div className="border-t border-border pt-6">
        <div className="mb-5 flex items-start gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Let's see where the conversation goes.
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              No pressure, no commitment. Just a conversation.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group flex w-full items-center justify-center gap-3 rounded-full bg-brand-electric px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(18,101,244,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-[0_12px_30px_rgba(18,101,244,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-electric/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "loading" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Sending your message...
            </>
          ) : (
            <>
              Start a conversation
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </>
          )}
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
          By submitting, you're starting a conversation with Go Far Agency.
        </p>
      </div>
    </form>
  );
};

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-[0.18em] text-brand-electric">
          {number}
        </span>
        <span className="h-px w-7 bg-brand-electric/30" />
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          General enquiry
        </span>
      </div>

      <h3 className="font-brand-display text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function SectionDivider() {
  return <div className="h-px w-full bg-border" />;
}

function Required() {
  return <span className="text-brand-electric">*</span>;
}
