"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, MessageCircle, Send } from "lucide-react";
import { ContactDialog } from "@/dialogs/contact-dialog";

const brandPoints = [
  { number: "01", title: "Creative" },
  { number: "02", title: "Digital" },
  { number: "03", title: "Strategic" },
  { number: "04", title: "Support" },
];

const assurances = [
  "People-first approach",
  "Expertise that connects",
  "Support that moves you",
];

export const AboutHero = () => {
  const shouldReduceMotion = useReducedMotion();

  const [dialogType, setDialogType] = useState<
    "creation" | "execution" | "assistance" | "general" | null
  >(null);

  const fadeUp = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.65,
      ease: "easeOut" as const,
    },
  };

  return (
    <>
      <section className="relative overflow-hidden bg-background pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 size-[32rem] rounded-full bg-brand-electric/[0.045] blur-[110px]"
        />

        <div className="brand-container relative">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-16">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeUp}
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Go Far Agency / About Us
                </span>
              </div>

              <h1 className="font-brand-display text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                More than
                <br />
                services.
                <br />
                <span className="brand-gradient-text">
                  We're here
                  <br />
                  to help you
                  <br className="hidden xl:block" />
                  go far.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                Good ideas deserve the right people, the right
                support and room to grow. We bring creative
                expertise, digital strategy and practical support
                together to help you turn possibilities into
                progress.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#our-story"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brand-electric px-7 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(18,101,244,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-electric-700 hover:shadow-[0_12px_28px_rgba(18,101,244,0.23)]"
                >
                  Get to know us
                  <ArrowDown
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setDialogType("general")}
                  className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand-electric hover:text-brand-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2"
                >
                  Let's talk
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3">
                {assurances.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#E7E6F7] text-obsidian-900">
                      <Check size={10} strokeWidth={2.7} />
                    </span>

                    <span className="text-xs font-medium text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.97,
                y: shouldReduceMotion ? 0 : 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.75,
                delay: shouldReduceMotion ? 0 : 0.15,
                ease: "easeOut",
              }}
              className="relative pb-5 sm:pb-7 lg:pb-6"
            >
              <div className="group relative min-h-[440px] overflow-hidden rounded-[2rem] bg-obsidian-900 shadow-premium-md sm:min-h-[540px] lg:min-h-[610px]">
                <Image
                  src="/images/abouthero.jpg"
                  alt="Creative collaboration and the people behind ideas and projects at Go Far Agency"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/85 via-obsidian-900/10 to-obsidian-900/15" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian-900/15 via-transparent to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-7">
                  <div className="rounded-full border border-white/25 bg-obsidian-900/25 px-4 py-2 backdrop-blur-md">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      People. Ideas. Possibilities.
                    </span>
                  </div>

                  <div className="flex size-11 items-center justify-center rounded-full bg-brand-gold text-obsidian-900 shadow-lg transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={19} />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 pb-9 sm:p-8 sm:pb-11 lg:p-10 lg:pb-12">
                  <div className="max-w-lg">
                    <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      <span className="h-px w-7 bg-brand-gold" />
                      The Go Far mindset
                    </p>

                    <p className="mt-4 font-brand-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-[2.75rem]">
                      Good ideas deserve
                      <br />
                      the right people
                      <br />
                      behind them.
                    </p>

                    <p className="mt-5 text-xs font-medium tracking-wide text-white/70">
                      Different strengths. Shared ambition.
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : 0.5,
                }}
                className="relative z-10 mx-4 -mt-5 sm:mx-8 lg:absolute lg:-bottom-1 lg:-left-7 lg:mx-0 lg:mt-0 lg:w-[300px]"
              >
                <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-premium-md sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-muted-foreground">
                        What brings us together
                      </p>

                      <h2 className="mt-1 font-heading text-base font-semibold tracking-[-0.02em] text-foreground">
                        Different strengths.
                      </h2>
                    </div>

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E7E6F7] text-obsidian-900">
                      <MessageCircle size={18} />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {brandPoints.map((point, index) => (
                      <div key={point.number}>
                        <div
                          className={`mb-2 h-1 rounded-full transition-colors ${
                            index === 0
                              ? "bg-brand-electric"
                              : "bg-border"
                          }`}
                        />

                        <p className="text-[9px] font-semibold tabular-nums text-muted-foreground">
                          {point.number}
                        </p>

                        <p className="mt-1 text-[9px] font-semibold leading-4 text-foreground sm:text-[10px]">
                          {point.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2.5 border-t border-border pt-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-electric text-white">
                      <Send size={13} />
                    </div>

                    <p className="text-[11px] leading-4 text-muted-foreground">
                      One partner. A world of possibilities.
                    </p>

                    <ArrowRight
                      size={14}
                      className="ml-auto shrink-0 text-brand-electric"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactDialog
        type={dialogType}
        onClose={() => setDialogType(null)}
      />
    </>
  );
};
