"use client";

import { useAsync } from "@/utils/useAsync";
import { Button, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { deleteAppAction } from "../../lib/actions/deleteApp.action";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export default function DeleteAppWarn({
  appId,
  onFinish,
}: {
  appId: string;
  onFinish: () => void;
}) {
  const { run, loading } = useAsync(deleteAppAction);
  const router = useRouter();

  async function handleDelete() {
    const result = await run(appId);
    if (result.success) {
      toaster.success({ title: "App Deleted!" });
      onFinish();
      router.refresh();
    } else toaster.error({ title: "Err" + result.error });
  }

  return (
    <div className="text-center flex flex-col items-center gap-6">
      <FaTrash size={40} />
      <Text fontSize={"2xl"} fontWeight={"black"}>
        Are you sure you want to delete this App?
      </Text>
      <Text>Your API keys and you external applications will stop working</Text>
      <div className="flex justify-between gap-6">
        <Button variant={"outline"} onClick={onFinish}>
          Cancel
        </Button>
        <Button
          variant={"solid"}
          bgColor={"red.600"}
          disabled={loading}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
