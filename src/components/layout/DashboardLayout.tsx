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
import { logoutAction } from "@/modules/auth/lib/actions/logout.action";
import { SidebarItem } from "./SideBarItem";
import { Toaster } from "../ui/toaster";
import DashboardHeading from "../shared/DashboardHeading";
import { getSession } from "@/modules/auth/lib/helpers/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login"); // or show a 401 page
  }

  const role = session?.role;

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        w="20%"
        bg="blackAlpha.600"
        color="white"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        className="invisible"
      >
        <div>
          <Text fontSize="xl" fontWeight="bold" mb={8} px={2}>
            Kelal SMS
          </Text>

          <VStack align="start">
            {SideBarItems.filter((item) => item.visibleFor.includes(role)).map(
              (item) => (
                <Link key={item.name} href={item.route} className="w-full">
                  <SidebarItem icon={item.icon} label={item.name} />
                </Link>
              )
            )}
          </VStack>
        </div>
        <div className="flex flex-col gap-4">
          <Separator />
          <SidebarItem icon={<FaSignOutAlt />} label={"Log Out"} />
        </div>
      </Box>
      <Box
        w="15%"
        bg="blackAlpha.800"
        color="white"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        className="fixed h-full"
      >
        <div>
          <Text fontSize="xl" fontWeight="bold" mb={8} px={2}>
            Kelal SMS
          </Text>

          <VStack align="start">
            {SideBarItems.filter((item) => item.visibleFor.includes(role)).map(
              (item) => (
                <Link key={item.name} href={item.route} className="w-full">
                  <SidebarItem icon={item.icon} label={item.name} />
                </Link>
              )
            )}
          </VStack>
        </div>
        <div className="flex flex-col gap-4">
          <Separator />
          <SidebarItem icon={<FaSignOutAlt />} label={"Log Out"} isLogOut />
        </div>
      </Box>
      {/* Main Content */}
      <Box flex="1" p={6}>
        <DashboardHeading />
        {children}
        <Toaster />
      </Box>
    </Flex>
  );
}
