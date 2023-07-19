import { SESSION_STORAGE_KEY } from "../../constants";

export const setAccessTokenSessionStorage = (token) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, token);
  }
};

export const getAccessTokenSessionStorage = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  }
  return null;
};

export const removeAccessTokenSessionStorage = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  }
};
