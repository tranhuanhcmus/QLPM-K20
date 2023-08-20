import React from "react";
import { useContext } from "react";

export const WishlistContext = React.createContext({
  state: { 
    wishlist: null
  },
  dispatch: () => undefined
});

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("WishlistContext must be used within a WishlistProvider");
  }
  return context;
};
