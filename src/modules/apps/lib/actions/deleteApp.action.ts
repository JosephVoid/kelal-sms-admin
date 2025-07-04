"use server";

import { deleteAppById } from "../db";
import { revalidatePath } from "next/cache";

export async function deleteAppAction(appId: string) {
  try {
    await deleteAppById(appId);
    revalidatePath("/apps");
    return { success: true };
  } catch (error: any) {
    console.error("[deleteAppAction]", error);
    return { success: false, error: "Failed to delete app" };
  }
}
