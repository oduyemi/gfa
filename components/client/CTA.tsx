"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MoveUpRight } from "lucide-react";

interface ClientCTAProps {
  onStart: () => void;
}

const revealEase = [0.22, 1, 0.36, 1] as const;

export const ClientCTA = ({ onStart }: ClientCTAProps) => {
  const reducedMotion = useReducedMotion();

  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: reducedMotion ? 0 : 0.7,
      ease: revealEase,
    },
  };

  return (
    <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
      <div className="brand-container">
        <motion.div
          {...reveal}
          className="relative isolate overflow-hidden bg-[#090A0C] text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-36 -top-48 h-[34rem] w-[34rem] rounded-full bg-brand-electric/20 blur-[120px]" />
            <div className="absolute -bottom-52 left-[28%] h-[28rem] w-[28rem] rounded-full bg-brand-gold/[0.09] blur-[110px]" />

            <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

            <div className="absolute right-[-7rem] top-[-9rem] h-[30rem] w-[30rem] rounded-full border border-white/[0.07]" />
            <div className="absolute right-[-3rem] top-[-5rem] h-[22rem] w-[22rem] rounded-full border border-white/[0.06]" />
            <div className="absolute right-[1rem] top-[-1rem] h-[14rem] w-[14rem] rounded-full border border-white/[0.05]" />
          </div>

          <div className="relative px-7 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-[4.5rem]">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 sm:text-xs">
                  The next step
                </span>
              </div>

              <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/30 sm:block">
                Go Far Agency
              </span>
            </div>

            <div className="grid gap-12 pt-12 lg:grid-cols-[1fr_0.48fr] lg:items-end lg:gap-16 lg:pt-16">
              <div className="relative z-10">
                <p className="mb-6 text-xs font-medium text-white/45">
                  You've got the idea. Let's give it momentum.
                </p>

                <h2 className="max-w-4xl font-brand-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-[4.8rem] xl:text-[5.4rem]">
                  Have something
                  <br />
                  you're ready to
                  <br />
                  <span className="text-brand-gold">move forward?</span>
                </h2>
              </div>

              <div className="relative z-10 max-w-sm lg:pb-2">
                <div className="mb-7 h-px w-12 bg-brand-electric" />

                <p className="text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  We'd love to hear about it. Start a conversation and
                  let's explore what we can make possible together.
                </p>

                <button
                  type="button"
                  onClick={onStart}
                  className="group mt-8 inline-flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-brand-electric py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-lg shadow-brand-electric/15 transition duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-xl hover:shadow-brand-electric/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#090A0C]"
                >
                  Let's get started
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <MoveUpRight size={17} />
                  </span>
                </button>

                <p className="mt-5 flex items-center gap-2 text-xs text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                  One conversation. A clearer way forward.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};