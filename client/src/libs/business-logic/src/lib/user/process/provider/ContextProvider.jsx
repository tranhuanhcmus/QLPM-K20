/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import { UserContext } from "../context/userContext";
import { orderReducer } from "../context/reducer";
import { useGetUserDetail } from "../hooks/useGetUserDetail";

export const ContextProvider = ({ children, accessToken }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    userDetail: null,
    accessToken: accessToken,
  });
  const { onGetUserDetail } = useGetUserDetail();

  useEffect(() => {
    dispatch({
      type: "SET_TOKEN_ACTION",
      payload: accessToken,
    });
    onGetUserDetail(accessToken)
      .then((data) =>
        dispatch({
          type: "SET_USER_DETAIL",
          payload: data,
        })
      )
      .catch((err) => console.error(err));
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
