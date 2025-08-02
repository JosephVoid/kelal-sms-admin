import prisma from "@/utils/prisma-global";
import { Status } from "../../types";

export async function getMessageStatusDistribution(appId: string) {
  const rawData = await prisma.$queryRaw<{ status: Status; count: number }[]>`
    SELECT
      "status",
      COUNT(*) AS count
    FROM "messages"
    WHERE "appId" = ${appId}::uuid
    GROUP BY "status";
  `;

  return rawData;
}

export async function getMessagesTimeSeries(appId: string) {
  const rawData = await prisma.$queryRaw<{ day: Date; count: number }[]>`
    SELECT
      DATE_TRUNC('day', "sentAt") AS day,
      COUNT(*) AS count
    FROM "messages"
    WHERE "appId" = ${appId}::uuid AND "status" = 'sent'
    GROUP BY day
    ORDER BY day;
  `;
  return rawData;
}

export async function getAccountApps(accountId: string | string[]) {
  try {
    const res = await prisma.apps.findMany({
      where: {
        accountId: Array.isArray(accountId) ? { in: accountId } : accountId,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserAccounts(userId: string) {
  try {
    return await prisma.useraccounts.findMany({
      where: { userId },
      include: { accounts: true },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(userId: string) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
