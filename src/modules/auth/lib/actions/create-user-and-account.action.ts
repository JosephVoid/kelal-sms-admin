"use server";

import { logToDb, paramsToArray } from "@/utils/action-logger";
import { CreateUserInput } from "../../types";
import {
  createUser,
  createAccount,
  linkUserToAccount,
  getUserByEmail,
} from "../db";
import { createSession } from "../helpers/session";

export async function createUserAndAccount(input: CreateUserInput) {
  const requestTime = new Date();
  try {
    const exisitingUser = await getUserByEmail(input.email);

    if (exisitingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const user = await createUser({
      name: input.name,
      email: input.email,
      phone: input.phone,
      password: input.password,
    });

    const account = await createAccount(input.accountName);
    await linkUserToAccount(user.id, account.id);

    await createSession(user.id, "owner", account.id);

    // LOGGING ----
    // Exlude password logging
    const { password, ...otherInputs } = input;
    const { password: userPass, ...otherUserProps } = user;
    await logToDb({
      actionName: "createUserAndAccount",
      parameters: paramsToArray(otherInputs),
      logMessage: "User & Account Created Successfully",
      requestTime,
      response: { user: otherUserProps, account },
    });

    return { success: true, user, account };
  } catch (error) {
    console.error("Failed to create user & account:", error);
    return { success: false, message: "User or account creation failed" };
  }
}
