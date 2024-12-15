// import React from 'react'
import { BiSupport } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import sfLogo from "../../assets/images/sf_logo.png";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center items-center sticky top-0 z-[1000] bg-transparent">
      <div className="w-[80%] py-2 overflow-hidden flex flex-row gap-10 justify-between items-center">
        <div className="w-auto h-14">
          <img className="w-auto h-14" src={sfLogo} alt="" />
        </div>
        <div className="flex flex-row gap-5 text-primaryColor text-lg">
          <div>
            <FaRegBell />
          </div>
          <div>
            <BiSupport />
          </div>
        </div>
      </div>
    </div>
  );
}
