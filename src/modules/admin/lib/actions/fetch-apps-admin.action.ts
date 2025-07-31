"use server";
import { getAppsAdmin } from "../db";

export default async function fetchAppsAdminAction() {
  return await getAppsAdmin();
}
