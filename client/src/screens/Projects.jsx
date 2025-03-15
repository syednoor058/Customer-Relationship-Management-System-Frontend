// import React from 'react'
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import { HiOutlinePlusCircle, HiSearch } from "react-icons/hi";
import { TbFilterPlus } from "react-icons/tb";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getProjects,
  getProjectStates,
} from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [page, setPage] = useState(10);
  const [state, setState] = useState(0);
  const [sort, setSort] = useState("no");

  const [projectStates, setProjectStates] = useState([]);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const assignEmployee = (id) => {
    navigate(`/dashboard/projects/assign-employee/${id}`);
  };
  const releaseEmployee = (id) => {
    navigate(`/dashboard/projects/release-employee/${id}`);
  };

  // const reload = async () => {
  //   try {
  //     const projectData = await getProjects();
  //     setProjects(projectData);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  const handleChangeState = (event) => {
    setState(event.target.value);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (err) {
        setError(err);
        // console.error(err);
      } finally {
        setIsLoading(false); // End loading after the request completes
      }
    };

    fetchProjects();
  }, [token]);

  useEffect(() => {
    const fetchProjectStates = async () => {
      try {
        const projectStatesData = await getProjectStates();
        setProjectStates(projectStatesData);
      } catch (err) {
        // setError(err);
        toast(err.message);
        // toast(error.message)
        // console.error(err);
      } finally {
        setIsLoading(false); // End loading after the request completes
      }
    };

    fetchProjectStates();
  }, [token]);

  if (isLoading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="flex flex-col gap-5 pb-10 font-light text-sm text-gray-600">
      <Outlet />

      <div className="w-full h-full flex flex-col gap-5 bg-primaryColor p-5 rounded-xl drop-shadow-xl border border-gray-200">
        <div className="flex flex-row justify-between">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
            <span className="text-4xl">
              <FcBriefcase />
            </span>
            All Projects
          </div>
          <Link
            to="/dashboard/add-project"
            className="px-3 py-3 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 justify-center items-center"
          >
            <span className="text-xl">
              <HiOutlinePlusCircle />
            </span>
            Add Project
          </Link>
        </div>
        <div className="mt-5 flex flex-row justify-between items-center gap-5">
          <div>
            <div className="w-[450px] relative">
              <HiSearch className="text-xl absolute top-[10px] left-2 z-[10]" />
              <input
                className="w-full ps-9 pe-2 py-2 rounded-md outline-none bg-transparent border-gray-400/60 border"
                type="text"
                placeholder="Search project"
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="text-sm p-2 aspect-square rounded-md drop-shadow-xl flex justify-center items-center border bg-accentColor/80 text-primaryColor">
              <TbFilterPlus />
            </div>
            <div className="flex flex-row gap-1 items-center">
              <div>Sort by:</div>
              <FormControl
                sx={{ m: 1, padding: 0, width: 120, fontSize: "14px" }}
                size="small"
              >
                <Select
                  id="rows-select3"
                  value={sort}
                  onChange={handleChangeSort}
                  sx={{ padding: 0, fontSize: "14px" }}
                >
                  <MenuItem value="no">New - Old</MenuItem>
                  <MenuItem value="on">Old - New</MenuItem>
                  <MenuItem value="low price">Low - High</MenuItem>
                  <MenuItem value="high price">High - Low</MenuItem>
                  <MenuItem value="alphabet">A - Z</MenuItem>
                  <MenuItem value="alphabet reverse">Z - A</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex flex-row gap-1 items-center">
              <div>State:</div>
              <FormControl sx={{ m: 1, width: 120 }} size="small">
                <Select
                  id="rows-select2"
                  value={state}
                  onChange={handleChangeState}
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem value={0}>All</MenuItem>
                  {projectStates?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.state_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          {error && <p className="text-red-500">{error}</p>}
          <table className="w-full border-collapse border border-gray-300">
            <thead className="w-full">
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className="w-[10%] text-center py-3 px-2">ID</th>
                <th className="w-[25%] text-start py-3 px-2">Name</th>
                <th className="w-[20%] text-start py-3 px-2">Address</th>
                <th className="w-[10%] text-center py-3 px-2">State</th>
                <th className="w-[10%] text-center py-3 px-2">Balance</th>
                <th className="w-[25%] text-center py-3 px-2">Employees</th>
              </tr>
            </thead>
            <tbody>
              {projects?.length > 0 ? (
                <>
                  {projects.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-100"
                      }`}
                    >
                      <td className="py-4 px-2 text-center">{index + 1}</td>
                      <td className="py-4 px-2 hover:text-blue-600 transition-colors duration-[350ms]">
                        <Link to={`/dashboard/projects/details/${item.id}`}>
                          {item.project_name}
                        </Link>
                      </td>
                      <td className="py-4 px-2">{item.address}</td>
                      <td className="py-4 px-2 text-center">
                        {item.state_name}
                      </td>
                      <td className="py-4 px-2 text-center">{item.balance}</td>
                      <td className="py-4 px-2 flex flex-row gap-2 justify-center items-center">
                        <div
                          className="cursor-pointer px-2 py-1 rounded-sm bg-blue-500 text-primaryColor"
                          onClick={() => assignEmployee(item?.id)}
                        >
                          Assign
                        </div>
                        <div
                          className="cursor-pointer px-2 py-1 rounded-sm border border-red-500 text-red-500"
                          onClick={() => releaseEmployee(item?.id)}
                        >
                          Remove
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-xl font-semibold text-gray-400"
                    >
                      <p>No items found!</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-1 items-center">
              <div>Rows per page:</div>
              <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select id="rows-select" value={page} onChange={handleChange}>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Pagination count={10} color="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
