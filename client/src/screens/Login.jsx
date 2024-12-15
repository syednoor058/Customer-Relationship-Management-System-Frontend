// import React from "react";
import LoginComponent from "../components/loginComponent/LoginComponent";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-hero-back bg-accentColor bg-cover font-bodyFont mt-[-72px] pt-32 pb-5">
      <div className="w-[80%] h-full shadow-2xl">
        <LoginComponent />
      </div>
      <div className="w-[80%]">
        <div className="text-sm text-gray-500 mt-20">
          © 2025. All rights reserved by Devion Ark.
        </div>
      </div>
    </div>
  );
}
