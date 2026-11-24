
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MenuOutlined,
  CloseOutlined,
  FileTextOutlined,
  FacebookFilled,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";

import { IndexDropdown } from "@/components/admin/Dropdowns/IndexDropdown";

interface NavbarProps {
  brand?: string;
}

export default function Navbar({
  brand = "Notus React",
}: NavbarProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const closeNavbar = () => setNavbarOpen(false);

  const navLinkClass =
    "flex items-center px-3 py-4 text-xs font-bold uppercase text-slate-700 transition-colors hover:text-slate-500 lg:py-2";

  const socialLinks = [
    {
      label: "Share",
      icon: FacebookFilled,
      href: "https://www.facebook.com/",
    },
    {
      label: "Tweet",
      icon: TwitterOutlined,
      href: "https://twitter.com/",
    },
    {
      label: "Star",
      icon: GithubOutlined,
      href: "https://github.com/",
    },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white px-2 py-3 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="relative flex w-full items-center justify-between lg:w-auto">
          <Link
            href="/"
            onClick={closeNavbar}
            className="mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-slate-700 transition-colors hover:text-slate-900"
          >
            {brand}
          </Link>

          <button
            type="button"
            onClick={() => setNavbarOpen((prev) => !prev)}
            aria-label={navbarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navbarOpen}
            aria-controls="main-navigation"
            className="block cursor-pointer rounded border border-transparent bg-transparent px-3 py-1 text-slate-700 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 lg:hidden"
          >
            {navbarOpen ? (
              <CloseOutlined style={{ fontSize: 23 }} />
            ) : (
              <MenuOutlined style={{ fontSize: 23 }} />
            )}
          </button>
        </div>

        <div
          id="main-navigation"
          className={`w-full flex-grow items-center bg-white transition-all duration-200 lg:flex lg:bg-transparent ${
            navbarOpen ? "mt-3 block" : "hidden"
          }`}
        >
          <ul className="mr-auto flex list-none flex-col lg:flex-row">
            <li className="flex items-center">
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index-navbar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeNavbar}
                className={navLinkClass}
              >
                <FileTextOutlined
                  className="mr-2 text-slate-400"
                  style={{ fontSize: 18 }}
                />
                Docs
              </a>
            </li>
          </ul>

          <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
            <li className="flex items-center px-3 py-2 lg:px-0 lg:py-0">
              <IndexDropdown />
            </li>

            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <li key={social.label} className="flex items-center">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    onClick={closeNavbar}
                    className={navLinkClass}
                  >
                    <Icon
                      className="text-slate-400"
                      style={{ fontSize: 18 }}
                    />

                    <span className="ml-2 inline-block lg:hidden">
                      {social.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
