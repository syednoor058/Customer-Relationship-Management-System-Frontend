/* eslint-disable react/prop-types */
// import React from 'react'
import {
  HiOutlineArchive,
  HiOutlineClipboardList,
  HiOutlineClock,
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
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiStepsBold } from "react-icons/pi";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import axios from "axios";
import { useState } from "react";
import {
  HiOutlineFolderOpen,
  HiOutlineLogout,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import lightLogo from "../../assets/images/logo_light.png";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "../constant/SideBarLinksConstant";
import DashboardAccordionLink from "../dashboardAccordionLink/DashboardAccordionLink";
import LoadingScreen from "../loadingScreen/LoadingScreen";

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={item.path}
      className={`${
        pathname === item.path
          ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
          : "hover:bg-gray-800 "
      } flex items-center gap-5 font-light px-5 py-2 hover:no-underline text-sm`}
    >
      <span className="text-xl">{item.icon}</span>
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
    if (token) {
      setLoggingOut(true);
      await axios.post(
        "/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("shikderFoundationAuthToken");
    }
    navigate("/");
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
      <div className="px-2 flex justify-center items-center overflow-hidden sticky top-0 bg-gray-900 z-[10] py-2">
        <img className="w-[35%] h-auto" src={lightLogo} alt="light_logo" />
      </div>

      <div className="flex-1 pt-5 px-2">
        <NavLink
          to="/dashboard"
          className={`${
            pathname === "/dashboard"
              ? " bg-accentColor bg-opacity-10 border-r-[5px] border-accentColor"
              : "hover:bg-gray-800 "
          } flex items-center gap-2 font-[500] ps-5 py-[10px] hover:no-underline text-sm`}
        >
          <span className="text-lg">
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
                paddingRight: "20px",
                paddingLeft: "20px",
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
              <div className="flex flex-row gap-2 items-center py-[10px] text-primaryColor">
                <span className="text-lg">
                  <HiOutlineFolderOpen />
                </span>
                Inventory
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "0px", // Adjust padding for details
                paddingLeft: "20px",
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
                  <span className="text-lg">
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
                  <span className="text-lg">
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
                  <span className="text-lg">
                    <HiOutlinePlusCircle />
                  </span>
                  Add Product
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
              linkIcon: <PiStepsBold />,
            },
          ]}
        />
        <DashboardAccordionLink
          title="Customer Leads"
          titleIcon={<HiOutlineUsers />}
          linkList={[
            {
              linkName: "All Customers",
              linkPath: "/dashboard/all-customers",
              linkIcon: <HiOutlineClipboardList />,
            },
            {
              linkName: "Add Customer",
              linkPath: "/dashboard/add-customer",
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
              linkPath: "/dashboard/add-account",
              linkIcon: <HiOutlinePlusCircle />,
            },
            {
              linkName: "Transaction History",
              linkPath: "/dashboard/transaction-history",
              linkIcon: <HiOutlineClock />,
            },
          ]}
        />
        {/* {DASHBOARD_SIDEBAR_TOP_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))} */}
      </div>
      <div className="border-t border-gray-800 pt-3 sticky bottom-0 bg-gray-900 px-2">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className="flex items-center gap-5 font-light px-5 py-2 hover:bg-gray-800 cursor-pointer text-red-500"
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}
