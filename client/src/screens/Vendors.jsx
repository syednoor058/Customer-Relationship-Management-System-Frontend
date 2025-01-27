// import React from 'react'

import { FormControl, MenuItem, Pagination, Select } from "@mui/material";
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
  deleteVendors,
  editVendors,
  getVendors,
} from "../components/apiServices/vendorsAPIServices";
import DashboardCards from "../components/dashboardCards/DashboardCards";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function Vendors() {
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({ type: "", data: null });
  const [page, setPage] = useState(10);
  const [sort, setSort] = useState("no");
  const [vendors, setVendors] = useState([]);
  const [editVendorName, setEditVendorName] = useState("");
  const [editVendorAddress, setEditVendorAddress] = useState("");
  const [editVendorPhone, setEditVendorPhone] = useState("");
  const [editVendorNote, setEditVendorNote] = useState("");
  const [editVendorBalance, setEditVendorBalance] = useState(0);
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [loading, setLoading] = useState(true);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  const viewVendorPopup = (vendor) => {
    setPopup({ type: "view", data: vendor });
  };

  const editVendorPopup = (vendor) => {
    setPopup({ type: "edit", data: vendor });
    setEditVendorName(vendor.vendor_name);
    setEditVendorAddress(vendor.address);
    setEditVendorNote(vendor.note);
    setEditVendorPhone(vendor.phone);
    setEditVendorBalance(vendor.balance);
  };

  const deleteVendorPopup = (vendor) => {
    setPopup({ type: "delete", data: vendor });
  };

  const handleEditVendorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const editVendorData = await editVendors(
        popup.data?.id,
        editVendorName,
        editVendorAddress,
        editVendorPhone,
        editVendorNote,
        editVendorBalance
      );
      setPopup({ type: "", data: null });
      toast(editVendorData.message);
    } catch (error) {
      setError(error.message);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVendorSubmit = async (vedor_id) => {
    setLoading(true);

    try {
      const deleteVendorData = await deleteVendors(vedor_id);
      setPopup({ type: "", data: null });
      toast(deleteVendorData.message);
    } catch (error) {
      setError(error.message);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    const fetchVendors = async () => {
      try {
        const vendorsData = await getVendors();
        setVendors(vendorsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [token]);

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="flex flex-col gap-5 pb-10 font-light text-sm text-gray-600">
      {popup.type !== "" && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50 overflow-y-auto">
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
                  Vendor Details
                </div>
                <div className="flex flex-col gap-3">
                  <div>Vendor Name: {popup.data?.vendor_name}</div>
                  <div>Address: {popup.data?.address}</div>
                  <div>Note: {popup.data?.note}</div>
                  <div>Phone: {popup.data?.phone}</div>
                  <div>Balance: {popup.data?.balance}</div>
                  <div>Created At: {popup.data?.created_at}</div>
                  <div>Updated At: {popup.data?.updated_at}</div>
                </div>
              </div>
            </div>
          )}
          {popup.type === "edit" && (
            <div className="p-10 bg-primaryColor w-[60%] rounded-lg relative overflow-x-hidden overflow-y-auto mt-32">
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
                  Update Vendor Details
                </div>
                <div className="w-full flex flex-row gap-5 justify-between">
                  <form
                    className="w-full flex flex-col gap-5"
                    onSubmit={handleEditVendorSubmit}
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
                          placeholder="Enter vendor name"
                          value={editVendorName}
                          onChange={(e) => setEditVendorName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label>Address</label>
                        <input
                          className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                          type="text"
                          placeholder="Enter vendor address"
                          value={editVendorAddress}
                          onChange={(e) => setEditVendorAddress(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label>Phone Number</label>
                        <input
                          className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                          type="text"
                          placeholder="Enter vendor phone number"
                          value={editVendorPhone}
                          onChange={(e) => setEditVendorPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                      <div className="text-lg font-semibold text-gray-700">
                        Financial Details
                      </div>
                      <div className="flex flex-col gap-5">
                        <div className="w-full flex flex-col gap-1">
                          <div>Balance</div>
                          <input
                            className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                            type="number"
                            value={editVendorBalance}
                            onChange={(e) =>
                              setEditVendorBalance(e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                          <div>Note</div>
                          <textarea
                            className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                            type="text"
                            value={editVendorNote}
                            onChange={(e) => setEditVendorNote(e.target.value)}
                            required
                            rows={3}
                            cols={10}
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
                            Edit Vendor
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
                Confirm you want to delete this vendor?
              </div>
              <div className="w-full flex flex-row justify-center gap-10">
                <button
                  onClick={() => handleDeleteVendorSubmit(popup.data?.id)}
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
            All Vendors
          </div>
          <Link
            to="/dashboard/add-vendor"
            className="px-3 py-3 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 justify-center items-center"
          >
            <span className="text-xl">
              <HiOutlinePlusCircle />
            </span>
            Add Vendor
          </Link>
        </div>
        <div className="mt-5 flex flex-row justify-between items-center gap-5">
          <div>
            <div className="w-[450px] relative">
              <HiSearch className="text-xl absolute top-[10px] left-2 z-[10]" />
              <input
                className="w-full ps-9 pe-2 py-2 rounded-md outline-none bg-transparent border-gray-400/60 border"
                type="text"
                placeholder="Search vendor"
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
          </div>
        </div>
        <div className="flex flex-col gap-7">
          {error && <p className="text-red-500">{error}</p>}
          <table className="w-full">
            <thead className="w-full">
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className="w-[5%] text-center py-3 px-2">ID</th>
                <th className="w-[16%] text-start py-3 px-2">Name</th>
                <th className="w-[16%] text-start py-3 px-2">Address</th>
                <th className="w-[16%] text-center py-3 px-2">Notes</th>
                <th className="w-[16%] text-center py-3 px-2">Phone</th>
                <th className="w-[16%] text-center py-3 px-2">Balance</th>
                <th className="w-[15%] text-center py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors?.length > 0 ? (
                <>
                  {vendors.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-100"
                      }`}
                    >
                      <td className="py-4 px-2 text-center">{index + 1}</td>
                      <td className="py-4 px-2">{item.vendor_name}</td>
                      <td className="py-4 px-2">{item.address}</td>
                      <td className="py-4 px-2 text-center">{item.note}</td>
                      <td className="py-4 px-2 text-center">{item.phone}</td>
                      <td className="py-4 px-2 text-center">{item.balance}</td>
                      <td className="py-4 px-2 text-xl flex flex-row gap-5 justify-center items-center opacity-70">
                        <div
                          className="cursor-pointer"
                          onClick={() => viewVendorPopup(item)}
                        >
                          <HiOutlineEye />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => editVendorPopup(item)}
                        >
                          <HiOutlinePencilAlt />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => deleteVendorPopup(item)}
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
                      <p>No vendor found!</p>
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
