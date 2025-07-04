"use client";

import { logoutAction } from "@/modules/auth/lib/actions/logout.action";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { useAuth } from "@/utils/providers/AuthProvider";

export function SidebarItem({
  icon,
  label,
  isLogOut,
}: {
  icon: React.ReactElement;
  label: string;
  isLogOut?: boolean;
}) {
  const auth = useAuth();

  const handleClick = async () => {
    if (isLogOut) {
      const logout = await logoutAction();
      if (logout.success) {
        auth.logUserOut();
        toaster.create({
          title: "Logged Out",
        });
      }
    }
  };

  return (
    <Flex
      align="center"
      gap={3}
      px={2}
      borderRadius="md"
      _hover={{ bg: "blue.700" }}
      w="full"
      cursor="pointer"
      onClick={handleClick}
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
