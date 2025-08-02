"use client";

import { Text, InputGroup, Input, Button, Card } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";
import { IKeys } from "../types";
import { toaster } from "@/components/ui/toaster";
import { useGlobalModal } from "@/components/modal/modalProvider";
import DeleteAPIKeyWarn from "./forms/DeleteAPIKeyWarn";

export default function KeyCards(props: IKeys) {
  const { openModal, closeModal } = useGlobalModal();

  function handleAPIKeyDelete() {
    openModal(<DeleteAPIKeyWarn apiKeyId={props.id} onFinish={closeModal} />);
  }

  return (
    <>
      <Card.Root>
        <Card.Body className="!p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <Text fontSize={"smaller"} fontWeight={"bold"}>
              {props.name}
            </Text>
            <div className="w-full md:w-1/2 mt-2 md:mt-0">
              <InputGroup>
                <Input
                  disabled
                  value={"123456789012345678901234567890"}
                  type="password"
                  size={"xs"}
                />
              </InputGroup>
            </div>
          </div>
          <div className="flex justify-between !italic !opacity-80 !my-2">
            <Text fontSize={"smaller"}>
              Last Used:{" "}
              {props?.lastUsed
                ? props?.lastUsed.toLocaleDateString("en-US", {
                    dateStyle: "medium",
                  })
                : "-"}
            </Text>
            <Text fontSize={"smaller"}>
              Expires On:{" "}
              {props.expiresOn.toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}
            </Text>
          </div>
          <div>
            <Button
              size={"xs"}
              colorPalette={"red"}
              onClick={handleAPIKeyDelete}
            >
              Delete Key
            </Button>
          </div>
        </Card.Body>
      </Card.Root>
    </>
  );
}
