
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Layers3,
  TrendingUp,
  Headset,
} from "lucide-react";
import {
  ContactDialog,
  type ContactOptionType,
} from "@/dialogs/contact-dialog";

const options: {
  number: string;
  title: string;
  description: string;
  detail: string;
  prompt: string;
  icon: typeof Layers3;
  theme: "gold" | "blue" | "lilac";
  href: string;
  dialog: ContactOptionType;
}[] = [
  {
    number: "01",
    title: "Create something",
    description:
      "Bring an idea to life through brand design, websites, content, video and other creative projects.",
    detail: "Digital Creation",
    prompt: "For ideas ready to take shape.",
    icon: Layers3,
    theme: "gold",
    href: "/services#digital-creation",
    dialog: "creation",
  },
  {
    number: "02",
    title: "Grow something",
    description:
      "Build visibility, sharpen your strategy and put the right digital activities behind your growth.",
    detail: "Digital Execution",
    prompt: "For businesses ready to move forward.",
    icon: TrendingUp,
    theme: "blue",
    href: "/services#digital-execution",
    dialog: "execution",
  },
  {
    number: "03",
    title: "Get some support",
    description:
      "Bring more order to everyday operations with reliable help for tasks, coordination and administration.",
    detail: "Managed Virtual Assistance",
    prompt: "For the work that keeps things moving.",
    icon: Headset,
    theme: "lilac",
    href: "/services#virtual-assistance",
    dialog: "assistance",
  },
];

const themeStyles = {
  gold: {
    icon: "bg-brand-gold/15 text-brand-gold",
    number: "text-brand-gold",
    marker: "bg-brand-gold",
    link: "group-hover:text-brand-gold",
    glow: "bg-brand-gold/[0.09]",
  },
  blue: {
    icon: "bg-brand-electric/10 text-brand-electric",
    number: "text-brand-electric",
    marker: "bg-brand-electric",
    link: "group-hover:text-brand-electric",
    glow: "bg-brand-electric/[0.09]",
  },
  lilac: {
    icon: "bg-lilac text-obsidian-900",
    number: "text-[#9690CB]",
    marker: "bg-[#B9B5E8]",
    link: "group-hover:text-[#9690CB]",
    glow: "bg-[#B9B5E8]/[0.12]",
  },
};

export const ContactOptions = () => {
  const reduceMotion = useReducedMotion();

  const [activeDialog, setActiveDialog] =
    useState<ContactOptionType | null>(null);

  return (
    <>
      <section
        id="contact-options"
        className="relative overflow-hidden bg-background pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20"
      >
        <div className="brand-container">
          {/* Section introduction */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 border-b border-border pb-9 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:pb-11"
          >
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Let's get started
                </span>
              </div>

              <h2 className="max-w-3xl font-brand-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.07em] text-foreground">
                What would you like
                <span className="block brand-gradient-text">
                  to make happen?
                </span>
              </h2>
            </div>

            <div className="max-w-sm lg:pb-1">
              <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
                Every project needs something different. Choose
                the kind of support you're looking for, and
                let's take it from there.
              </p>
            </div>
          </motion.div>

          {/* Service selection */}
          <div className="mt-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Choose your starting point
              </span>

              <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60">
                01 — 03
              </span>
            </div>

            <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
              {options.map((option, index) => {
                const Icon = option.icon;
                const theme = themeStyles[option.theme];

                return (
                  <motion.article
                    key={option.number}
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 20 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.55,
                      delay: reduceMotion ? 0 : index * 0.1,
                    }}
                    className="group relative flex min-h-[340px] flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-premium-sm sm:p-7 lg:min-h-[370px] lg:p-8"
                  >
                    {/* Top accent */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${theme.marker}`}
                    />

                    {/* Hover accent */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-20 -top-24 size-52 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100 ${theme.glow}`}
                    />

                    <div className="relative flex items-center justify-between">
                      <span
                        className={`font-mono text-[11px] font-bold tracking-[0.12em] ${theme.number}`}
                      >
                        {option.number}
                      </span>

                      <span
                        className={`flex size-11 items-center justify-center rounded-xl ${theme.icon} transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105`}
                      >
                        <Icon size={20} strokeWidth={1.7} />
                      </span>
                    </div>

                    <div className="relative mt-11 flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        {option.detail}
                      </span>

                      <h3 className="mt-3 font-brand-display text-[clamp(1.85rem,2.6vw,2.4rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-foreground">
                        {option.title}
                      </h3>

                      <p className="mt-4 text-[13px] leading-[1.9] text-muted-foreground sm:text-sm">
                        {option.description}
                      </p>
                    </div>

                    {/* Two distinct actions */}
                    <div className="relative mt-6 border-t border-border pt-5">
                      <p className="mb-5 flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                        <span
                          className={`size-1.5 rounded-full ${theme.marker}`}
                        />
                        {option.prompt}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
                        {/* Primary: opens the matching dialog */}
                        <button
                          type="button"
                          onClick={() => setActiveDialog(option.dialog)}
                          aria-haspopup="dialog"
                          className="group/enquiry inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[11px] font-bold text-background transition-all duration-300 hover:bg-brand-electric hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4"
                        >
                          Start an enquiry
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-300 group-hover/enquiry:translate-x-1"
                          />
                        </button>

                        {/* Secondary: navigates to the service */}
                        <Link
                          href={option.href}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground transition-colors duration-300 ${theme.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4`}
                        >
                          Explore service
                          <ArrowUpRight
                            size={13}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* General enquiry */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="relative mt-7 overflow-hidden bg-obsidian-900 px-6 py-7 text-white sm:px-8 sm:py-8 lg:px-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-24 size-64 rounded-full border border-white/[0.07]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-5 -top-16 size-44 rounded-full border border-white/[0.05]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 right-[20%] size-48 rounded-full bg-brand-electric/15 blur-[75px]"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                  Not quite sure yet?
                </span>

                <h3 className="mt-3 font-brand-display text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                  That's where a conversation helps.
                </h3>

                <p className="mt-2 text-xs leading-6 text-white/55 sm:text-sm">
                  Tell us what you're thinking. We'll help you
                  work out the right next step.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveDialog("general")}
                aria-haspopup="dialog"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3.5 text-xs font-bold text-obsidian-900 transition-all duration-300 hover:bg-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian-900"
              >
                Start a conversation
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactDialog
        type={activeDialog}
        onClose={() => setActiveDialog(null)}
      />
    </>
  );
};
