"use client";

import { useGlobalModal } from "@/components/modal/modalProvider";
import { IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { PiPencil } from "react-icons/pi";
import CreateEditAppForm from "../forms/CreateEditAppForm";
import DeleteAppWarn from "../forms/DeleteAppWarn";

export default function EditDeleteAppButtons() {
  const { openModal } = useGlobalModal();

  function handleClick(click: "EDIT" | "DELETE") {
    openModal(
      click === "EDIT" ? <CreateEditAppForm mode="EDIT" /> : <DeleteAppWarn />
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
