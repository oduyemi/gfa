"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  Search,
  Mail,
  Users,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
  Check,
  AlertCircle,
  CalendarDays,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface NewsletterResponse {
  success: boolean;
  message?: string;
  data?: Subscriber[];
  pagination?: Pagination;
}

const DEFAULT_PAGINATION: Pagination = {
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const formatDate = (date: string) => {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatDateTime = (date: string) => {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const escapeCSV = (value: string) => {
  // Protect spreadsheet users against formula injection.
  const safeValue = /^[\s]*[=+\-@]/.test(value)
    ? `'${value}`
    : value;

  return `"${safeValue.replace(/"/g, '""')}"`;
};

const downloadCSV = (subscribers: Subscriber[]) => {
  const headers = ["Email Address", "Date Subscribed", "Last Updated"];

  const rows = subscribers.map((subscriber) => [
    subscriber.email,
    subscriber.createdAt,
    subscriber.updatedAt,
  ]);

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `gfa-mailing-list-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export default function CardMail() {
  const prefersReducedMotion = useReducedMotion();

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [pagination, setPagination] =
    useState<Pagination>(DEFAULT_PAGINATION);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);
  const [editedEmail, setEditedEmail] = useState("");

  // Debounce search input.
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [search]);

  // Fetch subscribers.
  const fetchSubscribers = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "20",
        });

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        }

        const response = await fetch(
          `/api/newsletter?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            signal,
          }
        );

        const result: NewsletterResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to retrieve subscribers."
          );
        }

        setSubscribers(result.data ?? []);
        setPagination(result.pagination ?? DEFAULT_PAGINATION);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while fetching subscribers."
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [page, debouncedSearch]
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchSubscribers(controller.signal);

    return () => controller.abort();
  }, [fetchSubscribers]);

  const refresh = () => {
    fetchSubscribers();
  };

  // Export all matching subscribers, not only the current page.
  const handleExport = async () => {
    setExporting(true);
    setError("");
    setNotice("");

    try {
      const exportLimit = 100;

      const firstParams = new URLSearchParams({
        page: "1",
        limit: String(exportLimit),
      });

      if (debouncedSearch) {
        firstParams.set("search", debouncedSearch);
      }

      const firstResponse = await fetch(
        `/api/newsletter?${firstParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const firstResult: NewsletterResponse =
        await firstResponse.json();

      if (!firstResponse.ok || !firstResult.success) {
        throw new Error(
          firstResult.message || "Unable to export subscribers."
        );
      }

      let allSubscribers = firstResult.data ?? [];
      const totalPages = firstResult.pagination?.totalPages ?? 1;

      // Fetch remaining pages in batches of 100.
      for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(exportLimit),
        });

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        }

        const response = await fetch(
          `/api/newsletter?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const result: NewsletterResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to complete CSV export."
          );
        }

        allSubscribers = allSubscribers.concat(result.data ?? []);
      }

      if (allSubscribers.length === 0) {
        setNotice("There are no subscribers to export.");
        return;
      }

      downloadCSV(allSubscribers);

      setNotice(
        `${allSubscribers.length} subscriber${
          allSubscribers.length === 1 ? "" : "s"
        } exported successfully.`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to export the mailing list."
      );
    } finally {
      setExporting(false);
    }
  };

  // Open edit modal.
  const openEditModal = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setEditedEmail(subscriber.email);
    setError("");
    setNotice("");
  };

  const closeEditModal = () => {
    if (saving) return;

    setSelectedSubscriber(null);
    setEditedEmail("");
  };

  // Update subscriber.
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedSubscriber) return;

    const email = editedEmail.trim().toLowerCase();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedSubscriber._id,
          email,
        }),
      });

      const result: NewsletterResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to update subscriber."
        );
      }

      setNotice(result.message || "Subscriber updated successfully.");
      setSelectedSubscriber(null);
      setEditedEmail("");

      await fetchSubscribers();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update subscriber."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete subscriber.
  const handleDelete = async (subscriber: Subscriber) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${subscriber.email} from the mailing list?`
    );

    if (!confirmed) return;

    setDeletingId(subscriber._id);
    setError("");
    setNotice("");

    try {
      const params = new URLSearchParams({
        id: subscriber._id,
      });

      const response = await fetch(
        `/api/newsletter?${params.toString()}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result: NewsletterResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to remove subscriber."
        );
      }

      setNotice(result.message || "Subscriber removed successfully.");

      // If the last record on a page was deleted, move back a page.
      if (subscribers.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await fetchSubscribers();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove subscriber."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const showingFrom = useMemo(() => {
    if (pagination.total === 0) return 0;
    return (pagination.page - 1) * pagination.limit + 1;
  }, [pagination]);

  const showingTo = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
      };

  return (
    <>
      <motion.section
        {...motionProps}
        className="space-y-6"
      >
        {/* Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/[0.09] dark:bg-[#111318]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-white/50">
                  Total subscribers
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-white">
                  {loading ? (
                    <span className="inline-block h-9 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
                  ) : (
                    pagination.total.toLocaleString()
                  )}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground dark:text-white/40">
                  People subscribed to your mailing list
                </p>
              </div>

              <div className="rounded-xl bg-brand-electric/10 p-3 text-brand-electric dark:bg-brand-electric/15">
                <Users size={21} />
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-8 -right-5 opacity-[0.04] dark:opacity-[0.07]">
              <Users size={120} />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/[0.09] dark:bg-[#111318]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-white/50">
                  Currently displayed
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground dark:text-white">
                  {loading ? (
                    <span className="inline-block h-9 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
                  ) : (
                    subscribers.length.toLocaleString()
                  )}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground dark:text-white/40">
                  Subscribers on this page
                </p>
              </div>

              <div className="rounded-xl bg-brand-gold/15 p-3 text-amber-600 dark:text-brand-gold">
                <Mail size={21} />
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-8 -right-5 opacity-[0.04] dark:opacity-[0.07]">
              <Mail size={120} />
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm dark:border-white/[0.09] dark:bg-[#111318]">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-border p-5 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-brand-electric/10 p-2 text-brand-electric dark:bg-brand-electric/15">
                  <Mail size={18} />
                </div>

                <h2 className="text-lg font-semibold text-foreground dark:text-white">
                  Mailing list
                </h2>
              </div>

              <p className="mt-2 text-sm text-muted-foreground dark:text-white/45">
                Manage and export your newsletter subscribers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={refresh}
                disabled={loading}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.1] dark:bg-[#1C2230] dark:text-white dark:hover:bg-white/[0.07]"
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleExport}
                disabled={exporting || pagination.total === 0}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand-electric px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-electric/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {exporting ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <Download size={15} />
                )}

                {exporting ? "Exporting..." : "Export CSV"}
              </button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col gap-3 border-b border-border p-5 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-white/35"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by email address..."
                className="h-11 w-full rounded-xl border border-border bg-slate-50 pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-brand-electric focus:ring-2 focus:ring-brand-electric/10 dark:border-white/[0.1] dark:bg-[#1C2230] dark:text-white dark:placeholder:text-white/30 dark:focus:border-brand-electric"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:bg-slate-200 hover:text-foreground dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <p className="text-xs text-muted-foreground dark:text-white/40">
              Search matches subscriber email addresses.
            </p>
          </div>

          {/* Notifications */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 pt-4"
              >
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                  <span>{error}</span>

                  <button
                    type="button"
                    onClick={() => setError("")}
                    aria-label="Dismiss error"
                    className="ml-auto shrink-0 opacity-70 transition hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {notice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 pt-4"
              >
                <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <Check size={17} className="mt-0.5 shrink-0" />
                  <span>{notice}</span>

                  <button
                    type="button"
                    onClick={() => setNotice("")}
                    aria-label="Dismiss notification"
                    className="ml-auto shrink-0 opacity-70 transition hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-border bg-slate-50/80 dark:border-white/[0.08] dark:bg-[#171A22]">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/45">
                    Subscriber
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/45">
                    Date subscribed
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/45">
                    Last updated
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/45">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border dark:divide-white/[0.06]">
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.07]" />

                          <div className="space-y-2">
                            <div className="h-3 w-36 animate-pulse rounded bg-slate-100 dark:bg-white/[0.07]" />
                            <div className="h-2.5 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/[0.05]" />
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="h-3 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/[0.07]" />
                      </td>

                      <td className="px-5 py-5">
                        <div className="h-3 w-24 animate-pulse rounded bg-slate-100 dark:bg-white/[0.07]" />
                      </td>

                      <td className="px-5 py-5">
                        <div className="ml-auto h-8 w-16 animate-pulse rounded-lg bg-slate-100 dark:bg-white/[0.07]" />
                      </td>
                    </tr>
                  ))
                ) : subscribers.length > 0 ? (
                  subscribers.map((subscriber, index) => (
                    <motion.tr
                      key={subscriber._id}
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, y: 6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: prefersReducedMotion ? 0 : index * 0.025,
                      }}
                      className="group transition-colors hover:bg-slate-50/80 dark:hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric dark:bg-brand-electric/15">
                            <Mail size={17} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground dark:text-white">
                              {subscriber.email}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground dark:text-white/35">
                              Newsletter subscriber
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-foreground/80 dark:text-white/70">
                          <CalendarDays
                            size={14}
                            className="text-muted-foreground dark:text-white/35"
                          />
                          {formatDate(subscriber.createdAt)}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-muted-foreground dark:text-white/55">
                          {formatDate(subscriber.updatedAt)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(subscriber)}
                            aria-label={`Edit ${subscriber.email}`}
                            title="Edit subscriber"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-brand-electric/10 hover:text-brand-electric dark:text-white/45 dark:hover:bg-brand-electric/15 dark:hover:text-brand-electric"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(subscriber)}
                            disabled={deletingId === subscriber._id}
                            aria-label={`Delete ${subscriber.email}`}
                            title="Remove subscriber"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white/45 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                          >
                            {deletingId === subscriber._id ? (
                              <RefreshCw
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={15} />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/[0.06] dark:text-white/30">
                          {search ? (
                            <Search size={23} />
                          ) : (
                            <Mail size={23} />
                          )}
                        </div>

                        <h3 className="text-sm font-semibold text-foreground dark:text-white">
                          {search
                            ? "No matching subscribers"
                            : "No subscribers yet"}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-white/40">
                          {search
                            ? "Try another email address or clear your search."
                            : "When people subscribe to your newsletter, their email addresses will appear here."}
                        </p>

                        {search && (
                          <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="mt-4 text-sm font-semibold text-brand-electric transition hover:underline"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex flex-col gap-4 border-t border-border px-5 py-4 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground dark:text-white/45">
              {pagination.total > 0 ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-foreground dark:text-white">
                    {showingFrom}–{showingTo}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground dark:text-white">
                    {pagination.total.toLocaleString()}
                  </span>{" "}
                  subscribers
                </>
              ) : (
                "No subscribers to display"
              )}
            </p>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <span className="text-xs text-muted-foreground dark:text-white/40">
                Page {pagination.page} of{" "}
                {Math.max(pagination.totalPages, 1)}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.max(1, current - 1))
                  }
                  disabled={
                    loading || !pagination.hasPreviousPage
                  }
                  aria-label="Previous page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-slate-50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.1] dark:text-white/60 dark:hover:bg-white/[0.06] dark:hover:text-white"
                >
                  <ChevronLeft size={17} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => current + 1)
                  }
                  disabled={loading || !pagination.hasNextPage}
                  aria-label="Next page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-slate-50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.1] dark:text-white/60 dark:hover:bg-white/[0.06] dark:hover:text-white"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Edit subscriber modal */}
      <AnimatePresence>
        {selectedSubscriber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeEditModal();
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.section
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-subscriber-title"
              className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-white shadow-2xl dark:border-white/[0.1] dark:bg-[#171A22]"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4 dark:border-white/[0.08]">
                <div>
                  <h2
                    id="edit-subscriber-title"
                    className="text-base font-semibold text-foreground dark:text-white"
                  >
                    Edit subscriber
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground dark:text-white/40">
                    Update this subscriber&apos;s email address.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={saving}
                  aria-label="Close modal"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-slate-100 hover:text-foreground disabled:opacity-50 dark:text-white/50 dark:hover:bg-white/[0.07] dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="space-y-4 p-5">
                  {error && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                      <AlertCircle
                        size={16}
                        className="mt-0.5 shrink-0"
                      />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="subscriber-email"
                      className="mb-2 block text-sm font-medium text-foreground dark:text-white/80"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-white/35"
                      />

                      <input
                        id="subscriber-email"
                        type="email"
                        required
                        maxLength={254}
                        value={editedEmail}
                        onChange={(event) =>
                          setEditedEmail(event.target.value)
                        }
                        autoFocus
                        className="h-11 w-full rounded-xl border border-border bg-slate-50 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand-electric focus:ring-2 focus:ring-brand-electric/10 dark:border-white/[0.1] dark:bg-[#1C2230] dark:text-white dark:placeholder:text-white/30"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04]">
                    <p className="text-xs text-muted-foreground dark:text-white/45">
                      Subscribed on
                    </p>

                    <p className="mt-1 text-sm font-medium text-foreground dark:text-white/80">
                      {formatDateTime(selectedSubscriber.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-4 dark:border-white/[0.08] sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    disabled={saving}
                    className="h-10 rounded-xl border border-border px-4 text-sm font-medium text-foreground transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/[0.1] dark:text-white dark:hover:bg-white/[0.06]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving || !editedEmail.trim()}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand-electric px-5 text-sm font-semibold text-white transition hover:bg-brand-electric/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check size={15} />
                        Save changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}