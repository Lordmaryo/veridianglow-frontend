import axios from "axios";
import { handleError } from "../error/handleError";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // sends cookies to the server
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
