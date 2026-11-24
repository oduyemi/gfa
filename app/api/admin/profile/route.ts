import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import User from "@/models/user.model";
import { getCurrentUser, requireRole } from "@/utils/auth";


const PROFILE_FIELDS = ["fname", "lname", "phone"] as const;
type ProfileField = (typeof PROFILE_FIELDS)[number];


const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return (
    /^[+]?[\d\s()-]+$/.test(phone) &&
    digits.length >= 7 &&
    digits.length <= 15
  );
};


export async function GET() {
  try {
    await dbConnect();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const roleError = requireRole(currentUser, ["admin"]);
    if (roleError) return roleError;
    const profile = await User.findById(currentUser._id)
      .select(
        "fname lname email phone role image imagePublicId firstLogin lastLogin createdAt updatedAt"
      )
      .lean();

    if (!profile) {
      return NextResponse.json(
        { error: "Admin profile not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/profile error:", error);

    return NextResponse.json(
      { error: "Failed to fetch admin profile" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const roleError = requireRole(currentUser, ["admin"]);
    if (roleError) return roleError;
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 }
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const invalidFields = Object.keys(body).filter(
      (field) => !PROFILE_FIELDS.includes(field as ProfileField)
    );

    if (invalidFields.length > 0) {
      return NextResponse.json(
        {
          error: "Unsupported profile fields",
          fields: invalidFields,
        },
        { status: 400 }
      );
    }

    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "No profile fields provided" },
        { status: 400 }
      );
    }

    const updates: Partial<Record<ProfileField, string>> = {};
    if ("fname" in body) {
      if (typeof body.fname !== "string") {
        return NextResponse.json(
          { error: "First name must be a string" },
          { status: 400 }
        );
      }

      const fname = body.fname.trim();

      if (fname.length < 2 || fname.length > 50) {
        return NextResponse.json(
          { error: "First name must be between 2 and 50 characters" },
          { status: 400 }
        );
      }

      updates.fname = fname;
    }

    if ("lname" in body) {
      if (typeof body.lname !== "string") {
        return NextResponse.json(
          { error: "Last name must be a string" },
          { status: 400 }
        );
      }

      const lname = body.lname.trim();

      if (lname.length < 2 || lname.length > 50) {
        return NextResponse.json(
          { error: "Last name must be between 2 and 50 characters" },
          { status: 400 }
        );
      }

      updates.lname = lname;
    }

    if ("phone" in body) {
      if (typeof body.phone !== "string") {
        return NextResponse.json(
          { error: "Phone number must be a string" },
          { status: 400 }
        );
      }

      const phone = body.phone.trim();
      if (!isValidPhone(phone)) {
        return NextResponse.json(
          { error: "Please provide a valid phone number" },
          { status: 400 }
        );
      }

      const existingPhone = await User.findOne({
        phone,
        _id: { $ne: currentUser._id },
      })
        .select("_id")
        .lean();

      if (existingPhone) {
        return NextResponse.json(
          { error: "Phone number is already in use" },
          { status: 409 }
        );
      }

      updates.phone = phone;
    }

    const updatedProfile = await User.findByIdAndUpdate(
      currentUser._id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    )
      .select(
        "fname lname email phone role image imagePublicId firstLogin lastLogin createdAt updatedAt"
      )
      .lean();

    if (!updatedProfile) {
      return NextResponse.json(
        { error: "Admin profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedProfile,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: "Phone number is already in use" },
        { status: 409 }
      );
    }

    console.error("PATCH /api/admin/profile error:", error);

    return NextResponse.json(
      { error: "Failed to update admin profile" },
      { status: 500 }
    );
  }
}
