/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import { CheckoutContext } from "../../../checkout/process/context/checkoutContext";
import { checkoutReducer } from "../../../checkout/process/context/reducer";

export const ContextProvider = ({ children, accessToken }) => {
  const [state, dispatch] = useReducer(checkoutReducer, {
    accessToken: accessToken,
  });

  useEffect(() => {
    dispatch({
      type: "SET_TOKEN_ACTION",
      payload: accessToken,
    });
  }, [accessToken]);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};
