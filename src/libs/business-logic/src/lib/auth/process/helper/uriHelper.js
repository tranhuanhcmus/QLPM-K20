export const getRedirectUri = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
};
