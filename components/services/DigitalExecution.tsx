"use client";
import { useState } from "react";
import { ContactDialog } from "@/dialogs/contact-dialog";import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Clock3,
  Bot,
  CalendarDays,
  Check,
  Compass,
  Lightbulb,
  Megaphone,
  Search,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";

const executionServices = [
  {
    number: "01",
    title: "Ad Management",
    category: "Reach the right audience",
    description:
      "Plan, launch and optimise advertising campaigns that put your business in front of the people most likely to need what you offer.",
    icon: Megaphone,
    tags: ["Instagram Ads", "Google Ads", "YouTube Ads"],
  },
  {
    number: "02",
    title: "Business Planning & Consultation",
    category: "Make informed decisions",
    description:
      "Get practical guidance to clarify your business direction, identify opportunities and build a more intentional path towards your goals.",
    icon: Compass,
    tags: ["Business direction", "Growth planning", "Consultation"],
  },
  {
    number: "03",
    title: "Business Process Automation",
    category: "Work smarter",
    description:
      "Streamline repetitive tasks, connect your tools and improve the way information and processes move through your business.",
    icon: Workflow,
    tags: ["Workflow automation", "Process improvement", "Integrations"],
  },
  {
    number: "04",
    title: "Search Engine Optimisation",
    category: "Be easier to find",
    description:
      "Improve your website's visibility in search results through thoughtful optimisation, relevant content and technical SEO.",
    icon: Search,
    tags: ["Search visibility", "On-page SEO", "Technical SEO"],
  },
  {
    number: "05",
    title: "Social Media Strategy & Management",
    category: "Build a stronger presence",
    description:
      "Develop a consistent social presence through content strategy, campaign planning, publishing coordination and performance analysis.",
    icon: BarChart3,
    tags: ["Content strategy", "Social campaigns", "Performance"],
  },
];

const engagementPoints = [
  {
    title: "A defined strategy",
    description: "Agreed goals, priorities and scope of work.",
  },
  {
    title: "Consistent execution",
    description: "Implementation, monitoring and optimisation.",
  },
  {
    title: "Ongoing refinement",
    description: "Regular reviews and adjustments as your needs evolve.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const DigitalExecution = () => {
  const shouldReduceMotion = useReducedMotion();
  const [dialogType, setDialogType] = useState<"creation" | "execution" | "assistance" | "general" | null>(null);

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.65,
      delay: shouldReduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="digital-execution"
      className="relative scroll-mt-24 overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <div className="brand-container">
        <motion.div
          {...reveal()}
          className="grid gap-9 lg:grid-cols-[1.1fr_0.65fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <p className="brand-eyebrow">02 / Digital Execution</p>
            </div>

            <h2 className="max-w-3xl font-brand-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-[4.75rem]">
              Turn good ideas
              <br />
              into{" "}
              <span className="brand-gradient-text">
                meaningful progress.
              </span>
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end lg:pb-2">
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Growth takes more than good intentions. It takes clear
              direction, consistent execution and the right systems
              working together. We help bring those pieces into place
              so your business can move forward with purpose.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-foreground">
              <TrendingUp size={16} className="text-brand-electric" />
              Strategy, growth and implementation
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal(0.05)}
          className="relative mt-14 overflow-hidden bg-obsidian-900 text-white sm:mt-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-40 size-[34rem] rounded-full bg-brand-electric/20 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 left-[25%] size-[28rem] rounded-full bg-brand-gold/[0.08] blur-[100px]"
          />

          <div className="relative grid lg:grid-cols-[1fr_0.9fr]">
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold">
                    <Target size={17} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                    The bigger picture
                  </span>
                </div>

                <h3 className="mt-9 max-w-xl font-brand-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-4xl lg:text-[3.5rem]">
                  Growth shouldn't
                  <br />
                  be left to chance.
                </h3>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/55 sm:text-base">
                  We look beyond individual tasks to understand what
                  your business needs. Then we connect strategy,
                  practical execution and continuous improvement
                  to help you get there.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-3 border-t border-white/15 pt-6">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
                  Our approach
                </span>
                <span className="h-px w-10 bg-white/20" />
                <span className="text-xs text-white/50">
                  Think clearly. Act intentionally. Grow sustainably.
                </span>
              </div>
            </div>

            <div className="relative border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                What moves the work forward
              </p>

              <div className="space-y-0">
                {[
                  {
                    icon: Compass,
                    title: "Direction",
                    description:
                      "Understand where you are going and what matters most.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Better thinking",
                    description:
                      "Find practical ways to improve how your business works.",
                  },
                  {
                    icon: Bot,
                    title: "Implementation",
                    description:
                      "Turn plans into systems, campaigns and real activity.",
                  },
                  {
                    icon: BarChart3,
                    title: "Progress",
                    description:
                      "Review what is working and make informed adjustments.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group flex gap-5 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-brand-gold transition-colors duration-300 group-hover:border-brand-gold/40 group-hover:bg-brand-gold/10">
                        <Icon size={18} strokeWidth={1.7} />
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm font-semibold text-white">
                            {item.title}
                          </h4>
                          <span className="text-[10px] tabular-nums text-white/25">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="mt-1.5 max-w-xs text-xs leading-6 text-white/45">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-20 sm:mt-24 lg:mt-32">
          <motion.div
            {...reveal()}
            className="mb-10 grid gap-5 lg:grid-cols-[1fr_0.55fr] lg:items-end"
          >
            <div>
              <div className="mb-4 flex items-center gap-3">
                <p className="brand-eyebrow">What we do</p>
              </div>

              <h3 className="font-brand-display text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl lg:text-5xl">
                The work behind
                <br className="hidden sm:block" /> your next move.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-7 text-muted-foreground lg:justify-self-end">
              From reaching new customers to improving internal
              operations, explore the ways we help businesses
              build momentum.
            </p>
          </motion.div>

          <div className="hidden grid-cols-[4.5rem_1fr_1.15fr] gap-6 border-y border-border py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground md:grid">
            <span>Ref.</span>
            <span>Service</span>
            <span>How it helps</span>
          </div>

          <div className="border-t border-border md:border-t-0">
            {executionServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.number}
                  {...reveal(index * 0.045)}
                  className="group relative grid gap-5 border-b border-border py-7 transition-colors duration-300 hover:bg-surface-subtle/70 sm:py-8 md:grid-cols-[4.5rem_1fr_1.15fr] md:items-center md:gap-6 md:px-4"
                >
                  <div className="flex items-center justify-between md:block">
                    <span className="font-brand-display text-2xl font-semibold tracking-[-0.05em] text-foreground/20 transition-colors group-hover:text-brand-electric">
                      {service.number}
                    </span>

                    <div className="flex size-10 items-center justify-center rounded-full bg-brand-electric/[0.07] text-brand-electric md:hidden">
                      <Icon size={18} strokeWidth={1.7} />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-brand-electric/[0.07] text-brand-electric transition-all duration-300 group-hover:bg-brand-electric group-hover:text-white md:flex">
                      <Icon size={19} strokeWidth={1.7} />
                    </div>

                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.13em] text-muted-foreground">
                        {service.category}
                      </p>

                      <h4 className="max-w-sm font-heading text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand-electric sm:text-xl">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  <div>
                    <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                      {service.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-border px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="absolute right-4 top-8 hidden text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-electric group-hover:opacity-100 md:block"
                  />
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          {...reveal()}
          className="relative mt-20 overflow-hidden bg-surface-subtle sm:mt-24 lg:mt-28"
        >
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative flex flex-col justify-between overflow-hidden bg-brand-gold p-7 text-obsidian-900 sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -right-20 size-72 rounded-full border border-obsidian-900/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -right-12 size-52 rounded-full border border-obsidian-900/10"
              />

              <div className="relative flex items-center gap-2">
                <CalendarDays size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                  The engagement model
                </span>
              </div>

              <div className="relative mt-12">
                <div className="flex items-baseline gap-2">
                  <span className="font-brand-display text-8xl font-semibold leading-none tracking-[-0.08em] sm:text-9xl">
                    03
                  </span>
                  <span className="text-lg font-semibold">+</span>
                </div>

                <p className="mt-4 text-base font-semibold">
                  Months minimum
                </p>

                <p className="mt-4 max-w-xs text-sm leading-7 text-obsidian-900/65">
                  Digital Execution is built around ongoing
                  partnerships. We give the work time to develop,
                  measure and improve.
                </p>
              </div>

              <div className="relative mt-12 flex items-center gap-2 border-t border-obsidian-900/15 pt-5 text-xs font-semibold">
                <Clock3 size={15} />
                Monthly retainer arrangement
              </div>
            </div>

            <div className="flex flex-col justify-center bg-card p-7 sm:p-10 lg:p-12">
              <p className="brand-eyebrow">Beyond one-off tasks</p>

              <h3 className="mt-5 max-w-lg font-brand-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-4xl">
                An ongoing partner in your progress.
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
                We agree on what needs to be done, work through
                the priorities together and refine the approach
                as your business grows. The goal is consistent,
                purposeful progress.
              </p>

              <div className="mt-9 border-t border-border">
                {engagementPoints.map((point, index) => (
                  <div
                    key={point.title}
                    className="flex gap-4 border-b border-border py-4 last:border-0"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-electric/10 text-brand-electric">
                      <Check size={13} strokeWidth={2.5} />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {point.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setDialogType("execution")}
                className="group mt-8 inline-flex w-fit items-center gap-4 bg-obsidian-900 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-electric"
              >
                Discuss a growth partnership
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
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
