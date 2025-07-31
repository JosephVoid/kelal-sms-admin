// app/actions/getMessagesAction.ts
"use server";

import { getMessagesForAccount } from "../db";

export async function fetchAllMessagesAction(accountId?: string) {
  return await getMessagesForAccount(accountId ?? "");
}
