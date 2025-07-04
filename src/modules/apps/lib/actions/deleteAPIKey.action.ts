"use server";

import { deleteKeyById } from "../db";
import { revalidatePath } from "next/cache";

export async function deleteKeyAction(keyId: string) {
  try {
    await deleteKeyById(keyId);
    revalidatePath("/apps");
    return { success: true };
  } catch (error: any) {
    console.error("[deleteKeyAction]", error);
    return { success: false, error: "Failed to delete key" };
  }
}
