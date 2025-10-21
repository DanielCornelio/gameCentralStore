import axios from "axios";

export const client = axios.create({
    // baseURL: "http://localhost:3000/api/"
    baseURL:"dpg-d3dicn8gjchc73aitl40-a.oregon-postgres.render.com"
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