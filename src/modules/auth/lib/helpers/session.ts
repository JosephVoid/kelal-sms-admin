import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { useraccounts } from "@/prisma/client";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
type Role = Pick<useraccounts, "role">;

export const cookieName = "session_token";

export async function createSession(userId: string, role: Role["role"]) {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  const _cookies = await cookies();
  _cookies.set(cookieName, token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<{
  userId: string;
  role: Role;
} | null> {
  const _cookies = await cookies();
  const cookie = _cookies.get(cookieName);

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie.value, secret);
    return { userId: payload.userId as string, role: payload.role as Role };
  } catch {
    return null;
  }
}
