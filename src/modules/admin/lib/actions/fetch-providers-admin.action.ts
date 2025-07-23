"use server";

import { getProvidersAdmin } from "../db";

export default async function fetchProvidersAdminAction() {
  const response = await getProvidersAdmin();
  return response.map((resp) => ({
    ...resp,
    bodySchema: JSON.stringify(resp.bodySchema),
    headers: JSON.stringify(resp.headers),
  }));
}
