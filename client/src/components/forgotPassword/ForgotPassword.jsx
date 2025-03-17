// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdMail, MdVpnKey } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import loginScreenImg from "../../assets/images/login_screen_image.jpg";
import propSuiteLogo from "../../assets/images/prop_suite_logo.png";
import propSuiteLightLogo from "../../assets/images/propsuite_light_logo.png";

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
      <div className="w-screen h-screen bg-white overflow-hidden flex justify-center items-center">
        <div className="w-full h-full flex flex-row-reverse bg-primaryColor">
          <div className="w-full lg:w-[50%] flex flex-col justify-between p-10 items-center bg-primaryColor gap-10">
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
          <div className="w-[50%] bg-blue-500 hidden lg:flex flex-col gap-5 items-center overflow-hidden relative">
            <img
              src={loginScreenImg}
              alt="a laptop and a mobile on the desk"
              className="w-full h-full object-cover object-left blur-[1px]"
            />
            <div className="absolute w-full h-full top-0 left-0 p-7 bg-black bg-opacity-20">
              <div className="w-full h-full flex flex-col gap-10 justify-between">
                <div>
                  <p className="text-xl font-light text-primaryColor"></p>
                </div>
                <div className="w-[30%] h-auto flex">
                  <img
                    src={propSuiteLogo}
                    alt="PropSuite Logo"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
