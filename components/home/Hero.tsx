"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  MoveUpRight,
} from "lucide-react";

export const Hero = () => {
  const reduceMotion = useReducedMotion();

  const enter = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#F8F7F2] text-[#090A0C] dark:bg-[#090A0C] dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-56 h-[560px] w-[560px] rounded-full bg-[#1265F4]/[0.055] blur-[120px] dark:bg-[#1265F4]/[0.12]"
      />

      <div className="brand-container relative">
        <div className="grid items-center gap-12 py-14 sm:py-16 lg:min-h-[650px] lg:grid-cols-[1fr_0.94fr] lg:gap-12 lg:py-16 xl:gap-16">
          <div className="relative z-10 max-w-[610px]">
            <motion.div
              {...enter}
              className="mb-7 inline-flex items-center gap-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1265F4]/10 text-[#1265F4]">
                <MoveUpRight size={15} />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#090A0C]/60 dark:text-white/55 sm:text-[11px]">
                For the ideas that deserve more
              </span>
            </motion.div>

            <motion.h1
              {...enter}
              transition={{
                ...enter.transition,
                delay: 0.08,
              }}
              className="font-brand-display text-[clamp(3.5rem,7.2vw,6.7rem)] font-semibold leading-[0.91] tracking-[-0.075em]"
            >
              Go far with
              <span className="mt-1 block">
                your{" "}
                <span className="relative inline-block text-[#1265F4]">
                  project
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 290 15"
                    className="absolute -bottom-2 left-0 w-full"
                    fill="none"
                  >
                    <path
                      d="M4 10.5C75 3 203 1.5 285 7"
                      stroke="#F4BE28"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </span>
            </motion.h1>

            <motion.p
              {...enter}
              transition={{
                ...enter.transition,
                delay: 0.16,
              }}
              className="mt-8 max-w-[430px] text-[15px] leading-[1.85] text-[#090A0C]/65 dark:text-white/60 sm:text-[17px]"
            >
              You bring the ambition. We bring the people, skills and creative
              energy to make things happen. Think of us as your extended
              digital team.
            </motion.p>

            <motion.div
              {...enter}
              transition={{
                ...enter.transition,
                delay: 0.23,
              }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Link
                href="/client"
                className="group inline-flex min-h-[54px] items-center gap-7 rounded-full bg-[#1265F4] px-6 text-[13px] font-semibold text-white shadow-[0_9px_24px_rgba(18,101,244,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0D55D5] hover:shadow-[0_14px_30px_rgba(18,101,244,0.28)]"
              >
                Start a project
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </Link>

              <Link
                href="/services"
                className="group inline-flex items-center gap-2 py-3 text-[13px] font-semibold text-[#090A0C]/75 transition-colors hover:text-[#1265F4] dark:text-white/75 dark:hover:text-[#6FA0FF]"
              >
                Explore our services
                <ArrowDownRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </Link>
            </motion.div>

            <motion.div
              {...enter}
              transition={{
                ...enter.transition,
                delay: 0.3,
              }}
              className="mt-10 flex items-center gap-4 border-t border-[#090A0C]/10 pt-5 dark:border-white/10"
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#1265F4]" />
                <span className="h-2 w-2 rounded-full bg-[#F4BE28]" />
                <span className="h-2 w-2 rounded-full bg-[#E3D0D8]" />
              </div>

              <p className="text-[11px] font-medium tracking-wide text-[#090A0C]/50 dark:text-white/45">
                One partner. Multiple possibilities. Real progress.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 28,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-[570px] lg:ml-auto"
          >
            {/* Image frame */}
            <div className="relative">
              <div className="relative aspect-[1.02/1] overflow-hidden rounded-[1.6rem] bg-[#D9DCE3] shadow-[0_24px_65px_rgba(9,10,12,0.13)] sm:rounded-[2rem]">
                <Image
                  src="/images/hero.jpg"
                  alt="Creative professionals collaborating on ambitious projects"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/65 via-[#090A0C]/5 to-[#090A0C]/10" />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-[#090A0C]/25 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-white backdrop-blur-md sm:left-7 sm:top-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F4BE28]" />
                  Ideas into action
                </div>

                <div className="absolute bottom-0 left-0 max-w-[72%] p-6 text-white sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                    Your ambition, our expertise
                  </p>
                  <p className="mt-2 font-brand-display text-2xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-3xl">
                    Make more possible.
                  </p>
                </div>
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 16,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-5 right-4 w-[205px] rounded-2xl bg-[#1265F4] p-5 text-white shadow-[0_16px_40px_rgba(18,101,244,0.25)] sm:-right-5 sm:w-[225px] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/65">
                    What we bring
                  </span>
                  <ArrowUpRight size={17} />
                </div>

                <div className="mt-4 space-y-2.5">
                  {["Digital marketing", "Creative", "Virtual assistance"].map(
                    (service) => (
                      <div
                        key={service}
                        className="flex items-center gap-2.5 text-[12px] font-medium"
                      >
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/15">
                          <span className="h-1 w-1 rounded-full bg-[#F4BE28]" />
                        </span>
                        {service}
                      </div>
                    )
                  )}
                </div>
              </motion.div>

              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-12 w-12 rounded-tl-[1.3rem] border-l-[4px] border-t-[4px] border-[#F4BE28] sm:-left-4 sm:-top-4"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
