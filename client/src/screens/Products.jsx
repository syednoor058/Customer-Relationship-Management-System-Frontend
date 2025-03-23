// import React from 'react'
// import axios from "axios";
import { Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FcBriefcase } from "react-icons/fc";
import { HiOutlineDotsHorizontal, HiOutlinePlusCircle } from "react-icons/hi";
import {
  MdArrowDropDown,
  MdDeleteOutline,
  MdOutlineCancel,
} from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteInventory,
  getCategory,
  getInventory,
} from "../components/apiServices/apiServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

// eslint-disable-next-line react/prop-types
const ActionsMenu = ({ item, onView, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const updatePosition = () => {
    if (triggerRef.current && menuRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const menuWidth = 80; // Fixed width for the menu
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      // Position: bottom of button, right-aligned
      const left = rect.right + scrollX - menuWidth;
      const top = rect.bottom + scrollY + 2; // Small gap below button

      // Apply position directly to the menu
      menuRef.current.style.top = `${top}px`;
      menuRef.current.style.left = `${left}px`;
    }
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition(); // Set initial position
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleView = () => {
    onView(item);
    setIsOpen(false);
  };

  const handleEdit = () => {
    onEdit(item);
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(item);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={triggerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 text-gray-500 hover:bg-blue-100 rounded transition-colors duration-300 ${
          isOpen && "bg-blue-100"
        }`}
      >
        <HiOutlineDotsHorizontal className="w-5 h-5" />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[1000] bg-white border border-gray-200 rounded shadow-lg"
            style={{
              width: "80px",
            }}
          >
            <button
              onClick={handleView}
              className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-blue-50"
            >
              View
            </button>
            <button
              onClick={handleEdit}
              className="w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-blue-50"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-3 py-2 text-sm text-left text-red-500 hover:bg-blue-50"
            >
              Delete
            </button>
          </div>,
          document.body
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

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (key == "Product Name") {
      key = "product_name";
    } else if (key == "Category") {
      key = "category_id";
    } else if (key == "Quantity") {
      key = "quantity";
    } else if (key == "Price") {
      key = "price";
    } else {
      key = "updated_at";
    }

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = currentItems.sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const formatNumber = (value) => {
    return new Intl.NumberFormat().format(parseFloat(value));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const viewProduct = (product) => {
    navigate(`/dashboard/products/details/${product?.id}`);
  };

  const editProduct = (product) => {
    navigate(`/dashboard/products/edit-product/${product?.id}`);
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
    <div className="flex flex-col gap-5 pb-10 font-normal text-sm text-gray-600">
      {popup.type !== "" && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-70">
          {popup.type === "delete" && (
            <div className="p-10 bg-primaryColor rounded-sm relative flex flex-col gap-5 drop-shadow-2xl">
              <div className="w-full text-start text-base font-normal">
                Confirm to delete this product?
              </div>
              <div className="w-full flex flex-row justify-center gap-5">
                <button
                  onClick={() => handleCategoryDelete(popup.data?.id)}
                  className="ps-2 pe-5 lg:px-4 py-3 lg:py-3 rounded-sm bg-red-500 hover:bg-red-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
                >
                  <span className="text-lg lg:text-xl text-primaryColor">
                    <MdDeleteOutline />
                  </span>
                  Confirm
                </button>
                <button
                  onClick={() => setPopup({ type: "", data: null })}
                  className="ps-2 pe-5 lg:px-4 py-3 lg:py-3 rounded-sm border border-blue-500 text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-row gap-2 justify-center items-center"
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
        <div className="flex flex-row justify-between py-2 lg:py-5 ps-2 pe-5 lg:px-0">
          <div className="text-xl lg:text-2xl leading-none font-semibold flex flex-row gap-3 items-center text-gray-800">
            <span className="text-2xl lg:text-3xl">
              <FcBriefcase />
            </span>
            <span className="">All Products</span>
          </div>
          <Link
            to="/dashboard/add-product"
            className="ps-2 pe-5 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
          >
            <span className="text-lg lg:text-xl">
              <HiOutlinePlusCircle />
            </span>
            Add Products
          </Link>
        </div>
        <div className="ps-2 pe-5 lg:px-0">
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
        <div className="flex flex-col gap-7 rounded-sm bg-primaryColor ">
          {error && <p className="text-red-500">{error}</p>}
          <div className="overflow-x-auto relative">
            <table className="min-w-full">
              <thead>
                <tr className="text-xs text-gray-800 rounded-sm font-normal border-b border-gray-300">
                  {[
                    "Product Name",
                    "Category",
                    "Quantity",
                    "Price",
                    "Last update",
                  ].map((header, i) => (
                    <th
                      key={i}
                      className={`text-start py-4 ps-2 pe-5 font-semibold bg-gray-100 uppercase hover:bg-blue-100 transition-colors duration-[350ms] ${
                        i == 0 ? "" : "border-l border-gray-300"
                      }`}
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => handleSort(header)}
                      >
                        <span className="text-nowrap">{header}</span>
                        <MdArrowDropDown className="h-4 w-4 ml-2" />
                      </div>
                    </th>
                  ))}
                  <th className="text-center py-4 px-2 font-normal bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {sortedData.length > 0 ? (
                  <>
                    {sortedData.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-xs font-normal rounded-sm border-b border-gray-300`}
                      >
                        <td className="py-4 ps-2 pe-5">{item.product_name}</td>
                        <td className="py-4 ps-2 pe-5">
                          {
                            category.find((cat) => cat.id === item.category_id)
                              .category_name
                          }
                        </td>
                        <td className="py-4 ps-2 pe-5 text-start">
                          {formatNumber(item.quantity)}
                        </td>
                        <td className="py-4 ps-2 pe-5 text-start text-nowrap">
                          {"BDT" + " " + item.price}
                        </td>
                        <td className="py-4 ps-2 pe-5 text-start text-nowrap">
                          {item.updated_at.split(" ")[0]}
                        </td>
                        <td className="py-4 ps-2 pe-5 text-xl flex  justify-center items-center">
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
          </div>
        </div>
        <div className="flex flex-row justify-center items-center ps-2 pe-5 lg:px-0">
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
