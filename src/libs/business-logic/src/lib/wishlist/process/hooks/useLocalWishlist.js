import { LOCAL_STORAGE_KEYS } from "../../../../configs/constants";

export const useLocalWishlist = () => {
  const getLocalWishlist = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST));
    }
    return null;
  };
  const setLocalWishlist = (wishlist) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.WISHLIST,
        JSON.stringify(wishlist)
      );
    }
  };
  const removeLocalWishlist = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST);
    }
  };

  return {
    getLocalWishlist,
    setLocalWishlist,
    removeLocalWishlist,
  };
};
