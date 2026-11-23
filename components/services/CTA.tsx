"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Asterisk, MoveUpRight } from "lucide-react";
import { ContactDialog } from "@/dialogs/contact-dialog";

export const ServicesCTA = () => {
  const reduceMotion = useReducedMotion();
  const [dialogType, setDialogType] = useState<"creation" | "execution" | "assistance" | "general" | null>(null);


  return (
    <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
      <div className="brand-container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden rounded-[2rem] bg-brand-obsidian text-white sm:rounded-[2.5rem]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,rgba(18,101,244,0.22),transparent_42%),linear-gradient(115deg,transparent_45%,rgba(255,255,255,0.025)_100%)]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 -z-10 size-[28rem] rounded-full border border-white/[0.06] sm:size-[36rem]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-16 -z-10 size-[22rem] rounded-full border border-brand-electric/20 sm:size-[29rem]"
          />

          <div className="relative grid min-h-[420px] lg:min-h-[510px] lg:grid-cols-[1fr_0.48fr]">
            {/* Main statement */}
            <div className="relative z-10 flex flex-col justify-center px-7 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold sm:text-xs">
                  The next move is yours
                </span>
              </div>

              <h2 className="mt-10 font-brand-display text-[clamp(3.8rem,8.5vw,7.8rem)] font-semibold leading-[0.84] tracking-[-0.085em]">
                Let's make
                <br />
                <span className="relative inline-block text-brand-gold">
                  it happen.
                  <motion.span
                    aria-hidden
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-3 left-1 h-[3px] w-[88%] origin-left rounded-full bg-brand-gold/70 sm:-bottom-4 sm:h-1"
                  />
                </span>
              </h2>

              <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <button
                type="button"
                onClick={() => setDialogType("general")}
                  className="group inline-flex min-h-14 w-fit items-center gap-7 rounded-full bg-brand-electric py-2 pl-7 pr-2 text-sm font-bold text-white shadow-[0_12px_35px_rgba(18,101,244,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-electric-500 hover:shadow-[0_16px_42px_rgba(18,101,244,0.4)]"
                >
                  Start a conversation
                  <span className="flex size-10 items-center justify-center rounded-full bg-white text-brand-electric transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={19} />
                  </span>
                </button>

                <span className="text-xs font-medium tracking-wide text-white/40">
                  Your extended digital team.
                </span>
              </div>
            </div>

            <div className="relative hidden items-center justify-center overflow-hidden lg:flex">
              <div
                aria-hidden
                className="absolute inset-y-12 left-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
              />

              <div className="relative flex size-[340px] items-center justify-center">
                <motion.div
                  aria-hidden
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 42,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-white/[0.10]"
                >
                  <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold shadow-[0_0_20px_rgba(244,190,40,0.65)]" />
                </motion.div>

                <motion.div
                  aria-hidden
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={{
                    duration: 55,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-8 rounded-full border border-brand-electric/30"
                >
                  <span className="absolute bottom-8 right-5 size-2 rounded-full bg-brand-electric shadow-[0_0_18px_rgba(18,101,244,0.9)]" />
                </motion.div>

                <div className="absolute inset-[4.5rem] rounded-full border border-dashed border-white/10" />
                <div className="relative flex size-40 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] p-5 shadow-[0_0_80px_rgba(18,101,244,0.2)] backdrop-blur-md sm:size-44">
                  <Image
                    src="/images/logo/logo.svg"
                    alt="Go Far Agency"
                    width={5979}
                    height={3991}
                    sizes="176px"
                    className="h-full w-full object-contain drop-shadow-[0_4px_18px_rgba(255,255,255,0.12)]"
                  />
                </div>

                <div className="absolute -right-1 top-16 flex size-16 items-center justify-center rounded-2xl bg-brand-gold text-brand-obsidian shadow-[0_12px_35px_rgba(244,190,40,0.2)]">
                  <MoveUpRight size={30} strokeWidth={1.8} />
                </div>

                <div className="absolute -bottom-1 left-10 text-brand-electric">
                  <Asterisk size={44} strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <ContactDialog
      type={dialogType}
      onClose={() => setDialogType(null)}
    />
    </section>
  );
}
