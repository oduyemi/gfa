"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquareText, MessagesSquare, Compass, Check, ArrowRight } from "lucide-react";
import { ContactDialog } from "@/dialogs/contact-dialog";

const steps = [
  {
    number: "01",
    title: "First, we listen.",
    description:
      "We take time to understand what you're looking for, the context behind it, and what a successful outcome means to you.",
    detail: "Your ideas. Your priorities.",
    label: "Understand",
    icon: MessageSquareText,
    accent: "blue",
  },
  {
    number: "02",
    title: "Then, we connect.",
    description:
      "We'll get in touch, ask the right questions, and explore how our expertise, services and approach can meet your needs.",
    detail: "The right people. The right approach.",
    label: "Connect",
    icon: MessagesSquare,
    accent: "gold",
  },
  {
    number: "03",
    title: "Finally, we plan.",
    description:
      "If we're a good fit, we'll outline the scope, expectations, timeline and next steps, giving everyone a clear way forward.",
    detail: "A clear direction. A shared plan.",
    label: "Plan",
    icon: Compass,
    accent: "lilac",
  },
];

const accentStyles = {
  blue: {
    text: "text-brand-electric",
    background: "bg-brand-electric",
    soft: "bg-brand-electric/10",
    border: "border-brand-electric/30",
  },
  gold: {
    text: "text-brand-gold",
    background: "bg-brand-gold",
    soft: "bg-brand-gold/10",
    border: "border-brand-gold/30",
  },
  lilac: {
    text: "text-[#B9B5E8]",
    background: "bg-[#B9B5E8]",
    soft: "bg-[#B9B5E8]/10",
    border: "border-[#B9B5E8]/30",
  },
};

export const ContactExpectations = () => {
  const reduceMotion = useReducedMotion();
  const [dialogType, setDialogType] = useState<
    "creation" | "execution" | "assistance" | "general" | null
  >(null);

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.6 },
  };

  return (
    <>
      <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
        <div className="brand-container">
          {/* Editorial introduction */}
          <motion.div
            {...reveal}
            className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 lg:pb-14"
          >
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="size-2 rounded-full bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  After you reach out
                </span>
              </div>

              <h2 className="max-w-3xl font-brand-display text-[clamp(2.8rem,5.8vw,5.25rem)] font-semibold leading-[0.97] tracking-[-0.075em] text-foreground">
                A good conversation.
                <span className="block brand-gradient-text">
                  A clear way forward.
                </span>
              </h2>
            </div>

            <div className="max-w-lg lg:justify-self-end lg:pb-2">
              <p className="text-sm leading-8 text-muted-foreground sm:text-base">
                Reaching out is the beginning, not a commitment.
                We'll take time to understand your needs, explore
                what's possible and help you feel confident about
                what comes next.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-9 bg-brand-electric" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Thoughtful. Collaborative. Clear.
                </span>
              </div>
            </div>
          </motion.div>

          {/* The client journey */}
          <div className="mt-12 lg:mt-16">
            <motion.div
              {...reveal}
              className="mb-7 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  How we'll move forward
                </span>
              </div>

              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/60">
                THREE SIMPLE STEPS
              </span>
            </motion.div>

            <div className="relative overflow-hidden bg-obsidian-900 text-white">
              {/* Background details */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-40 size-[440px] rounded-full border border-white/[0.06]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-24 size-[300px] rounded-full border border-white/[0.05]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-48 left-[35%] size-[400px] rounded-full bg-brand-electric/[0.10] blur-[110px]"
              />

              <div className="relative grid lg:grid-cols-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const accent =
                    accentStyles[step.accent as keyof typeof accentStyles];

                  return (
                    <motion.article
                      key={step.number}
                      initial={
                        reduceMotion ? false : { opacity: 0, y: 24 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.55,
                        delay: reduceMotion ? 0 : index * 0.12,
                      }}
                      className={`relative flex flex-col px-6 py-8 sm:px-9 sm:py-10 lg:min-h-[390px] lg:px-9 lg:py-10 xl:px-11 ${
                        index !== 0
                          ? "border-t border-white/10 lg:border-l lg:border-t-0"
                          : ""
                      }`}
                    >
                      {/* Number and stage */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-bold tracking-[0.15em] ${accent.text}`}
                        >
                          / {step.number}
                        </span>

                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                          {step.label}
                        </span>
                      </div>

                      {/* Icon and connecting line */}
                      <div className="mt-10 flex items-center gap-4">
                        <div
                          className={`flex size-12 shrink-0 items-center justify-center border ${accent.border} ${accent.soft} ${accent.text}`}
                        >
                          <Icon size={21} strokeWidth={1.6} />
                        </div>

                        <div className="h-px flex-1 bg-white/10">
                          <div
                            className={`h-px w-1/3 ${accent.background}`}
                          />
                        </div>
                      </div>

                      {/* Main content */}
                      <div className="mt-8">
                        <h3 className="font-brand-display text-2xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-3xl">
                          {step.title}
                        </h3>

                        <p className="mt-5 max-w-sm text-[13px] leading-7 text-white/55 sm:text-sm">
                          {step.description}
                        </p>
                      </div>

                      {/* Bottom statement */}
                      <div className="mt-auto pt-9">
                        <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                          <span
                            className={`size-1.5 rounded-full ${accent.background}`}
                          />

                          <span className="text-xs font-medium text-white/65">
                            {step.detail}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* Journey footer */}
              <div className="relative flex flex-col gap-4 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9 lg:px-11">
                <p className="text-xs leading-6 text-white/45">
                  Every step is shaped around your needs, with clarity
                  before commitment.
                </p>

                <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                  <Check size={12} className="text-brand-gold" />
                  No unnecessary complications
                </span>
              </div>
            </div>
          </div>

          {/* Reassurance and CTA */}
          <motion.div
            {...reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.1,
            }}
            className="mt-7 flex flex-col gap-7 border border-border bg-card p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10"
          >
            <div>
              <h3 className="font-brand-display text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                No pressure. No obligation. Just a starting point.
              </h3>

              <p className="mt-2 max-w-2xl text-xs leading-7 text-muted-foreground sm:text-sm">
                You don't need a perfect brief or every detail
                figured out. We're happy to help you explore your
                options before making any decisions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDialogType("general")}
              className="group inline-flex w-fit shrink-0 items-center justify-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-xs font-bold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-electric hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4"
            >
              Start a conversation
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </div>
      </section>

      <ContactDialog
        type={dialogType}
        onClose={() => setDialogType(null)}
      />
    </>
  );
};
