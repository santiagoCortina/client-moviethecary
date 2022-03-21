import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? "http://deylanHeroku.com/api"
  : "http://localhost:5005/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});