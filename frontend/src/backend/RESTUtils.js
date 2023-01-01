import Axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = "http://localhost:4000";

export const logOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("email");
  window.location = "/";
};

export const axiosInstance = Axios.create({
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
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

axiosInstance.interceptors.request.use(
  async (req) => {
    const token = getAccessToken();
    const refreshToken = getRefreshToken();

    if (token) {
      req.headers.Authorization = token;

      const user = jwt_decode(token);
      const isExpired = user.exp * 1000 < Date.now();
      if (!isExpired) return req;

      const response = await Axios.post(`${BASE_URL}/user/token/refresh`, {
        refreshToken: refreshToken,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      req.headers.Authorization = response.data.accessToken;
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && 401 === error.response.status) {
      logOut();
    } else {
      return Promise.reject(error);
    }
  }
);

export const doPost = async (url, data) => {
  try {
    const result = await axiosInstance.post(BASE_URL + url, data);
    if (result) return result.data;
    return null;
  } catch (error) {
    throw error;
  }
};

export const doGet = async (url, config) => {
  try {
    const result = await axiosInstance.get(BASE_URL + url, config);
    if (result) return result.data;
    return null;
  } catch (error) {
    throw error;
  }
};

export const doPut = async (url, body, config) => {
  try {
    const result = await axiosInstance.put(BASE_URL + url, body, config);
    if (result) return result.data;
    return null;
  } catch (error) {
    throw error;
  }
};
