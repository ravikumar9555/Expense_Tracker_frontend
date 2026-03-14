import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetrackingbackend-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json"
  }
});

/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use(

  (config) => {

    const publicRoutes = ["/login", "/signup"];

    const isPublic = publicRoutes.some(route =>
      config.url?.includes(route)
    );

    if (!isPublic) {

      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

    }

    return config;

  },

  (error) => {
    return Promise.reject(error);
  }

);


/* ================= RESPONSE INTERCEPTOR ================= */

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error?.response?.status === 401) {

      console.warn("Token expired. Logging out...");

      localStorage.removeItem("token");
      localStorage.removeItem("username");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }

    }

    return Promise.reject(error);

  }

);

export default api;