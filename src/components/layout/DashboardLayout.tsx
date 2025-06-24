import {
  Box,
  Flex,
  VStack,
  Text,
  IconButton,
  Heading,
  Separator,
} from "@chakra-ui/react";
import { SideBarItems } from "./SideBarItems";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        w="20%"
        bg="blue.600"
        color="white"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <div>
          <Text fontSize="xl" fontWeight="bold" mb={8} px={2}>
            Kelal SMS
          </Text>

          <VStack align="start">
            {SideBarItems.map((item) => (
              <Link key={item.name} href={item.route} className="w-full">
                <SidebarItem icon={item.icon} label={item.name} />
              </Link>
            ))}
          </VStack>
        </div>
        <div className="flex flex-col gap-4">
          <Separator />
          <SidebarItem icon={<FaSignOutAlt />} label={"Log Out"} />
        </div>
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
