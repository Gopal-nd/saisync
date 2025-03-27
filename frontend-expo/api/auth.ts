import axios from 'axios';
import apiClient from './apiclient';
import { API_URL, ENVIRONMENT } from '@env';
import { APP_URL } from '@/utils/env';

export const registerUser = async (email: string, password: string) => {
    try {
      console.log('Sending data to API:', { email, password});
  
      const response = await apiClient.post(`${API_URL}/api/auth/sign-up`, {
        email:email,
        password:password
  
      });
  
      console.log('Success:', response.data);
      return response.data;
    } catch (error: any) {
        console.log(error)
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data?.message || error.message);
        alert(error.response?.data?.message || 'An error occurred while registering');
      } else {
        console.error('Unexpected Error:', error.message || error);
        alert('An unexpected error occurred');
      }
      return null
    } 
        
    
  };
export const loginUser = async (email: string, password: string) => {
    try {
        console.log('Sending data to API:', { email, password});
    
        const response = await apiClient.post(`${API_URL}/api/auth/sign-in`, {
          email:email,
          password:password
    
        });
    
        console.log('Success:', response.data);
        return response.data;
      } catch (error: any) {
          console.log(error)
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error.response?.data?.message || error.message);
          alert(error.response?.data?.message || 'An error occurred while registering');
        } else {
          console.error('Unexpected Error:', error.message || error);
          alert('An unexpected error occurred');
        }
        return null
      } 
};

export const getProtectedData = async (token: string) => {
 
  try {
   
    const response = await apiClient.get(`${API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });


    console.log('Success:', response.data);
    return response.data;
  } catch (error: any) {
      console.log(error)
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'An error occurred while registering');
    } else {
      console.error('Unexpected Error:', error.message || error);
      alert('An unexpected error occurred');
    }
    return null
  } 
};
