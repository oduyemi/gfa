import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import MailingList from "@/models/mailinglist.model";
import { getCurrentUser } from "@/utils/auth";

const TIME_ZONE = "Africa/Lagos";

type Period = "week" | "month";

interface DailySubscription {
  _id: string;
  count: number;
}

async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}

// Get a date key in the reporting timezone.
function getDateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

// Add or subtract calendar days without depending on the server timezone.
function addDays(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day + days));

  return date.toISOString().slice(0, 10);
}

// Convert a local calendar date's midnight to its UTC instant.
function getZonedMidnight(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);

  const utcGuess = new Date(
    Date.UTC(year, month - 1, day)
  );

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(utcGuess);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, Number(part.value)])
  );

  const representedAsUtc = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second
  );

  const offset = representedAsUtc - utcGuess.getTime();

  return new Date(utcGuess.getTime() - offset);
}

// Format chart labels.
function getDateLabel(dateKey: string, period: Period): string {
  const [year, month, day] = dateKey.split("-").map(Number);

  // Use UTC here because dateKey is already a calendar date.
  const date = new Date(Date.UTC(year, month - 1, day));

  if (period === "week") {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
      timeZone: "UTC",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}

export async function GET(request: NextRequest) {
  try {
    // 1. Admin authorization
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    // 2. Validate reporting period
    const requestedPeriod =
      request.nextUrl.searchParams.get("period") || "week";

    if (
      requestedPeriod !== "week" &&
      requestedPeriod !== "month"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid period. Use 'week' or 'month'.",
        },
        { status: 400 }
      );
    }

    const period: Period = requestedPeriod;
    const numberOfDays = period === "week" ? 7 : 30;

    // 3. Establish Lagos calendar-day boundaries
    const todayKey = getDateKey(new Date());

    const startDateKey = addDays(
      todayKey,
      -(numberOfDays - 1)
    );

    const endDateKey = addDays(todayKey, 1);

    const startDate = getZonedMidnight(startDateKey);
    const endDate = getZonedMidnight(endDateKey);

    // 4. Connect to database
    await dbConnect();

    // 5. Aggregate new subscriptions by local calendar day
    const results: DailySubscription[] =
      await MailingList.aggregate([
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
                timezone: TIME_ZONE,
              },
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    // 6. Map database results by date
    const countByDate = new Map<string, number>(
      results.map((item) => [item._id, item.count])
    );

    // 7. Fill dates without subscriptions with zero
    const traffic = Array.from(
      { length: numberOfDays },
      (_, index) => {
        const date = addDays(startDateKey, index);

        return {
          date,
          label: getDateLabel(date, period),
          count: countByDate.get(date) ?? 0,
        };
      }
    );

    // 8. Calculate total new subscriptions in this period
    const total = traffic.reduce(
      (sum, item) => sum + item.count,
      0
    );

    return NextResponse.json(
      {
        success: true,
        period,
        timeZone: TIME_ZONE,
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
    console.error("Newsletter traffic GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve mailing-list analytics.",
      },
      { status: 500 }
    );
  }
}
