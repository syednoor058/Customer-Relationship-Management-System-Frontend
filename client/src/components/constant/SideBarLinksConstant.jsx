import {
  HiOutlineArchive,
  HiOutlineCog,
  HiOutlineFolderOpen,
  HiOutlineLibrary,
  HiOutlineQuestionMarkCircle,
  HiOutlineUserGroup,
  HiOutlineViewGrid,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_TOP_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "categories",
    label: "Categories",
    path: "/categories",
    icon: <HiOutlineFolderOpen />,
  },
  {
    key: "products",
    label: "Products",
    path: "/products",
    icon: <HiOutlineArchive />,
  },
  {
    key: "vendors",
    label: "Vendors",
    path: "/vendors",
    icon: <HiOutlineUserGroup />,
  },
  {
    key: "accounts",
    label: "Accounts",
    path: "/accounts",
    icon: <HiOutlineLibrary />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "setting",
    label: "Setting",
    path: "/setting",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
