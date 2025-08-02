import prisma from "@/utils/prisma-global";

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
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });
}

export async function findUserAccount(userId: string) {
  return await prisma.useraccounts.findFirst({
    where: { userId },
    select: { accountId: true },
  });
}

export async function createApp(accountId: string, name: string) {
  return await prisma.apps.create({
    data: {
      name,
      accountId: accountId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function findUserApp(appId: string, accountId: string) {
  return await prisma.apps.findFirst({
    where: {
      id: appId,
      accountId: accountId,
    },
  });
}

export async function updateApp(appId: string, name: string) {
  await prisma.apps.update({
    where: { id: appId },
    data: {
      name,
      updatedAt: new Date(),
    },
  });
}

export async function createKey(
  appId: string,
  name: string,
  keyHash: string,
  expiresOn: Date
) {
  return await prisma.keys.create({
    data: {
      appId,
      name,
      keyHash,
      expiresOn,
      lastUsed: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function deleteAppById(appId: string) {
  await prisma.keys.deleteMany({
    where: { appId },
  });

  return prisma.apps.delete({
    where: { id: appId },
  });
}

export async function deleteKeyById(keyId: string) {
  return prisma.keys.delete({
    where: { id: keyId },
  });
}
