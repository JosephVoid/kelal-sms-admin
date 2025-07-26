import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "@/prisma/client"; // Adjust this path to match your project structure
import { getSession } from "@/modules/auth/lib/helpers/session";

type LogInput = {
  actionName: string;
  parameters: string[];
  response?: any;
  logMessage?: string;
  verboseMessage?: string;
  requestTime?: Date;
};

export async function logToDb(data: LogInput, client?: PrismaClient) {
  const now = new Date();
  const db = client || prisma;

  const session = await getSession();

  if (!session) return;

  const userRequest = `[${data.actionName}]: (${data.parameters.map((param) => JSON.stringify(param)).join(", ")})`;

  await db.logging.create({
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
      provider_request: null,
      provider_response: null,
      request_time: data.requestTime ?? now,
      response_time: now,
      log_message: data.logMessage,
      verbose_message: data.verboseMessage,
      created_at: now,
    },
  });
}
