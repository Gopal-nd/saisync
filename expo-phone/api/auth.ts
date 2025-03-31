import axios from 'axios';

const API_URL = 'http://192.168.1.16:5000'; 

export const loginUser = async (email: string, password: string) => {
  console.log('Attempting to login with:', email, password);
  try {
    const response = await axios.post(`${API_URL}/api/auth/sign-in`, { email, password });
    console.log('Response:', response.data.data);
    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
};

export const registerUser = async (email: string, password: string) => {
  console.log('Attempting to register with:', email, password);
  try {
    const response = await axios.post(`${API_URL}/api/auth/sign-up`, { email, password });
    console.log('Response:', response.data);
    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
};

export const getProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response.data.data);
  return response.data;
};
