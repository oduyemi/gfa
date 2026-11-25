"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, RefreshCw, TrendingUp } from "lucide-react";


type Period = "week" | "month";
interface TrafficItem {
  date: string;
  label: string;
  count: number;
}

interface TrafficResponse {
  success: boolean;
  period: Period;
  total: number;
  traffic: TrafficItem[];
}

export const CardEnquiryTraffic = () => {
  const [period, setPeriod] = useState<Period>("week");
  const [traffic, setTraffic] = useState<TrafficItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTraffic = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/enquiry/traffic?period=${period}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal,
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load enquiry activity.");
      }

      const data: TrafficResponse = await response.json();

      setTraffic(data.traffic ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      console.error("Enquiry traffic error:", err);
      setError("We couldn't load enquiry activity.");
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [period]);

  useEffect(() => {
    const controller = new AbortController();

    fetchTraffic(controller.signal);

    return () => controller.abort();
  }, [fetchTraffic]);

  const maxCount = useMemo(
    () => Math.max(...traffic.map((item) => item.count), 1),
    [traffic]
  );

  const average = traffic.length
    ? (total / traffic.length).toFixed(1)
    : "0";

  return (
    <section className="relative mb-6 w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-premium-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
            <Activity size={19} />
          </div>

          <div>
            <h3 className="font-brand-display text-sm font-bold text-foreground">
              Enquiry activity
            </h3>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Track incoming enquiries over time
            </p>
          </div>
        </div>

        {/* Period selector */}
        <div className="flex items-center rounded-xl border border-border bg-surface-subtle p-1">
          {(["week", "month"] as Period[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              aria-pressed={period === item}
              className={`rounded-lg px-3 py-2 text-[10px] font-semibold capitalize transition-all ${
                period === item
                  ? "bg-brand-electric text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item === "week" ? "7 days" : "30 days"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Summary */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Total enquiries received
            </p>

            <div className="mt-2 flex items-center gap-3">
              <span className="font-brand-display text-3xl font-bold tracking-tight text-foreground tabular-nums">
                {loading ? "—" : total.toLocaleString()}
              </span>

              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-brand-electric/10 px-2 py-1 text-[10px] font-semibold text-brand-electric">
                <TrendingUp size={12} />
                {period === "week" ? "7 days" : "30 days"}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">
              Daily average
            </p>
            <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
              {loading ? "—" : average}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="relative min-h-[190px]">
          {loading ? (
            <div className="flex h-[190px] items-end gap-2">
              {Array.from({ length: period === "week" ? 7 : 15 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col justify-end"
                  >
                    <div
                      className="animate-pulse rounded-t-md bg-surface-subtle"
                      style={{
                        height: `${35 + ((index * 17) % 65)}px`,
                      }}
                    />
                  </div>
                )
              )}
            </div>
          ) : error ? (
            <div className="flex h-[190px] flex-col items-center justify-center gap-3">
              <p className="text-xs text-muted-foreground">{error}</p>

              <button
                type="button"
                onClick={() => fetchTraffic()}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface-subtle"
              >
                <RefreshCw size={13} />
                Try again
              </button>
            </div>
          ) : total === 0 ? (
            <div className="flex h-[190px] flex-col items-center justify-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-subtle text-muted-foreground">
                <Activity size={20} />
              </div>

              <p className="text-sm font-semibold text-foreground">
                No enquiries yet
              </p>

              <p className="text-xs text-muted-foreground">
                New enquiries will appear here.
              </p>
            </div>
          ) : (
            <div className="flex h-[190px] items-end gap-1.5 sm:gap-3">
              {traffic.map((item) => {
                const height =
                  item.count > 0
                    ? Math.max((item.count / maxCount) * 145, 8)
                    : 3;

                return (
                  <div
                    key={item.date}
                    className="group flex h-full min-w-0 flex-1 flex-col justify-end"
                    title={`${item.count} ${
                      item.count === 1 ? "enquiry" : "enquiries"
                    } on ${item.date}`}
                  >
                    <div className="mb-2 text-center text-[10px] font-semibold text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      {item.count}
                    </div>

                    <div
                      className="relative w-full rounded-t-md bg-brand-electric/10 transition-colors group-hover:bg-brand-electric/20"
                      style={{ height: `${height}px` }}
                      role="img"
                      aria-label={`${item.count} enquiries on ${item.date}`}
                    >
                      {item.count > 0 && (
                        <div className="absolute inset-x-0 bottom-0 rounded-t-md bg-brand-electric transition-all duration-500 group-hover:bg-brand-gold"
                          style={{ height: "100%" }}
                        />
                      )}
                    </div>

                    <span className="mt-3 truncate text-center text-[9px] font-medium text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && (
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <p className="text-[10px] text-muted-foreground">
              Based on enquiry submission dates
            </p>

            <button
              type="button"
              onClick={() => fetchTraffic()}
              aria-label="Refresh enquiry activity"
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-brand-electric transition-colors hover:text-brand-gold"
            >
              <RefreshCw size={12} />
              Refresh
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
