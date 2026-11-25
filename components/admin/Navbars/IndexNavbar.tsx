"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { IndexDropdown } from "@/components/admin/Dropdowns/IndexDropdown";


interface NavbarProps {
  brand?: string;
}


export default function IndexNavbar({
  brand = "Go Far Agency",
}: NavbarProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const closeNavbar = () => setNavbarOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-border/70 bg-background/85 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="brand-container">
        <div className="flex min-h-14 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeNavbar}
            className="group flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-electric text-white shadow-md shadow-brand-electric/20 transition-transform group-hover:-rotate-6">
              <Sparkles size={19} />
            </span>

            <span className="font-brand-display text-base font-bold tracking-tight text-foreground sm:text-lg">
              {brand}
              <span className="text-brand-electric">.</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-5 lg:flex">
            <IndexDropdown />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setNavbarOpen((prev) => !prev)}
            aria-label={navbarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navbarOpen}
            aria-controls="main-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:border-brand-electric/40 hover:text-brand-electric lg:hidden"
          >
            {navbarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          id="main-navigation"
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            navbarOpen
              ? "mt-3 max-h-40 border-t border-border pt-4 opacity-100"
              : "max-h-0 opacity-0"
          }`}
          aria-hidden={!navbarOpen}
        >
          <div className="flex flex-col gap-4 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Navigation
              </span>

              <button
                type="button"
                onClick={closeNavbar}
                className="text-xs font-medium text-brand-electric"
              >
                Close
              </button>
            </div>

            <div onClick={closeNavbar}>
              <IndexDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
