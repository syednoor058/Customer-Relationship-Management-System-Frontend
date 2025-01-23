// import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/loginRegister.webp";
// import logo from "../../assets/images/logo.png";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`${import.meta.env.VITE_SIKDER_CMS_APP_API}/api/login`);
      const response = await axios.post(
        `${import.meta.env.VITE_SIKDER_CMS_APP_API}/api/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("shikderFoundationAuthToken", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden flex justify-center items-center border border-gray-200">
      <div className="w-full h-full flex flex-row bg-primaryColor">
        <div className="w-[30%] bg-gradient-to-tr from-accentColor/90 to-[#0ea5e9]/80 h-auto p-5 flex flex-col gap-5 items-center">
          <div className="w-[85%] aspect-[9/16] overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={loginImg}
              alt=""
            />
          </div>
        </div>
        <div className="w-[70%] flex flex-col gap-10 py-10 items-center bg-primaryColor">
          <div className="w-[55%] flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="uppercase text-4xl font-bold text-center text-gray-900">
                Login Account
              </div>
              <div className="text-gray-600 text-center">
                Sign in with your registered login credentials.
              </div>
            </div>
          </div>
          <div className="w-[55%] flex justify-center items-center">
            <form
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1">
                <div>Email/Username</div>
                <input
                  className="py-2 border-b border-gray-300 bg-primaryColor outline-none"
                  type="text"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>Password</div>
                <input
                  className="py-2 border-b border-gray-300 bg-primaryColor outline-none"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button className="w-full bg-accentColor rounded-md text-white capitalize py-2 px-5 mt-2">
                Log In
              </button>
            </form>
          </div>
          <div className="w-[55%] text-gray-500 text-center flex flex-col gap-2">
            <p>
              <Link to="/forget-password">Forgot password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
