import { LOCAL_STORAGE_KEYS } from "../../../../configs/constants";

// This function will get the Order from localStorage
export const getOrderLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDER);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  return null;
};

// This function will save the Order to localStorage
export const setOrderLocalStorage = (order) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDER, JSON.stringify(order));
  }
};

// This function will delete the Order from localStorage
export const deleteOrderLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ORDER);
  }
};
