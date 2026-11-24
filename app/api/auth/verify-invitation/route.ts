import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import AdminInvitation from "@/models/adminInvitation.model";
import { compareSecret, hashSetupToken, MAX_OTP_ATTEMPTS } from "@/utils/admin-invitation";


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const setupToken = req.cookies.get("admin_setup")?.value;
    if (!setupToken) {
      return NextResponse.json(
        { error: "Setup session is missing or expired." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const otp =
      typeof body.otp === "string"
        ? body.otp.trim()
        : "";

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { error: "Please enter a valid 6-character code." },
        { status: 400 }
      );
    }

    const setupTokenHash = hashSetupToken(setupToken);
    const invitation = await AdminInvitation.findOne({
      setupTokenHash,
      setupExpiresAt: { $gt: new Date() },
      expiresAt: { $gt: new Date() },
      verifiedAt: null,
    }).select("+invitationOtpHash");

    if (!invitation) {
      return NextResponse.json(
        { error: "Setup session expired or invalid." },
        { status: 401 }
      );
    }

    if (invitation.attempts >= MAX_OTP_ATTEMPTS) {
      await AdminInvitation.deleteOne({
        _id: invitation._id,
      });

      return NextResponse.json(
        { error: "Too many verification attempts. Please request a new invitation." },
        { status: 429 }
      );
    }

    const isValid = await compareSecret(
      otp,
      invitation.invitationOtpHash
    );
    if (!isValid) {
      const updated =
        await AdminInvitation.findOneAndUpdate(
          {
            _id: invitation._id,
            verifiedAt: null,
            attempts: { $lt: MAX_OTP_ATTEMPTS },
          },
          {
            $inc: { attempts: 1 },
          },
          { new: true }
        );

      if (updated && updated.attempts >= MAX_OTP_ATTEMPTS) {
        await AdminInvitation.deleteOne({
          _id: invitation._id,
        });
      }

      return NextResponse.json(
        {
          error: "Invalid verification code.",
          remainingAttempts: Math.max(
            0,
            MAX_OTP_ATTEMPTS - (updated?.attempts ?? MAX_OTP_ATTEMPTS)
          ),
        },
        { status: 400 }
      );
    }

    const verifiedInvitation =
      await AdminInvitation.findOneAndUpdate(
        {
          _id: invitation._id,
          setupTokenHash,
          verifiedAt: null,
          attempts: { $lt: MAX_OTP_ATTEMPTS },
          expiresAt: { $gt: new Date() },
          setupExpiresAt: { $gt: new Date() },
        },
        {
          $set: { verifiedAt: new Date() },
        },
        { new: true }
      );

    if (!verifiedInvitation) {
      return NextResponse.json(
        { error: "Invitation could not be verified. Please start again." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      message: "Invitation verified. You may now set your password.",
    });
  } catch (error) {
    console.error("VERIFY INVITATION ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
