"use server";

import { getAccountsAdmin } from "../db";

export default async function fetchAccountsAdminAction() {
  return await getAccountsAdmin();
}
