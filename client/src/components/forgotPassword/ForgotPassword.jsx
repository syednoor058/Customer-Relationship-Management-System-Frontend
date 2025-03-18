// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  MdInventory,
  MdMail,
  MdManageAccounts,
  MdMyLocation,
  MdSecurity,
  MdSettings,
  MdVpnKey,
} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import gdprCertificate from "../../assets/images/gdrp_certificate.png";
import loginScreenImg from "../../assets/images/login_screen_img.jpg";
import propSuiteLightLogo from "../../assets/images/propsuite_light_logo.png";
import sslCertificate from "../../assets/images/ssl_certificate.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post(
        `${import.meta.env.VITE_SIKDER_CMS_APP_API}/api/forgetpassword`,
        { email }
      );
      if (response.data.success) {
        setStep(2);
        setCountdown(60);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post(
        `${import.meta.env.VITE_SIKDER_CMS_APP_API}/api/verifyotp`,
        { email, otp }
      );
      if (response.data.success) {
        setStep(3);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to verify OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post(
        `${import.meta.env.VITE_SIKDER_CMS_APP_API}/api/resetpassword`,
        {
          email,
          password: newPassword,
        }
      );
      if (response.data.success) {
        alert("Password reset successful");
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to reset password");
    }
  };

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setError("OTP expired. Please request a new OTP.");
      setStep(1);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  return (
    <>
      <div className="w-screen lg:h-screen bg-white overflow-hidden flex justify-center items-center">
        <div className="w-full h-full flex flex-col-reverse lg:flex-row-reverse bg-primaryColor">
          <div className="w-full lg:w-[50%] flex flex-col justify-between p-10 items-center gap-10">
            <div className="w-full text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-col gap-2">
              <Link to="/">
                <div className="flex flex-row gap-1 px-2  rounded-xl">
                  <span className="text-4xl">
                    <IoIosArrowRoundBack />
                  </span>
                </div>
              </Link>
            </div>
            <div className="w-[80%] lg:w-[40%] h-auto">
              <img
                src={propSuiteLightLogo}
                alt="PropSuite Light Logo"
                className="w-full h-auto object-cover"
              />
            </div>

            {step === 1 && (
              <div className="w-full lg:w-[65%] flex flex-col items-center gap-7">
                <div className="w-full flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-2xl font-semibold text-center text-gray-800">
                        OTP Verification!
                      </h1>
                      <p className="text-sm font-light text-center text-gray-500">
                        The OTP will be sent to your registered phone number.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <form
                    className="w-full flex flex-col gap-3"
                    onSubmit={handleSendOtp}
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
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] rounded-sm text-white capitalize py-3 px-5 mt-2"
                    >
                      Send OTP
                    </button>
                  </form>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="w-full lg:w-[65%] flex flex-col gap-7">
                <div className="w-full flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-2xl font-semibold text-center text-gray-800">
                        OTP Verification!
                      </h1>
                      <p className="text-sm font-light text-center text-gray-500">
                        Submit the correct OTP code to verify your identity.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <form
                    className="w-full flex flex-col gap-3"
                    onSubmit={handleVerifyOtp}
                  >
                    <div className="h-full flex flex-row items-stretch border border-blue-200 px-5 py-3 rounded-sm">
                      <div className="text-2xl pe-5 flex items-center">
                        <RiLockPasswordFill />
                      </div>
                      <div className="w-[1px] flex bg-blue-200 items-stretch"></div>
                      <div className="ps-5 flex flex-col">
                        <label className="text-xs text-gray-500">
                          OTP Code
                        </label>
                        <input
                          className="bg-primaryColor outline-none rounded text-gray-800"
                          type="text"
                          placeholder="Enter OTP code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <p className="text-gray-500">
                      Time left:{" "}
                      <span className="text-lg ps-1 text-blue-500 font-medium">
                        {countdown}
                      </span>{" "}
                      seconds
                    </p>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] rounded-sm text-white capitalize py-3 px-5 mt-2"
                    >
                      Verify OTP
                    </button>
                  </form>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="w-full lg:w-[65%] flex flex-col gap-7">
                <div className="w-full flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-2xl font-semibold text-center text-gray-800">
                        Reset Password
                      </h1>
                      <p className="text-sm font-light text-center text-gray-500">
                        Do not share your new password with anyone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <form
                    className="w-full flex flex-col gap-3"
                    onSubmit={handleResetPassword}
                  >
                    <div className="h-full flex flex-row items-stretch border border-blue-200 px-5 py-3 rounded-sm">
                      <div className="text-2xl pe-5 flex items-center">
                        <MdVpnKey />
                      </div>
                      <div className="w-[1px] flex bg-blue-200 items-stretch"></div>
                      <div className="ps-5 flex flex-col">
                        <label className="text-xs text-gray-500">
                          New Password
                        </label>
                        <input
                          className="bg-primaryColor outline-none rounded text-gray-800"
                          type="password"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] rounded-sm text-white capitalize py-3 px-5 mt-2"
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            )}
            <div className="w-full lg:w-[65%]">
              <p className="text-sm font-light text-center text-gray-400">
                &copy; 2025. All rights reserved by Devion Ark.
              </p>
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
}
