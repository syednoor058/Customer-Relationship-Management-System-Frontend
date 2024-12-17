/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from "react-router-dom";
import lightLogo from "../../assets/images/logo_light.png";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_TOP_LINKS,
} from "../constant/SideBarLinksConstant";

function SidebarLink({ item }) {
  return (
    <Link
      to={item.path}
      className="flex items-center gap-2 font-light px-5 py-2 hover:bg-[#1b1b1b] hover:no-underline"
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-accentColor text-primaryColor py-5 flex flex-col justify-between">
      <div className="flex justify-center items-center overflow-hidden">
        <img className="w-[60%] h-auto" src={lightLogo} alt="light_logo" />
      </div>
      <div className="flex-1 mt-10">
        {DASHBOARD_SIDEBAR_TOP_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}
