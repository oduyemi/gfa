"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";


const trustPoints = [
  {
    number: "01",
    title: "People first",
    description: "A thoughtful, personal approach",
  },
  {
    number: "02",
    title: "The right expertise",
    description: "Skills matched to your needs",
  },
  {
    number: "03",
    title: "A clear direction",
    description: "Practical next steps from day one",
  },
];

export const TrustStrip = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-surface-subtle">
      <div className="brand-container">
        <div className="grid gap-7 py-7 sm:py-8 lg:grid-cols-[0.75fr_2fr] lg:items-center lg:gap-12">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between gap-4 lg:block"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-electric" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-electric">
                  The GFA difference
                </span>
              </div>

              <p className="font-brand-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Good work starts with{" "}
                <span className="text-brand-electric">good people.</span>
              </p>
            </div>

            <span className="hidden text-xs text-muted-foreground lg:mt-2 lg:block">
              A better way to move forward.
            </span>

            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground lg:hidden">
              <ArrowUpRight size={16} />
            </span>
          </motion.div>

          {/* Trust points */}
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-0">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.number}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 12,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.1,
                }}
                className="group flex items-start gap-3 rounded-xl border border-border/70 bg-surface px-4 py-3.5 transition-colors duration-300 hover:border-brand-electric/30 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-5 sm:py-2 sm:first:pl-0 sm:last:pr-0 sm:hover:bg-transparent"
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-electric/10 text-brand-electric transition-colors duration-300 group-hover:bg-brand-electric group-hover:text-white">
                  <Check size={14} strokeWidth={2.5} />
                </span>

                <div className="min-w-0">
                  <p className="text-[13px] font-bold tracking-tight text-foreground">
                    {point.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
