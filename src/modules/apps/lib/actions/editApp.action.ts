// app/actions/editAppAction.ts
"use server";

import { findUserAccount, findUserApp, updateApp } from "../db";
import { logToDb, paramsToArray } from "@/utils/action-logger";

export async function editAppAction({
  userId,
  appId,
  name,
}: {
  userId: string;
  appId: string;
  name: string;
}) {
  const requestTime = new Date();
  try {
    // Step 1: Find user's account
    const userAccount = await findUserAccount(userId);

    if (!userAccount) {
      return { success: false, error: "Account not found for user" };
    }

    // Step 2: Make sure the app belongs to this account
    const app = await findUserApp(appId, userAccount.accountId);

    if (!app) {
      return { success: false, error: "App not found or unauthorized" };
    }

    // Step 3: Update the app
    const updatedApp = await updateApp(app.id, name);
    // LOGGER ----
    await logToDb({
      actionName: "editAppAction",
      parameters: paramsToArray({
        userId,
        appId,
        name,
      }),
      logMessage: "App Edited Successfully",
      requestTime,
      response: { updatedApp },
    });

    return { success: true, app: updatedApp };
  } catch (error) {
    console.error("[editAppAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "editAppAction",
      parameters: paramsToArray({
        userId,
        appId,
        name,
      }),
      logMessage: "Failed to edit app",
      requestTime,
      response: { error: "Something went wrong" },
    });
    return { success: false, error: "Something went wrong" };
  }
}
