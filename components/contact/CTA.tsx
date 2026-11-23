"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  MoveUpRight,
} from "lucide-react";

const destinations = [
  {
    number: "01",
    title: "Our approach",
    description: "See how we bring ideas and people together.",
    href: "/how-it-works",
  },
  {
    number: "02",
    title: "Our story",
    description: "Get to know the thinking behind GFA.",
    href: "/about",
  },
];

export const ContactCTA = () => {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <section className="bg-background py-16 sm:py-24 lg:py-28">
      <div className="brand-container">
        <motion.div
          {...reveal}
          className="relative isolate overflow-hidden rounded-[2rem] bg-obsidian-900 text-white sm:rounded-[2.5rem]"
        >
          {/* Background atmosphere */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-28 -top-48 h-[34rem] w-[34rem] rounded-full bg-brand-electric/20 blur-[120px]" />
            <div className="absolute -bottom-56 left-[22%] h-[30rem] w-[30rem] rounded-full bg-brand-gold/10 blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
          </div>

          <div className="relative px-7 py-12 sm:px-11 sm:py-16 lg:px-16 lg:py-20">
            {/* Intro */}
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
                <Compass className="h-4 w-4 text-brand-gold" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:text-[11px]">
                Still finding your way?
              </span>
            </div>

            {/* Main statement */}
            <div className="mt-9 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
              <div>
                <h2 className="max-w-4xl font-brand-display text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[5.35rem]">
                  Your next step
                  <br />
                  <span className="text-white/45">doesn't have to be</span>
                  <br />
                  <span className="relative inline-block text-brand-gold">
                    right now.
                    <span className="absolute -bottom-2 left-0 h-[3px] w-[58%] rounded-full bg-brand-electric sm:-bottom-3" />
                  </span>
                </h2>

                <p className="mt-8 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  Take your time. Explore what we do, get to know our approach,
                  and think about what your project needs. When you're ready
                  to move forward, we'll be here.
                </p>
              </div>

              {/* Primary action */}
              <div className="lg:pb-2">
                <p className="mb-4 text-xs leading-6 text-white/45">
                  Whenever you're ready, there's a place to start.
                </p>

                <Link
                  href="/services"
                  className="group inline-flex min-h-[60px] w-full items-center justify-between gap-5 rounded-full bg-white py-2 pl-7 pr-2 text-sm font-semibold text-obsidian-900 transition-all duration-300 hover:bg-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian-900 sm:w-auto sm:min-w-[260px]"
                >
                  Explore our services
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-obsidian-900 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Exploration paths */}
            <div className="mt-14 border-t border-white/15 pt-8 sm:mt-20 sm:pt-10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Get to know us a little better
                </p>
                <span className="hidden text-xs text-white/30 sm:block">
                  Take a look around
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {destinations.map((destination) => (
                  <Link
                    key={destination.number}
                    href={destination.href}
                    className="group flex items-center justify-between gap-5 border-b border-white/10 pb-5 transition-colors hover:border-brand-gold/50 sm:border-b-0 sm:pb-0"
                  >
                    <span className="flex min-w-0 items-start gap-4">
                      <span className="pt-1 font-mono text-[10px] text-brand-gold/75">
                        {destination.number}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-semibold tracking-tight text-white transition-colors group-hover:text-brand-gold sm:text-lg">
                          {destination.title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-white/45 sm:text-sm">
                          {destination.description}
                        </span>
                      </span>
                    </span>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-brand-gold/50 group-hover:text-brand-gold">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
