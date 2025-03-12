import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SIKDER_CMS_APP_API;

// Add default headers (e.g., Authorization token)
const getHeaders = () => {
  const token = localStorage.getItem('shikderFoundationAuthToken'); // Store your token securely
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

  export const getCash = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/cash`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch cash opening.' };
    }
  }

  export const getSupplyCashHistory = async (formattedDate) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/supply_cash_project/history/${formattedDate}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch cash history.' };
    }
  }
  export const supplyProjectCash = async (project_id, cash_amount) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/supply_cash_project`, {project_id, cash_amount},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to supply cash.' };
    }
  }