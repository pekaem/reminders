import axios from "axios";
// "https://mg-reminders.herokuapp.com/api"
// "http://localhost:3000/api"
export default axios.create({
  withCredentials: true,
  baseURL: "https://mg-reminders.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
