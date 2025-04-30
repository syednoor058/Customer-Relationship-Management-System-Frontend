// import React from 'react'

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getEmployees } from "../components/apiServices/employeeAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

function EmployeeReports() {
  const [fromDate, setFromDate] = useState("2020-01-01");
  const [toDate, setToDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState(0);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Construct the URL with query parameters
    // console.log(selectedEmployees);
    const formatedFromDate = formatDate(fromDate);
    const formatedToDate = formatDate(toDate);
    const url = `https://estate.theabacuses.com/employeeReport?employee_id=${selectedEmployees}&date_from=${formatedFromDate}&date_to=${formatedToDate}`;

    // Open the report in a new tab
    window.open(url, "_blank");
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const projectData = await getEmployees();
        setEmployees(projectData);
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
          <div className="text-2xl font-semibold flex flex-row gap-3 items-center text-gray-900 mb-7">
            <h1>Employee Report</h1>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              <div className="w-full gap-10">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-4 gap-7">
                    <div className="flex flex-col gap-2">
                      <label>Employee</label>
                      <select
                        className="ps-2 pe-5 py-2 rounded border border-gray-300 bg-transparent outline-none"
                        value={selectedEmployees}
                        onChange={(e) =>
                          setSelectedEmployees(Number(e.target.value))
                        }
                        required
                      >
                        <option value={0} disabled>
                          Select an employee
                        </option>

                        {employees.length === 0 ? (
                          <>
                            <option disabled className="text-start">
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
                      <label>From:</label>
                      <input
                        className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label>To:</label>
                      <input
                        className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
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
                        Generate Report
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeReports;
