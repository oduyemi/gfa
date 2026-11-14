"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { homeAudiences } from "./home-data";
import { HomeSection } from "./HomeSection";


export const AudienceSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <HomeSection
      eyebrow="Who we work with"
      title={
        <>
          Wherever you are in your journey,{" "}
          <span className="brand-gradient-text">let's find your next move.</span>
        </>
      }
      description="Different ambitions call for different kinds of support. We start with your context and build from there."
      className="bg-background"
    >
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] bg-brand-obsidian p-8 text-white sm:p-10"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(18,101,244,0.38),transparent_38%),linear-gradient(145deg,transparent_55%,rgba(244,190,40,0.1))]"
          />

          <div
            aria-hidden
            className="absolute -right-16 bottom-12 size-56 rounded-full border border-white/[0.09]"
          />
          <div
            aria-hidden
            className="absolute -right-4 bottom-24 size-32 rounded-full border border-brand-electric/40"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-white/55">
              <span className="size-1.5 rounded-full bg-brand-gold" />
              Different paths. Shared ambition.
            </span>
          </div>

          <div className="relative mt-16">
            <h3 className="max-w-sm font-brand-display text-3xl font-semibold leading-[1.12] tracking-[-0.035em] sm:text-4xl">
              Your starting point doesn't define{" "}
              <span className="text-brand-gold">how far you can go.</span>
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Whether you're building something new or ready for what's next,
              there's room to make meaningful progress.
            </p>
          </div>

          <div className="relative mt-10 flex items-center justify-between border-t border-white/15 pt-5">
            <span className="text-xs font-medium text-white/55">
              Let's make the next move count.
            </span>
            <MoveUpRight size={19} className="text-brand-gold" />
          </div>
        </motion.div>

        {/* Audience list */}
        <div className="flex flex-col">
          <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              The people behind the projects
            </p>
            <span className="text-xs font-semibold text-muted-foreground">
              01 — 0{homeAudiences.length}
            </span>
          </div>

          <div className="divide-y divide-border">
            {homeAudiences.map((item, index) => (
              <motion.article
                key={item.index}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, x: 20 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                  ease: "easeOut",
                }}
                className="group grid gap-4 py-7 first:pt-3 last:pb-3 sm:grid-cols-[58px_1fr_auto] sm:items-center sm:gap-6"
              >
                <span className="font-brand-display text-2xl font-semibold tracking-tight text-brand-electric/70 transition-colors duration-300 group-hover:text-brand-electric">
                  {item.index}
                </span>

                <div>
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand-electric sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <span className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-white">
                  <ArrowUpRight size={17} />
                </span>
              </motion.article>
            ))}
          </div>

          <div className="mt-auto border-t border-border pt-6">
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Whatever your next chapter looks like, we bring the{" "}
              <span className="font-semibold text-foreground">
                people, skills, and perspective
              </span>{" "}
              to help you move towards it.
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
};
