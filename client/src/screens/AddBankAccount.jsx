import { useState } from "react";
import { toast } from "react-toastify";
import { addAccounts } from "../components/apiServices/accountsAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function AddBankAccount() {
  const [bankName, setBankName] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resData = await addAccounts(bankName, balance);
      handleReset();
      toast.success(resData.message);
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

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col gap-5 pb-10 font-light text-sm text-gray-600">
      <div className="w-full h-full flex flex-col gap-5 bg-primaryColor p-5 rounded drop-shadow-xl border border-gray-200">
        <div className="flex flex-col gap-10">
          <p className="w-full text-center font-semibold text-4xl text-gray-950 underline uppercase underline-offset-4">
            Add Bank Account
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
                  Submit
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
