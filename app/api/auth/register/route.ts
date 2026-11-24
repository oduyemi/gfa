import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import { getCurrentUser, requireRole } from "@/utils/auth";
import AdminInvitation from "@/models/adminInvitation.model";
import User from "@/models/user.model";
import {
  generateInvitationOtp,
  generateTemporaryPassword,
  hashSecret,
  getExpiration,
  INVITATION_TTL_MINUTES,
} from "@/utils/admin-invitation";
import { sendAdminInvitationMail } from "@/helper/sendOnboardingMail";



export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const currentUser = await getCurrentUser();
    const authorizationError = requireRole(currentUser, ["admin"]);
    if (authorizationError) return authorizationError;
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { fname, lname, email, phone } = body;
    if (
      typeof fname !== "string" ||
      typeof lname !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string"
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const normalizedFname = fname.trim();
    const normalizedLname = lname.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    if (
      !normalizedFname ||
      !normalizedLname ||
      !normalizedEmail ||
      !normalizedPhone
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (
      normalizedFname.length > 100 ||
      normalizedLname.length > 100 ||
      normalizedEmail.length > 254 ||
      normalizedPhone.length > 20
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the allowed length." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phoneRegex.test(normalizedPhone)) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    }).lean();

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const temporaryPassword = generateTemporaryPassword();
    const invitationOtp = generateInvitationOtp();
    const [temporaryPasswordHash, invitationOtpHash] = await Promise.all([hashSecret(temporaryPassword), hashSecret(invitationOtp)]);
    const expiresAt = getExpiration(INVITATION_TTL_MINUTES);
    await AdminInvitation.deleteOne({email: normalizedEmail});
    const invitation = await AdminInvitation.create({
      fname: normalizedFname,
      lname: normalizedLname,
      email: normalizedEmail,
      phone: normalizedPhone,
      role: "admin",
      temporaryPasswordHash,
      invitationOtpHash,
      expiresAt,
      attempts: 0,
      setupTokenHash: null,
      setupExpiresAt: null,
      verifiedAt: null,
      createdBy: currentUser._id,
    });

    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`;
    try {
      await sendAdminInvitationMail(
        normalizedEmail,
        temporaryPassword,
        invitationOtp,
        loginUrl,
        INVITATION_TTL_MINUTES
      );
    } catch (emailError) {
      console.error("ADMIN INVITATION EMAIL ERROR:", emailError);

      await AdminInvitation.deleteOne({
        _id: invitation._id,
      });

      return NextResponse.json(
        {
          error:
            "Invitation was created, but the email could not be delivered. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin invitation created and email sent successfully.",
        invitation: {
          id: invitation._id,
          email: invitation.email,
          expiresAt: invitation.expiresAt,
          expiresInMinutes: INVITATION_TTL_MINUTES,
        },
        ...(process.env.NODE_ENV !== "production" && {
          developmentCredentials: {
            temporaryPassword,
            invitationOtp,
          },
        }),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("ADMIN INVITATION ERROR:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        { error: "An account or invitation already exists for this email." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
