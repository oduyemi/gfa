"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";


export const OurProcess = () => {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.65, ease: "easeOut" as const },
      };

  return (
    <section
      className="relative overflow-hidden bg-background pt-24 sm:pt-28 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 top-20 size-[34rem] rounded-full bg-brand-electric/[0.045] blur-[120px]"
      />

      <div className="brand-container relative">
        <motion.div
          {...motionProps}
          className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <p className="brand-eyebrow">A better way to work together</p>
            </div>

            <h2 className="max-w-2xl font-brand-display text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-[4.5rem]">
              From first hello
              <br />
              to <span className="brand-gradient-text">let's go.</span>
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">
              Starting something new should feel exciting, not complicated.
              We keep the process straightforward, so you know what happens
              next and what we need from you along the way.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-electric/10 text-brand-electric">
                  <Check size={15} strokeWidth={2.5} />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Clear expectations
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-electric/10 text-brand-electric">
                  <Check size={15} strokeWidth={2.5} />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  A guided experience
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-surface-subtle sm:aspect-[16/10] lg:aspect-[5/4]">
              <Image
                src="/images/services/process.jpg"
                alt="A collaborative workspace representing the start of a project"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/65 via-obsidian-900/5 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  Better together
                </span>
                <p className="mt-2 max-w-sm font-brand-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl">
                  Your idea is the starting point. We help you take it further.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 right-5 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-premium-md sm:-right-5 sm:px-5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand-electric text-white">
                <ArrowUpRight size={18} />
              </span>
              <div>
                <p className="text-xs font-bold text-foreground">
                  Four simple steps
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  One shared direction
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
