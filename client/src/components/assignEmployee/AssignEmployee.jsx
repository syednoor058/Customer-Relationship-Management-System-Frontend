// import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployees } from "../apiServices/employeeAPIServices";
import {
  assignEmployees,
  getProjectsById,
} from "../apiServices/projectAPIServices";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function AssignEmployee() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);
  const { error, setError } = useState();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Toggle selection
  const handleSelect = (employee) => {
    setSelectedEmployees(
      (prev) =>
        prev.some((e) => e.employee_id === employee.employee_id)
          ? prev.filter((e) => e.employee_id !== employee.employee_id) // Remove if already selected
          : [...prev, employee] // Add if not selected
    );
  };

  const closeNavigate = () => {
    navigate("/dashboard/projects");
  };

  // Unselect all employees
  const unselectAll = () => {
    setSelectedEmployees([]);
  };

  const handleemployeeAssign = async (employees, projectId) => {
    setLoading(true);
    try {
      const employeeAssignData = await assignEmployees(employees, projectId);

      toast(employeeAssignData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchProject = async (id) => {
      setLoading(true);
      try {
        const getProject = await getProjectsById(id);
        setProject(getProject);
      } catch (error) {
        setError(error);
        toast(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
    fetchProject(projectId);
  }, [projectId, setError]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50 overflow-y-auto">
      {error && <div>Something went wrong!</div>}
      <div className="w-[70%] p-10 bg-primaryColor rounded relative">
        <div className="flex absolute top-4 right-4">
          <div
            className="px-3 py-2 cursor-pointer"
            onClick={() => closeNavigate()}
          >
            Close
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full">
            <h2 className="text-center font-semibold text-2xl">
              Assign Employee(s) To The Project
            </h2>
          </div>
          <div className="text-center">
            Project Name: {project?.project_name}
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="text-sm uppercase text-gray-700 rounded-md border-b border-gray-300">
                <th className="w-[5%] py-3 px-2 text-center">Select</th>
                <th className="w-[5%] py-3 px-2 text-center">Index</th>
                <th className="w-[50%] py-3 px-2 text-center">Employee Name</th>
                <th className="w-[20%] py-3 px-2 text-center">Role</th>
                <th className="w-[20%] py-3 px-2 text-center">Available</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                <>
                  {employees.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className={`text-sm font-light rounded-md ${
                        (index + 1) % 2 === 0 && "bg-gray-100"
                      }`}
                    >
                      <td className="py-3 px-2 text-center">
                        <input
                          className="cursor-pointer"
                          type="checkbox"
                          checked={selectedEmployees.some(
                            (e) => e.employee_id === employee.id
                          )}
                          onChange={() =>
                            handleSelect({ employee_id: employee.id })
                          }
                        />
                      </td>
                      <td className="py-3 px-2 text-center">{index + 1}</td>
                      <td className="py-3 px-2 ">{employee.employee_name}</td>
                      <td className="py-3 px-2  capitalize">
                        {employee.role_name}
                      </td>
                      <td className="py-3 px-2 ">
                        {employee.is_free === "1" ? "Available" : "Unavailable"}
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
                      <p>No employee found!</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <div className="w-full flex flex-row justify-center items-center gap-5">
            <button
              onClick={() => handleemployeeAssign(selectedEmployees, projectId)}
              className="px-5 py-3 rounded bg-accentColor text-primaryColor"
            >
              Assign Employee
            </button>
            <button
              onClick={() => unselectAll()}
              className="px-5 py-3 rounded bg-gray-300"
            >
              Unselect All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
