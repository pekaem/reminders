import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000", // Server URL
  headers: {
    "Content-type": "application/json"
  }
});
