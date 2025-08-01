import { Card, Text } from "@chakra-ui/react";
import fetchUserDetailAction from "../lib/actions/fetch-user-detail.action";
import { getSession } from "@/modules/auth/lib/helpers/session";
import { redirect } from "next/navigation";
import InfoStepper from "../components/InfoStepper";

export default async function InfoPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await fetchUserDetailAction(session.userId);

  return (
    <div>
      <div>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          🙋🏽 Information Center
        </Text>
        <Text fontWeight={"light"}>
          ❔ Read the guide on how to use Kelal SMS ❔
        </Text>
      </div>
      <div className="flex justify-between !py-10">
        <div className="w-1/2">
          <InfoStepper
            steps={[
              {
                header: "Create App",
                content: <p className="!text-xs">Create App</p>,
              },
              {
                header: "Create API Key",
                content: <p className="!text-xs">Create API Key</p>,
              },
              {
                header: "Use API Key",
                content: <p className="!text-xs">Use API Key</p>,
              },
              {
                header: "View Report",
                content: <p className="!text-xs">View Report</p>,
              },
            ]}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="!p-5">
            <Card.Root shadow={"xl"} p={5} className="h-fit" rounded={"xs"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                {user?.fullName}
              </Text>
              <div className="!text-sm opacity-70">
                <p>{user?.email}</p>
                <p>{user?.phone}</p>
                <p>Account ID: {session.accountId}</p>
              </div>
            </Card.Root>
          </div>
          <div className="!p-5">
            <Card.Root shadow={"xl"} p={5} className="h-fit" rounded={"xs"}>
              <Text fontWeight={"bold"}>For Support & Questions</Text>
              <div className="!text-sm opacity-70">
                <p>contact@buyersfirst.et</p>
                <p>+251920642556</p>
              </div>
            </Card.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
