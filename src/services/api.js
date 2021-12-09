import axios from "axios";

export default axios.create({
  baseURL: "http://samuelkrupik.test:8080",
  headers: { "X-Requested-With": "XMLHttpRequest" },
  withCredentials: true,
});
