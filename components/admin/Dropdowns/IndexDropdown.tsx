"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";


export const IndexDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;

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
  }, [dropdownOpen]);

  const closeDropdown = () => setDropdownOpen(false);

  const linkClass =
    "block w-full whitespace-nowrap px-4 py-2 text-sm font-normal text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900";

  const sectionClass =
    "block w-full whitespace-nowrap bg-transparent px-4 pb-1 pt-2 text-sm font-bold text-slate-400";

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        onClick={() => setDropdownOpen((current) => !current)}
        className="flex items-center gap-2 px-3 py-4 text-xs font-bold uppercase text-slate-700 transition-colors hover:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:py-2"
      >
        Demo Pages
        <DownOutlined
          className={`text-[10px] transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {dropdownOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[100] mt-1 max-h-[75vh] min-w-48 overflow-y-auto rounded-md bg-white py-2 text-left text-base shadow-xl ring-1 ring-black/5"
        >
          <span className={sectionClass}>Admin Layout</span>

          <Link
            href="/admin"
            role="menuitem"
            onClick={closeDropdown}
            className={linkClass}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/settings"
            role="menuitem"
            onClick={closeDropdown}
            className={linkClass}
          >
            Settings
          </Link>

          <Link
            href="/admin/tables"
            role="menuitem"
            onClick={closeDropdown}
            className={linkClass}
          >
            Tables
          </Link>

          <Link
            href="/admin/maps"
            role="menuitem"
            onClick={closeDropdown}
            className={linkClass}
          >
            Maps
          </Link>

          <div className="mx-4 my-2 border-t border-slate-100" />

          <span className={sectionClass}>Auth Layout</span>

          <Link
            href="/auth/login"
            role="menuitem"
            onClick={closeDropdown}
            className={linkClass}
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            role="menuitem"
            onClick={closeDropdown}
            className={linkClass}
          >
            Register
          </Link>

          <div className="mx-4 my-2 border-t border-slate-100" />

          <span className={sectionClass}>No Layout</span>

          <Link
            href="/landing"
            role="menuitem"
            onClick={closeDropdown}
            className={linkClass}
          >
            Landing
          </Link>

          <Link
            href="/profile"
            role="menuitem"
            onClick={closeDropdown}
            className={linkClass}
          >
            Profile
          </Link>
        </div>
      )}
    </div>
  );
};
