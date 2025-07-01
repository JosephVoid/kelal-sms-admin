"use client";

import { Box, Button, Card, Collapsible, Text } from "@chakra-ui/react";
import { IBalanceCard } from "../types";
import { FaArrowUp, FaDollarSign } from "react-icons/fa";

export default function BalanceCard(props: IBalanceCard) {
  return (
    <Card.Root shadow={"xl"} p={5} className="w-2/6 h-fit">
      <Text fontSize={"xl"}>Balance 💰</Text>
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        ETB {props.balance}
      </Text>
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
    </Card.Root>
  );
}
