import axios from 'axios';

export const axiosClient = axios.create({
  // baseURL: 'https://restful-api-nodejs-fpoly.herokuapp.com',
  baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json'
  }
});
