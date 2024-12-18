// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboardHeader/DashboardHeader";
import Sidebar from "../components/sidebar/Sidebar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
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
        console.error("Error fetching user data", err);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <div className="w-screen h-screen fixed top-0 bg-primaryColor">
        Signing in...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center  bg-primaryColor text-[#121212] bg-cover font-bodyFont">
      <div className="w-full h-screen flex flex-row">
        <div className="h-screen">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col">
          <DashboardHeader />
          <div className="mt-10 px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
