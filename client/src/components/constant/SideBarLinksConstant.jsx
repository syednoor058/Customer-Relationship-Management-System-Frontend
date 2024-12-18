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
    path: "/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "categories",
    label: "Categories",
    path: "/dashboard/categories",
    icon: <HiOutlineFolderOpen />,
  },
  {
    key: "products",
    label: "Products",
    path: "/dashboard/products",
    icon: <HiOutlineArchive />,
  },
  {
    key: "vendors",
    label: "Vendors",
    path: "/dashboard/vendors",
    icon: <HiOutlineUserGroup />,
  },
  {
    key: "accounts",
    label: "Accounts",
    path: "/dashboard/accounts",
    icon: <HiOutlineLibrary />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "setting",
    label: "Setting",
    path: "/dashboard/setting",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Support",
    path: "/dashboard/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
