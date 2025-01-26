// import React from 'react'

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { FcOpenedFolder, FcPlus } from "react-icons/fc";
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
  addCategory,
  deleteCategory,
  editCategory,
  getCategory,
} from "../components/apiServices/apiServices";
import DashboardCards from "../components/dashboardCards/DashboardCards";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function Categories() {
  const [editCategoryName, setEditCategoryName] = useState("");
  const [popup, setPopup] = useState({ type: "", data: null });
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [page, setPage] = useState(10);
  const [sort, setSort] = useState("no");
  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  // const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  const handleCategoryView = (productPop) => {
    setPopup({ type: "view", data: productPop });
  };

  const handleCategoryEdit = (productPop) => {
    setPopup({ type: "edit", data: productPop });
    setEditCategoryName(productPop.category_name);
  };

  const handleCategoryDelete = (productPop) => {
    setPopup({ type: "delete", data: productPop });
  };

  const handleCategoryDeleteRequest = async (id) => {
    try {
      const categoryDeleteData = await deleteCategory(id);
      setCategory(categoryDeleteData.inventory_category);
      setPopup({ type: "", data: null });
      toast(categoryDeleteData.message);
    } catch (error) {
      setError(error);
    }
  };

  const handleCategoryUpdate = async (id, category_name) => {
    try {
      const editCategoryData = await editCategory(id, category_name);
      setCategory(editCategoryData.inventory_category);
      setEditCategoryName("");
      toast(editCategoryData.message);
      setPopup({ type: "", data: null });
    } catch (error) {
      setError(error);
    }
  };

  const handleCreateCategorySubmit = async (category_name) => {
    try {
      const createCategoryData = await addCategory(category_name);
      toast(createCategoryData.message);
      setCategory(createCategoryData.inventory_category);
      setNewCategoryName("");
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        setCategory(categoryData.inventory_category);
      } catch (err) {
        setError(err);
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
    <div className="flex flex-col gap-5 font-light text-sm text-gray-600">
      {popup.type !== "" && (
        <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50">
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
                  Category Details
                </div>
                <div className="flex flex-col gap-3">
                  <div>Category Name: {popup.data?.category_name}</div>
                  <div>Created At: {popup.data?.created_at}</div>
                  <div>Updated At: {popup.data?.updated_at}</div>
                </div>
              </div>
            </div>
          )}
          {popup.type === "edit" && (
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
                <div className="text-lg font-semibold border-b border-gray-400 pb-1">
                  Update Category
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    className="w-full px-2 py-2 outline-none border rounded border-gray-300"
                    value={editCategoryName}
                    placeholder="Enter category name"
                    onChange={(e) => setEditCategoryName(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-row gap-10">
                  <button
                    onClick={() =>
                      handleCategoryUpdate(popup.data.id, editCategoryName)
                    }
                    className="px-5 py-2 rounded bg-blue-500 text-primaryColor"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditCategoryName("")}
                    className="px-5 py-2 rounded bg-gray-300 text-gray-800"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          )}
          {popup.type === "delete" && (
            <div className="p-10 bg-primaryColor w-[50%] rounded-lg relative flex flex-col gap-5">
              <div className="w-full text-center">
                Confirm you want to delete this category?
              </div>
              <div className="w-full flex flex-row justify-center gap-10">
                <button
                  onClick={() => handleCategoryDeleteRequest(popup.data.id)}
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

      {/* {alert && <div>{alert}</div>} */}
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
      <div className="flex flex-row-reverse gap-5 pb-10">
        <div className="w-[35%]">
          <div className="flex flex-col gap-5 bg-primaryColor p-5 rounded-xl drop-shadow-xl border border-gray-200">
            <div className="text-xl font-semibold flex flex-row gap-3 items-center text-gray-900">
              <span className="text-4xl ">
                <FcPlus />
              </span>
              Add New Category
            </div>
            <div className="">
              <div className="flex flex-col gap-3">
                <div>Category Name</div>
                <input
                  className="w-full px-2 py-3 bg-transparent border rounded border-gray-300 outline-none"
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              <div className="mt-3 flex flex-row gap-3">
                <div
                  onClick={() => handleCreateCategorySubmit(newCategoryName)}
                  className="px-3 py-3 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 justify-center items-center cursor-pointer"
                >
                  <span className="text-xl">
                    <MdOutlineDone />
                  </span>
                  Add Category
                </div>
                <div
                  className="px-3 py-3 rounded-md bg-gray-200 text-accentColor flex flex-row gap-2 justify-center items-center cursor-pointer"
                  onClick={() => setNewCategoryName("")}
                >
                  <span className="text-xl">
                    <MdDeleteOutline />
                  </span>
                  Clear
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[65%] h-full flex flex-col gap-5 bg-primaryColor p-5 rounded-xl border border-gray-200 drop-shadow-xl">
          <div className="flex flex-row justify-between">
            <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
              <span className="text-4xl">
                <FcOpenedFolder />
              </span>
              All Categories
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
          <div className="mt-5 flex flex-row gap-5 justify-between items-center">
            <div className="w-[350px] relative">
              <HiSearch className="text-xl absolute top-[10px] left-2 z-[10]" />
              <input
                className="w-full ps-9 pe-2 py-2 rounded-xl outline-none bg-transparent border border-gray-300"
                type="text"
                placeholder="Search category"
              />
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
                    <MenuItem value="alphabet">A - Z</MenuItem>
                    <MenuItem value="alphabet reverse">Z - A</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full">
              <thead className="w-full">
                <tr className="text-sm uppercase text--gray-700 rounded-md border-b border-gray-300">
                  <th className="w-[10%] text-center py-3 px-2">ID</th>
                  <th className="w-[75%] text-start py-3 px-2">
                    Category Name
                  </th>
                  <th className="w-[15%] text-center py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.length > 0 ? (
                  <>
                    {category.map((item, index) => (
                      <tr key={index} className="text-sm font-light rounded-md">
                        <td className="py-4 px-2 text-center">{index + 1}</td>
                        <td className="py-4 px-2 capitalize">
                          {item.category_name}
                        </td>
                        <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                          <button onClick={() => handleCategoryView(item)}>
                            <HiOutlineEye />
                          </button>
                          <button onClick={() => handleCategoryEdit(item)}>
                            <HiOutlinePencilAlt />
                          </button>
                          <button onClick={() => handleCategoryDelete(item)}>
                            <HiOutlineTrash className="text-red-500" />
                          </button>
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
                        <p>No category found!</p>
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
    </div>
  );
}
