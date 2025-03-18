// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardHeader from "../components/dashboardHeader/DashboardHeader";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import Sidebar from "../components/sidebar/Sidebar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("shikderFoundationAuthToken");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        // navigate("/dashboard/overview");
      } catch (err) {
        toast.error("Error fetching user data", err);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <div className="w-screen h-screen fixed top-0 bg-primaryColor z-[20]">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center  bg-primaryColor text-[#121212] bg-cover font-bodyFont bg-opacity-30 text-sm relative">
      {toggle && (
        <div
          className={`w-56 h-screen flex lg:hidden fixed left-0 top-0 z-[999999] duration-1000 ease-in-out ${
            toggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="w-full h-full overflow-y-scroll no-scrollbar">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="w-full h-screen flex flex-row">
        <div className="h-screen invisible lg:visible fixed left-0 top-0 z-[1000] overflow-y-scroll no-scrollbar">
          <Sidebar />
        </div>
        <div className="lg:ml-60 w-full flex flex-col overflow-y-scroll pt-1 px-1 lg:px-0">
          <div className="w-full px-2 lg:px-5 flex flex-row gap-2 justify-center items-center border lg:border-0 border-blue-100">
            <DashboardHeader />
            <div
              className="text-base text-gray-500 hover:text-blue-500 p-2 rounded-sm bg-blue-100 lg:hidden cursor-pointer"
              onClick={handleToggle}
            >
              <IoMenuOutline />
            </div>
          </div>
          <div className="mt-5 flex-1 lg:px-5">
            <Outlet />
          </div>
          <div className="px-3 py-2 text-center text-xs rounded-md text-gray-500">
            &copy; 2025. All rights reserved by Devion Ark.
          </div>
        </div>
      </div>
    </div>
  );
}
