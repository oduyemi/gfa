
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";

interface AuthUser {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  image: string | null;
  imagePublicId: string | null;
  firstLogin: boolean;
  lastLogin: string | null;
}

interface MeResponse {
  user: AuthUser;
  firstLogin: boolean;
}

export const UserDropdown = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchCurrentUser = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        signal,
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to retrieve administrator details.");
      }

      const data: MeResponse = await response.json();

      if (!data.user || data.user.role !== "admin") {
        router.replace("/unauthorized");
        return;
      }

      setUser(data.user);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      console.error("Unable to fetch current user:", err);
      setError("Unable to load account details.");
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [router]);

  useEffect(() => {
    const controller = new AbortController();

    fetchCurrentUser(controller.signal);

    return () => controller.abort();
  }, [fetchCurrentUser]);

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to sign out.");
      }

      setDropdownOpen(false);
      router.replace("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
      setError("Sign out failed. Please try again.");
    }
  };

  const fullName = user
    ? `${user.fname} ${user.lname}`.trim()
    : "Administrator";

  const initials = user
    ? `${user.fname?.charAt(0) ?? ""}${user.lname?.charAt(0) ?? ""}`.toUpperCase()
    : "AD";

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setDropdownOpen((previous) => !previous)}
        disabled={loading || !user}
        aria-expanded={dropdownOpen}
        aria-haspopup="menu"
        aria-label="Toggle administrator account menu"
        className="group flex items-center gap-2 rounded-xl p-1.5 text-left transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric/50 disabled:cursor-wait disabled:opacity-60"
      >
        {/* Avatar */}
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-brand-electric/20 bg-brand-electric/10">
          {user?.image ? (
            <Image
              src={user.image}
              alt=""
              fill
              sizes="40px"
              unoptimized
              className="object-cover"
            />
          ) : (
            <span className="text-xs font-bold text-brand-electric">
              {initials}
            </span>
          )}
        </span>

        {/* User identity */}
        <span className="hidden min-w-0 text-left lg:block">
          <span className="block max-w-32 truncate text-xs font-semibold text-foreground">
            {loading ? "Loading account..." : fullName}
          </span>

          <span className="block max-w-32 truncate text-[10px] text-muted-foreground">
            {user?.email ?? "Administrator"}
          </span>
        </span>

        <ChevronDown
          size={15}
          className={`hidden shrink-0 text-muted-foreground transition-transform duration-200 sm:block ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 top-full z-[100] mt-3 w-64 origin-top-right rounded-2xl border border-border bg-card p-2 shadow-premium-md transition-all duration-200 ${
          dropdownOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
        role="menu"
        aria-label="Administrator account menu"
        aria-hidden={!dropdownOpen}
      >
        {/* User information */}
        <div className="flex items-center gap-3 rounded-xl bg-surface-subtle p-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-electric/20 bg-brand-electric/10">
            {user?.image ? (
              <Image
                src={user.image}
                alt=""
                fill
                sizes="44px"
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-brand-electric">
                {initials}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-foreground">
              {loading ? "Loading..." : fullName}
            </p>

            <p className="mt-1 truncate text-[10px] text-muted-foreground">
              {user?.email ?? ""}
            </p>

            <span className="mt-1.5 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-brand-electric">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-electric" />
              Administrator
            </span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="px-3 py-2 text-[10px] text-red-500">
            {error}
          </p>
        )}

        {/* Menu links */}
        <div className="mt-2 space-y-1">
          <Link
            href="/admin/profile"
            role="menuitem"
            onClick={() => setDropdownOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-brand-electric/5 hover:text-brand-electric"
          >
            <UserRound size={16} />
            My profile
          </Link>

          <Link
            href="/admin/profile/settings"
            role="menuitem"
            onClick={() => setDropdownOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-brand-electric/5 hover:text-brand-electric"
          >
            <Settings size={16} />
            Account settings
          </Link>
        </div>

        <div className="my-2 border-t border-border" />

        {/* Logout */}
        <button
          type="button"
          role="menuitem"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut size={16} />
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
};
