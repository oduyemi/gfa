import { CardLineChart } from "@/components/admin/Cards/CardLineChart";
import { CardBarChart } from "@/components/admin/Cards/CardBarChart";
import { CardEnquirySources } from "@/components/admin/Cards/CardEnquirySources";
import { CardEnquiryTraffic } from "@/components/admin/Cards/CardEnquiryTraffic";

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
          <CardEnquirySources />
        </div>

        <div className="w-full px-4 xl:w-4/12">
          <CardEnquiryTraffic />
        </div>
      </div>
    </>
  );
}
