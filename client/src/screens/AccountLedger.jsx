import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAccountLedgerById,
  getAccounts,
} from "../components/apiServices/accountsAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function AccountLedger() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ledger, setLedger] = useState([]);
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [fromDate, setFromDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const getLedgerData = await getAccountLedgerById(selectedAccount);
      setLedger(getLedgerData);
      //   console.log(getLedgerData);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
      setSelectedAccount(0);
    }
  };

  const handleReset = () => {
    setSelectedAccount(0);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const accountsData = await getAccounts();
        setAccounts(accountsData);
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
    <div className="w-full flex flex-col gap-10 pb-10">
      <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
        <div className="flex flex-col gap-5">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
            <h1>Check Account Ledger</h1>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              <div className="w-full gap-10">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-10">
                    <div className="flex flex-col gap-2">
                      <label>Account</label>
                      <select
                        className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                        value={selectedAccount}
                        onChange={(e) =>
                          setSelectedAccount(Number(e.target.value))
                        }
                        required
                      >
                        <option value={0} disabled>
                          Select an account
                        </option>

                        {accounts.length === 0 ? (
                          <>
                            <option disabled className="text-center">
                              No account found!
                            </option>
                          </>
                        ) : (
                          <>
                            {accounts?.map((item) => (
                              <option
                                key={item.id}
                                value={item.id}
                                className="capitalize"
                              >
                                {item.bank_name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
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
                  </div>

                  <div className="flex flex-row gap-5">
                    <div className="flex">
                      <button
                        type="submit"
                        className="px-5 py-3 bg-blue-600 text-primaryColor rounded"
                      >
                        Check
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-3 border border-blue-600 text-blue-600 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">
        <div className="flex w-full">
          <a
            href="https://estate.theabacuses.com/bank/history"
            className="w-full text-center px-5 py-3 bg-blue-600 text-primaryColor rounded-sm"
            target="_blank"
          >
            Ledger Edit
          </a>
        </div>
      </div>
      {ledger.length > 0 && (
        <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-10">
              <h1 className="w-full text-4xl font-semibold flex flex-row gap-3 items-center text-gray-900 text-center  justify-center underline underline-offset-4 uppercase">
                Account Ledger
              </h1>
              <div className="w-full flex flex-row justify-between items-center">
                <p className=" flex flex-row gap-2">
                  <span>Name:</span>
                  <span className="font-semibold uppercase">
                    {ledger[0].bank_name}
                  </span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>ID:</span>
                  <span>{ledger[0].bank_id}</span>
                </p>
              </div>
            </div>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="w-full">
                <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                  <th className="w-[5%] text-center py-3 px-2">ID</th>
                  <th className="w-[19%] text-start py-3 px-2">Amount</th>
                  <th className="w-[19%] text-start py-3 px-2">
                    Previous Balance
                  </th>
                  <th className="w-[19%] text-center py-3 px-2">
                    Current Balance
                  </th>
                  <th className="w-[19%] text-center py-3 px-2">Type</th>
                  <th className="w-[19%] text-center py-3 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {ledger?.length > 0 && (
                  <>
                    {ledger.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-sm font-light rounded-md ${
                          (index + 1) % 2 === 0 && "bg-gray-100"
                        }`}
                      >
                        <td className="py-4 px-2 text-center">{item.id}</td>
                        <td className="py-4 px-2">{item.amount}</td>
                        <td className="py-4 px-2">{item.previous_balance}</td>
                        <td className="py-4 px-2">{item.current_balance}</td>
                        <td className="py-4 px-2 text-center">{item.type}</td>
                        <td className="py-4 px-2 text-center">
                          {item.created_at.split(" ")[0]}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
