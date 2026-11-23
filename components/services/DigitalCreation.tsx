"use client";
import { useState } from "react";
import { ContactDialog } from "@/dialogs/contact-dialog";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  FileText,
  Palette,
  Search,
  Video,
  Wallet,
  MoveUpRight,
} from "lucide-react";

const creativeServices = [
  {
    number: "01",
    title: "Graphic Design",
    description:
      "Visual identities, marketing materials and branded designs that help your business communicate with clarity.",
    icon: Palette,
    examples: ["Brand assets", "Marketing designs", "Digital graphics"],
    category: "Visual communication",
  },
  {
    number: "02",
    title: "Web Design & Development",
    description:
      "Thoughtful, responsive websites and digital experiences designed around your goals and your audience.",
    icon: Code2,
    examples: ["Business websites", "Landing pages", "Web applications"],
    category: "Digital experiences",
  },
  {
    number: "03",
    title: "Video Editing",
    description:
      "Engaging video content shaped for your message, audience and platform, from short-form edits to longer productions.",
    icon: Video,
    examples: ["Reels", "Promotional videos", "Long-form content"],
    category: "Video production",
  },
  {
    number: "04",
    title: "Content Creation & Writing",
    description:
      "Clear, purposeful content that communicates your ideas and gives your brand a consistent voice.",
    icon: FileText,
    examples: ["Website copy", "Captions", "Articles", "Content assets"],
    category: "Words & storytelling",
  },
  {
    number: "05",
    title: "Service Provider Sourcing",
    description:
      "Help finding suitable professionals and creative partners to bring the right skills into your project.",
    icon: Search,
    examples: ["Creative talent", "Technical specialists", "Project support"],
    category: "Finding the right people",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const DigitalCreation = () => {
  const reduceMotion = useReducedMotion();
  const [dialogType, setDialogType] = useState<"creation" | "execution" | "assistance" | "general" | null>(null);

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      ease,
    },
  };

  return (
    <section
      id="digital-creation"
      className="relative isolate scroll-mt-24 overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-[10%] -z-10 size-[36rem] rounded-full bg-brand-electric/[0.045] blur-[130px]"
      />

      <div className="brand-container">
        <motion.div
          {...reveal}
          className="grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
        >
          <div>
            <div className="mb-7 flex items-center gap-3">
              <p className="brand-eyebrow">01 / Digital Creation</p>
            </div>

            <h2 className="max-w-4xl font-brand-display text-[3.3rem] font-semibold leading-[0.94] tracking-[-0.075em] text-foreground sm:text-6xl lg:text-[5.5rem] xl:text-[6.2rem]">
              From idea
              <br />
              to{" "}
              <span className="brand-gradient-text">something</span>
              <br />
              extraordinary.
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end lg:pb-3">
            <p className="text-base leading-8 text-muted-foreground">
              From the first sketch to the final launch, we bring creative
              thinking, practical skills and technical expertise together
              to turn your ideas into meaningful work.
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
              <div>
                <p className="text-xs font-bold text-foreground">
                  Design. Build. Bring your ideas to life.
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Creative thinking meets practical execution.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-14 overflow-hidden rounded-[1.8rem] bg-obsidian-900 text-white shadow-premium-md sm:mt-20 lg:mt-24 lg:rounded-[2.2rem]"
        >
          <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
            <div className="group relative min-h-[390px] overflow-hidden sm:min-h-[490px] lg:min-h-[590px]">
              <Image
                src="/images/services/creative_work.jpg"
                alt="Creative digital work and design"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/15 to-obsidian-900/5" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian-900/15" />

              <div className="absolute left-6 top-6 sm:left-9 sm:top-9">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/25 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                  <span className="size-1.5 rounded-full bg-brand-gold" />
                  Ideas made tangible
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10 lg:p-12">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  Imagine it / Create it / Share it
                </p>

                <h3 className="max-w-xl font-brand-display text-3xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-4xl lg:text-[3.5rem]">
                  Your next big idea deserves to exist.
                </h3>

                <div className="mt-7 flex items-center gap-3">
                  <span className="h-px w-10 bg-brand-gold" />
                  <span className="text-xs font-medium text-white/70">
                    Make something that moves you forward.
                  </span>
                </div>
              </div>

              <span className="absolute right-7 top-7 hidden size-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md sm:grid">
                <MoveUpRight size={20} />
              </span>
            </div>

            <div className="relative flex flex-col justify-between p-7 sm:p-10 lg:p-12 xl:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand-electric/15 blur-[100px]"
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    The creative process
                  </p>
                  <span className="font-mono text-xs text-white/35">
                    01 — 05
                  </span>
                </div>

                <h3 className="mt-9 max-w-md font-brand-display text-3xl font-semibold leading-[1.1] tracking-[-0.05em] sm:text-4xl">
                  Good ideas need the right people behind them.
                </h3>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
                  Need a new brand identity, a website, compelling content
                  or the right creative professionals? We help you bring
                  the right pieces together and move from concept to
                  completion.
                </p>

                <div className="mt-8 space-y-3 border-t border-white/15 pt-7">
                  {[
                    "Creative and visual expertise",
                    "Technical design and development",
                    "Practical support from concept to delivery",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-electric/20 text-brand-gold">
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      <span className="text-xs font-medium text-white/75">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-12 border-t border-white/15 pt-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-electric text-white">
                    <Wallet size={19} />
                  </span>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Project-based engagement
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      Defined scope. Clear deliverables. Agreed timeline.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-brand-display text-5xl font-semibold tracking-[-0.065em] text-brand-gold">
                      50%
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/55">
                      Initial deposit to secure your project
                    </p>
                  </div>

                  <Link
                    href="/contact/#contact-form"
                    className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-white px-6 text-sm font-bold text-obsidian-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold"
                  >
                    Start a project
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-24 sm:mt-28 lg:mt-32">
          <motion.div
            {...reveal}
            className="mb-10 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="brand-eyebrow mb-4">What we can create</p>
              <h3 className="max-w-2xl font-brand-display text-3xl font-semibold leading-[1.05] tracking-[-0.055em] text-foreground sm:text-4xl lg:text-5xl">
                The skills to bring it all together.
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-muted-foreground lg:pb-1">
              One creative partner, multiple ways to move your project
              forward.
            </p>
          </motion.div>

          <div className="border-t border-border">
            {creativeServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : index * 0.06,
                    ease,
                  }}
                  className="group grid gap-5 border-b border-border py-7 transition-colors duration-300 hover:bg-surface-subtle/60 sm:py-9 lg:grid-cols-[70px_1fr_1.1fr_40px] lg:items-center lg:gap-8 lg:py-10 lg:px-5"
                >
                  <div className="flex items-center gap-4 lg:block">
                    <span className="font-mono text-xs font-semibold tabular-nums text-muted-foreground">
                      {service.number}
                    </span>

                    <span className="grid size-10 place-items-center rounded-xl bg-brand-electric/10 text-brand-electric transition-all duration-300 group-hover:bg-brand-electric group-hover:text-white">
                      <Icon size={19} strokeWidth={1.7} />
                    </span>

                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground lg:hidden">
                      {service.category}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 hidden text-[9px] font-bold uppercase tracking-[0.17em] text-brand-electric lg:block">
                      {service.category}
                    </p>

                    <h4 className="max-w-sm font-brand-display text-xl font-semibold leading-tight tracking-[-0.045em] text-foreground transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl lg:text-[1.7rem]">
                      {service.title}
                    </h4>
                  </div>

                  <div>
                    <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                      {service.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.examples.map((example) => (
                        <span
                          key={example}
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors group-hover:border-brand-electric/20"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden justify-end lg:flex">
                    <span className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          {...reveal}
          className="relative mt-14 overflow-hidden rounded-[1.65rem] border border-brand-electric/20 bg-brand-electric/[0.045] sm:mt-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-32 size-72 rounded-full border border-brand-electric/10"
          >
            <div className="absolute inset-8 rounded-full border border-brand-electric/[0.08]" />
            <div className="absolute inset-16 rounded-full border border-brand-electric/[0.06]" />
          </div>

          <div className="relative flex flex-col gap-7 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-electric text-white shadow-sm">
                <Check size={20} />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-electric">
                  How we work
                </p>

                <h4 className="mt-2 font-brand-display text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                  A clear start. A considered process.
                </h4>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                  We agree on the scope, deliverables and timeline before
                  work begins. A 50% deposit secures your project, with
                  the remaining balance handled according to the agreed
                  payment schedule.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDialogType("creation")}
              className="group inline-flex min-h-11 shrink-0 items-center gap-3 self-start text-sm font-bold text-brand-electric transition-all hover:gap-4 sm:self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4"
            >
              Discuss your idea
              <ArrowDownRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </button>
          </div>
        </motion.div>
      </div>
      <ContactDialog
      type={dialogType}
      onClose={() => setDialogType(null)}
    />
    </section>
  );
};
