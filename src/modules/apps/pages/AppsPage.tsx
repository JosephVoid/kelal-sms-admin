import { Card, Text } from "@chakra-ui/react";
import fetchAppsWithKeysAction from "../lib/actions/fetchAppsWithKeys.action";
import { getSession } from "@/modules/auth/lib/helpers/session";
import { redirect } from "next/navigation";
import KeyCards from "../components/KeyCards";
import CreateAppButton from "../components/buttons/CreateAppButton";
import EditDeleteAppButtons from "../components/buttons/EditDeleteAppButtons";
import CreateAPIKeyButton from "../components/buttons/CreateAPIKeyButton";

export default async function AppsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const apps = await fetchAppsWithKeysAction(session.userId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          🖥️ Manage your apps
        </Text>
        <Text fontWeight={"light"}>
          ✨ Create New Apps, also manage your API keys ✨
        </Text>
      </div>
      <div>
        <div className="w-full flex">
          <div className="w-5/6 flex flex-col gap-8">
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Apps
            </Text>
            {apps?.map((app) => (
              <Card.Root className="w-3/4" key={app.id}>
                <Card.Body className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <Text fontWeight={"bold"}>{app.name}</Text>
                    <EditDeleteAppButtons appId={app.id} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Text>API Keys</Text>
                    {app.keys.length === 0 ? (
                      <Text className="p-5 opacity-40" fontWeight={"light"}>
                        No Keys
                      </Text>
                    ) : (
                      app.keys.map((key) => <KeyCards key={key.id} {...key} />)
                    )}
                    <CreateAPIKeyButton appId={app.id} />
                  </div>
                </Card.Body>
              </Card.Root>
            ))}
          </div>
          <CreateAppButton />
        </div>
      </div>
    </div>
  );
}
