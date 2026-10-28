"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRightOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";



const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-obsidian-950/95 text-white shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
      {/* Soft brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-400/60 to-transparent"
      />

      <a
        href="#main-content"
        className="sr-only z-[60] rounded-lg bg-brand-gold px-4 py-3 font-bold text-obsidian-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="brand-container">
        <div className="flex min-h-[88px] items-center justify-between gap-4 sm:min-h-[96px] lg:min-h-[100px] lg:gap-7">
          {/* Brand */}
          <Link
            href="/"
            aria-label="Linkorg home"
            className="group relative z-10 flex shrink-0 items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-electric-400 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian-950"
          >
            <Image
              src="/images/logo/logo.png"
              alt="Linkorg"
              width={5979}
              height={3991}
              priority
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 240px"
              className="h-[68px] w-auto object-contain transition duration-300 group-hover:scale-[1.025] group-hover:opacity-90 sm:h-[76px] lg:h-[82px]"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden h-full items-center gap-0.5 lg:flex"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex h-11 items-center rounded-full px-3.5 text-[13px] font-semibold tracking-[0.005em] transition-colors duration-200 xl:px-4 ${
                    active
                      ? "text-white"
                      : "text-obsidian-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {active && (
                    <motion.span
                      layoutId="linkorg-nav-active"
                      className="absolute inset-0 rounded-full border border-white/[0.09] bg-white/[0.055]"
                      transition={transition}
                    />
                  )}

                  <span
                    className={`absolute bottom-[5px] left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-brand-gold transition-all duration-200 ${
                      active
                        ? "w-4 opacity-100"
                        : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden shrink-0 items-center lg:flex">
            <Link
              href="/client"
              className="group relative inline-flex min-h-[46px] items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-electric px-5 text-[13px] font-bold text-white shadow-[0_5px_20px_rgba(18,101,244,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_9px_28px_rgba(18,101,244,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-300 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 xl:px-6"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.15] to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Become a client</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.11] bg-white/[0.045] text-lg text-white transition duration-200 hover:border-white/20 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-400 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                initial={shouldReduceMotion ? false : { opacity: 0, rotate: -35, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, rotate: 35, scale: 0.8 }}
                transition={transition}
                className="flex items-center justify-center"
              >
                {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, height: 0, y: -6 }
            }
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0, y: -4 }
            }
            transition={transition}
            className="overflow-hidden border-t border-white/[0.08] lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="brand-container pb-6 pt-5"
            >
              {/* Menu heading */}
              <div className="mb-4 flex items-center justify-between px-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-electric-300">
                    Navigation
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold tracking-tight text-white">
                    Explore Linkorg
                  </p>
                </div>

                <span className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                  <span className="size-2 rounded-full bg-brand-gold shadow-[0_0_12px_rgba(244,190,40,0.45)]" />
                </span>
              </div>

              {/* Navigation links */}
              <div className="space-y-1.5">
                {navigation.map((item, index) => {
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, x: -10 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        ...transition,
                        delay: shouldReduceMotion ? 0 : index * 0.035,
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`group flex min-h-[54px] items-center justify-between rounded-2xl border px-4 transition-colors duration-200 ${
                          active
                            ? "border-white/[0.1] bg-white/[0.065] text-white"
                            : "border-transparent text-obsidian-300 hover:border-white/[0.07] hover:bg-white/[0.035] hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3.5">
                          <span
                            className={`flex size-8 items-center justify-center rounded-xl text-[11px] font-bold transition-colors ${
                              active
                                ? "bg-brand-gold text-obsidian-950"
                                : "bg-white/[0.055] text-obsidian-400 group-hover:text-white"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-semibold">
                            {item.label}
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA panel */}
              <div className="relative mt-5 overflow-hidden rounded-[24px] border border-white/[0.1] bg-[#101725] p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-16 size-40 rounded-full border border-electric-400/15"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-5 -top-9 size-24 rounded-full border border-brand-gold/15"
                />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-electric-300/20 bg-electric-400/[0.09] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-electric-200">
                    <span className="size-1.5 rounded-full bg-brand-gold" />
                    Let&apos;s work together
                  </span>

                  <h3 className="mt-4 max-w-[260px] font-heading text-xl font-semibold leading-snug tracking-tight text-white">
                    Have a project in mind?
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-obsidian-300">
                    Let&apos;s connect you with the right people to move your
                    ideas forward.
                  </p>

                  <Link
                    href="/client"
                    onClick={() => setMenuOpen(false)}
                    className="group mt-5 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-xl bg-brand-electric px-5 text-sm font-bold text-white transition duration-200 hover:bg-electric-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101725]"
                  >
                    Become a client
                    <ArrowRightOutlined className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="h-px w-6 bg-white/10" />
                <p className="text-center text-[10px] font-medium tracking-[0.12em] text-obsidian-400">
                  ONE PARTNER. MORE POSSIBILITIES.
                </p>
                <span className="h-px w-6 bg-white/10" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
