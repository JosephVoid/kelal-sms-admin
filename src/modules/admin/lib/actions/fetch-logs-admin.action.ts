"use server";

import { getLogsAdmin } from "../db";

export default async function fetchLogsAdminAction() {
  const response = await getLogsAdmin();
  return response.map((resp) => ({
    ...resp,
    accounts: resp.accounts?.name ?? null,
    users: resp.users?.fullName ?? null,
    providers: resp.providers?.name ?? null,
    services: resp.services?.name ?? null,
    apps: resp.apps?.name ?? null,
    user_request: JSON.stringify(resp.user_request),
    user_response: JSON.stringify(resp.user_response),
    provider_request: JSON.stringify(resp.provider_request),
    provider_response: JSON.stringify(resp.provider_response),
  }));
}
