"use client";
import { useEffect, useState } from "react";
import { Search, Menu, X, Command, Sun, Moon } from "lucide-react";
import { UserDropdown } from "@/components/admin/Dropdowns/UserDropdown";


interface NavbarProps {
  title?: string;
}

type Theme = "light" | "dark";

export const AdminNavbar = ({ title = "Dashboard" }: NavbarProps) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from saved preference or system preference.
  useEffect(() => {
    const savedTheme = localStorage.getItem("gfa-theme") as Theme | null;

    const initialTheme: Theme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );
    localStorage.setItem("gfa-theme", nextTheme);
  };

  const closeMobileControls = () => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  return (
    <header className="relative z-30 w-full px-4 pt-4 sm:px-6 lg:px-10">
      <div className="brand-container">
        {/* Main navbar */}
        <div className="relative flex min-h-[82px] items-center justify-between gap-3 overflow-hidden rounded-2xl border border-border bg-card/90 px-4 shadow-premium-sm backdrop-blur-xl sm:px-6">
          {/* Subtle brand accent */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-electric via-brand-electric/60 to-brand-gold"
          />

          {/* Page identity */}
          <div className="relative min-w-0 flex-1">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="hidden h-1 w-1 rounded-full bg-brand-gold sm:block" />

              <span className="hidden text-[10px] font-medium text-muted-foreground sm:block">
                Admin workspace
              </span>
            </div>

            <h1 className="truncate font-brand-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
              {title}
            </h1>
          </div>

          {/* Desktop search */}
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="hidden w-full max-w-[340px] xl:block"
          >
            <div className="group relative">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-brand-electric"
              />

              <input
                type="search"
                name="search"
                placeholder="Search anything..."
                aria-label="Search dashboard"
                className="h-11 w-full rounded-xl border border-border bg-surface-subtle pl-11 pr-16 text-xs text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-brand-electric focus:bg-card focus:ring-4 focus:ring-brand-electric/10"
              />

              <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[9px] font-semibold text-muted-foreground">
                <Command size={10} />
                K
              </span>
            </div>
          </form>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <div className="h-8 w-px bg-border" />

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              disabled={!mounted}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              aria-pressed={theme === "dark"}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="group flex h-10 items-center gap-2 rounded-xl border border-border bg-surface-subtle px-3 text-muted-foreground transition-all hover:border-brand-electric/30 hover:bg-brand-electric/5 hover:text-brand-electric disabled:opacity-50"
            >
              {mounted && theme === "dark" ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}

              <span className="hidden text-[11px] font-semibold lg:block">
                {mounted
                  ? theme === "dark"
                    ? "Light mode"
                    : "Dark mode"
                  : "Theme"}
              </span>
            </button>

            <div className="h-8 w-px bg-border" />

            {/* Account */}
            <UserDropdown />
          </div>

          {/* Mobile actions */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              disabled={!mounted}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              aria-pressed={theme === "dark"}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-subtle text-muted-foreground transition-colors hover:border-brand-electric/30 hover:text-brand-electric disabled:opacity-50"
            >
              {mounted && theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                setMobileMenuOpen(false);
              }}
              aria-label={mobileSearchOpen ? "Close search" : "Open search"}
              aria-expanded={mobileSearchOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                mobileSearchOpen
                  ? "bg-brand-electric/10 text-brand-electric"
                  : "text-muted-foreground hover:bg-surface-subtle hover:text-foreground"
              }`}
            >
              {mobileSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setMobileSearchOpen(false);
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                mobileMenuOpen
                  ? "border-brand-electric/20 bg-brand-electric/10 text-brand-electric"
                  : "border-border text-foreground hover:bg-surface-subtle"
              }`}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile search panel */}
        <div
          className={`grid transition-all duration-300 md:hidden ${
            mobileSearchOpen
              ? "mt-3 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="relative rounded-2xl border border-border bg-card p-3 shadow-premium-sm"
            >
              <Search
                size={17}
                className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                type="search"
                name="mobile-search"
                placeholder="Search your dashboard..."
                aria-label="Search dashboard"
                className="h-12 w-full rounded-xl border border-border bg-surface-subtle pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand-electric focus:ring-4 focus:ring-brand-electric/10"
              />
            </form>
          </div>
        </div>

        {/* Mobile account panel */}
        <div
          className={`grid transition-all duration-300 md:hidden ${
            mobileMenuOpen
              ? "mt-3 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-premium-sm">
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Account
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Manage your profile and settings
                </p>
              </div>

              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
