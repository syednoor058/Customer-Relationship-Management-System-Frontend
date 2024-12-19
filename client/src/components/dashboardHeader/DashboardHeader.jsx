// import React from 'react'
import { HiOutlineBell, HiOutlineChatAlt2, HiSearch } from "react-icons/hi";

export default function DashboardHeader() {
  return (
    <header className="w-full flex justify-between pe-10 py-2 bg-primaryColor sticky top-0 rounded drop-shadow-xl z-[999]">
      <div className="ml-2 w-[300px] relative">
        <HiSearch className="text-xl absolute top-[10px] left-2 z-[10]" />
        <input
          className="w-full ps-9 pe-2 py-2 rounded-md outline-none bg-gray-100 border-gray-200 border"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row gap-3 items-center">
        <div className="text-xl p-2 rounded-full bg-gray-100">
          <HiOutlineChatAlt2 />
        </div>
        <div className="text-xl p-2 rounded-full bg-gray-100">
          <HiOutlineBell />
        </div>
        <div className="w-full aspect-square px-2 rounded-full bg-accentColor text-primaryColor font-semibold flex justify-center items-center">
          AU
        </div>
      </div>
    </header>
  );
}
