import Axios from "axios";
const BASE_URL = "http://localhost:4000";

export const http = Axios.create({
  withCredentials: false,
  timeout: 60000,
  params: {},
});

export const getEmail = () => {
  return localStorage.getItem("email");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
export const removeEamil = () => {
  return localStorage.removeItem("email");
};

export const removeAccessToken = () => {
  return localStorage.removeItem("accessToken");
};

http.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const doPost = async (url, data) => {
  try {
    const result = await http.post(BASE_URL + url, data);
    if (result) return result.data;
    return null;
  } catch (error) {
    throw error;
  }
};

export const doGet = async (url, config) => {
  try {
    const result = await http.get(BASE_URL + url, config);
    if (result) return result.data;
    return null;
  } catch (error) {
    throw error;
  }
};

export const doPut = async (url, body, config) => {
  try {
    const result = await http.put(BASE_URL + url, body, config);
    if (result) return result.data;
    return null;
  } catch (error) {
    throw error;
  }
};
