// import React from 'react'
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiSearch,
} from "react-icons/hi";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemove } from "react-icons/io5";
import { MdClose, MdDeleteOutline, MdOutlineDone } from "react-icons/md";
import { TbFilterPlus } from "react-icons/tb";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProject,
  editProject,
  getProjects,
  getProjectStates,
} from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function Projects() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ type: "", data: null });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [page, setPage] = useState(10);
  const [state, setState] = useState(0);
  const [sort, setSort] = useState("no");
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectAddress, setEditProjectAddress] = useState(0);
  const [editProjectState, setEditProjectState] = useState(0);
  const [editProjectBalance, setEditProjectBalance] = useState(0);
  const [editProjectBudget, setEditProjectBudget] = useState(0);

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

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  const handleChangeState = (event) => {
    setState(event.target.value);
  };

  const viewProjectPopup = (project) => {
    setPopup({ type: "view", data: project });
  };

  const editProjectPopup = (project) => {
    setPopup({ type: "edit", data: project });
    setEditProjectName(project.project_name);
    setEditProjectAddress(project.address);
    setEditProjectState(project.state_id);
    setEditProjectBudget(project.budget);
    setEditProjectBalance(project.balance);
  };

  const deleteProjectPopup = (project) => {
    setPopup({ type: "delete", data: project });
  };

  const handleEditProjectSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const editProjectData = await editProject(
        popup.data?.id,
        editProjectName,
        editProjectAddress,
        editProjectState,
        editProjectBudget,
        editProjectBalance
      );

      toast(editProjectData.message);
      setPopup({ type: "", data: null });
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearEditProjectData = () => {
    setEditProjectName("");
    setEditProjectAddress("");
    setEditProjectBudget(0);
    setEditProjectBalance(0);
    setEditProjectState(0);
  };

  const handleProjectDelete = async (_id) => {
    setIsLoading(true);
    try {
      const deleteProjectData = await deleteProject(_id);

      toast(deleteProjectData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
      setPopup({ type: "", data: null });
    }
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
      {popup.type !== "" && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50 overflow-y-auto">
          {popup.type === "view" && (
            <div className="p-10 bg-primaryColor w-[50%] rounded-lg relative">
              <div
                onClick={() => setPopup({ type: "", data: null })}
                className="flex flex-row items-center gap-1 font-light absolute top-5 right-5 cursor-pointer hover:text-red-600 duration-500"
              >
                <span>
                  <MdClose />
                </span>{" "}
                Close
              </div>
              <div className="w-full flex flex-col gap-5">
                <div className="font-medium text-lg border-b border-gray-400 pb-1">
                  Project Details
                </div>
                <div className="flex flex-col gap-3">
                  <div className="capitalize">
                    Project Name: {popup.data?.project_name}
                  </div>
                  <div className="capitalize">
                    Address: {popup.data?.address}
                  </div>
                  <div className="capitalize">
                    State: {popup.data?.state_name}
                  </div>
                  <div className="capitalize">Budget: {popup.data?.budget}</div>
                  <div className="capitalize">
                    Balance: {popup.data?.balance}
                  </div>
                  <div className="capitalize">Added By: {popup.data?.name}</div>
                  <div className="capitalize">
                    Created At: {popup.data?.created_at}
                  </div>
                  <div className="capitalize">
                    Updated At: {popup.data?.updated_at}
                  </div>
                </div>
              </div>
            </div>
          )}
          {popup.type === "edit" && (
            <div className="p-10 bg-primaryColor w-[60%] rounded-lg relative overflow-x-hidden overflow-y-auto mt-32">
              <div
                onClick={() => setPopup({ type: "", data: null })}
                className="flex flex-row items-center gap-1 font-light absolute top-5 right-5 cursor-pointer hover:text-red-600 duration-500"
              >
                <span>
                  <MdClose />
                </span>{" "}
                Close
              </div>
              <div className="w-full flex flex-col gap-5">
                <div className="font-medium text-lg border-b border-gray-400 pb-1">
                  Update Project Details
                </div>
                <div className="w-full flex flex-row gap-5 justify-between">
                  <form
                    className="w-full flex flex-col gap-5"
                    onSubmit={handleEditProjectSubmit}
                  >
                    <div className="w-full flex flex-col gap-5">
                      <div className="text-lg font-semibold text-gray-700">
                        General Information
                      </div>

                      <div className="flex flex-col gap-1">
                        <div>Name</div>
                        <input
                          className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                          type="text"
                          placeholder="Enter project name"
                          value={editProjectName}
                          onChange={(e) => setEditProjectName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div>Address</div>
                        <input
                          className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                          type="text"
                          placeholder="Enter project address"
                          value={editProjectAddress}
                          onChange={(e) =>
                            setEditProjectAddress(e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label>State</label>
                        <select
                          className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none capitalize"
                          value={editProjectState}
                          onChange={(e) => setEditProjectState(e.target.value)}
                          required
                        >
                          <option value={0} disabled>
                            Select a state
                          </option>

                          {projectStates?.length === 0 ? (
                            <>
                              <option disabled className="text-center">
                                No state found!
                              </option>
                            </>
                          ) : (
                            <>
                              {projectStates.map((item, index) => (
                                <option
                                  key={index}
                                  value={item.id}
                                  className="capitalize"
                                >
                                  {item.state_name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                      <div className="text-lg font-semibold text-gray-700">
                        Budget and Balance
                      </div>
                      <div className="flex flex-row gap-5">
                        <div className="w-[50%] flex flex-col gap-1">
                          <div>Budget</div>
                          <input
                            className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                            type="number"
                            value={editProjectBudget}
                            onChange={(e) =>
                              setEditProjectBudget(e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="w-[50%] flex flex-col gap-1">
                          <div>Balance</div>
                          <input
                            className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                            type="number"
                            value={editProjectBalance}
                            onChange={(e) =>
                              setEditProjectBalance(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-3 justify-start">
                        <div className="flex">
                          <button
                            type="submit"
                            className="w-40 px-3 py-3 bg-accentColor text-primaryColor rounded-md text-center flex flex-row gap-2 justify-center items-center"
                          >
                            <span className="text-xl">
                              <MdOutlineDone />
                            </span>
                            Edit Project
                          </button>
                        </div>
                        <div className="flex">
                          <button
                            onClick={() => clearEditProjectData()}
                            className="w-36 px-3 py-3 bg-gray-200 text-accentColor rounded-md text-center flex flex-row gap-2 items-center justify-center"
                          >
                            <span className="text-xl">
                              <MdDeleteOutline />
                            </span>
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {popup.type === "delete" && (
            <div className="p-10 bg-primaryColor w-[50%] rounded-lg relative flex flex-col gap-5">
              <div className="w-full text-center">
                Confirm you want to delete this project?
              </div>
              <div className="w-full flex flex-row justify-center gap-10">
                <button
                  onClick={() => handleProjectDelete(popup.data?.id)}
                  className="px-5 py-2 rounded bg-red-600 text-primaryColor"
                >
                  Delete
                </button>
                <button
                  onClick={() => setPopup({ type: "", data: null })}
                  className="px-5 py-2 rounded bg-gray-300 text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <Outlet />

      {/* <div className="grid grid-cols-4 gap-3">
        <DashboardCards
          title="Total Leads"
          number="19"
          desc="Last Month"
          icon={<HiUsers />}
          iconColor="bg-[#0ea5e9]/80"
        />
        <DashboardCards
          title="Total Categories"
          number="4"
          desc="Last Month"
          icon={<MdDashboardCustomize />}
          iconColor="bg-[#6a0dad]/80"
        />

        <DashboardCards
          title="Total Products"
          number="52"
          desc="Last Month"
          icon={<HiArchive />}
          iconColor="bg-[#0ea5e9]/80"
        />
        <DashboardCards
          title="Total Sales"
          number="$4487"
          desc="Last Month"
          icon={<HiCurrencyDollar />}
          iconColor="bg-[#6a0dad]/80"
        />
      </div> */}
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
                <th className="w-[5%] text-center py-3 px-2">ID</th>
                <th className="w-[20%] text-start py-3 px-2">Name</th>
                <th className="w-[20%] text-start py-3 px-2">Address</th>
                <th className="w-[15%] text-center py-3 px-2">State</th>
                <th className="w-[40%] text-center py-3 px-2">Actions</th>
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
                      <td className="py-4 px-2">{item.project_name}</td>
                      <td className="py-4 px-2">{item.address}</td>
                      <td className="py-4 px-2 text-center">
                        {item.state_name}
                      </td>
                      <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                        <div
                          className="cursor-pointer"
                          onClick={() => viewProjectPopup(item)}
                        >
                          <HiOutlineEye />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => assignEmployee(item?.id)}
                        >
                          <IoMdPersonAdd />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => releaseEmployee(item?.id)}
                        >
                          <IoPersonRemove />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => editProjectPopup(item)}
                        >
                          <HiOutlinePencilAlt />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteProjectPopup(item)}
                        >
                          <HiOutlineTrash className="text-red-500" />
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
