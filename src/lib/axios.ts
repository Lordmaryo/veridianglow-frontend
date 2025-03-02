import axios from "axios";
import { handleError } from "../error/handleError";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // sends cookies to the server
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest.url === "/auth/signIn" ||
      originalRequest.url === "/auth/logout"
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("refreshing token");
        const { data } = await axiosInstance.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    handleError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
