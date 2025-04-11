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


  export const getUsers = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/user`,
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch users.' };
    }
  }

  export const getAllUsers = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/users/list`,
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch users list.' };
    }
  }

  export const getSingleUser = async ({id}) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/users/list/${id}`,
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch user data.' };
    }
  }

  export const addUser = async (name, email, password, project_id) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/users`, {name, email, password, project_id},
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to add user.' };
    }
  }

  export const editUser = async (id, name, email, project_id) => {
    try{
      const response = await axios.put(
        `${API_BASE_URL}/api/users/edit/${id}`, {name, email, project_id},
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to edit user.' };
    }
  }

  export const editUserPassword = async ({id, password}) => {
    try{
      const response = await axios.put(
        `${API_BASE_URL}/api/users/password/${id}`, {password},
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to update password.' };
    }
  }

  export const deleteUser = async ({id}) => {
    try{
      const response = await axios.delete(
        `${API_BASE_URL}/api/users/delete/${id}`,
        {headers: getHeaders(),}
      );
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to delete user.' };
    }
  }