import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editAccountsById,
  getAccountsById,
} from "../components/apiServices/accountsAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function EditBankDetails() {
  const navigate = useNavigate();
  const { bankId } = useParams();
  const [bankName, setBankName] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("shikderFoundationAuthToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resData = await editAccountsById(bankId, bankName, balance);
      toast.success(resData.message);
      navigate(`/dashboard/accounts/details/${bankId}`);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBankName("");
    setBalance(0);
  };
  useEffect(() => {
    const fetchBankDetails = async () => {
      setLoading(true);
      try {
        const getData = await getAccountsById(bankId);
        setBankName(getData.bank_name);
        setBalance(getData.balance);
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
    <div className="flex flex-col gap-5 pb-10 font-light text-sm text-gray-600">
      <div className="w-full h-full flex flex-col gap-5 bg-primaryColor p-5 rounded drop-shadow-xl border border-gray-200">
        <div className="flex flex-col gap-10">
          <p className="w-full text-center font-semibold text-4xl text-gray-950 underline uppercase underline-offset-4">
            Edit Bank Details
          </p>
          <form
            className="w-full flex flex-col gap-5 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row gap-32 p-10 border border-dashed border-gray-400 rounded">
              <div className="flex flex-col gap-1">
                <label>Bank Name</label>
                <input
                  type="text"
                  placeholder="Bank name"
                  className="p-2 border rounded w-full outline-none"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Balance</label>
                <input
                  type="number"
                  placeholder="Bank balance"
                  className="p-2 border rounded w-full outline-none"
                  min={0}
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex">
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-primaryColor rounded"
                >
                  Save
                </button>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="px-5 py-2 bg-red-600 text-primaryColor rounded"
                  onClick={handleReset}
                >
                  Clear
                </button>
              </div>
              <div className="flex">
                <Link
                  to={`/dashboard/accounts/details/${bankId}`}
                  className="px-5 py-2 border border-gray-500 text-gray-500 rounded"
                >
                  Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
