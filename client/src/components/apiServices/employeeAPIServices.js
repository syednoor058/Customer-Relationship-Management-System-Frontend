import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SIKDER_CMS_APP_API;

// Add default headers (e.g., Authorization token)
const getHeaders = () => {
    const token = localStorage.getItem('shikderFoundationAuthToken'); // Store your token in local storage or another secure place
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  export const getEmployees = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/employee`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch employees.' };
    }
  }
  export const addEmployee = async (employee_name, address, phone, salary, balance, role_id) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/employee`, {employee_name, address, phone, salary, balance, role_id},
        {headers: getHeaders(),}
      );
    //   console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to add employee.' };
    }
  }

  export const editEmployee = async (_id, employee_name, address, phone, salary, balance, role_id) => {
    try{
      const response = await axios.put(
        `${API_BASE_URL}/api/employee/${_id}`, {employee_name, address, phone, salary, balance, role_id},
        {headers: getHeaders(),}
      );
    //   console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to edit employee.' };
    }
  }

  export const deleteEmployee = async (_id) => {
    try{
      const response = await axios.delete(
        `${API_BASE_URL}/api/employee/${_id}`, 
        {headers: getHeaders(),}
      );
    //   console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to add employees.' };
    }
  }


  export const getEmployeeRoles = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/employee_role`,
        {headers: getHeaders(),}
      );
    //   console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch employee roles.' };
    }
  }

  export const addEmployeeRoles = async (role_name) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/employee_role`, {role_name},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to add employee roles.' };
    }
  }

  export const editEmployeeRoles = async (_id, role_name) => {
    try{
      const response = await axios.put(
        `${API_BASE_URL}/api/employee_role/${_id}`, {role_name},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to edit employee roles.' };
    }
  }

  export const deleteEmployeeRoles = async (_id) => {
    try{
      const response = await axios.delete(
        `${API_BASE_URL}/api/employee_role/${_id}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to delete employee roles.' };
    }
  }

  export const employeeSalarySubmit = async (employee_id, amount) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/employee/salary`, {employee_id, amount},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to add employee salary.' };
    }
  }

  export const getEmployeesSalary = async (formattedDate) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/employee/history/${formattedDate}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch employees salary history.' };
    }
  }

  export const getEmployeeLedgerById = async ({id, dateFrom, dateTo}) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/employee/ledger/history`,
        {headers: getHeaders(), params: {
          id: id,
          dateFrom: dateFrom,
          dateTo: dateTo
        }}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch employees salary history.' };
    }
  }


  export const getEmployeeForSalary = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/employee/salary/all`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch employees!' };
    }
  }
