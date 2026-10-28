"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRightOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Image from "next/image";


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
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
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
    : { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-obsidian-950/90 text-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-brand-gold px-4 py-3 text-obsidian-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="brand-container">
        <div className="flex h-[76px] items-center justify-between gap-5 lg:h-[88px]">
            <Link
            href="/"
            aria-label="Linkorg home"
            className="group flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-electric-400"
            >
            <Image
                src="/images/logo/logo.png"
                alt="Linkorg"
                width={5979}
                height={3991}
                priority
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 240px"
                className="h-[68px] w-auto object-contain transition-opacity duration-200 group-hover:opacity-85 sm:h-[78px] lg:h-[84px]"
            />
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
                  className={`group relative rounded-full px-3.5 py-2.5 text-[13px] font-bold transition-colors duration-200 xl:px-4 ${
                    active
                      ? "text-white"
                      : "text-obsidian-300 hover:text-white"
                  }`}
                >
                  {item.label}

                  {active ? (
                    <motion.span
                      layoutId="header-active-indicator"
                      className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-brand-gold"
                      transition={transition}
                    />
                  ) : (
                    <span className="absolute inset-x-4 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-electric-400 transition-transform duration-200 group-hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop action */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Link
              href="/client"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-electric px-5 text-[13px] font-bold text-white shadow-[0_4px_18px_rgba(18,101,244,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-500 hover:shadow-[0_8px_28px_rgba(18,101,244,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-300 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 xl:px-6"
            >
              Become a client
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg text-white transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-400 lg:hidden"
          >
            {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0 }
            }
            transition={transition}
            className="overflow-hidden border-t border-white/[0.07] lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="brand-container pb-5 pt-3"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian-400">
                  Explore Linkorg
                </span>
                <span className="size-1.5 rounded-full bg-brand-gold" />
              </div>

              <div className="space-y-1">
                {navigation.map((item, index) => {
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, x: -8 }
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
                        className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-bold transition-colors ${
                          active
                            ? "bg-white/[0.07] text-white"
                            : "text-obsidian-300 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {active && (
                            <span className="h-5 w-[3px] rounded-full bg-brand-gold" />
                          )}
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                <p className="font-heading text-lg font-semibold tracking-tight text-white">
                  Ready to go further?
                </p>
                <p className="mt-1.5 max-w-xs text-sm leading-6 text-obsidian-300">
                  Let&apos;s connect you with the right people to move your
                  projects forward.
                </p>

                <Link
                  href="/client"
                  onClick={() => setMenuOpen(false)}
                  className="group mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-electric px-5 text-sm font-bold text-white transition-colors hover:bg-electric-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-300"
                >
                  Become a client
                  <ArrowRightOutlined className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <p className="mt-4 text-center text-[10px] font-medium tracking-wide text-obsidian-500">
                One partner. More possibilities.
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
