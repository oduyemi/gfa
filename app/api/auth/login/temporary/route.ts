import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import AdminInvitation from "@/models/adminInvitation.model";
import {compareSecret, generateSetupToken, hashSetupToken, getExpiration, SETUP_SESSION_MINUTES} from "@/utils/admin-invitation";


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and temporary password are required." },
        { status: 400 }
      );
    }

    const invitation = await AdminInvitation.findOne({
      email,
      expiresAt: { $gt: new Date() },
    }).select("+temporaryPasswordHash");
    if (!invitation || !invitation.temporaryPasswordHash) {
      return NextResponse.json(
        { error: "Invalid or expired invitation." },
        { status: 401 }
      );
    }

    if (invitation.verifiedAt) {
      return NextResponse.json(
        { error: "Account setup has already been completed." },
        { status: 401 }
      );
    }

    const isValid = await compareSecret(
      password,
      invitation.temporaryPasswordHash
    );
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired invitation." },
        { status: 401 }
      );
    }

    const setupToken = generateSetupToken();
    const setupTokenHash = hashSetupToken(setupToken);
    const setupExpiresAt = getExpiration(
      SETUP_SESSION_MINUTES
    );

    const updatedInvitation =
      await AdminInvitation.findOneAndUpdate(
        {
          _id: invitation._id,
          temporaryPasswordHash:
            invitation.temporaryPasswordHash,
          verifiedAt: null,
          expiresAt: { $gt: new Date() },
        },
        {
          $set: {
            temporaryPasswordHash: null,
            setupTokenHash,
            setupExpiresAt,
          },
        },
        { new: true }
      );

    if (!updatedInvitation) {
      return NextResponse.json(
        { error: "This temporary password has already been used." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      requiresSetup: true,
      message: "Temporary login successful. Complete your account setup.",
      user: {
        fname: invitation.fname,
        lname: invitation.lname,
        email: invitation.email,
        role: invitation.role,
      },
      setupExpiresAt,
    });

    response.cookies.set("admin_setup", setupToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      expires: setupExpiresAt,
    });

    return response;
  } catch (error) {
    console.error("TEMPORARY LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
