import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  getCategory,
  getInventory,
} from "../components/apiServices/apiServices";
import { getVendors } from "../components/apiServices/vendorsAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
export default function ProductAssign() {
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [vendors, setVendors] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      category: 0,
      product: 0,
      quantity: 0,
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        category: 0,
        product: 0,
        quantity: 0,
      },
    ]);
  };

  const handleDeleteRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row };

          // Parse numeric values
          if (["quantity", "totalPrice"].includes(field)) {
            updatedRow[field] = Number(value) || 0;
          } else {
            updatedRow[field] = value;
          }

          return updatedRow;
        }
        return row;
      })
    );
  };

  useEffect(() => {
    setLoading(true);
    const fetchNecessaryData = async () => {
      try {
        const [inventoryData, categoryData, vendorsData] = await Promise.all([
          getInventory(),
          getCategory(),
          getVendors(),
        ]);

        // Ensure we're getting arrays from API
        setInventory(inventoryData.inventory);
        setCategories(categoryData.inventory_category);
        setVendors(Array.isArray(vendorsData) ? vendorsData : []);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        toast.error(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchNecessaryData();
  }, [token]);

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  if (error) {
    toast(error);
  }

  return (
    <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
      <div className="flex flex-col gap-10 pb-10">
        <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
          <h1>Product Assign</h1>
        </div>
        <form className="flex flex-col divide-y-[1px] divide-gray-200">
          <div className="w-full grid grid-cols-3 gap-10 py-5">
            <div className="flex flex-col gap-1">
              <label>Memo ID</label>
              <input
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                type="text"
                placeholder="Enter memo ID"
                //   value={employeeAddress}
                //   onChange={(e) => setEmployeeAddress(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Assign Date</label>
              <input
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Project</label>
              <select
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                required
              >
                <option value={0} disabled>
                  Select a project
                </option>

                {vendors.length === 0 ? (
                  <>
                    <option disabled className="text-center">
                      No project found!
                    </option>
                  </>
                ) : (
                  <>
                    {vendors?.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        className="capitalize"
                      >
                        {item.vendor_name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-3 py-5">
            <div className="w-full flex flex-row gap-5 border border-gray-400 bg-gray-200 divide-x-[1px] px-5">
              <div className="w-[30%] py-3">Category</div>
              <div className="w-[40%] py-3">Product</div>
              <div className="w-[15%] py-3">Quantity</div>
              <div className="w-[15%] py-3"></div>
            </div>
            <div className="flex flex-col gap-3">
              {rows?.map((row, index) => (
                <div key={row.id} className="w-full flex gap-5">
                  {/* <select
                    className="w-[20%] px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    defaultValue={0}
                    value={row.category}
                    onChange={(e) =>
                      handleInputChange(row.id, "category", e.target.value)
                    }
                    required
                  >
                    <option value={0} disabled>
                      Select a category
                    </option>
                    {Array.isArray(categories) && categories.length === 0 ? (
                      <option disabled className="text-center">
                        No category found!
                      </option>
                    ) : (
                      categories?.map((item) => (
                        <option
                          key={item.id}
                          value={item.id}
                          className="capitalize"
                        >
                          {item.category_name}
                        </option>
                      ))
                    )}
                  </select> */}
                  <select
                    className="w-[30%] px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    value={row.category}
                    onChange={(e) =>
                      handleInputChange(row.id, "category", e.target.value)
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

                  {/* <input
                  type="text"
                  placeholder="Category"
                  className="p-2 border rounded w-full"
                  value={row.category}
                  onChange={(e) =>
                    handleInputChange(row.id, "category", e.target.value)
                  }
                /> */}

                  <select
                    className="w-[40%] px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    value={row.product}
                    onChange={(e) =>
                      handleInputChange(row.id, "product", e.target.value)
                    }
                    required
                  >
                    <option value={0} disabled>
                      Select a product
                    </option>

                    {inventory.length === 0 ? (
                      <>
                        <option disabled className="text-center">
                          No product found!
                        </option>
                      </>
                    ) : (
                      <>
                        {inventory?.map((item) => (
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

                  {/* <input
                  type="text"
                  placeholder="Product"
                  className="p-2 border rounded w-full"
                  value={row.product}
                  onChange={(e) =>
                    handleInputChange(row.id, "product", e.target.value)
                  }
                /> */}

                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-[15%] p-2 border rounded"
                    value={row.quantity}
                    onChange={(e) =>
                      handleInputChange(row.id, "quantity", e.target.value)
                    }
                  />

                  <div className="flex gap-2 w-[15%] text-xl items-center px-5">
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
          <div className="w-full flex flex-row gap-5 justify-end items-center py-5">
            <div className="flex">
              <button className="px-5 py-3 bg-blue-600 text-primaryColor rounded">
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
