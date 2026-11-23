"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Compass, Layers3, MoveUpRight, UsersRound } from "lucide-react";
import { HomeSection } from "./HomeSection";

const connections = [
  {
    number: "01",
    title: "People",
    description: "The right people who understand your ambition.",
    icon: UsersRound,
    accent: "blue",
  },
  {
    number: "02",
    title: "Expertise",
    description: "The skills and creativity to make things happen.",
    icon: Layers3,
    accent: "gold",
  },
  {
    number: "03",
    title: "Management",
    description: "Simplified processes and a clearer way forward.",
    icon: Compass,
    accent: "rose",
  },
] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const GFAPerspective = () => {
  const reduceMotion = useReducedMotion();

  const revealTransition = {
    duration: reduceMotion ? 0 : 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <HomeSection
      id="gfa-perspective"
      className="relative overflow-hidden bg-background"
    >
      <div className="relative grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16 xl:gap-24">
        {/* Editorial statement */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition}
          className="relative"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              The GFA perspective
            </span>
          </div>

          <h3 className="mt-7 max-w-lg font-brand-display text-[clamp(2.65rem,5vw,4.5rem)] font-semibold leading-[0.99] tracking-[-0.075em] text-foreground">
            You bring the
            <span className="block text-brand-electric">goal.</span>
            <span className="mt-2 block text-foreground/65">
              We connect the dots.
            </span>
          </h3>

          <p className="mt-7 max-w-md text-[14px] leading-[1.9] text-muted-foreground sm:text-[15px]">
            Progress doesn&apos;t have to happen alone. We bring the right blend of
            people, skills and support needed for success &#8208; as well as
            having processes designed to make things easier to manage.
          </p>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-4"
          >
            <span className="text-sm font-bold text-foreground transition-colors group-hover:text-brand-electric">
              Get to know GFA
            </span>

            <span className="flex size-11 items-center justify-center rounded-full border border-border bg-surface-subtle text-foreground transition-all duration-300 group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(18,101,244,0.2)]">
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </Link>

          {/* Brand signature */}
          <div className="mt-12 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-8 rounded-full bg-brand-electric" />
              <span className="h-1.5 w-4 rounded-full bg-brand-gold" />
              <span className="size-1.5 rounded-full bg-[#E3D0D8]" />
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
              Your extended digital team
            </span>
          </div>
        </motion.div>

        {/* Connection composition */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            ...revealTransition,
            delay: reduceMotion ? 0 : 0.12,
          }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface-subtle p-5 shadow-premium-sm sm:p-7 lg:p-8">
            {/* Decorative graphic */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-12 size-48 rounded-full border border-brand-electric/10"
            >
              <div className="absolute inset-5 rounded-full border border-brand-electric/[0.08]" />
              <div className="absolute inset-10 rounded-full border border-brand-electric/[0.08]" />
            </div>

            {/* Panel heading */}
            <div className="relative mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-electric" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-electric">
                    How we work
                  </p>
                </div>

                <h4 className="mt-3 max-w-xs font-brand-display text-xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-2xl">
                  Better things happen when everything connects.
                </h4>
              </div>

              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-brand-electric shadow-sm">
                <MoveUpRight size={19} strokeWidth={1.8} />
              </span>
            </div>

            {/* Connection sequence */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-[2.1rem] left-[23px] top-[2.1rem] w-px bg-gradient-to-b from-brand-electric/60 via-brand-gold/60 to-[#E3D0D8]"
              />

              <div className="relative space-y-3">
                {connections.map((item, index) => {
                  const Icon = item.icon;

                  const accentStyles = {
                    blue: {
                      icon: "text-brand-electric bg-brand-electric/[0.09] border-brand-electric/15 group-hover:bg-brand-electric group-hover:text-white",
                      number: "text-brand-electric",
                      dot: "bg-brand-electric",
                    },
                    gold: {
                      icon: "text-[#B1840B] bg-brand-gold/15 border-brand-gold/25 group-hover:bg-brand-gold group-hover:text-[#090A0C]",
                      number: "text-[#B1840B] dark:text-brand-gold",
                      dot: "bg-brand-gold",
                    },
                    rose: {
                      icon: "text-[#A66F84] bg-[#E3D0D8]/40 border-[#E3D0D8]/70 group-hover:bg-[#E3D0D8] group-hover:text-[#090A0C]",
                      number: "text-[#A66F84] dark:text-[#E3D0D8]",
                      dot: "bg-[#E3D0D8]",
                    },
                  };

                  const accent = accentStyles[item.accent];

                  return (
                    <motion.div
                      key={item.number}
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : 18,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.5,
                        delay: reduceMotion ? 0 : 0.2 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative flex items-center gap-4 rounded-2xl border border-border/70 bg-background/85 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-electric/25 hover:bg-background hover:shadow-premium-sm sm:gap-5 sm:p-5"
                    >
                      <span
                        className={`relative z-10 flex size-[46px] shrink-0 items-center justify-center rounded-[1rem] border transition-all duration-300 sm:size-[50px] ${accent.icon}`}
                      >
                        <Icon size={20} strokeWidth={1.8} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`font-mono text-[10px] font-bold tabular-nums ${accent.number}`}
                          >
                            {item.number}
                          </span>
                          <span className="h-px w-4 bg-border transition-all duration-300 group-hover:w-7 group-hover:bg-brand-electric/50" />
                          <h5 className="text-[14px] font-bold tracking-tight text-foreground sm:text-[15px]">
                            {item.title}
                          </h5>
                        </div>

                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                          {item.description}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`relative z-10 hidden size-2 shrink-0 rounded-full ring-4 ring-background sm:block ${accent.dot}`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Outcome */}
            <div className="relative mt-5 overflow-hidden rounded-2xl bg-[#090A0C] px-5 py-5 text-white sm:px-6 sm:py-6">
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-12 size-36 rounded-full border border-white/[0.09]"
              >
                <div className="absolute inset-5 rounded-full border border-white/[0.07]" />
              </div>

              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-brand-gold" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                      Where it leads
                    </p>
                  </div>

                  <p className="mt-2 font-brand-display text-2xl font-semibold tracking-[-0.05em] sm:text-[1.8rem]">
                    Real progress<span className="text-brand-gold">.</span>
                  </p>
                </div>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-electric text-white shadow-[0_5px_20px_rgba(18,101,244,0.35)]">
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 right-6 hidden items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 shadow-premium-sm sm:flex">
            <span className="font-mono text-[10px] font-bold text-brand-electric">
              GFA
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              One connected team
            </span>
          </div>
        </motion.div>
      </div>
    </HomeSection>
  );
};
