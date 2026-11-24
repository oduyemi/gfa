"use client";
const socialTraffic = [
  {
    platform: "Facebook",
    visitors: "1,480",
    percentage: 60,
    color: "bg-red-500",
    trackColor: "bg-red-100",
  },
  {
    platform: "Facebook",
    visitors: "5,480",
    percentage: 70,
    color: "bg-emerald-500",
    trackColor: "bg-emerald-100",
  },
  {
    platform: "Google",
    visitors: "4,807",
    percentage: 80,
    color: "bg-purple-500",
    trackColor: "bg-purple-100",
  },
  {
    platform: "Instagram",
    visitors: "3,678",
    percentage: 75,
    color: "bg-sky-500",
    trackColor: "bg-sky-100",
  },
  {
    platform: "Twitter",
    visitors: "2,645",
    percentage: 30,
    color: "bg-orange-500",
    trackColor: "bg-orange-100",
  },
];

export const CardSocialTraffic = () => {
  return (
    <div className="relative mb-6 flex min-w-0 w-full flex-col break-words rounded-lg bg-white shadow-lg">
      {/* Header */}
      <div className="mb-0 rounded-t border-0 px-4 py-3">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-1 px-4">
            <h3 className="text-base font-semibold text-slate-700">
              Social traffic
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
                Referral
              </th>

              <th className="whitespace-nowrap border-x-0 border-y border-solid border-slate-100 bg-slate-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-500">
                Visitors
              </th>

              <th className="min-w-[140px] whitespace-nowrap border-x-0 border-y border-solid border-slate-100 bg-slate-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-500">
                Traffic
              </th>
            </tr>
          </thead>

          <tbody>
            {socialTraffic.map((item, index) => (
              <tr
                key={`${item.platform}-${index}`}
                className="transition-colors hover:bg-slate-50"
              >
                <th className="whitespace-nowrap border-x-0 border-t border-slate-100 p-4 px-6 text-left align-middle text-xs font-medium text-slate-700">
                  {item.platform}
                </th>

                <td className="whitespace-nowrap border-x-0 border-t border-slate-100 p-4 px-6 align-middle text-xs text-slate-600">
                  {item.visitors}
                </td>

                <td className="whitespace-nowrap border-x-0 border-t border-slate-100 p-4 px-6 align-middle text-xs text-slate-600">
                  <div className="flex items-center">
                    <span className="mr-3 min-w-[35px] font-medium">
                      {item.percentage}%
                    </span>

                    <div
                      className={`relative h-2 w-full overflow-hidden rounded ${item.trackColor}`}
                      role="progressbar"
                      aria-valuenow={item.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${item.platform} traffic`}
                    >
                      <div
                        style={{ width: `${item.percentage}%` }}
                        className={`flex h-full flex-col justify-center whitespace-nowrap rounded text-center text-white shadow-none ${item.color}`}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
