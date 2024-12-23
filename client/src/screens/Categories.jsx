// import React from 'react'

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { useState } from "react";
import { FcOpenedFolder, FcPlus } from "react-icons/fc";
import {
  HiArchive,
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiSearch,
} from "react-icons/hi";
import {
  MdAccountTree,
  MdDashboardCustomize,
  MdDeleteOutline,
  MdOutlineDone,
} from "react-icons/md";
import { Link } from "react-router-dom";
import DashboardCards from "../components/dashboardCards/DashboardCards";

export default function Categories() {
  const [page, setPage] = useState(10);

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  // const [error, setError] = useState("")
  return (
    <div className="flex flex-col gap-5 font-light text-sm text-gray-600">
      <div className="grid grid-cols-3 gap-5">
        <DashboardCards
          title="Total Leads"
          number="19"
          desc="Last Month"
          icon={<MdAccountTree />}
          fromColor="from-[#2746fa]/80"
          toColor="to-[#0ea5e9]/80"
        />
        <DashboardCards
          title="Total Categories"
          number="4"
          desc="Last Month"
          icon={<MdDashboardCustomize />}
          fromColor="from-[#2746fa]/80"
          toColor="to-[#6a0dad]/80"
        />

        <DashboardCards
          title="Total Products"
          number="52"
          desc="Last Month"
          icon={<HiArchive />}
          fromColor="from-[#2746fa]/80"
          toColor="to-[#0ea5e9]/80"
        />
      </div>
      <div className="flex flex-row-reverse gap-5 pb-10">
        <div className="w-[35%]">
          <div className="flex flex-col gap-5 bg-primaryColor p-5 rounded-xl drop-shadow-xl text-[#1b1b1b]">
            <div className="text-xl font-semibold flex flex-row gap-3 items-center text-gray-900">
              <span className="text-4xl ">
                <FcPlus />
              </span>
              Add New Category
            </div>
            <form className="">
              <div className="flex flex-col gap-1">
                <div>Category Name</div>
                <input
                  className="px-2 py-2 bg-transparent rounded-md border border-gray-300 outline-none"
                  type="text"
                  placeholder="Enter category name"
                />
              </div>
              <div className="mt-3 flex flex-row gap-3">
                <div className="px-3 py-3 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 justify-center items-center">
                  <span className="text-xl">
                    <MdOutlineDone />
                  </span>
                  Add Category
                </div>
                <div className="px-3 py-3 rounded-md bg-gray-300 text-accentColor flex flex-row gap-2 justify-center items-center">
                  <span className="text-xl">
                    <MdDeleteOutline />
                  </span>
                  Discard
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[65%] h-full flex flex-col gap-5 bg-primaryColor p-5 rounded-md drop-shadow-xl">
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
          <div className="w-[350px] relative mt-5 ">
            <HiSearch className="text-xl absolute top-[10px] left-2 z-[10]" />
            <input
              className="w-full ps-9 pe-2 py-2 rounded-md outline-none bg-transparent border border-gray-300"
              type="text"
              placeholder="Search category"
            />
          </div>
          <div className="flex flex-col gap-7">
            {/* {error && <p className="text-red-500">{error}</p>} */}
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
                <tr className="text-sm font-light rounded-md">
                  <td className="py-4 px-2 text-center">1</td>
                  <td className="py-4 px-2">Tripol</td>
                  <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                    <HiOutlineEye />
                    <HiOutlinePencilAlt />
                    <HiOutlineTrash className="text-red-500" />
                  </td>
                </tr>
                <tr className="text-sm font-light rounded-md bg-gray-100">
                  <td className="py-4 px-2 text-center">2</td>
                  <td className="py-4 px-2">Raw Materials</td>
                  <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                    <HiOutlineEye />
                    <HiOutlinePencilAlt />
                    <HiOutlineTrash className="text-red-500" />
                  </td>
                </tr>
                <tr className="text-sm font-light rounded-md">
                  <td className="py-4 px-2 text-center">3</td>
                  <td className="py-4 px-2">Selulite</td>
                  <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                    <HiOutlineEye />
                    <HiOutlinePencilAlt />
                    <HiOutlineTrash className="text-red-500" />
                  </td>
                </tr>
                <tr className="text-sm font-light rounded-md bg-gray-100">
                  <td className="py-4 px-2 text-center">4</td>
                  <td className="py-4 px-2">Rosi</td>
                  <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                    <HiOutlineEye />
                    <HiOutlinePencilAlt />
                    <HiOutlineTrash className="text-red-500" />
                  </td>
                </tr>
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
