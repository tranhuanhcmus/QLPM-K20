/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from "react";
import { wishlistReducer } from "../context/reducer";
import { useLocalWishlist } from "../hooks";
import { WishlistContext } from "../context/wishlistContext";


export const ContextProvider = ({
  children
}) => {
  const { getLocalWishlist } = useLocalWishlist();
  const [state, dispatch] = useReducer(wishlistReducer, {
    wishlist: getLocalWishlist(),
  });

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};
