import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomerById } from "../components/apiServices/customersAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function CustomerDetails() {
  // const navigate = useNavigate();
  const { customerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState();
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [deleteCustomer, setDeleteCustomer] = useState(false);

  //   const handleDelete = async () => {
  //     setLoading(true);
  //     try {
  //       const deleteRes = await deleteAccountsById(bankId);
  //       toast.success(deleteRes.message);
  //       navigate("/dashboard/accounts");
  //     } catch (error) {
  //       toast.error(error.message || "Something went wrong!");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const getData = await getCustomerById(customerId);
        setCustomer(getData);
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [customerId, token]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col gap-10 pb-10 font-light text-sm text-gray-600">
      {/* Delete Modal  */}

      {deleteCustomer && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50">
          <div className="w-full h-screen flex justify-center items-center">
            <div className=" bg-primaryColor rounded p-10 text-lg">
              <div className="flex flex-col gap-5">
                <div className="w-full flex justify-center">
                  <p>Confirm to delete this customer?</p>
                </div>
                <div className="w-full flex flex-row gap-5 justify-center items-center">
                  <div className="flex">
                    <button
                      type="button"
                      //   onClick={handleDelete}
                      className="px-5 py-2 bg-red-600 text-primaryColor rounded"
                    >
                      Confirm
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => setDeleteCustomer(false)}
                      className="px-5 py-2 border border-gray-500 text-gray-500 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-full flex flex-col gap-10 bg-primaryColor p-5 rounded drop-shadow-xl border border-gray-200">
        <div className="flex flex-col gap-10">
          <p className="w-full text-center font-bold text-2xl text-gray-950  uppercase">
            Customer Details
          </p>
          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="flex flex-row gap-32 p-10 border border-dashed border-gray-400 rounded">
              <div>
                <table>
                  <tbody className="w-full flex flex-col gap-4">
                    <tr>
                      <td className="w-32">Name:</td>
                      <td className="text-gray-950 font-medium capitalize">
                        {customer.customer_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Customer ID:</td>
                      <td className="text-gray-950 font-medium">
                        {customer.id}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Phone:</td>
                      <td className="text-gray-950 font-medium">
                        {customer.phone}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">National ID:</td>
                      <td className="text-gray-950 font-medium">
                        {customer.nid}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Address:</td>
                      <td className="text-gray-950 font-medium">
                        {customer.address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <tbody className="w-full flex flex-col gap-4">
                    <tr>
                      <td className="w-32">Balance:</td>
                      <td className="text-gray-950 font-medium">
                        {customer.balance}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Added By:</td>
                      <td className="text-gray-950 font-medium">
                        {customer.added_by}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Created At:</td>
                      <td className="text-gray-950 font-medium">
                        {customer.created_at}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex">
                <Link
                  to="/dashboard/customers"
                  className="px-5 py-2 border border-gray-500 text-gray-500 rounded"
                >
                  Back
                </Link>
              </div>
              <div className="flex">
                <Link
                  to={`/dashboard/accounts/edit/${customerId}`}
                  className="px-5 py-2 bg-blue-600 text-primaryColor rounded"
                >
                  Edit
                </Link>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setDeleteCustomer(true)}
                  className="px-5 py-2 bg-red-600 text-primaryColor rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
