"use server";

import { deleteKeyById } from "../db";
import { revalidatePath } from "next/cache";
import { logToDb, paramsToArray } from "@/utils/action-logger";

export async function deleteKeyAction(keyId: string) {
  const requestTime = new Date();
  try {
    await deleteKeyById(keyId);
    revalidatePath("/apps");
    // LOGGER ----
    await logToDb({
      actionName: "deleteKeyAction",
      parameters: paramsToArray({
        keyId,
      }),
      logMessage: "API Key Deleted Successfully",
      requestTime,
      response: { success: true },
    });
    return { success: true };
  } catch (error: any) {
    console.error("[deleteKeyAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "deleteKeyAction",
      parameters: paramsToArray({
        keyId,
      }),
      logMessage: "Failed to delete API key",
      requestTime,
      response: { error: "Failed to delete key" },
    });
    return { success: false, error: "Failed to delete key" };
  }
}
