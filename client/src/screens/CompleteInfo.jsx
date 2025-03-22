import { useEffect, useState } from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdOutlineSave } from "react-icons/md";
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
      area: 0,
      shop: "",
      cost: 0,
      advanced: 0,
      rent: 0,
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
        area: 0,
        shop: "",
        cost: 0,
        advanced: 0,
        rent: 0,
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
        if (
          [
            "unitCost",
            "unitPrice",
            "area",
            "cost",
            "advanced",
            "rent",
          ].includes(field)
        ) {
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
    if (!selectedProject || rows.some((row) => !row.floor)) {
      return toast.error("Please fill all required fields correctly");
    }

    const payload = {
      info: rows.map((row) => ({
        floor: row.floor,
        unit: row.unit,
        unit_cost: row.unitCost,
        unit_price: row.unitPrice,
        shop: row.shop,
        shop_cost: row.cost,
        shop_advanced: row.advanced,
        shop_rent: row.rent,
        area: row.area,
      })),
    };

    // console.log(payload);

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
        area: 0,
        shop: "",
        cost: 0,
        advanced: 0,
        rent: 0,
      },
    ]);
  };

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full text-gray-600 pb-10 flex flex-col gap-10">
      <div className="flex flex-col gap-10 p-5 rounded-sm drop-shadow-xl border bg-primaryColor border-gray-200">
        <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900 capitalize">
          <h1>Add Complete Project Info</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col divide-y-[1px] divide-gray-200 divide-opacity-90"
        >
          <div className="w-full grid grid-cols-3 gap-10 pb-5">
            <div className="flex flex-col gap-1">
              <label>Completed Project</label>
              <select
                className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
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

          {rows?.map((row, index) => (
            <div key={index} className="flex flex-col gap-10 py-5 relative">
              {rows.length > 1 && (
                <div className="w-full flex justify-end px-5 absolute top-0  pt-5">
                  <button
                    onClick={() => handleDeleteRow(row.id)}
                    className=" text-red-500 hover:text-red-600 flex flex-row gap-1 items-center"
                  >
                    <span className="text-xl">
                      <MdClose />
                    </span>
                    <span>Delete</span>
                  </button>
                </div>
              )}
              <div className="flex flex-col gap-5">
                <div className="text-lg font-semibold text-gray-600">
                  Floor Information
                </div>
                <div className="w-full grid grid-cols-3 gap-x-10 gap-y-3">
                  <div className="flex flex-col gap-1">
                    <label>Floor</label>
                    <input
                      className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                      type="text"
                      placeholder="Enter floor"
                      value={row.floor}
                      onChange={(e) =>
                        handleRowChange(row.id, "floor", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Unit</label>
                    <input
                      className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                      type="text"
                      placeholder="Enter unit"
                      value={row.unit}
                      onChange={(e) =>
                        handleRowChange(row.id, "unit", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Unit Cost</label>
                    <input
                      type="number"
                      placeholder="Unit cost"
                      className="p-2 border rounded-sm outline-none border-gray-300"
                      min={0}
                      value={row.unitCost}
                      onChange={(e) =>
                        handleRowChange(row.id, "unitCost", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Unit Price</label>
                    <input
                      type="number"
                      placeholder="Unit price"
                      className="p-2 border rounded-sm outline-none border-gray-300"
                      min={0}
                      value={row.unitPrice}
                      onChange={(e) =>
                        handleRowChange(row.id, "unitPrice", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Area</label>
                    <input
                      type="number"
                      placeholder="Enter area"
                      className="p-2 border rounded-sm outline-none border-gray-300"
                      min={0}
                      value={row.area}
                      onChange={(e) =>
                        handleRowChange(row.id, "area", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="text-lg font-semibold text-gray-600">
                  Shop Information
                </div>
                <div className="w-full grid grid-cols-3 gap-x-10 gap-y-3">
                  <div className="flex flex-col gap-1">
                    <label>Shop</label>
                    <input
                      className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                      type="text"
                      placeholder="Enter shop"
                      value={row.shop}
                      onChange={(e) =>
                        handleRowChange(row.id, "shop", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Shop Cost</label>
                    <input
                      type="number"
                      placeholder="Shop cost"
                      className="p-2 border rounded-sm outline-none border-gray-300"
                      min={0}
                      value={row.cost}
                      onChange={(e) =>
                        handleRowChange(row.id, "cost", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Shop Advanced</label>
                    <input
                      type="number"
                      placeholder="Shop advanced"
                      className="p-2 border rounded-sm outline-none border-gray-300"
                      min={0}
                      value={row.advanced}
                      onChange={(e) =>
                        handleRowChange(row.id, "advanced", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Shop Rent</label>
                    <input
                      type="number"
                      placeholder="Shop rent"
                      className="p-2 border rounded-sm outline-none border-gray-300"
                      min={0}
                      value={row.rent}
                      onChange={(e) =>
                        handleRowChange(row.id, "rent", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              {index === rows.length - 1 && (
                <div className="flex">
                  <button
                    type="button"
                    onClick={handleAddRow}
                    className="text-blue-500 hover:text-blue-600 flex flex-row gap-1 items-center"
                  >
                    <span className="text-xl">
                      <MdAdd />
                    </span>
                    <span>Add More</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="w-full flex flex-row gap-3 justify-end items-center pt-5">
            <div className="flex">
              <button
                type="submit"
                className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
              >
                <span className="text-lg lg:text-xl">
                  <MdOutlineSave />
                </span>
                Save Info
              </button>
            </div>
            <div className="flex">
              <button
                className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm border border-blue-500 text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-row gap-2 justify-center items-center"
                type="button"
                onClick={handleCancel}
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

      <div className="w-full p-5 rounded-sm drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
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
                      className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
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
                        className="px-5 py-3 bg-blue-600 text-primaryColor rounded-sm"
                      >
                        Check
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-3 border border-blue-600 text-blue-600 rounded-sm"
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
        <div className="w-full p-5 rounded-sm drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
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
