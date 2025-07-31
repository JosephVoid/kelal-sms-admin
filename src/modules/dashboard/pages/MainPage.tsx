import DashboardLayout from "@/components/layout/DashboardLayout";
import { Heading, Text, Card } from "@chakra-ui/react";
import AppCard from "../components/AppCard";
import BalanceCard from "../components/BalanceCard";
import { getSession } from "@/modules/auth/lib/helpers/session";
import { redirect } from "next/navigation";
import fetchAccountAppsAction from "../lib/actions/fetchAccountApps.action";
import fetchUserAccountAction from "../lib/actions/fetchUserAccount.action";
import fetchUserAction from "../lib/actions/fetchUser.action";
import { $Enums } from "@/prisma/index";
import fetchAccountsAdminAction from "@/modules/admin/lib/actions/fetch-accounts-admin.action";
import fetchAppsAdminAction from "@/modules/admin/lib/actions/fetch-apps-admin.action";

async function fetchPageData(userId: string, role: $Enums.roles) {
  const user = await fetchUserAction(userId);
  const userAccount = await fetchUserAccountAction(userId);
  const allAccounts = await fetchAccountsAdminAction();

  const apps =
    role === "admin"
      ? await fetchAppsAdminAction()
      : await fetchAccountAppsAction(userAccount[0]?.accountId);

  const balance =
    role === "owner"
      ? userAccount[0].accounts.balance
      : allAccounts.reduce((acc, currentVal) => {
          return acc + currentVal.balance;
        }, 0);

  return {
    user,
    balance,
    apps,
  };
}

export default async function MainPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login"); // or show a 401 page
  }

  const { user, balance, apps } = await fetchPageData(
    session.userId,
    session.role
  );

  return (
    <div>
      <div className="w-full flex gap-10">
        <div className="w-4/6 flex flex-col gap-8">
          <div>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Welcome Back, {user?.fullName} 👋
            </Text>
            <Text fontWeight={"light"}>Take a look at your app's stats</Text>
          </div>
          <div className="flex flex-col gap-2">
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Apps 🖥️
            </Text>
            <div>
              {apps.length === 0 ? (
                <Text className="p-5 opacity-40" fontWeight={"light"}>
                  No Apps
                </Text>
              ) : (
                apps?.map((app) => (
                  <AppCard
                    key={app.id}
                    name={app?.name ?? ""}
                    appId={app?.id}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <BalanceCard balance={balance} />
      </div>
    </div>
  );
}
