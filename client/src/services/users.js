
import axios from 'axios';

const api = axios.create({baseURL: process.env.REACT_APP_SERVERURL});

export const addUser = async (authData) => {
    try {
      const response = await api.post(`users/signup`, authData);
      return response.data;
    } catch(err) {
      console.error(err);
      return { error: err.detail };
    }
  }
  
export const authenticateUser = async (authData) => {
  try {
    const response = await api.post(`users/login`, authData);
    return response.data;
  } catch(err) {
    console.error(err);
    return { detail: err.detail };
  }
}