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

  export const getCustomers = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/customer`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch customers data.' };
    }
  }

  export const getCustomerById = async (customer_id) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/customer/${customer_id}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch customer data.' };
    }
  }

  export const addNewCustomer = async (customer_name, address, nid, phone, balance) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/customer`, {customer_name, address, nid, phone, balance},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch customer data.' };
    }
  }