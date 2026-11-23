
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  Database,
  Workflow,
  Layers3,
  ArrowDownRight,
  Sparkles,
  UsersRound,
  ArrowUpRight,
} from "lucide-react";
import { HomeSection } from "../home/HomeSection";

const storyHighlights = [
  {
    number: "01",
    phase: "Where it began",
    title: "A foundation in delivery",
    description:
      "Our in-house management team began their careers contracting for corporate organisations, working across project management, quality assurance, complaints and compliance.",
    icon: BriefcaseBusiness,
    accent: "blue",
    emphasis: "Experience built through doing.",
  },
  {
    number: "02",
    phase: "How it expanded",
    title: "A wider network of expertise",
    description:
      "That experience grew into supporting boutique entrepreneurs, SMEs and creatives. Along the way, we built a trusted database of quality service providers and developed the ability to manage projects across industries and stakeholder groups.",
    icon: Database,
    accent: "gold",
    emphasis: "The right people, brought together.",
  },
  {
    number: "03",
    phase: "What brought it together",
    title: "A more effective way to work",
    description:
      "The founder's passion for technology and its potential to continually improve business operations brought these experiences together — and led to the creation of GFA.",
    icon: Workflow,
    accent: "lilac",
    emphasis: "A better way to move forward.",
  },
] as const;

const accentStyles = {
  blue: {
    icon: "bg-brand-electric/10 text-brand-electric",
    number: "text-brand-electric",
    marker: "bg-brand-electric",
    glow: "group-hover:shadow-[0_0_0_5px_rgba(18,101,244,0.08)]",
    emphasis: "text-brand-electric",
  },
  gold: {
    icon: "bg-brand-gold/15 text-obsidian-900",
    number: "text-obsidian-900/65 dark:text-brand-gold",
    marker: "bg-brand-gold",
    glow: "group-hover:shadow-[0_0_0_5px_rgba(244,190,40,0.10)]",
    emphasis: "text-obsidian-900/70 dark:text-brand-gold",
  },
  lilac: {
    icon: "bg-[#E7E6F7] text-[#34315D]",
    number: "text-[#7772B3]",
    marker: "bg-[#B9B5E8]",
    glow: "group-hover:shadow-[0_0_0_5px_rgba(185,181,232,0.13)]",
    emphasis: "text-[#7772B3] dark:text-[#C5C1F0]",
  },
};

const principles = [
  {
    number: "01",
    label: "People",
    description: "The right expertise",
    color: "bg-brand-electric",
  },
  {
    number: "02",
    label: "Process",
    description: "A thoughtful approach",
    color: "bg-brand-gold",
  },
  {
    number: "03",
    label: "Progress",
    description: "Meaningful outcomes",
    color: "bg-[#B9B5E8]",
  },
];

export const AboutIntro = () => {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.13,
      },
    },
  };

  const itemReveal = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <HomeSection
      id="our-story"
      className="relative overflow-hidden bg-background"
    >
      <div className="relative">
        {/* Introduction */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="relative grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:pb-14"
        >
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                Our story
              </span>
              <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground/45">
                / A little about us
              </span>
            </div>

            <h2 className="max-w-3xl font-brand-display text-[clamp(2.8rem,5.8vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-foreground">
              Built on experience.
              <span className="mt-3 block brand-gradient-text">
                Shaped around making work easier.
              </span>
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end lg:pb-2">
            <span className="mb-4 block h-8 w-px bg-brand-electric/50" />
            <p className="text-sm leading-[2] text-muted-foreground sm:text-[15px]">
              GFA grew from hands-on experience managing projects,
              solving operational challenges and bringing the right
              people together. What began in the corporate contracting
              space evolved into a wider mission: helping businesses
              and projects move forward with the right expertise,
              structure and support.
            </p>
          </div>
        </motion.div>

        {/* Story and timeline */}
        <div className="grid gap-14 pt-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20 lg:pt-16 xl:gap-28">
          {/* Perspective column */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="relative lg:sticky lg:top-28 lg:self-start"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
                <Layers3 size={16} strokeWidth={1.8} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                How GFA came to be
              </span>
            </div>

            <h3 className="mt-7 max-w-md font-brand-display text-[clamp(2.4rem,4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.07em] text-foreground">
              Different experiences.
              <span className="mt-2 block text-foreground/35">
                One connected purpose.
              </span>
            </h3>

            <p className="mt-6 max-w-md text-sm leading-[2] text-muted-foreground sm:text-[15px]">
              Working with people from different backgrounds and
              across different industries taught us that good
              outcomes depend on more than one skill or service.
              They depend on how everything — people, expertise,
              processes and technology — works together.
            </p>

            {/* Principles */}
            <div className="mt-9 border-t border-border pt-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  The thinking behind our approach
                </span>
                <ArrowDownRight
                  size={15}
                  className="text-brand-electric"
                />
              </div>

              <div className="space-y-4">
                {principles.map((principle) => (
                  <div
                    key={principle.number}
                    className="group flex items-center gap-4"
                  >
                    <span
                      className={`size-2 shrink-0 rounded-full ${principle.color} transition-transform duration-300 group-hover:scale-150`}
                    />

                    <span className="w-[4.5rem] text-sm font-semibold text-foreground">
                      {principle.label}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {principle.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Small signature */}
            <div className="mt-9 hidden items-center gap-3 border-t border-border pt-6 lg:flex">
              <div className="flex size-9 items-center justify-center rounded-full border border-border text-brand-electric">
                <UsersRound size={15} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Better, together.
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  The foundation of how we work.
                </p>
              </div>
            </div>
          </motion.aside>

          {/* Journey column */}
          <div className="min-w-0">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  The journey so far
                </span>
                <p className="mt-1.5 text-xs text-muted-foreground/65">
                  The experiences that shaped us.
                </p>
              </div>

              <span className="shrink-0 font-mono text-[10px] font-medium tracking-[0.12em] text-muted-foreground/60">
                01 — 03
              </span>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="relative"
            >
              {/* Timeline rail */}
              <div
                aria-hidden="true"
                className="absolute bottom-14 left-[20px] top-5 w-px bg-gradient-to-b from-brand-electric/50 via-brand-gold/50 to-[#B9B5E8]/50 sm:left-[25px]"
              />

              <div className="space-y-9 sm:space-y-12">
                {storyHighlights.map((item, index) => {
                  const Icon = item.icon;
                  const accent = accentStyles[item.accent];

                  return (
                    <motion.article
                      key={item.number}
                      variants={itemReveal}
                      className="group relative grid grid-cols-[42px_1fr] gap-4 sm:grid-cols-[52px_1fr] sm:gap-6"
                    >
                      {/* Timeline node */}
                      <div className="relative z-10 flex justify-center pt-1">
                        <span
                          className={`flex size-10 items-center justify-center rounded-full border-[5px] border-background ${accent.marker} transition-shadow duration-300 sm:size-[3.25rem] ${accent.glow}`}
                        >
                          <span className="size-1.5 rounded-full bg-white/90" />
                        </span>
                      </div>

                      {/* Milestone */}
                      <div className="min-w-0 pb-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span
                            className={`font-mono text-[10px] font-bold tabular-nums ${accent.number}`}
                          >
                            {item.number}
                          </span>

                          <span className="h-px w-6 bg-border" />

                          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            {item.phase}
                          </span>
                        </div>

                        <div className="mt-4 flex items-start gap-4 sm:gap-5">
                          <div
                            className={`flex size-11 shrink-0 items-center justify-center rounded-[1rem] ${accent.icon} transition-transform duration-300 group-hover:-translate-y-1 sm:size-[3.25rem]`}
                          >
                            <Icon size={21} strokeWidth={1.65} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="font-brand-display text-xl font-semibold leading-[1.12] tracking-[-0.045em] text-foreground sm:text-[1.7rem]">
                              {item.title}
                            </h4>

                            <p className="mt-3 text-[13px] leading-[1.95] text-muted-foreground sm:text-sm">
                              {item.description}
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                              <span
                                className={`h-px w-5 ${accent.marker}`}
                              />
                              <span
                                className={`text-[10px] font-semibold tracking-[0.02em] ${accent.emphasis}`}
                              >
                                {item.emphasis}
                              </span>
                            </div>
                          </div>
                        </div>

                        {index !== storyHighlights.length - 1 && (
                          <div className="mt-8 h-px w-full bg-border/70 sm:mt-10" />
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="group relative mt-16 overflow-hidden rounded-[1.75rem] bg-obsidian-900 px-7 py-9 text-white sm:mt-20 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        >
          {/* Ambient details */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-36 size-96 rounded-full border border-white/[0.07] transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-20 size-64 rounded-full border border-white/[0.05]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-[28%] size-80 rounded-full bg-brand-electric/20 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-[20%] h-px w-1/3 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"
          />

          <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="text-[9px] font-bold uppercase tracking-[0.23em] text-white/45">
                  What drives us today
                </span>
              </div>

              <p className="mt-6 font-brand-display text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.065em]">
                Making businesses and projects easier to manage,
                <span className="text-brand-gold">
                  {" "}one meaningful partnership at a time.
                </span>
              </p>
            </div>

            <div className="flex items-center justify-between gap-5 border-t border-white/10 pt-5 lg:min-w-[180px] lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="lg:text-right">
                <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                  We are
                </span>
                <span className="mt-2 block font-brand-display text-lg font-semibold tracking-[-0.04em] text-white">
                  Go Far Agency.
                </span>
              </div>

              <span className="flex size-10 items-center justify-center rounded-full border border-brand-gold/35 text-brand-gold transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-brand-gold group-hover:text-obsidian-900">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </HomeSection>
  );
};
