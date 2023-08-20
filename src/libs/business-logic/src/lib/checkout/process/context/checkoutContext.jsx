import React from "react";
import { useContext } from "react";

export const CheckoutContext = React.createContext({
  state: {
    accessToken: null,
  },
  dispatch: () => undefined,
});

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutProvider"
    );
  }
  return context;
};
