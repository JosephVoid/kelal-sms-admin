import { PrismaClient } from "@/prisma/client";

const prisma = new PrismaClient();

export function getUserDetail(userId: string) {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
}
