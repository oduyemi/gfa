import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { getCurrentUser } from "@/utils/auth";

export function normalizeContactEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (
    email.length > 254 ||
    !/^\S+@\S+\.\S+$/.test(email)
  ) {
    return null;
  }
  return email;
}

export function validateContactPhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const phone = value.trim();
  if (!/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/.test(phone)) {
    return null;
  }
  return phone;
}

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isValidObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

export async function authorizeAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      ),
    };
  }

  if (user.role !== "admin") {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "Access denied." },
        { status: 403 }
      ),
    };
  }

  return { user, response: null };
}

export async function parseRequestBody(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return null;
    }
    return body as Record<string, unknown>;
  } catch {
    return null;
  }
}