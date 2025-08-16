import axios from "axios";


const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      const reqUrl = response.config?.url || "";


      const isAuthEndpoint = reqUrl.startsWith("/api/auth/");

      if (!isAuthEndpoint) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
