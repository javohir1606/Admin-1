import axios from "axios";
import Cookies from "js-cookie";
export const request = axios.create({ baseURL: "http://localhost:8000" });
request.interceptors.request.use((config) => {
  const token = Cookies.get("Token");
  console.log(token);

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
