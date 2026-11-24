import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Enquiry, { EnquiryService, EnquiryStatus, type IEnquiry } from "@/models/enquiry.model";import {
  authorizeEnquiryAdmin,
  escapeEnquiryRegex,
  getEnquiryValidationMessage,
  isEnquiryValidationError,
  normalizeEnquiryEmail,
  normalizeEnquiryPhone,
  parseEnquiryBody,
} from "@/utils/enquiry";
import { checkRateLimit, getClientIp } from "@/utils/rate-limit";


const allowedServices = Object.values(EnquiryService);
const arrayFields = [
  "creationServices",
  "goals",
  "channels",
  "supportTasks",
] as const;

const optionalStringFields = [
  "company",
  "subject",
  "budget",
  "timeline",
  "projectName",
] as const;

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

export async function GET(request: NextRequest) {
  try {
    const { response } = await authorizeEnquiryAdmin();
    if (response) return response;
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = Math.max(
      1,
      Number(searchParams.get("page")) || 1
    );

    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 10));
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status");
    const service = searchParams.get("service");
    const sort = searchParams.get("sort") === "oldest" ? 1 : -1;
    const filter: Record<string, unknown> = {};
    if (status) {
      if (!Object.values(EnquiryStatus).includes(status as EnquiryStatus)) {
        return NextResponse.json(
          { success: false, message: "Invalid enquiry status." },
          { status: 400 }
        );
      }

      filter.status = status;
    }

    if (service) {
      if (!allowedServices.includes(service as EnquiryService)) {
        return NextResponse.json(
          { success: false, message: "Invalid enquiry service." },
          { status: 400 }
        );
      }

      filter.service = service;
    }

    if (search) {
      const regex = new RegExp(escapeEnquiryRegex(search), "i");
      filter.$or = [
        { fullname: regex },
        { email: regex },
        { phone: regex },
        { company: regex },
        { subject: regex },
        { message: regex },
        { projectName: regex },
      ];
    }

    const skip = (page - 1) * limit;
    const [enquiries, total, pending, treated] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: sort })
        .skip(skip)
        .limit(limit)
        .populate("treatedBy", "fname lname email")
        .lean(),

      Enquiry.countDocuments(filter),

      Enquiry.countDocuments({
        ...filter,
        status: EnquiryStatus.PENDING,
      }),

      Enquiry.countDocuments({
        ...filter,
        status: EnquiryStatus.TREATED,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: enquiries,
      stats: {
        total,
        pending,
        treated,
      },
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
    console.error("GET enquiries error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve enquiries.",
      },
      { status: 500 }
    );
  }
}



export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        const rateLimit = checkRateLimit(`enquiry:${ip}`);
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
    
        const body = await parseEnquiryBody(request);
        if (!body) {
        return NextResponse.json(
            {
            success: false,
            message: "Invalid request body.",
            },
            { status: 400 }
        );
        }
    
        const fullname =
        typeof body.fullname === "string"
            ? body.fullname.trim()
            : "";
    
        const email = normalizeEnquiryEmail(body.email);
        const phone = normalizeEnquiryPhone(body.phone);
        const message = typeof body.message === "string"
            ? body.message.trim()
            : "";
    
        const serviceValue: unknown = body.service;
        if (
        !fullname ||
        !email ||
        !phone ||
        !message ||
        !serviceValue
        ) {
        return NextResponse.json(
            {
            success: false,
            message: "Please complete all required fields.",
            },
            { status: 400 }
        );
        }
    
        if (fullname.length > 120 || message.length > 10_000) {
        return NextResponse.json(
            {
            success: false,
            message: "One or more fields exceed the allowed length.",
            },
            { status: 400 }
        );
        }
    
        if (message.length < 10) {
        return NextResponse.json(
            {
            success: false,
            message: "Your message must contain at least 10 characters.",
            },
            { status: 400 }
        );
        }
    
        if (
        typeof serviceValue !== "string" ||
        !allowedServices.includes(serviceValue as EnquiryService)
        ) {
        return NextResponse.json(
            {
            success: false,
            message: "Please select a valid enquiry service.",
            },
            { status: 400 }
        );
        }
    
        const service = serviceValue as EnquiryService;
        const optionalFields: Partial<
        Pick<
            IEnquiry,
            | "company"
            | "subject"
            | "budget"
            | "timeline"
            | "projectName"
        >
        > = {};
    
        for (const field of optionalStringFields) {const value = body[field];
        if (value !== undefined && value !== null) {
            if (typeof value !== "string") {
            return NextResponse.json(
                {
                success: false,
                message: `Invalid value for ${field}.`,
                },
                { status: 400 }
            );
            }
    
            const trimmed = value.trim();
            if (trimmed.length > 500) {
            return NextResponse.json(
                {
                success: false,
                message: `${field} is too long.`,
                },
                { status: 400 }
            );
            }
    
            if (trimmed) {
            optionalFields[field] = trimmed;
            }
        }
        }
    
        const optionalArrays: Partial<
        Pick<
            IEnquiry,
            | "creationServices"
            | "goals"
            | "channels"
            | "supportTasks"
        >
        > = {};
    
        for (const field of arrayFields) {
        const value = body[field];
        if (value !== undefined && value !== null) {
            if (!isStringArray(value)) {
            return NextResponse.json(
                {
                success: false,
                message: `Invalid selection for ${field}.`,
                },
                { status: 400 }
            );
            }
    
            const uniqueValues = [...new Set(value)];
    
            switch (field) {
            case "creationServices":
                optionalArrays.creationServices =
                uniqueValues as IEnquiry["creationServices"];
                break;
    
            case "goals":
                optionalArrays.goals =
                uniqueValues as IEnquiry["goals"];
                break;
    
            case "channels":
                optionalArrays.channels =
                uniqueValues as IEnquiry["channels"];
                break;
    
            case "supportTasks":
                optionalArrays.supportTasks =
                uniqueValues as IEnquiry["supportTasks"];
                break;
            }
        }
        }
    
        const enquiryData: Partial<IEnquiry> = {
        fullname,
        email,
        phone,
        message,
        service,
        ...optionalFields,
        ...optionalArrays,
    
        ...(typeof body.serviceInterest === "string"
            ? {
                serviceInterest:
                body.serviceInterest as IEnquiry["serviceInterest"],
            }
            : {}),
    
        ...(typeof body.businessStage === "string"
            ? {
                businessStage:
                body.businessStage as IEnquiry["businessStage"],
            }
            : {}),
    
        ...(typeof body.supportType === "string"
            ? {
                supportType:
                body.supportType as IEnquiry["supportType"],
            }
            : {}),
    
        ...(typeof body.hours === "string"
            ? {
                hours: body.hours as IEnquiry["hours"],
            }
            : {}),
        };
    
        await dbConnect();
        const enquiry = await new Enquiry(enquiryData).save();
        return NextResponse.json(
        {
            success: true,
            message: "Your enquiry has been submitted successfully.",
            data: {
            id: enquiry._id,
            service: enquiry.service,
            status: enquiry.status,
            createdAt: enquiry.createdAt,
            },
        },
        { status: 201 }
        );
    } catch (error) {
        if (isEnquiryValidationError(error)) {
        return NextResponse.json(
            {
            success: false,
            message: getEnquiryValidationMessage(error),
            },
            { status: 400 }
        );
        }
    
        console.error("POST enquiry error:", error);
    
        return NextResponse.json(
        {
            success: false,
            message: "Unable to submit your enquiry. Please try again.",
        },
        { status: 500 }
        );
    }
}
  