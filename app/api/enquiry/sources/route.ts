import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Enquiry, { EnquiryService } from "@/models/enquiry.model";
import { authorizeEnquiryAdmin } from "@/utils/enquiry";


type Period = "week" | "month" | "all";

const TIME_ZONE = "Europe/London";

interface SourceCount {
  _id: EnquiryService;
  count: number;
}

function getDateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

/**
 * Adds calendar days without relying on the server's local timezone.
 */
function addDays(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);

  const date = new Date(
    Date.UTC(year, month - 1, day + days),
  );

  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

/**
 * Converts UK local midnight to its equivalent UTC instant.
 *
 * Automatically accounts for:
 * - GMT (UTC+0)
 * - BST (UTC+1)
 *
 * Uses Intl timezone data rather than a hardcoded UTC offset.
 */
function getUKMidnight(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);

  const target = Date.UTC(year, month - 1, day, 0, 0, 0);

  let guess = target;

  for (let i = 0; i < 3; i++) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date(guess));

    const values = Object.fromEntries(
      parts.map(({ type, value }) => [type, value]),
    );

    const localAsUTC = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second),
    );

    guess += target - localAsUTC;
  }

  return new Date(guess);
}

export async function GET(request: NextRequest) {
  try {
    // Admin authorization
    const { response } = await authorizeEnquiryAdmin();

    if (response) return response;

    // Validate reporting period
    const { searchParams } = new URL(request.url);

    const requestedPeriod = searchParams.get("period") || "week";

    if (!["week", "month", "all"].includes(requestedPeriod)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid period. Use week, month, or all.",
        },
        { status: 400 },
      );
    }

    const period = requestedPeriod as Period;

    await dbConnect();

    // Calculate date boundaries using UK calendar dates
    const now = new Date();
    const today = getDateKey(now);

    const startDateKey =
      period === "week"
        ? addDays(today, -6)
        : period === "month"
          ? addDays(today, -29)
          : null;

    // Exclusive upper boundary: midnight at the start of tomorrow
    const endDate =
      period === "all"
        ? null
        : getUKMidnight(addDays(today, 1));

    const startDate = startDateKey
      ? getUKMidnight(startDateKey)
      : null;

    // Build aggregation filter
    const match: Record<string, unknown> = {};

    if (startDate && endDate) {
      match.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    // Aggregate enquiries by service.
    // Both pending and treated enquiries are included.
    const results: SourceCount[] = await Enquiry.aggregate([
      ...(Object.keys(match).length
        ? [{ $match: match }]
        : []),
      {
        $group: {
          _id: "$service",
          count: { $sum: 1 },
        },
      },
    ]);

    // Map aggregated counts
    const counts = new Map(
      results.map((item) => [item._id, item.count]),
    );

    const total = results.reduce(
      (sum, item) => sum + item.count,
      0,
    );

    // Include every service, even when its count is zero
    const sources = Object.values(EnquiryService).map(
      (service) => {
        const count = counts.get(service) ?? 0;

        return {
          source: service,
          count,
          percentage:
            total > 0
              ? Math.round((count / total) * 1000) / 10
              : 0,
        };
      },
    );

    // Highest enquiry volume first
    sources.sort((a, b) => b.count - a.count);

    return NextResponse.json(
      {
        success: true,
        period,
        timeZone: TIME_ZONE,
        total,
        sources,
        startDate,
        endDate,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("GET enquiry sources error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve enquiry source analytics.",
      },
      { status: 500 },
    );
  }
}
