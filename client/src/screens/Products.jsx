// import React from 'react'
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
// import axios from "axios";
import { useEffect, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import {
  HiArchive,
  HiCurrencyDollar,
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiSearch,
  HiUsers,
} from "react-icons/hi";
import {
  MdClose,
  MdDashboardCustomize,
  MdDeleteOutline,
  MdOutlineDone,
} from "react-icons/md";
import { TbFilterPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteInventory,
  editInventory,
  getCategory,
  getInventory,
} from "../components/apiServices/apiServices";
import DashboardCards from "../components/dashboardCards/DashboardCards";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function Products() {
  const [popup, setPopup] = useState({ type: "", data: null });
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [page, setPage] = useState(10);
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("no");
  const [editProductName, setEditProductName] = useState("");
  const [editProductCategory, setEditProductCategory] = useState(0);
  const [editProductPrice, setEditProductPrice] = useState(0);
  const [editProductQty, setEditProductQty] = useState(0);
  const [category, setCategory] = useState([]);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  const handleChangeCat = (event) => {
    setCat(event.target.value);
  };

  const viewProductPopup = (product) => {
    setPopup({ type: "view", data: product });
  };

  const editProductPopup = (product) => {
    setPopup({ type: "edit", data: product });
    setEditProductName(product.product_name);
    setEditProductCategory(product.category_id);
    setEditProductPrice(product.price);
    setEditProductQty(product.quantity);
  };

  const deleteProductPopup = (product) => {
    setPopup({ type: "delete", data: product });
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const editProductData = await editInventory(
        popup.data?.id,
        editProductName,
        editProductCategory,
        editProductQty,
        editProductPrice
      );
      setInventory(editProductData.inventory);
      toast(editProductData.message);
      setPopup({ type: "", data: null });
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryDelete = async (_id) => {
    setIsLoading(true);
    try {
      const deleteProductData = await deleteInventory(_id);
      setInventory(deleteProductData.inventory);
      toast(deleteProductData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
      setPopup({ type: "", data: null });
    }
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryData = await getInventory();
        setInventory(inventoryData.inventory);
      } catch (err) {
        setError(err);
        // console.error(err);
      } finally {
        setIsLoading(false); // End loading after the request completes
      }
    };

    fetchInventory();
  }, [token]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        setCategory(categoryData.inventory_category);
      } catch (err) {
        // setError(err);
        toast(err.message);
        // toast(error.message)
        // console.error(err);
      } finally {
        setIsLoading(false); // End loading after the request completes
      }
    };

    fetchCategory();
  }, [token]);

  if (isLoading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="flex flex-col gap-5 pb-10 font-light text-sm text-gray-600">
      {popup.type !== "" && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50">
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
                  Product Details
                </div>
                <div className="flex flex-col gap-3">
                  <div>Product Name: {popup.data?.product_name}</div>
                  <div>Category ID: {popup.data?.category_id}</div>
                  <div>Quantity: {popup.data?.quantity}</div>
                  <div>Price: {popup.data?.price}</div>
                  <div>Created At: {popup.data?.created_at}</div>
                  <div>Updated At: {popup.data?.updated_at}</div>
                </div>
              </div>
            </div>
          )}
          {popup.type === "edit" && (
            <div className="p-10 bg-primaryColor w-[60%] rounded-lg relative overflow-x-hidden overflow-y-auto">
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
                  Update Product Details
                </div>
                <div className="w-full flex flex-row gap-5 justify-between">
                  <form
                    className="w-full flex flex-col gap-5"
                    onSubmit={handleEditProductSubmit}
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
                          placeholder="Enter product name"
                          value={editProductName}
                          onChange={(e) => setEditProductName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label>Category</label>
                        <select
                          className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                          value={editProductCategory}
                          onChange={(e) =>
                            setEditProductCategory(e.target.value)
                          }
                          required
                        >
                          <option value={0} disabled>
                            Select a category
                          </option>

                          {category.length === 0 ? (
                            <>
                              <option disabled className="text-center">
                                No categories found!
                              </option>
                            </>
                          ) : (
                            <>
                              {category.map((item, index) => (
                                <option
                                  key={index}
                                  value={item.id}
                                  className="capitalize"
                                >
                                  {item.category_name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                      <div className="text-lg font-semibold text-gray-700">
                        Stock and Value
                      </div>
                      <div className="flex flex-row gap-5">
                        <div className="w-[50%] flex flex-col gap-1">
                          <div>Initial Stock</div>
                          <input
                            className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                            type="number"
                            value={editProductQty}
                            onChange={(e) => setEditProductQty(e.target.value)}
                            required
                          />
                        </div>
                        <div className="w-[50%] flex flex-col gap-1">
                          <div>Initial Value</div>
                          <input
                            className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                            type="number"
                            value={editProductPrice}
                            onChange={(e) =>
                              setEditProductPrice(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-3 justify-start">
                        <div className="flex">
                          <button
                            type="submit"
                            className="w-36 px-3 py-3 bg-accentColor text-primaryColor rounded-md text-center flex flex-row gap-2 justify-center items-center"
                          >
                            <span className="text-xl">
                              <MdOutlineDone />
                            </span>
                            Edit Product
                          </button>
                        </div>
                        <div className="flex">
                          <button className="w-36 px-3 py-3 bg-gray-200 text-accentColor rounded-md text-center flex flex-row gap-2 items-center justify-center">
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
            </div>
          )}
          {popup.type === "delete" && (
            <div className="p-10 bg-primaryColor w-[50%] rounded-lg relative flex flex-col gap-5">
              <div className="w-full text-center">
                Confirm you want to delete this product?
              </div>
              <div className="w-full flex flex-row justify-center gap-10">
                <button
                  onClick={() => handleCategoryDelete(popup.data?.id)}
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
      <div className="grid grid-cols-4 gap-3">
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
      </div>
      <div className="w-full h-full flex flex-col gap-5 bg-primaryColor p-5 rounded-xl drop-shadow-xl border border-gray-200">
        <div className="flex flex-row justify-between">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
            <span className="text-4xl">
              <FcBriefcase />
            </span>
            All Products
          </div>
          <Link
            to="/dashboard/add-product"
            className="px-3 py-3 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 justify-center items-center"
          >
            <span className="text-xl">
              <HiOutlinePlusCircle />
            </span>
            Add Products
          </Link>
        </div>
        <div className="mt-5 flex flex-row justify-between items-center gap-5">
          <div>
            <div className="w-[450px] relative">
              <HiSearch className="text-xl absolute top-[10px] left-2 z-[10]" />
              <input
                className="w-full ps-9 pe-2 py-2 rounded-md outline-none bg-transparent border-gray-400/60 border"
                type="text"
                placeholder="Search product"
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
              <div>Category:</div>
              <FormControl sx={{ m: 1, width: 120 }} size="small">
                <Select
                  id="rows-select2"
                  value={cat}
                  onChange={handleChangeCat}
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="tripol">Tripol</MenuItem>
                  <MenuItem value="selellute">Selellute</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          {error && <p className="text-red-500">{error}</p>}
          <table className="w-full">
            <thead className="w-full">
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className="w-[10%] text-center py-3 px-2">ID</th>
                <th className="w-[50%] text-start py-3 px-2">Name</th>
                {/* <th className="w-[40%] text-start py-3 px-2">Description</th> */}
                <th className="w-[10%] text-center py-3 px-2">Quantity</th>
                <th className="w-[10%] text-center py-3 px-2">Price</th>
                <th className="w-[20%] text-center py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length > 0 ? (
                <>
                  {inventory.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-100"
                      }`}
                    >
                      <td className="py-4 px-2 text-center">{index + 1}</td>
                      <td className="py-4 px-2">{item.product_name}</td>
                      {/* <td className="py-4 px-2">{item.description}</td> */}
                      <td className="py-4 px-2 text-center">{item.quantity}</td>
                      <td className="py-4 px-2 text-center">{item.price}</td>
                      <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                        <div
                          className="cursor-pointer"
                          onClick={() => viewProductPopup(item)}
                        >
                          <HiOutlineEye />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => editProductPopup(item)}
                        >
                          <HiOutlinePencilAlt />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteProductPopup(item)}
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
