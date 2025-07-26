"use server";

import { randomUUID } from "crypto"; // for generating a unique key ID
import bcrypt from "bcryptjs"; // hash the key for storage
import { createKey } from "../db";
import { logToDb, paramsToArray } from "@/utils/action-logger";

export async function createApiKeyAction({
  appId,
  name,
  expiresOn,
}: {
  appId: string;
  name: string;
  expiresOn: Date;
}) {
  const requestTime = new Date();
  try {
    const rawKey = randomUUID(); // or use nanoid()
    const keyHash = await bcrypt.hash(rawKey, 10);

    const key = await createKey(appId, name, keyHash, expiresOn);

    // LOGGER ----
    await logToDb({
      actionName: "createApiKeyAction",
      parameters: paramsToArray({
        appId,
        name,
        expiresOn,
      }),
      logMessage: "API Key Created Successfully",
      requestTime,
      response: { keyId: key.id },
    });

    return { success: true, keyId: key.id, rawKey }; // return rawKey to show user once
  } catch (error) {
    console.error("[createApiKeyAction]", error);
    // LOGGER ----
    await logToDb({
      actionName: "createApiKeyAction",
      parameters: paramsToArray({
        appId,
        name,
        expiresOn,
      }),
      logMessage: "Failed to create API key",
      requestTime,
      response: { error: "Failed to create API key" },
    });
    return { success: false, error: "Failed to create API key" };
  }
}
