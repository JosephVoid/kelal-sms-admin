import { getSession } from "@/modules/auth/lib/helpers/session";
import { PrismaClient } from "@/prisma/client";

type LogInput = {
  actionName: string;
  parameters: string[];
  response?: any;
  logMessage?: string;
  verboseMessage?: string;
  requestTime?: Date;
};

const prisma = new PrismaClient();

export async function logToDb(data: LogInput) {
  const now = new Date();
  const session = await getSession();

  if (!session) return;

  const userRequest = `[${data.actionName}]: (${data.parameters.join(", ")})`;

  await prisma.logging.create({
    data: {
      id: crypto.randomUUID(),
      user_id: session.userId,
      source: "ADMIN",
      account_id: session.accountId ?? null,
      app_id: null,
      service_id: null,
      provider_id: null,
      message_id: null,
      user_request: userRequest ?? {},
      user_response: data.response ?? {},
      provider_request: {},
      provider_response: {},
      request_time: data.requestTime ?? now,
      response_time: now,
      log_message: data.logMessage,
      verbose_message: data.verboseMessage,
      created_at: now,
    },
  });
}

export function paramsToArray(params: Record<string, any>) {
  const paramArray = [];

  for (const key in params) {
    const value = params[key];
    const formatted =
      typeof value === "object" ? JSON.stringify(value) : String(value);

    paramArray.push(`${key} -> ${formatted}`);
  }

  return paramArray;
}
