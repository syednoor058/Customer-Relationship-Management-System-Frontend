import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSupplyCashHistory,
  supplyProjectCash,
} from "../components/apiServices/cashAPIServices";
import { getProjects } from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function CashSupply() {
  const [historyDate, setHistoryDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [amount, setAmount] = useState(0);
  const [cashHistory, setCashHistory] = useState([]);
  const token = localStorage.getItem("shikderFoundationAuthToken");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await supplyProjectCash(selectedProject, amount);
      if (res.message === "Cash supply recorded successfully") {
        const updatedCashHistory = await getSupplyCashHistory(historyDate);
        setCashHistory(updatedCashHistory);
      }
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      handleReset();
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedProject(0);
    setAmount(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const projectRes = await getProjects();
        const projectCashHistory = await getSupplyCashHistory(historyDate);
        setCashHistory(projectCashHistory);
        setProjects(projectRes);
        // console.log(projectCashHistory);
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [historyDate, token]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-full flex flex-col gap-10 pb-10">
      {/* Cash Suppy Entry */}
      <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
        <div className="flex flex-col gap-5">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
            <h1>Supply Cash Entry</h1>
          </div>
          <div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="w-full grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <label>Project</label>
                  <select
                    className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(Number(e.target.value))}
                    required
                  >
                    <option value={0} disabled>
                      Select a project
                    </option>

                    {projects.length === 0 ? (
                      <>
                        <option disabled className="text-center">
                          No project found!
                        </option>
                      </>
                    ) : (
                      <>
                        {projects?.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            className="capitalize"
                          >
                            {item.project_name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label>Amount</label>
                  <input
                    type="number"
                    placeholder="Cash amount"
                    className="p-2 border rounded w-full outline-none"
                    min={0}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
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
                    Supply
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

      {/* Cash Supply History  */}
      <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 items-center">
            <div className="w-full text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900 justify-center">
              <h1>Supply Cash History</h1>
            </div>
            <div className="flex flex-row gap-5 justify-center items-center">
              <label>Select Date:</label>
              <input
                className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                type="date"
                value={historyDate}
                onChange={(e) => setHistoryDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <table className="w-full">
              <thead className="w-full">
                <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                  <th className="w-[10%] text-center py-3 px-2">ID</th>
                  <th className="w-[35%] text-start py-3 px-2">Project Name</th>
                  <th className="w-[20%] text-center py-3 px-2">Amount</th>
                  <th className="w-[25%] text-center py-3 px-2">Created At</th>
                  <th className="w-[10%] text-center py-3 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cashHistory.length > 0 ? (
                  <>
                    {cashHistory.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-sm font-light rounded-md ${
                          (index + 1) % 2 === 0 && "bg-gray-200/60"
                        }`}
                      >
                        <td className="py-4 px-2 text-center">{item.id}</td>
                        <td className="py-4 px-2">{item.project_name}</td>
                        <td className="py-4 px-2 text-center">
                          {item.cash_amount}
                        </td>
                        <td className="py-4 px-2 text-center">
                          {item.created_at.split(" ")[1]}
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
    </div>
  );
}
