"use server";

import { logToDb, paramsToArray } from "@/utils/action-logger";
import { updateAccountBalance } from "../db";
import { revalidatePath } from "next/cache";

export async function editAccountBalanceAction({
  accountId,
  balance,
}: {
  accountId: string;
  balance: number;
}) {
  const requestTime = new Date();
  try {
    const updatedAccount = await updateAccountBalance(accountId, balance);
    // LOGGER ----
    await logToDb({
      actionName: "editAccountBalanceAction",
      parameters: paramsToArray({ accountId, balance }),
      logMessage: "Account balance updated successfully",
      requestTime,
      response: { updatedAccount },
    });

    revalidatePath("/admin/accounts");
    return { success: true, account: updatedAccount };
  } catch (error) {
    console.error("[editAccountBalanceAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "editAccountBalanceAction",
      parameters: paramsToArray({ accountId, balance }),
      logMessage: "Failed to update account balance",
      requestTime,
      response: { error: "Something went wrong" },
    });
    return { success: false, error: "Something went wrong" };
  }
}
