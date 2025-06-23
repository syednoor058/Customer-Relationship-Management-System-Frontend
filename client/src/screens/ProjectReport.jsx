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
  const [currentProject, setCurrentProject] = useState(0);
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
    setCurrentProject(selectedProject);
    try {
      const data = await getProjectLedger(selectedProject);
      setLedger(data);
      // console.log(data);
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
                        className="ps-2 pe-5 py-2 rounded border border-gray-300 bg-transparent outline-none"
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
                            <option disabled className="text-start">
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
      <div className="w-full grid grid-cols-1 lg:grid-col-3">
        <div className="flex">
          <a
            href="https://estate.theabacuses.com/expenses"
            className="px-5 py-3 bg-blue-600 text-primaryColor rounded-sm"
            target="_blank"
          >
            Expense
          </a>
        </div>
        <div className="flex">
          <a
            href="https://estate.theabacuses.com/wages"
            className="px-5 py-3 bg-blue-600 text-primaryColor rounded-sm"
            target="_blank"
          >
            Wages
          </a>
        </div>
        <div className="flex">
          <a
            href="https://estate.theabacuses.com/cash-supply"
            className="px-5 py-3 bg-blue-600 text-primaryColor rounded-sm"
            target="_blank"
          >
            Cash Supply
          </a>
        </div>
      </div>
      {ledger && (
        <div className="w-full p-5 text-gray-600">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-10">
              <h1 className="w-full text-4xl font-semibold flex flex-row gap-3 items-center text-gray-900 text-start  justify-center underline underline-offset-4 uppercase">
                Project Ledger
              </h1>
              <div className="w-full grid grid-cols-4 gap-x-7 gap-y-2">
                <p className=" flex flex-row gap-2">
                  <span>Project name:</span>
                  <span className="font-semibold capitalize">
                    {
                      projects.find((project) => project.id == currentProject)
                        .project_name
                    }
                  </span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Project ID:</span>
                  <span>{currentProject}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total cash given:</span>
                  <span>{ledger.total_cash_given}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total employee wage:</span>
                  <span>{ledger.total_employee_wage}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total expense:</span>
                  <span>{ledger.total_expense}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total cost:</span>
                  <span>{ledger.total_cost}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Balance:</span>
                  <span>{ledger.balance}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total product given:</span>
                  <span>{ledger.total_product_given}</span>
                </p>
              </div>
            </div>
            <table className="w-full border-collapse">
              <thead className="w-full">
                <tr className="text-sm uppercase text-gray-700 rounded-sm border-b border-gray-300 divide-x-[1px] divide-gray-300 ">
                  <th className="w-[5%] text-start py-3 ps-2 pe-5 font-semibold">
                    No.
                  </th>
                  <th className="w-[19%] text-start py-3 ps-2 pe-5 font-semibold">
                    Amount
                  </th>
                  <th className="w-[19%] text-start py-3 ps-2 pe-5 font-semibold">
                    Previous Balance
                  </th>
                  <th className="w-[19%] text-start py-3 ps-2 pe-5 font-semibold">
                    Current Balance
                  </th>
                  <th className="w-[19%] text-start py-3 ps-2 pe-5 font-semibold">
                    Type
                  </th>
                  <th className="w-[19%] text-start py-3 ps-2 pe-5 font-semibold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {ledger?.ledger_entries?.length > 0 ? (
                  <>
                    {ledger.ledger_entries.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-sm font-light rounded-sm border-b border-gray-300`}
                      >
                        <td className="py-4 ps-2 pe-5 text-start">
                          {index + 1}
                        </td>
                        <td className="py-4 ps-2 pe-5 text-start">
                          {item.amount}
                        </td>
                        <td className="py-4 ps-2 pe-5 text-start">
                          {item.previous_balance}
                        </td>
                        <td className="py-4 ps-2 pe-5 text-start">
                          {item.current_balance}
                        </td>
                        <td className="py-4 ps-2 pe-5 text-start">
                          {item.type}
                        </td>
                        <td className="py-4 ps-2 pe-5 text-start">
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
            <h1>Products Ledger</h1>
            <div className="w-full overflow-x-scroll">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="w-full">
                  <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                    <th className=" text-start py-3 px-5">No.</th>
                    <th className=" text-start py-3 px-5">Product Name</th>
                    <th className=" text-start py-3 px-5">Quantity</th>
                    <th className=" text-start py-3 px-5">Previous Quantity</th>
                    <th className=" text-start py-3 px-5">Current Quantity</th>

                    <th className=" text-start py-3 px-5">Type</th>
                    <th className=" text-start py-3 px-5">Rate</th>
                    <th className=" text-start py-3 px-5">Price</th>
                    <th className=" text-start py-3 px-5">Total Price</th>
                    <th className=" text-start py-3 px-5">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger?.product_ledger?.length > 0 ? (
                    <>
                      {ledger.product_ledger?.map((item, index) => (
                        <tr
                          key={index}
                          className={`text-sm font-light rounded-md ${
                            (index + 1) % 2 === 0 && "bg-gray-100"
                          }`}
                        >
                          <td className="py-4 px-5 text-start">{index + 1}</td>
                          <td className="py-4 px-5 text-start">
                            {item.product_name}
                          </td>
                          <td className="py-4 px-5 text-start">{item.qty}</td>
                          <td className="py-4 px-5 text-start">
                            {item.previous_qty}
                          </td>
                          <td className="py-4 px-5 text-start">
                            {item.current_qty}
                          </td>
                          <td className="py-4 px-5 text-start">{item.type}</td>
                          <td className="py-4 px-5 text-start">{item.rate}</td>
                          <td className="py-4 px-5 text-start">{item.price}</td>
                          <td className="py-4 px-5 text-start">
                            {item.total_price}
                          </td>
                          <td className="py-4 px-5 text-start text-nowrap">
                            {item.created_at.split(" ")[0]}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td
                          colSpan="10"
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
      )}
    </div>
  );
}
