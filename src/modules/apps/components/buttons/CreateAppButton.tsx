"use client";

import { useGlobalModal } from "@/components/modal/modalProvider";
import { Button } from "@chakra-ui/react";
import CreateEditAppForm from "../forms/CreateEditAppForm";

export default function CreateAppButton() {
  const { openModal, closeModal } = useGlobalModal();

  function handleCreateApp() {
    openModal(<CreateEditAppForm mode="ADD" onFinish={closeModal} />);
  }

  return (
    <div className="w-full md:w-full flex flex-col">
      <Button size="md" onClick={handleCreateApp}>
        Create App
      </Button>
    </div>
  );
}
