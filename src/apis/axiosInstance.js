import axios from "axios";

const baseConfig = {
  baseURL: "http://localhost:3001",
  // timeout: 5000,
  headers: { "Content-Type": "application/json" },
};

export const axiosInstance = axios.create(baseConfig);
