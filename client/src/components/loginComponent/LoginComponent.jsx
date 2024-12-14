// import React from "react";
import loginImg from "../../assets/images/loginRegister.webp";

export default function LoginComponent() {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden text-[#121212] flex justify-center items-center">
      <div className="w-full h-full flex flex-row gap-10">
        <div className="w-[40%] bg-accentColor h-auto px-5 py-10 flex flex-col gap-5 items-center">
          <div className="w-[50%] aspect-square">
            <img className="w-full h-full object-cover" src={loginImg} alt="" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="text-base font-semibold text-white">
                Quick and free sign-up
              </div>
              <div className="font-light text-gray-200 text-sm">
                Enter your e-mail address to create an account.
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-base font-semibold text-white">
                Automate your work
              </div>
              <div className="font-light text-gray-200 text-sm">
                Focus on bringing sales while CRM will manage all the rest.
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-base font-semibold text-white">
                Something for everyone
              </div>
              <div className="font-light text-gray-200 text-sm">
                The best customer experience you will ever find.
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] flex flex-col gap-16 py-10">
          <div className="flex flex-col gap-5">
            <div className="text-4xl uppercase font-bold text-center leading-none">
              <span className="text-accentColor">Sikder</span> Foundation
              <span className="text-accentColor">.</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="capitalize text-2xl font-medium text-center">
                Login Account
              </div>
              <div className="text-gray-500 text-center">
                Sign in with your registered login credentials.
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <form className="flex flex-col gap-3 w-[50%]">
              <div className="flex flex-col gap-1">
                <div>Email/Username</div>
                <input
                  className="px-2 py-2 rounded-md bg-gray-100 outline-none"
                  type="text"
                  placeholder="example@email.com"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>Password</div>
                <input
                  className="px-2 py-2 rounded-md bg-gray-100 outline-none"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button className="w-full bg-accentColor rounded-md text-white capitalize py-2 px-5 mt-2">
                Log In
              </button>
            </form>
          </div>
          <div className="text-gray-500 text-center">
            You don&apos;t have an account?{" "}
            <span className="font-semibold text-accentColor capitalize">
              Create Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
