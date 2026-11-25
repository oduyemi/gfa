import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import AdminInvitation from "@/models/adminInvitation.model";
import { hashSetupToken, INVITATION_TTL_MINUTES } from "@/utils/admin-invitation";


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json().catch(() => null);
    const token = typeof body?.token === "string" ? body.token.trim() : "";
    if (!token || token.length !== 64) {
      return NextResponse.json(
        { error: "Invalid or missing activation link." },
        { status: 400 }
      );
    }

    const setupTokenHash = hashSetupToken(token);
    const invitation = await AdminInvitation.findOne({
      setupTokenHash,
      setupExpiresAt: { $gt: new Date() },
      expiresAt: { $gt: new Date() },
      verifiedAt: null,
    }).select("_id");

    if (!invitation) {
      return NextResponse.json(
        { error: "Activation link is invalid or has expired." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Activation session started.",
    });

    response.cookies.set("admin_setup", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth",
        maxAge: INVITATION_TTL_MINUTES * 60,
    });
    return response;
  } catch (error) {
    console.error("START SETUP ERROR:", error);

    return NextResponse.json(
      { error: "Unable to start account activation." },
      { status: 500 }
    );
  }
}