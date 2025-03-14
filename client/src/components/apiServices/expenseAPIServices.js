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

  export const getAllExpense = async (formattedDate) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/expense/history/${formattedDate}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch employees.' };
    }
  }

  export const addExpense = async (expense_name, amount) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/expense`, {expense_name, amount},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch employees.' };
    }
  }

  export const postProjectExpense = async (project_id, expense_name, amount) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/expense/projectwise/${project_id}`, {expense_name, amount},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch product assign history.'};
    }
  }