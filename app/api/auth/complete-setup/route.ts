import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import AdminInvitation from "@/models/adminInvitation.model";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { hashSetupToken, BCRYPT_ROUNDS } from "@/utils/admin-invitation";
import { sendAdminOnboardingMail } from "@/helper/sendOnboardingMail";



export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const setupToken = req.cookies.get("admin_setup")?.value;
    if (!setupToken) {
      return NextResponse.json(
        { error: "Setup session missing or expired." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const confirmPassword =
      typeof body.confirmPassword === "string"
        ? body.confirmPassword
        : "";

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: "Both password fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (password.length < 12 || password.length > 128) {
      return NextResponse.json(
        { error: "Password must be between 12 and 128 characters." },
        { status: 400 }
      );
    }

    const setupTokenHash = hashSetupToken(setupToken);
    const invitation = await AdminInvitation.findOne({
      setupTokenHash,
      verifiedAt: { $ne: null },
      setupExpiresAt: { $gt: new Date() },
      expiresAt: { $gt: new Date() },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation is invalid or has expired." },
        { status: 401 }
      );
    }

    const existingUser = await User.findOne({
      email: invitation.email,
    }).lean();

    if (existingUser) {
      await AdminInvitation.deleteOne({
        _id: invitation._id,
      });

      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const newUser = await User.create({
      fname: invitation.fname,
      lname: invitation.lname,
      email: invitation.email,
      phone: invitation.phone,
      password: hashedPassword,
      role: "admin",
      firstLogin: false,
      lastLogin: new Date(),
    });

    await AdminInvitation.deleteOne({
      _id: invitation._id,
    });

    try {
      await sendAdminOnboardingMail(
        newUser.email,
        newUser.fname
      );
    } catch (emailError) {
      console.error(
        "ADMIN ONBOARDING EMAIL ERROR:",
        emailError
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Your admin account has been activated successfully.",
      user: {
        _id: newUser._id,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });

    response.cookies.set("admin_setup", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    console.error("COMPLETE SETUP ERROR:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          error: "An account with this email or phone already exists.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
