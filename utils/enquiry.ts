import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { getCurrentUser } from "@/utils/auth";


export async function authorizeEnquiryAdmin() {
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

export async function parseEnquiryBody(request: NextRequest) {
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

export function normalizeEnquiryEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) {
    return null;
  }

  return email;
}

export function normalizeEnquiryPhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone || digits.length < 7 || digits.length > 15) {
    return null;
  }

  return phone;
}

export function escapeEnquiryRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isValidEnquiryId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}

export function isEnquiryValidationError(error: unknown): boolean {
  return (
    error instanceof Error &&
    ["ValidationError", "CastError"].includes(error.name)
  );
}

export function getEnquiryValidationMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "errors" in error
  ) {
    const errors = Object.values(
      (error as { errors: Record<string, { message?: string }> }).errors
    );

    return errors
      .map((item) => item.message)
      .filter(Boolean)
      .join(" ");
  }

  return "Please check your enquiry details and try again.";
}