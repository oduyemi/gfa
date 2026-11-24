import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import { getCurrentUser, requireRole } from "@/utils/auth";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";


const BCRYPT_ROUNDS = 12;


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
    const currentPassword =
      typeof body.currentPassword === "string"
        ? body.currentPassword
        : "";

    const newPassword =
      typeof body.newPassword === "string"
        ? body.newPassword
        : "";

    const confirmPassword =
      typeof body.confirmPassword === "string"
        ? body.confirmPassword
        : "";

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New passwords do not match." },
        { status: 400 }
      );
    }

    if (newPassword.length < 12 || newPassword.length > 128) {
      return NextResponse.json(
        { error: "New password must be between 12 and 128 characters." },
        { status: 400 }
      );
    }

    const user = await User.findById(currentUser._id).select("+password");
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Unable to verify account credentials." },
        { status: 401 }
      );
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Your current password is incorrect." },
        { status: 400 }
      );
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return NextResponse.json(
        {
          error:
            "Your new password must be different from your current password.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      BCRYPT_ROUNDS
    );

    user.password = hashedPassword;
    await user.save();
    const response = NextResponse.json({
      success: true,
      message:
        "Your password has been updated successfully. Please log in again.",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("UPDATE PASSWORD ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
