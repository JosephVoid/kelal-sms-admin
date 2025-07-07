"use server";

import { getAccountApps } from "../db";

export default async function fetchAccountAppsAction(
  accountId: string | string[]
) {
  return (await getAccountApps(accountId)) ?? [];
}
