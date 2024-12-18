// import React from 'react'
import { HiOutlineBell, HiOutlineChatAlt2 } from "react-icons/hi";

export default function DashboardHeader() {
  return (
    <header className="w-full flex justify-end pe-10 py-3 shadow-xl">
      <div className="flex flex-row gap-5 items-center">
        <div className="text-xl">
          <HiOutlineChatAlt2 />
        </div>
        <div className="text-xl">
          <HiOutlineBell />
        </div>
        <div className="w-full aspect-square px-2 rounded-full bg-gray-500 text-gray-100 font-semibold flex justify-center items-center">
          AU
        </div>
      </div>
    </header>
  );
}
