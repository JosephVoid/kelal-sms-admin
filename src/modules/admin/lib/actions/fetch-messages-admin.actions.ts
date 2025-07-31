"use server";
import { getMessagesAdmin } from "../db";

export default async function fetchMessagesAdminAction() {
  return await getMessagesAdmin();
}
