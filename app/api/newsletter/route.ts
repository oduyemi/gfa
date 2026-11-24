import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import MailingList from "@/models/mailinglist.model";
import { Types } from "mongoose";
import { getCurrentUser } from "@/utils/auth";


async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return null;
  }
  return user;
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
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit")) || 20)
    );
    const search = searchParams.get("search")?.trim() || "";

    const filter = search
      ? { email: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } }
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
      },
    });
  } catch (error) {
    console.error("Newsletter GET error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to retrieve subscribers." },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const email = typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await MailingList.create({ email });
    return NextResponse.json(
      {
        success: true,
        message: "You're on the list! Thanks for subscribing.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "This email address is already subscribed.",
        },
        { status: 409 }
      );
    }

    console.error("Newsletter POST error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to process your subscription." },
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

    await dbConnect();
    const { id, email } = await req.json();
    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "A valid subscriber ID is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const subscriber = await MailingList.findByIdAndUpdate(
      id,
      { email: normalizedEmail },
      { new: true, runValidators: true }
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
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { success: false, message: "That email is already subscribed." },
        { status: 409 }
      );
    }

    console.error("Newsletter PATCH error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update subscriber." },
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

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "A valid subscriber ID is required." },
        { status: 400 }
      );
    }

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
      { success: false, message: "Unable to remove subscriber." },
      { status: 500 }
    );
  }
}
