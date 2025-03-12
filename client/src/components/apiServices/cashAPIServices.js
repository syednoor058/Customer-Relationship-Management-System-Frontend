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
  try {
    const openingResponse = await axios.get(`${API_BASE_URL}/api/cash/opening`, {
      headers: getHeaders(),
    });

    if (openingResponse.data.success) {
      const cashResponse = await axios.get(`${API_BASE_URL}/api/cash`, {
        headers: getHeaders(),
      });

      return cashResponse.data; 
    }

    return [{ balance: 0, updated_at: null }];
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch cash opening.' };
  }
};
