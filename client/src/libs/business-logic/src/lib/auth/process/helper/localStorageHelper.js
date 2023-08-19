import { LOCAL_STORAGE_KEYS } from "../../../../configs/constants";

export const setIsRememberMeLocalStorage = (value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEYS.IS_REMEMBER, JSON.stringify(value));
  }
};

export const getIsRememberMeLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEYS.IS_REMEMBER);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  return null;
};

export const removeIsRememberMeLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.IS_REMEMBER);
  }
};
