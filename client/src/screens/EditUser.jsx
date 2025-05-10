// import React from 'react'

import { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDeleteOutline, MdOutlineSave } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjects } from "../components/apiServices/projectAPIServices";
import {
  editUser,
  editUserPassword,
  getSingleUser,
} from "../components/apiServices/userAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

function EditUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const handleReset = () => {
    setName("");
    setEmail("");
    setProjectId(0);
  };
  const handleResetPass = () => {
    setPassword("");
  };
  const handleResetUserPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const editUserPasswordData = await editUserPassword(userId, password);
      navigate(`/dashboard/users`);
      toast.success(editUserPasswordData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const editUserData = await editUser(userId, name, email, projectId);
      navigate(`/dashboard/users`);
      toast.success(editUserData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const userDetails = await getSingleUser(userId);
        const projectsData = await getProjects();

        setName(userDetails.name);
        setEmail(userDetails.email);
        setProjectId(
          () =>
            projectsData.find(
              (project) => project.project_name === userDetails.project_name
            ).id
        );
        setProjects(projectsData);
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
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full h-full flex flex-row gap-5 justify-between pb-10 font-light text-gray-500 px-3 lg:px-0 pt-5">
      <div className="w-full flex flex-col gap-7 rounded-sm lg:p-5">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-full text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-col gap-2">
            <Link to="/dashboard/users">
              <div className="flex flex-row gap-1  rounded-sm">
                <span className="text-4xl">
                  <IoIosArrowRoundBack />
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800">
          <span className="text-2xl lg:text-3xl">
            <FcInfo />
          </span>
          <span>Edit User</span>
        </div>
        <div className="w-full lg:w-[50%] flex flex-row gap-5 justify-between border border-blue-100 drop-shadow-md bg-primaryColor p-3 lg:p-6">
          <form
            className="w-full flex flex-col gap-7"
            onSubmit={handleEditUserSubmit}
          >
            <div className="w-full flex flex-col gap-5 lg:gap-5">
              <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <div>Name</div>
                  <input
                    className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <div>Email</div>
                  <input
                    className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label>Project</label>
                    <select
                      className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                    >
                      <option value={0} disabled>
                        Select a project
                      </option>

                      {projects.length === 0 ? (
                        <>
                          <option disabled className="text-center">
                            No project found!
                          </option>
                        </>
                      ) : (
                        <>
                          {projects.map((item, index) => (
                            <option
                              key={index}
                              value={item.id}
                              className="capitalize"
                            >
                              {item.project_name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row gap-3 justify-start items-center">
              <div className="flex">
                <button
                  type="submit"
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl">
                    <MdOutlineSave />
                  </span>
                  Save
                </button>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm border border-blue-500 text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl text-blue-500">
                    <MdDeleteOutline />
                  </span>
                  Discard
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800">
          <span className="text-2xl lg:text-3xl">
            <FcInfo />
          </span>
          <span>Reset User Password</span>
        </div>
        <div className="w-full lg:w-[50%] flex flex-row gap-5 justify-between border border-blue-100 drop-shadow-md bg-primaryColor p-3 lg:p-6">
          <form
            className="w-full flex flex-col gap-7"
            onSubmit={handleResetUserPasswordSubmit}
          >
            <div className="w-full flex flex-col gap-5 lg:gap-5">
              <div className="w-full flex flex-col gap-1">
                <div>Password</div>
                <input
                  className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                  type="password"
                  value={password}
                  placeholder="Enter new password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-full flex flex-row gap-3 justify-start items-center">
              <div className="flex">
                <button
                  type="submit"
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl">
                    <MdOutlineSave />
                  </span>
                  Reset
                </button>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={handleResetPass}
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm border border-blue-500 text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl text-blue-500">
                    <MdDeleteOutline />
                  </span>
                  Discard
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
