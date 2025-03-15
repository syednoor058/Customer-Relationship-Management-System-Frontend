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

  export const getAccounts = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/bank`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch bank accounts.' };
    }
  }

  export const getAccountsById = async (bank_id) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/bank/single/${bank_id}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch bank account.' };
    }
  }

  export const addAccounts = async (bank_name, balance) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/bank`, {bank_name, balance},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to delete bank account.' };
    }
  }

  export const editAccountsById = async (bank_id, bank_name, balance) => {
    try{
      const response = await axios.put(
        `${API_BASE_URL}/api/bank/${bank_id}`, {bank_name, balance},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to edit bank account.' };
    }
  }

  export const deleteAccountsById = async (bank_id) => {
    try{
      const response = await axios.delete(
        `${API_BASE_URL}/api/bank/${bank_id}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to delete bank account.' };
    }
  }

  export const getAccountLedgerById = async (bank_id) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/bank/ledger/${bank_id}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch account ledger.' };
    }
  }

  export const depositeAccount = async (bank_id, amount) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/bank/deposite/${bank_id}`, {amount},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to deposite amount.' };
    }
  }

  export const withdrawAccount = async (bank_id, amount) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/bank/withdraw/${bank_id}`, {amount},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to withdraw amount.' };
    }
  }

  export const getCashLedger = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/cash/ledger`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch cash ledger!' };
    }
  }