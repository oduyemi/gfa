"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Clock3, Layers3, Repeat2, Wallet } from "lucide-react";


const models = [
  {
    id: "digital-creation",
    number: "01",
    category: "Project-based",
    title: "Digital Creation",
    description: "For defined projects with a clear beginning and finish.",
    commitment: "50%",
    commitmentLabel: "Initial deposit",
    payment: "Project-based payment",
    paymentDescription:
      "A deposit secures your project and gets the work underway. The remaining balance follows the agreed payment schedule.",
    points: [
      "Scope and deliverables agreed upfront",
      "Clear timeline and project milestones",
      "Balance paid according to agreed terms",
    ],
    idealFor:
      "One-off creative, design and digital projects with defined deliverables.",
    href: "/contact?service=digital-creation",
    icon: Layers3,
    accent: "blue",
  },
  {
    id: "digital-execution",
    number: "02",
    category: "Retainer-based",
    title: "Digital Execution",
    description: "For ongoing strategy, implementation and growth support.",
    commitment: "03+",
    commitmentLabel: "Months minimum",
    payment: "Recurring retainer",
    paymentDescription:
      "A monthly engagement gives us the consistency to plan, execute, measure and refine the work over time.",
    points: [
      "Strategy and scope agreed together",
      "Ongoing implementation and optimisation",
      "Regular progress reviews and reporting",
    ],
    idealFor:
      "Businesses that need consistent digital support and a strategic partner.",
    href: "/contact?service=digital-execution",
    icon: Repeat2,
    accent: "gold",
  },
  {
    id: "virtual-assistance",
    number: "03",
    category: "Hourly / Packages",
    title: "Managed Virtual Assistance",
    description: "For flexible operational and administrative support.",
    commitment: "10–30",
    commitmentLabel: "Hours per package",
    payment: "Upfront payment",
    paymentDescription:
      "Choose a support package around your workload. Payment is made before the agreed support period begins.",
    points: [
      "Tasks and priorities agreed upfront",
      "Hourly support or packaged hours",
      "Payment confirmed before work begins",
    ],
    idealFor:
      "Busy founders and teams who need reliable help with day-to-day tasks.",
    href: "/contact?service=virtual-assistance",
    icon: Clock3,
    accent: "rose",
  },
];

const process = [
  {
    number: "01",
    title: "Agree on the work",
    description: "We understand your needs and define the scope.",
  },
  {
    number: "02",
    title: "Confirm the terms",
    description: "We align on timelines, payment and expectations.",
  },
  {
    number: "03",
    title: "Get started",
    description: "Once everything is in place, work begins.",
  },
];

const accentStyles = {
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500",
    soft: "bg-blue-500/10",
    border: "border-blue-500/25",
    ring: "ring-blue-500/20",
  },
  gold: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-400",
    soft: "bg-amber-400/10",
    border: "border-amber-400/30",
    ring: "ring-amber-400/20",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500",
    soft: "bg-rose-500/10",
    border: "border-rose-500/25",
    ring: "ring-rose-500/20",
  },
};

export const EngagementModels = () => {
  const [activeModel, setActiveModel] = useState(models[0].id);
  const prefersReducedMotion = useReducedMotion();

  const selectedModel =
    models.find((model) => model.id === activeModel) ?? models[0];

  const Icon = selectedModel.icon;
  const accent = accentStyles[selectedModel.accent as keyof typeof accentStyles];

  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.65, ease: "easeOut" as const },
      };

  return (
    <section
      id="engagement-models"
      className="relative isolate overflow-hidden bg-background py-24 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-electric/[0.045] blur-[110px]"
      />

      <div className="brand-container">
        <motion.div
          {...reveal}
          className="mb-12 max-w-3xl sm:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-electric">
              Working together
            </span>
          </div>

          <h2 className="max-w-2xl font-brand-display text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
            A clear way to{" "}
            <span className="brand-gradient-text">move forward.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Every project is different. Choose the engagement model that
            matches the kind of support you need, and we’ll take it from there.
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-premium-sm"
        >
          <div className="border-b border-border bg-surface-subtle/70 p-3 sm:p-4">
            <div
              role="tablist"
              aria-label="Choose an engagement model"
              className="grid grid-cols-1 gap-2 sm:grid-cols-3"
            >
              {models.map((model) => {
                const isActive = activeModel === model.id;
                const ModelIcon = model.icon;
                const modelAccent =
                  accentStyles[model.accent as keyof typeof accentStyles];

                return (
                  <button
                    key={model.id}
                    id={`tab-${model.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="engagement-panel"
                    onClick={() => setActiveModel(model.id)}
                    className={`group relative flex min-h-[6.25rem] items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300 sm:min-h-[7.25rem] sm:px-5 ${
                      isActive
                        ? "border-border bg-card shadow-sm"
                        : "border-transparent bg-transparent hover:border-border/70 hover:bg-card/70"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="engagement-active-indicator"
                        className={`absolute bottom-0 left-5 right-5 h-[2px] rounded-full ${modelAccent.bg}`}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive
                          ? `${modelAccent.soft} ${modelAccent.text}`
                          : "bg-surface-subtle text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      <ModelIcon size={19} strokeWidth={1.8} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        {model.number} / {model.category}
                      </span>
                      <span
                        className={`block text-sm font-semibold leading-snug sm:text-base ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {model.title}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? `${modelAccent.text} translate-x-0 opacity-100`
                          : "-translate-x-1 translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="engagement-panel"
            role="tabpanel"
            aria-labelledby={`tab-${selectedModel.id}`}
            className="relative"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedModel.id}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: -8 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid lg:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="relative overflow-hidden p-7 sm:p-10 lg:p-12">
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full blur-[90px] ${accent.soft}`}
                  />

                  <div className="relative">
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        The commitment
                      </span>
                      <span
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${accent.border} ${accent.text}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${accent.bg}`} />
                        {selectedModel.category}
                      </span>
                    </div>

                    <div className="flex items-end gap-3">
                      <span className="font-brand-display text-[5rem] font-semibold leading-[0.9] tracking-[-0.07em] text-foreground sm:text-[6.5rem]">
                        {selectedModel.commitment}
                      </span>
                      <span className="mb-2 max-w-[7rem] text-sm font-medium leading-snug text-muted-foreground sm:mb-3">
                        {selectedModel.commitmentLabel}
                      </span>
                    </div>

                    <h3 className="mt-7 max-w-md font-brand-display text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
                      {selectedModel.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                      {selectedModel.description}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <Link
                        href={selectedModel.href}
                        className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        Discuss this option
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>

                      <span className="text-xs text-muted-foreground">
                        Let’s find the right fit.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment and terms */}
                <div className="border-t border-border bg-surface-subtle/45 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.soft} ${accent.text}`}
                    >
                      <Wallet size={18} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        Payment arrangement
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {selectedModel.payment}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-muted-foreground">
                    {selectedModel.paymentDescription}
                  </p>

                  <div className="my-8 h-px bg-border" />

                  <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    What to expect
                  </p>

                  <ul className="space-y-4">
                    {selectedModel.points.map((point, index) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.soft} ${accent.text}`}
                        >
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        <span className="text-sm leading-6 text-foreground/85">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-xl border border-border bg-card p-4 sm:p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      A good fit for
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground">
                      {selectedModel.idealFor}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-16 sm:mt-20"
        >
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-electric">
                Simple from the start
              </span>
              <h3 className="mt-3 font-brand-display text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
                Here’s how we get going.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              No guesswork. Just a shared understanding of what needs to happen.
            </p>
          </div>

          <div className="grid gap-0 border-y border-border sm:grid-cols-3">
            {process.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex gap-4 py-6 sm:px-5 sm:py-7 ${
                  index !== 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""
                } ${index === 0 ? "sm:pl-0" : ""}`}
              >
                <span className="font-brand-display text-2xl font-semibold tracking-[-0.04em] text-brand-electric/70">
                  {step.number}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 max-w-[15rem] text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

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
