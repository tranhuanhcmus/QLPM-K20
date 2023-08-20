/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import { CartContext } from "../context/cartContext";
import { cartReducer } from "../context/reducer";
import { useGetCart } from "../hooks";

export const ContextProvider = ({ children, accessToken }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    accessToken: accessToken,
  });
  const { onGetCart } = useGetCart();

  useEffect(() => {
    dispatch({
      type: "SET_TOKEN_ACTION",
      payload: accessToken,
    });
    onGetCart(accessToken)
      .then((cartData) => {
        dispatch({
          type: "SET_CART_ACTION",
          payload: cartData,
        });
      })
      .catch((err) => {
        console.error("Get cart error: ", err);
      });
  }, [accessToken]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
