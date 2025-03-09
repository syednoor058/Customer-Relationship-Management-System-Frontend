import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  getCategory,
  getInventory,
} from "../components/apiServices/apiServices";
import {
  assignProduct,
  getProjects,
} from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
export default function ProductAssign() {
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [assignDate, setAssignDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [selectedProject, setSelectedProject] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      category: 0,
      product: 0,
      quantity: null,
    },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, prods, projects] = await Promise.all([
          getCategory(),
          getInventory(),
          getProjects(),
        ]);

        setCategories(cats.inventory_category || []);
        setProducts(prods.inventory || []);
        setProjects(projects || []);
      } catch (error) {
        toast.error(error.message || "Failed to load initial data");
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
        category: 0,
        product: 0,
        quantity: null,
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

        if (field === "category") {
          update.product = 0; // Reset product when category changes
        }

        // Handle numeric fields
        if (["quantity"].includes(field)) {
          const numValue = parseFloat(value) || null;
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
      rows.some((row) => !row.category || !row.product || row.quantity <= 0)
    ) {
      return toast.error("Please fill all required fields correctly");
    }

    const payload = {
      project_id: selectedProject,
      inventory: rows.map((row) => ({
        product_id: row.product,
        qty: row.quantity,
      })),
      date: assignDate,
    };

    try {
      const assign = await assignProduct(
        payload.project_id,
        payload.inventory,
        payload.date
      );
      toast.success(assign.message || "Assigned product(s) successfully!");
      handleCancel();
    } catch (error) {
      toast.error(error.message || "Failed to assign product(s)!");
    }
  };

  // Reset form
  const handleCancel = () => {
    setAssignDate(new Date().toISOString().split("T")[0]);
    setSelectedProject(0);
    setRows([
      {
        id: Date.now(),
        category: 0,
        product: 0,
        quantity: 0,
      },
    ]);
  };

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
      <div className="flex flex-col gap-10 pb-10">
        <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
          <h1>Inventory Purchase</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col divide-y-[1px] divide-gray-200"
        >
          <div className="w-full grid grid-cols-2 gap-10 py-5">
            <div className="flex flex-col gap-1">
              <label>Assign Date</label>
              <input
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                type="date"
                value={assignDate}
                onChange={(e) => setAssignDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Projects</label>
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
          <div className="flex flex-col gap-3 py-5">
            <div className="w-full flex flex-row gap-5 border border-gray-400 bg-gray-200 divide-x-[1px] px-5">
              <div className="w-[20%] py-3">Category</div>
              <div className="w-[40%] py-3">Product</div>
              <div className="w-[20%] py-3">Quantity</div>
              <div className="w-[20%] py-3"></div>
            </div>
            <div className="flex flex-col gap-3">
              {rows?.map((row, index) => (
                <div key={row.id} className="w-full flex gap-5">
                  {/* Category Select  */}
                  <select
                    className="w-[20%] px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    value={row.category}
                    onChange={(e) =>
                      handleRowChange(row.id, "category", e.target.value)
                    }
                    required
                  >
                    <option value={0} disabled>
                      Select a category
                    </option>

                    {categories.length === 0 ? (
                      <>
                        <option disabled className="text-center">
                          No categories found!
                        </option>
                      </>
                    ) : (
                      <>
                        {categories.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            className="capitalize"
                          >
                            {item.category_name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>

                  <select
                    className="w-[40%] px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    value={row.product}
                    onChange={(e) =>
                      handleRowChange(row.id, "product", e.target.value)
                    }
                    required
                  >
                    <option value={0} disabled>
                      Select a product
                    </option>

                    {products.filter(
                      (product) => product.category_id === row.category
                    ).length === 0 ? (
                      <>
                        <option disabled className="text-center">
                          No product found!
                        </option>
                      </>
                    ) : (
                      <>
                        {products
                          ?.filter(
                            (product) => product.category_id === row.category
                          )
                          .map((item) => (
                            <option
                              key={item.id}
                              value={item.id}
                              className="capitalize"
                            >
                              {item.product_name}
                            </option>
                          ))}
                      </>
                    )}
                  </select>

                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-[20%] p-2 border rounded outline-none"
                    min={1}
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(row.id, "quantity", e.target.value)
                    }
                  />

                  <div className="flex gap-2 w-[20%] text-xl items-center px-5">
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
          <div className="w-full flex flex-row gap-5 justify-center items-center py-5">
            <div className="flex">
              <button
                type="submit"
                className="px-5 py-3 bg-blue-600 text-primaryColor rounded"
              >
                Assign
              </button>
            </div>
            <div className="flex">
              <button className="px-5 py-3 border border-blue-600 text-blue-600 rounded">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
