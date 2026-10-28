"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";


const services = [
  "Digital marketing",
  "Creative",
  "Virtual assistance",
];

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.75,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section className="relative isolate overflow-hidden bg-obsidian-950 text-white">
      {/* Atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-48 -top-64 h-[680px] w-[680px] rounded-full bg-electric-600/[0.12] blur-[170px]" />
        <div className="absolute -bottom-72 right-[12%] h-[500px] w-[500px] rounded-full bg-electric-800/[0.13] blur-[150px]" />
        <div className="brand-grid absolute inset-0 opacity-[0.04] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="brand-container relative">
        <div className="grid items-center gap-10 py-10 sm:py-14 lg:min-h-[760px] lg:grid-cols-12 lg:gap-8 lg:py-12 xl:min-h-[810px] xl:gap-10">
          {/* LEFT — EDITORIAL BRAND STATEMENT */}
          <motion.div
            {...reveal(0.05)}
            className="relative z-10 lg:col-span-5 lg:py-8"
          >
            <div className="mb-8 flex items-center gap-3 sm:mb-10">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute h-full w-full rounded-full bg-gold-400/30" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-gold-400" />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-obsidian-300 sm:text-[11px]">
                Your extended digital team
              </span>
            </div>

            <h1 className="brand-display max-w-[620px] text-[clamp(3.7rem,6.6vw,6.45rem)] leading-[0.9] tracking-[-0.08em] text-white">
              Go far
              <br />
              with your
              <br />
              <span className="relative inline-block pb-2">
                <span className="relative z-10 bg-gradient-to-r from-electric-300 via-electric-400 to-[#b9ceff] bg-clip-text text-transparent">
                  projects.
                </span>

                <motion.span
                  aria-hidden="true"
                  initial={shouldReduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.85,
                    delay: shouldReduceMotion ? 0 : 0.45,
                    ease: "easeOut",
                  }}
                  className="absolute bottom-0 left-1 h-1 w-[68%] origin-left rounded-full bg-gold-400 sm:h-[5px]"
                />
              </span>
            </h1>

            <p className="mt-7 max-w-[435px] text-[15px] leading-7 text-obsidian-300 sm:mt-8 sm:text-base sm:leading-8">
              A locally outsourced partner connecting you with digital
              marketing experts, creatives and virtual assistants—ready to
              help you do more, build better and go further.
            </p>

            {/* Primary and secondary actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/client"
                className="group inline-flex min-h-[56px] items-center justify-between gap-6 rounded-xl bg-brand-electric px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(18,101,244,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-electric-500 hover:shadow-[0_14px_40px_rgba(18,101,244,0.34)] sm:justify-center"
              >
                <span>Become a client</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightOutlined />
                </span>
              </Link>

              <Link
                href="/services"
                className="group inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-xl border border-white/[0.13] px-5 py-3.5 text-sm font-medium text-white/80 transition duration-300 hover:border-white/30 hover:bg-white/[0.04] hover:text-white"
              >
                Explore our services
              </Link>
            </div>

            {/* Compact service signature */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2.5 sm:mt-9">
              {services.map((service, index) => (
                <span
                  key={service}
                  className="inline-flex items-center gap-2 text-[11px] font-medium text-obsidian-300 sm:text-xs"
                >
                  {index > 0 && (
                    <span className="mr-1 h-1 w-1 rounded-full bg-gold-400" />
                  )}
                  {service}
                </span>
              ))}
            </div>

            {/* One quiet reassurance */}
            <div className="mt-8 flex items-center gap-3 border-t border-white/[0.09] pt-5 sm:mt-10 sm:pt-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-electric-400/20 bg-electric-400/[0.08] text-electric-300">
                <CheckOutlined className="text-xs" />
              </span>

              <p className="text-sm leading-6 text-white/80">
                <span className="font-semibold text-white">
                  One partner.
                </span>{" "}
                More possibilities.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — IMMERSIVE IMAGE COMPOSITION */}
          <motion.div
            {...reveal(0.14)}
            className="relative lg:col-span-7 lg:-mr-[max(0px,calc((100vw-100%)/2))]"
          >
            <div className="group relative min-h-[460px] overflow-hidden rounded-[22px] border border-white/[0.10] bg-obsidian-900 sm:min-h-[560px] lg:min-h-[660px] lg:rounded-r-none lg:rounded-l-[28px] xl:min-h-[710px]">
              <Image
                src="/images/hero.jpg"
                alt="Creative marketing, design and digital project work"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
              />

              {/* A graduated overlay, not a dark filter over the whole photo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/10 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-obsidian-950/20 via-transparent to-transparent"
              />

              {/* Small editorial label */}
              <div className="absolute left-5 top-5 flex items-center gap-2.5 sm:left-8 sm:top-8">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/85 sm:text-[10px]">
                  Ideas into impact
                </span>
              </div>

              {/* Integrated image typography */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-10 xl:p-12">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-300">
                  Your ambition, amplified
                </p>

                <h2 className="max-w-[550px] text-[clamp(2.6rem,4.5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.065em] text-white">
                  Big ideas.
                  <br />
                  <span className="text-white/65">Better together.</span>
                </h2>

                <div className="mt-6 flex max-w-md items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-400" />
                  <p className="text-xs leading-6 text-white/70 sm:text-sm">
                    The right people, skills and creative energy behind your
                    next move.
                  </p>
                </div>
              </div>

              {/* Subtle image-edge detail */}
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 h-24 w-24 border-r border-t border-white/20"
              />
            </div>

            {/* The one playful signature element */}
            <div className="absolute -bottom-4 right-5 z-10 flex -rotate-2 items-center gap-3 rounded-xl bg-gold-400 px-4 py-3 text-obsidian-950 shadow-[0_12px_32px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:rotate-0 sm:right-8 sm:px-5 sm:py-3.5">
              <span className="text-[10px] font-black uppercase tracking-[0.13em]">
                Good work goes far
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
