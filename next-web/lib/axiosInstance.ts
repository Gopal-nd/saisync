import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// Optional: Interceptors for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response?.data?.message || error.message);
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
