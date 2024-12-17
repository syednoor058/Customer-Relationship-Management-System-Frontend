// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      } catch (err) {
        console.error("Error fetching user data", err);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-hero-back bg-primaryColor text-[#121212] bg-cover font-bodyFont">
      <div className="w-full h-screen flex flex-row">
        <div className="h-screen">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col">
          <header className="w-full flex justify-end pe-10 py-3 shadow-xl">
            {user.name}
          </header>
          <div className="text-center font-semibold uppercase text-5xl mt-16">
            Welcome to Dashboard!
          </div>
        </div>
      </div>
    </div>
  );
}
