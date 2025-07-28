"use server";

import { logToDb, paramsToArray } from "@/utils/action-logger";
import { approveTopup, denyTopup } from "../db";
import { revalidatePath } from "next/cache";
import { topupstatus } from "@/prisma/client";

export async function approveDenyTopupAction({
  topupId,
  status,
  accountId,
  amount,
}: {
  topupId: string;
  status: topupstatus;
  accountId: string;
  amount: number;
}) {
  const requestTime = new Date();
  try {
    if (status === "APPROVED") {
      const updatedTopup = await approveTopup(topupId, accountId, amount);
      // LOGGER ----
      await logToDb({
        actionName: "approveDenyTopupAction",
        parameters: paramsToArray({ topupId, status }),
        logMessage: "Topup approved successfully",
        requestTime,
        response: { updatedTopup },
      });
    } else {
      const updatedTopup = await denyTopup(topupId);
      // LOGGER ----
      await logToDb({
        actionName: "approveDenyTopupAction",
        parameters: paramsToArray({ topupId, status }),
        logMessage: "Topup denied successfully",
        requestTime,
        response: { updatedTopup },
      });
    }

    revalidatePath("/admin/topups");
    return { success: true };
  } catch (error) {
    console.error("[approveDenyTopupAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "approveDenyTopupAction",
      parameters: paramsToArray({ topupId, status }),
      logMessage: "Failed to process topup",
      requestTime,
      response: { error: "Something went wrong" },
    });
    return { success: false, error: "Something went wrong" };
  }
}
