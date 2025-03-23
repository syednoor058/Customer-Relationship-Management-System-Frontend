import { useEffect, useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { toast } from "react-toastify";
import {
  getEmployeeLedgerById,
  getEmployees,
} from "../components/apiServices/employeeAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function EmployeeLedger() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [currentEmployee, setCurrentEmployee] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const initialFromDate = "2025-01-01";
  const initialToDate = new Date().toISOString().split("T")[0];
  const [ledger, setLedger] = useState();
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const filterLedger = async () => {
    setLoading(true);
    try {
      const filteredData = await getEmployeeLedgerById({
        id: currentEmployee,
        dateFrom: fromDate,
        dateTo: toDate,
      });
      setLedger(filteredData.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentEmployee(selectedEmployee);
    setFromDate(initialFromDate);
    setToDate(initialToDate);
    setLoading(true);
    try {
      const getLedgerData = await getEmployeeLedgerById({
        id: selectedEmployee,
        dateFrom: initialFromDate,
        dateTo: initialToDate,
      });
      setLedger(getLedgerData);
      // console.log(getLedgerData);
      setSelectedEmployee(0);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedEmployee(0);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);
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
            <h1>Check Employee Ledger</h1>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              <div className="w-full gap-10">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-10">
                    <div className="flex flex-col gap-1">
                      <label>Employee</label>
                      <select
                        className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                        value={selectedEmployee}
                        onChange={(e) =>
                          setSelectedEmployee(Number(e.target.value))
                        }
                        required
                      >
                        <option value={0} disabled>
                          Select an employee
                        </option>

                        {employees.length === 0 ? (
                          <>
                            <option disabled className="text-center">
                              No employee found!
                            </option>
                          </>
                        ) : (
                          <>
                            {employees?.map((item) => (
                              <option
                                key={item.id}
                                value={item.id}
                                className="capitalize"
                              >
                                {item.employee_name}
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
      {(currentEmployee > 0 || ledger?.ledger_entries.length > 0) && (
        <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-10">
              <h1 className="w-full text-4xl font-semibold flex flex-row gap-3 items-center text-gray-900 text-center  justify-center underline underline-offset-4 uppercase">
                Employee Ledger
              </h1>
              <div className="w-full grid grid-cols-4 gap-x-7 gap-y-3 items-center">
                <p className=" flex flex-row gap-2">
                  <span>Employee Name:</span>
                  <span className="font-semibold capitalize">
                    {
                      employees.find(
                        (employee) => employee.id == currentEmployee
                      ).employee_name
                    }
                  </span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Employee ID:</span>
                  <span>{currentEmployee}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Days Present:</span>
                  <span>{ledger.totals.days_present}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total Given:</span>
                  <span>{ledger.totals.total_given}</span>
                </p>
                <p className=" flex flex-row gap-2">
                  <span>Total Salary:</span>
                  <span>{ledger.totals.total_salary}</span>
                </p>
              </div>
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
                    <th className=" text-center py-3 px-5">ID</th>
                    <th className=" text-start py-3 px-5">Project Name</th>
                    <th className=" text-center py-3 px-5">Amount</th>
                    <th className=" text-center py-3 px-5">Previous Balance</th>
                    <th className=" text-center py-3 px-5">Current Balance</th>
                    <th className=" text-center py-3 px-5">Salary</th>
                    <th className=" text-center py-3 px-5">Type</th>
                    <th className=" text-center py-3 px-5">TrnxID</th>
                    <th className=" text-center py-3 px-5">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger?.ledger_entries.length > 0 ? (
                    <>
                      {ledger.ledger_entries.map((item, index) => (
                        <tr
                          key={index}
                          className={`text-sm font-light rounded-md ${
                            (index + 1) % 2 === 0 && "bg-gray-100"
                          }`}
                        >
                          <td className="py-4 px-5 text-center">{item.id}</td>
                          <td className="py-4 px-5 text-start">
                            {item.project_name}
                          </td>
                          <td className="py-4 px-5 text-center">
                            {item.amount}
                          </td>
                          <td className="py-4 px-5 text-center">
                            {item.previous_balance}
                          </td>
                          <td className="py-4 px-5 text-center">
                            {item.current_balance}
                          </td>
                          <td className="py-4 px-5 text-center">
                            {item.salary}
                          </td>
                          <td className="py-4 px-5 text-center">{item.type}</td>
                          <td className="py-4 px-5 text-center">
                            {item.transaction_id}
                          </td>
                          <td className="py-4 px-5 text-center text-nowrap">
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
      )}
    </div>
  );
}
