"use server";

import { getUserAccount } from "../db";

export default async function fetchUserAccountAction(userId: string) {
  return await getUserAccount(userId);
}
