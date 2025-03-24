import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supplyProjectCash } from "../components/apiServices/cashAPIServices";
import { getProjects } from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function CashSupply() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [amount, setAmount] = useState(0);
  const token = localStorage.getItem("shikderFoundationAuthToken");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await supplyProjectCash(selectedProject, amount);
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
        setProjects(projectRes);
        // console.log(projectCashHistory);
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
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
    </div>
  );
}
