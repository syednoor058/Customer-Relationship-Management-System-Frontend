// import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
    <section className="w-full h-full relative text-gray-500">
      <div className="w-full min-h-screen flex flex-col justify-center items-center font-bodyFont relative z-[5]">
        <div className="w-full h-screen">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
