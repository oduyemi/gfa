"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@teispace/next-themes";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How it works", href: "/how-it-works" },
  { name: "About us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const motionTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeOut" as const };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative rounded-[1.35rem] border border-black/[0.07] bg-transparent shadow-[0_8px_35px_rgba(9,10,12,0.055)] backdrop-blur-2xl transition-colors duration-300 dark:border-white/[0.09] dark:bg-[#090A0C]/90 dark:shadow-[0_8px_35px_rgba(0,0,0,0.25)]">
          <div className="flex h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-7">
            {/* Brand */}
            <Link
              href="/"
              aria-label="Go Far Agency home"
              className="group flex shrink-0 items-center gap-3"
            >
              <span className="relative flex h-[3.65rem] w-[5.15rem] shrink-0 items-center justify-center">
                <Image
                  src="/images/logo/logo.svg"
                  alt=""
                  width={5979}
                  height={3991}
                  priority
                  sizes="82px"
                  className="h-full w-full scale-[1.12] object-contain transition-transform duration-300 group-hover:scale-[1.18]"
                />
              </span>

              <span className="whitespace-nowrap font-[var(--font-poppins)] text-[15px] font-extrabold tracking-[-0.045em] text-[#090A0C] dark:text-white sm:text-base">
                Go Far Agency
                <span className="text-[#1265F4]">.</span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                      active
                        ? "text-[#1265F4] dark:text-[#6FA0FF]"
                        : "text-[#555B66] hover:bg-black/[0.045] hover:text-[#090A0C] dark:text-[#B0B5C0] dark:hover:bg-white/[0.06] dark:hover:text-white"
                    }`}
                  >
                    {item.name}

                    {active && (
                      <motion.span
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 -z-10 rounded-full bg-[#1265F4]/[0.085] dark:bg-[#1265F4]/20"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/70 text-[#424853] transition-all duration-200 hover:border-[#1265F4]/30 hover:bg-[#1265F4]/[0.07] hover:text-[#1265F4] dark:border-white/10 dark:bg-white/[0.045] dark:text-[#D5D8DF] dark:hover:border-[#1265F4]/50 dark:hover:bg-[#1265F4]/15 dark:hover:text-[#8DB2FF]"
              >
                {mounted ? (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isDark ? "sun" : "moon"}
                      initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
                      transition={motionTransition}
                    >
                      {isDark ? (
                        <Sun size={17} strokeWidth={2} />
                      ) : (
                        <Moon size={17} strokeWidth={2} />
                      )}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <Moon size={17} strokeWidth={2} />
                )}
              </button>

              <Link
                href="/client"
                className="group hidden h-11 items-center gap-2 rounded-full bg-[#1265F4] px-5 text-[13px] font-bold text-white shadow-[0_5px_15px_rgba(18,101,244,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0756DF] hover:shadow-[0_8px_22px_rgba(18,101,244,0.3)] sm:inline-flex"
              >
                Become a client
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((current) => !current)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#090A0C] text-white transition-colors hover:bg-[#1265F4] dark:bg-white dark:text-[#090A0C] dark:hover:bg-[#1265F4] dark:hover:text-white lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={motionTransition}
                  >
                    {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.28, ease: "easeInOut" }
                }
                className="overflow-hidden lg:hidden"
              >
                <div className="border-t border-black/[0.07] px-4 pb-5 pt-4 dark:border-white/[0.09] sm:px-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#858A94] dark:text-[#858D9B]">
                      Explore Go Far
                    </p>
                    <span className="text-[10px] font-semibold text-[#1265F4]">
                      YOUR EXTENDED DIGITAL TEAM
                    </span>
                  </div>

                  <nav aria-label="Mobile navigation" className="space-y-1">
                    {navigation.map((item, index) => {
                      const active = isActive(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`group flex items-center justify-between rounded-xl px-3 py-3.5 transition-colors ${
                            active
                              ? "bg-[#1265F4]/[0.08] text-[#1265F4] dark:bg-[#1265F4]/15 dark:text-[#8DB2FF]"
                              : "text-[#252A33] hover:bg-black/[0.04] dark:text-[#E5E7EB] dark:hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="flex items-center gap-4">
                            <span className="font-mono text-[10px] text-[#A0A4AD] dark:text-[#747D8B]">
                              0{index + 1}
                            </span>
                            <span className="text-[15px] font-semibold">
                              {item.name}
                            </span>
                          </span>

                          <ArrowUpRight
                            size={17}
                            className={`transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                              active
                                ? "opacity-100"
                                : "opacity-35 group-hover:opacity-100"
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-4 rounded-2xl bg-[#EEF2FC] p-5 dark:bg-[#111B2C]">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-[#1265F4]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1265F4] dark:bg-[#1265F4]/20 dark:text-[#8DB2FF]">
                        Let&apos;s get moving
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#F4BE28]" />
                    </div>

                    <p className="max-w-[260px] font-[var(--font-poppins)] text-xl font-bold leading-snug tracking-[-0.04em] text-[#090A0C] dark:text-white">
                      Have a project in mind?
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#626875] dark:text-[#A6ACB8]">
                      Let&apos;s make progress together. Tell us what you&apos;re
                      working on.
                    </p>

                    <Link
                      href="/client"
                      className="group mt-5 flex h-12 w-full items-center justify-between rounded-xl bg-[#1265F4] px-4 text-sm font-bold text-white transition-colors hover:bg-[#0756DF]"
                    >
                      Become a client
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#969BA5] dark:text-[#737C8A]">
                      Go far with your project.
                    </span>
                    <span className="font-[var(--font-poppins)] text-xs font-extrabold tracking-tight text-[#090A0C] dark:text-white">
                      GFA<span className="text-[#1265F4]">.</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
