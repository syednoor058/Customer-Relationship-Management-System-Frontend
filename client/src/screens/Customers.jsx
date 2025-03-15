import { useEffect, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomers } from "../components/apiServices/customersAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function Customers() {
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  //   const [page, setPage] = useState(10);
  //   const [sort, setSort] = useState("no");

  //   const handleChangeSort = (event) => {
  //     setSort(event.target.value);
  //   };

  //   const handleChange = (event) => {
  //     setPage(event.target.value);
  //   };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const getData = await getCustomers();
        setCustomers(getData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col gap-5 pb-10 font-light text-sm text-gray-600">
      <div className="w-full h-full flex flex-col gap-10 bg-primaryColor p-5 rounded drop-shadow-xl border border-gray-200">
        <div className="flex flex-row justify-between">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
            <span className="text-4xl">
              <FcBriefcase />
            </span>
            All Customers
          </div>
          <Link
            to="/dashboard/customers/add-customer"
            className="px-3 py-3 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 justify-center items-center"
          >
            <span className="text-xl">
              <HiOutlinePlusCircle />
            </span>
            Add Customer
          </Link>
        </div>
        {/* <div className="mt-5 flex flex-row justify-between items-center gap-5">
          <div>
            <div className="w-[450px] relative">
              <HiSearch className="text-xl absolute top-[10px] left-2 z-[10]" />
              <input
                className="w-full ps-9 pe-2 py-2 rounded-md outline-none bg-transparent border-gray-400/60 border"
                type="text"
                placeholder="Search customer"
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
        </div> */}
        <div className="flex flex-col gap-7">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="w-full">
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className="w-[5%] text-center py-3 px-2">No.</th>
                <th className="w-[20%] text-start py-3 px-2">Customer Name</th>
                <th className="w-[15%] text-start py-3 px-2">NID</th>
                <th className="w-[10%] text-start py-3 px-2">Phone</th>
                <th className="w-[15%] text-start py-3 px-2">Address</th>
                <th className="w-[10%] text-start py-3 px-2">Balance</th>
                <th className="w-[15%] text-start py-3 px-2">Added By</th>
                <th className="w-[10%] text-start py-3 px-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {customers?.length > 0 ? (
                <>
                  {customers.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-100"
                      }`}
                    >
                      <td className="py-4 px-2 text-center">{index + 1}</td>
                      <td className="py-4 px-2">
                        <Link
                          to={`/dashboard/customers/details/${item.id}`}
                          className="hover:text-blue-600 transition-colors duration-[350ms]"
                        >
                          {item.customer_name}
                        </Link>
                      </td>
                      <td className="py-4 px-2">{item.nid}</td>
                      <td className="py-4 px-2">{item.phone}</td>
                      <td className="py-4 px-2">{item.address}</td>
                      <td className="py-4 px-2">{item.balance}</td>
                      <td className="py-4 px-2">{item.added_by}</td>
                      <td className="py-4 px-2">
                        {item.created_at.split(" ")[0]}
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
                      <p>No customer found!</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          {/* <div className="flex flex-row justify-between items-center">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
