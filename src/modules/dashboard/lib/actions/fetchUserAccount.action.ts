"use server";

import { getUserAccounts } from "../db";

export default async function fetchUserAccountAction(userId: string) {
  return (await getUserAccounts(userId)) ?? [];
}
