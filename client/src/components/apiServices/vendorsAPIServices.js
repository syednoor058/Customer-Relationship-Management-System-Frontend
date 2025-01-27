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


  export const getVendors = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/vendor`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch vendors.' };
    }
  }

  export const addVendor = async (vendor_name, address, phone, note, balance) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/vendor`,
        {vendor_name, address, phone, note, balance},
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to add vendor.' };
    }
  }

  export const editVendors = async (_id, vendor_name, address, phone, note, balance) => {
    try{
      const response = await axios.put(
        `${API_BASE_URL}/api/vendor/${_id}`,
        {vendor_name, address, phone, note, balance},
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to edit vendors.' };
    }
  }

  export const deleteVendors = async (_id) => {
    try{
      const response = await axios.delete(
        `${API_BASE_URL}/api/vendor/${_id}`,
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to delete vendors.' };
    }
  }
