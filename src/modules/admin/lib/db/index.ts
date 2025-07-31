import { PrismaClient } from "@/prisma/index";

const prisma = new PrismaClient();

export async function getAccountsAdmin() {
  const result = await prisma.accounts.findMany({
    select: {
      useraccounts: {
        select: {
          users: {
            select: {
              fullName: true,
            },
          },
        },
        take: 1,
        where: {
          role: {
            not: "admin",
          },
        },
      },
      balance: true,
      id: true,
      name: true,
      isBanned: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result
    .map((account) => ({
      userName: account.useraccounts[0].users.fullName,
      ...account,
    }))
    .map((account) => {
      const { useraccounts, ...theRest } = account;
      return theRest;
    });
}

export async function getLogsAdmin() {
  return await prisma.logging.findMany({
    select: {
      id: true,
      users: {
        select: {
          fullName: true,
        },
      },
      source: true,
      accounts: {
        select: {
          name: true,
        },
      },
      apps: {
        select: {
          name: true,
        },
      },
      services: {
        select: {
          name: true,
        },
      },
      providers: {
        select: {
          name: true,
        },
      },
      user_request: true,
      user_response: true,
      provider_request: true,
      provider_response: true,
      request_time: true,
      response_time: true,
      log_message: true,
      verbose_message: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function getProvidersAdmin() {
  return await prisma.providers.findMany();
}

export async function getServicesAdmin() {
  return await prisma.services.findMany();
}

export async function getUsersAdmin() {
  return await prisma.users.findMany({
    select: {
      id: true,
      useraccounts: {
        select: {
          accounts: {
            select: {
              name: true,
            },
          },
        },
      },
      fullName: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });
}

export async function updateAccountBalance(accountId: string, balance: number) {
  return await prisma.accounts.update({
    where: {
      id: accountId,
    },
    data: {
      balance,
    },
  });
}

export async function banAccount(accountId: string, isBanned: boolean) {
  return await prisma.accounts.update({
    where: {
      id: accountId,
    },
    data: {
      isBanned,
    },
  });
}

export async function approveTopup(
  topupId: string,
  accountId: string,
  amount: number
) {
  return await prisma.$transaction(async (tx) => {
    const topup = await tx.topups.update({
      where: { id: topupId },
      data: { status: "APPROVED" },
    });

    await tx.accounts.update({
      where: { id: accountId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return topup;
  });
}

export async function denyTopup(topupId: string) {
  return await prisma.topups.update({
    where: { id: topupId },
    data: { status: "DENIED" },
  });
}

export async function requestTopup(
  accountId: string,
  amount: number,
  userName: string,
  txnId: string
) {
  return await prisma.topups.create({
    data: {
      accountId,
      amount,
      status: "REQUEST",
      type: "MANUAL",
      userName,
      txnId,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });
}

export async function getTopupsAdmin() {
  return await prisma.topups.findMany({
    select: {
      id: true,
      accountId: true,
      accounts: {
        select: {
          name: true,
        },
      },
      amount: true,
      type: true,
      status: true,
      txnId: true,
      userName: true,
      updatedAt: true,
      createdAt: true,
    },
  });
}

export async function getMessagesAdmin() {
  return prisma.messages.findMany({
    select: {
      id: true,
      appId: true,
      apps: {
        select: {
          name: true,
        },
      },
      sentTo: true,
      status: true,
      createdAt: true,
      sentAt: true,
      deliveredAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAppsAdmin() {
  return await prisma.apps.findMany();
}
