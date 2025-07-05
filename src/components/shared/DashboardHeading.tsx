"use client";

import { Heading } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export default function DashboardHeading() {
  const path = usePathname();

  return (
    <Heading size="md" mb={4} className="first-letter:capitalize">
      {path.split("/").slice(-1)}
    </Heading>
  );
}
