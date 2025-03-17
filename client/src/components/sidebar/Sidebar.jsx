/* eslint-disable react/prop-types */
// import React from 'react'
import { BsCash } from "react-icons/bs";
import {
  HiOutlineArchive,
  HiOutlineClipboardList,
  HiOutlineHome,
  HiOutlineIdentification,
  HiOutlineLibrary,
  HiOutlineUser,
  HiOutlineUserAdd,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineViewGrid,
  HiOutlineViewGridAdd,
} from "react-icons/hi";
import { LuCircleDollarSign, LuHandCoins, LuWorkflow } from "react-icons/lu";
import {
  MdAddBusiness,
  MdHistory,
  MdInfoOutline,
  MdKeyboardArrowDown,
  MdOutlinePayments,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { TbReport } from "react-icons/tb";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import axios from "axios";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  HiOutlineFolderOpen,
  HiOutlineLogout,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import lightLogo from "../../assets/images/prop_suite_logo.png";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "../constant/SideBarLinksConstant";
import DashboardAccordionLink from "../dashboardAccordionLink/DashboardAccordionLink";
import LoadingScreen from "../loadingScreen/LoadingScreen";
const API_BASE_URL = import.meta.env.VITE_SIKDER_CMS_APP_API;
function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={item.path}
      className={`${
        pathname === item.path
          ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
          : "hover:bg-gray-800 "
      } flex items-center gap-2 font-light px-[10px] py-2 hover:no-underline text-sm`}
    >
      <span className="">{item.icon}</span>
      {item.label}
    </NavLink>
  );
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = localStorage.getItem("shikderFoundationAuthToken");
    if (!token) return;
    if (token) {
      setLoggingOut(true);
      try {
        const logoutRes = await axios.post(
          `${API_BASE_URL}/api/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast(logoutRes.message || "Logged out!");
      } catch (err) {
        toast.error(err.message || "Something went wromg!");
        // console.log(err);
      } finally {
        setLoggingOut(false);
        localStorage.removeItem("shikderFoundationAuthToken");
        navigate("/");
      }
    }
  };

  if (loggingOut) {
    return (
      <div className="w-screen h-screen fixed top-0 bg-primaryColor z-[20]">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="w-56 min-h-screen bg-gray-900 text-primaryColor flex flex-col justify-between text-sm font-light">
      <div className="px-4 flex items-center overflow-hidden sticky top-0 bg-gray-900 z-[10] pt-2 pb-5">
        <img className="w-[60%] h-auto" src={lightLogo} alt="light_logo" />
      </div>

      <div className="flex-1 px-2">
        <NavLink
          to="/dashboard"
          className={`${
            pathname === "/dashboard"
              ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
              : "hover:bg-gray-800 "
          } flex items-center gap-2 font-light ps-[10px] py-[10px] hover:no-underline text-sm`}
        >
          <span className="">
            <HiOutlineViewGrid />
          </span>
          Dashboard
        </NavLink>

        <div className="">
          <Accordion
            defaultExpanded
            sx={{
              backgroundColor: "transparent", // Set the background color of the accordion
              boxShadow: "none", // Optional: Remove the default shadow
              height: "auto",
              padding: 0,
              margin: 0,
            }}
          >
            <AccordionSummary
              expandIcon={
                <MdKeyboardArrowDown className="text-xl text-gray-100" />
              }
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                padding: "0px",
                paddingRight: "10px",
                paddingLeft: "10px",
                margin: "0px",
                fontWeight: 500,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "#1f2937", // Change background on hover
                },
                minHeight: "0px", // Set minimum height
                "&.Mui-expanded": {
                  minHeight: "0px", // Ensure consistency when expanded
                },
                ".MuiAccordionSummary-content": {
                  height: "auto",
                  margin: 0, // Remove default margin
                  padding: 0,
                },
                ".MuiAccordionSummary-content.Mui-expanded": {
                  margin: "0px", // Remove margin in expanded state
                },
              }}
            >
              <div className="flex flex-row gap-2 items-center py-[10px] text-primaryColor font-light">
                <span className="">
                  <HiOutlineFolderOpen />
                </span>
                Inventory
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "0px", // Adjust padding for details
                paddingLeft: "10px",
                marginTop: "0px", // Space between summary and details
              }}
            >
              <div className="ps-2 flex flex-col text-gray-300">
                <NavLink
                  to="/dashboard/categories"
                  className={`${
                    pathname === "/dashboard/categories"
                      ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-800 "
                  } flex items-center gap-2 font-light ps-2 py-[6px] hover:no-underline text-sm`}
                >
                  <span className="">
                    <HiOutlineViewGridAdd />
                  </span>
                  Categories
                </NavLink>
                <NavLink
                  to="/dashboard/products"
                  className={`${
                    pathname === "/dashboard/products"
                      ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-800 "
                  } flex items-center gap-2 font-light ps-2 py-[6px] hover:no-underline text-sm`}
                >
                  <span className="">
                    <HiOutlineArchive />
                  </span>
                  All Products
                </NavLink>
                <NavLink
                  to="/dashboard/add-product"
                  className={`${
                    pathname === "/dashboard/add-product"
                      ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-800 "
                  } flex items-center gap-2 font-light ps-2 py-[6px] hover:no-underline text-sm`}
                >
                  <span className="">
                    <HiOutlinePlusCircle />
                  </span>
                  Add Product
                </NavLink>
                <NavLink
                  to="/dashboard/inventory-purchase"
                  className={`${
                    pathname === "/dashboard/inventory-purchase"
                      ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-800 "
                  } flex items-center gap-2 font-light ps-2 py-[6px] hover:no-underline text-sm`}
                >
                  <span className="">
                    <MdOutlineShoppingCart />
                  </span>
                  Purchase
                </NavLink>
                <NavLink
                  to="/dashboard/inventory-purchase-history"
                  className={`${
                    pathname === "/dashboard/inventory-purchase-history"
                      ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-800 "
                  } flex items-center gap-2 font-light ps-2 py-[6px] hover:no-underline text-sm`}
                >
                  <span className="">
                    <MdHistory />
                  </span>
                  Purchase History
                </NavLink>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <DashboardAccordionLink
          title="Vendors"
          titleIcon={<HiOutlineUserGroup />}
          linkList={[
            {
              linkName: "All Vendors",
              linkPath: "/dashboard/all-vendors",
              linkIcon: <HiOutlineClipboardList />,
            },
            {
              linkName: "Add Vendor",
              linkPath: "/dashboard/add-vendor",
              linkIcon: <HiOutlinePlusCircle />,
            },
            {
              linkName: "Payment",
              linkPath: "/dashboard/vendors/payment",
              linkIcon: <MdOutlinePayments />,
            },
            {
              linkName: "Vendors Ledger",
              linkPath: "/dashboard/vendors/ledger",
              linkIcon: <TbReport />,
            },
          ]}
        />
        <DashboardAccordionLink
          title="Employees"
          titleIcon={<HiOutlineUser />}
          linkList={[
            {
              linkName: "All Employees",
              linkPath: "/dashboard/all-employees",
              linkIcon: <HiOutlineClipboardList />,
            },
            {
              linkName: "Add Employee",
              linkPath: "/dashboard/add-employee",
              linkIcon: <HiOutlineUserAdd />,
            },
            {
              linkName: "Employee Roles",
              linkPath: "/dashboard/employee-roles",
              linkIcon: <HiOutlineIdentification />,
            },
            {
              linkName: "Employee Salary",
              linkPath: "/dashboard/employee-salary",
              linkIcon: <LuCircleDollarSign />,
            },
            {
              linkName: "Employee Wages",
              linkPath: "/dashboard/employee-wages",
              linkIcon: <BsCash />,
            },
            {
              linkName: "Employee Ledger",
              linkPath: "/dashboard/employee-ledger",
              linkIcon: <TbReport />,
            },
          ]}
        />

        <DashboardAccordionLink
          title="Projects"
          titleIcon={<HiOutlineHome />}
          linkList={[
            {
              linkName: "All Projects",
              linkPath: "/dashboard/projects",
              linkIcon: <HiOutlineClipboardList />,
            },
            {
              linkName: "Add Project",
              linkPath: "/dashboard/add-project",
              linkIcon: <HiOutlinePlusCircle />,
            },
            {
              linkName: "Project States",
              linkPath: "/dashboard/project-states",
              linkIcon: <LuWorkflow />,
            },
            {
              linkName: "Assign Product",
              linkPath: "/dashboard/projects/assign-product",
              linkIcon: <MdAddBusiness />,
            },
            {
              linkName: "Assign History",
              linkPath: "/dashboard/projects/assign-history",
              linkIcon: <MdHistory />,
            },
            {
              linkName: "Supply Cash",
              linkPath: "/dashboard/projects/supply-cash",
              linkIcon: <LuCircleDollarSign />,
            },
            {
              linkName: "Completed",
              linkPath: "/dashboard/projects/completed",
              linkIcon: <FaRegCheckCircle />,
            },
            {
              linkName: "Complete Info",
              linkPath: "/dashboard/projects/completed/info",
              linkIcon: <MdInfoOutline />,
            },
          ]}
        />
        <DashboardAccordionLink
          title="Customer Leads"
          titleIcon={<HiOutlineUsers />}
          linkList={[
            {
              linkName: "All Customers",
              linkPath: "/dashboard/customers",
              linkIcon: <HiOutlineClipboardList />,
            },
            {
              linkName: "Add Customer",
              linkPath: "/dashboard/customers/add-customer",
              linkIcon: <HiOutlinePlusCircle />,
            },
          ]}
        />
        <DashboardAccordionLink
          title="Finance"
          titleIcon={<HiOutlineLibrary />}
          linkList={[
            {
              linkName: "All Accounts",
              linkPath: "/dashboard/accounts",
              linkIcon: <HiOutlineClipboardList />,
            },
            {
              linkName: "Add Account",
              linkPath: "/dashboard/accounts/add-account",
              linkIcon: <HiOutlinePlusCircle />,
            },
            {
              linkName: "Accounts Ledger",
              linkPath: "/dashboard/accounts/ledger",
              linkIcon: <TbReport />,
            },
            {
              linkName: "Expense",
              linkPath: "/dashboard/expense",
              linkIcon: <LuHandCoins />,
            },
            {
              linkName: "Project Expense",
              linkPath: "/dashboard/projects/expense",
              linkIcon: <LuHandCoins />,
            },
            {
              linkName: "Cash Ledger",
              linkPath: "/dashboard/cash-ledger",
              linkIcon: <LuHandCoins />,
            },
          ]}
        />
        {/* {DASHBOARD_SIDEBAR_TOP_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))} */}
      </div>
      <div className="border-t border-gray-800 pt-3 bg-gray-900 px-2">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className="flex items-center gap-2 font-light px-[10px] py-2 hover:bg-gray-800 cursor-pointer text-red-500 text-sm"
          onClick={handleLogout}
        >
          <span className="">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}
