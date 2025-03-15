import { useState } from "react";
import { toast } from "react-toastify";
import { addNewCustomer } from "../components/apiServices/customersAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function AddCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [nid, setNid] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resData = await addNewCustomer(
        customerName,
        address,
        nid,
        phone,
        balance
      );
      handleReset();
      toast.success(resData.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCustomerName("");
    setAddress("");
    setNid("");
    setPhone("");
    setBalance(0);
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col gap-5 pb-10 font-light text-sm text-gray-600">
      <div className="w-full h-full flex flex-col gap-5 bg-primaryColor p-5 rounded drop-shadow-xl border border-gray-200">
        <div className="flex flex-col gap-10">
          <p className="w-full text-center font-bold text-2xl text-gray-950  uppercase">
            Add New Customer
          </p>
          <form
            className="w-full flex flex-col gap-5 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-row gap-20 p-10 border border-dashed border-gray-400 rounded">
              <div className="w-[50%] flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    className="p-2 border rounded w-full outline-none"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>National Id</label>
                  <input
                    type="text"
                    placeholder="Enter national ID card number"
                    className="p-2 border rounded w-full outline-none"
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="p-2 border rounded w-full outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="w-[50%] flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    className="p-2 border rounded w-full outline-none"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
            </div>
            <div className="flex flex-row gap-5 justify-center items-center">
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
