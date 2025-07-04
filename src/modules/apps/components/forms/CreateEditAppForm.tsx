"use client";

import { Button, Field, Input, Text, VStack } from "@chakra-ui/react";
import { createAppAction } from "../../lib/actions/createApp.action";
import { useAuth } from "@/utils/providers/AuthProvider";
import React from "react";
import { useAsync } from "@/utils/useAsync";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export default function CreateEditAppForm({
  mode,
  onFinish,
}: {
  mode: "ADD" | "EDIT";
  onFinish?: () => void;
}) {
  const auth = useAuth();
  const router = useRouter();

  const { run, loading } = useAsync<
    ReturnType<typeof createAppAction>,
    [string, string]
  >(createAppAction, []);

  const [name, setName] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await run(auth.user!.userId, name);
    if (result?.success) {
      toaster.success({ title: "App Created!" });
      onFinish && onFinish();
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
          <Button disabled={loading} type="submit">
            {mode === "ADD" ? "Create" : "Edit"} App
          </Button>
        </form>
      </div>
    </div>
  );
}
