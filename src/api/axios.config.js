import axios from "axios";
import cookies from "js-cookie";
// import config from "./config"; // 👈 Import your config file
import config from "../config";


// Create axios instance with custom config
const api = axios.create({
  baseURL: config.baseURL, // ✅ use baseURL from config.js
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = cookies.get("refresh_token");
        const response = await axios.post(`${config.baseURL}/auth/refresh`, { refreshToken }); // 👈 Make sure to use full URL here

        const newToken = response.data.token;
        cookies.set("auth_token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        cookies.remove("auth_token");
        cookies.remove("refresh_token");
        return Promise.reject(refreshError);
      }
    }

    switch (error.response?.status) {
      case 400:
        error.customMessage = "Bad Request";
        break;
      case 403:
        error.customMessage = "Access Forbidden";
        break;
      case 404:
        error.customMessage = "Resource Not Found";
        break;
      case 500:
        error.customMessage = "Internal Server Error";
        break;
      default:
        error.customMessage = "Something went wrong";
        break;
    }

    return Promise.reject(error);
  }
);

// API methods
const apiMethods = {
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  },

  customRequest: async (config = {}) => {
    try {
      const response = await api(config);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default apiMethods;
