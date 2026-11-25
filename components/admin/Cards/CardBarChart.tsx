
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import {
  Users,
  UserPlus,
  RefreshCw,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

type Period = "week" | "month";

interface SubscriptionItem {
  date: string;
  label: string;
  count: number;
}

interface SubscriptionResponse {
  success: boolean;
  period: Period;
  total: number;
  traffic: SubscriptionItem[];
}

export const CardBarChart = () => {
  const [period, setPeriod] = useState<Period>("week");
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Detect light and dark themes.
  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Fetch subscription analytics.
  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/newsletter/traffic?period=${period}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load mailing-list analytics."
        );
      }

      const data = result as SubscriptionResponse;

      setSubscriptions(data.traffic ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading subscriptions."
      );
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const chartData = useMemo<ChartData<"bar">>(
    () => ({
      labels: subscriptions.map((item) => item.label),
      datasets: [
        {
          label: "New subscribers",
          data: subscriptions.map((item) => item.count),
          backgroundColor: isDark
            ? "rgba(18, 101, 244, 0.85)"
            : "rgba(18, 101, 244, 0.8)",
          hoverBackgroundColor: "#F4BE28",
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: period === "week" ? 0.55 : 0.8,
          categoryPercentage: 0.8,
          maxBarThickness: 24,
        },
      ],
    }),
    [subscriptions, isDark, period]
  );

  const chartOptions = useMemo<ChartOptions<"bar">>(() => {
    const muted = isDark ? "#A1A1AA" : "#71717A";
    const grid = isDark
      ? "rgba(255,255,255,0.08)"
      : "rgba(15,23,42,0.08)";

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          align: "start",
          labels: {
            color: muted,
            usePointStyle: true,
            pointStyle: "rectRounded",
            boxWidth: 8,
            boxHeight: 8,
            padding: 20,
            font: {
              size: 11,
              weight: 500,
            },
          },
        },
        tooltip: {
          backgroundColor: isDark ? "#18181B" : "#FFFFFF",
          titleColor: isDark ? "#FFFFFF" : "#18181B",
          bodyColor: muted,
          borderColor: isDark ? "#3F3F46" : "#E4E4E7",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          displayColors: false,
          callbacks: {
            label: (context) =>
              ` ${context.parsed.y} ${
                context.parsed.y === 1 ? "subscriber" : "subscribers"
              }`,
          },
        },
      },
      scales: {
        x: {
          border: {
            display: false,
          },
          grid: {
            display: false,
          },
          ticks: {
            color: muted,
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: period === "week" ? 7 : 10,
            font: {
              size: 11,
            },
          },
        },
        y: {
          beginAtZero: true,
          border: {
            display: false,
          },
          grid: {
            color: grid,
          },
          ticks: {
            color: muted,
            precision: 0,
            stepSize: 1,
            padding: 10,
            font: {
              size: 11,
            },
          },
        },
      },
    };
  }, [isDark, period]);

  return (
    <section className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
            <Users size={19} />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Audience engagement
            </p>

            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Mailing list growth
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              New people joining the GFA community
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchSubscriptions}
          disabled={loading}
          aria-label="Refresh mailing-list analytics"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition hover:bg-surface-subtle hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-5 pt-6 sm:px-6">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            New subscribers
          </p>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
              {loading ? "—" : total.toLocaleString()}
            </span>

            <span className="text-xs text-muted-foreground">
              {period === "week" ? "Last 7 days" : "Last 30 days"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-brand-electric/10 px-3 py-2 text-brand-electric">
          <UserPlus size={15} />
          <span className="text-xs font-semibold">
            {period === "week" ? "Weekly growth" : "Monthly growth"}
          </span>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex items-center justify-between gap-3 px-5 pt-5 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays size={14} />
          <span>Subscription activity</span>
        </div>

        <div className="flex rounded-lg border border-border bg-surface-subtle p-1">
          {(["week", "month"] as Period[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setPeriod(value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                period === value
                  ? "bg-card text-brand-electric shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="px-3 pb-5 pt-4 sm:px-5">
        <div className="relative h-[280px] w-full sm:h-[310px]">
          {loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-brand-electric/20 border-t-brand-electric" />
              <p className="text-xs text-muted-foreground">
                Loading subscriber activity...
              </p>
            </div>
          ) : error ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <AlertCircle size={24} className="text-destructive" />
              <p className="max-w-xs text-sm text-muted-foreground">
                {error}
              </p>
              <button
                type="button"
                onClick={fetchSubscriptions}
                className="text-xs font-semibold text-brand-electric hover:underline"
              >
                Try again
              </button>
            </div>
          ) : total === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-electric/10 text-brand-electric">
                <Users size={20} />
              </div>

              <p className="text-sm font-medium text-foreground">
                No new subscribers yet
              </p>

              <p className="max-w-xs text-xs text-muted-foreground">
                New mailing-list subscriptions will appear here.
              </p>
            </div>
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
    </section>
  );
};
