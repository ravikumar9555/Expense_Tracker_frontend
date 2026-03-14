// authService.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetrackingbackend-production.up.railway.app/api"
});

api.interceptors.request.use((config) => {
  const publicRoutes = ["/login", "/signup"];
  const isPublic = publicRoutes.some(route => config.url.includes(route));

  if (!isPublic) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;