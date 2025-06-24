import {
  FaHome,
  FaUser,
  FaThLarge,
  FaTable,
  FaComment,
  FaTv,
  FaChartArea,
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
