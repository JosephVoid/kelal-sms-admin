// app/actions/editAppAction.ts
"use server";

import { findUserAccount, findUserApp, updateApp } from "../db";

export async function editAppAction({
  userId,
  appId,
  name,
}: {
  userId: string;
  appId: string;
  name: string;
}) {
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

    return { success: true, app: updatedApp };
  } catch (error) {
    console.error("[editAppAction]", error);
    return { success: false, error: "Something went wrong" };
  }
}
