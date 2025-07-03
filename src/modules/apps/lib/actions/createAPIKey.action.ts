"use server";

import { randomUUID } from "crypto"; // for generating a unique key ID
import bcrypt from "bcryptjs"; // hash the key for storage
import { createKey } from "../db";

export async function createApiKeyAction({
  appId,
  name,
  expiresOn,
}: {
  appId: string;
  name: string;
  expiresOn: Date;
}) {
  try {
    const rawKey = randomUUID(); // or use nanoid()
    const keyHash = await bcrypt.hash(rawKey, 10);

    const key = await createKey(appId, name, keyHash, expiresOn);

    return { success: true, keyId: key.id, rawKey }; // return rawKey to show user once
  } catch (error) {
    console.error("[createApiKeyAction]", error);
    return { success: false, error: "Failed to create API key" };
  }
}
