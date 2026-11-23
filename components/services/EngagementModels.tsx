"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Wallet } from "lucide-react";
import { models, accentStyles } from "./engagement-data";
import { ContactDialog } from "@/dialogs/contact-dialog";

type ContactType = "creation" | "execution" | "assistance" | null;

const getContactType = (model: (typeof models)[number]): ContactType => {
  const identifier = `${model.id} ${model.title} ${model.category} ${model.href}`.toLowerCase();

  if (
    identifier.includes("creation") ||
    identifier.includes("creative") ||
    identifier.includes("project")
  ) {
    return "creation";
  }

  if (
    identifier.includes("execution") ||
    identifier.includes("retainer") ||
    identifier.includes("growth")
  ) {
    return "execution";
  }

  if (
    identifier.includes("assistance") ||
    identifier.includes("virtual") ||
    identifier.includes("support") ||
    identifier.includes("hourly")
  ) {
    return "assistance";
  }

  return null;
};

export const EngagementModels = () => {
  const [activeModel, setActiveModel] = useState<string>(models[0].id);
  const [dialogType, setDialogType] = useState<ContactType>(null);

  const prefersReducedMotion = useReducedMotion();

  const selectedModel =
    models.find((model) => model.id === activeModel) ?? models[0];

  const Icon = selectedModel.icon;
  const accent = accentStyles[selectedModel.accent];

  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: {
          duration: 0.65,
          ease: "easeOut" as const,
        },
      };

  const handleDiscuss = () => {
    const type = getContactType(selectedModel);

    if (type) {
      setDialogType(type);
    }
  };

  return (
    <>
      <section
        id="engagement-models"
        className="relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-electric/[0.045] blur-[110px]"
        />

        <div className="brand-container">
          {/* Section heading */}
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
              <span className="brand-gradient-text">
                move forward.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Every project is different. Choose the engagement model that
              matches the kind of support you need, and we’ll take it from there.
            </p>
          </motion.div>

          {/* Engagement selection */}
          <motion.div
            {...reveal}
            className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-premium-sm"
          >
            {/* Tabs */}
            <div className="border-b border-border bg-surface-subtle/70 p-3 sm:p-4">
              <div
                role="tablist"
                aria-label="Choose an engagement model"
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                {models.map((model) => {
                  const isActive = activeModel === model.id;
                  const ModelIcon = model.icon;
                  const modelAccent = accentStyles[model.accent];

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
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground"
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

            {/* Selected model */}
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
                  {/* Commitment */}
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
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${accent.bg}`}
                          />
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
                        <button
                          type="button"
                          onClick={handleDiscuss}
                          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4"
                        >
                          Discuss this option
                          <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </button>

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
                      {selectedModel.points.map((point) => (
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
        </div>
      </section>

      <ContactDialog
        type={dialogType}
        onClose={() => setDialogType(null)}
      />
    </>
  );
};
