
import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/utils/db";
import Enquiry from "@/models/enquiry.model";
import { authorizeEnquiryAdmin } from "@/utils/enquiry";

type Period = "week" | "month";

export async function GET(request: NextRequest) {
  try {
    // Reuse the same authorization as the enquiry management API.
    const { response } = await authorizeEnquiryAdmin();

    if (response) return response;

    await dbConnect();

    const requestedPeriod = request.nextUrl.searchParams.get("period");

    const period: Period =
      requestedPeriod === "month" ? "month" : "week";

    const now = new Date();

    // Use UTC calendar days consistently for filtering and grouping.
    const today = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      )
    );

    const numberOfDays = period === "week" ? 7 : 30;

    const startDate = new Date(today);
    startDate.setUTCDate(today.getUTCDate() - numberOfDays + 1);

    const endDate = new Date(today);
    endDate.setUTCDate(today.getUTCDate() + 1);

    const results = await Enquiry.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "UTC",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Convert aggregation results into a date lookup.
    const countByDate = new Map<string, number>(
      results.map((item) => [item._id, item.count])
    );

    // Include days with zero enquiries.
    const traffic = Array.from(
      { length: numberOfDays },
      (_, index) => {
        const date = new Date(startDate);
        date.setUTCDate(startDate.getUTCDate() + index);

        const dateKey = date.toISOString().slice(0, 10);

        return {
          date: dateKey,
          label: date.toLocaleDateString("en", {
            timeZone: "UTC",
            weekday: period === "week" ? "short" : undefined,
            day: "numeric",
            month: period === "month" ? "short" : undefined,
          }),
          count: countByDate.get(dateKey) ?? 0,
        };
      }
    );

    const total = traffic.reduce(
      (sum, item) => sum + item.count,
      0
    );

    return NextResponse.json(
      {
        success: true,
        period,
        total,
        traffic,
        startDate,
        endDate,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("GET enquiry traffic error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve enquiry analytics.",
      },
      { status: 500 }
    );
  }
}
