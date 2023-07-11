import { LOCAL_STORAGE_KEY } from "../../constants.js";

export const setIsRememberMeLocalstorage = (value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY.IS_REMEMBER, JSON.stringify(value));
  }
};

export const getIsRememberMeLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY.IS_REMEMBER);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  return null;
};

export const removeIsRememberMeLocalstorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_KEY.IS_REMEMBER);
  }
};
