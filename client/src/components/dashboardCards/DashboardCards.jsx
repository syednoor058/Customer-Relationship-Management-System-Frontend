/* eslint-disable react/prop-types */
// import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DashboardCards({
  title,
  number,
  desc,
  icon,
  fromColor,
  toColor,
}) {
  return (
    <div
      className={`h-44 flex flex-row rounded-lg bg-gradient-to-tr ${fromColor} ${toColor} p-5 justify-between relative leading-none drop-shadow-xl overflow-hidden`}
    >
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-lg font-medium text-primaryColor capitalize">
            {title}
          </div>
          <div className="text-6xl font-light text-primaryColor">{number}</div>
        </div>
        <div className="text-sm text-gray-200">{desc}</div>
      </div>
      <div className="flex items-start text-xl text-primaryColor justify-end">
        <BsThreeDotsVertical />
      </div>
      <div className=" text-primaryColor absolute bottom-2 right-3 rounded-md text-8xl opacity-30 blur-[2px]">
        {icon}
      </div>
    </div>
  );
}
