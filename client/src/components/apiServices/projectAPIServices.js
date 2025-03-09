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

  export const getProjectStates = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/project_state`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch project states.' };
    }
  }

  export const addProjectStates = async (state_name) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/project_state`, {state_name},
        {headers: getHeaders(),}
      );
    //   console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to add project state.' };
    }
  }

  export const editProjectStates = async (_id, state_name) => {
    try{
      const response = await axios.put(
        `${API_BASE_URL}/api/project_state/${_id}`, {state_name},
        {headers: getHeaders(),}
      );
    //   console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to edit project state.' };
    }
  }

  export const deleteProjectStates = async (_id) => {
    try{
      const response = await axios.delete(
        `${API_BASE_URL}/api/project_state/${_id}`,
        {headers: getHeaders(),}
      );
    //   console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to delete project state.' };
    }
  }



  export const getProjects = async () => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/project`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch projects.' };
    }
  }

  export const getProjectsById = async (_id) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/project/${_id}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch project.' };
    }
  }

  export const addProject = async (project_name, address, state_id, budget, balance) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/project`, {project_name, address, state_id, budget, balance},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to add projects.' };
    }
  }

  export const editProject = async (_id, project_name, address, state_id, budget, balance) => {
    try{
      const response = await axios.put(
        `${API_BASE_URL}/api/project/${_id}`, {project_name, address, state_id, budget, balance},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to edit projects.' };
    }
  }

  export const deleteProject = async (_id) => {
    try{
      const response = await axios.delete(
        `${API_BASE_URL}/api/project/${_id}`,
        {headers: getHeaders(),}
      );
    //   console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to delete projects.' };
    }
  }


  export const getProjectAssignment = async (projectId) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/project_employee_assign/release/${projectId}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch assignments.' };
    }
  }

  export const releaseProjectAssignment = async (employees, projectId) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/project_employee_assign/release/${projectId}`, {employees},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to release assignments.' };
    }
  }

  export const assignEmployees = async (employees, projectId) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/project_employee_assign/${projectId}`, {employees},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to assign employees.' };
    }
  }



  export const assignProduct = async (project_id, inventory, date) => {
    try{
      const response = await axios.post(
        `${API_BASE_URL}/api/supply_inventory_project`, {project_id, inventory, date},
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to assign products.' };
    }
  }


  export const getProductAssignmentHistory = async (date) => {
    try{
      const response = await axios.get(
        `${API_BASE_URL}/api/supply_inventory_project/history/${date}`,
        {headers: getHeaders(),}
      );
      // console.log(response)
      return response.data;
    } catch(error) {
      throw error.response?.data || { message: 'Failed to fetch product assign history.'};
    }
  }