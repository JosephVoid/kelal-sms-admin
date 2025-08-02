import { Card, Text } from "@chakra-ui/react";
import fetchUserDetailAction from "../lib/actions/fetch-user-detail.action";
import { getSession } from "@/modules/auth/lib/helpers/session";
import { redirect } from "next/navigation";
import InfoStepper from "../components/InfoStepper";
import CodeBox from "@/modules/landing/components/code-box";

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
      <div className="flex flex-col md:flex-row justify-between !py-10">
        <div className="w-full md:w-1/2">
          <InfoStepper
            steps={[
              {
                header: "Create App",
                content: (
                  <p className="!text-xs">
                    The first thing you need to do to use Kelal SMS is to create
                    an app. An App can have multiple API keys and the name of
                    the app shows up at the bottom of the SMS message that gets
                    sent to the users. Click on the apps menu on the side bar to
                    go to the Apps creation page.
                  </p>
                ),
              },
              {
                header: "Create API Key",
                content: (
                  <p className="!text-xs">
                    After creating the app you can create an API key under it.
                    This key will have a name and an expiry date. When you
                    create your API key you will only get to see it once, so
                    copy it somewhere safe.
                  </p>
                ),
              },
              {
                header: "Use API Key",
                content: (
                  <div className="flex flex-col gap-2">
                    <p className="!text-xs">
                      Now that you have your key you can use our OTP sending
                      endpoint as the following:
                    </p>
                    <CodeBox />
                    <p className="!text-xs">
                      Also don't forget to top up your account.
                    </p>
                  </div>
                ),
              },
              {
                header: "View Report",
                content: (
                  <p className="!text-xs">
                    If you want to see delivery reports and success rate, you
                    can view the stats on the dashboard or view each message on
                    the Messages side bar
                  </p>
                ),
              },
            ]}
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
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
