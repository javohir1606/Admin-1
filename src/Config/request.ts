import axios from "axios";
import Cookies from "js-cookie";
export const request = axios.create({ baseURL: "http://localhost:8000" });
request.interceptors.request.use((config) => {
  const token = Cookies.get("Token");
  if (config.url !== "/api/admin-login/" && token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});
