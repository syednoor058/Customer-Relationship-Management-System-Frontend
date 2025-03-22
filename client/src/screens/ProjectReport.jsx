import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getProjectLedger,
  getProjects,
} from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function ProjectReport() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  // const [fromDate, setFromDate] = useState(
  //   () => new Date().toISOString().split("T")[0]
  // );
  // const [toDate, setToDate] = useState(
  //   () => new Date().toISOString().split("T")[0]
  // );
  const [ledger, setLedger] = useState();
  const [selectedProject, setSelectedProject] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getProjectLedger(selectedProject);
      setLedger(data);
      //   console.log(data);
      handleReset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedProject(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const projectData = await getProjects();
        setProjects(projectData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="w-full flex flex-col gap-10 pb-10">
      <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
        <div className="flex flex-col gap-5">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
            <h1>Check Project Report</h1>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              <div className="w-full gap-10">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-10">
                    <div className="flex flex-col gap-1">
                      <label>Project</label>
                      <select
                        className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                        value={selectedProject}
                        onChange={(e) =>
                          setSelectedProject(Number(e.target.value))
                        }
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
      {ledger && (
        <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-10">
              <h1 className="w-full text-4xl font-semibold flex flex-row gap-3 items-center text-gray-900 text-center  justify-center underline underline-offset-4 uppercase">
                Project Ledger
              </h1>
              <div className="w-full grid grid-cols-4 gap-x-7 gap-y-2">
                <p className=" flex flex-row gap-2">
                  <span>Project Name:</span>
                  <span className="font-semibold capitalize">
                    {ledger.ledger_entries[0].project_name}
                  </span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Project ID:</span>
                  <span>{ledger.ledger_entries[0].project_id}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total Cash Given:</span>
                  <span>{ledger.total_cash_given}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total Employee Wage:</span>
                  <span>{ledger.total_employee_wage}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total Expense:</span>
                  <span>{ledger.total_expense}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total Cost:</span>
                  <span>{ledger.total_cost}</span>
                </p>
              </div>
            </div>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="w-full">
                <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                  <th className="w-[5%] text-center py-3 px-2">No.</th>
                  <th className="w-[19%] text-center py-3 px-2">Amount</th>
                  <th className="w-[19%] text-center py-3 px-2">
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
                {ledger?.ledger_entries?.length > 0 && (
                  <>
                    {ledger.ledger_entries.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-sm font-light rounded-md ${
                          (index + 1) % 2 === 0 && "bg-gray-100"
                        }`}
                      >
                        <td className="py-4 px-2 text-start">{index + 1}</td>
                        <td className="py-4 px-2 text-center">{item.amount}</td>
                        <td className="py-4 px-2 text-center">
                          {item.previous_balance}
                        </td>
                        <td className="py-4 px-2 text-center">
                          {item.current_balance}
                        </td>
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
