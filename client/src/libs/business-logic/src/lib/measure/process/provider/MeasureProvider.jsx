import React from "react";
import { ContextProvider } from "./ContextProvider";

export const MeasureProvider = ({ children }) => {
  return <ContextProvider>{children}</ContextProvider>;
};
