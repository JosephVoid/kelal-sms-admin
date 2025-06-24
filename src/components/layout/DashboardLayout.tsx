"use client";

import { Box, Flex, VStack, Text, IconButton, Heading } from "@chakra-ui/react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        w="250px"
        bg="blue.600"
        color="white"
        p={4}
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="xl" fontWeight="bold" mb={8}>
          MyApp
        </Text>

        <VStack align="start">
          <SidebarItem icon={<FaHome />} label="Home" />
          <SidebarItem icon={<FaUser />} label="Users" />
          <SidebarItem icon={<FaCog />} label="Settings" />
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={6}>
        <Heading size="md" mb={4}>
          Dashboard
        </Heading>
        {children}
      </Box>
    </Flex>
  );
}

function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactElement;
  label: string;
}) {
  return (
    <Flex
      align="center"
      gap={3}
      px={2}
      py={2}
      borderRadius="md"
      _hover={{ bg: "blue.700" }}
      w="full"
      cursor="pointer"
    >
      <IconButton
        aria-label={label}
        variant="ghost"
        color="white"
        fontSize="lg"
        _hover={{ bg: "transparent" }}
      >
        {icon}
      </IconButton>
      <Text>{label}</Text>
    </Flex>
  );
}
