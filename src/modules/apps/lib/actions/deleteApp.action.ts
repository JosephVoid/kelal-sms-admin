"use server";

import { deleteAppById } from "../db";
import { revalidatePath } from "next/cache";
import { logToDb, paramsToArray } from "@/utils/action-logger";

export async function deleteAppAction(appId: string) {
  const requestTime = new Date();
  try {
    await deleteAppById(appId);
    revalidatePath("/apps");
    // LOGGER ----
    await logToDb({
      actionName: "deleteAppAction",
      parameters: paramsToArray({
        appId,
      }),
      logMessage: "App Deleted Successfully",
      requestTime,
      response: { success: true },
    });
    return { success: true };
  } catch (error: any) {
    console.error("[deleteAppAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "deleteAppAction",
      parameters: paramsToArray({
        appId,
      }),
      logMessage: "Failed to delete app",
      requestTime,
      response: { error: "Failed to delete app" },
    });
    return { success: false, error: "Failed to delete app" };
  }
}
