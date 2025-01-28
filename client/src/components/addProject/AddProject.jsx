import { useEffect, useState } from "react";
import { FcBusinessman, FcOpenedFolder, FcPlus } from "react-icons/fc";
import { HiOutlineArchive, HiOutlineArrowSmLeft } from "react-icons/hi";
import { MdDeleteOutline, MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addProject,
  getProjectStates,
} from "../apiServices/projectAPIServices";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [projectState, setProjectState] = useState(0);
  const [projectBalance, setProjectBalance] = useState(0);
  const [projectBudget, setProjectBudget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const token = localStorage.getItem("shikderFoundationAuthToken");

  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const addProjectData = await addProject(
        projectName,
        projectAddress,
        projectState,
        projectBudget,
        projectBalance
      );
      setProjectName("");
      setProjectAddress("");
      setProjectState(0);
      setProjectBalance(0);
      setProjectBudget(0);

      toast(addProjectData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = () => {
    setProjectName("");
    setProjectAddress("");
    setProjectState(0);
    setProjectBalance(0);
    setProjectBudget(0);
  };

  useEffect(() => {
    const fetchProjectStates = async () => {
      try {
        const statesData = await getProjectStates();
        setStates(statesData);
        // console.log(states);
      } catch (err) {
        // setError(err);
        toast(err.message);
        // toast(error.message)
        // console.error(err);
      } finally {
        setLoading(false); // End loading after the request completes
      }
    };

    fetchProjectStates();
  }, [token]);

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full h-full flex flex-row gap-5 justify-between pb-10 font-light text-gray-600">
      <div className="w-[75%] flex flex-col gap-7 rounded-xl border border-gray-200 drop-shadow-xl bg-primaryColor p-5">
        <div className="flex flex-row justify-between items-center">
          <Link
            to="/dashboard"
            className="py-2 rounded-md text-gray-600 flex flex-row gap-2 items-center justify-center"
          >
            <span className="text-xl">
              <HiOutlineArrowSmLeft />
            </span>
            Dashboard
          </Link>
          <Link
            to="/dashboard/all-projects"
            className="px-3 py-3 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 items-center justify-center"
          >
            <span className="text-xl">
              <HiOutlineArchive />
            </span>
            All Projects
          </Link>
        </div>
        <div className="font-semibold text-2xl flex flex-row gap-3 items-center text-gray-900">
          <span className="text-4xl">
            <FcPlus />
          </span>
          Add New Project
        </div>
        <div className="w-full flex flex-row gap-5 justify-between">
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleAddProjectSubmit}
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
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>Address</div>
                <input
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                  type="text"
                  placeholder="Enter project address"
                  value={projectAddress}
                  onChange={(e) => setProjectAddress(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>State</label>
                <select
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none capitalize"
                  value={projectState}
                  onChange={(e) => setProjectState(e.target.value)}
                  required
                >
                  <option value={0} disabled>
                    Select a state
                  </option>

                  {states?.length === 0 ? (
                    <>
                      <option disabled className="text-center">
                        No state found!
                      </option>
                    </>
                  ) : (
                    <>
                      {states.map((item, index) => (
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
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(e.target.value)}
                    required
                  />
                </div>
                <div className="w-[50%] flex flex-col gap-1">
                  <div>Balance</div>
                  <input
                    className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                    type="number"
                    value={projectBalance}
                    onChange={(e) => setProjectBalance(e.target.value)}
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
                    Add Project
                  </button>
                </div>
                <div className="flex">
                  <button
                    onClick={() => clearAllData()}
                    className="w-36 px-3 py-3 bg-gray-200 text-accentColor rounded-md text-center flex flex-row gap-2 items-center justify-center"
                  >
                    <span className="text-xl">
                      <MdDeleteOutline />
                    </span>
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[25%] flex flex-col gap-5 text-gray-100">
        <div className="flex flex-col rounded-xl drop-shadow-xl gap-5 bg-gradient-to-tr from-accentColor/80 to-[#6a0dad]/80 p-5 relative">
          <div className="text-xl font-semibold flex flex-row gap-2 items-center text-primaryColor">
            <span className="text-2xl">
              <FcOpenedFolder />
            </span>
            Top Categories
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-light">Tripol (19)</div>
            <div className="font-light">House Materials (7)</div>
            <div className="font-light">Raw Materials (21)</div>
            <div className="font-light">Machine and Stuffs (4)</div>
            <div className="font-light pe-6">Hardwares (6)</div>
          </div>
          <Link className="text-5xl absolute bottom-2 right-2">
            <FcPlus />
          </Link>
        </div>
        <div className="flex flex-col rounded-xl drop-shadow-xl gap-5 bg-gradient-to-tr from-[#0ea5e9]/80 to-[#3b82f6]/80 p-5 relative">
          <div className="text-xl font-semibold flex flex-row gap-2 items-center text-primaryColor">
            <span className="text-3xl">
              <FcBusinessman />
            </span>
            Recent Vendors
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-light">Syed Shaeduzzaman Noor</div>
            <div className="font-light">Mazharul Islam</div>
            <div className="font-light">Kazi Fahim Sharar</div>
            <div className="font-light">Naim Rahman</div>
            <div className="font-light pe-6">Md Farhan Fuad</div>
          </div>
          <Link className="text-5xl absolute bottom-2 right-2">
            <FcPlus />
          </Link>
        </div>
      </div>
    </div>
  );
}
