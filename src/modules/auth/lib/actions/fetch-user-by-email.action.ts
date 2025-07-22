"use server";

import { getUserByEmail } from "../db";

export default async function FetchUserByEmailAction(email: string) {
  return await getUserByEmail(email);
}
