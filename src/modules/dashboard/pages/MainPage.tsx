import DashboardLayout from "@/components/layout/DashboardLayout";
import { Heading, Text, Card } from "@chakra-ui/react";
import AppCard from "../components/AppCard";
import BalanceCard from "../components/BalanceCard";

export default function MainPage() {
  return (
    <div>
      <div className="w-full flex gap-10">
        <div className="w-4/6 flex flex-col gap-8">
          <div>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              Welcome Back, Yoseph 👋
            </Text>
            <Text fontWeight={"light"}>Take a look at your app's stats</Text>
          </div>
          <div className="flex flex-col gap-2">
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Apps 🖥️
            </Text>
            <div>
              <AppCard name="My App" />
            </div>
          </div>
        </div>
        <BalanceCard />
      </div>
    </div>
  );
}
