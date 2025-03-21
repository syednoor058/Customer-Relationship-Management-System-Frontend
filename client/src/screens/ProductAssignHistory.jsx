import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProductAssignmentHistory } from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function ProductAssignHistory() {
  const [assignDate, setAssignDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [hist, setHist] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInventoryPurchaseHistory = async () => {
      setLoading(true);
      try {
        const purchaseHistory = await getProductAssignmentHistory(assignDate);
        setHist(purchaseHistory);
        // console.log(purchaseHistory);
      } catch (error) {
        toast.error(error.message || "Error occured while fetching data!");
      } finally {
        setLoading(false);
      }
    };
    fetchInventoryPurchaseHistory();
  }, [assignDate]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
      <div className="flex flex-col gap-10 pb-10">
        <div className="text-4xl font-bold text-center">
          <h1>Product(s) Assign History</h1>
        </div>
        <div className="flex flex-row gap-5 justify-center items-center">
          <label>Select Date:</label>
          <input
            className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
            type="date"
            value={assignDate}
            onChange={(e) => setAssignDate(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead className="w-full">
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className="w-[10%] text-center py-3 px-2">ID</th>
                <th className="w-[45%] text-start py-3 px-2">Project Name</th>
                <th className="w-[25%] text-center py-3 px-2">Date</th>
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
                      <td className="py-4 px-2">{item.project_name}</td>
                      <td className="py-4 px-2 text-center">
                        {item.created_at}
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
                      <p>No assign history found!</p>
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
