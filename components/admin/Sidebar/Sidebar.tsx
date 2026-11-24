"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Settings,
  Table,
  Map,
  Fingerprint,
  ClipboardList,
  Newspaper,
  UserCircle,
  Paintbrush,
  Code2,
  Link as LinkIcon,
  Palette,
  ChevronRight,
} from "lucide-react";

import {NotificationDropdown} from "@/components/admin/Dropdowns/NotificationDropdown";
import {UserDropdown} from "@/components/admin/Dropdowns/UserDropdown";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    label: "Tables",
    href: "/admin/tables",
    icon: Table,
  },
  {
    label: "Maps",
    href: "/admin/maps",
    icon: Map,
  },
];

const authLinks = [
  {
    label: "Login",
    href: "/auth/login",
    icon: Fingerprint,
  },
  {
    label: "Register",
    href: "/auth/register",
    icon: ClipboardList,
  },
];

const pageLinks = [
  {
    label: "Landing Page",
    href: "/landing",
    icon: Newspaper,
  },
  {
    label: "Profile Page",
    href: "/profile",
    icon: UserCircle,
  },
];

const documentationLinks = [
  {
    label: "Styles",
    href: "https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus",
    icon: Paintbrush,
    external: true,
  },
  {
    label: "CSS Components",
    href: "https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus",
    icon: Code2,
    external: true,
  },
];

const technologyLinks = [
  { label: "Angular", icon: Code2 },
  { label: "Javascript", icon: Code2 },
  { label: "NextJS", icon: Code2 },
  { label: "React", icon: Code2 },
  { label: "Svelte", icon: LinkIcon },
  { label: "VueJS", icon: Code2 },
];

interface SidebarProps {
  brand?: string;
}

export const Sidebar = ({
  brand = "Notus React",
}: SidebarProps) => {
  const pathname = usePathname();
  const [collapseShow, setCollapseShow] = useState(false);

  const closeSidebar = () => setCollapseShow(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const sectionHeading =
    "block pb-4 pt-1 text-xs font-bold uppercase text-slate-500";

  const renderNavigationLinks = (
    links: typeof adminLinks,
  ) => (
    <ul className="flex list-none flex-col md:min-w-full">
      {links.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={closeSidebar}
              aria-current={active ? "page" : undefined}
              className={`flex items-center py-3 text-xs font-bold uppercase transition-colors ${
                active
                  ? "text-sky-500 hover:text-sky-600"
                  : "text-slate-700 hover:text-slate-500"
              }`}
            >
              <Icon
                size={17}
                className={`mr-2 ${
                  active ? "opacity-90" : "text-slate-300"
                }`}
              />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <nav className="relative z-40 flex w-full flex-wrap items-center justify-between bg-white px-4 py-4 shadow-xl md:fixed md:bottom-0 md:left-0 md:top-0 md:w-64 md:flex-nowrap md:flex-col md:overflow-y-auto md:overflow-x-hidden md:px-6">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-nowrap md:flex-col md:items-stretch">
          {/* Mobile header */}
          <div className="flex w-full items-center justify-between md:hidden">
            <button
              type="button"
              onClick={() => setCollapseShow((prev) => !prev)}
              aria-label={collapseShow ? "Close sidebar" : "Open sidebar"}
              aria-expanded={collapseShow}
              aria-controls="sidebar-navigation"
              className="rounded border border-transparent px-3 py-1 text-xl text-slate-700 transition-colors hover:bg-slate-100"
            >
              {collapseShow ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link
              href="/"
              className="inline-block whitespace-nowrap px-2 py-2 text-sm font-bold uppercase text-slate-600"
            >
              {brand}
            </Link>

            <ul className="flex list-none items-center gap-3">
              <li>
                <NotificationDropdown />
              </li>
              <li>
                <UserDropdown />
              </li>
            </ul>
          </div>

          {/* Desktop brand */}
          <Link
            href="/"
            className="mr-0 hidden whitespace-nowrap py-2 text-left text-sm font-bold uppercase text-slate-600 md:block md:pb-2"
          >
            {brand}
          </Link>

          {/* Sidebar navigation */}
          <div
            id="sidebar-navigation"
            className={`absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-72px)] flex-1 overflow-y-auto overflow-x-hidden rounded-b-lg bg-white px-6 pb-6 shadow-xl md:static md:mt-4 md:flex md:max-h-none md:w-full md:flex-col md:overflow-visible md:rounded-none md:px-0 md:pb-0 md:shadow-none ${
              collapseShow ? "block" : "hidden"
            }`}
          >
            {/* Mobile collapse header */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4 md:hidden">
              <Link
                href="/"
                onClick={closeSidebar}
                className="inline-block whitespace-nowrap py-2 text-sm font-bold uppercase text-slate-600"
              >
                {brand}
              </Link>

              <button
                type="button"
                onClick={closeSidebar}
                aria-label="Close sidebar"
                className="rounded p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile search */}
            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="mb-4 mt-3 md:hidden"
            >
              <input
                type="search"
                name="sidebar-search"
                placeholder="Search"
                aria-label="Search dashboard"
                className="h-12 w-full rounded border-0 bg-white px-3 py-2 text-base text-slate-600 shadow outline-none ring-1 ring-slate-200 placeholder:text-slate-300 focus:ring-2 focus:ring-sky-400"
              />
            </form>

            <hr className="my-4 min-w-full border-slate-200" />

            {/* Admin layout */}
            <h6 className={sectionHeading}>
              Admin Layout Pages
            </h6>

            {renderNavigationLinks(adminLinks)}

            <hr className="my-4 min-w-full border-slate-200" />

            {/* Auth layout */}
            <h6 className={sectionHeading}>
              Auth Layout Pages
            </h6>

            {renderNavigationLinks(authLinks)}

            <hr className="my-4 min-w-full border-slate-200" />

            {/* No layout pages */}
            <h6 className={sectionHeading}>
              No Layout Pages
            </h6>

            {renderNavigationLinks(pageLinks)}

            <hr className="my-4 min-w-full border-slate-200" />

            {/* Documentation */}
            <h6 className={sectionHeading}>
              Documentation
            </h6>

            <ul className="flex list-none flex-col md:min-w-full">
              {documentationLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 flex items-center text-sm font-semibold text-slate-700 transition-colors hover:text-slate-500"
                    >
                      <Icon
                        size={17}
                        className="mr-2 text-slate-300"
                      />
                      {item.label}
                    </a>
                  </li>
                );
              })}

              {technologyLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <span className="mb-4 flex cursor-default items-center text-sm font-semibold text-slate-500">
                      <Icon
                        size={17}
                        className="mr-2 text-slate-300"
                      />
                      {item.label}
                      <ChevronRight
                        size={13}
                        className="ml-auto text-slate-300"
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {collapseShow && (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
        />
      )}
    </>
  );
};