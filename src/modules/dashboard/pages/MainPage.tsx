import DashboardLayout from "@/components/layout/DashboardLayout";
import { Heading, Text } from "@chakra-ui/react";

export default function MainPage() {
  return (
    <div>
      <Heading size="2xl" mb={4}>
        Welcome 🎉
      </Heading>
      <Text fontSize="lg">This is your Chakra-powered dashboard!</Text>
    </div>
  );
}
