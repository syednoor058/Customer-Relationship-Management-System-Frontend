// import React from "react";
import loginImg from "../../assets/images/loginRegister.webp";
// import logo from "../../assets/images/logo.png";

export default function LoginComponent() {
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
          {/* <div className="flex flex-col gap-5">
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
          </div> */}
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
            <form className="w-full flex flex-col gap-3">
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
          <div className="w-[55%] text-gray-500 text-center flex flex-col gap-2">
            <div>Forgot password?</div>
            <div>
              You don&apos;t have an account?{" "}
              <span className="font-semibold text-accentColor capitalize">
                Create Account
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
