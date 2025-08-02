import prisma from "@/utils/prisma-global";

export async function getMessagesForAccount(accountId: string) {
  return prisma.messages.findMany({
    where: {
      apps: {
        accountId,
      },
    },
    select: {
      id: true,
      appId: true,
      sentTo: true,
      status: true,
      sentAt: true,
      deliveredAt: true,
      apps: {
        select: {
          name: true, // 👈 app name here
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
