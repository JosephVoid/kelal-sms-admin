"use server";

import { revalidatePath } from "next/cache";
import { createApp, findUserAccount } from "../db";
import { ServerActionResponse } from "@/types/types";

export async function createAppAction(
  userId: string,
  name: string
): ServerActionResponse {
  try {
    // Step 1: Find the user's account
    const userAccount = await findUserAccount(userId);

    if (!userAccount) {
      return { success: false, error: "No account found for this user" };
    }

    // Step 2: Create the app
    const app = await createApp(userAccount.accountId, name);

    revalidatePath("/apps");
    return { success: true, app };
  } catch (error) {
    console.error("[createAppAction]", error);
    return { success: false, error: "Failed to create app" };
  }
}
