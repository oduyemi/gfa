
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export const ContactHero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-brand-electric/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-brand-gold/10 blur-[100px]" />
      <div className="brand-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="brand-eyebrow mb-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand-gold" />
              Let's start a conversation
            </div>

            <h1 className="font-brand-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Let's make
              <br />
              something
              <br />
              <span className="brand-gradient-text">happen.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Have an idea, a project, or simply need the right support?
              We'd love to hear what you're working on and help you
              figure out your next step.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#contact-form"
                className="group inline-flex items-center gap-3 rounded-full bg-brand-electric px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-electric-700"
              >
                Tell us about it
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition hover:bg-surface-subtle"
              >
                Explore our services
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-electric" />
                No pressure
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                Just a conversation
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                A clearer next step
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
              <Image
                src="/images/contacthero.jpg"
                alt="A welcoming creative workspace for ideas and collaboration"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/80 via-obsidian-900/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/15 via-transparent to-brand-gold/10" />

              {/* Image header */}
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                <span className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  Go Far Agency
                </span>

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold text-obsidian-900">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              {/* Image message */}
              <div className="absolute bottom-7 left-6 right-6 sm:bottom-9 sm:left-9 sm:right-9">
                <span className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                  <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
                  Every great thing starts somewhere
                </span>

                <p className="max-w-sm font-brand-display text-3xl font-medium leading-tight text-white sm:text-4xl">
                  Yours could
                  <br />
                  start right here.
                </p>
              </div>
            </div>

            {/* Floating card */}
            <div className="relative z-10 mx-4 -mt-5 rounded-2xl border border-border bg-card p-5 shadow-premium-md sm:mx-8 sm:p-6 lg:absolute lg:-bottom-6 lg:-left-7 lg:mx-0 lg:mt-0 lg:w-[290px]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-electric/10 text-brand-electric">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>
                  <p className="mt-1 font-heading text-lg font-semibold">
                    Tell us what's on your mind.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                You don't need all the answers yet. A little context
                is all we need to start.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
