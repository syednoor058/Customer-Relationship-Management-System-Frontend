import { useState } from "react";
import { toast } from "react-toastify";
import { withdrawAccount } from "../apiServices/accountsAPIServices";

// eslint-disable-next-line react/prop-types
export default function WithdrawBalance({ bank_id }) {
  const [amount, setAmount] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resData = await withdrawAccount(bank_id, amount);
      toast.success(resData.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAmount(0);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <p className="font-semibold text-gray-950 text-2xl">Withdraw Balance</p>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Deposite amount"
            className="p-2 border rounded w-full outline-none"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-primaryColor rounded"
          >
            Withdraw
          </button>
        </div>
      </form>
    </div>
  );
}
