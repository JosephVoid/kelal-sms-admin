import DashboardLayout from "@/components/layout/DashboardLayout";
import { Heading, Text, Card } from "@chakra-ui/react";
import AppCard from "../components/AppCard";
import BalanceCard from "../components/BalanceCard";
import { getSession } from "@/modules/auth/lib/helpers/session";
import { redirect } from "next/navigation";
import fetchAccountAppsAction from "../lib/actions/fetchAccountApps.action";
import fetchUserAccountAction from "../lib/actions/fetchUserAccount.action";
import fetchUserAction from "../lib/actions/fetchUser.action";

export default async function MainPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login"); // or show a 401 page
  }
  const user = await fetchUserAction(session.userId);
  const userAccount = await fetchUserAccountAction(session.userId);
  const apps =
    userAccount && (await fetchAccountAppsAction(userAccount?.accountId));

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
              {apps?.map((app) => (
                <AppCard key={app.id} name={app?.name ?? ""} appId={app?.id} />
              ))}
            </div>
          </div>
        </div>
        <BalanceCard balance={userAccount?.accounts.balance ?? 0} />
      </div>
    </div>
  );
}
