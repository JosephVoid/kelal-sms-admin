"use client";

import { Button, Field, Input, Text, VStack } from "@chakra-ui/react";
import { createAppAction } from "../../lib/actions/createApp.action";
import { useAuth } from "@/utils/providers/AuthProvider";
import React from "react";
import { useAsync } from "@/utils/useAsync";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { editAppAction } from "../../lib/actions/editApp.action";

export default function CreateEditAppForm({
  mode,
  onFinish,
  presetName,
  appId,
}: {
  mode: "ADD" | "EDIT";
  onFinish: () => void;
  presetName?: string;
  appId?: string;
}) {
  const auth = useAuth();
  const router = useRouter();

  const { run, loading } = useAsync(createAppAction);

  const { run: runEdit, loading: editLoading } = useAsync(editAppAction);

  const [name, setName] = React.useState(presetName ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result =
      mode === "ADD"
        ? await run(auth.user!.userId, name)
        : await runEdit({ userId: auth.user!.userId, appId: appId!, name });
    if (result?.success) {
      toaster.success({
        title: `App ${mode === "ADD" ? "Created" : "Edited"}!`,
      });
      onFinish();
      router.refresh();
    } else {
      toaster.error({ title: "Err: " + result?.error });
    }
  }

  return (
    <div className="p-5 flex flex-col gap-4">
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        {mode === "ADD" ? "Add" : "Edit"}
      </Text>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field.Root>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              variant={"outline"}
              placeholder="Enter Name of the App"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Field.HelperText>
              This name will be seen by your SMS receivers
            </Field.HelperText>
          </Field.Root>
          <Button disabled={loading || editLoading} type="submit">
            {mode === "ADD" ? "Create" : "Edit"} App
          </Button>
        </form>
      </div>
    </div>
  );
}
