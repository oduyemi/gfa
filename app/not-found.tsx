"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, MousePointer2, MoveUpRight, Sparkles, Sun, Moon } from "lucide-react";

export default function NotFound() {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <main className="relative isolate flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-48 -top-56 size-[650px] rounded-full bg-brand-electric/[0.07] blur-[140px]" />
        <div className="absolute -bottom-64 -left-48 size-[600px] rounded-full bg-brand-gold/[0.055] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(currentColor_0.7px,transparent_0.7px)] [background-size:24px_24px]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 sm:px-8 lg:px-14">
        <motion.div
          {...reveal(0.04)}
          className="flex items-center justify-between border-b border-border/60 py-6"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-tight transition-colors hover:text-brand-electric"
          >
            <span className="grid size-7 place-items-center rounded-full border border-border transition-colors group-hover:border-brand-electric/40 group-hover:bg-brand-electric/5">
              <ArrowLeft size={13} />
            </span>
            Go Far Agency
          </Link>

          <div className="flex items-center gap-4 sm:gap-5">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
              ERROR <span className="font-bold text-brand-electric">404</span>
            </span>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              disabled={!mounted}
              aria-label={
                mounted
                  ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`
                  : "Toggle theme"
              }
              title={
                mounted
                  ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`
                  : "Toggle theme"
              }
              className="group grid size-10 place-items-center rounded-full border border-border bg-card/70 text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-brand-electric/40 hover:bg-brand-electric/5 hover:text-brand-electric disabled:cursor-default"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />
              ) : (
                <Moon
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-500 group-hover:-rotate-12"
                />
              )}
            </button>
          </div>
        </motion.div>

        <div className="grid flex-1 grid-cols-1 items-center gap-4 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-2 lg:py-8">
          <section className="relative z-10 order-2 max-w-[560px] lg:order-1">
            <motion.div {...reveal(0.12)} className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                A little unexpected detour
              </span>
            </motion.div>

            <motion.h1
              {...reveal(0.2)}
              className="mt-8 font-brand-display text-[clamp(3.8rem,7.5vw,7rem)] font-semibold leading-[0.9] tracking-[-0.085em]"
            >
              Well, this is
              <br />
              <span className="brand-gradient-text">awkward.</span>
            </motion.h1>

            <motion.p
              {...reveal(0.3)}
              className="mt-8 max-w-[390px] text-base leading-[1.9] text-muted-foreground sm:text-lg"
            >
              We had a destination in mind. Somehow, this page didn't get the
              memo.
            </motion.p>

            <motion.p
              {...reveal(0.36)}
              className="mt-3 max-w-[370px] text-sm leading-[1.9] text-muted-foreground"
            >
              The link may be outdated, or the page may have moved. Either way,
              let's get you somewhere better.
            </motion.p>

            <motion.div
              {...reveal(0.44)}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/"
                className="group inline-flex min-h-14 items-center gap-4 rounded-full bg-brand-electric py-2 pl-6 pr-2 text-sm font-bold text-white shadow-[0_12px_35px_-12px_rgba(18,101,244,0.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-electric-700 hover:shadow-[0_18px_42px_-12px_rgba(18,101,244,0.75)]"
              >
                Take me home
                <span className="grid size-10 place-items-center rounded-full bg-white text-brand-electric transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </Link>

              <Link
                href="/services"
                className="group inline-flex min-h-14 items-center gap-2 rounded-full border border-border px-6 text-sm font-semibold transition-all duration-300 hover:border-brand-electric/40 hover:bg-surface-subtle"
              >
                Explore GFA
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            <motion.div
              {...reveal(0.5)}
              className="mt-12 flex items-center gap-3 border-t border-border/70 pt-6"
            >
              <span className="h-px w-8 bg-brand-gold" />
              <p className="text-xs font-medium text-muted-foreground">
                No worries. Great journeys have the occasional detour.
              </p>
            </motion.div>
          </section>

          <motion.section
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-label="404 illustration"
            className="relative order-1 mx-auto flex w-full max-w-[660px] items-center justify-center py-4 lg:order-2 lg:py-0"
          >
            <div className="relative aspect-square w-full max-w-[600px]">
              <div
                aria-hidden
                className="absolute inset-0 flex select-none items-center justify-center"
              >
                <span className="font-brand-display text-[clamp(15rem,34vw,29rem)] font-bold leading-none tracking-[-0.15em] text-foreground/[0.025] dark:text-white/[0.04]">
                  404
                </span>
              </div>

              <div className="absolute left-1/2 top-1/2 size-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/70" />

              <motion.div
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{
                  duration: 38,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[9%] rounded-full"
              >
                <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold shadow-[0_0_20px_rgba(244,190,40,0.65)]" />
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center font-brand-display text-[clamp(8rem,19vw,14.5rem)] font-bold leading-none tracking-[-0.14em]">
                  <span>4</span>

                  <div className="relative mx-1 flex size-[0.78em] items-center justify-center rounded-full border-[0.065em] border-brand-electric bg-brand-electric/[0.045] shadow-[0_0_75px_rgba(18,101,244,0.13)]">
                    <div className="absolute inset-[9%] rounded-full border border-brand-electric/20" />

                    <motion.div
                      animate={reduceMotion ? undefined : { rotate: -360 }}
                      transition={{
                        duration: 24,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-[19%] rounded-full border border-dashed border-brand-electric/50"
                    />

                    <div className="relative flex size-[43%] items-center justify-center rounded-full bg-brand-electric text-white shadow-[0_0_35px_rgba(18,101,244,0.4)]">
                      <MoveUpRight size="46%" strokeWidth={2.4} />
                    </div>
                  </div>

                  <span>4</span>
                </div>
              </div>

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                        rotate: [-8, -3, -8],
                      }
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-[9%] top-[16%] z-10"
              >
                <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-card/95 px-3 py-2.5 shadow-premium-md backdrop-blur-xl">
                  <MousePointer2
                    size={17}
                    className="fill-brand-electric text-brand-electric"
                  />
                  <span className="text-[10px] font-bold tracking-tight">
                    Wrong direction?
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={
                  reduceMotion ? undefined : { y: [0, 6, 0], rotate: [2, 0, 2] }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[14%] left-[4%] z-10 w-[190px] rounded-2xl border border-border/80 bg-card/95 p-4 shadow-premium-md backdrop-blur-xl sm:w-[215px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Journey update
                  </span>
                  <span className="size-2 rounded-full bg-brand-gold" />
                </div>

                <p className="mt-3 font-brand-display text-xl font-semibold tracking-tight">
                  Destination lost.
                </p>

                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  Don't worry. We're recalculating.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: "15%" }}
                      animate={
                        reduceMotion
                          ? undefined
                          : { width: ["15%", "75%", "35%", "65%"] }
                      }
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-full rounded-full bg-brand-electric"
                    />
                  </div>
                  <span className="font-mono text-[8px] text-muted-foreground">
                    404
                  </span>
                </div>
              </motion.div>

              <div className="absolute bottom-[25%] right-[12%] flex size-12 items-center justify-center rounded-2xl bg-brand-gold text-brand-obsidian shadow-[0_12px_28px_rgba(244,190,40,0.2)]">
                <MoveUpRight size={23} strokeWidth={1.8} />
              </div>

              <div className="absolute left-[17%] top-[18%] text-brand-electric">
                <Sparkles size={19} strokeWidth={1.4} />
              </div>

              <div className="absolute right-[21%] top-[68%] size-1.5 rounded-full bg-brand-electric shadow-[0_0_14px_rgba(18,101,244,0.65)]" />
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}