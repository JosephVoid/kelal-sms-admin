"use server";

import type { useraccounts } from "@/prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

type Role = Pick<useraccounts, "role">;
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getSessionServerActions(): Promise<{
  userId: string;
  role: Role["role"];
  accountId?: string;
} | null> {
  const _cookies = await cookies();
  const cookie = _cookies.get("session_token");

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie.value, secret);
    return {
      userId: payload.userId as string,
      role: payload.role as Role["role"],
      accountId: (payload?.accountId as string) ?? null,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}
