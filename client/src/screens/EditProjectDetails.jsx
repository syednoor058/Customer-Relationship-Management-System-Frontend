import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { HiOutlineArchive, HiOutlineArrowSmLeft } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editProject,
  getProjectsById,
  getProjectStates,
} from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function EditProjectDetails() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [projectState, setProjectState] = useState(0);
  const [projectBalance, setProjectBalance] = useState(0);
  const [projectBudget, setProjectBudget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [floor, setFloor] = useState(0);
  const [totalUnit, setTotalUnit] = useState(0);
  const [floorPerUnit, setFloorPerUnit] = useState(0);
  const [totalShop, setTotalShop] = useState(0);
  const [perfloorShop, setPerfloorShop] = useState(0);
  const [states, setStates] = useState([]);
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [isCompleted, setIsCompleted] = useState(0);

  const handleCheckboxChange = (e) => {
    // Convert checkbox checked status (boolean) to 1 or 0
    setIsCompleted(e.target.checked ? 1 : 0);
  };

  const handleEditProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const editProjectData = await editProject(
        projectId,
        projectName,
        floor,
        totalUnit,
        floorPerUnit,
        isCompleted,
        totalShop,
        perfloorShop,
        projectAddress,
        projectState,
        projectBudget,
        projectBalance
      );
      clearAllData();
      navigate(`/dashboard/projects/details/${projectId}`);
      toast(editProjectData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = () => {
    setProjectName("");
    setFloor(0);
    setTotalUnit(0);
    setFloorPerUnit(0);
    setTotalShop(0);
    setPerfloorShop(0);
    setProjectAddress("");
    setProjectState(0);
    setProjectBalance(0);
    setProjectBudget(0);
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const statesData = await getProjectStates();
        setStates(statesData);
        const projectData = await getProjectsById(projectId);
        setProjectName(projectData.project_name);
        setFloor(projectData.total_floor);
        setTotalUnit(projectData.total_unit);
        setFloorPerUnit(projectData.per_floor_unit);
        setTotalShop(projectData.total_shop);
        setPerfloorShop(projectData.per_floor_shop);
        setProjectAddress(projectData.address);
        setProjectState(projectData.state_id);
        setProjectBalance(projectData.balance);
        setProjectBudget(projectData.budget);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId, token]);

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }
  return (
    <div className="w-full h-full flex flex-row gap-5 justify-between pb-10 font-light text-gray-600">
      <div className="w-[75%] flex flex-col gap-7 rounded-xl border border-gray-200 drop-shadow-xl bg-primaryColor p-5">
        <div className="flex flex-row justify-between items-center">
          <Link
            to={`/dashboard/projects/details/${projectId}`}
            className="py-2 rounded text-gray-600 flex flex-row gap-2 items-center justify-center"
          >
            <span className="text-xl">
              <HiOutlineArrowSmLeft />
            </span>
            Back
          </Link>
          <Link
            to="/dashboard/projects"
            className="px-3 py-3 rounded bg-accentColor text-primaryColor flex flex-row gap-2 items-center justify-center"
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
          Edit Project
        </div>
        <div className="w-full flex flex-row gap-5 justify-between">
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleEditProjectSubmit}
          >
            <div className="flex flex-col gap-5">
              <div className="text-lg font-semibold text-gray-700">
                General Information
              </div>
              <div className="flex flex-row gap-20">
                <div className="w-[50%] flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <div>Name</div>
                    <input
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
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
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
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
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none capitalize"
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
                  <div className="w-full flex flex-col gap-1">
                    <div>Total Floor</div>
                    <input
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                      type="number"
                      min={0}
                      value={floor || 0}
                      onChange={(e) => setFloor(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="w-[50%] flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-1">
                    <div>Total Unit</div>
                    <input
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                      type="number"
                      min={0}
                      value={totalUnit || 0}
                      onChange={(e) => setTotalUnit(Number(e.target.value))}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <div>Unit/Floor</div>
                    <input
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                      type="number"
                      min={0}
                      value={floorPerUnit || 0}
                      onChange={(e) => setFloorPerUnit(Number(e.target.value))}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <div>Total Shop</div>
                    <input
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                      type="number"
                      min={0}
                      value={totalShop || 0}
                      onChange={(e) => setTotalShop(Number(e.target.value))}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <div>Shop/Floor</div>
                    <input
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                      type="number"
                      min={0}
                      value={perfloorShop || 0}
                      onChange={(e) => setPerfloorShop(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="text-lg font-semibold text-gray-700">
                Budget and Balance
              </div>
              <div className="flex flex-row gap-20">
                <div className="w-[50%] flex flex-col gap-1">
                  <div>Budget</div>
                  <input
                    className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    type="number"
                    value={projectBudget}
                    min={0}
                    onChange={(e) => setProjectBudget(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="w-[50%] flex flex-col gap-1">
                  <div>Balance</div>
                  <input
                    className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    type="number"
                    min={0}
                    value={projectBalance}
                    onChange={(e) => setProjectBalance(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <input
                  type="checkbox"
                  checked={isCompleted === 1}
                  onChange={handleCheckboxChange}
                />
                <label>Mark as completed.</label>
              </div>
              <div className="flex flex-row gap-5 justify-center pt-5">
                <div className="flex">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-primaryColor rounded"
                  >
                    Save
                  </button>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => clearAllData()}
                    className="px-5 py-2 border border-gray-400 text-gray-500 rounded"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
