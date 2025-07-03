"use client";

import { useGlobalModal } from "@/components/modal/modalProvider";
import { Button } from "@chakra-ui/react";
import CreateEditAppForm from "../forms/CreateEditAppForm";

export default function CreateAppButton() {
  const { openModal } = useGlobalModal();

  function handleCreateApp() {
    openModal(<CreateEditAppForm />);
  }

  return (
    <div className="w-1/6 flex flex-col">
      <Button size="lg" onClick={handleCreateApp}>
        Create App
      </Button>
    </div>
  );
}
