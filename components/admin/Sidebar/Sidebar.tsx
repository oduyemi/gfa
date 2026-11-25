
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Table,
  Users,
  UserPlus,
  Search,
  LogOut,
  ArrowUpRight,
  LoaderCircle,
  ChevronRight,
  Command,
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
  Mail,
  type LucideIcon,
} from "lucide-react";

interface SidebarProps {
  brand?: string;
}

interface NavigationLink {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

interface NavigationGroup {
  title: string;
  description: string;
  links: NavigationLink[];
}

const navigationGroups: NavigationGroup[] = [
  {
    title: "Overview",
    description: "Your agency workspace",
    links: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        description: "Overview and activity",
      },
      {
        label: "Enquiries",
        href: "/admin/enquiries",
        icon: Table,
        description: "Website submissions",
      },
      {
        label: "Mailing list",
        href: "/admin/mailing-list",
        icon: Mail,
        description: "Newsletter subscribers",
      },
    ],
  },
  {
    title: "Administration",
    description: "Manage workspace access",
    links: [
      {
        label: "Manage Admins",
        href: "/admin/auth/users",
        icon: Users,
        description: "Administrator accounts",
      },
      {
        label: "Create Admin",
        href: "/admin/auth/register",
        icon: UserPlus,
        description: "Invite an administrator",
      },
    ],
  },
];

const SIDEBAR_STORAGE_KEY = "gfa-admin-sidebar-collapsed";

export const Sidebar = ({
  brand = "Go Far Agency",
}: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [enquirySearch, setEnquirySearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [mounted, setMounted] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  const isActive = (href: string) =>
    href === "/admin"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved === "true") setCollapsed(true);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      String(collapsed)
    );
  }, [collapsed, mounted]);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSidebar();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  const handleEnquirySearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const query = enquirySearch.trim();

    router.push(
      query
        ? `/admin/enquiries?search=${encodeURIComponent(query)}`
        : "/admin/enquiries"
    );

    closeSidebar();
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.error || "Unable to log out. Please try again."
        );
      }

      closeSidebar();
      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setLoggingOut(false);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed((previous) => !previous);
  };

  return (
    <>
      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label="Close sidebar"
        tabIndex={sidebarOpen ? 0 : -1}
        onClick={closeSidebar}
        className={`
          fixed inset-0 z-[60] bg-black/55 backdrop-blur-[3px]
          transition-opacity duration-300 md:hidden
          ${
            sidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        aria-label="Admin sidebar"
        aria-hidden={!sidebarOpen ? undefined : false}
        className={`
          fixed inset-y-0 left-0 z-[70]
          flex flex-col overflow-hidden
          border-r shadow-[12px_0_45px_rgba(9,10,12,0.08)]
          transition-[width,transform,background-color,border-color]
          duration-300 ease-in-out

          border-[#E5E3DC] bg-[#F8F7F2] text-[#090A0C]
          dark:border-[#292D35] dark:bg-[#090A0C] dark:text-white

          w-[min(88vw,310px)]
          md:translate-x-0 md:shadow-none

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }

          ${
            collapsed
              ? "md:w-[76px]"
              : "md:w-[270px]"
          }
        `}
      >
        {/* Brand header */}
        <div
          className={`
            flex h-[76px] shrink-0 items-center border-b
            border-[#E5E3DC] dark:border-[#292D35]
            ${
              collapsed
                ? "justify-center px-3"
                : "justify-between px-4 sm:px-5"
            }
          `}
        >
          <Link
            href="/admin"
            onClick={closeSidebar}
            title={brand}
            className="group flex min-w-0 items-center gap-3"
          >
            <span
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                overflow-hidden rounded-xl bg-[#090A0C] p-1.5
                shadow-sm transition-all duration-300
                group-hover:shadow-md group-hover:shadow-[#1265F4]/20
                dark:bg-[#111318] dark:ring-1 dark:ring-white/10
              "
            >
              <Image
                src="/images/logo/logo.svg"
                alt={`${brand} logo`}
                width={5979}
                height={3991}
                priority
                sizes="40px"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </span>

            {!collapsed && (
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-extrabold tracking-tight text-[#090A0C] dark:text-white">
                  Go Far Agency
                </span>
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.17em] text-[#777D89] dark:text-[#AAB6C8]">
                  Admin portal
                </span>
              </span>
            )}
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl border border-[#E3E2DC] bg-white
              text-[#626875] transition-all
              hover:border-[#1265F4]/30 hover:bg-[#EDF3FF]
              hover:text-[#1265F4] active:scale-95
              dark:border-[#343945] dark:bg-[#111318]
              dark:text-[#CBD5E1] dark:hover:border-[#1265F4]/50
              dark:hover:bg-[#17243A] dark:hover:text-[#8BB6FF]
              md:hidden
            "
          >
            <X size={18} />
          </button>

          {/* Desktop collapse */}
          {!collapsed && (
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="
                hidden h-9 w-9 shrink-0 items-center justify-center
                rounded-xl text-[#7C8491] transition-all
                hover:bg-[#ECEBE5] hover:text-[#1265F4]
                dark:text-[#AAB6C8] dark:hover:bg-[#171A22]
                dark:hover:text-[#8BB6FF] md:flex
              "
            >
              <PanelLeftClose size={18} />
            </button>
          )}

          {collapsed && (
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="
                hidden absolute right-[-100px] md:flex
              "
            >
              <PanelLeftOpen size={18} />
            </button>
          )}
        </div>

        {/* Collapsed desktop expand control */}
        {collapsed && (
          <div className="hidden shrink-0 justify-center pt-3 md:flex">
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="
                flex h-9 w-9 items-center justify-center rounded-xl
                text-[#7C8491] transition-colors
                hover:bg-[#ECEBE5] hover:text-[#1265F4]
                dark:text-[#AAB6C8] dark:hover:bg-[#171A22]
                dark:hover:text-[#8BB6FF]
              "
            >
              <PanelLeftOpen size={18} />
            </button>
          </div>
        )}

        {/* Workspace identity */}
        <div
          className={`shrink-0 ${
            collapsed
              ? "px-3 pb-3 pt-4"
              : "px-4 pb-4 pt-5 sm:px-5"
          }`}
        >
          <div
            className={`
              relative overflow-hidden rounded-2xl border
              border-[#D9E5FF] bg-[#EAF1FF]
              dark:border-[#292D35] dark:bg-[#111318]
              ${
                collapsed
                  ? "flex justify-center p-3"
                  : "px-3.5 py-3"
              }
            `}
            title={collapsed ? "Admin workspace" : undefined}
          >
            <div
              aria-hidden="true"
              className="absolute -right-7 -top-8 h-24 w-24 rounded-full bg-[#1265F4]/10 blur-2xl dark:bg-[#1265F4]/[0.12]"
            />

            {collapsed ? (
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-25" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            ) : (
              <div className="relative flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-25" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#090A0C] dark:text-white">
                      Admin workspace
                    </p>
                    <p className="mt-0.5 truncate text-[10px] font-medium text-[#596273] dark:text-[#CBD5E1]">
                      Website management
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-md border border-[#C9DAFF] bg-white/80 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#1265F4] dark:border-[#343945] dark:bg-[#1B202B] dark:text-[#A9CAFF]">
                  GFA
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Enquiry search */}
        {!collapsed && (
          <div className="shrink-0 px-4 pb-5 sm:px-5">
            <div className="mb-2 flex items-center justify-between px-1">
              <label
                htmlFor="enquiry-search"
                className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#555D6B] dark:text-[#AAB6C8]"
              >
                Find an enquiry
              </label>

              <span className="flex items-center gap-1 rounded-md border border-[#E0DFD9] bg-white px-1.5 py-1 text-[9px] font-semibold text-[#626875] dark:border-[#343945] dark:bg-[#111318] dark:text-[#CBD5E1]">
                <Command size={10} />
                Search
              </span>
            </div>

            <form onSubmit={handleEnquirySearch}>
              <div className="group relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C8491] transition-colors group-focus-within:text-[#1265F4] dark:text-[#AAB6C8] dark:group-focus-within:text-[#80B1FF]"
                />

                <input
                  id="enquiry-search"
                  type="search"
                  value={enquirySearch}
                  onChange={(event) =>
                    setEnquirySearch(event.target.value)
                  }
                  placeholder="Name, email or subject..."
                  aria-label="Search website enquiries"
                  className="
                    h-11 w-full rounded-xl border border-[#DCDDDC]
                    bg-white pl-10 pr-11 text-xs font-medium
                    text-[#090A0C] outline-none transition-all
                    placeholder:text-[#9297A1] hover:border-[#B9C8E2]
                    focus:border-[#1265F4] focus:ring-4
                    focus:ring-[#1265F4]/10
                    dark:border-[#343945] dark:bg-[#111318]
                    dark:text-white dark:placeholder:text-[#AAB6C8]
                    dark:hover:border-[#50698F]
                    dark:focus:border-[#5A9AFF]
                    dark:focus:ring-[#3984FF]/15
                  "
                />

                <button
                  type="submit"
                  aria-label="Search enquiries"
                  className="
                    absolute right-2 top-1/2 flex h-7 w-7
                    -translate-y-1/2 items-center justify-center
                    rounded-lg bg-[#EDF3FF] text-[#1265F4]
                    transition-all hover:bg-[#1265F4]
                    hover:text-white active:scale-95
                    dark:bg-[#203A61] dark:text-[#A9CAFF]
                    dark:hover:bg-[#347CF0] dark:hover:text-white
                  "
                >
                  <ArrowRight size={15} />
                </button>
              </div>

              <p className="mt-2 px-1 text-[10px] leading-relaxed text-[#777D89] dark:text-[#AAB6C8]">
                Search your website submissions.
              </p>
            </form>
          </div>
        )}

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className={`
            min-h-0 flex-1 overflow-y-auto overscroll-contain
            pb-6
            ${
              collapsed
                ? "px-2"
                : "px-3 sm:px-4"
            }
          `}
        >
          {navigationGroups.map((group) => (
            <section key={group.title} className="mb-5">
              {!collapsed && (
                <div className="mb-2.5 px-3">
                  <h2 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#777D89] dark:text-[#AAB6C8]">
                    {group.title}
                  </h2>

                  <p className="mt-1 text-[10px] text-[#969BA4] dark:text-[#AAB6C8]">
                    {group.description}
                  </p>
                </div>
              )}

              {collapsed && (
                <div
                  className="mx-auto mb-3 mt-2 h-px w-8 bg-[#DCDAD2] dark:bg-[#292D35]"
                  aria-hidden="true"
                />
              )}

              <ul className="space-y-1">
                {group.links.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeSidebar}
                        aria-current={active ? "page" : undefined}
                        title={collapsed ? item.label : undefined}
                        className={`
                          group relative flex min-h-[54px]
                          items-center rounded-xl transition-all duration-200
                          ${
                            collapsed
                              ? "justify-center px-2"
                              : "gap-3 px-3 py-2.5"
                          }
                          ${
                            active
                              ? "bg-[#E5EEFF] dark:bg-[#17243A]"
                              : "hover:bg-[#EFEEE9] dark:hover:bg-[#151922]"
                          }
                        `}
                      >
                        {active && (
                          <span
                            aria-hidden="true"
                            className="
                              absolute bottom-2 left-0 top-2 w-[3px]
                              rounded-r-full bg-[#1265F4]
                              dark:bg-[#69A5FF]
                            "
                          />
                        )}

                        <span
                          className={`
                            flex h-10 w-10 shrink-0 items-center
                            justify-center rounded-xl
                            transition-all duration-200
                            ${
                              active
                                ? "bg-[#1265F4] text-white shadow-md shadow-[#1265F4]/20 dark:bg-[#347CF0]"
                                : "bg-white text-[#505968] shadow-sm ring-1 ring-[#E7E6E1] group-hover:bg-[#E5EEFF] group-hover:text-[#1265F4] group-hover:ring-[#C8D9FF] dark:bg-[#111318] dark:text-[#CBD5E1] dark:shadow-none dark:ring-[#292D35] dark:group-hover:bg-[#203A61] dark:group-hover:text-[#8DB9FF] dark:group-hover:ring-[#3C659B]"
                            }
                          `}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                        </span>

                        {!collapsed && (
                          <>
                            <span className="min-w-0 flex-1">
                              <span
                                className={`
                                  block truncate text-[12px] font-bold
                                  ${
                                    active
                                      ? "text-[#174B9F] dark:text-[#B9D5FF]"
                                      : "text-[#292E39] dark:text-[#F1F5F9]"
                                  }
                                `}
                              >
                                {item.label}
                              </span>

                              <span
                                className={`
                                  mt-0.5 block truncate text-[10px]
                                  ${
                                    active
                                      ? "text-[#5274AA] dark:text-[#CBD5E1]"
                                      : "text-[#777D89] dark:text-[#AAB6C8]"
                                  }
                                `}
                              >
                                {item.description}
                              </span>
                            </span>

                            {active ? (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1265F4] dark:bg-[#75ADFF]" />
                            ) : (
                              <ChevronRight
                                size={15}
                                className="shrink-0 text-[#8D95A3] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-[#AAB6C8]"
                              />
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        {/* Footer / logout */}
        <div
          className={`
            shrink-0 border-t border-[#E5E3DC]
            bg-[#F1F0EA] dark:border-[#292D35]
            dark:bg-[#0D0F12]
            ${
              collapsed
                ? "p-3"
                : "p-4"
            }
          `}
        >
          {logoutError && !collapsed && (
            <p
              role="alert"
              className="
                mb-3 rounded-xl border border-red-200
                bg-red-50 px-3 py-2.5 text-[10px]
                leading-relaxed text-red-700
                dark:border-red-400/20 dark:bg-red-500/10
                dark:text-red-300
              "
            >
              {logoutError}
            </p>
          )}

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            title={collapsed ? "Sign out" : undefined}
            className={`
              group flex min-h-[50px] w-full items-center
              rounded-xl border border-[#E2E1DC] bg-white
              text-left transition-all
              hover:border-red-200 hover:bg-red-50
              disabled:cursor-not-allowed disabled:opacity-60
              dark:border-[#292D35] dark:bg-[#111318]
              dark:hover:border-red-400/30 dark:hover:bg-red-500/10
              ${
                collapsed
                  ? "justify-center px-2"
                  : "gap-3 px-3 py-2.5"
              }
            `}
          >
            <span className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg bg-[#F1F0EC] text-[#555D6B]
              transition-colors group-hover:bg-red-100
              group-hover:text-red-600
              dark:bg-[#1B202B] dark:text-[#CBD5E1]
              dark:group-hover:bg-red-500/15
              dark:group-hover:text-red-300
            ">
              {loggingOut ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <LogOut size={17} />
              )}
            </span>

            {!collapsed && (
              <>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-[#272D39] group-hover:text-red-700 dark:text-white dark:group-hover:text-red-300">
                    {loggingOut ? "Signing out..." : "Sign out"}
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[#777D89] dark:text-[#AAB6C8]">
                    End your admin session
                  </span>
                </span>

                {!loggingOut && (
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-[#969DA9] transition-colors group-hover:text-red-600 dark:text-[#AAB6C8] dark:group-hover:text-red-300"
                  />
                )}
              </>
            )}
          </button>

          {!collapsed && (
            <p className="mt-3 text-center text-[9px] font-medium tracking-wide text-[#777D89] dark:text-[#AAB6C8]">
              © {new Date().getFullYear()} Go Far Agency
            </p>
          )}
        </div>
      </aside>

      {/* Mobile menu trigger */}
      <div className="fixed left-4 top-4 z-40 md:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open admin sidebar"
          aria-expanded={sidebarOpen}
          aria-controls="admin-sidebar"
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl border border-[#D9DDE5] bg-white
            text-[#090A0C] shadow-[0_4px_18px_rgba(9,10,12,0.12)]
            transition-all hover:border-[#1265F4]/40
            hover:bg-[#EDF3FF] hover:text-[#1265F4]
            active:scale-95
            dark:border-[#343945] dark:bg-[#111318]
            dark:text-white dark:shadow-[0_4px_18px_rgba(0,0,0,0.35)]
            dark:hover:border-[#65A0FF]/50
            dark:hover:bg-[#17243A] dark:hover:text-[#A9CAFF]
          "
        >
          <Menu size={20} />
        </button>
      </div>
    </>
  );
};
