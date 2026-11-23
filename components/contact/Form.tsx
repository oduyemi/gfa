"use client";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";

const services = [
  "Digital Creation",
  "Digital Execution",
  "Managed Virtual Assistance",
  "Multiple services",
  "I'm not sure yet",
];

const budgets = [
  "Not decided yet",
  "Under £500",
  "£500 – £1,000",
  "£1,000 – £2,500",
  "£2,500 – £5,000",
  "£5,000 – £10,000",
  "Above £10,000",
];

const timelines = [
  "As soon as possible",
  "Within 2–4 weeks",
  "Within 1–3 months",
  "Flexible",
  "Just exploring",
];

const steps = [
  {
    number: "01",
    title: "Tell us what you have in mind",
    description: "Share your idea, goals or current challenge.",
  },
  {
    number: "02",
    title: "We'll review your enquiry",
    description: "We'll consider what you need and how we can help.",
  },
  {
    number: "03",
    title: "Let's work out the next step",
    description: "We'll get in touch to discuss a way forward.",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/55 hover:border-foreground/25 focus:border-brand-electric focus:ring-[3px] focus:ring-brand-electric/10";

const labelClass =
  "mb-2.5 block text-[12px] font-semibold tracking-[-0.01em] text-foreground";

const RequiredMark = () => (
  <span className="ml-1 text-brand-electric">*</span>
);

const OptionalLabel = () => (
  <span className="ml-1.5 text-[10px] font-normal text-muted-foreground">
    Optional
  </span>
);

export const ContactForm = () => {
  const reduceMotion = useReducedMotion();

  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    }
  }

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.6 },
  };

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <div className="brand-container">
        {/* Section introduction */}
        <motion.div
          {...reveal}
          className="mb-12 max-w-3xl lg:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="size-2 rounded-full bg-brand-electric" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              The first step
            </span>
          </div>

          <h2 className="font-brand-display text-[clamp(2.8rem,6vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-foreground">
            Every good project
            <span className="block brand-gradient-text">
              starts somewhere.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            Tell us what you're thinking, what you're working towards
            or where you need a little support. We'll take it from there.
          </p>
        </motion.div>

        {/* Equal-height two-column composition */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 xl:gap-10">
          {/* Left: enquiry guidance */}
          <motion.aside
            {...reveal}
            className="flex h-full min-w-0"
          >
            <div className="relative flex h-full w-full flex-col overflow-hidden bg-obsidian-900 p-7 text-white sm:p-9 lg:p-10 xl:p-11">
              {/* Ambient detail */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border border-white/[0.07]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full border border-white/[0.06]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-20 size-64 rounded-full bg-brand-electric/15 blur-[80px]"
              />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                    A conversation, not a commitment
                  </span>
                </div>

                <h3 className="mt-8 max-w-sm font-brand-display text-3xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-4xl xl:text-[2.8rem]">
                  Let's get to know what you're building.
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                  You don't need to have everything figured out.
                  A little context is enough to get the conversation
                  started.
                </p>
              </div>

              <div className="relative my-9 flex-1 border-y border-white/10 py-8">
                <p className="mb-8 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  What happens next
                </p>

                <div className="flex h-[calc(100%-2rem)] flex-col justify-between gap-8">
                  {steps.map((step, index) => (
                    <div
                      key={step.number}
                      className="relative flex gap-4"
                    >
                      {index !== steps.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="absolute left-[15px] top-9 h-[calc(100%+2rem)] w-px bg-white/10"
                        />
                      )}

                      <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-obsidian-900 font-mono text-[10px] font-semibold text-brand-gold">
                        {step.number}
                      </div>

                      <div className="pt-0.5">
                        <h4 className="text-sm font-semibold text-white">
                          {step.title}
                        </h4>

                        <p className="mt-1.5 max-w-xs text-xs leading-6 text-white/45">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-auto">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                    <Check size={12} strokeWidth={2.5} />
                  </span>

                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      Not sure where to start?
                    </h4>

                    <p className="mt-2 max-w-sm text-xs leading-6 text-white/45">
                      That's perfectly fine. Tell us about the outcome
                      you're looking for, and we'll help you find the
                      right starting point.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/35">
                    GFA
                  </span>

                  <span className="flex size-9 items-center justify-center rounded-full border border-white/15 text-brand-gold">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.div
            {...reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.1,
            }}
            className="flex h-full min-w-0"
          >
            <div className="h-full w-full border border-border bg-card shadow-premium-sm">
              {status === "success" ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex h-full min-h-[650px] flex-col items-center justify-center px-6 py-16 text-center sm:px-12"
                >
                  <div className="relative flex size-20 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                    <CheckCircle2 size={38} strokeWidth={1.5} />

                    <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border-4 border-card bg-green-500 text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  </div>

                  <span className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-green-600">
                    Enquiry submitted
                  </span>

                  <h3 className="mt-4 max-w-md font-brand-display text-3xl font-semibold leading-tight tracking-[-0.055em] text-foreground sm:text-4xl">
                    Your message is on its way.
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
                    Thank you for reaching out to GFA. We've received
                    your enquiry and look forward to learning more about
                    what you have in mind.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    className="mt-9 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs font-semibold text-foreground transition-all hover:border-foreground/30 hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4"
                  >
                    Send another enquiry
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex h-full flex-col p-5 sm:p-8 lg:p-9 xl:p-10"
                  aria-busy={status === "loading"}
                >
                  <div className="mb-9 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-7">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-electric">
                        Your enquiry
                      </span>

                      <h3 className="mt-2 font-brand-display text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                        Tell us a little more.
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        Fields marked with * are required.
                      </p>
                    </div>

                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
                      <Send size={17} />
                    </span>
                  </div>

                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-brand-electric">
                        01
                      </span>

                      <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">
                        Your details
                      </h4>

                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullname" className={labelClass}>
                          Your name <RequiredMark />
                        </label>

                        <input
                          id="fullname"
                          name="fullname"
                          type="text"
                          autoComplete="name"
                          required
                          placeholder="What should we call you?"
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email address <RequiredMark />
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="you@example.com"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="company" className={labelClass}>
                        Business / organisation
                        <OptionalLabel />
                      </label>

                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your business or organisation"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="mt-9">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-brand-electric">
                        02
                      </span>

                      <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">
                        Your project
                      </h4>

                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <div>
                      <label htmlFor="service" className={labelClass}>
                        What are you interested in? <RequiredMark />
                      </label>

                      <select
                        id="service"
                        name="service"
                        required
                        defaultValue=""
                        className={fieldClass}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>

                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="budget" className={labelClass}>
                          Estimated budget
                          <OptionalLabel />
                        </label>

                        <select
                          id="budget"
                          name="budget"
                          defaultValue=""
                          className={fieldClass}
                        >
                          <option value="">Select a range</option>

                          {budgets.map((budget) => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timeline" className={labelClass}>
                          When would you like to begin?
                          <OptionalLabel />
                        </label>

                        <select
                          id="timeline"
                          name="timeline"
                          defaultValue=""
                          className={fieldClass}
                        >
                          <option value="">Select a timeline</option>

                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="subject" className={labelClass}>
                        Subject
                        <OptionalLabel />
                      </label>

                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="A quick summary of your enquiry"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="mt-9">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-brand-electric">
                        03
                      </span>

                      <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">
                        Your message
                      </h4>

                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <label htmlFor="message" className={labelClass}>
                      Tell us about your project <RequiredMark />
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      minLength={10}
                      placeholder="What are you working on? What would you like help with? Share as much or as little as you know right now..."
                      className={`${fieldClass} min-h-40 resize-y leading-7`}
                    />

                    <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                      A few details about your goals, challenges or
                      expectations will help us understand how to assist.
                    </p>
                  </div>

                  <div className="mt-auto pt-8">
                    {status === "error" && (
                      <div
                        role="alert"
                        className="mb-6 flex gap-3 border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600"
                      >
                        <span className="mt-0.5 size-2 shrink-0 rounded-full bg-red-500" />
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    <div className="border-t border-border pt-7">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-electric px-7 py-4 text-sm font-bold text-white shadow-premium-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-premium-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                      >
                        {status === "loading" ? (
                          <>
                            <LoaderCircle
                              size={16}
                              className="animate-spin"
                            />
                            Sending your enquiry...
                          </>
                        ) : (
                          <>
                            Send your enquiry
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </button>

                      <p className="mt-5 max-w-lg text-[10px] leading-5 text-muted-foreground">
                        By submitting this form, you agree that GFA may
                        use the information provided to respond to your
                        enquiry.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
