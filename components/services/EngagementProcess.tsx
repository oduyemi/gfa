"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { process } from "./engagement-data";


export const EngagementProcess = () => {
  const prefersReducedMotion = useReducedMotion();

  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: {
          duration: 0.65,
          ease: "easeOut" as const,
        },
      };

  return (
    <section className="relative bg-background pb-20 sm:pb-24 lg:pb-28">
      <div className="brand-container">
        {/* Process introduction */}
        <motion.div
          {...reveal}
          className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-electric">
              Simple from the start
            </span>

            <h2 className="mt-3 font-brand-display text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
              Here’s how we get going.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            No guesswork. Just a shared understanding of what needs to happen.
          </p>
        </motion.div>

        {/* Three stages */}
        <div className="grid gap-0 border-y border-border sm:grid-cols-3">
          {process.map((step, index) => (
            <div
              key={step.number}
              className={`relative flex gap-4 py-6 sm:px-5 sm:py-7 ${
                index !== 0
                  ? "border-t border-border sm:border-l sm:border-t-0"
                  : ""
              } ${index === 0 ? "sm:pl-0" : ""}`}
            >
              <span className="font-brand-display text-2xl font-semibold tracking-[-0.04em] text-brand-electric/70">
                {step.number}
              </span>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-1.5 max-w-[15rem] text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Expectations and contact */}
        <motion.div
          {...reveal}
          className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-surface-subtle/60 p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
              <Check size={19} />
            </span>

            <div>
              <h3 className="text-base font-semibold text-foreground">
                Clear expectations. Better working relationships.
              </h3>

              <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">
                Before any work begins, we agree on the scope, deliverables,
                timelines and payment terms. Everyone knows what to expect.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand-electric"
          >
            Have a project in mind?

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
