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
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid username or password!");
    }
  };

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
        <div className="w-[70%] flex flex-col gap-10 py-10 items-center">
          <div className="w-[55%] flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="uppercase text-4xl font-bold text-center">
                Login Account
              </div>
              <div className="text-gray-500 text-center">
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
                  className="px-2 py-2 rounded-md bg-gray-100 outline-none"
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
                  className="px-2 py-2 rounded-md bg-gray-100 outline-none"
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
