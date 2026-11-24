import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Enquiry, {
    EnquiryService,
    EnquiryStatus,
    GeneralServiceInterest,
    CreationService,
    ExecutionGoal,
    MarketingChannel,
    BusinessStage,
    SupportTask,
    SupportType,
    SupportHours,
    type IEnquiry,
} from "@/models/enquiry.model";
import {
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

function isEnumValue<T extends Record<string, string>>(
    value: unknown,
    enumObject: T,
  ): value is T[keyof T] {
    return (
      typeof value === "string" &&
      Object.values(enumObject).includes(value as T[keyof T])
    );
  }
  
  function isEnumArray<T extends Record<string, string>>(
    value: unknown,
    enumObject: T,
  ): value is Array<T[keyof T]> {
    return (
      Array.isArray(value) &&
      value.every((item) => isEnumValue(item, enumObject))
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
            },
        );
        }
    
        const body = await parseEnquiryBody(request);
        if (!body) {
        return NextResponse.json(
            {
            success: false,
            message: "Invalid request body.",
            },
            { status: 400 },
        );
        }
    
        const fullname = typeof body.fullname === "string" ? body.fullname.trim() : "";
        const email = normalizeEnquiryEmail(body.email);
        const phone = normalizeEnquiryPhone(body.phone);
        const message = typeof body.message === "string" ? body.message.trim() : "";
        const serviceValue: unknown = body.service;
    
        if (!fullname || !email || !phone || !message || !serviceValue) {
        return NextResponse.json(
            {
            success: false,
            message: "Please complete all required fields.",
            },
            { status: 400 },
        );
        }
    
        if (fullname.length > 120 || message.length > 10_000) {
        return NextResponse.json(
            {
            success: false,
            message: "One or more fields exceed the allowed length.",
            },
            { status: 400 },
        );
        }
    
        if (message.length < 10) {
        return NextResponse.json(
            {
            success: false,
            message: "Your message must contain at least 10 characters.",
            },
            { status: 400 },
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
            { status: 400 },
        );
        }
    
        const service = serviceValue as EnquiryService;
        const optionalFields: Partial<
        Pick<
            IEnquiry,
            "company" | "subject" | "budget" | "timeline" | "projectName"
        >
        > = {};
    
        for (const field of optionalStringFields) {
        const value = body[field];
        if (value === undefined || value === null) continue;
        if (typeof value !== "string") {
            return NextResponse.json(
            {
                success: false,
                message: `Invalid value for ${field}.`,
            },
            { status: 400 },
            );
        }
    
        const trimmed = value.trim();
        if (trimmed.length > 500) {
            return NextResponse.json(
            {
                success: false,
                message: `${field} is too long.`,
            },
            { status: 400 },
            );
        }
    
        if (trimmed) {
            optionalFields[field] = trimmed;
        }
        }
    
        const enumFields: Partial<
        Pick<
            IEnquiry,
            "serviceInterest" | "businessStage" | "supportType" | "hours"
        >
        > = {};
        const serviceInterestValue = body.serviceInterest;
        if (
        serviceInterestValue !== undefined &&
        serviceInterestValue !== null &&
        serviceInterestValue !== ""
        ) {
        if (
            !isEnumValue(serviceInterestValue, GeneralServiceInterest)
        ) {
            return NextResponse.json(
            {
                success: false,
                message: "Please select a valid service interest.",
            },
            { status: 400 },
            );
        }
    
        enumFields.serviceInterest = serviceInterestValue;
        }
    
        const businessStageValue = body.businessStage;
        if (
        businessStageValue !== undefined &&
        businessStageValue !== null &&
        businessStageValue !== ""
        ) {
        if (!isEnumValue(businessStageValue, BusinessStage)) {
            return NextResponse.json(
            {
                success: false,
                message: "Please select a valid business stage.",
            },
            { status: 400 },
            );
        }
    
        enumFields.businessStage = businessStageValue;
        }
    
        const supportTypeValue = body.supportType;
        if (
        supportTypeValue !== undefined &&
        supportTypeValue !== null &&
        supportTypeValue !== ""
        ) {
        if (!isEnumValue(supportTypeValue, SupportType)) {
            return NextResponse.json(
            {
                success: false,
                message: "Please select a valid support arrangement.",
            },
            { status: 400 },
            );
        }
    
        enumFields.supportType = supportTypeValue;
        }
        const hoursValue = body.hours;  
        if (
        hoursValue !== undefined &&
        hoursValue !== null &&
        hoursValue !== ""
        ) {
        if (!isEnumValue(hoursValue, SupportHours)) {
            return NextResponse.json(
            {
                success: false,
                message: "Please select a valid support hours option.",
            },
            { status: 400 },
            );
        }
    
        enumFields.hours = hoursValue;
        }
        const optionalArrays: Partial<
        Pick<
            IEnquiry,
            "creationServices" | "goals" | "channels" | "supportTasks"
        >
        > = {};
    
        const creationServicesValue = body.creationServices;
        if (
        creationServicesValue !== undefined &&
        creationServicesValue !== null
        ) {
        if (!isEnumArray(creationServicesValue, CreationService)) {
            return NextResponse.json(
            {
                success: false,
                message: "One or more creation service selections are invalid.",
            },
            { status: 400 },
            );
        }
    
        optionalArrays.creationServices = [
            ...new Set(creationServicesValue),
        ];
        }
    
        const goalsValue = body.goals;
        if (goalsValue !== undefined && goalsValue !== null) {
        if (!isEnumArray(goalsValue, ExecutionGoal)) {
            return NextResponse.json(
            {
                success: false,
                message: "One or more business goal selections are invalid.",
            },
            { status: 400 },
            );
        }
    
        optionalArrays.goals = [...new Set(goalsValue)];
        }
    
        const channelsValue = body.channels;
        if (channelsValue !== undefined && channelsValue !== null) {
        if (!isEnumArray(channelsValue, MarketingChannel)) {
            return NextResponse.json(
            {
                success: false,
                message: "One or more marketing channel selections are invalid.",
            },
            { status: 400 },
            );
        }
    
        const uniqueChannels = [...new Set(channelsValue)];
        if (
            uniqueChannels.includes(MarketingChannel.NONE) &&
            uniqueChannels.length > 1
        ) {
            return NextResponse.json(
            {
                success: false,
                message:
                '"Not currently using any" cannot be combined with other marketing channels.',
            },
            { status: 400 },
            );
        }
    
        optionalArrays.channels = uniqueChannels;
        }
    
        const supportTasksValue = body.supportTasks;
        if (supportTasksValue !== undefined && supportTasksValue !== null) {
        if (!isEnumArray(supportTasksValue, SupportTask)) {
            return NextResponse.json(
            {
                success: false,
                message: "One or more support task selections are invalid.",
            },
            { status: 400 },
            );
        }
    
        optionalArrays.supportTasks = [...new Set(supportTasksValue)];
        }
    
        const enquiryData: Partial<IEnquiry> = {
        fullname,
        email,
        phone,
        message,
        service,
        ...optionalFields,
        ...optionalArrays,
        ...enumFields,
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
        { status: 201 },
        );
    } catch (error) {
        if (isEnquiryValidationError(error)) {
        return NextResponse.json(
            {
            success: false,
            message: getEnquiryValidationMessage(error),
            },
            { status: 400 },
        );
        }
        console.error("POST enquiry error:", error);
        return NextResponse.json(
        {
            success: false,
            message: "Unable to submit your enquiry. Please try again.",
        },
        { status: 500 },
        );
    }
}
  
  