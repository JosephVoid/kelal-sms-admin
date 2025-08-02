"use client";

import { Button, Card, Collapsible, Text } from "@chakra-ui/react";
import { IBalanceCard } from "../types";
import { useAsync } from "@/utils/useAsync";
import { getSessionServerActions } from "@/modules/auth/lib/actions/get-session";
import { useGlobalModal } from "@/components/modal/modalProvider";
import TopUpForm from "./top-up-form";
import Chapa from "../assets/Chapa.svg";
import Image from "next/image";

export default function BalanceCard(props: IBalanceCard) {
  const { data: session } = useAsync(getSessionServerActions, true, []);
  const { openModal, closeModal } = useGlobalModal();

  function handleShowTopUp() {
    openModal(
      <TopUpForm onFinish={closeModal} accountId={session?.accountId} />
    );
  }

  return (
    <Card.Root
      shadow={"xl"}
      p={5}
      className="w-full md:w-2/6 h-fit"
      rounded={"xs"}
    >
      <Text fontSize={"xl"}>
        {session?.role === "admin" && "All Accounts "}Balance 💰
      </Text>
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        ETB {props.balance}
      </Text>
      {session?.role === "owner" && (
        <Collapsible.Root>
          <Collapsible.Trigger>
            <Button variant={"outline"} size={"sm"}>
              💳 Top Up
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className="!py-2 flex gap-3">
              <Button
                variant={"outline"}
                bgColor={"bg.success"}
                size={"sm"}
                disabled
              >
                <div className="flex items-center !-ml-3">
                  <Image src={Chapa} height={30} width={30} alt="Chapa Logo" />
                  Chapa
                </div>
              </Button>
              <Button variant={"subtle"} size={"sm"} onClick={handleShowTopUp}>
                💵 Manual (CBE)
              </Button>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </Card.Root>
  );
}
