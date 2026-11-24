
import { CardLineChart } from "@/components/admin/Cards/CardLineChart";
import { CardBarChart } from "@/components/admin/Cards/CardBarChart";
import { CardPageVisits } from "@/components/admin/Cards/CardPageVisits";
import { CardSocialTraffic } from "@/components/admin/Cards/CardSocialTraffic";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
          <CardLineChart />
        </div>

        <div className="w-full px-4 xl:w-4/12">
          <CardBarChart />
        </div>
      </div>

      {/* Tables */}
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
          <CardPageVisits />
        </div>

        <div className="w-full px-4 xl:w-4/12">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
