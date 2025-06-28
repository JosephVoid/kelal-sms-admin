"use server";

import { cookieName } from "../helpers/session";
import { ServerActionResponse } from "@/types/types";
import { cookies } from "next/headers";

export async function logoutAction(): ServerActionResponse {
  const _cookies = await cookies();
  _cookies.set(cookieName, "");
  return { success: true };
}
