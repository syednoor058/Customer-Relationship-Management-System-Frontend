/* eslint-disable react/prop-types */
// import React from 'react'
import axios from "axios";

import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import lightLogo from "../../assets/images/logo_dark.png";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_TOP_LINKS,
} from "../constant/SideBarLinksConstant";

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <NavLink
      to={item.path}
      className={`${
        pathname === item.path
          ? " bg-accentColor text-primaryColor"
          : "hover:bg-gray-200 "
      } flex items-center gap-5 font-light px-5 py-2 hover:no-underline rounded-md`}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </NavLink>
  );
}

export default function Sidebar() {
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
    <div className="w-60 h-screen bg-gray-100 text-[#121212] pt-2 pb-5 flex flex-col justify-between px-3">
      <div className="flex justify-center items-center overflow-hidden">
        <img className="w-[35%] h-auto" src={lightLogo} alt="light_logo" />
      </div>
      <div className="flex-1 pt-5">
        {DASHBOARD_SIDEBAR_TOP_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="border-t border-gray-400 pt-2 border-opacity-50">
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
