"use server";

import { logToDb, paramsToArray } from "@/utils/action-logger";
import { banAccount } from "../db";
import { revalidatePath } from "next/cache";

export async function banAccountAction({
  accountId,
  isBanned,
}: {
  accountId: string;
  isBanned: boolean;
}) {
  const requestTime = new Date();
  try {
    const updatedAccount = await banAccount(accountId, isBanned);
    // LOGGER ----
    await logToDb({
      actionName: "banAccountAction",
      parameters: paramsToArray({ accountId, isBanned }),
      logMessage: "Account ban status updated successfully",
      requestTime,
      response: { updatedAccount },
    });

    revalidatePath("/admin/accounts");
    return { success: true, account: updatedAccount };
  } catch (error) {
    console.error("[banAccountAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "banAccountAction",
      parameters: paramsToArray({ accountId, isBanned }),
      logMessage: "Failed to update account ban status",
      requestTime,
      response: { error: "Something went wrong" },
    });
    return { success: false, error: "Something went wrong" };
  }
}
