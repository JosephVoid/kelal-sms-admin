"use server";

import { getAccountApps } from "../db";

export default async function fetchAccountAppsAction(accountId: string) {
  return await getAccountApps(accountId);
}
