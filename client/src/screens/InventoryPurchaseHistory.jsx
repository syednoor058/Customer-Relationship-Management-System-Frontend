import { useEffect, useState } from "react";
import { FcClock } from "react-icons/fc";
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
        // console.log(purchaseHistory);
      } catch (error) {
        toast.error(error.message || "Error occured while fetching data!");
      }
    };
    fetchInventoryPurchaseHistory();
  }, [purchaseDate]);

  return (
    <div className="w-full rounded-sm text-gray-500 pt-5">
      <div className="flex flex-col gap-10 pb-10">
        <div className="text-xl lg:text-2xl font-semibold flex flex-row gap-3 items-center text-gray-800 px-3 lg:px-0">
          <span className="text-2xl lg:text-3xl">
            <FcClock />
          </span>
          <span>Products Purchase History</span>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-3 items-center px-3 lg:px-0">
            <label>Select Date:</label>
            <input
              className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              required
            />
          </div>
          <div className="w-full drop-shadow-xl border bg-primaryColor border-blue-200">
            <table className="w-full">
              <thead className="w-full">
                <tr className="text-sm text-gray-800 rounded-sm font-normal bg-blue-100">
                  <th className="w-[10%] text-start py-4 px-3 font-normal">
                    ID
                  </th>
                  <th className="w-[35%] text-start py-4 px-3 font-normal">
                    Vendor Name
                  </th>
                  <th className="w-[30%] text-center py-4 px-3 font-normal">
                    Total
                  </th>
                  <th className="w-[25%] text-center py-4 px-3 font-normal">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {hist.length > 0 ? (
                  <>
                    {hist.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-sm font-light rounded-sm border-b border-blue-100`}
                      >
                        <td className="py-4 ps-4 pe-3 text-start">{item.id}</td>
                        <td className="py-4 px-3">{item.vendor_name}</td>
                        <td className="py-4 px-3 text-center">{item.total}</td>
                        <td className="py-4 px-3 text-center">
                          {item.created_at.split(" ")[1]}
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
    </div>
  );
}
