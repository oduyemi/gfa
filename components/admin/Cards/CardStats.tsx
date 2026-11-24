import { ArrowDown, ArrowUp, BarChart3 } from "lucide-react";


type StatArrow = "up" | "down" | "none";

interface CardStatsProps {
  statSubtitle?: string;
  statTitle?: string;
  statArrow?: StatArrow;
  statPercent?: string;
  statPercentColor?: string;
  statDescription?: string;
  statIcon?: React.ReactNode;
  statIconColor?: string;
}

export const CardStats = ({
  statSubtitle = "Traffic",
  statTitle = "350,897",
  statArrow = "up",
  statPercent = "3.48",
  statPercentColor = "text-emerald-500",
  statDescription = "Since last month",
  statIcon,
  statIconColor = "bg-red-500",
}: CardStatsProps) => {
  const icon =
    statArrow === "up" ? (
      <ArrowUp className="inline-block h-4 w-4" />
    ) : statArrow === "down" ? (
      <ArrowDown className="inline-block h-4 w-4" />
    ) : null;

  return (
    <div className="relative flex min-w-0 flex-col break-words rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-1 pr-4">
            <h5 className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
              {statSubtitle}
            </h5>

            <span className="text-xl font-semibold text-slate-700">
              {statTitle}
            </span>
          </div>

          <div className="relative w-auto flex-initial pl-4">
            <div
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full p-3 text-center text-white shadow-md ${statIconColor}`}
            >
              {statIcon ?? <BarChart3 className="h-6 w-6" />}
            </div>
          </div>
        </div>

        <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm text-slate-400">
          <span className={`inline-flex items-center gap-1 font-semibold ${statPercentColor}`}>
            {icon}
            {statPercent}%
          </span>

          <span className="whitespace-nowrap">
            {statDescription}
          </span>
        </p>
      </div>
    </div>
  );
}
