"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { homeSteps } from "./home-data";
import { HomeSection } from "./HomeSection";



const stepAccents = [
  {
    text: "text-brand-electric",
    bg: "bg-brand-electric",
    soft: "bg-brand-electric/10",
    border: "border-brand-electric/25",
  },
  {
    text: "text-brand-gold",
    bg: "bg-brand-gold",
    soft: "bg-brand-gold/10",
    border: "border-brand-gold/30",
  },
  {
    text: "text-[#A78BFA] dark:text-[#B9A6FF]",
    bg: "bg-[#A78BFA]",
    soft: "bg-[#A78BFA]/10",
    border: "border-[#A78BFA]/30",
  },
  {
    text: "text-[#D77C9A] dark:text-[#E99AB3]",
    bg: "bg-[#D77C9A]",
    soft: "bg-[#D77C9A]/10",
    border: "border-[#D77C9A]/30",
  },
];

const transition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const HowItWorksPreview = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <HomeSection
      id="how-it-works"
      eyebrow="A clear path forward"
      title={
        <>
          From first conversation{" "}
          <span className="brand-gradient-text">to forward motion.</span>
        </>
      }
      description="A straightforward process designed to keep you informed, involved, and moving in the right direction."
      className="bg-surface-subtle"
    >
      <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-electric">
            Your journey with GFA
          </p>
          <h3 className="mt-2 font-brand-display text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
            Four stages. One shared goal.
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="grid size-7 place-items-center rounded-full border border-border bg-card">
            <Check size={13} className="text-brand-electric" />
          </span>
          <span>Clear from the start. Focused on the outcome.</span>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[11%] right-[11%] top-[35px] hidden h-px bg-border lg:block"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="h-full origin-left bg-gradient-to-r from-brand-electric via-brand-gold to-[#A78BFA]"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {homeSteps.map((step, index) => {
            const accent = stepAccents[index] ?? stepAccents[0];
            const isFirst = index === 0;

            return (
              <motion.article
                key={step.number}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 26 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  ...transition,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
                className="group relative"
              >
                <div
                  className={`relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[1.75rem] border p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-premium-md sm:p-7 ${
                    isFirst
                      ? "border-brand-electric/30 bg-card shadow-[0_12px_40px_-28px_rgba(18,101,244,0.4)]"
                      : "border-border bg-card/70 hover:border-brand-electric/25"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full blur-3xl transition-opacity duration-500 ${
                      isFirst
                        ? "bg-brand-electric/15 opacity-100"
                        : "bg-brand-electric/10 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`grid size-[54px] place-items-center rounded-[18px] border transition-all duration-500 group-hover:rotate-[-5deg] ${
                        isFirst
                          ? "border-brand-electric bg-brand-electric text-white shadow-lg shadow-brand-electric/20"
                          : `${accent.border} ${accent.soft} ${accent.text}`
                      }`}
                    >
                      <span className="font-brand-display text-xl font-bold">
                        {step.number}
                      </span>
                    </div>

                    <span className="pt-2 text-[9px] font-bold uppercase tracking-[0.17em] text-muted-foreground">
                      0{index + 1} / 04
                    </span>
                  </div>

                  <div className="relative mt-9">
                    <p
                      className={`mb-3 text-[9px] font-bold uppercase tracking-[0.2em] ${
                        isFirst ? "text-brand-electric" : "text-muted-foreground"
                      }`}
                    >
                      Stage {index + 1}
                    </p>

                    <h4 className="font-brand-display text-[1.55rem] font-semibold leading-tight tracking-[-0.045em] text-foreground transition-colors duration-300 group-hover:text-brand-electric sm:text-[1.7rem]">
                      {step.title}
                    </h4>

                    <p className="mt-3 text-[13px] leading-[1.85] text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="relative mt-auto flex items-center justify-between border-t border-border/80 pt-5 mt-7">
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      {isFirst ? "Let's get acquainted" : "Moving forward"}
                    </span>

                    <span
                      className={`grid size-8 place-items-center rounded-full transition-all duration-300 ${
                        isFirst
                          ? "bg-brand-electric text-white"
                          : "bg-surface-subtle text-muted-foreground group-hover:bg-brand-electric group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>

                {index < homeSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center lg:hidden"
                  >
                    <div className="grid size-7 place-items-center rounded-full border border-border bg-background text-brand-electric shadow-sm">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...transition, delay: 0.15 }}
        className="relative mt-12 overflow-hidden rounded-[1.75rem] bg-brand-obsidian px-6 py-7 text-white sm:px-9 sm:py-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-32 size-80 rounded-full bg-brand-electric/25 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-[35%] size-56 rounded-full bg-brand-gold/10 blur-[80px]"
        />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">
                Your next move
              </span>
            </div>

            <h3 className="font-brand-display text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
              Good things start with a conversation.
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/55">
              No guesswork. No unnecessary complexity. Just a clear way to
              move your project forward.
            </p>
          </div>

          <Link
            href="/how-it-works"
            className="group inline-flex min-h-[52px] shrink-0 items-center justify-center gap-4 rounded-full bg-brand-gold px-6 text-sm font-bold text-brand-obsidian transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            See how it works
            <span className="grid size-7 place-items-center rounded-full bg-brand-obsidian/10 transition-transform duration-300 group-hover:translate-x-1">
              <MoveUpRight size={15} />
            </span>
          </Link>
        </div>
      </motion.div>
    </HomeSection>
  );
};
