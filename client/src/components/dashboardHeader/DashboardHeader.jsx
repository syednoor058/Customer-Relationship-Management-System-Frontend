// import React from 'react'
import { HiOutlineBell, HiOutlineChatAlt2, HiSearch } from "react-icons/hi";

export default function DashboardHeader() {
  return (
    <header className="w-full flex justify-between lg:pe-5 py-2 bg-transparent lg:bg-primaryColor sticky top-0 rounded-sm drop-shadow-xl z-[999] lg:border border-blue-100">
      <div className="lg:ml-2 w-[50%] lg:w-[40%] relative">
        <HiSearch className="text-lg absolute top-[10px] left-2 z-[10]" />
        <input
          className="w-full ps-9 pe-2 py-2 outline-none bg-blue-50 rounded-sm text-gray-800"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row gap-2 lg:gap-3 items-center">
        <div className="text-lg p-1 lg:p-2 rounded-full bg-blue-50 text-gray-500">
          <HiOutlineChatAlt2 />
        </div>
        <div className="text-lg p-1 lg:p-2 rounded-full bg-blue-50 text-gray-500">
          <HiOutlineBell />
        </div>
        <div className="w-full aspect-square p-1 lg:p-2 leading-none rounded-full bg-blue-500 text-primaryColor font-semibold flex justify-center items-center">
          AU
        </div>
      </div>
    </header>
  );
}
