import axios from "axios";

const rpc = axios.create({
  baseURL: "http://192.168.68.82:5000",
  withCredentials: true,
});

export default rpc;