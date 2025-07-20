import {
  FaHome,
  FaUser,
  FaThLarge,
  FaTable,
  FaComment,
  FaTv,
  FaChartArea,
  FaCogs,
  FaBuilding,
} from "react-icons/fa";

export const SideBarItems = [
  {
    name: "Home",
    route: "/dashboard",
    visibleFor: ["owner"],
    icon: <FaHome />,
  },
  {
    name: "Apps",
    route: "/dashboard/apps",
    visibleFor: ["owner"],
    icon: <FaTv />,
  },
  {
    name: "Messages",
    route: "/dashboard/messages",
    visibleFor: ["owner", "admin"],
    icon: <FaComment />,
  },
  {
    name: "Users",
    route: "/dashboard/users",
    visibleFor: ["admin"],
    icon: <FaUser />,
  },
  {
    name: "Accounts",
    route: "/dashboard/accounts",
    visibleFor: ["admin"],
    icon: <FaThLarge />,
  },
  {
    name: "Services",
    route: "/dashboard/services",
    visibleFor: ["admin"],
    icon: <FaCogs />,
  },
  {
    name: "Providers",
    route: "/dashboard/providers",
    visibleFor: ["admin"],
    icon: <FaBuilding />,
  },
  {
    name: "Logs",
    route: "/dashboard/logs",
    visibleFor: ["admin"],
    icon: <FaTable />,
  },
  {
    name: "Stats",
    route: "/dashboard/stats",
    visibleFor: ["admin"],
    icon: <FaChartArea />,
  },
];
