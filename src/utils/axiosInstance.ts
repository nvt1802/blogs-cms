import axios, { HttpStatusCode } from "axios";
import { getCookie } from "./cookieUtils";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === HttpStatusCode.Forbidden) {
      const locale = getCookie("NEXT_LOCALE");
      location.href = `/${locale}/login`;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
