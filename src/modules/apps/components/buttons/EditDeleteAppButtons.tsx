"use client";

import { useGlobalModal } from "@/components/modal/modalProvider";
import { IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { PiPencil } from "react-icons/pi";
import CreateEditAppForm from "../forms/CreateEditAppForm";
import DeleteAppWarn from "../forms/DeleteAppWarn";

export default function EditDeleteAppButtons({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const { openModal, closeModal } = useGlobalModal();

  function handleClick(click: "EDIT" | "DELETE") {
    openModal(
      click === "EDIT" ? (
        <CreateEditAppForm
          mode="EDIT"
          onFinish={closeModal}
          name={name}
          appId={id}
        />
      ) : (
        <DeleteAppWarn appId={id} onFinish={closeModal} />
      )
    );
  }

  return (
    <div className="flex gap-2">
      <IconButton size="sm" onClick={() => handleClick("EDIT")}>
        <PiPencil />
      </IconButton>
      <IconButton size="sm" onClick={() => handleClick("DELETE")}>
        <FaTrash />
      </IconButton>
    </div>
  );
}
