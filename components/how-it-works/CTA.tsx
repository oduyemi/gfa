
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
  MoveUpRight,
} from "lucide-react";

import { StarOutlined } from "@ant-design/icons";

const servicePaths = [
  {
    number: "01",
    title: "Digital Creation",
    description: "Turn your idea into something real.",
    href: "#digital-creation",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Digital Execution",
    description: "Give your business the momentum to grow.",
    href: "#digital-execution",
    icon: MoveUpRight,
  },
  {
    number: "03",
    title: "Managed Virtual Assistance",
    description: "Get the support to keep things moving.",
    href: "#virtual-assistance",
    icon: StarOutlined,
  },
];

export const HowItWorksCTA = () => {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="brand-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={reveal}
          className="relative isolate overflow-hidden rounded-[1.75rem] bg-obsidian-900 text-white sm:rounded-[2.25rem]"
        >
          {/* Ambient background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 -top-48 -z-10 size-[34rem] rounded-full bg-brand-electric/15 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 right-[20%] -z-10 size-[30rem] rounded-full bg-brand-electric/10 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-12rem] top-[-15rem] -z-10 size-[34rem] rounded-full border border-white/[0.07]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-8rem] top-[-11rem] -z-10 size-[26rem] rounded-full border border-white/[0.07]"
          />

          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            {/* Main message */}
            <div className="relative z-10 flex flex-col justify-center px-7 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-16">
              <div className="mb-9 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                  Your next move starts here
                </span>
              </div>

              <h2 className="max-w-2xl font-brand-display text-[2.85rem] font-semibold leading-[0.99] tracking-[-0.065em] sm:text-6xl lg:text-[4.5rem] xl:text-[5.15rem]">
                Have a big idea?
                <br />
                <span className="brand-gradient-text">
                  Let's take it
                  <br className="hidden sm:block" /> further.
                </span>
              </h2>

              <p className="mt-7 max-w-[29rem] text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                Whatever you're working towards, you don't have
                to figure it all out alone. Tell us where you want
                to go. We'll help you find the people, expertise
                and support to get there.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact/#contact-form"
                  className="group inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-brand-gold px-7 py-4 text-sm font-bold text-obsidian-900 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Tell us about your project
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <Link
                  href="/about"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/[0.06]"
                >
                  Get to know GFA
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-3 border-t border-white/10 pt-6">
                <span className="size-1.5 rounded-full bg-brand-gold" />
                <p className="text-xs leading-5 text-white/40">
                  Good work happens when the right people come together.
                </p>
              </div>
            </div>

            {/* Service pathways */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-[#E7E6F7] px-7 py-10 text-obsidian-900 sm:px-10 sm:py-12 lg:px-11 lg:py-14 xl:px-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-obsidian-900/[0.07]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full border border-obsidian-900/[0.07]"
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian-900/50">
                    Find your way forward
                  </p>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-obsidian-900/35">
                    03 pathways
                  </span>
                </div>

                <h3 className="mt-8 max-w-sm font-brand-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-4xl">
                  The right kind of support makes all the difference.
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-obsidian-900/60">
                  Start with what you need. We'll help you work
                  out the rest.
                </p>
              </div>

              <div className="relative mt-10">
                <div className="mb-3 flex items-center justify-between border-b border-obsidian-900/15 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-obsidian-900/40">
                    Explore our services
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-obsidian-900/40"
                  />
                </div>

                <div className="divide-y divide-obsidian-900/15">
                  {servicePaths.map((service, index) => {
                    const Icon = service.icon;

                    return (
                      <motion.div
                        key={service.number}
                        initial={{
                          opacity: 0,
                          x: shouldReduceMotion ? 0 : 14,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.4,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.45,
                          delay: shouldReduceMotion ? 0 : index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={service.href}
                          className="group flex items-center gap-4 py-5 transition-colors duration-300"
                        >
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-obsidian-900/15 transition-all duration-300 group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-white">
                            <Icon
                              size={18}
                              strokeWidth={1.7}
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="mb-1 flex items-center gap-2">
                              <span className="text-[10px] font-bold tabular-nums text-obsidian-900/40">
                                {service.number}
                              </span>
                              <span className="text-sm font-bold tracking-[-0.02em] sm:text-base">
                                {service.title}
                              </span>
                            </span>

                            <span className="block text-xs leading-5 text-obsidian-900/55 sm:text-[13px]">
                              {service.description}
                            </span>
                          </span>

                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-obsidian-900/[0.06] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-brand-electric group-hover:text-white">
                            <ArrowUpRight size={16} />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="relative mt-8 flex items-center justify-between gap-4 border-t border-obsidian-900/15 pt-5">
                <p className="text-xs font-medium text-obsidian-900/55">
                  One partner. Room to go further.
                </p>

                <span className="font-brand-display text-lg font-bold tracking-[-0.06em] text-obsidian-900/70">
                  GFA.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
