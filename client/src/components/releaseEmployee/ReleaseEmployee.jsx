// import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getProjectAssignment,
  getProjectsById,
  releaseProjectAssignment,
} from "../apiServices/projectAPIServices";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function ReleaseEmployee() {
  const [project, setProject] = useState();
  const [assignEmployees, setAssignEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const handleSelect = (employee) => {
    setSelectedEmployees(
      (prev) =>
        prev.some((e) => e.employee_id === employee.employee_id)
          ? prev.filter((e) => e.employee_id !== employee.employee_id) // Remove if already selected
          : [...prev, employee] // Add if not selected
    );
  };

  // Unselect all employees
  const unselectAll = () => {
    setSelectedEmployees([]);
  };
  const closeNavigate = () => {
    navigate("/dashboard/projects");
  };

  const handleemployeeRelease = async (employees, projectId) => {
    setLoading(true);
    try {
      const employeeReleaseData = await releaseProjectAssignment(
        employees,
        projectId
      );
      navigate("/dashboard/projects");
      toast(employeeReleaseData.message);
    } catch (error) {
      navigate("/dashboard/projects");
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProject = async (id) => {
      setLoading(true);
      try {
        const getProject = await getProjectsById(id);
        setProject(getProject);
      } catch (error) {
        setErr(error);
        toast(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchAssignment = async (id) => {
      setLoading(true);
      try {
        const employeeAssignmentData = await getProjectAssignment(id);
        // console.log(employeeAssignmentData);
        setAssignEmployees(employeeAssignmentData);
      } catch (error) {
        setErr(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject(projectId);
    fetchAssignment(projectId);
  }, [err, projectId]);

  if (loading) return <LoadingScreen />;
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-[2px] z-[2000] bg-gray-800 bg-opacity-50 overflow-y-auto">
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
              Release Employee(s) From The Project
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
                <th className="w-[60%] py-3 px-2 text-center">Employee Name</th>
                <th className="w-[30%] py-3 px-2 text-center">Assigned By</th>
              </tr>
            </thead>
            <tbody>
              {assignEmployees.length > 0 ? (
                <>
                  {assignEmployees.map((employee, index) => (
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
                      <td className="py-3 px-2">{employee.assigned_by}</td>
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
              onClick={() =>
                handleemployeeRelease(selectedEmployees, projectId)
              }
              className="px-5 py-3 rounded bg-accentColor text-primaryColor"
            >
              Release Employee
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
