import { ServerActionResponse } from "@/types/types";
import { getLogsAdmin } from "../db";

export default async function fetchLogsAdminAction({
  page = 1,
  limit = 50,
}: {
  page?: number;
  limit?: number;
}): ServerActionResponse {
  try {
    const response = await getLogsAdmin(page, limit);
    return { success: true, data: response };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Fetch Failed" };
  }
}
