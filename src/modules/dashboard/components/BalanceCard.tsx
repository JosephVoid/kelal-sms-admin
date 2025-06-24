import { Button, Card, Text } from "@chakra-ui/react";

export default function BalanceCard() {
  return (
    <Card.Root shadow={"xl"} p={5} className="w-2/6 h-fit">
      <Text fontSize={"xl"}>Balance 💰</Text>
      <Text fontSize={"4xl"} fontWeight={"bold"}>
        ETB 456.5
      </Text>
      <Button variant={"solid"}>Top Up</Button>
    </Card.Root>
  );
}
