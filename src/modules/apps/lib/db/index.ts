import { PrismaClient } from "@/prisma/client";

const prisma = new PrismaClient();

export async function getUserAppsWithKeys(userId: string) {
  return await prisma.useraccounts.findFirst({
    where: {
      userId,
    },
    select: {
      accounts: {
        select: {
          name: true,
          id: true,
          apps: {
            select: {
              id: true,
              name: true,
              createdAt: true,
              keys: {
                select: {
                  id: true,
                  name: true,
                  keyHash: true,
                  expiresOn: true,
                  lastUsed: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
