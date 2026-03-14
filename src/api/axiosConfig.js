import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetrackingbackend-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json"
  }
});


// Attach JWT token automatically
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");
  console.log(token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

export default api;