"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const dropdownSections = [
  {
    title: "Admin Layout",
    links: [
      { label: "Dashboard", href: "/admin/dashboard" },
      { label: "Settings", href: "/admin/settings" },
      { label: "Tables", href: "/admin/tables" },
      { label: "Maps", href: "/admin/maps" },
    ],
  },
  {
    title: "Auth Layout",
    links: [
      { label: "Login", href: "/auth/login" },
      { label: "Register", href: "/auth/register" },
    ],
  },
  {
    title: "No Layout",
    links: [
      { label: "Landing", href: "/landing" },
      { label: "Profile", href: "/profile" },
    ],
  },
];

export const PagesDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setDropdownOpen((previous) => !previous)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 px-3 py-4 text-xs font-bold uppercase text-slate-700 transition-colors hover:text-slate-500 lg:py-2 lg:text-white lg:hover:text-slate-200"
      >
        Demo Pages

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 w-52 rounded-lg border border-slate-100 bg-white py-2 text-left text-sm shadow-xl"
        >
          {dropdownSections.map((section, index) => (
            <div key={section.title}>
              {index > 0 && (
                <div className="mx-4 my-2 border-t border-slate-100" />
              )}

              <h6 className="block px-4 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                {section.title}
              </h6>

              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                  className="block w-full whitespace-nowrap px-4 py-2 text-sm font-normal text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};