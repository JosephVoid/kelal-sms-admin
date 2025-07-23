"use server";

import { getUsersAdmin } from "../db";

export default async function fetchUsersAdminAction() {
  const response = await getUsersAdmin();
  return response
    .map((resp) => ({
      ...resp,
      account: resp.useraccounts[0].accounts.name,
    }))
    .map((resp: Partial<(typeof response)[0]>) => {
      delete resp.useraccounts;
      return resp;
    });
}
