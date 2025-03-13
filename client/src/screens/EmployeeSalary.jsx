import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  employeeSalarySubmit,
  getEmployeeForSalary,
  getEmployeesSalary,
} from "../components/apiServices/employeeAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function EmployeeSalary() {
  const [historyDate, setHistoryDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [salary, setSalary] = useState(0);
  const [salaryHistory, setSalaryHistory] = useState([]);
  const token = localStorage.getItem("shikderFoundationAuthToken");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await employeeSalarySubmit(selectedEmployee, salary);
      if (res.message === "Salary added successfully") {
        const updatedSalaryHistory = await getEmployeesSalary(historyDate);
        setSalaryHistory(updatedSalaryHistory);
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
    setSelectedEmployee(0);
    setSalary(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employeesRes = await getEmployeeForSalary();
        const employeesSalaryHistory = await getEmployeesSalary(historyDate);
        setSalaryHistory(employeesSalaryHistory);
        setEmployees(employeesRes);
        // console.log(employeesSalaryHistory);
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
      {/* Employee Salary Entry */}
      <div className="w-full p-5 rounded drop-shadow-xl border bg-primaryColor border-gray-200 text-gray-600">
        <div className="flex flex-col gap-5">
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900">
            <h1>Employee Salary Entry</h1>
          </div>
          <div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="w-full grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
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
                <div className="flex flex-col gap-2">
                  <label>Salary</label>
                  <input
                    type="number"
                    placeholder="Salary amount"
                    className="p-2 border rounded w-full outline-none"
                    min={0}
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
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
                    Submit
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
              <h1>Employee Salary History</h1>
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
                  <th className="w-[5%] text-center py-3 px-2">ID</th>
                  <th className="w-[20%] text-start py-3 px-2">
                    Employee Name
                  </th>
                  <th className="w-[10%] text-center py-3 px-2">Amount</th>
                  <th className="w-[10%] text-center py-3 px-2">Type</th>
                  <th className="w-[10%] text-center py-3 px-2">
                    Current Balance
                  </th>
                  <th className="w-[10%] text-center py-3 px-2">
                    Previous Balance
                  </th>
                  <th className="w-[25%] text-center py-3 px-2">Created At</th>
                  <th className="w-[10%] text-center py-3 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {salaryHistory.length > 0 ? (
                  <>
                    {salaryHistory.map((item, index) => (
                      <tr
                        key={index}
                        className={`text-sm font-light rounded-md ${
                          (index + 1) % 2 === 0 && "bg-gray-200/60"
                        }`}
                      >
                        <td className="py-4 px-2 text-center">{item.id}</td>
                        <td className="py-4 px-2">{item.employee_name}</td>
                        <td className="py-4 px-2 text-center">{item.amount}</td>
                        <td className="py-4 px-2 text-center">{item.type}</td>
                        <td className="py-4 px-2 text-center">
                          {item.current_balance}
                        </td>
                        <td className="py-4 px-2 text-center">
                          {item.previous_balance}
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
