import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { dbConnect } from "@/utils/db";
import { getCurrentUser, requireRole } from "@/utils/auth";



export async function GET(request: Request) {
  try {
    await dbConnect();
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const roleError = requireRole(currentUser, ["admin"]);
    if (roleError) return roleError;
    const admins = await User.find({ role: "admin" })
      .select(
        "fname lname email phone role image firstLogin lastLogin createdAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin error:", error);

    return NextResponse.json(
      { error: "Failed to fetch administrators" },
      { status: 500 }
    );
  }
}
