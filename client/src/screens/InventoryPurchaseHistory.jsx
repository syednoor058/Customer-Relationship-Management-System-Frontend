import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getInventoryPurchaseHistory } from "../components/apiServices/apiServices";

export default function InventoryPurchaseHistory() {
  const [purchaseDate, setPurchaseDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [hist, setHist] = useState([]);

  useEffect(() => {
    const fetchInventoryPurchaseHistory = async () => {
      try {
        const purchaseHistory = await getInventoryPurchaseHistory(purchaseDate);
        setHist(purchaseHistory);
      } catch (error) {
        toast.error(error.message || "Error occured while fetching data!");
      }
    };
    fetchInventoryPurchaseHistory();
  }, [purchaseDate]);

  return (
    <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
      <div className="flex flex-col gap-10 pb-10">
        <div className="text-2xl font-bold text-center uppercase">
          <h1>Products Purchase History</h1>
        </div>
        <div className="flex flex-row gap-5 justify-center items-center">
          <label>Select Date:</label>
          <input
            className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead className="w-full">
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className="w-[10%] text-center py-3 px-2">ID</th>
                <th className="w-[25%] text-start py-3 px-2">Total</th>
                <th className="w-[45%] text-center py-3 px-2">Vendor Name</th>
                <th className="w-[20%] text-center py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hist.length > 0 ? (
                <>
                  {hist.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-200/60"
                      }`}
                    >
                      <td className="py-4 px-2 text-center">{item.id}</td>
                      <td className="py-4 px-2">{item.total}</td>
                      <td className="py-4 px-2 text-center">
                        {item.vendor_name}
                      </td>
                      <td className=" px-2 py-2 flex flex-row gap-5 justify-center items-center opacity-70">
                        <div className="cursor-pointer px-3 py-1 bg-blue-600 text-primaryColor">
                          Print
                        </div>
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
                      <p>No purchase found!</p>
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
