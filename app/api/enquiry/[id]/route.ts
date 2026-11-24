import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { dbConnect } from "@/utils/db";
import Enquiry, { EnquiryStatus } from "@/models/enquiry.model";
import { authorizeEnquiryAdmin, isValidEnquiryId, parseEnquiryBody } from "@/utils/enquiry";


type RouteContext = {
  params: Promise<{ id: string }>;
};


export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { response } = await authorizeEnquiryAdmin();
    if (response) return response;
    const { id } = await params;
    if (!isValidEnquiryId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid enquiry ID." },
        { status: 400 }
      );
    }

    await dbConnect();
    const enquiry = await Enquiry.findById(id)
      .populate("treatedBy", "fname lname email")
      .lean();

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error("GET enquiry error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to retrieve enquiry." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { user, response } = await authorizeEnquiryAdmin();
    if (response) return response;
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!isValidEnquiryId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid enquiry ID." },
        { status: 400 }
      );
    }

    const body = await parseEnquiryBody(request);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    if (
      typeof body.status !== "string" ||
      !Object.values(EnquiryStatus).includes(
        body.status as EnquiryStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Status must be pending or treated.",
        },
        { status: 400 }
      );
    }

    await dbConnect();
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    enquiry.status = body.status as EnquiryStatus;

    if (enquiry.status === EnquiryStatus.TREATED) {
      enquiry.treatedAt = new Date();
      enquiry.treatedBy = new Types.ObjectId(user._id);
    } else {
      enquiry.treatedAt = undefined;
      enquiry.treatedBy = undefined;
    }

    await enquiry.save();

    return NextResponse.json({
      success: true,
      message:
        enquiry.status === EnquiryStatus.TREATED
          ? "Enquiry marked as treated."
          : "Enquiry reopened successfully.",
      data: enquiry,
    });
  } catch (error) {
    console.error("PATCH enquiry error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update enquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { response } = await authorizeEnquiryAdmin();
    if (response) return response;
    const { id } = await params;
    if (!isValidEnquiryId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid enquiry ID." },
        { status: 400 }
      );
    }
    await dbConnect();
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE enquiry error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete enquiry." },
      { status: 500 }
    );
  }
}
