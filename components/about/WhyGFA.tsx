"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Compass, Layers3, UsersRound, MoveUpRight } from "lucide-react";
import { homePrinciples } from "../home/home-data";
import { HomeSection } from "../home/HomeSection";


const principleIcons = [Compass, UsersRound, Layers3];
const transition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const WhyGFA = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <HomeSection
      eyebrow="Why GFA"
      title={
        <>
          A partner who sees{" "}
          <span className="brand-gradient-text">the bigger picture.</span>
        </>
      }
      description="We believe the best solutions come from understanding the whole challenge, bringing the right people together, and keeping the outcome in focus."
      className="bg-background"
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        {/* Brand statement */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={transition}
          className="group relative isolate flex min-h-[480px] flex-col overflow-hidden rounded-[2rem] bg-brand-obsidian p-7 text-white shadow-premium-md sm:p-9 lg:min-h-[560px] lg:p-10"
        >
          {/* Atmospheric background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 size-[340px] rounded-full bg-brand-electric/25 blur-[90px]" />
            <div className="absolute -bottom-24 -left-20 size-[300px] rounded-full bg-brand-gold/10 blur-[90px]" />

            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          </div>

          {/* Decorative orbit */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 top-[18%] size-[360px] rounded-full border border-white/[0.07] transition-transform duration-1000 group-hover:rotate-12"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 top-[27%] size-[230px] rounded-full border border-brand-electric/35"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[4.5rem] top-[42%] size-3 rounded-full bg-brand-gold shadow-[0_0_28px_rgba(244,190,40,0.8)]"
          />

          {/* Top label */}
          <div className="relative flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm sm:text-[10px]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-brand-gold opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-gold" />
              </span>
              The GFA difference
            </span>

            <span className="font-heading text-[10px] font-semibold tracking-[0.18em] text-white/35">
              01 <span className="mx-1 text-brand-gold/70">/</span> 03
            </span>
          </div>

          {/* Main message */}
          <div className="relative z-10 mt-auto pt-24 sm:pt-32">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-gold" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">
                Our point of view
              </span>
            </div>

            <h3 className="max-w-[440px] font-brand-display text-[clamp(2.7rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.065em]">
              Good work starts with{" "}
              <span className="text-brand-gold">
                seeing what&apos;s possible.
              </span>
            </h3>

            <p className="mt-6 max-w-[370px] text-sm leading-[1.9] text-white/60">
              We look beyond the immediate task. We connect the dots between
              your ambitions, the people involved, and what it takes to get
              there.
            </p>
          </div>

          {/* Bottom signature */}
          <div className="relative mt-10 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                The way we work
              </p>
              <p className="mt-1.5 text-xs font-medium text-white/75">
                People. Perspective. Progress.
              </p>
            </div>

            <div className="grid size-11 shrink-0 place-items-center rounded-full border border-brand-gold/40 bg-brand-gold/10 text-brand-gold transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-gold group-hover:text-brand-obsidian">
              <MoveUpRight size={19} />
            </div>
          </div>
        </motion.div>

        {/* Principles column */}
        <div className="flex flex-col rounded-[2rem] border border-border/80 bg-card/40 p-6 sm:p-8 lg:p-9">
          {/* Section heading */}
          <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-electric">
                How we think
              </p>
              <h3 className="mt-2 font-brand-display text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
                What sets us apart.
              </h3>
            </div>

            <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-border bg-surface-subtle text-brand-electric">
              <Layers3 size={19} strokeWidth={1.7} />
            </div>
          </div>

          {/* Principles */}
          <div className="flex-1 divide-y divide-border">
            {homePrinciples.map((item, index) => {
              const Icon = principleIcons[index] ?? Check;

              return (
                <motion.article
                  key={item.number}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, x: 22 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    ...transition,
                    delay: prefersReducedMotion ? 0 : index * 0.1,
                  }}
                  className="group relative grid grid-cols-[48px_1fr] gap-4 py-7 first:pt-7 last:pb-7 sm:grid-cols-[56px_1fr_auto] sm:gap-5"
                >
                  {/* Icon */}
                  <div className="relative">
                    <div className="relative z-10 grid size-11 place-items-center rounded-[15px] border border-border bg-background text-brand-electric shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-electric/30 group-hover:bg-brand-electric group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-electric/15 sm:size-12">
                      <Icon size={20} strokeWidth={1.7} />
                    </div>

                    {index !== homePrinciples.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-14 hidden h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-border sm:block"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="font-heading text-[10px] font-bold tracking-[0.16em] text-brand-electric">
                        {item.number}
                      </span>
                      <span className="h-px w-5 bg-brand-gold/70 transition-all duration-300 group-hover:w-9" />
                    </div>

                    <h4 className="font-heading text-lg font-semibold tracking-[-0.025em] text-foreground transition-colors duration-300 group-hover:text-brand-electric sm:text-xl">
                      {item.title}
                    </h4>

                    <p className="mt-2 max-w-[440px] text-[13px] leading-[1.85] text-muted-foreground sm:text-sm">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover detail */}
                  <div className="hidden pt-1 sm:block">
                    <div className="grid size-8 place-items-center rounded-full text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-brand-electric/10 group-hover:text-brand-electric">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Closing statement */}
          <div className="mt-auto border-t border-border pt-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-gold/15 text-brand-gold">
                <Check size={14} strokeWidth={2.5} />
              </div>

              <p className="max-w-lg text-sm leading-[1.8] text-muted-foreground">
                Not just another service provider. A thoughtful partner in
                making{" "}
                <span className="font-semibold text-foreground">
                  meaningful progress.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeSection>
  );
};
