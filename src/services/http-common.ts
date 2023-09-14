import axios from "axios";
import env from "../config/env";

export default axios.create({
  baseURL: env.BASE_URL,
  timeout: 60000,
  timeoutErrorMessage: "timeout",
  headers: {
    "content-type": "application/json; multipart/form-data",
    "Content-Type": "application/json",
    Accept: "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});
