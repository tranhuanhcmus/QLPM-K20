/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import { OrderContext } from "../context/orderContext";
import { orderReducer } from "../context/reducer";
import { defaultOrder } from "../../constants";
import { useInitOrder } from "../hooks/useInitOrder";
import { useGetOrder } from "../hooks/useGetOrder";

export const ContextProvider = ({ children, accessToken, cart }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    order: null,
    accessToken: accessToken,
  });
  const { onInitOrder } = useInitOrder();
  const currentOrder = useGetOrder();

  useEffect(() => {
    dispatch({
      type: "SET_TOKEN_ACTION",
      payload: accessToken,
    });
  }, [accessToken]);

  useEffect(() => {
    if (!currentOrder) {
      onInitOrder(defaultOrder);
    }
  }, []);

  useEffect(() => {
    if (!currentOrder) {
      onInitOrder({
        ...defaultOrder,
        orderItem: cart,
      });
    } else {
      dispatch({
        type: "SET_ORDER",
        payload: {
          ...currentOrder,
          orderItem: cart,
        },
      });
    }
  }, [cart]);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
