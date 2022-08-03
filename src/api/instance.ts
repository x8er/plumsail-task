import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://api.openweathermap.org/",
});

export default axiosInstance;
