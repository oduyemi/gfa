import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Contact from "@/models/contact.model";
import { authorizeAdmin, isValidObjectId, parseRequestBody } from "@/utils/contact";


type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { response } = await authorizeAdmin();
    if (response) return response;
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid contact ID." },
        { status: 400 }
      );
    }
    await dbConnect();
    const contact = await Contact.findById(id)
      .populate("treatedBy", "fname lname email")
      .lean();

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("GET contact error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to retrieve contact." },
      { status: 500 }
    );
  }
}


export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { user, response } = await authorizeAdmin();
    if (response) return response;
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid contact ID." },
        { status: 400 }
      );
    }

    const body = await parseRequestBody(request);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const status = body.status;

    if (!["pending", "treated"].includes(status as string)) {
      return NextResponse.json(
        {
          success: false,
          message: "Status must be either pending or treated.",
        },
        { status: 400 }
      );
    }

    await dbConnect();
    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found." },
        { status: 404 }
      );
    }

    contact.status = status as "pending" | "treated";
    if (status === "treated") {
      contact.treatedAt = new Date();
      contact.treatedBy = user!._id;
    } else {
      contact.treatedAt = undefined;
      contact.treatedBy = undefined;
    }

    await contact.save();
    return NextResponse.json({
      success: true,
      message:
        status === "treated"
          ? "Contact marked as treated."
          : "Contact reopened successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("PATCH contact error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update contact." },
      { status: 500 }
    );
  }
}


export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { response } = await authorizeAdmin();
    if (response) return response;
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid contact ID." },
        { status: 400 }
      );
    }

    await dbConnect();
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE contact error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete contact." },
      { status: 500 }
    );
  }
}