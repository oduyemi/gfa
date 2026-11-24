"use client";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { UserDropdown } from "@/components/admin/Dropdowns/UserDropdown";

interface NavbarProps {
  title?: string;
}

export const AdminNavbar = ({ title = "Dashboard" }: NavbarProps) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <nav className="absolute left-0 top-0 z-10 flex w-full items-center bg-transparent p-4 md:flex-nowrap md:flex-row md:justify-start">
      <div className="mx-auto flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-10">
        {/* Page title */}
        <div className="hidden lg:inline-block">
          <span className="text-sm font-semibold uppercase tracking-wide text-white">
            {title}
          </span>
        </div>

        {/* Mobile controls */}
        <div className="flex w-full items-center justify-between md:hidden">
          <span className="text-sm font-semibold uppercase text-white">
            {title}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSearchOpen((prev) => !prev)}
              aria-label={mobileSearchOpen ? "Close search" : "Open search"}
              className="text-white transition-colors hover:text-slate-200"
            >
              {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <UserDropdown />
          </div>
        </div>

        {/* Desktop search */}
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="mr-3 hidden flex-row flex-wrap items-center lg:ml-auto md:flex"
        >
          <div className="relative flex w-full flex-wrap items-stretch">
            <span className="absolute left-0 top-0 z-10 flex h-full w-10 items-center justify-center text-slate-300">
              <Search size={17} />
            </span>

            <input
              type="search"
              name="search"
              placeholder="Search here..."
              aria-label="Search dashboard"
              className="relative w-full rounded border-0 bg-white py-3 pl-10 pr-3 text-sm text-slate-600 shadow outline-none placeholder:text-slate-300 focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </form>

        {/* Desktop user menu */}
        <div className="hidden items-center md:flex">
          <UserDropdown />
        </div>

        {/* Mobile search field */}
        {mobileSearchOpen && (
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="mt-4 w-full md:hidden"
          >
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                name="mobile-search"
                placeholder="Search here..."
                aria-label="Search dashboard"
                autoFocus
                className="w-full rounded-lg border-0 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 shadow outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </form>
        )}
      </div>
    </nav>
  );
};

