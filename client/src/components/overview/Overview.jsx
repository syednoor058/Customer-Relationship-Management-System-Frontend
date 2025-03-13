// import React from 'react'
import { useEffect, useState } from "react";
import {
  FcBriefcase,
  FcBusinessman,
  FcHome,
  FcLibrary,
  FcManager,
  FcOpenedFolder,
} from "react-icons/fc";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCash } from "../apiServices/cashAPIServices";
import LoadingScreen from "../loadingScreen/LoadingScreen";

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
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [cash, setCash] = useState([]);

  useEffect(() => {
    const fetchCash = async () => {
      setLoading(true);
      try {
        const cashRes = await getCash();
        // console.log(cashRes);
        setCash(cashRes);
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchCash();
  }, [token]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-full h-full p-10">
      <div className="pb-10">
        <div className="w-[40%] aspect-[2/1] flex shadow-xl p-7 rounded-xl bg-gradient-to-tr from-[#7F00FF] to-[#E100FF] text-gray-300">
          <div className="w-full flex flex-col justify-between">
            <div className="text-lg font-normal ">
              <p>Balance</p>
            </div>
            <div className="w-full font-semibold text-5xl flex flex-row justify-end items-end gap-5">
              <span className="font-normal text-base">BDT</span>
              <span className="text-primaryColor">{cash[0].balance ?? 0}</span>
            </div>
            <div className="w-full flex flex-row gap-10 justify-between items-center text-xs">
              <p>Last Update:</p>
              <p>{cash[0]?.updated_at.split(" ")[0] ?? ""}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-5">
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
