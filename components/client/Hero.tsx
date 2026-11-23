"use client";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, MoveUpRight } from "lucide-react";

const revealEase = [0.22, 1, 0.36, 1] as const;

const prompts = [
  "What you're working towards",
  "The support you're looking for",
  "Where you'd like to go next",
];

export const ClientHero = () => {
  const reducedMotion = useReducedMotion();

  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reducedMotion ? 0 : 0.7,
      ease: revealEase,
    },
  };

  return (
    <main className="relative isolate overflow-hidden bg-background">
      <section className="relative overflow-hidden border-b border-border bg-[#F8F7F2] text-obsidian-900 dark:border-white/[0.08] dark:bg-[#090A0C] dark:text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-44 -top-52 h-[42rem] w-[42rem] rounded-full bg-brand-electric/[0.10] blur-[140px] dark:bg-brand-electric/[0.16]" />
          <div className="absolute -bottom-72 left-[8%] h-[34rem] w-[34rem] rounded-full bg-brand-gold/[0.08] blur-[140px] dark:bg-brand-gold/[0.07]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(9,10,12,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(9,10,12,0.35)_1px,transparent_1px)] [background-size:88px_88px] dark:opacity-[0.055] dark:[background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-electric/40 to-transparent" />
        </div>

        <div className="brand-container relative">
          <div className="grid gap-14 py-12 sm:py-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16 lg:py-20 xl:py-24">
            <motion.div {...reveal} className="relative">
              <div className="mb-8 flex items-center gap-3">
                <span className="text-xs font-medium tracking-wide text-obsidian-900/55 dark:text-white/50">
                  A good place to begin
                </span>
              </div>

              <h1 className="max-w-5xl font-brand-display text-[3.45rem] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-7xl lg:text-[6.2rem] xl:text-[7.1rem]">
                Let's make
                <br />
                your next move
                <br />
                <span className="relative inline-block text-brand-electric dark:text-brand-gold">
                  a good one.
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1 h-[3px] w-[58%] rounded-full bg-brand-gold dark:bg-brand-electric sm:-bottom-3"
                  />
                </span>
              </h1>

              <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-obsidian-900/45 dark:text-white/40 sm:text-sm">
                <span className="font-semibold tabular-nums">01</span>
                <span className="h-px w-8 bg-obsidian-900/20 dark:bg-white/20" />
                <span>Every great partnership has a starting point.</span>
              </div>
            </motion.div>

            {/* Project invitation */}
            <motion.div
              {...reveal}
              transition={{
                ...reveal.transition,
                delay: reducedMotion ? 0 : 0.14,
              }}
              className="relative lg:pb-1"
            >
              <div className="relative overflow-hidden border border-obsidian-900/10 bg-white/45 p-6 dark:border-white/[0.10] dark:bg-white/[0.035] sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-brand-electric/10 dark:border-brand-electric/20"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-brand-electric/10 dark:border-brand-electric/15"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-electric dark:text-brand-gold">
                      Your project starts here
                    </span>
                  </div>

                  <p className="mt-7 max-w-md text-lg leading-[1.8] text-obsidian-900/70 dark:text-white/70 sm:text-xl sm:leading-[1.75]">
                    Tell us what you're building, what you need, and what
                    moving forward looks like. We'll take it from there,
                    together.
                  </p>

                  <a
                    href="#enquiry-form"
                    className="group mt-8 inline-flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-obsidian-900 py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-premium-sm transition duration-300 hover:bg-brand-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4 dark:bg-brand-electric dark:text-white dark:hover:bg-electric-700"
                  >
                    Tell us about your project
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                      <MoveUpRight className="h-4 w-4" />
                    </span>
                  </a>

                  <div className="mt-5 flex items-start gap-2.5 text-xs leading-6 text-obsidian-900/45 dark:text-white/45">
                    <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-electric dark:text-brand-gold" />
                    <span>
                      No perfect brief required. Start with what you know.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};
