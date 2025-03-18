// import React from 'react'

import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { HiOutlineArchive, HiOutlinePlusCircle } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addInventory, getCategory } from "../apiServices/apiServices";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const token = localStorage.getItem("shikderFoundationAuthToken");

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const addProductData = await addInventory(
        productName,
        productCategory,
        productQuantity,
        productPrice
      );
      setProductName("");
      setProductCategory(0);
      setProductPrice(0);
      setProductQuantity(0);
      toast(addProductData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProductCategory(0);
    setProductName("");
    setProductQuantity(0);
    setProductPrice(0);
  };

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
        setLoading(false); // End loading after the request completes
      }
    };

    fetchCategory();
  }, [token]);

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full h-full flex flex-row gap-5 justify-between pb-10 font-light text-gray-500 px-3 lg:px-0">
      <div className="w-full flex flex-col gap-7 rounded-sm lg:p-5">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-full text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-col gap-2">
            <Link to="/dashboard">
              <div className="flex flex-row gap-1  rounded-sm">
                <span className="text-4xl">
                  <IoIosArrowRoundBack />
                </span>
              </div>
            </Link>
          </div>
          <div className="w-full flex justify-end">
            <Link
              to="/dashboard/products"
              className=" px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
            >
              <span className="text-lg lg:text-xl">
                <HiOutlineArchive />
              </span>
              All Products
            </Link>
          </div>
        </div>
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800">
          <span className="text-2xl lg:text-3xl">
            <FcPlus />
          </span>
          <span>Add Product</span>
        </div>
        <div className="w-full lg:w-[65%] flex flex-row gap-5 justify-between border border-blue-200 drop-shadow-xl bg-primaryColor p-3 lg:p-5">
          <form
            className="w-full flex flex-col gap-7"
            onSubmit={handleAddProductSubmit}
          >
            <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-5">
              <div className="w-full lg:w-[50%] flex flex-col gap-5">
                <div className="text-lg font-semibold text-gray-600">
                  General Information
                </div>

                <div className="flex flex-col gap-1">
                  <div>Name</div>
                  <input
                    className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Category</label>
                  <select
                    className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
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

                  {/* <input
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                  type="text"
                  placeholder="Enter product category"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                /> */}
                </div>

                {/* <div className="flex flex-col gap-1">
                <div>Description</div>
                <textarea
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                  type="text"
                  placeholder="Enter product description"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  rows={3}
                  cols={10}
                />
              </div> */}
              </div>
              <div className="w-full lg:w-[50%] flex flex-col gap-5">
                {/* <div className="text-lg font-semibold text-gray-700">
                Vendor&apos;s Information
              </div>
              <div className="flex flex-col gap-1">
                <div>Vendor&apos;s Name</div>
                <input
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                  type="text"
                  placeholder="Enter vendor's name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>Entry Date</div>
                <input
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                  type="date"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div> */}
                <div className="text-lg font-semibold text-gray-600">
                  Stock and Value
                </div>
                <div className="flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-1">
                    <div>Initial Stock</div>
                    <input
                      className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                      type="number"
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <div>Initial Value</div>
                    <input
                      className="px-2 py-2 rounded-sm border border-gray-300 bg-transparent outline-none"
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
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
                  Add Product
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
  );
}
