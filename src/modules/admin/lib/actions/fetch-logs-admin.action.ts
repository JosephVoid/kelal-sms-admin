"use server";

import { getLogsAdmin } from "../db";

export default async function fetchLogsAdminAction() {
  const response = await getLogsAdmin();
  return response.map((resp) => ({
    ...resp,
    request: JSON.stringify(resp.request),
    response: JSON.stringify(resp.response),
  }));
}
