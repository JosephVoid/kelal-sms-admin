"use client";

import { Button, Card, Collapsible, Text } from "@chakra-ui/react";
import { IBalanceCard } from "../types";
import { useAsync } from "@/utils/useAsync";
import { getSessionServerActions } from "@/modules/auth/lib/actions/get-session";

export default function BalanceCard(props: IBalanceCard) {
  const { data: session } = useAsync(getSessionServerActions, true, []);

  return (
    <Card.Root shadow={"xl"} p={5} className="w-2/6 h-fit" rounded={"xs"}>
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
              <Button variant={"ghost"} size={"sm"} disabled>
                Chapa
              </Button>
              <Button variant={"subtle"} size={"sm"}>
                💵 Manual
              </Button>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </Card.Root>
  );
}
