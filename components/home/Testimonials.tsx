"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { HomeSection } from "./HomeSection";


export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  organisation?: string;
};

type TestimonialsProps = {
  testimonials?: Testimonial[];
};

export const Testimonials = ({ testimonials = [] }: TestimonialsProps) => {
  const reduceMotion = useReducedMotion();
  
  if (!testimonials.length) return null;
  const featured = testimonials[0];
  const supporting = testimonials.slice(1, 2);

  return (
    <HomeSection
      eyebrow="Client perspectives"
      title={
        <>
          Good work is better{" "}
          <span className="brand-gradient-text">when it works for people.</span>
        </>
      }
      description="Hear from people who have experienced working with GFA."
      className="bg-background"
    >
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Featured testimonial */}
        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative isolate flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[2rem] bg-brand-obsidian p-8 text-white sm:p-10 lg:p-12"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_15%,rgba(18,101,244,0.38),transparent_42%),radial-gradient(ellipse_at_5%_100%,rgba(244,190,40,0.1),transparent_38%)]"
          />

          <div
            aria-hidden
            className="absolute -right-16 -top-20 -z-10 size-64 rounded-full border border-white/[0.08]"
          />

          <div className="relative flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
              A client's perspective
            </span>
            <Quote
              size={34}
              strokeWidth={1.2}
              className="text-brand-gold"
            />
          </div>

          <blockquote className="relative my-12 max-w-3xl font-brand-display text-2xl font-medium leading-[1.45] tracking-[-0.025em] sm:text-3xl lg:text-[2.15rem]">
            “{featured.quote}”
          </blockquote>

          <figcaption className="relative flex items-end justify-between gap-4 border-t border-white/15 pt-6">
            <div>
              <p className="text-sm font-bold text-white">
                {featured.name}
              </p>
              {(featured.role || featured.organisation) && (
                <p className="mt-1 text-xs leading-5 text-white/50">
                  {[featured.role, featured.organisation]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>

            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold">
              01 / 0{Math.min(testimonials.length, 2)}
            </span>
          </figcaption>
        </motion.figure>

        {/* Supporting testimonial */}
        {supporting.length > 0 && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: reduceMotion ? 0 : 0.12,
              ease: "easeOut",
            }}
            className="flex flex-col gap-5"
          >
            {supporting.map((item) => (
              <figure
                key={`${item.name}-${item.quote}`}
                className="group flex flex-1 flex-col justify-between rounded-[2rem] border border-border bg-card p-7 transition-colors duration-300 hover:border-brand-electric/30 sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Another perspective
                    </span>
                    <Quote
                      size={24}
                      strokeWidth={1.4}
                      className="text-brand-electric/60 transition-colors group-hover:text-brand-electric"
                    />
                  </div>

                  <blockquote className="mt-8 font-heading text-lg font-medium leading-8 tracking-tight text-foreground">
                    “{item.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="text-sm font-bold text-foreground">
                    {item.name}
                  </p>
                  {(item.role || item.organisation) && (
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {[item.role, item.organisation]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}

            <div className="flex items-center justify-between rounded-[1.5rem] bg-surface-subtle px-6 py-5">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Every project has a story.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Yours could be next.
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="text-brand-electric"
              />
            </div>
          </motion.div>
        )}
      </div>
    </HomeSection>
  );
}
