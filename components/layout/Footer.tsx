"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Asterisk, MoveUpRight } from "lucide-react";


const navigation = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Our services", href: "/services" },
    { label: "How it works", href: "/how-it-works" },
  ],
  company: [
    { label: "About GFA", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Become a client", href: "/client" },
  ],
};

export const Footer = () => {
  const reduceMotion = useReducedMotion();
  const year = 2026;

  return (
    <footer className="relative isolate overflow-hidden bg-brand-obsidian text-white">
      {/* Background atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_5%,rgba(18,101,244,0.16),transparent_35%),radial-gradient(ellipse_at_0%_100%,rgba(244,190,40,0.07),transparent_30%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-0 -z-10 size-[35rem] rounded-full border border-white/[0.035]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-20 -z-10 size-[25rem] rounded-full border border-brand-electric/10"
      />

      <div className="brand-container">
        {/* Main footer content */}
        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.35fr_0.65fr_0.65fr_0.85fr] lg:gap-12 lg:py-24">
        <div className="max-w-sm">
  <Link
    href="/"
    aria-label="Go Far Agency home"
    className="group inline-flex items-center gap-4"
  >
    <Image
      src="/images/logo/logo.svg"
      alt=""
      width={5979}
      height={3991}
      priority={false}
      className="h-20 w-auto max-w-[10rem] object-contain transition-transform duration-300 group-hover:scale-105"
    />

    <span className="whitespace-nowrap font-heading text-xl font-extrabold tracking-tight text-white">
      Go Far Agency<span className="text-brand-gold">.</span>
    </span>
  </Link>

  <p className="mt-6 text-sm leading-7 text-white/50">
    Your extended digital team. We bring people, expertise, and
    opportunities together to help your ideas move forward.
  </p>

  <div className="mt-7 flex items-center gap-2">
    <span className="size-1.5 rounded-full bg-brand-gold" />
    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
      Go far with your project
    </span>
  </div>
</div>

          {/* Explore */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              {navigation.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              The agency
            </h3>

            <ul className="mt-6 space-y-4">
              {navigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Let's connect
            </h3>

            <p className="mt-6 max-w-[15rem] text-sm leading-6 text-white/50">
              Have a project, a question, or an idea worth exploring?
            </p>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-brand-gold transition-colors hover:text-white"
            >
              Start a conversation
              <span className="flex size-8 items-center justify-center rounded-full border border-brand-gold/30 transition-all duration-300 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-obsidian">
                <MoveUpRight size={15} />
              </span>
            </Link>

            <div className="mt-9 border-t border-white/10 pt-5">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                Our approach
              </span>
              <p className="mt-2 font-brand-display text-xl font-medium tracking-[-0.035em] text-white/80">
                Better together<span className="text-brand-gold">.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Brand statement */}
        <div className="relative overflow-hidden border-y border-white/10 py-9 sm:py-12">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                The bigger picture
              </p>
              <h2 className="mt-3 font-brand-display text-3xl font-semibold leading-tight tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                Think bigger.
                <span className="text-white/35"> Go further.</span>
              </h2>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, rotate: -35 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="hidden shrink-0 text-brand-gold sm:block"
              aria-hidden
            >
              <Asterisk size={58} strokeWidth={0.8} />
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/35">
            © {year} Go Far Agency. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/contact"
              className="text-[11px] font-medium text-white/40 transition-colors hover:text-white"
            >
              Get in touch
            </Link>

            <span className="hidden size-1 rounded-full bg-white/20 sm:block" />

            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
              Made for forward motion
              <Asterisk size={12} className="text-brand-gold" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
