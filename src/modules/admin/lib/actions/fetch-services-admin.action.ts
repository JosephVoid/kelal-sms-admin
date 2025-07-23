"use server";

import { getServicesAdmin } from "../db";

export default async function fetchServicesAdminAction() {
  return await getServicesAdmin();
}
