// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // change to your backend base URL
  withCredentials: true, // if you're using cookies
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
