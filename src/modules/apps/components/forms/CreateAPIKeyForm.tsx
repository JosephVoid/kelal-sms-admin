"use client";

import { ChakraDatePicker } from "@/components/ui/date-picker";
import { useAsync } from "@/utils/useAsync";
import { Text, Input, Button, Field, InputGroup } from "@chakra-ui/react";
import React from "react";
import { createApiKeyAction } from "../../lib/actions/createAPIKey.action";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { FaCopy, FaExclamation, FaExclamationTriangle } from "react-icons/fa";

export default function CreateAPIKeyForm({
  appId,
  onFinish,
}: {
  appId: string;
  onFinish: () => void;
}) {
  const [name, setName] = React.useState("");
  const [expiresOn, setExpiresOn] = React.useState<Date>(new Date());
  const [showOnceKey, setShowOnceKey] = React.useState("");

  const { run, loading } = useAsync(createApiKeyAction);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await run({ appId, name, expiresOn });
    if (result.success) {
      toaster.success({ title: "API Key Created!" });
      router.refresh();
      result.keyId && setShowOnceKey(result.rawKey);
    } else {
      toaster.error({ title: result.error });
    }
  }

  function handleCopy(key: string) {
    navigator.clipboard
      .writeText(key)
      .then(() => toaster.info({ title: "API Key copied!" }));
  }

  return (
    <div className="p-5 flex flex-col gap-4">
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Add API Key
      </Text>
      {!showOnceKey && (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field.Root>
              <Field.Label>
                API Key Name <Field.RequiredIndicator />
              </Field.Label>
              <Input
                variant={"outline"}
                placeholder="Enter Name of the App"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field.Root>

            <Field.Root className="w-fit">
              <Field.Label>
                Expriy <Field.RequiredIndicator />
              </Field.Label>
              <ChakraDatePicker
                onChange={(date) => date && setExpiresOn(date)}
                selected={expiresOn}
              />
              <Field.HelperText>Set when this key expires</Field.HelperText>
            </Field.Root>

            <button
              type="submit"
              className="!bg-black !text-white !rounded !p-3 !cursor-pointer"
              disabled={loading}
            >
              Add API KEY
            </button>
          </form>
        </div>
      )}
      {showOnceKey && (
        <div className="w-full">
          <Field.Root>
            <InputGroup
              endAddon={
                <FaCopy
                  className="hover:cursor-pointer"
                  onClick={() => handleCopy(showOnceKey)}
                />
              }
            >
              <>
                <Input disabled value={showOnceKey} type="text" />
              </>
            </InputGroup>
            <Field.HelperText className="flex gap-2 items-center">
              <FaExclamationTriangle /> Copy this key and keep it somewhere
              safe, You won't see it here again.
            </Field.HelperText>
          </Field.Root>
        </div>
      )}
    </div>
  );
}
