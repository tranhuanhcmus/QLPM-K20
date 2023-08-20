import { keys } from "../../constants/SessionStorage";

export const getRedirectUrl = () => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(keys.oldRedirect);
};
export const setRedirectUrl = (url) => {
  if (typeof window !== "undefined" && typeof url === "string") {
    sessionStorage.setItem(keys.oldRedirect, url);
  }
};
export const deleteRedirectUrl = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(keys.oldRedirect);
  }
};
