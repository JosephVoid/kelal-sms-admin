"use server";

import { logToDb, paramsToArray } from "@/utils/action-logger";
import { revalidatePath } from "next/cache";
import { requestTopup } from "../db";

export async function requestTopupAction({
  accountId,
  amount,
}: {
  accountId: string;
  amount: number;
}) {
  const requestTime = new Date();
  try {
    const topupRequest = await requestTopup(accountId, amount);
    // LOGGER ----
    await logToDb({
      actionName: "requestTopupAction",
      parameters: paramsToArray({ accountId, amount }),
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
      parameters: paramsToArray({ accountId, amount }),
      logMessage: "Failed to create topup request",
      requestTime,
      response: { error: "Something went wrong" },
    });
    return { success: false, error: "Something went wrong" };
  }
}
