import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
