import prisma from "@/utils/prisma-global";

export function getUserDetail(userId: string) {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
}
