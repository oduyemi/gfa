"use client";
import { ArrowDown, ArrowUp } from "lucide-react";


const pageVisits = [
  {
    page: "/argon/",
    visitors: "4,569",
    uniqueUsers: "340",
    bounceRate: "46.53%",
    trend: "up",
    color: "text-emerald-500",
  },
  {
    page: "/argon/index.html",
    visitors: "3,985",
    uniqueUsers: "319",
    bounceRate: "46.53%",
    trend: "down",
    color: "text-orange-500",
  },
  {
    page: "/argon/charts.html",
    visitors: "3,513",
    uniqueUsers: "294",
    bounceRate: "36.49%",
    trend: "down",
    color: "text-orange-500",
  },
  {
    page: "/argon/tables.html",
    visitors: "2,050",
    uniqueUsers: "147",
    bounceRate: "50.87%",
    trend: "up",
    color: "text-emerald-500",
  },
  {
    page: "/argon/profile.html",
    visitors: "1,795",
    uniqueUsers: "190",
    bounceRate: "46.53%",
    trend: "down",
    color: "text-red-500",
  },
];

export const CardPageVisits = () => {
  return (
    <div className="relative mb-6 flex min-w-0 w-full flex-col break-words rounded-lg bg-white shadow-lg">
      {/* Header */}
      <div className="mb-0 rounded-t border-0 px-4 py-3">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-1 px-4">
            <h3 className="text-base font-semibold text-slate-700">
              Page visits
            </h3>
          </div>

          <div className="relative w-full max-w-full flex-1 px-4 text-right">
            <button
              type="button"
              className="mb-1 mr-1 rounded bg-indigo-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              See all
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="block w-full overflow-x-auto">
        <table className="w-full border-collapse items-center bg-transparent">
          <thead>
            <tr>
              <th className="whitespace-nowrap border-x-0 border-y border-solid border-slate-100 bg-slate-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-500">
                Page name
              </th>

              <th className="whitespace-nowrap border-x-0 border-y border-solid border-slate-100 bg-slate-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-500">
                Visitors
              </th>

              <th className="whitespace-nowrap border-x-0 border-y border-solid border-slate-100 bg-slate-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-500">
                Unique users
              </th>

              <th className="whitespace-nowrap border-x-0 border-y border-solid border-slate-100 bg-slate-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-500">
                Bounce rate
              </th>
            </tr>
          </thead>

          <tbody>
            {pageVisits.map((item) => (
              <tr
                key={item.page}
                className="transition-colors hover:bg-slate-50"
              >
                <th className="whitespace-nowrap border-x-0 border-t border-slate-100 p-4 px-6 text-left align-middle text-xs font-medium text-slate-700">
                  {item.page}
                </th>

                <td className="whitespace-nowrap border-x-0 border-t border-slate-100 p-4 px-6 align-middle text-xs text-slate-600">
                  {item.visitors}
                </td>

                <td className="whitespace-nowrap border-x-0 border-t border-slate-100 p-4 px-6 align-middle text-xs text-slate-600">
                  {item.uniqueUsers}
                </td>

                <td className="whitespace-nowrap border-x-0 border-t border-slate-100 p-4 px-6 align-middle text-xs text-slate-600">
                  <span className="inline-flex items-center">
                    {item.trend === "up" ? (
                      <ArrowUp
                        size={15}
                        strokeWidth={2.5}
                        className={`mr-3 ${item.color}`}
                      />
                    ) : (
                      <ArrowDown
                        size={15}
                        strokeWidth={2.5}
                        className={`mr-3 ${item.color}`}
                      />
                    )}

                    {item.bounceRate}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
