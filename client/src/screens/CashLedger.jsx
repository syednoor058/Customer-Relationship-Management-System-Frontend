import { useEffect, useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { getCashLedger } from "../components/apiServices/accountsAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function CashLedger() {
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [loading, setLoading] = useState(true);
  const [ledger, setLedger] = useState([]);
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const filterLedger = async () => {
    setLoading(true);
    try {
      const filteredData = await getCashLedger({
        dateFrom: fromDate,
        dateTo: toDate,
      });
      setLedger(filteredData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const cashLedgerData = await getCashLedger({
          dateFrom: "2025-01-01",
          dateTo: new Date().toISOString().split("T")[0],
        });
        setLedger(cashLedgerData);
        // console.log(cashLedgerData);
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
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
    <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          <h1 className="w-full text-4xl font-semibold flex flex-row gap-3 items-center text-gray-900 text-center  justify-center underline underline-offset-4 uppercase">
            Cash Ledger
          </h1>
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
              onClick={filterLedger}
              className="px-3 lg:px-4 py-3 lg:py-3 rounded-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-[350ms] text-primaryColor flex flex-row gap-2 justify-center items-center"
            >
              <span className="text-base lg:text-lg">
                <MdOutlineFilterAlt />
              </span>
              Filter
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-scroll">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="w-full">
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className=" text-center py-3 px-2">ID</th>
                <th className=" text-center py-3 px-2">Amount</th>
                <th className=" text-center py-3 px-2">Previous Balance</th>
                <th className=" text-center py-3 px-2">Current Balance</th>
                <th className=" text-center py-3 px-2">TranxID</th>
                <th className=" text-center py-3 px-2">Type</th>
                <th className=" text-center py-3 px-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {ledger?.length > 0 ? (
                <>
                  {ledger.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-100"
                      }`}
                    >
                      <td className="py-4 px-2 text-center">{item.id}</td>
                      <td className="py-4 px-2 text-center">{item.amount}</td>
                      <td className="py-4 px-2 text-center">
                        {item.previous_balance}
                      </td>
                      <td className="py-4 px-2 text-center">
                        {item.current_balance}
                      </td>
                      <td className="py-4 px-2 text-center">
                        {item.transaction_id}
                      </td>
                      <td className="py-4 px-2 text-center">{item.type}</td>
                      <td className="py-4 px-2 text-center text-nowrap">
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
        </div>
      </div>
    </div>
  );
}
