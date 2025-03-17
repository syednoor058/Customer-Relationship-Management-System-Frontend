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


  export const loginAPi = async (email, password) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/login`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to login.' };
    }
  }

  export const getInventory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/inventory`, {
        headers: getHeaders(),
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch inventory.' };
    }
  };

  export const getInventoryById = async (product_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/inventory/${product_id}`, {
        headers: getHeaders(),
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product.' };
    }
  };
  
  export const addInventory = async (product_name, category_id, quantity, price) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/inventory`,{product_name, category_id, quantity, price}, {
        headers: getHeaders(),
      });
      // console.log(response)
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add product.' };
    }
  };

  export const editInventory = async (_id, product_name, category_id, quantity, price) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/inventory/${_id}`,{product_name, category_id, quantity, price}, {
        headers: getHeaders(),
      });
      // console.log(response)
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to edit product.' };
    }
  };

  export const deleteInventory = async (_id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/inventory/${_id}`, {
        headers: getHeaders(),
      });
      // console.log(response)
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete product.' };
    }
  };

  export const getCategory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/inventory_category`, {
        headers: getHeaders(),
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch category.' };
    }
  };

  export const getCategoryById = async (category_id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/inventory_category/${category_id}`, {
        headers: getHeaders(),
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch category.' };
    }
  };

  export const addCategory = async (category_name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/inventory_category`, {category_name}, {
        headers: getHeaders(),
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add category.' };
    }
  };

  export const editCategory = async (_id, category_name) => {
    try {
      console.log(_id, category_name)
      const response = await axios.put(`${API_BASE_URL}/api/inventory_category/${_id}`, {category_name}, {
        headers: getHeaders(),
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      throw error.response?.data || { message: 'Failed to edit category.' };
    }
  };

  export const deleteCategory = async (_id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/inventory_category/${_id}`, {
        headers: getHeaders(),
      });
      // console.log(response)
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete category.' };
    }
  };


  export const inventoryPurchase = async (vendor_id, sub_total, discount, total, inventory, date) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/inventory_purchase`, {vendor_id, sub_total, discount, total, inventory, date}, {
        headers: getHeaders(),
      });
      // console.log(response)
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add product.' };
    }
  };

  export const getInventoryPurchaseHistory = async (date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/inventory_purchase/history/${date}`, {
        headers: getHeaders(),
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch inventory.' };
    }
  };

  
  export const getSingleProductLedger = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/inventory/ledger/${id}`, {
        headers: getHeaders(),
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch inventory.' };
    }
  };