import { PrismaClient } from "@/prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return await prisma.users.findFirst({
    where: { email: email },
    select: {
      id: true,
      fullName: true,
      email: true,
      password: true,
      useraccounts: {
        select: {
          role: true,
          accountId: true,
        },
      },
    },
  });
}
