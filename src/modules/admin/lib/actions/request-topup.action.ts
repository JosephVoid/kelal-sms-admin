"use server";

import { logToDb, paramsToArray } from "@/utils/action-logger";
import { revalidatePath } from "next/cache";
import { requestTopup } from "../db";

export async function requestTopupAction({
  accountId,
  amount,
  userName,
  txnId,
}: {
  accountId: string;
  amount: number;
  userName: string;
  txnId: string;
}) {
  const requestTime = new Date();
  try {
    const topupRequest = await requestTopup(accountId, amount, userName, txnId);
    // LOGGER ----
    await logToDb({
      actionName: "requestTopupAction",
      parameters: paramsToArray({ accountId, amount, userName, txnId }),
      logMessage: "Topup request created successfully",
      requestTime,
      response: { topupRequest },
    });

    revalidatePath("/admin/topups");
    return { success: true };
  } catch (error) {
    console.error("[requestTopupAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "requestTopupAction",
      parameters: paramsToArray({ accountId, amount, userName, txnId }),
      logMessage: "Failed to create topup request",
      requestTime,
      response: { error: "Something went wrong" },
    });
    return { success: false, error: "Something went wrong" };
  }
}
