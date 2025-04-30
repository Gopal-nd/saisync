import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// Optional: Interceptors for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error?.response?.data?.message ){
      console.error(error?.response?.data?.message);
    }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
