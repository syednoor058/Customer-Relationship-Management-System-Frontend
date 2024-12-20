// import React from 'react'
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from "react-icons/hi";
import {
  MdAccountTree,
  MdBusinessCenter,
  MdDashboardCustomize,
} from "react-icons/md";
import { Link } from "react-router-dom";
import DashboardCards from "../components/dashboardCards/DashboardCards";

export default function Products() {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(10);

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      if (!token) {
        setError("You need to log in first");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/inventory", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.inventory) {
          setInventory(response.data.inventory);
        } else {
          setError("No inventory data available");
        }
      } catch (err) {
        setError("Failed to fetch inventory");
        console.error(err);
      } finally {
        setIsLoading(false); // End loading after the request completes
      }
    };

    fetchInventory();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="flex flex-col gap-10 pb-10 font-light">
      <div className="grid grid-cols-3 gap-5">
        <DashboardCards
          title="Total Leads"
          number="19"
          desc="Last Month"
          icon={<MdAccountTree />}
          fromColor="from-[#1b9b46]"
          toColor="to-[#98d8a4] "
        />
        <DashboardCards
          title="Total Categories"
          number="4"
          desc="Last Month"
          icon={<MdDashboardCustomize />}
          fromColor="from-[#2746fa]"
          toColor="to-[#a2b4fc]"
        />

        <DashboardCards
          title="Total Products"
          number="52"
          desc="Last Month"
          icon={<MdBusinessCenter />}
          fromColor="from-[#6a0dad]"
          toColor="to-[#d8b4ef] "
        />
      </div>
      <div className="w-full h-full flex flex-col gap-5 bg-primaryColor p-5 rounded-md drop-shadow-xl">
        <div className="flex flex-row justify-between">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center">
            <span className="text-4xl">
              <FcBriefcase />
            </span>
            All Products
          </div>
          <Link
            to="/dashboard/add-product"
            className="px-3 py-2 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 justify-center items-center"
          >
            <span className="text-xl">
              <HiOutlinePlusCircle />
            </span>
            Add Products
          </Link>
        </div>
        <div className="pt-5 flex flex-col gap-7">
          {error && <p className="text-red-500">{error}</p>}
          <table className="w-full">
            <thead className="w-full">
              <tr className="text-sm font-light uppercase bg-accentColor text-primaryColor rounded-md">
                <th className="w-[5%] font-light text-center py-3 px-2">ID</th>
                <th className="w-[20%] font-light text-start py-3 px-2">
                  Name
                </th>
                <th className="w-[40%] font-light text-start py-3 px-2">
                  Description
                </th>
                <th className="w-[10%] font-light text-center py-3 px-2">
                  Quantity
                </th>
                <th className="w-[10%] font-light text-center py-3 px-2">
                  Price
                </th>
                <th className="w-[15%] font-light text-center py-3 px-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {inventory.length > 0 ? (
                <>
                  {inventory.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-200"
                      }`}
                    >
                      <td className="py-4 px-2 text-center">{index + 1}</td>
                      <td className="py-4 px-2">{item.name}</td>
                      <td className="py-4 px-2">{item.description}</td>
                      <td className="py-4 px-2 text-center">{item.quantity}</td>
                      <td className="py-4 px-2 text-center">{item.price}</td>
                      <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                        <HiOutlineEye />
                        <HiOutlinePencilAlt />
                        <HiOutlineTrash className="text-red-500" />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <p>No inventory items found!</p>
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
