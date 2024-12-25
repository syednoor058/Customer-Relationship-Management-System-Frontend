/* eslint-disable react/prop-types */
// import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DashboardCards({
  title,
  number,
  desc,
  icon,
  iconColor,
}) {
  return (
    <div
      className={`h-40 flex flex-row rounded-md ${iconColor} border border-gray-200 p-5 justify-between relative leading-none drop-shadow-lg overflow-hidden`}
    >
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-lg font-medium text-primaryColor capitalize">
            {title}
          </div>
          <div className="text-4xl font-light text-gray-200">{number}</div>
        </div>
        <div className="text-sm text-gray-200">{desc}</div>
      </div>
      <div className="flex items-start text-xl text-gray-200 justify-end">
        <BsThreeDotsVertical />
      </div>
      <div
        className={`text-primaryColor absolute bottom-2 right-3 rounded-md text-5xl`}
      >
        {icon}
      </div>
    </div>
  );
}
