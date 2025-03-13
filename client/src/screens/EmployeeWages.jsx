import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getProjectEmployeeWage,
  getProjects,
  postProjectEmployeeWage,
} from "../components/apiServices/projectAPIServices";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

export default function EmployeeWages() {
  const token = localStorage.getItem("shikderFoundationAuthToken");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [wage, setWage] = useState(0);

  const handleReset = () => {
    setSelectedEmployee(0);
    setSelectedProject(0);
    setWage(0);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const submitRes = await postProjectEmployeeWage(
        selectedProject,
        selectedEmployee,
        wage
      );
      handleReset();
      toast.success(submitRes.message || "Wage submitted successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handleChangeProject = async (id) => {
    setSelectedProject(id);
    try {
      const employeesData = await getProjectEmployeeWage(id);
      setEmployees(employeesData);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
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
            <h1>Employee Wages Entry</h1>
          </div>
          <div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="w-full grid grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <label>Project</label>
                  <select
                    className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    value={selectedProject}
                    onChange={(e) =>
                      handleChangeProject(Number(e.target.value))
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
                <div className="flex flex-col gap-2">
                  <label>Employee</label>
                  <select
                    className="px-2 py-2 rounded border border-gray-300 bg-transparent outline-none"
                    value={selectedEmployee}
                    onChange={(e) =>
                      setSelectedEmployee(Number(e.target.value))
                    }
                    disabled={selectedProject === 0}
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
                  <label>Wage</label>
                  <input
                    type="number"
                    placeholder="Salary amount"
                    className="p-2 border rounded w-full outline-none"
                    min={0}
                    value={wage}
                    onChange={(e) => setWage(Number(e.target.value))}
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
    </div>
  );
}
