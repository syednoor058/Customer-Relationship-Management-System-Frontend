// import React from "react";
import { useState } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  MdInventory,
  MdMail,
  MdManageAccounts,
  MdMyLocation,
  MdSecurity,
  MdSettings,
  MdVpnKey,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import gdprCertificate from "../../assets/images/gdrp_certificate.png";
import loginScreenImg from "../../assets/images/login_screen_img.jpg";
import propSuiteLightLogo from "../../assets/images/propsuite_light_logo.png";
import sslCertificate from "../../assets/images/ssl_certificate.png";
import { loginAPi } from "../apiServices/apiServices";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginAPi(email, password);
      localStorage.setItem("shikderFoundationAuthToken", loginData.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="w-screen lg:h-screen bg-white overflow-hidden flex justify-center items-center">
      <div className="w-full h-full flex flex-col lg:flex-row bg-primaryColor">
        <div className="w-full lg:w-[50%] h-full rounded-b-[40px] lg:rounded-none overflow-hidden drop-shadow-2xl lg:drop-shadow-none">
          <div className="w-full h-full relative bg-gradient-to-tr from-accentColor to-blue-400">
            {/* <!-- Content --> */}
            <div className="w-full h-full text-white text-center flex flex-col gap-20 justify-between bg-black bg-opacity-70 z-[10] p-10 relative">
              {/* <!-- Value Proposition --> */}
              <h2 className="text-[26px] lg:text-[42px] font-bold leading-tight">
                Your All-in-One Real Estate Management System
              </h2>

              {/* <!-- Feature Highlights --> */}
              <div className="flex flex-col gap-3 text-lg font-light">
                <div className="flex items-center gap-3">
                  <MdMyLocation />
                  <span>Track 500+ properties in real-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdSettings />
                  <span>Manage vendor payments & payroll</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdSecurity />
                  <span>Secure financial analytics dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdInventory />
                  <span>Full functional organized inventory</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdManageAccounts />
                  <span>Smooth custoner leads management</span>
                </div>
              </div>

              {/* <!-- Trust Badges --> */}
              <div className="border-t pt-6">
                <p className="text-sm text-gray-200">
                  Trusted by{" "}
                  <span className="text-primaryColor font-medium">
                    over 100+
                  </span>{" "}
                  real estate professionals all over the world
                </p>
                <div className="flex justify-center gap-5 pt-3">
                  <img
                    src={sslCertificate}
                    alt="SSL Certificate Badge"
                    className="h-10"
                  />
                  <img
                    src={gdprCertificate}
                    alt="GDPR Certificate Badge"
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            {/* <!-- Background Image --> */}
            <div className="w-full h-full absolute inset-0 z-[5]">
              <img
                src={loginScreenImg}
                alt="Software Preview"
                className="w-full h-full object-cover object-right lg:object-left blur-[3px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%] flex justify-center p-10 items-center ">
          <div className="w-full lg:w-[65%] h-full flex flex-col gap-7 justify-center items-center">
            <div className="w-[85%] lg:w-[75%] h-auto">
              <img
                src={propSuiteLightLogo}
                alt="PropSuite Light Logo"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-semibold text-center text-gray-800">
                    Welcome Back!
                  </h1>
                  <p className="text-sm font-light text-center text-gray-500">
                    Sign in with your registered login credentials.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <form
                className="w-full flex flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <div className="h-full flex flex-row items-stretch border border-blue-200 px-5 py-3 rounded-sm">
                  <div className="text-2xl pe-5 flex items-center">
                    <MdMail />
                  </div>
                  <div className="w-[1px] flex bg-blue-200 items-stretch"></div>
                  <div className="ps-5 flex flex-col">
                    <label className="text-xs text-gray-500">
                      Email Address
                    </label>
                    <input
                      className="bg-primaryColor outline-none rounded text-gray-800"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="h-full flex flex-row items-stretch border border-blue-200 px-5 py-3 rounded-sm">
                  <div className="text-2xl pe-5 flex items-center">
                    <MdVpnKey />
                  </div>
                  <div className="w-[1px] flex bg-blue-200 items-stretch"></div>
                  <div className="ps-5 flex flex-col">
                    <label className="text-xs text-gray-500">Password</label>
                    <input
                      className="bg-primaryColor outline-none rounded  text-gray-800"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button className="w-full bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] rounded-sm text-white capitalize py-3 px-5 mt-2">
                  Continue
                </button>
              </form>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-full h-[1px] bg-gray-300"></div>
                  <div className="w-full text-nowrap text-gray-500">
                    Or Continue With
                  </div>
                  <div className="w-full h-[1px] bg-gray-300"></div>
                </div>
                <div className="w-full flex flex-row gap-4 justify-center items-center">
                  <div className="text-xl p-2 border border-gray-300 rounded-full">
                    <FcGoogle />
                  </div>
                  <div className="text-xl p-2 rounded-full bg-blue-500 text-primaryColor">
                    <FaFacebookF />
                  </div>
                  <div className="text-xl p-2 bg-gray-800 text-primaryColor rounded-full">
                    <FaApple />
                  </div>
                </div>
              </div>
              <div className="text-xs w-full text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] text-center flex flex-col gap-2 font-light">
                <p>
                  <Link to="/forget-password">Forgot password?</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
