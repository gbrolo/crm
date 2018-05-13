
import axios from 'axios';

const SERVER_ADDRESS = "http://ec2-34-216-170-228.us-west-2.compute.amazonaws.com:8080";
// const SERVER_ADDRESS = "http://localhost:8080";

let axiosInstance;
export default axiosInstance = axios.create({
    baseURL: SERVER_ADDRESS,
    timeout: 10000
  });