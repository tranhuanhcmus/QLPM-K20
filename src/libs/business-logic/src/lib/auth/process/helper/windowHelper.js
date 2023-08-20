export const getWindowInstance = () => {
  return typeof window !== "undefined" ? window : null;
};
