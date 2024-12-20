/* eslint-disable react/prop-types */
// import React from 'react'
import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineLibrary,
  HiOutlineUserGroup,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
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
import lightLogo from "../../assets/images/logo_dark.png";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "../constant/SideBarLinksConstant";

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={item.path}
      className={`${
        pathname === item.path
          ? " bg-gray-300 border-r-[5px] border-accentColor"
          : "hover:bg-gray-200 "
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
    const token = localStorage.getItem("token");
    if (token) {
      setLoggingOut(true);
      await axios.post(
        "/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("token");
    }
    navigate("/");
  };

  if (loggingOut) {
    return (
      <div className="w-screen h-screen fixed top-0 bg-primaryColor z-[20]">
        Logging out...
      </div>
    );
  }

  return (
    <div className="w-60 min-h-screen bg-gray-100 text-[#121212] pt-2 flex flex-col justify-between text-sm font-light">
      <div className="px-3 flex justify-center items-center overflow-hidden sticky top-2 bg-gray-100">
        <img className="w-[35%] h-auto" src={lightLogo} alt="light_logo" />
      </div>

      <div className="flex-1 pt-5 px-3">
        <NavLink
          to="/dashboard"
          className={`${
            pathname === "/dashboard"
              ? " bg-gray-300 border-r-[5px] border-accentColor"
              : "hover:bg-gray-200 "
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
              expandIcon={<MdKeyboardArrowDown className="text-xl" />}
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
                  backgroundColor: "#e5e7eb", // Change background on hover
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
              <div className="flex flex-row gap-2 items-center py-[10px]">
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
              <div className="ps-2 flex flex-col">
                <NavLink
                  to="/dashboard/categories"
                  className={`${
                    pathname === "/dashboard/categories"
                      ? " bg-gray-300 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-200 "
                  } flex items-center gap-2 font-light ps-2 py-2 hover:no-underline text-sm`}
                >
                  <span className="text-lg">
                    <HiOutlineClipboardList />
                  </span>
                  All Categories
                </NavLink>
                <NavLink
                  to="/dashboard/products"
                  className={`${
                    pathname === "/dashboard/products"
                      ? " bg-gray-300 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-200 "
                  } flex items-center gap-2 font-light ps-2 py-2 hover:no-underline text-sm`}
                >
                  <span className="text-lg">
                    <HiOutlineClipboardList />
                  </span>
                  All Products
                </NavLink>
                <NavLink
                  to="/dashboard/add-product"
                  className={`${
                    pathname === "/dashboard/add-product"
                      ? " bg-gray-300 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-200 "
                  } flex items-center gap-2 font-light ps-2 py-2 hover:no-underline text-sm`}
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
        <div className="">
          <Accordion
            sx={{
              backgroundColor: "transparent", // Set the background color of the accordion
              boxShadow: "none", // Optional: Remove the default shadow
              height: "auto",
              padding: 0,
              margin: 0,
            }}
          >
            <AccordionSummary
              expandIcon={<MdKeyboardArrowDown className="text-xl" />}
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
                  backgroundColor: "#e5e7eb", // Change background on hover
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
              <div className="flex flex-row gap-2 items-center py-[10px]">
                <span className="text-lg">
                  <HiOutlineUserGroup />
                </span>
                Vendors
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "0px", // Adjust padding for details
                paddingLeft: "20px",
                marginTop: "0px", // Space between summary and details
              }}
            >
              <div className="ps-2 flex flex-col">
                <NavLink
                  to=""
                  className={`${
                    pathname === "/dashboard/vendors"
                      ? " bg-gray-300 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-200 "
                  } flex items-center gap-2 font-light ps-2 py-2 hover:no-underline text-sm`}
                >
                  <span className="text-lg">
                    <HiOutlineClipboardList />
                  </span>
                  All Vendors
                </NavLink>
                <NavLink
                  to=""
                  className={`${
                    pathname === "/dashboard/add-vendors"
                      ? " bg-gray-300 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-200 "
                  } flex items-center gap-2 font-light ps-2 py-2 hover:no-underline text-sm`}
                >
                  <span className="text-lg">
                    <HiOutlinePlusCircle />
                  </span>
                  Add Vendor
                </NavLink>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="">
          <Accordion
            sx={{
              backgroundColor: "transparent", // Set the background color of the accordion
              boxShadow: "none", // Optional: Remove the default shadow
              height: "auto",
              padding: 0,
              margin: 0,
            }}
          >
            <AccordionSummary
              expandIcon={<MdKeyboardArrowDown className="text-xl" />}
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
                  backgroundColor: "#e5e7eb", // Change background on hover
                },
                minHeight: "0px", // Set minimum height
                "&.Mui-expanded": {
                  minHeight: "0px", // Ensure consistency when expanded
                },
                ".MuiAccordionSummary-content": {
                  height: "auto",
                  margin: "0px", // Remove default margin
                  padding: 0,
                },
                ".MuiAccordionSummary-content.Mui-expanded": {
                  margin: "0px", // Remove margin in expanded state
                },
              }}
            >
              <div className="flex flex-row gap-2 items-center py-[10px]">
                <span className="text-lg">
                  <HiOutlineLibrary />
                </span>
                Finance
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "0px", // Adjust padding for details
                paddingLeft: "20px",
                marginTop: "0px", // Space between summary and details
              }}
            >
              <div className="ps-2 flex flex-col">
                <NavLink
                  to=""
                  className={`${
                    pathname === "/dashboard/accounts"
                      ? " bg-gray-300 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-200 "
                  } flex items-center gap-2 font-light ps-2 py-2 hover:no-underline text-sm`}
                >
                  <span className="text-lg">
                    <HiOutlineClipboardList />
                  </span>
                  All Accounts
                </NavLink>
                <NavLink
                  to=""
                  className={`${
                    pathname === "/dashboard/add-accounts"
                      ? " bg-gray-300 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-200 "
                  } flex items-center gap-2 font-light ps-2 py-2 hover:no-underline text-sm`}
                >
                  <span className="text-lg">
                    <HiOutlinePlusCircle />
                  </span>
                  Add Accounts
                </NavLink>
                <NavLink
                  to=""
                  className={`${
                    pathname === "/dashboard/transactions"
                      ? " bg-gray-300 border-r-[5px] border-accentColor"
                      : "hover:bg-gray-200 "
                  } flex items-center gap-2 font-light ps-2 py-2 hover:no-underline text-sm`}
                >
                  <span className="text-lg">
                    <HiOutlineClock />
                  </span>
                  Transaction History
                </NavLink>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* {DASHBOARD_SIDEBAR_TOP_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))} */}
      </div>
      <div className="border-t border-gray-200 pt-3 sticky bottom-0 bg-primaryColor px-3">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className="flex items-center gap-5 font-light px-5 py-2 hover:bg-gray-200 cursor-pointer text-red-600"
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
