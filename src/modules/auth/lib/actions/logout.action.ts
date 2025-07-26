"use server";

import { cookieName } from "../helpers/session";
import { ServerActionResponse } from "@/types/types";
import { logToDb } from "@/utils/action-logger";
import { cookies } from "next/headers";

export async function logoutAction(): ServerActionResponse {
  // LOGGING ----
  await logToDb({
    actionName: "logoutAction",
    parameters: [],
    logMessage: "Logged Out!",
    requestTime: new Date(),
    response: {},
  });
  const _cookies = await cookies();
  _cookies.set(cookieName, "");
  return { success: true };
}
