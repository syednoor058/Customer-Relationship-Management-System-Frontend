// import React from 'react'

import Pagination from "@mui/material/Pagination";
import { useEffect, useRef, useState } from "react";
import { FcOpenedFolder, FcPlus } from "react-icons/fc";
import { HiOutlineDotsHorizontal, HiOutlinePlusCircle } from "react-icons/hi";
import { MdDeleteOutline, MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCategory,
  deleteCategory,
  getCategory,
} from "../components/apiServices/apiServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

// eslint-disable-next-line react/prop-types
const ActionsMenu = ({ item, onView, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 hover:bg-blue-100 rounded transition-colors duration-[350ms] relative z-[10] text-gray-500 ${
          isOpen && "bg-blue-100"
        }`}
      >
        <HiOutlineDotsHorizontal />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-[100] rounded-sm shadow-lg border border-blue-100 text-nowrap bg-primary flex flex-col bg-primaryColor">
          <button
            onClick={() => {
              onView(item);
              setIsOpen(false);
            }}
            className="w-full ps-3 pe-6 py-2 text-sm text-gray-800 hover:bg-blue-100 text-left"
          >
            View
          </button>
          <button
            onClick={() => {
              onEdit(item);
              setIsOpen(false);
            }}
            className="w-full ps-3 pe-6 py-2 text-sm text-gray-800 hover:bg-blue-100 text-left"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(item);
              setIsOpen(false);
            }}
            className="block w-full ps-3 pe-6 py-2 text-sm text-red-500 hover:bg-blue-100 text-left"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default function Categories() {
  const [popup, setPopup] = useState({ type: "", data: null });
  const token = localStorage.getItem("shikderFoundationAuthToken");
  // const [sort, setSort] = useState("no");
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [newCategoryName, setNewCategoryName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalItems = category.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // const handleChangeSort = (event) => {
  //   setSort(event.target.value);
  // };

  const handleView = (item) => {
    navigate(`/dashboard/categories/details/${item.id}`);
  };

  const handleEdit = (item) => {
    navigate(`/dashboard/categories/edit-category/${item.id}`);
  };

  const handleCategoryDelete = (item) => {
    setPopup({ type: "delete", data: item });
  };

  const handleCategoryDeleteRequest = async (item) => {
    setIsLoading(true);
    try {
      const categoryDeleteData = await deleteCategory(item.id);
      setCategory(categoryDeleteData.inventory_category);
      setPopup({ type: "", data: null });
      toast.success(categoryDeleteData.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategorySubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const createCategoryData = await addCategory(newCategoryName);
      toast.success(createCategoryData.message);
      setCategory(createCategoryData.inventory_category);
      setNewCategoryName("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setNewCategoryName("");
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory();
        setCategory(categoryData.inventory_category);
        // console.log(categoryData.inventory_category);
      } catch (err) {
        toast.error(err.message);
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
    <div className="flex flex-col gap-10 font-light text-sm text-gray-600">
      {popup.type !== "" && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-70">
          {popup.type === "delete" && (
            <div className="p-10 bg-primaryColor rounded-sm relative flex flex-col gap-5 drop-shadow-2xl">
              <div className="w-full text-center text-base font-normal">
                Confirm to delete this category?
              </div>
              <div className="w-full flex flex-row justify-center gap-5">
                <button
                  onClick={() => handleCategoryDeleteRequest(popup.data)}
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-red-500 hover:bg-red-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl text-primaryColor">
                    <MdDeleteOutline />
                  </span>
                  Confirm
                </button>
                <button
                  onClick={() => setPopup({ type: "", data: null })}
                  className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm border border-blue-500 text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl text-blue-500">
                    <MdOutlineCancel />
                  </span>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-10 lg:gap-20 pb-10">
        <div className="w-full">
          <div className="flex flex-col gap-5 bg-primaryColor rounded-sm">
            <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800 pt-5 px-3 lg:px-0">
              <span className="text-2xl lg:text-3xl">
                <FcPlus />
              </span>
              <span>Add New Category</span>
            </div>
            <div className="w-full lg:w-[40%] shadow-xl border border-blue-200 p-3 lg:p-5 rounded-sm">
              <form
                className="w-full flex flex-col gap-5"
                onSubmit={handleCreateCategorySubmit}
              >
                <div className="flex flex-col gap-3">
                  <div>Category Name</div>
                  <input
                    className="w-full px-2 py-3 bg-transparent border rounded-sm border-gray-300 outline-none"
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                <div className="w-full flex flex-row gap-3 justify-start items-center">
                  <div className="flex">
                    <button
                      type="submit"
                      className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
                    >
                      <span className="text-lg lg:text-xl">
                        <HiOutlinePlusCircle />
                      </span>
                      Add Category
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm border border-blue-500 text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-row gap-2 justify-center items-center"
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
        <div className="w-full h-full flex flex-col gap-10 bg-primaryColor rounded-sm">
          <div className="flex flex-row justify-between">
            <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800 pt-5 px-3 lg:px-0">
              <span className="text-2xl lg:text-3xl">
                <FcOpenedFolder />
              </span>
              All Categories
            </div>
          </div>

          {/* <div className="mt-5 flex flex-row gap-5 justify-between items-center">
            <div className="w-[350px] relative">
              <HiSearch className="text-xl absolute top-[10px] left-2 z-[10]" />
              <input
                className="w-full ps-9 pe-2 py-2 rounded outline-none bg-transparent border border-gray-300"
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
          </div> */}

          <div className="flex flex-col gap-5">
            <div className="px-3 lg:px-0">
              <div className="flex flex-row gap-1 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <label>Rows:</label>
                  <select
                    className="px-[5px] py-[2px] rounded-sm border border-blue-200 bg-primaryColor outline-none"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    required
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="border border-blue-200 shadow-xl">
              <table className="w-full">
                <thead className="w-full">
                  <tr className="text-sm text-gray-800 rounded-sm font-normal bg-blue-100">
                    <th className="w-[10%] text-start py-4 px-3 font-normal">
                      Index
                    </th>
                    <th className="w-[35%] text-start py-4 px-3 font-normal">
                      Category Name
                    </th>
                    <th className="w-[25%] text-center py-4 px-3 font-normal">
                      Created
                    </th>
                    <th className="w-[25%] text-center py-4 px-3 font-normal">
                      Last Update
                    </th>
                    <th className="w-[5%] text-center py-4 px-3 font-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    <>
                      {currentItems.map((item, index) => (
                        <tr
                          key={index}
                          className={`text-sm font-light rounded-sm border-b border-blue-100`}
                        >
                          <td className="py-4 ps-4 pe-3 text-start">
                            {index + 1}
                          </td>
                          <td className="py-4 px-3 text-start">
                            {item.category_name}
                          </td>
                          <td className="py-4 px-3 text-center">
                            {item.created_at.split(" ")[0]}
                          </td>
                          <td className="py-4 px-3 text-center">
                            {item.updated_at.split(" ")[0]}
                          </td>
                          <td className="py-4 px-3 text-xl flex flex-row gap-5 justify-center items-center">
                            <ActionsMenu
                              item={item}
                              onView={handleView}
                              onEdit={handleEdit}
                              onDelete={handleCategoryDelete}
                            />
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
            </div>

            {/* <table className="w-full border-collapse border border-blue-200 shadow-xl">
              <thead className="w-full">
                <tr className="text-sm uppercase text--gray-700 rounded-md border-b border-gray-300">
                  <th className="w-[10%] text-center py-3 px-2">ID</th>
                  <th className="w-[75%] text-start py-3 px-2">
                    Category Name
                  </th>
                  <th className="w-[15%] text-center py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {category.length > 0 ? (
                  <>
                    {category.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-sm font-light rounded-md ${
                          (index + 1) % 2 === 0 && "bg-gray-200/60"
                        }`}
                      >
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
            </table> */}
            <div className="flex flex-row justify-center items-center px-3 lg:px-0">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
