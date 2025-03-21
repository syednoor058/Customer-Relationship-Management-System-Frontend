import { useEffect, useState } from "react";
import { FcCurrencyExchange } from "react-icons/fc";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  MdAddShoppingCart,
  MdDeleteOutline,
  MdOutlineDelete,
} from "react-icons/md";
import { toast } from "react-toastify";
import {
  getCategory,
  getInventory,
  inventoryPurchase,
} from "../components/apiServices/apiServices";
import { getVendors } from "../components/apiServices/vendorsAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
export default function InventoryPurchase() {
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [memoId, setMemoId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [selectedVendor, setSelectedVendor] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      category: 0,
      product: 0,
      quantity: null,
      totalPrice: null,
      unitPrice: 0,
    },
  ]);
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, prods, vends] = await Promise.all([
          getCategory(),
          getInventory(),
          getVendors(),
        ]);

        setCategories(cats.inventory_category || []);
        setProducts(prods.inventory || []);
        setVendors(vends || []);
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
        totalPrice: null,
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

        if (field === "category") {
          update.product = 0; // Reset product when category changes
        }

        // Handle numeric fields
        if (["quantity", "totalPrice"].includes(field)) {
          const numValue = parseFloat(value) || null;
          update[field] = numValue;

          // Calculate unit price
          if (update.quantity > 0) {
            update.unitPrice = parseFloat(
              (update.totalPrice / update.quantity).toFixed(2)
            );
          }
        } else {
          update[field] = value;
        }

        return update;
      }
      return row;
    });

    setRows(updatedRows);
  };

  // Calculate subtotal
  const subtotal = rows.reduce((sum, row) => sum + (row.totalPrice || 0), 0);
  const total = Math.max(0, subtotal - discount);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !selectedVendor ||
      rows.some(
        (row) =>
          !row.category ||
          !row.product ||
          row.quantity <= 0 ||
          row.totalPrice <= 0
      )
    ) {
      return toast.error("Please fill all required fields correctly");
    }

    const payload = {
      vendor_id: selectedVendor,
      sub_total: subtotal,
      discount: parseFloat(discount) || 0,
      total,

      inventory: rows.map((row) => ({
        product_id: row.product,
        qty: row.quantity,
        total: row.totalPrice,
        rate: row.unitPrice,
      })),
      date: purchaseDate,
    };

    try {
      const purchase = await inventoryPurchase(
        payload.vendor_id,
        payload.sub_total,
        payload.discount,
        payload.total,
        payload.inventory,
        payload.date
      );
      toast.success(purchase.message || "Purchase saved successfully");
      handleCancel();
    } catch (error) {
      toast.error(error.message || "Failed to save purchase");
    }
  };

  // Reset form
  const handleCancel = () => {
    setMemoId("");
    setPurchaseDate(new Date().toISOString().split("T")[0]);
    setSelectedVendor(0);
    setRows([
      {
        id: Date.now(),
        category: 0,
        product: 0,
        quantity: 0,
        totalPrice: 0,
        unitPrice: 0,
      },
    ]);
    setDiscount(0);
  };

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full  text-gray-500 lg:px-0 pt-5">
      <div className="flex flex-col gap-10 pb-10">
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800 pt-4 px-3">
          <span className="text-2xl lg:text-3xl">
            <FcCurrencyExchange className="text-2xl lg:text-3xl" />
          </span>
          <span>Inventory Purchase</span>
        </div>
        <div className="rounded-sm drop-shadow-xl border bg-primaryColor border-blue-200 p-3 lg:p-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col divide-y-[1px] divide-blue-200"
          >
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10 pb-7">
              <div className="flex flex-col gap-1">
                <label>Memo ID</label>
                <input
                  className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                  type="text"
                  placeholder="Enter memo ID"
                  value={memoId}
                  onChange={(e) => setMemoId(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Purchase Date</label>
                <input
                  className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Vendor</label>
                <select
                  className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(Number(e.target.value))}
                  required
                >
                  <option value={0} disabled>
                    Select a vendor
                  </option>

                  {vendors.length === 0 ? (
                    <>
                      <option disabled className="text-center">
                        No vendor found!
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
            <div className="flex flex-col gap-3 py-7 text-xs">
              <div className="w-full flex flex-row items-center gap-2 lg:gap-5 border border-blue-200 bg-blue-100 divide-x-[1px] px-1 lg:px-5 font-normal">
                <div className="w-[20%] py-3">Category</div>
                <div className="w-[27%] py-3">Product</div>
                <div className="w-[15%] py-3">Quantity</div>
                <div className="w-[15%] py-3">Total Price</div>
                <div className="w-[15%] py-3">Unit Price</div>
                <div className="w-[8%] py-3"></div>
              </div>
              <div className="flex flex-col gap-3">
                {rows?.map((row, index) => (
                  <div key={row.id} className="w-full flex gap-2 lg:gap-5">
                    {/* Category Select  */}
                    <select
                      className="w-[20%] px-1 lg:px-2 py-1 lg:py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
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
                      className="w-[27%] px-1 lg:px-2 py-1 lg:py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
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
                      className="w-[15%] px-1 lg:px-2 py-1 lg:py-2 border rounded-sm outline-none"
                      min={1}
                      value={row.quantity || 0}
                      onChange={(e) =>
                        handleRowChange(row.id, "quantity", e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="Total Price"
                      className="w-[15%] px-1 lg:px-2 py-1 lg:py-2 border rounded-sm outline-none"
                      min={1}
                      value={row.totalPrice || 0}
                      onChange={(e) =>
                        handleRowChange(row.id, "totalPrice", e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="Unit Price"
                      className="px-1 lg:px-2 py-1 lg:py-2 border rounded-sm w-[15%] bg-gray-100 outline-none"
                      value={row.unitPrice}
                      readOnly
                    />

                    <div className="flex flex-row gap-0 lg:gap-2 w-[8%] text-sm lg:text-xl items-center justify-start">
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
            <div className="flex flex-col gap-3 py-7">
              <div className="w-full flex gap-10 justify-end">
                <div className="flex flex-row gap-3 items-center">
                  <label>Subtotal:</label>
                  <p>{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <label>Discount</label>
                  <input
                    className="w-40 px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                    type="number"
                    placeholder="Discount"
                    value={discount || 0}
                    min={0}
                    max={subtotal}
                    onChange={(e) =>
                      setDiscount(
                        Math.max(0, Math.min(subtotal, e.target.value))
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex flex-row gap-5 justify-end items-center">
                <label>Total:</label>
                <p className="font-bold text-2xl leading-none text-gray-600">
                  {total.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row gap-5 justify-start items-center pt-7">
              <div className="flex">
                <button
                  type="submit"
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl">
                    <MdAddShoppingCart />
                  </span>
                  Purchase
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
      </div>
    </div>
  );
}
