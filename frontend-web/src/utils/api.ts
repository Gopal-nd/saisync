// src/utils/api.ts
import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create axios instance
const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

// Request interceptor for adding token to requests
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we've not tried to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Handle token expiration - logout
      if (error.response?.data?.message === 'Invalid token.' || 
          error.response?.data?.message === 'Access denied. No token provided.') {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
      
      try {
        // Try to verify token
        const res = await axios.get(`${backendUrl}/api/auth/verify-token`, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${useAuthStore.getState().token}`
          }
        });
        
        if (res.status === 200 && res.data.user) {
          // If token is valid, retry original request
          return api(originalRequest);
        } else {
          // If verification failed, logout
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }
      } catch (verifyError) {
        // If verification failed, logout
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;