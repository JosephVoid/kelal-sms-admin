"use client";

import { Box, Button, Card, Collapsible, Text } from "@chakra-ui/react";
import { IBalanceCard } from "../types";
import { useAuth } from "@/utils/providers/AuthProvider";

export default function BalanceCard(props: IBalanceCard) {
  const auth = useAuth();

  return (
    <Card.Root shadow={"xl"} p={5} className="w-2/6 h-fit" rounded={"xs"}>
      <Text fontSize={"xl"}>
        {auth.user?.role === "admin" && "All Accounts "}Balance 💰
      </Text>
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        ETB {props.balance}
      </Text>
      {auth.user?.role === "owner" && (
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
