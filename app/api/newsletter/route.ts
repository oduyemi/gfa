import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import MailingList from "@/models/mailinglist.model";
import { Types } from "mongoose";
import { getCurrentUser } from "@/utils/auth";
import { checkRateLimit, getClientIp } from "@/utils/rate-limit";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const email = value.trim().toLowerCase();

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return null;
  }

  return email;
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

function isValidationError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error.name === "ValidationError" ||
      error.name === "CastError")
  );
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred.";
}

async function getRequestBody(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return null;
    }

    return body as Record<string, unknown>;
  } catch {
    return null;
  }
}


export async function GET(req: NextRequest) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const requestedPage = Number(searchParams.get("page")) || 1;
    const requestedLimit = Number(searchParams.get("limit")) || 20;
    const page = Math.max(1, Math.floor(requestedPage));
    const limit = Math.min(100, Math.max(1, Math.floor(requestedLimit)));
    const search = searchParams.get("search")?.trim() || "";
    const filter = search
      ? {
          email: {
            $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            $options: "i",
          },
        }
      : {};

    const [subscribers, total] = await Promise.all([
      MailingList.find(filter)
        .select("email createdAt updatedAt")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      MailingList.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: subscribers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Newsletter GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve subscribers. Please try again.",
      },
      { status: 500 }
    );
  }
}

    
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many subscription attempts. Please try again in a few minutes.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await getRequestBody(request);
    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const email = normalizeEmail(body.email);
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    await dbConnect();
    const existing = await MailingList.exists({ email });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already subscribed.",
        },
        { status: 409 }
      );
    }

    // 6. Create subscription
    await MailingList.create({ email });

    return NextResponse.json(
      {
        success: true,
        message: "You're on the list! Thanks for subscribing.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: "This email is already subscribed.",
        },
        { status: 409 }
      );
    }

    if (isValidationError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    console.error("Newsletter POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process your subscription. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await getRequestBody(req);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { id } = body;
    const email = normalizeEmail(body.email);
    if (typeof id !== "string" || !Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "A valid subscriber ID is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await dbConnect();
    const subscriber = await MailingList.findByIdAndUpdate(
      id,
      { $set: { email } },
      {
        new: true,
        runValidators: true,
      }
    ).select("email createdAt updatedAt");

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber updated successfully.",
      data: subscriber,
    });
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: "Another subscriber is already using this email address.",
        },
        { status: 409 }
      );
    }

    if (isValidationError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    console.error("Newsletter PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update subscriber. Please try again.",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "A valid subscriber ID is required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const subscriber = await MailingList.findByIdAndDelete(id);

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber removed successfully.",
    });
  } catch (error) {
    console.error("Newsletter DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to remove subscriber. Please try again.",
      },
      { status: 500 }
    );
  }
}
