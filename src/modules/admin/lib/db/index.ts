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
