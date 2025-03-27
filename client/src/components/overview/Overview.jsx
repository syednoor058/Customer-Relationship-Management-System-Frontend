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
import { getInstituteInfo } from "../apiServices/instituteInfoAPIServices";
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
  const [company, setCompany] = useState();

  useEffect(() => {
    const fetchCash = async () => {
      setLoading(true);
      try {
        const cashRes = await getCash();
        const insData = await getInstituteInfo();
        setCompany(insData);
        console.log(insData);
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
      <div className="w-full pb-20 flex flex-row-reverse gap-10 items-start justify-start">
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
        <div className="w-[60%] flex flex-col gap-7">
          <div>
            <img
              src={company.img_url}
              alt="Company Logo"
              className="w-52 h-auto object-cover"
            />
          </div>
          <div className="flex text-lg">
            <table>
              <tbody>
                <tr>
                  <td className="pe-10">Institution Name:</td>
                  <td className="font-semibold text-gray-600">
                    {company.institution_name}
                  </td>
                </tr>
                <tr>
                  <td className="pe-10">Address:</td>
                  <td className="font-semibold text-gray-600">
                    {company.institution_address}
                  </td>
                </tr>
                <tr>
                  <td className="pe-10">Phone:</td>
                  <td className="font-semibold text-gray-600">
                    {company.institution_phone}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-5">
        <OverViewCard
          icon={<FcBriefcase />}
          title="Inventory"
          forwardTo="products"
        />
        <OverViewCard
          icon={<FcOpenedFolder />}
          title="Category"
          forwardTo="categories"
        />
        <OverViewCard
          icon={<FcManager />}
          title="Employees"
          forwardTo="all-employees"
        />
        <OverViewCard
          icon={<FcBusinessman />}
          title="Vendors"
          forwardTo="all-vendors"
        />
        <OverViewCard icon={<FcHome />} title="Projects" forwardTo="projects" />
        <OverViewCard
          icon={<FcLibrary />}
          title="Accounts"
          forwardTo="accounts"
        />
      </div>
    </div>
  );
}
