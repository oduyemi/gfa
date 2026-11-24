import { BarChart3, PieChart, Users, Percent } from "lucide-react";
import { CardStats } from "../../../components/admin/Cards/CardStats";

const stats = [
  {
    statSubtitle: "TRAFFIC",
    statTitle: "350,897",
    statArrow: "up" as const,
    statPercent: "3.48",
    statPercentColor: "text-emerald-500",
    statDescription: "Since last month",
    statIcon: <BarChart3 size={20} />,
    statIconColor: "bg-red-500",
  },
  {
    statSubtitle: "NEW USERS",
    statTitle: "2,356",
    statArrow: "down" as const,
    statPercent: "3.48",
    statPercentColor: "text-red-500",
    statDescription: "Since last week",
    statIcon: <PieChart size={20} />,
    statIconColor: "bg-orange-500",
  },
  {
    statSubtitle: "SALES",
    statTitle: "924",
    statArrow: "down" as const,
    statPercent: "1.10",
    statPercentColor: "text-orange-500",
    statDescription: "Since yesterday",
    statIcon: <Users size={20} />,
    statIconColor: "bg-pink-500",
  },
  {
    statSubtitle: "PERFORMANCE",
    statTitle: "49.65%",
    statArrow: "up" as const,
    statPercent: "12",
    statPercentColor: "text-emerald-500",
    statDescription: "Since last month",
    statIcon: <Percent size={20} />,
    statIconColor: "bg-sky-500",
  },
];

export const HeaderStats = () => {
  return (
    <section className="relative bg-sky-600 pb-32 pt-12 md:pt-32">
      <div className="mx-auto w-full px-4 md:px-10">
        <div className="flex flex-wrap">
          {stats.map((stat) => (
            <div
              key={stat.statSubtitle}
              className="w-full px-4 lg:w-6/12 xl:w-3/12"
            >
              <CardStats
                statSubtitle={stat.statSubtitle}
                statTitle={stat.statTitle}
                statArrow={stat.statArrow}
                statPercent={stat.statPercent}
                statPercentColor={stat.statPercentColor}
                statDescription={stat.statDescription}
                statIcon={stat.statIcon}
                statIconColor={stat.statIconColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
