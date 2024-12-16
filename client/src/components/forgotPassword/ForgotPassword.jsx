// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/loginRegister.webp";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      setError("");
      const response = await axios.post("/api/forgetpassword", { email });
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

  const handleVerifyOtp = async () => {
    try {
      setError("");
      const response = await axios.post("/api/verifyotp", { email, otp });
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

  const handleResetPassword = async () => {
    try {
      setError("");
      const response = await axios.post("/api/resetpassword", {
        email,
        password: newPassword,
      });
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
    <div className="w-full bg-white rounded-xl overflow-hidden text-[#121212] flex justify-center items-center">
      <div className="w-full h-full flex flex-row">
        <div className="w-[30%] bg-accentColor h-auto p-5 flex flex-col gap-5 items-center">
          <div className="w-[85%] aspect-[9/16] overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={loginImg}
              alt=""
            />
          </div>
        </div>
        <div className="w-[70%] flex flex-col gap-20 py-10 items-center">
          <div className="w-[55%] flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="uppercase text-4xl font-bold text-center">
                OTP Verification
              </div>
              <div className="text-gray-500 text-center">
                The OTP will be send to your phone number.
              </div>
            </div>
          </div>
          <div className="w-[55%] flex flex-col gap-3 justify-center items-center">
            {step === 1 && (
              <div className="w-full flex flex-col gap-3">
                <input
                  className="px-2 py-2 rounded-md bg-gray-100 outline-none"
                  type="email"
                  placeholder="Enter username/email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-accentColor rounded-md text-white capitalize py-2 px-5 mt-2"
                >
                  Send OTP
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="w-full flex flex-col gap-3">
                <input
                  className="px-2 py-2 rounded-md bg-gray-100 outline-none"
                  type="text"
                  placeholder="Enter OTP code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <p className="text-gray-600">
                  Time remaining: <span className="text-xl">{countdown}</span>{" "}
                  seconds
                </p>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-accentColor rounded-md text-white capitalize py-2 px-5 mt-2"
                >
                  Verify OTP
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="w-full flex flex-col gap-3">
                <input
                  className="px-2 py-2 rounded-md bg-gray-100 outline-none"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-accentColor rounded-md text-white capitalize py-2 px-5 mt-2"
                >
                  Reset Password
                </button>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="w-[55%] text-gray-500 text-center flex flex-col gap-2">
            <Link to="/">
              <div className="flex flex-row justify-center items-center gap-1">
                {" "}
                <span className="text-2xl">
                  <IoIosArrowRoundBack />
                </span>{" "}
                Go Back
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
