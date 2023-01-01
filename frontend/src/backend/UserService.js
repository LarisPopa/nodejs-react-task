import { doGet, doPost } from "./RESTUtils";

export const loginService = async (email, password) => {
  return await doPost(`/user/login`, { email, password });
};

export const registerService = async (email, password) => {
  return await doPost(`/user/register`, { email, password });
};
export const logOutService = async () => {
  return await doPost(`/user/logOut`);
};

export const loadUserService = async () => {
  return await doGet(`/user/getCurrentUser`);
};
