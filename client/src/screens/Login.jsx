// import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import background from "../assets/images/background.webp";
import Navbar from "../components/navBar/Navbar";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const alreadyLoggedinCheck = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/dashboard");
        }

        return;
      } catch (err) {
        console.error("Error fetching login data", err);
        navigate("/");
      }
    };

    alreadyLoggedinCheck();
  }, [navigate]);
  return (
    <section className="w-full h-full relative text-gray-600">
      <div className="w-full h-full absolute top-0 z-[2]">
        <img className="w-full h-full" src={background} alt="background" />
      </div>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col justify-center items-center font-bodyFont mt-[-72px] pt-32 pb-5 relative z-[5]">
        <div className="w-[80%] h-full shadow-2xl">
          <Outlet />
        </div>
        <div className="w-[80%]">
          <div className="text-sm text-gray-500 mt-20">
            © 2025. All rights reserved by Devion Ark.
          </div>
        </div>
      </div>
    </section>
  );
}
