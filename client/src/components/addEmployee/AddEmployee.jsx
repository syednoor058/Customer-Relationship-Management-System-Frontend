import { useEffect, useState } from "react";
import { FcBusinessman, FcOpenedFolder, FcPlus } from "react-icons/fc";
import { HiOutlineArchive, HiOutlineArrowSmLeft } from "react-icons/hi";
import { MdDeleteOutline, MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addEmployee,
  getEmployeeRoles,
} from "../apiServices/employeeAPIServices";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function AddEmployee() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeRole, setEmployeeRole] = useState(0);
  const [employeeBalance, setEmployeeBalance] = useState(0);
  const [employeeSalary, setEmployeeSalary] = useState(0);
  const [loading, setLoading] = useState(true);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const token = localStorage.getItem("shikderFoundationAuthToken");

  const handleAddEmployeeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const addEmployeeData = await addEmployee(
        employeeName,
        employeeAddress,
        employeePhone,
        employeeSalary,
        employeeBalance,
        employeeRole
      );
      setEmployeeName("");
      setEmployeeAddress("");
      setEmployeePhone("");
      setEmployeeRole(0);
      setEmployeeBalance(0);
      setEmployeeSalary(0);
      toast(addEmployeeData.message);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = () => {
    setEmployeeAddress("");
    setEmployeeBalance(0);
    setEmployeeName("");
    setEmployeePhone("");
    setEmployeeRole(0);
    setEmployeeSalary(0);
  };

  useEffect(() => {
    const fetchEmployeeRoles = async () => {
      try {
        const employeeRolesData = await getEmployeeRoles();
        setEmployeeRoles(employeeRolesData);
      } catch (err) {
        // setError(err);
        toast(err.message);
        // toast(error.message)
        // console.error(err);
      } finally {
        setLoading(false); // End loading after the request completes
      }
    };

    fetchEmployeeRoles();
  }, [token]);

  if (loading) {
    return <LoadingScreen />; // Show loading state
  }

  return (
    <div className="w-full h-full flex flex-row gap-5 justify-between pb-10 font-light text-gray-600">
      <div className="w-[75%] flex flex-col gap-7 rounded-xl border border-gray-200 drop-shadow-xl bg-primaryColor p-5">
        <div className="flex flex-row justify-between items-center">
          <Link
            to="/dashboard"
            className="py-2 rounded-md text-gray-600 flex flex-row gap-2 items-center justify-center"
          >
            <span className="text-xl">
              <HiOutlineArrowSmLeft />
            </span>
            Dashboard
          </Link>
          <Link
            to="/dashboard/all-employees"
            className="px-3 py-3 rounded-md bg-accentColor text-primaryColor flex flex-row gap-2 items-center justify-center"
          >
            <span className="text-xl">
              <HiOutlineArchive />
            </span>
            All Employees
          </Link>
        </div>
        <div className="font-semibold text-2xl flex flex-row gap-3 items-center text-gray-900">
          <span className="text-4xl">
            <FcPlus />
          </span>
          Add New Employee
        </div>
        <div className="w-full flex flex-row gap-5 justify-between">
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleAddEmployeeSubmit}
          >
            <div className="w-full flex flex-col gap-5">
              <div className="text-lg font-semibold text-gray-700">
                General Information
              </div>

              <div className="flex flex-col gap-1">
                <div>Name</div>
                <input
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                  type="text"
                  placeholder="Enter employee name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <div>Address</div>
                <input
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                  type="text"
                  placeholder="Enter employee address"
                  value={employeeAddress}
                  onChange={(e) => setEmployeeAddress(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Role</label>
                <select
                  className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none capitalize"
                  value={employeeRole}
                  onChange={(e) => setEmployeeRole(e.target.value)}
                  required
                >
                  <option value={0} disabled>
                    Select a role
                  </option>

                  {employeeRoles?.length === 0 ? (
                    <>
                      <option disabled className="text-center">
                        No employee roles found!
                      </option>
                    </>
                  ) : (
                    <>
                      {employeeRoles.map((item, index) => (
                        <option
                          key={index}
                          value={item.id}
                          className="capitalize"
                        >
                          {item.role_name}
                        </option>
                      ))}
                    </>
                  )}
                </select>

                <div className="flex flex-col gap-1">
                  <div>Phone</div>
                  <input
                    className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                    type="text"
                    placeholder="Enter employee phone number"
                    value={employeePhone}
                    onChange={(e) => setEmployeePhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="text-lg font-semibold text-gray-700">
                Salary and Balance
              </div>
              <div className="flex flex-row gap-5">
                <div className="w-[50%] flex flex-col gap-1">
                  <div>Salary</div>
                  <input
                    className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                    type="number"
                    value={employeeSalary}
                    onChange={(e) => setEmployeeSalary(e.target.value)}
                    required
                  />
                </div>
                <div className="w-[50%] flex flex-col gap-1">
                  <div>Balance</div>
                  <input
                    className="px-2 py-2 rounded-md border border-gray-300 bg-transparent outline-none"
                    type="number"
                    value={employeeBalance}
                    onChange={(e) => setEmployeeBalance(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row gap-3 justify-start">
                <div className="flex">
                  <button
                    type="submit"
                    className="w-40 px-3 py-3 bg-accentColor text-primaryColor rounded-md text-center flex flex-row gap-2 justify-center items-center"
                  >
                    <span className="text-xl">
                      <MdOutlineDone />
                    </span>
                    Add Employee
                  </button>
                </div>
                <div className="flex">
                  <button
                    onClick={() => clearAllData()}
                    className="w-36 px-3 py-3 bg-gray-200 text-accentColor rounded-md text-center flex flex-row gap-2 items-center justify-center"
                  >
                    <span className="text-xl">
                      <MdDeleteOutline />
                    </span>
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[25%] flex flex-col gap-5 text-gray-100">
        <div className="flex flex-col rounded-xl drop-shadow-xl gap-5 bg-gradient-to-tr from-accentColor/80 to-[#6a0dad]/80 p-5 relative">
          <div className="text-xl font-semibold flex flex-row gap-2 items-center text-primaryColor">
            <span className="text-2xl">
              <FcOpenedFolder />
            </span>
            Top Categories
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-light">Tripol (19)</div>
            <div className="font-light">House Materials (7)</div>
            <div className="font-light">Raw Materials (21)</div>
            <div className="font-light">Machine and Stuffs (4)</div>
            <div className="font-light pe-6">Hardwares (6)</div>
          </div>
          <Link className="text-5xl absolute bottom-2 right-2">
            <FcPlus />
          </Link>
        </div>
        <div className="flex flex-col rounded-xl drop-shadow-xl gap-5 bg-gradient-to-tr from-[#0ea5e9]/80 to-[#3b82f6]/80 p-5 relative">
          <div className="text-xl font-semibold flex flex-row gap-2 items-center text-primaryColor">
            <span className="text-3xl">
              <FcBusinessman />
            </span>
            Recent Vendors
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-light">Syed Shaeduzzaman Noor</div>
            <div className="font-light">Mazharul Islam</div>
            <div className="font-light">Kazi Fahim Sharar</div>
            <div className="font-light">Naim Rahman</div>
            <div className="font-light pe-6">Md Farhan Fuad</div>
          </div>
          <Link className="text-5xl absolute bottom-2 right-2">
            <FcPlus />
          </Link>
        </div>
      </div>
    </div>
  );
}
