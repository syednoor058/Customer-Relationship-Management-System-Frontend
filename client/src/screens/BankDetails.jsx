import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DepositeBalance from "../components/accountComponents/DepositeBalance";
import WithdrawBalance from "../components/accountComponents/WithdrawBalance";
import {
  deleteAccountsById,
  getAccountsById,
} from "../components/apiServices/accountsAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function BankDetails() {
  const navigate = useNavigate();
  const { bankId } = useParams();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState();
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [deleteBank, setDeleteBank] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const deleteRes = await deleteAccountsById(bankId);
      toast.success(deleteRes.message);
      navigate("/dashboard/accounts");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchBankDetails = async () => {
      setLoading(true);
      try {
        const getData = await getAccountsById(bankId);
        setAccount(getData);
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchBankDetails();
  }, [bankId, token]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col gap-10 pb-10 font-light text-sm text-gray-600">
      {/* Delete Modal  */}

      {deleteBank && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50">
          <div className="w-full h-screen flex justify-center items-center">
            <div className=" bg-primaryColor rounded p-10 text-lg">
              <div className="flex flex-col gap-5">
                <div className="w-full flex justify-center">
                  <p>Confirm to delete this account?</p>
                </div>
                <div className="w-full flex flex-row gap-5 justify-center items-center">
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-5 py-2 bg-red-600 text-primaryColor rounded"
                    >
                      Confirm
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => setDeleteBank(false)}
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
          <p className="w-full text-center font-semibold text-4xl text-gray-950 underline uppercase underline-offset-4">
            Bank Details
          </p>
          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="flex flex-row gap-32 p-10 border border-dashed border-gray-400 rounded">
              <div>
                <table>
                  <tbody className="w-full flex flex-col gap-4">
                    <tr>
                      <td className="w-32">Name:</td>
                      <td className="text-gray-950 font-medium capitalize">
                        {account.bank_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Bank ID:</td>
                      <td className="text-gray-950 font-medium">
                        {account.id}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Balance:</td>
                      <td className="text-gray-950 font-medium">
                        {account.balance}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Created By:</td>
                      <td className="text-gray-950 font-medium">
                        {account.user_id}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <tbody className="w-full flex flex-col gap-4">
                    <tr>
                      <td className="w-32">Created At:</td>
                      <td className="text-gray-950 font-medium">
                        {account.created_at}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-32">Last Update:</td>
                      <td className="text-gray-950 font-medium">
                        {account.updated_at}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex">
                <Link
                  to="/dashboard/accounts"
                  className="px-5 py-2 border border-gray-500 text-gray-500 rounded"
                >
                  Back
                </Link>
              </div>
              <div className="flex">
                <Link
                  to={`/dashboard/accounts/edit/${bankId}`}
                  className="px-5 py-2 bg-blue-600 text-primaryColor rounded"
                >
                  Edit
                </Link>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setDeleteBank(true)}
                  className="px-5 py-2 bg-red-600 text-primaryColor rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row gap-10">
        <div className="w-[50%] bg-primaryColor p-5 rounded drop-shadow-xl border border-gray-200">
          <DepositeBalance bank_id={bankId} />
        </div>
        <div className="w-[50%] bg-primaryColor p-5 rounded drop-shadow-xl border border-gray-200">
          <WithdrawBalance bank_id={bankId} />
        </div>
      </div>
    </div>
  );
}
