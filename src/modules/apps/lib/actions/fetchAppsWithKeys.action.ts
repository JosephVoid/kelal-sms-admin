"use server";

import { getUserAppsWithKeys } from "../db";

export default async function fetchAppsWithKeysAction(userId: string) {
  const response = await getUserAppsWithKeys(userId);
  return response?.accounts.apps;
}
