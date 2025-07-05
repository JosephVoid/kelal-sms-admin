"use client";

import { useGlobalModal } from "@/components/modal/modalProvider";
import { Button } from "@chakra-ui/react";
import CreateAPIKeyForm from "../forms/CreateAPIKeyForm";

export default function CreateAPIKeyButton({ appId }: { appId: string }) {
  const { openModal, closeModal } = useGlobalModal();

  function handleCreateAPI() {
    openModal(<CreateAPIKeyForm appId={appId} onFinish={closeModal} />);
  }
  return (
    <Button width={"1/3"} onClick={handleCreateAPI}>
      Create API Key
    </Button>
  );
}
