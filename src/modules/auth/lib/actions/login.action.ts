"use server";

import { getUserByEmail } from "../db/user";
import { createSession } from "../helpers/session";
import bcrypt from "bcryptjs";

export async function loginAction(formData: FormData): Promise<{
  error?: string;
  success: boolean;
  user?: Awaited<ReturnType<typeof getUserByEmail>>;
}> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required.", success: false };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "Invalid credentials.", success: false };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: "Invalid credentials.", success: false };
  }

  await createSession(
    user.id,
    user.useraccounts[0].role,
    user.useraccounts[0].accountId
  );

  return { success: true, user: user };
}
