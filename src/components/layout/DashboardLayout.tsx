import { VStack, Separator } from "@chakra-ui/react";
import { SideBarItems } from "./SideBarItems";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { SidebarItem } from "./SideBarItem";
import { Toaster } from "../ui/toaster";
import DashboardHeading from "../shared/DashboardHeading";
import { getSession } from "@/modules/auth/lib/helpers/session";
import { redirect } from "next/navigation";
import { Provider } from "../ui/provider";
import { ModalProvider } from "../modal/modalProvider";
import Image from "next/image";
import Logo from "@/modules/landing/assets/logo.svg";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const role = session?.role;

  const drawerContent = (
    <div className="h-full flex flex-col justify-between">
      <div className="!p-4">
        <div className="flex justify-center !mb-5">
          <Image src={Logo} alt="logo" height={100} width={100} />
        </div>

        <VStack align="start">
          {SideBarItems.filter(
            (item) => role && item.visibleFor.includes(role)
          ).map((item) => (
            <Link key={item.name} href={item.route} className="w-full">
              <SidebarItem icon={item.icon} label={item.name} />
            </Link>
          ))}
        </VStack>
      </div>
      <div className="flex flex-col gap-4 !p-4">
        <Separator />
        <SidebarItem icon={<FaSignOutAlt />} label={"Log Out"} isLogOut />
      </div>
    </div>
  );

  return (
    <Provider>
      <ModalProvider>
        <ResponsiveDrawer drawerContent={drawerContent}>
          <DashboardHeading />
          {children}
          <Toaster />
        </ResponsiveDrawer>
      </ModalProvider>
    </Provider>
  );
}
