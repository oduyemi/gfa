"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {ArrowDown, ArrowUpRight, Check, PenTool, TrendingUp, Layers3, MoveUpRight} from "lucide-react";


const servicePaths = [
  {
    number: "01",
    title: "Digital Creation",
    description: "Design, build and bring ideas to life.",
    href: "#digital-creation",
    icon: PenTool,
    accent: "text-brand-electric",
    background: "bg-brand-electric/10",
  },
  {
    number: "02",
    title: "Digital Execution",
    description: "Put the right strategies into motion.",
    href: "#digital-execution",
    icon: TrendingUp,
    accent: "text-[#A77C0D] dark:text-brand-gold",
    background: "bg-brand-gold/15",
  },
  {
    number: "03",
    title: "Managed Virtual Assistance",
    description: "Get the support that keeps work moving.",
    href: "#virtual-assistance",
    icon: Layers3,
    accent: "text-[#8174C7] dark:text-[#B7ACFF]",
    background: "bg-[#E7E6F7]",
  },
];

const benefits = [
  "Creative expertise",
  "Strategic execution",
  "Reliable support",
];

export const ServicesHero = () => {
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

  const imageReveal = {
    hidden: {
      opacity: 0,
      scale: reduceMotion ? 1 : 0.97,
      y: reduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.85,
        delay: reduceMotion ? 0 : 0.12,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 -top-64 -z-10 size-[48rem] rounded-full bg-brand-electric/[0.065] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-56 top-[45%] -z-10 size-[30rem] rounded-full bg-brand-gold/[0.045] blur-[130px]"
      />

      <div className="brand-container relative pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 xl:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="relative z-10"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Go Far Agency / Our services
              </span>
            </div>

            <h1 className="max-w-[680px] font-brand-display text-[3.45rem] font-semibold leading-[0.94] tracking-[-0.075em] text-foreground sm:text-6xl lg:text-[4.5rem] xl:text-[5.35rem]">
              The right support
              <br />
              for ideas that
              <br />
              <span className="relative inline-block">
                <span className="brand-gradient-text">go further.</span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-[3px] w-[88%] rounded-full bg-brand-gold sm:-bottom-3"
                />
              </span>
            </h1>

            <p className="mt-8 max-w-[490px] text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              From creative production and website development to digital
              marketing and managed virtual assistance, we bring the skills,
              strategy and support your project needs to move forward.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#service-lines"
                className="group inline-flex min-h-13 items-center justify-center gap-4 rounded-full bg-brand-electric px-7 text-sm font-semibold text-white shadow-premium-md transition-all duration-300 hover:-translate-y-1 hover:bg-electric-700"
              >
                Explore our services
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex min-h-13 items-center justify-center gap-2 px-4 text-sm font-semibold text-foreground transition-colors hover:text-brand-electric"
              >
                Let's discuss your project
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>

            {/* Brand promise */}
            <div className="mt-11 border-t border-border pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-muted-foreground">
                One partner. Multiple ways to move forward.
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <span className="grid size-[19px] place-items-center rounded-full bg-brand-electric/10 text-brand-electric">
                      <Check size={11} strokeWidth={2.7} />
                    </span>

                    <span className="text-xs font-medium text-foreground/80">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageReveal}
            className="relative mx-auto w-full max-w-[620px] lg:ml-auto"
          >
            <div className="relative">
              <div className="relative aspect-[4/4.15] overflow-hidden rounded-[1.75rem] bg-surface-subtle sm:aspect-[5/4.6] lg:aspect-[4/4.65]">
                <Image
                  src="/images/services/hero.jpg"
                  alt="Creative and digital work representing Go Far Agency's services"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover transition-transform duration-1000 hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-obsidian-900/10 to-obsidian-900/5" />

                <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 via-transparent to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3.5 py-2 backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-brand-gold" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.17em] text-white">
                      The GFA approach
                    </span>
                  </span>

                  <span className="grid size-10 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md">
                    <MoveUpRight size={17} />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    Your extended digital team
                  </p>

                  <h2 className="max-w-[430px] font-brand-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.055em] text-white sm:text-[2.7rem]">
                    Good ideas need the right people behind them.
                  </h2>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-brand-gold" />
                    <span className="text-xs font-medium text-white/75">
                      Execute. Forward.
                    </span>
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 -z-10 size-24 rounded-tr-[2rem] border-r-2 border-t-2 border-brand-electric/45 sm:-right-5 sm:-top-5 sm:size-32"
              />

              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-premium-md sm:bottom-7 sm:-left-6 sm:px-5 sm:py-4">
                <div className="grid size-9 place-items-center rounded-lg bg-brand-electric/10 text-brand-electric">
                  <Layers3 size={18} />
                </div>

                <div>
                  <p className="text-xs font-bold text-foreground">
                    More room to go far.
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Skills, strategy and support.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          id="service-lines"
          className="mt-24 scroll-mt-28 border-t border-border pt-9 sm:mt-28 lg:mt-32"
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="brand-eyebrow">Explore our expertise</p>

              <h2 className="mt-2 font-brand-display text-2xl font-semibold tracking-[-0.055em] text-foreground sm:text-3xl">
                Three ways to move forward.
              </h2>
            </div>

            <p className="max-w-sm text-xs leading-6 text-muted-foreground sm:text-right sm:text-sm">
              Different needs. Different expertise. One capable partner.
            </p>
          </div>

          <div className="grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
            {servicePaths.map((service, index) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.number}
                  href={service.href}
                  className="group relative flex min-w-0 items-center gap-4 border-b border-border py-6 transition-colors last:border-b-0 hover:bg-surface-subtle/70 md:border-b-0 md:px-5 md:py-7 lg:px-7"
                >
                  <span className="self-start pt-1 font-mono text-[11px] font-bold tracking-wider text-muted-foreground">
                    {service.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${service.background}`}>
                        <Icon size={16} className={service.accent} />
                      </span>

                      <h3 className="font-heading text-sm font-bold text-foreground transition-colors group-hover:text-brand-electric sm:text-base">
                        {service.title}
                      </h3>
                    </div>

                    <p className="mt-2 pl-10 text-xs leading-5 text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-white">
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
