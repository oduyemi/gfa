"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  CheckCircle2,
  RotateCcw,
  Trash2,
  X,
  Inbox,
  Clock3,
  Check,
  Mail,
  Phone,
  CalendarDays,
  Building2,
  LoaderCircle,
  AlertCircle,
  FilterX,
  ExternalLink,
} from "lucide-react";

type EnquiryStatus = "pending" | "treated";

type EnquiryService =
  | "General Enquiry"
  | "Digital Creation"
  | "Digital Execution"
  | "Managed Virtual Assistance";

interface EnquiryRecord {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  company?: string;
  service: EnquiryService;
  subject?: string;
  message: string;
  budget?: string;
  timeline?: string;
  serviceInterest?: string;
  creationServices?: string[];
  projectName?: string;
  goals?: string[];
  channels?: string[];
  businessStage?: string;
  supportTasks?: string[];
  supportType?: string;
  hours?: string;
  status: EnquiryStatus;
  treatedAt?: string;
  treatedBy?: {
    fname?: string;
    lname?: string;
    email?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface EnquiryResponse {
  success: boolean;
  message?: string;
  data: EnquiryRecord[];
  stats: {
    total: number;
    pending: number;
    treated: number;
  };
  pagination: Pagination;
}

const serviceOptions: EnquiryService[] = [
  "General Enquiry",
  "Digital Creation",
  "Digital Execution",
  "Managed Virtual Assistance",
];

const statusStyles: Record<EnquiryStatus, string> = {
  pending:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
  treated:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
};

const formatDate = (date?: string) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

const formatDateTime = (date?: string) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const getServiceStyle = (service: EnquiryService) => {
  switch (service) {
    case "Digital Creation":
      return "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300";

    case "Digital Execution":
      return "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300";

    case "Managed Virtual Assistance":
      return "bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300";

    default:
      return "bg-slate-100 text-[#454B57] dark:bg-slate-700/40 dark:text-slate-300";
  }
};

const detailGroups = [
  {
    title: "Digital Creation",
    fields: [
      ["Project name", "projectName"],
      ["Creation services", "creationServices"],
    ],
  },
  {
    title: "Digital Execution",
    fields: [
      ["Business goals", "goals"],
      ["Marketing channels", "channels"],
      ["Business stage", "businessStage"],
    ],
  },
  {
    title: "Managed Virtual Assistance",
    fields: [
      ["Support tasks", "supportTasks"],
      ["Support arrangement", "supportType"],
      ["Support hours", "hours"],
    ],
  },
] as const;

type DetailFieldKey =
  | "projectName"
  | "creationServices"
  | "goals"
  | "channels"
  | "businessStage"
  | "supportTasks"
  | "supportType"
  | "hours";

const getDetailValue = (
  enquiry: EnquiryRecord,
  key: DetailFieldKey
): string | string[] | undefined => enquiry[key];

export const CardTable = () => {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);

  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    treated: 0,
  });

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [busyId, setBusyId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] =
    useState<EnquiryRecord | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const surface =
    "border-[#E7E2D8] bg-[#FFFEFB] text-[#111318] shadow-[0_18px_55px_-35px_rgba(9,10,12,0.28)] dark:border-white/10 dark:bg-[#101116] dark:text-[#F8F7F2] dark:shadow-black/40";

  const mutedText = "text-[#737987] dark:text-[#B8C2D1]";

  const inputStyle = `
    h-11 w-full rounded-xl border px-3 text-xs font-medium
    outline-none transition-all
    border-[#E5E0D7] bg-[#FFFEFB] text-[#20232B]
    placeholder:text-[#9297A2] hover:border-[#C9C1B4]
    focus:border-[#1265F4] focus:ring-4 focus:ring-[#1265F4]/10
    dark:border-white/10 dark:bg-[#191A21] dark:text-[#F8F7F2]
    dark:placeholder:text-[#9296A3] dark:hover:border-white/20
  `;

  const fetchEnquiries = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(pagination.page),
          limit: String(limit),
          sort,
        });

        if (search) params.set("search", search);
        if (status) params.set("status", status);
        if (service) params.set("service", service);

        const response = await fetch(
          `/api/enquiry?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            signal,
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load enquiries."
          );
        }

        const data = result as EnquiryResponse;

        setEnquiries(data.data ?? []);
        setPagination(data.pagination);
        setStats(data.stats);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading enquiries."
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [
      pagination.page,
      limit,
      search,
      status,
      service,
      sort,
      refreshKey,
    ]
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchEnquiries(controller.signal);

    return () => controller.abort();
  }, [fetchEnquiries]);

  // Debounce search to avoid making a request on every keystroke.
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch((previous) => {
        const next = searchInput.trim();

        if (previous !== next) {
          setPagination((current) => ({
            ...current,
            page: 1,
          }));
        }

        return next;
      });
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const refresh = () => {
    setRefreshing(true);
    setRefreshKey((previous) => previous + 1);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setService("");
    setSort("newest");
    setLimit(10);

    setPagination((current) => ({
      ...current,
      page: 1,
    }));
  };

  const updateStatus = async (enquiry: EnquiryRecord) => {
    const nextStatus: EnquiryStatus =
      enquiry.status === "pending" ? "treated" : "pending";

    setBusyId(enquiry._id);
    setNotice("");
    setError("");

    try {
      const response = await fetch(
        `/api/enquiry/${enquiry._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to update enquiry status."
        );
      }

      setNotice(
        nextStatus === "treated"
          ? "Enquiry marked as treated."
          : "Enquiry reopened successfully."
      );

      setRefreshKey((previous) => previous + 1);
      setSelectedEnquiry(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update enquiry status."
      );
    } finally {
      setBusyId(null);
    }
  };

  const deleteEnquiry = async (enquiry: EnquiryRecord) => {
    const confirmed = window.confirm(
      `Delete the enquiry from ${enquiry.fullname}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(enquiry._id);
    setNotice("");
    setError("");

    try {
      const response = await fetch(
        `/api/enquiry/${enquiry._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to delete enquiry."
        );
      }

      setNotice("Enquiry deleted successfully.");
      setSelectedEnquiry(null);

      if (enquiries.length === 1 && pagination.page > 1) {
        setPagination((current) => ({
          ...current,
          page: current.page - 1,
        }));
      } else {
        setRefreshKey((previous) => previous + 1);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete enquiry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const changePage = (page: number) => {
    setPagination((current) => ({
      ...current,
      page,
    }));
  };

  const hasFilters = Boolean(search || status || service);

  const renderStatus = (item: EnquiryRecord) => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ring-1 ring-inset ${statusStyles[item.status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          item.status === "pending"
            ? "bg-amber-500"
            : "bg-emerald-500"
        }`}
      />
      {item.status}
    </span>
  );

  const renderActions = (item: EnquiryRecord) => (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setSelectedEnquiry(item)}
        title="View enquiry"
        aria-label={`View enquiry from ${item.fullname}`}
        className="
          flex h-8 w-8 items-center justify-center rounded-lg
          text-[#737987] transition-colors
          hover:bg-blue-50 hover:text-[#1265F4]
          dark:text-[#AAB6C8] dark:hover:bg-blue-400/10
          dark:hover:text-blue-300
        "
      >
        <Eye size={16} />
      </button>

      <button
        type="button"
        onClick={() => updateStatus(item)}
        disabled={busyId === item._id}
        title={
          item.status === "pending"
            ? "Mark as treated"
            : "Reopen enquiry"
        }
        aria-label={
          item.status === "pending"
            ? `Mark ${item.fullname}'s enquiry as treated`
            : `Reopen ${item.fullname}'s enquiry`
        }
        className={`
          flex h-8 w-8 items-center justify-center rounded-lg
          transition-colors disabled:cursor-not-allowed
          disabled:opacity-50
          ${
            item.status === "pending"
              ? "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-400/10"
              : "text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-400/10"
          }
        `}
      >
        {busyId === item._id ? (
          <LoaderCircle size={16} className="animate-spin" />
        ) : item.status === "pending" ? (
          <CheckCircle2 size={16} />
        ) : (
          <RotateCcw size={16} />
        )}
      </button>

      <button
        type="button"
        onClick={() => deleteEnquiry(item)}
        disabled={deletingId === item._id}
        title="Delete enquiry"
        aria-label={`Delete enquiry from ${item.fullname}`}
        className="
          flex h-8 w-8 items-center justify-center rounded-lg
          text-[#9297A2] transition-colors
          hover:bg-red-50 hover:text-red-600
          disabled:cursor-not-allowed disabled:opacity-50
          dark:text-[#AAB6C8] dark:hover:bg-red-400/10
          dark:hover:text-red-300
        "
      >
        {deletingId === item._id ? (
          <LoaderCircle size={16} className="animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    </div>
  );

  return (
    <>
      <section
        className={`relative mb-6 min-w-0 overflow-hidden rounded-[26px] border shadow-sm ${surface}`}
      >
        {/* Header */}
        <div className="relative flex flex-col gap-4 border-b border-[#EAE5DC] bg-[radial-gradient(ellipse_at_top_right,rgba(18,101,244,0.075),transparent_42%)] px-5 py-6 dark:border-white/10 dark:bg-[radial-gradient(ellipse_at_top_right,rgba(18,101,244,0.14),transparent_42%)] sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#F4BE28] shadow-[0_0_0_4px_rgba(244,190,40,0.12)]" />

              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#1265F4]">
                Engagement management
              </p>
            </div>

            <h2 className="mt-2 text-xl font-extrabold tracking-[-0.04em] text-[#111318] dark:text-[#F8F7F2] sm:text-2xl">
              Website enquiries
            </h2>

            <p className={`mt-1.5 text-xs leading-relaxed ${mutedText}`}>
              Review, manage and respond to website submissions.
            </p>
          </div>

          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="
              inline-flex h-10 items-center justify-center gap-2
              self-start rounded-xl border border-[#1265F4]/20
              bg-[#1265F4]/[0.06] px-4 text-xs font-bold
              text-[#1265F4] transition-all
              hover:border-[#1265F4]/40 hover:bg-[#1265F4]/10
              disabled:cursor-not-allowed disabled:opacity-50
              dark:border-[#1265F4]/30 dark:bg-[#1265F4]/10
              dark:text-[#8BB6FF] dark:hover:bg-[#1265F4]/15
              lg:self-auto
            "
          >
            <RefreshCw
              size={14}
              className={refreshing || loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-3 border-b border-[#E7E2D8] p-4 dark:border-white/10 sm:grid-cols-3 sm:p-5 sm:px-6">
          {[
            {
              label: "Total enquiries",
              value: stats.total,
              icon: Inbox,
              style: "text-[#1265F4] bg-blue-500/10",
            },
            {
              label: "Awaiting attention",
              value: stats.pending,
              icon: Clock3,
              style:
                "text-amber-600 bg-amber-500/10 dark:text-amber-400",
            },
            {
              label: "Treated enquiries",
              value: stats.treated,
              icon: Check,
              style:
                "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  flex items-center gap-3 rounded-2xl border
                  border-[#EAE5DC] bg-[#F8F7F2] p-4 shadow-sm shadow-black/[0.02]
                  dark:border-white/10 dark:bg-[#191A21]
                "
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.style}`}
                >
                  <Icon size={18} />
                </span>

                <div className="min-w-0">
                  <p className={`text-[10px] font-semibold ${mutedText}`}>
                    {stat.label}
                  </p>

                  <p className="mt-0.5 text-lg font-extrabold tabular-nums">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="space-y-3 border-b border-[#EAE5DC] p-4 dark:border-white/10 sm:p-5 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={16}
                className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${mutedText}`}
              />

              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search name, email, phone, company or message..."
                aria-label="Search enquiries"
                className={`${inputStyle} pl-10`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:w-[460px]">
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPagination((current) => ({
                    ...current,
                    page: 1,
                  }));
                }}
                aria-label="Filter by status"
                className={inputStyle}
              >
                <option value="">All statuses</option>
                <option value="pending">Pending</option>
                <option value="treated">Treated</option>
              </select>

              <select
                value={service}
                onChange={(event) => {
                  setService(event.target.value);
                  setPagination((current) => ({
                    ...current,
                    page: 1,
                  }));
                }}
                aria-label="Filter by service"
                className={`${inputStyle} col-span-2 sm:col-span-1`}
              >
                <option value="">All services</option>

                {serviceOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  setSort((current) =>
                    current === "newest" ? "oldest" : "newest"
                  );

                  setPagination((current) => ({
                    ...current,
                    page: 1,
                  }));
                }}
                className="
                  col-span-2 inline-flex h-11 items-center
                  justify-center gap-2 rounded-xl border px-3
                  text-xs font-semibold transition-colors
                  border-[#E5E0D7] bg-[#FFFEFB] text-[#555B68]
                  hover:bg-[#F5F2EB]
                  dark:border-white/10 dark:bg-[#191A21]
                  dark:text-[#D1D2D8] dark:hover:bg-[#FFFEFB]/[0.06]
                  sm:col-span-1
                "
              >
                <ArrowUpDown size={14} />
                {sort === "newest" ? "Newest first" : "Oldest first"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className={`flex items-center gap-2 text-[10px] ${mutedText}`}>
              <FilterX size={13} />

              {hasFilters
                ? "Filtered enquiry results"
                : "Showing all enquiries"}

              {search && (
                <span className="rounded-md bg-blue-500/10 px-2 py-1 text-[#1265F4] dark:text-blue-300">
                  Search: {search}
                </span>
              )}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[10px] font-bold text-[#1265F4] hover:underline dark:text-[#8BB6FF]"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Feedback */}
        {error && (
          <div
            role="alert"
            className="
              mx-4 mt-4 flex items-start gap-2 rounded-xl
              border border-red-200 bg-red-50 px-4 py-3
              text-xs text-red-700
              dark:mx-6 dark:border-red-400/20
              dark:bg-red-500/10 dark:text-red-300
            "
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="
              mx-4 mt-4 flex items-center justify-between gap-3
              rounded-xl border border-emerald-200 bg-emerald-50
              px-4 py-3 text-xs text-emerald-700
              dark:mx-6 dark:border-emerald-400/20
              dark:bg-emerald-500/10 dark:text-emerald-300
            "
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} />
              {notice}
            </span>

            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
              className="shrink-0 rounded-md p-1 transition-colors hover:bg-emerald-500/10"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-3 p-5 sm:p-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[72px] animate-pulse rounded-xl bg-slate-100 dark:bg-[#252630]"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && enquiries.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <span
              className="
                flex h-14 w-14 items-center justify-center
                rounded-2xl bg-slate-100 text-[#9297A2]
                dark:bg-[#252630] dark:text-[#CBD5E1]
              "
            >
              <Inbox size={24} />
            </span>

            <h3 className="mt-4 text-sm font-bold">
              {hasFilters
                ? "No matching enquiries"
                : "No enquiries yet"}
            </h3>

            <p className={`mt-1 max-w-xs text-xs leading-relaxed ${mutedText}`}>
              {hasFilters
                ? "Try changing your search or filters to find what you're looking for."
                : "Website enquiries will appear here when someone submits the contact form."}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-lg bg-[#1265F4] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Desktop table and mobile cards */}
        {!loading && enquiries.length > 0 && (
          <>
            <div className="hidden w-full overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#F8F7F2] text-[#737987] dark:beblack">
                    {[
                      "Enquiry",
                      "Service",
                      "Received",
                      "Status",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="
                          whitespace-nowrap border-b border-[#E7E2D8]
                          px-5 py-3 text-[10px] font-extrabold
                          uppercase tracking-wider
                          dark:border-white/10 sm:px-6
                        "
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map((item) => (
                    <tr
                      key={item._id}
                      className="
                        transition-colors hover:bg-[#F5F2EB]
                        dark:hover:bg-[#FFFEFB]/[0.035]
                      "
                    >
                      <td className="min-w-[240px] border-b border-[#EEEAE2] px-5 py-[18px] dark:border-white/10 sm:px-6">
                        <div className="flex items-center gap-3">
                          <span
                            className="
                              flex h-10 w-10 shrink-0 items-center
                              justify-center rounded-xl
                              bg-[#1265F4]/10 text-xs font-extrabold
                              text-[#1265F4] dark:text-[#8BB6FF]
                            "
                          >
                            {getInitials(item.fullname)}
                          </span>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold">
                              {item.fullname}
                            </p>

                            <p className={`mt-1 truncate text-[10px] ${mutedText}`}>
                              {item.email}
                            </p>

                            {item.company && (
                              <p className={`mt-0.5 truncate text-[10px] ${mutedText}`}>
                                {item.company}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="border-b border-[#EEEAE2] px-5 py-[18px] dark:border-white/10 sm:px-6">
                        <span
                          className={`
                            inline-flex max-w-[190px] rounded-lg
                            px-2.5 py-1.5 text-[10px] font-bold
                            leading-relaxed
                            ${getServiceStyle(item.service)}
                          `}
                        >
                          {item.service}
                        </span>
                      </td>

                      <td className={`whitespace-nowrap border-b border-[#EEEAE2] px-5 py-4 text-[11px] dark:border-white/10 sm:px-6 ${mutedText}`}>
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="border-b border-[#EEEAE2] px-5 py-[18px] dark:border-white/10 sm:px-6">
                        {renderStatus(item)}
                      </td>

                      <td className="border-b border-[#EEEAE2] px-5 py-[18px] dark:border-white/10 sm:px-6">
                        {renderActions(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile enquiry cards */}
            <div className="space-y-3 p-4 md:hidden">
              {enquiries.map((item) => (
                <article
                  key={item._id}
                  className="
                    rounded-2xl border border-[#E7E2D8]
                    bg-[#F8F7F2] p-4
                    dark:border-white/10 dark:bg-[#191A21]
                  "
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="
                        flex h-10 w-10 shrink-0 items-center
                        justify-center rounded-xl bg-[#1265F4]/10
                        text-xs font-extrabold text-[#1265F4]
                        dark:text-[#8BB6FF]
                      "
                    >
                      {getInitials(item.fullname)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold">
                        {item.fullname}
                      </p>

                      <p className={`mt-1 break-all text-[10px] ${mutedText}`}>
                        {item.email}
                      </p>

                      <p className={`mt-1 text-[10px] ${mutedText}`}>
                        {item.phone}
                      </p>
                    </div>

                    {renderStatus(item)}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`
                        rounded-lg px-2.5 py-1.5 text-[10px]
                        font-bold ${getServiceStyle(item.service)}
                      `}
                    >
                      {item.service}
                    </span>

                    <span className={`flex items-center gap-1 text-[10px] ${mutedText}`}>
                      <CalendarDays size={12} />
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  {item.subject && (
                    <p className="mt-3 line-clamp-2 text-xs font-semibold">
                      {item.subject}
                    </p>
                  )}

                  <div
                    className="
                      mt-3 flex items-center justify-between
                      border-t border-[#E7E2D8] pt-3
                      dark:border-white/10
                    "
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedEnquiry(item)}
                      className="
                        inline-flex items-center gap-1.5
                        text-[11px] font-bold text-[#1265F4]
                        dark:text-[#8BB6FF]
                      "
                    >
                      View details
                      <ExternalLink size={12} />
                    </button>

                    {renderActions(item)}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!loading && enquiries.length > 0 && (
          <div
            className="
              flex flex-col gap-4 border-t border-[#E7E2D8]
              px-4 py-4 dark:border-white/10
              sm:flex-row sm:items-center sm:justify-between
              sm:px-6
            "
          >
            <div className={`flex flex-wrap items-center gap-2 text-[10px] ${mutedText}`}>
              <span>
                Showing{" "}
                <strong className="font-bold text-current">
                  {(pagination.page - 1) * pagination.limit + 1}
                  {"–"}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}
                </strong>{" "}
                of{" "}
                <strong className="font-bold text-current">
                  {pagination.total}
                </strong>{" "}
                enquiries
              </span>

              <span className="hidden sm:inline">·</span>

              <label htmlFor="enquiry-page-size">
                Rows:
              </label>

              <select
                id="enquiry-page-size"
                value={limit}
                onChange={(event) => {
                  setLimit(Number(event.target.value));
                  setPagination((current) => ({
                    ...current,
                    page: 1,
                  }));
                }}
                className="
                  rounded-lg border border-[#E7E2D8]
                  bg-[#FFFEFB] px-2 py-1.5 text-[10px]
                  text-[#454B57] outline-none
                  focus:border-[#1265F4]
                  dark:border-white/10 dark:bg-[#191A21]
                  dark:text-[#CBD5E1]
                "
              >
                {[10, 20, 50, 100].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <span className={`text-[10px] ${mutedText}`}>
                Page {pagination.page} of {pagination.totalPages || 1}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => changePage(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage}
                  aria-label="Previous page"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg border border-[#E7E2D8]
                    bg-[#FFFEFB] text-[#555B68] transition-colors
                    hover:bg-[#F5F2EB]
                    disabled:cursor-not-allowed disabled:opacity-40
                    dark:border-white/10 dark:bg-[#191A21]
                    dark:text-[#D1D2D8] dark:hover:bg-[#FFFEFB]/[0.06]
                  "
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => changePage(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                  aria-label="Next page"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg border border-[#E7E2D8]
                    bg-[#FFFEFB] text-[#555B68] transition-colors
                    hover:bg-[#F5F2EB]
                    disabled:cursor-not-allowed disabled:opacity-40
                    dark:border-white/10 dark:bg-[#191A21]
                    dark:text-[#D1D2D8] dark:hover:bg-[#FFFEFB]/[0.06]
                  "
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Enquiry details modal */}
      {selectedEnquiry && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-[#090A0C]/70 p-3 backdrop-blur-md sm:p-6
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEnquiry(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            className="
              flex max-h-[92vh] w-full max-w-3xl
              flex-col overflow-hidden rounded-[26px] border
              border-[#E7E2D8] bg-[#FFFEFB] shadow-2xl
              dark:border-white/10 dark:bg-[#101116]
            "
          >
            {/* Modal header */}
            <div
              className="
                flex items-start justify-between gap-4
                border-b border-[#E7E2D8] bg-[radial-gradient(ellipse_at_top_left,rgba(18,101,244,0.07),transparent_55%)] px-5 py-5
                dark:border-white/10 dark:bg-[radial-gradient(ellipse_at_top_left,rgba(18,101,244,0.12),transparent_55%)] sm:px-6
              "
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="
                    flex h-11 w-11 shrink-0 items-center
                    justify-center rounded-xl bg-[#1265F4]/10
                    text-sm font-extrabold text-[#1265F4]
                    dark:text-[#8BB6FF]
                  "
                >
                  {getInitials(selectedEnquiry.fullname)}
                </span>

                <div className="min-w-0">
                  <h3
                    id="enquiry-modal-title"
                    className="truncate text-sm font-bold text-[#17191F] dark:text-[#F8F7F2]"
                  >
                    {selectedEnquiry.fullname}
                  </h3>

                  <p className="mt-1 truncate text-[10px] text-[#737987] dark:text-[#B8C2D1]">
                    Submitted {formatDate(selectedEnquiry.createdAt)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                aria-label="Close enquiry details"
                className="
                  flex h-9 w-9 shrink-0 items-center
                  justify-center rounded-xl text-[#737987]
                  transition-colors hover:bg-slate-100
                  dark:text-[#CBD5E1] dark:hover:bg-[#292D35]
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal content */}
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                {renderStatus(selectedEnquiry)}

                <span
                  className={`
                    rounded-full px-2.5 py-1 text-[10px]
                    font-bold ${getServiceStyle(selectedEnquiry.service)}
                  `}
                >
                  {selectedEnquiry.service}
                </span>
              </div>

              {/* Contact information */}
              <div>
                <h4
                  className="
                    mb-3 text-[10px] font-extrabold uppercase
                    tracking-wider text-[#737987]
                    dark:text-[#B8C2D1]
                  "
                >
                  Contact information
                </h4>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      label: "Email address",
                      value: selectedEnquiry.email,
                      icon: Mail,
                    },
                    {
                      label: "Phone number",
                      value: selectedEnquiry.phone,
                      icon: Phone,
                    },
                    {
                      label: "Company",
                      value: selectedEnquiry.company,
                      icon: Building2,
                    },
                    {
                      label: "Received",
                      value: formatDateTime(selectedEnquiry.createdAt),
                      icon: CalendarDays,
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="
                          min-w-0 rounded-2xl border border-[#E7E2D8]
                          bg-[#F8F7F2] p-3
                          dark:border-white/10 dark:bg-[#191A21]
                        "
                      >
                        <div className="flex items-center gap-2 text-[#737987] dark:text-[#B8C2D1]">
                          <Icon size={13} />

                          <span className="text-[10px] font-semibold">
                            {item.label}
                          </span>
                        </div>

                        <p className="mt-2 break-words text-xs font-semibold text-[#292D36] dark:text-[#F8FAFC]">
                          {item.value || "Not provided"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Enquiry information */}
              <div>
                <h4
                  className="
                    mb-3 text-[10px] font-extrabold uppercase
                    tracking-wider text-[#737987]
                    dark:text-[#B8C2D1]
                  "
                >
                  Enquiry information
                </h4>

                <div className="space-y-3">
                  {[
                    ["Subject", selectedEnquiry.subject],
                    ["Budget", selectedEnquiry.budget],
                    ["Timeline", selectedEnquiry.timeline],
                    ["Service interest", selectedEnquiry.serviceInterest],
                  ]
                    .filter(([, value]) => Boolean(value))
                    .map(([label, value]) => (
                      <div key={label}>
                        <p className="text-[10px] font-semibold text-[#737987] dark:text-[#B8C2D1]">
                          {label}
                        </p>

                        <p className="mt-1 text-xs font-medium text-[#292D36] dark:text-[#E2E8F0]">
                          {value}
                        </p>
                      </div>
                    ))}
                </div>

                <div
                  className="
                    mt-4 rounded-2xl border border-[#E7E2D8]
                    bg-[#F8F7F2] p-4
                    dark:border-white/10 dark:bg-[#191A21]
                  "
                >
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#737987] dark:text-[#B8C2D1]">
                    Message
                  </p>

                  <p className="whitespace-pre-wrap break-words text-xs leading-6 text-[#454B57] dark:text-[#E2E8F0]">
                    {selectedEnquiry.message}
                  </p>
                </div>
              </div>

              {/* Service-specific information */}
              {detailGroups.map((group) => {
                const visibleFields = group.fields.filter(
                  ([, key]) => {
                    const value = getDetailValue(
                      selectedEnquiry,
                      key
                    );

                    return Array.isArray(value)
                      ? value.length > 0
                      : Boolean(value);
                  }
                );

                if (!visibleFields.length) return null;

                return (
                  <div key={group.title}>
                    <h4
                      className="
                        mb-3 text-[10px] font-extrabold uppercase
                        tracking-wider text-[#737987]
                        dark:text-[#B8C2D1]
                      "
                    >
                      {group.title}
                    </h4>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {visibleFields.map(([label, key]) => {
                        const value = getDetailValue(
                          selectedEnquiry,
                          key
                        );

                        return (
                          <div
                            key={key}
                            className="
                              rounded-2xl border border-[#E7E2D8]
                              bg-[#FFFEFB] p-3
                              dark:border-white/10 dark:bg-[#191A21]
                            "
                          >
                            <p className="text-[10px] font-semibold text-[#737987] dark:text-[#B8C2D1]">
                              {label}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#292D36] dark:text-[#E2E8F0]">
                              {Array.isArray(value)
                                ? value.join(", ")
                                : value}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Treatment information */}
              {selectedEnquiry.status === "treated" && (
                <div
                  className="
                    rounded-xl border border-emerald-200
                    bg-emerald-50 p-4
                    dark:border-emerald-400/20
                    dark:bg-emerald-400/10
                  "
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Treatment record
                  </p>

                  <p className="mt-2 text-xs text-emerald-800 dark:text-emerald-200">
                    Treated on {formatDateTime(selectedEnquiry.treatedAt)}
                  </p>

                  {selectedEnquiry.treatedBy && (
                    <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-200">
                      By{" "}
                      {`${selectedEnquiry.treatedBy.fname ?? ""} ${selectedEnquiry.treatedBy.lname ?? ""}`.trim() ||
                        selectedEnquiry.treatedBy.email ||
                        "Administrator"}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal actions */}
            <div
              className="
                flex flex-col-reverse gap-2 border-t
                border-[#E7E2D8] bg-[#F8F7F2] px-5 py-4
                dark:border-white/10 dark:bg-[#191A21]
                sm:flex-row sm:items-center sm:justify-between
                sm:px-6
              "
            >
              <button
                type="button"
                onClick={() => deleteEnquiry(selectedEnquiry)}
                disabled={deletingId === selectedEnquiry._id}
                className="
                  inline-flex h-10 items-center justify-center
                  gap-2 rounded-xl px-3 text-xs font-bold
                  text-red-600 transition-colors hover:bg-red-50
                  disabled:opacity-50
                  dark:text-red-300 dark:hover:bg-red-400/10
                "
              >
                {deletingId === selectedEnquiry._id ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}

                Delete enquiry
              </button>

              <button
                type="button"
                onClick={() => updateStatus(selectedEnquiry)}
                disabled={busyId === selectedEnquiry._id}
                className="
                  inline-flex h-10 items-center justify-center
                  gap-2 rounded-xl bg-[#1265F4] px-5
                  text-xs font-bold text-white shadow-lg
                  shadow-[#1265F4]/20 transition-colors
                  hover:bg-blue-700 disabled:opacity-50
                "
              >
                {busyId === selectedEnquiry._id ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : selectedEnquiry.status === "pending" ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <RotateCcw size={15} />
                )}

                {selectedEnquiry.status === "pending"
                  ? "Mark as treated"
                  : "Reopen enquiry"}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
