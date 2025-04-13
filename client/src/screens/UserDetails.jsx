// import React from 'react'

import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdImageNotSupported } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleUser } from "../components/apiServices/userAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

function UserDetails() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const token = localStorage.getItem("shikderFoundationAuthToken");
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const usertDetails = await getSingleUser(userId);
        setUser(usertDetails);
        // console.log(usertDetails);
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col pt-5 gap-10 pb-10 font-light text-sm text-gray-600">
      <div className="w-full flex flex-col gap-5 px-3 lg:px-0">
        <div className="w-full text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-col gap-2">
          <Link to="/dashboard/users">
            <div className="flex flex-row gap-1  rounded-xl">
              <span className="text-4xl">
                <IoIosArrowRoundBack />
              </span>
            </div>
          </Link>
        </div>
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800 py-2 lg:py-4">
          <h1>User Details</h1>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-7 lg:gap-20">
          <div className="w-full hidden lg:w-[50%] aspect-square bg-blue-100 rounded-sm">
            <div className="w-full h-full flex flex-col justify-center items-center p-10 gap-2">
              <div className="text-4xl">
                <MdImageNotSupported />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-gray-800 text-center">
                  No image found
                </p>
                <p className="text-base font-light text-gray-600 text-center">
                  SVG, PNG, or JPG
                </p>
                <p className="text-sm font-light text-gray-400 text-center">
                  Recommended size (1000px*1000px)
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%] flex flex-col gap-10 text-sm">
            <div className="flex flex-col gap-4">
              <table>
                <tbody>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Name:</td>
                    <td className="font-medium">{user?.name}</td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">User ID:</td>
                    <td className="font-medium">{user?.id}</td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Email:</td>
                    <td className="font-medium">{user?.email}</td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Project Name:</td>
                    <td className="font-medium">{user?.project_name}</td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Created at:</td>
                    <td className="font-medium">{user?.created_at}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
