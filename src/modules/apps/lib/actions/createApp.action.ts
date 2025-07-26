"use server";

import { revalidatePath } from "next/cache";
import { createApp, findUserAccount } from "../db";
import { ServerActionResponse } from "@/types/types";
import { logToDb, paramsToArray } from "@/utils/action-logger";

export async function createAppAction(
  userId: string,
  name: string
): ServerActionResponse {
  const requestTime = new Date();
  try {
    // Step 1: Find the user's account
    const userAccount = await findUserAccount(userId);

    if (!userAccount) {
      return { success: false, error: "No account found for this user" };
    }

    // Step 2: Create the app
    const app = await createApp(userAccount.accountId, name);

    revalidatePath("/apps");
    // LOGGER ----
    await logToDb({
      actionName: "createAppAction",
      parameters: paramsToArray({
        userId,
        name,
      }),
      logMessage: "App Created Successfully",
      requestTime,
      response: { app },
    });
    return { success: true, app };
  } catch (error) {
    console.error("[createAppAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "createAppAction",
      parameters: paramsToArray({
        userId,
        name,
      }),
      logMessage: "Failed to create app",
      requestTime,
      response: { error: "Failed to create app" },
    });
    return { success: false, error: "Failed to create app" };
  }
}
