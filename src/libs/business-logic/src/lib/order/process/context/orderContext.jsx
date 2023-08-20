import React from "react";
import { useContext } from "react";

export const OrderContext = React.createContext({
  state: {
    order: null,
    accessToken: null,
  },
  dispatch: () => undefined,
});

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }
  return context;
};
