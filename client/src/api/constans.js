import axios from "axios";

export const client = axios.create({
    // baseURL: "http://localhost:3000/api/"
    baseURL:"https://gamecentralstore.onrender.com/api/"
})

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);