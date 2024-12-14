// import React from "react";
import LoginComponent from "../components/loginComponent/LoginComponent";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-hero-back bg-cover">
      <div className="w-[80%] h-full shadow-2xl">
        <LoginComponent />
      </div>
    </div>
  );
}
