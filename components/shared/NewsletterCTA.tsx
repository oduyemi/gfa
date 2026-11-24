
"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Sparkles,
} from "lucide-react";

interface NewsletterCTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  variant?: "default" | "compact";
}

export const NewsletterCTA = ({
  eyebrow = "A little something for your inbox",
  title = "Good ideas deserve to go far.",
  description = "Get thoughtful insights, useful resources, and occasional updates to help you make more of your next big idea.",
  buttonText = "Join the list",
  className = "",
  variant = "default",
}: NewsletterCTAProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    "Thanks for signing up. Look out for something good in your inbox."
  );

  const shouldReduceMotion = useReducedMotion();
  const isCompact = variant === "compact";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to subscribe. Please try again."
        );
      }

      setSuccessMessage(
        data.message ||
          "Thanks for signing up. Look out for something good in your inbox."
      );

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className={`brand-container py-10 sm:py-14 ${className}`}
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className={`
          relative isolate overflow-hidden
          rounded-[1.75rem] sm:rounded-[2.25rem]
          bg-brand-gold text-obsidian-950
          dark:bg-obsidian-950 dark:text-white
          ${isCompact ? "rounded-[1.5rem] sm:rounded-[1.75rem]" : ""}
        `}
      >
        {/* Decorative brand detail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-obsidian-950/10 dark:border-white/10 sm:h-80 sm:w-80"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-12 h-44 w-44 rounded-full border border-obsidian-950/10 dark:border-white/10 sm:h-56 sm:w-56"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-[38%] h-40 w-40 translate-y-1/2 rounded-full bg-white/20 blur-3xl dark:bg-brand-electric/10"
        />

        <div
          className={`
            relative grid gap-9
            ${
              isCompact
                ? "px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12"
                : "px-6 py-9 sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-16 lg:py-16"
            }
          `}
        >
          <div className="relative max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-obsidian-950/70 dark:text-brand-gold">
                {eyebrow}
              </span>
            </div>

            <h2
              id="newsletter-heading"
              className={`
                max-w-xl font-brand-display font-semibold
                leading-[1.04] tracking-[-0.055em]
                ${
                  isCompact
                    ? "text-3xl sm:text-4xl"
                    : "text-4xl sm:text-5xl lg:text-6xl"
                }
              `}
            >
              {title}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-obsidian-950/70 dark:text-white/60 sm:text-base sm:leading-8">
              {description}
            </p>
          </div>

          {/* Signup panel */}
          <div className="relative">
            {status === "success" ? (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  flex min-h-[260px] flex-col justify-center
                  rounded-2xl border border-white/70
                  bg-white p-6 shadow-[0_16px_45px_rgba(9,10,12,0.08)]
                  dark:border-white/10 dark:bg-obsidian-800
                  dark:shadow-none sm:p-8
                "
                role="status"
                aria-live="polite"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-success-surface text-success dark:bg-success/10 dark:text-success">
                  <CheckCircle2 size={25} />
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-obsidian-950 dark:text-white">
                  You're on the list!
                </h3>

                <p className="mt-3 text-sm leading-7 text-obsidian-600 dark:text-white/60">
                  {successMessage}
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-electric-700 transition hover:gap-3 dark:text-brand-gold"
                >
                  Add another email
                  <ArrowRight size={15} />
                </button>
              </motion.div>
            ) : (
              <div
                className="
                  rounded-2xl border border-white/80
                  bg-white p-5
                  shadow-[0_16px_45px_rgba(9,10,12,0.08)]
                  dark:border-white/10 dark:bg-obsidian-800
                  dark:shadow-none sm:p-7
                "
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric-50 text-brand-electric dark:bg-brand-electric/15 dark:text-electric-300">
                    <Mail size={19} />
                  </div>

                  <div>
                    <p className="font-semibold text-obsidian-950 dark:text-white">
                      Stay in the loop
                    </p>

                    <p className="mt-1 text-xs text-obsidian-500 dark:text-white/45">
                      A good read, every now and then.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <label
                    htmlFor="newsletter-email"
                    className="sr-only"
                  >
                    Your email address
                  </label>

                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    disabled={status === "loading"}
                    value={email}
                    onChange={(event) =>
                      handleEmailChange(event.target.value)
                    }
                    placeholder="Enter your email address"
                    className="
                      h-14 w-full rounded-xl
                      border border-obsidian-200
                      bg-brand-paper px-4 text-sm text-obsidian-950
                      outline-none transition
                      placeholder:text-obsidian-400
                      focus:border-brand-electric
                      focus:ring-4 focus:ring-brand-electric/10
                      disabled:cursor-not-allowed disabled:opacity-60
                      dark:border-white/10 dark:bg-obsidian-950
                      dark:text-white dark:placeholder:text-white/30
                      dark:focus:border-electric-400
                    "
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="
                      group flex h-14 w-full items-center
                      justify-center gap-2 rounded-xl
                      bg-brand-electric px-5 text-sm font-semibold
                      text-white shadow-premium-blue
                      transition duration-200
                      hover:bg-electric-700
                      active:scale-[0.99]
                      disabled:cursor-not-allowed disabled:opacity-60
                    "
                  >
                    {status === "loading" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Adding you...
                      </>
                    ) : (
                      <>
                        {buttonText}
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p
                      role="alert"
                      aria-live="assertive"
                      className="rounded-lg bg-danger-surface px-3 py-2.5 text-sm leading-6 text-danger dark:bg-danger/10 dark:text-danger"
                    >
                      {errorMessage}
                    </p>
                  )}
                </form>

                <p className="mt-5 text-xs leading-5 text-obsidian-500 dark:text-white/40">
                  No noise, no inbox overload. Just useful things
                  from GFA. You can unsubscribe whenever you like.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
