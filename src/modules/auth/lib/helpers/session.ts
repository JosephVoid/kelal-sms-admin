import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
export const cookieName = "session_token";

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
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

export async function getSession() {
  const _cookies = await cookies();
  const cookie = _cookies.get(cookieName);

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie.value, secret);
    return payload.userId as string;
  } catch {
    return null;
  }
}
