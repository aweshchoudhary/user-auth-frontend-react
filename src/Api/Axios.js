import axios from "axios";
const BASE_URL = "https://fn1ln8.sse.codesandbox.io";

export default axios.create({
  baseURL: BASE_URL + "/auth"
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL + "/auth",
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});
