
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "@/models/user.model";

export type Role = "user" | "admin";

export interface AuthUser {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  role: Role;
  image: string | null;
  imagePublicId: string | null;
  firstLogin: boolean;
  lastLogin: Date | null;
}

interface TokenPayload extends JwtPayload {
  userId: string;
  role: Role;
}

const AUTH_COOKIE = "token";
const JWT_ISSUER = "admin-portal";
const JWT_AUDIENCE = "admin-users";
const TOKEN_EXPIRES_IN = "7d";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

const isValidRole = (value: unknown): value is Role =>
  value === "user" || value === "admin";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured and at least 32 characters long."
    );
  }

  return secret;
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const serializeUser = (user: any): AuthUser => ({
  _id: user._id.toString(),
  fname: user.fname,
  lname: user.lname,
  email: user.email,
  phone: user.phone,
  role: user.role,
  image: user.image ?? null,
  imagePublicId: user.imagePublicId ?? null,
  firstLogin: user.firstLogin,
  lastLogin: user.lastLogin ?? null,
});

export const createToken = (user: {
  _id: unknown;
  role: Role;
}): string => {
  return jwt.sign(
    {
      userId: String(user._id),
      role: user.role,
    },
    getJwtSecret(),
    {
      algorithm: "HS256",
      expiresIn: TOKEN_EXPIRES_IN,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, getJwtSecret(), {
      algorithms: ["HS256"],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      !decoded.userId ||
      !isValidRole(decoded.role)
    ) {
      return null;
    }

    return decoded as TokenPayload;
  } catch {
    return null;
  }
};

/**
 * Reads the authentication token from an explicit request when available.
 * Falls back to Next.js request APIs for Server Components and other
 * request-bound server contexts.
 */
const getToken = async (request?: Request): Promise<string | null> => {
  if (request) {
    const authorization = request.headers.get("authorization");

    if (authorization?.startsWith("Bearer ")) {
      const bearerToken = authorization.slice(7).trim();

      if (bearerToken) return bearerToken;
    }

    const cookieHeader = request.headers.get("cookie");

    if (!cookieHeader) return null;

    const tokenCookie = cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${AUTH_COOKIE}=`));

    if (!tokenCookie) return null;

    const value = tokenCookie.slice(AUTH_COOKIE.length + 1);

    try {
      return decodeURIComponent(value) || null;
    } catch {
      return value || null;
    }
  }

  // Used by Server Components and other request-bound server contexts.
  const headerList = await headers();
  const authorization = headerList.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    const bearerToken = authorization.slice(7).trim();

    if (bearerToken) return bearerToken;
  }

  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value ?? null;
};

export const getCurrentUser = async (
  request?: Request
): Promise<AuthUser | null> => {
  const token = await getToken(request);

  if (!token) return null;

  const decoded = verifyToken(token);

  if (!decoded) return null;

  const user = await User.findById(decoded.userId)
    .select("-password")
    .lean();

  if (!user || !isValidRole(user.role)) {
    return null;
  }

  return serializeUser(user);
};

export const requireRole = (
  user: AuthUser | null,
  roles: Role[]
): NextResponse | null => {
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  if (!roles.includes(user.role)) {
    return NextResponse.json(
      { error: "You do not have permission to access this resource." },
      { status: 403 }
    );
  }

  return null;
};

export async function handleLogin(
  req: Request,
  allowedRole: Role
) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (
      email.length > 254 ||
      password.length > 128 ||
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    if (user.role !== allowedRole) {
      return NextResponse.json(
        { error: "You are not authorized to access this portal." },
        { status: 403 }
      );
    }

    if (!isValidRole(user.role)) {
      return NextResponse.json(
        { error: "Invalid account permissions." },
        { status: 403 }
      );
    }

    const lastLogin = new Date();

    await User.updateOne(
      { _id: user._id },
      { $set: { lastLogin } }
    );

    user.lastLogin = lastLogin;

    const token = createToken({
      _id: user._id,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: serializeUser(user),
      firstLogin: user.firstLogin,
    });

    response.cookies.set(AUTH_COOKIE, token, {
      ...cookieOptions,
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch (error) {
    console.error("Authentication error:", error);

    return NextResponse.json(
      { error: "Unable to process your request at this time." },
      { status: 500 }
    );
  }
}

export const handleLogout = async () => {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  response.cookies.set(AUTH_COOKIE, "", {
    ...cookieOptions,
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
};
