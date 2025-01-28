// import React from 'react'
import {
  FcBriefcase,
  FcBusinessman,
  FcHome,
  FcLibrary,
  FcManager,
  FcOpenedFolder,
} from "react-icons/fc";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function OverViewCard({ icon, title, forwardTo }) {
  return (
    <div className="border shadow-xl flex justify-center items-center">
      <Link to={forwardTo}>
        <div className="w-full aspect-square rounded flex flex-col gap-3 p-5">
          <div className="w-full flex justify-center items-center text-6xl">
            {icon}
          </div>
          <div className="uppercase font-semibold text-2xl text-center">
            {title}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="w-full h-full p-10">
      <div className="grid grid-cols-3 gap-5">
        <OverViewCard
          icon={<FcBriefcase />}
          title="Inventory"
          forwardTo="add-product"
        />
        <OverViewCard
          icon={<FcOpenedFolder />}
          title="Category"
          forwardTo="add-product"
        />
        <OverViewCard
          icon={<FcManager />}
          title="Employees"
          forwardTo="add-product"
        />
        <OverViewCard
          icon={<FcBusinessman />}
          title="Vendors"
          forwardTo="add-product"
        />
        <OverViewCard
          icon={<FcHome />}
          title="Projects"
          forwardTo="add-product"
        />
        <OverViewCard
          icon={<FcLibrary />}
          title="Accounts"
          forwardTo="add-product"
        />
      </div>
    </div>
  );
}
