import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  getCompletedProjectInfoById,
  getCompletedProjects,
  postCompletedProjectInfo,
} from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function CompleteInfo() {
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [selectedProject, setSelectedProject] = useState(0);
  const [info, setInfo] = useState([]);
  const [checkProject, setCheckProject] = useState(0);
  const [projects, setProjects] = useState([]);
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      floor: "",
      unit: "",
      unitCost: 0,
      unitPrice: 0,
    },
  ]);
  const [loading, setLoading] = useState(true);

  const checkInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const getProjectData = await getCompletedProjectInfoById(checkProject);
      setInfo(getProjectData);
      //   console.log(getProjectData);
      setCheckProject(0);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCheckProject(0);
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await getCompletedProjects();

        setProjects(getData);
      } catch (error) {
        toast.error(error.message || "Failed to fetch completed projects data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Handle row operations
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        floor: "",
        unit: "",
        unitCost: 0,
        unitPrice: 0,
      },
    ]);
  };

  const handleDeleteRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // Handle input changes with validation
  const handleRowChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const update = { ...row };

        // Handle numeric fields
        if (["unitCost", "unitPrice"].includes(field)) {
          const numValue = parseFloat(value) || 0;
          update[field] = numValue;
        } else {
          update[field] = value;
        }

        return update;
      }
      return row;
    });

    setRows(updatedRows);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !selectedProject ||
      rows.some(
        (row) =>
          !row.floor || !row.unit || row.unitCost <= 0 || row.unitPrice <= 0
      )
    ) {
      return toast.error("Please fill all required fields correctly");
    }

    const payload = {
      info: rows.map((row) => ({
        floor: row.floor,
        unit: row.unit,
        unit_cost: row.unitCost,
        unit_price: row.unitPrice,
      })),
    };

    try {
      const purchase = await postCompletedProjectInfo(
        selectedProject,
        payload.info
      );
      toast.success(purchase.message || "Info saved successfully");
      handleCancel();
    } catch (error) {
      toast.error(error.message || "Failed to save info");
    }
  };

  // Reset form
  const handleCancel = () => {
    setSelectedProject(0);
    setRows([
      {
        id: Date.now(),
        floor: "",
        unit: "",
        unitCost: 0,
        unitPrice: 0,
      },
    ]);
  };

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full text-gray-600 pb-10 flex flex-col gap-10">
      <div className="flex flex-col gap-10 p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200">
        <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900 capitalize">
          <h1>Add Complete Project Info</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col divide-y-[1px] divide-gray-200"
        >
          <div className="w-full grid grid-cols-3 gap-10 pb-10">
            <div className="flex flex-col gap-1">
              <label>Completed Project</label>
              <select
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                value={selectedProject}
                onChange={(e) => setSelectedProject(Number(e.target.value))}
                required
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
                    {projects?.map((item) => (
                      <option
                        key={item.id}
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
          <div className="flex flex-col gap-3 py-10">
            <div className="w-full flex flex-row gap-5 border border-gray-400 bg-gray-200 divide-x-[1px] px-5">
              <div className="w-[20%] py-3">Floor</div>
              <div className="w-[20%] py-3">Unit</div>
              <div className="w-[20%] py-3">Unit Cost</div>
              <div className="w-[20%] py-3">Unit Price</div>
              <div className="w-[20%] py-3"></div>
            </div>
            <div className="flex flex-col gap-3">
              {rows?.map((row, index) => (
                <div key={row.id} className="w-full flex gap-5">
                  {/* Floor input  */}
                  <input
                    className="w-[20%] px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    type="text"
                    placeholder="Enter floor"
                    value={row.floor}
                    onChange={(e) =>
                      handleRowChange(row.id, "floor", e.target.value)
                    }
                    required
                  />

                  <input
                    className="w-[20%] px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    type="text"
                    placeholder="Enter unit"
                    value={row.unit}
                    onChange={(e) =>
                      handleRowChange(row.id, "unit", e.target.value)
                    }
                    required
                  />

                  <input
                    type="number"
                    placeholder="Unit cost"
                    className="w-[20%] p-2 border rounded outline-none"
                    min={1}
                    value={row.unitCost}
                    onChange={(e) =>
                      handleRowChange(row.id, "unitCost", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    placeholder="Unit price"
                    className="w-[20%] p-2 border rounded outline-none"
                    min={1}
                    value={row.unitPrice}
                    onChange={(e) =>
                      handleRowChange(row.id, "unitPrice", e.target.value)
                    }
                  />

                  <div className="w-[20%] flex gap-2 text-xl items-center px-5">
                    {rows.length > 1 && (
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className=" text-red-500 hover:text-red-600"
                      >
                        <MdOutlineDelete />
                      </button>
                    )}
                    {index === rows.length - 1 && (
                      <button onClick={handleAddRow}>
                        <IoIosAddCircleOutline />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-row gap-5 justify-end items-center pt-10">
            <div className="flex">
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-primaryColor rounded"
              >
                Save Info
              </button>
            </div>
            <div className="flex">
              <button
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
        <div className="flex flex-col gap-5">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
            <h1>Check Completed Project Info</h1>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              <div className="w-full grid grid-cols-3 gap-10">
                <form className="flex flex-col gap-5" onSubmit={checkInfo}>
                  <div className="flex flex-col gap-2">
                    <label>Completed Project</label>
                    <select
                      className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                      value={checkProject}
                      onChange={(e) => setCheckProject(Number(e.target.value))}
                      required
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
                          {projects?.map((item) => (
                            <option
                              key={item.id}
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
                  <div className="flex flex-row gap-5">
                    <div className="flex">
                      <button
                        type="submit"
                        className="px-5 py-3 bg-blue-600 text-primaryColor rounded"
                      >
                        Check
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-3 border border-blue-600 text-blue-600 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {info.length > 0 && (
        <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-10">
              <h1 className="w-full text-2xl font-bold flex flex-row gap-3 items-center text-gray-900 text-center  justify-center uppercase">
                Completed Project Info
              </h1>
              <div className="w-full flex flex-row justify-between items-center">
                <p className=" flex flex-row gap-2">
                  <span>Name:</span>
                  <span className="font-semibold uppercase">
                    {info[0].project_name}
                  </span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>ID:</span>
                  <span>{info[0].project_id}</span>
                </p>
              </div>
            </div>

            {info.length > 0 && (
              <div className="flex flex-col gap-10">
                {info.map((item) => (
                  <div
                    key={item.id}
                    className="w-full grid grid-cols-3 gap-x-10 gap-y-5 p-5 border border-dashed border-gray-400"
                  >
                    <div className="flex flex-row gap-3">
                      <span>ID:</span>
                      <span className="font-semibold">{item.id}</span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Floor:</span>
                      <span className="font-semibold">{item.floor}</span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Unit:</span>
                      <span className="font-semibold">{item.unit}</span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Unit cost:</span>
                      <span className="font-semibold">{item.unit_cost}</span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Unit price:</span>
                      <span className="font-semibold">{item.unit_price}</span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Area:</span>
                      <span className="font-semibold">
                        {item.area || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Shop:</span>
                      <span className="font-semibold">
                        {item.shop || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Shop advanced:</span>
                      <span className="font-semibold">
                        {item.shop_advanced || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Shop cost:</span>
                      <span className="font-semibold">
                        {item.shop_cost || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Shop rent:</span>
                      <span className="font-semibold">
                        {item.shop_rent || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Created at:</span>
                      <span className="font-semibold">{item.created_at}</span>
                    </div>
                    <div className="flex flex-row gap-3">
                      <span>Last update:</span>
                      <span className="font-semibold">{item.updated_at}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
