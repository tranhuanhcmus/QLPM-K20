import React from "react";
import { ContextProvider } from "./ContextProvider";

export const WishlistProvider = ({ children }) => {
  return <ContextProvider>{children}</ContextProvider>;
};
