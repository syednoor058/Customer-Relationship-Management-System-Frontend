// import React from 'react'
// import axios from "axios";
import { Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import { HiOutlineDotsHorizontal, HiOutlinePlusCircle } from "react-icons/hi";
import { MdDeleteOutline, MdOutlineCancel } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteInventory,
  getCategory,
  getInventory,
} from "../components/apiServices/apiServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

// Add this component at the top of your file
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

export default function Products() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ type: "", data: null });
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [category, setCategory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalItems = inventory.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const viewProduct = (product) => {
    navigate(`/dashboard/products/details/${product.id}`);
  };

  const editProduct = (product) => {
    navigate(`/dashboard/products/edit-product/${product.id}`);
  };

  const deleteProductPopup = (product) => {
    setPopup({ type: "delete", data: product });
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
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const inventoryData = await getInventory();
        const categoryData = await getCategory();
        setCategory(categoryData.inventory_category);
        setInventory(inventoryData.inventory);
        // console.log(inventoryData);
      } catch (err) {
        setError(err);
        toast.error(err.message);
        // console.error(err);
      } finally {
        setIsLoading(false); // End loading after the request completes
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="flex flex-col gap-5 pb-10 font-light text-sm text-gray-600">
      {popup.type !== "" && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-70">
          {popup.type === "delete" && (
            <div className="p-10 bg-primaryColor rounded-sm relative flex flex-col gap-5 drop-shadow-2xl">
              <div className="w-full text-center text-base font-normal">
                Confirm to delete this product?
              </div>
              <div className="w-full flex flex-row justify-center gap-5">
                <button
                  onClick={() => handleCategoryDelete(popup.data?.id)}
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
      <Outlet />
      <div className="w-full h-full flex flex-col gap-5 bg-primaryColor">
        <div className="flex flex-row justify-between py-2 lg:py-5 px-3 lg:px-0">
          <div className="text-xl lg:text-2xl leading-none font-semibold flex flex-row gap-3 items-center text-gray-800">
            <span className="text-2xl lg:text-3xl">
              <FcBriefcase />
            </span>
            <span className="">All Products</span>
          </div>
          <Link
            to="/dashboard/add-product"
            className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
          >
            <span className="text-lg lg:text-xl">
              <HiOutlinePlusCircle />
            </span>
            Add Products
          </Link>
        </div>
        {/* <div className="mt-5 flex flex-row justify-between items-center gap-5">
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
        </div> */}
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
        <div className="flex flex-col gap-7 rounded-sm drop-shadow-xl bg-primaryColor border border-blue-200">
          {error && <p className="text-red-500">{error}</p>}
          <table className="w-full hidden lg:inline-table">
            <thead className="w-full">
              <tr className="text-sm text-gray-800 rounded-sm font-normal bg-blue-100">
                <th className="w-[5%] text-start py-4 px-3 font-normal">
                  Index
                </th>
                <th className="w-[25%] text-start py-4 px-3 font-normal">
                  Name
                </th>
                <th className="w-[15%] text-start py-4 px-3 font-normal">
                  Category
                </th>
                <th className="w-[15%] text-center py-4 px-3 font-normal">
                  Quantity
                </th>
                <th className="w-[15%] text-center py-4 px-3 font-normal">
                  Price
                </th>
                <th className="w-[20%] text-center py-4 px-3 font-normal">
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
                      <td className="py-4 ps-4 pe-3 text-start">{index + 1}</td>
                      <td className="py-4 px-3">{item.product_name}</td>
                      <td className="py-4 px-3">
                        {
                          category.find((cat) => cat.id === item.category_id)
                            .category_name
                        }
                      </td>
                      <td className="py-4 px-3 text-center">{item.quantity}</td>
                      <td className="py-4 px-3 text-center">{item.price}</td>
                      <td className="py-4 px-3 text-center">
                        {item.updated_at.split(" ")[0]}
                      </td>
                      <td className="py-4 px-3 text-xl flex flex-row gap-5 justify-center items-center">
                        <ActionsMenu
                          item={item}
                          onView={viewProduct}
                          onEdit={editProduct}
                          onDelete={deleteProductPopup}
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
                      <p>No items found!</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <table className="w-full inline-table lg:hidden">
            <thead className="w-full">
              <tr className="w-full text-sm text-gray-800 rounded-sm font-normal bg-blue-100">
                <th className="w-[10%] text-start py-4 px-3 font-normal">
                  Index
                </th>
                <th className="w-[80%] text-start py-4 px-3 font-normal">
                  Name
                </th>
                <th className="w-[10%] text-center py-4 px-3 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                <>
                  {currentItems.map((item, index) => (
                    <tr
                      key={index}
                      className={`w-full text-sm font-light rounded-sm border-b border-blue-100`}
                    >
                      <td className="py-4 ps-2 pe-3 text-start">{index + 1}</td>
                      <td className="py-4 px-3">{item.product_name}</td>
                      <td className="py-4 px-3 text-xl flex flex-row gap-5 justify-center items-center">
                        <ActionsMenu
                          product={item}
                          onView={viewProduct}
                          onEdit={editProduct}
                          onDelete={deleteProductPopup}
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
                      <p>No items found!</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
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
  );
}
