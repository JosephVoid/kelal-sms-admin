"use server";

import { getMessagesTimeSeries } from "../db";
import { startOfDay } from "date-fns";

export async function fetchMsgTimeAction(appId: string) {
  const messageCount = await getMessagesTimeSeries(appId);

  return messageCount.map(({ day, count }) => ({
    day: startOfDay(new Date(day)),
    count: Number(count),
  }));
}
