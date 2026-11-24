import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { createHash } from "crypto";


const BCRYPT_ROUNDS = 12;
const hashResetToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const confirmPassword = typeof body.confirmPassword === "string"
        ? body.confirmPassword
        : "";

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
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

    const resetTokenHash = hashResetToken(token);
    const user = await User.findOne({
      role: "admin",
      passwordResetTokenHash: resetTokenHash,
      passwordResetExpiresAt: { $gt: new Date() },
    }).select("+passwordResetTokenHash +passwordResetExpiresAt");

    if (!user) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      BCRYPT_ROUNDS
    );

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
        passwordResetTokenHash: resetTokenHash,
        passwordResetExpiresAt: { $gt: new Date() },
      },
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          passwordResetTokenHash: 1,
          passwordResetExpiresAt: 1,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "This reset link is invalid or has already been used." },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message:
        "Your password has been reset successfully. Please log in with your new password.",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    response.cookies.set("admin_setup", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("COMPLETE PASSWORD RESET ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}