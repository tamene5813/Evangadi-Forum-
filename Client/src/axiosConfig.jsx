
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:5009/api",
});

export default instance;