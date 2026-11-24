import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Contact from "@/models/contact.model";
import { authorizeAdmin, escapeRegex, normalizeContactEmail, parseRequestBody, validateContactPhone } from "@/utils/contact";
import { checkRateLimit, getClientIp } from "@/utils/rate-limit";


function isValidationError(error: unknown) {

  return (
    error instanceof Error &&
    ["ValidationError", "CastError"].includes(error.name)
  );
}


export async function GET(request: NextRequest) {
  try {
    const { response } = await authorizeAdmin();
    if (response) return response;
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit")) || 10)
    );
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status");
    const sort = searchParams.get("sort") === "oldest" ? 1 : -1;
    const filter: Record<string, unknown> = {};
    if (status && ["pending", "treated"].includes(status)) {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      filter.$or = [
        { fullname: regex },
        { email: regex },
        { phone: regex },
        { subject: regex },
        { message: regex },
      ];
    }

    const skip = (page - 1) * limit;
    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: sort })
        .skip(skip)
        .limit(limit)
        .populate("treatedBy", "fname lname email")
        .lean(),

      Contact.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("GET contacts error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to retrieve contacts." },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`contact:${ip}`);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many enquiries. Please wait a few minutes before trying again.",
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

    const body = await parseRequestBody(request);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const fullname = typeof body.fullname === "string" ? body.fullname.trim() : "";
    const email = normalizeContactEmail(body.email);
    const phone = validateContactPhone(body.phone);
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!fullname || !email || !phone || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    if (
      fullname.length > 120 ||
      subject.length > 200 ||
      message.length > 10_000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more fields exceed the allowed length.",
        },
        { status: 400 }
      );
    }

    await dbConnect();
    const contact = await Contact.create({
      fullname,
      email,
      phone,
      subject,
      message,
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
        data: {
          id: contact._id,
          status: contact.status,
          createdAt: contact.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (isValidationError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your contact details and try again.",
        },
        { status: 400 }
      );
    }

    console.error("POST contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}