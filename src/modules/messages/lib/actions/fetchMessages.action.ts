// app/actions/getMessagesAction.ts
"use server";

import { getMessagesForAccount } from "../db";

export async function fetchAllMessagesAction(accountId: string) {
  try {
    const messages = await getMessagesForAccount(accountId);
    return { success: true, data: messages };
  } catch (error: any) {
    console.error("[getMessagesAction]", error);
    return { success: false, error: "Failed to fetch messages" };
  }
}
