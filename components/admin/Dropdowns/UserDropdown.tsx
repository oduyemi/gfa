"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const dropdownItems = [
  { label: "Action", href: "#" },
  { label: "Another action", href: "#" },
  { label: "Something else here", href: "#" },
];

export const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        aria-label="Open user menu"
        className="flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-700 focus:outline-none"
      >
        <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-200">
          <Image
            src="/images/team/team-1-800x800.jpg"
            alt="User profile"
            fill
            sizes="48px"
            className="rounded-full object-cover"
          />
        </span>

        <ChevronDown
          size={16}
          className={`hidden transition-transform duration-200 sm:block ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full z-50 mt-2 min-w-48 origin-top-right rounded-md border border-slate-100 bg-white py-2 text-left shadow-lg transition-all duration-200 ${
          dropdownOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
        role="menu"
        aria-label="User menu"
      >
        {dropdownItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            role="menuitem"
            onClick={() => setDropdownOpen(false)}
            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}

        <div className="my-2 border-t border-slate-100" />

        <button
          type="button"
          role="menuitem"
          onClick={() => setDropdownOpen(false)}
          className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-left text-sm font-normal text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          Separated link
        </button>
      </div>
    </div>
  );
};