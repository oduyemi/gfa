"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  RefreshCw,
  Users,
} from "lucide-react";

type Period = "week" | "month" | "all";

interface EnquirySource {
  source: string;
  count: number;
  percentage: number;
}

interface EnquirySourcesResponse {
  success: boolean;
  period: Period;
  timeZone: string;
  total: number;
  sources: EnquirySource[];
  message?: string;
}

const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: "7 days", value: "week" },
  { label: "30 days", value: "month" },
  { label: "All time", value: "all" },
];

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "General Enquiry": "Initial conversations and general requests",
  "Digital Creation": "Design, branding and digital projects",
  "Digital Execution": "Marketing and business growth",
  "Managed Virtual Assistance": "Administrative and operational support",
};

const SERVICE_STYLES: Record<
  string,
  { icon: typeof BriefcaseBusiness; color: string; background: string }
> = {
  "General Enquiry": {
    icon: Users,
    color: "text-slate-600 dark:text-slate-300",
    background: "bg-slate-100 dark:bg-slate-800",
  },
  "Digital Creation": {
    icon: BriefcaseBusiness,
    color: "text-blue-600 dark:text-blue-400",
    background: "bg-blue-50 dark:bg-blue-500/10",
  },
  "Digital Execution": {
    icon: CheckCircle2,
    color: "text-amber-600 dark:text-amber-400",
    background: "bg-amber-50 dark:bg-amber-500/10",
  },
  "Managed Virtual Assistance": {
    icon: Users,
    color: "text-violet-600 dark:text-violet-400",
    background: "bg-violet-50 dark:bg-violet-500/10",
  },
};

export const CardEnquirySources = () => {
  const [period, setPeriod] = useState<Period>("month");
  const [data, setData] = useState<EnquirySourcesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchSources = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const response = await fetch(
          `/api/enquiry/sources?period=${period}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const result: EnquirySourcesResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to retrieve enquiry sources.",
          );
        }

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [period],
  );

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  const hasEnquiries = (data?.total ?? 0) > 0;

  return (
    <div className="relative flex min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
            <BriefcaseBusiness size={19} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Enquiry Sources
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Enquiries by service category
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="flex items-center rounded-lg border border-border bg-surface-subtle p-1">
            {PERIOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPeriod(option.value)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  period === option.value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => fetchSources(true)}
            disabled={loading || refreshing}
            aria-label="Refresh enquiry sources"
            title="Refresh"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Total enquiries
          </p>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
              {loading && !data ? "—" : (data?.total ?? 0).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">
              {period === "week"
                ? "Last 7 days"
                : period === "month"
                  ? "Last 30 days"
                  : "All recorded enquiries"}
            </span>
          </div>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
          <Users size={19} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {loading && !data ? (
          <div className="space-y-5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-32 rounded bg-surface-subtle" />
                  <div className="h-3 w-16 rounded bg-surface-subtle" />
                </div>
                <div className="h-2 w-full rounded-full bg-surface-subtle" />
              </div>
            ))}
          </div>
        ) : error && !data ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <CircleAlert size={20} />
            </div>

            <p className="text-sm font-medium text-foreground">
              Unable to load enquiry sources
            </p>

            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              {error}
            </p>

            <button
              type="button"
              onClick={() => fetchSources()}
              className="mt-4 text-xs font-semibold text-brand-electric hover:underline"
            >
              Try again
            </button>
          </div>
        ) : !hasEnquiries ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-surface-subtle text-muted-foreground">
              <CalendarDays size={20} />
            </div>

            <p className="text-sm font-medium text-foreground">
              No enquiries yet
            </p>

            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Enquiry activity will appear here once visitors start submitting
              enquiries.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {data?.sources.map((item) => {
              const style =
                SERVICE_STYLES[item.source] ?? SERVICE_STYLES["General Enquiry"];

              const Icon = style.icon;

              return (
                <div key={item.source} className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${style.background} ${style.color}`}
                      >
                        <Icon size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {item.source}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {SERVICE_DESCRIPTIONS[item.source]}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold tabular-nums text-foreground">
                        {item.count.toLocaleString()}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                        {item.percentage}%
                      </p>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-surface-subtle">
                    <div
                      className="h-full rounded-full bg-brand-electric transition-all duration-700 ease-out"
                      style={{
                        width: `${Math.min(100, Math.max(0, item.percentage))}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface-subtle/50 px-5 py-4">
        <p className="text-xs text-muted-foreground">
          Reporting timezone: UK time
        </p>

        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-electric transition-colors hover:gap-2.5"
        >
          View all enquiries
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Refresh error while existing data is available */}
      {error && data && (
        <div className="border-t border-red-500/20 bg-red-500/5 px-5 py-2.5 text-xs text-red-600 dark:text-red-400">
          Refresh failed: {error}
        </div>
      )}
    </div>
  );
};
