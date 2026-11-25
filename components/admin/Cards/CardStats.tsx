"use client";

import type { ReactNode } from "react";

interface CardStatsProps {
  statSubtitle: string;
  statTitle: string | number;
  statDescription?: string;
  statIcon?: ReactNode;
  statIconColor?: string;
  loading?: boolean;
}

export const CardStats = ({
  statSubtitle,
  statTitle,
  statDescription,
  statIcon,
  statIconColor = "bg-brand-electric/10 text-brand-electric dark:bg-blue-400/15 dark:text-blue-300",
  loading = false,
}: CardStatsProps) => {
  const formattedTitle =
    typeof statTitle === "number"
      ? statTitle.toLocaleString()
      : statTitle;

  return (
    <article
      className="
        group relative isolate h-full overflow-hidden
        rounded-2xl border border-slate-200
        bg-white p-5
        shadow-[0_4px_20px_rgba(15,23,42,0.045)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-brand-electric/40
        hover:shadow-[0_12px_30px_rgba(18,101,244,0.09)]
        dark:border-[#343945]
        dark:bg-[#171A22]
        dark:shadow-[0_8px_28px_rgba(0,0,0,0.25)]
        dark:hover:border-[#4B5D82]
        dark:hover:bg-[#1B202B]
        dark:hover:shadow-[0_14px_35px_rgba(0,0,0,0.35)]
        sm:p-6
      "
    >
      {/* Decorative corner accent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-12 -top-12
          h-36 w-36 rounded-full
          bg-brand-electric/[0.07] blur-3xl
          transition-all duration-500
          group-hover:bg-brand-electric/[0.13]
          dark:bg-blue-500/[0.10]
          dark:group-hover:bg-blue-500/[0.17]
        "
      />

      {/* Top border accent */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-6 top-0 h-[2px]
          rounded-full bg-brand-electric
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          dark:bg-blue-400
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p
              className="
                text-[10px] font-bold uppercase
                tracking-[0.16em] text-black
                dark:text-slate-300
              "
            >
              {statSubtitle}
            </p>

            {/* Main value */}
            {loading ? (
              <div
                className="
                  mt-5 h-9 w-28 animate-pulse rounded-lg
                  bg-slate-200
                  dark:bg-slate-700
                "
              />
            ) : (
              <p
                className="
                  mt-4 font-brand-display text-3xl
                  font-bold tracking-tight text-black
                  sm:text-4xl
                  dark:text-gray-400
                "
              >
                {formattedTitle}
              </p>
            )}
          </div>

          {/* Icon */}
          <div
            className={`
              flex h-12 w-12 shrink-0 items-center
              justify-center rounded-xl
              ring-1 ring-inset ring-black/[0.04]
              dark:ring-white/[0.08]
              ${statIconColor}
            `}
          >
            {statIcon}
          </div>
        </div>

        {/* Description */}
        <div
          className="
            mt-6 border-t border-slate-200 pt-4
            dark:border-slate-700
          "
        >
          {loading ? (
            <div
              className="
                h-3 w-36 animate-pulse rounded
                bg-slate-200
                dark:bg-slate-700
              "
            />
          ) : (
            <p
              className="
                text-xs font-medium leading-5
                text-black
                dark:text-slate-300
              "
            >
              {statDescription}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};