import { REFRESH_TOKEN, TOKEN } from "@configs/vars";
import axios from "axios";
import Cookie from "js-cookie";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 60000,
});

// Add a request interceptor
publicApi.interceptors.request.use(
  function (config) {

    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      Cookie.remove(TOKEN);
      Cookie.remove(REFRESH_TOKEN);
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
publicApi.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if(error.response && error.response.status == 401){
      Cookie.remove(TOKEN);
      Cookie.remove(REFRESH_TOKEN);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default publicApi;
