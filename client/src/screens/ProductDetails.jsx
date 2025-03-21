import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdImageNotSupported } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCategory,
  getInventoryById,
  getSingleProductLedger,
} from "../components/apiServices/apiServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import { getUsers } from "./../components/apiServices/userAPIServices";

export default function ProductDetails() {
  const { productId } = useParams();
  const [fromDate, setFromDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState();
  const [ledger, setLedger] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalItems = ledger.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = ledger.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const productDetails = await getInventoryById(productId);
        const productLedger = await getSingleProductLedger(productId);
        const categoryData = await getCategory();
        const usersData = await getUsers();
        setUsers(usersData);
        setProduct(productDetails.inventory);
        setCategories(categoryData.inventory_category);
        setLedger(productLedger);
        // console.log(usersData);
        // console.log(productDetails);
        // console.log(productLedger);
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, token]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col pt-5 gap-10 pb-10 font-light text-sm text-gray-600">
      <div className="w-full flex flex-col gap-5 px-3 lg:px-0">
        <div className="w-full text-gray-500 hover:text-blue-500 transition-colors duration-[350ms] flex flex-col gap-2">
          <Link to="/dashboard/products">
            <div className="flex flex-row gap-1  rounded-xl">
              <span className="text-4xl">
                <IoIosArrowRoundBack />
              </span>
            </div>
          </Link>
        </div>
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800 py-2 lg:py-4">
          <h1>Product Details</h1>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-7 lg:gap-20">
          <div className="w-full hidden lg:w-[50%] aspect-square bg-blue-100 rounded-sm">
            <div className="w-full h-full flex flex-col justify-center items-center p-10 gap-2">
              <div className="text-4xl">
                <MdImageNotSupported />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-gray-800 text-center">
                  No image found
                </p>
                <p className="text-base font-light text-gray-600 text-center">
                  SVG, PNG, or JPG
                </p>
                <p className="text-sm font-light text-gray-400 text-center">
                  Recommended size (1000px*1000px)
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%] flex flex-col gap-10 text-sm">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-medium text-gray-600 leading-none">
                General Information
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Name:</td>
                    <td className="font-medium">{product.product_name}</td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Product ID:</td>
                    <td className="font-medium">{product.id}</td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Category:</td>
                    <td className="font-medium">
                      {
                        categories.find((cat) => cat.id === product.category_id)
                          .category_name
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Created by:</td>
                    <td className="font-medium">{users.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-lg font-medium text-gray-600 leading-none">
                Stock Details
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Quantity:</td>
                    <td className="font-medium">{product.quantity}</td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Price:</td>
                    <td className="font-medium">{product.price}</td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Created at:</td>
                    <td className="font-medium">
                      {product.created_at.split(" ")[0]}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[35%] pe-5 py-2">Last update:</td>
                    <td className="font-medium">
                      {product.updated_at.split(" ")[0]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800 py-2 lg:py-4 px-3 lg:px-0">
          <h1>Product Ledger</h1>
        </div>
        <div className="grid grid-cols-5 gap-5">
          <div className="flex flex-col gap-1">
            <label>From:</label>
            <input
              className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>To:</label>
            <input
              className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
            >
              Set Date
            </button>
          </div>
        </div>
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
          <table className="w-full hidden lg:inline-table">
            <thead className="w-full">
              <tr className="text-sm text-gray-800 rounded-sm font-normal bg-blue-100">
                <th className="w-[10%] text-start py-4 px-3 font-normal">
                  Index
                </th>
                <th className="w-[17%] text-center py-4 px-3 font-normal">
                  Quantity
                </th>
                <th className="w-[17%] text-center py-4 px-3 font-normal">
                  Current Quantity
                </th>
                <th className="w-[17%] text-center py-4 px-3 font-normal">
                  Previous Quantity
                </th>
                <th className="w-[17%] text-center py-4 px-3 font-normal">
                  Type
                </th>
                <th className="w-[22%] text-center py-4 px-3 font-normal">
                  Date
                </th>
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
                      <td className="py-4 px-3 text-center">{item.qty}</td>
                      <td className="py-4 px-3 text-center">
                        {item.current_qty}
                      </td>
                      <td className="py-4 px-3 text-center">
                        {item.previous_qty}
                      </td>
                      <td className="py-4 px-3 text-center">{item.type}</td>
                      <td className="py-4 px-3 text-center">
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
                      <p>No ledger found!</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <table className="w-full inline-table lg:hidden text-[10px] bg-primaryColor">
            <thead className="w-full">
              <tr className="text-sm text-gray-800 rounded-sm font-normal bg-blue-100">
                <th className="w-[3%] text-start py-4 px-[5px] font-normal">
                  No
                </th>
                <th className="w-[19%] text-start py-4 px-[5px] font-normal">
                  Quantity
                </th>
                <th className="w-[19%] text-start py-4 px-[5px] font-normal">
                  Current Quantity
                </th>
                <th className="w-[19%] text-center py-4 px-[5px] font-normal">
                  Previous Quantity
                </th>
                <th className="w-[19%] text-center py-4 px-[5px] font-normal">
                  Type
                </th>
                <th className="w-[21%] text-center py-4 px-[5px] font-normal">
                  Date
                </th>
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
                      <td className="py-4 px-[5px] text-start">{index + 1}</td>
                      <td className="py-4 px-[5px]">{item.qty}</td>
                      <td className="py-4 px-[5px]">{item.current_qty}</td>
                      <td className="py-4 px-[5px] text-center">
                        {item.previous_qty}
                      </td>
                      <td className="py-4 px-[5px] text-center">{item.type}</td>
                      <td className="py-4 px-[5px] text-center">
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
