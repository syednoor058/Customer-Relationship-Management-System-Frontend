// import React from 'react'

import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { getProjects } from "../components/apiServices/projectAPIServices";
import { addUser } from "../components/apiServices/userAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

function AddUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("shikderFoundationAuthToken");

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const addUserData = await addUser(name, email, password, projectId);
      setName("");
      setEmail("");
      setProjectId(0);
      setPassword("");
      toast(addUserData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setProjectId(0);
    setPassword("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProjects();
        setProjects(projectData);
      } catch (err) {
        // setError(err);
        toast(err.message);
        // toast(error.message)
        // console.error(err);
      } finally {
        setLoading(false); // End loading after the request completes
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full h-full flex flex-row gap-5 justify-between pb-10 font-light text-gray-500 px-3 lg:px-0 pt-5">
      <div className="w-full flex flex-col gap-7 rounded-sm lg:p-5">
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800">
          <span className="text-2xl lg:text-3xl">
            <FcPlus />
          </span>
          <span>Add New User</span>
        </div>
        <div className="w-full lg:w-[50%] flex flex-row gap-5 justify-between border border-blue-100 drop-shadow-md bg-primaryColor p-3 lg:p-6">
          <form
            className="w-full flex flex-col gap-7"
            onSubmit={handleAddUserSubmit}
          >
            <div className="w-full flex flex-col gap-5 lg:gap-5">
              <div className="w-full flex flex-col gap-5">
                <div className="text-lg font-semibold text-gray-600">
                  General Information
                </div>

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
                  <div className="w-full flex flex-col gap-1">
                    <div>Password</div>
                    <input
                      className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                      type="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
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
                    <HiOutlinePlusCircle />
                  </span>
                  Add User
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
      </div>
    </div>
  );
}

export default AddUsers;
