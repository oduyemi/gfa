import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import User from "@/models/user.model";
import { randomBytes, createHash } from "crypto";
import { sendPasswordResetMail } from "@/helper/sendPasswordResetMail";

const RESET_TOKEN_TTL_MINUTES = 15;
const hashResetToken = (token: string) => createHash("sha256").update(token).digest("hex");


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const genericResponse = NextResponse.json({
      success: true,
      message:
        "If an account exists with that email, a password reset link has been sent.",
    });

    const user = await User.findOne({
      email,
      role: "admin",
    });

    if (!user) return genericResponse;
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenHash = hashResetToken(resetToken);
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);
    user.passwordResetTokenHash = resetTokenHash;
    user.passwordResetExpiresAt = expiresAt;
    await user.save();
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    try {
      await sendPasswordResetMail(
        user.email,
        user.fname,
        resetUrl,
        RESET_TOKEN_TTL_MINUTES
      );
    } catch (emailError) {
      console.error("PASSWORD RESET EMAIL ERROR:", emailError);
      await User.updateOne(
        {
          _id: user._id,
          passwordResetTokenHash: resetTokenHash,
        },
        {
          $unset: {
            passwordResetTokenHash: 1,
            passwordResetExpiresAt: 1,
          },
        }
      );
    }

    return genericResponse;
  } catch (error) {
    console.error("RESET PASSWORD REQUEST ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to process your request at this time.",
      },
      { status: 500 }
    );
  }
}