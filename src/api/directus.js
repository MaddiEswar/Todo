import axios from "axios";

const API_URL = "http://62.72.12.81:3108"; 
const TOKEN = "MjnYFeSY2BKzrdKMbWuQYbNLiCqAPRmo";


const directus = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default directus;
