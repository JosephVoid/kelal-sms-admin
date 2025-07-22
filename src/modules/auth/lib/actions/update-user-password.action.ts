"use server";

import { ServerActionResponse } from "@/types/types";
import { updateUserPassword } from "../db";
import { hash } from "bcryptjs";

export async function updatePasswordAction(
  email: string,
  newPassword: string
): ServerActionResponse {
  try {
    if (!email || !newPassword) {
      throw new Error("Missing userId or newPassword");
    }

    const hashed = await hash(newPassword, 10);
    await updateUserPassword(email, hashed);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "An Error Occured" };
  }
}
