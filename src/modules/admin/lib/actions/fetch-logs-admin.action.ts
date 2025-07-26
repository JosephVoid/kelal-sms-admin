"use server";

import { getLogsAdmin } from "../db";

export default async function fetchLogsAdminAction() {
  const response = await getLogsAdmin();
  return response.map((resp) => ({
    ...resp,
    user_request: JSON.stringify(resp.user_request),
    user_response: JSON.stringify(resp.user_response),
    provider_request: JSON.stringify(resp.provider_request),
    provider_response: JSON.stringify(resp.provider_response),
  }));
}
