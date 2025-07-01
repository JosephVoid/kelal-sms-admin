"use server";

import { setStatusColor } from "../../utils";
import { getMessageStatusDistribution } from "../db";

export async function fetchMsgStatusAction(appId: string) {
  const messageStatusCount = await getMessageStatusDistribution(appId);
  return messageStatusCount.map(({ status, count }) => ({
    status,
    count: Number(count),
    color: setStatusColor(status),
  }));
}
