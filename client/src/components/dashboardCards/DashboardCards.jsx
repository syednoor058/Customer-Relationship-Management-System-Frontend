/* eslint-disable react/prop-types */
// import React from 'react'

export default function DashboardCards({ title, number, desc, icon }) {
  return (
    <div className="w-80 h-44 flex flex-row rounded-xl bg-gradient-to-r from-accentColor to-[#a2b4fc] p-5 justify-between relative leading-none">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-primaryColor">{title}</div>
          <div className="text-6xl font-light text-primaryColor">{number}</div>
        </div>
        <div className="text-sm text-gray-200">{desc}</div>
      </div>

      <div className=" text-primaryColor rounded-md text-7xl opacity-40">
        {icon}
      </div>
    </div>
  );
}
