import prisma from "@/utils/prisma-global";
import { hash } from "bcryptjs";

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

export async function saveOtpToDb(rawOtp: string, email: string) {
  const hashedOtp = await hash(rawOtp, 10);

  return prisma.otp.create({
    data: {
      otp: hashedOtp, // store hashed
      email: email,
      expiresOn: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
      createdOn: new Date(),
    },
  });
}

export async function getEmailOtp(email: string) {
  return prisma.otp.findFirst({
    where: { email: email },
    orderBy: {
      createdOn: "desc",
    },
  });
}

export async function deleteOTP(id: string) {
  return await prisma.otp.delete({ where: { id: id } });
}

export async function createAccount(name: string) {
  return prisma.accounts.create({
    data: {
      name,
      balance: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });
}

export async function linkUserToAccount(userId: string, accountId: string) {
  return prisma.useraccounts.create({
    data: {
      userId,
      accountId,
      role: "owner",
    },
  });
}

export async function createUser({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const hashedPassword = await hash(password, 10);
  return prisma.users.create({
    data: {
      fullName: name,
      email,
      password: hashedPassword,
      phone: phone,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });
}

export async function updateUserPassword(
  email: string,
  hashedPassword: string
) {
  return await prisma.users.update({
    where: { email: email },
    data: { password: hashedPassword, updatedAt: new Date() },
  });
}
