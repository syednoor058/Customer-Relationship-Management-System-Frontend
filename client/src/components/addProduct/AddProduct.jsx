// import React from 'react'

import { useState } from "react";
import { FcOpenedFolder, FcPlus } from "react-icons/fc";
import {
  HiOutlineArrowSmLeft,
  HiOutlineClipboardList,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  return (
    <div className="w-full h-full flex flex-row gap-5 justify-between pb-10 font-light">
      <div className="w-[70%] flex flex-col gap-7 rounded-md drop-shadow-xl bg-primaryColor p-5">
        <div className="flex flex-row justify-between items-center">
          <Link
            to="/dashboard"
            className="px-3 py-2 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 items-center justify-center"
          >
            <span className="text-xl">
              <HiOutlineArrowSmLeft />
            </span>
            Dashboard
          </Link>
          <Link
            to="/dashboard/products"
            className="px-3 py-2 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 items-center justify-center"
          >
            <span className="text-xl">
              <HiOutlineClipboardList />
            </span>
            All Products
          </Link>
        </div>
        <div className="font-semibold text-2xl flex flex-row gap-3 items-center">
          <span className="text-4xl">
            <FcPlus />
          </span>
          Add New Product
        </div>
        <div className="flex flex-row gap-5 justify-between">
          <form className="w-full flex flex-col gap-5">
            <div className="text-lg font-semibold">General Information</div>
            <div className="flex flex-row gap-5">
              <div className="w-[60%] flex flex-col gap-1">
                <div>Name</div>
                <input
                  className="px-2 py-2 rounded bg-gray-200 outline-none"
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="w-[40%] flex flex-col gap-1">
                <div>Category</div>
                <input
                  className="px-2 py-2 rounded bg-gray-200 outline-none"
                  type="text"
                  placeholder="Enter product category"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Description</div>
              <textarea
                className="px-2 py-2 rounded bg-gray-200 outline-none"
                type="text"
                placeholder="Enter product description"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                rows={3}
                cols={10}
              />
            </div>
            <div className="text-lg font-semibold">Stock and Value</div>
            <div className="flex flex-row gap-5">
              <div className="w-[50%] flex flex-col gap-1">
                <div>Initial Stock</div>
                <input
                  className="px-2 py-2 rounded bg-gray-200 outline-none"
                  type="number"
                  value={0}
                  required
                />
              </div>
              <div className="w-[50%] flex flex-col gap-1">
                <div>Initial Value</div>
                <input
                  className="px-2 py-2 rounded bg-gray-200 outline-none"
                  type="number"
                  value={0}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-5 px-5 py-2 bg-accentColor text-primaryColor rounded text-center"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
      <div className="w-[30%]">
        <div className="flex flex-col rounded-md drop-shadow-xl gap-3 bg-primaryColor p-5">
          <div className="text-xl font-semibold flex flex-row gap-2 items-center">
            <span className="text-2xl">
              <FcOpenedFolder />
            </span>
            Categories
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-light">Tripol (19)</div>
            <div className="font-light">House Materials (7)</div>
            <div className="font-light">Raw Materials (21)</div>
            <div className="font-light">Machine and Stuffs (4)</div>
            <div className="font-light">Hardwares (6)</div>
          </div>
          <div className="w-[60%] px-3 py-2 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 items-center justify-center">
            <span className="text-xl">
              <HiOutlinePlusCircle />
            </span>
            Add Category
          </div>
        </div>
      </div>
    </div>
  );
}
