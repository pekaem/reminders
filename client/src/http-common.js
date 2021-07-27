import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "https://mg-reminders.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
