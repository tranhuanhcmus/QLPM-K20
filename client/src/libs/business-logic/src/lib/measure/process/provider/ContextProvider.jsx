/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from "react";
import { MeasureContext } from "../context/measureContext";
import { measureReducer } from "../context/reducer";
import {
  defaultImage,
  defaultJacket,
  defaultPants,
  defaultVest,
} from "../../constants";

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(measureReducer, {
    vest: defaultVest,
    pants: defaultPants,
    jacket: defaultJacket,
    image: defaultImage,
  });

  return (
    <MeasureContext.Provider value={{ state, dispatch }}>
      {children}
    </MeasureContext.Provider>
  );
};
