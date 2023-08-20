import React from "react";
import { withTokenFromContext } from "../../../../configs/withContext";
import { ContextProvider } from "./ContextProvider";

export const CartProvider = ({ children }) => {
  const EnhancedProvider = withTokenFromContext(ContextProvider);
  return <EnhancedProvider>{children}</EnhancedProvider>;
  // return <ContextProvider accessToken={null}>{children}</ContextProvider>;
};
