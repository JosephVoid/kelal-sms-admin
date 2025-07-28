"use server";

import { getTopupsAdmin } from "../db";

export default async function fetchTopupsAdminAction() {
  try {
    const topups = await getTopupsAdmin();
    return topups;
  } catch (error) {
    console.error(error);
    return [];
  }
}
