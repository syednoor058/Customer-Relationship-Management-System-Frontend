import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
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
    <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
      <div className="flex flex-col gap-10 pb-10">
        <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
          <h1>Inventory Purchase</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col divide-y-[1px] divide-gray-200"
        >
          <div className="w-full grid grid-cols-3 gap-10 py-5">
            <div className="flex flex-col gap-1">
              <label>Memo ID</label>
              <input
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
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
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Vendor</label>
              <select
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
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
          <div className="flex flex-col gap-3 py-5">
            <div className="w-full flex flex-row gap-5 border border-gray-400 bg-gray-200 divide-x-[1px] px-5">
              <div className="w-[20%] py-3">Category</div>
              <div className="w-[30%] py-3">Product</div>
              <div className="w-[10%] py-3">Quantity</div>
              <div className="w-[15%] py-3">Total Price</div>
              <div className="w-[15%] py-3">Unit Price</div>
              <div className="w-[10%] py-3"></div>
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
                    className="w-[30%] px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
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
                    className="w-[10%] p-2 border rounded outline-none"
                    min={1}
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(row.id, "quantity", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    placeholder="Total Price"
                    className="p-2 border rounded w-[15%] outline-none"
                    min={1}
                    value={row.totalPrice}
                    onChange={(e) =>
                      handleRowChange(row.id, "totalPrice", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    placeholder="Unit Price"
                    className="p-2 border rounded w-[15%] bg-gray-100 outline-none"
                    value={row.unitPrice}
                    readOnly
                  />

                  <div className="flex gap-2 w-[10%] text-xl items-center px-5">
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
          <div className="flex flex-col gap-3 py-5">
            <div className="w-full flex gap-10 justify-end">
              <div className="flex flex-row gap-3 items-center">
                <label>Subtotal:</label>
                <p>{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <label>Discount</label>
                <input
                  className="w-40 px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                  type="number"
                  placeholder="Discount"
                  value={discount}
                  min={0}
                  max={subtotal}
                  onChange={(e) =>
                    setDiscount(Math.max(0, Math.min(subtotal, e.target.value)))
                  }
                />
              </div>
            </div>
            <div className="flex flex-row gap-5 justify-end items-center">
              <label>Total:</label>
              <p className="font-bold text-4xl leading-none">
                {total.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-5 justify-end items-center py-5">
            <div className="flex">
              <button
                type="submit"
                className="px-5 py-3 bg-blue-600 text-primaryColor rounded"
              >
                Purchase
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
