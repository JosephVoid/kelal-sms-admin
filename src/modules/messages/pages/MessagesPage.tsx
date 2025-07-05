import { Text } from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import { getSession } from "@/modules/auth/lib/helpers/session";
import { redirect } from "next/navigation";

export default async function MessagesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login"); // or show a 401 page
  }

  const accountId = session.accountId;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          💬 Messages Sent
        </Text>
        <Text fontWeight={"light"}>
          ✨ Checkout the messages sent from your apps ✨
        </Text>
      </div>
      <DataTable accountId={accountId} />
    </div>
  );
}
