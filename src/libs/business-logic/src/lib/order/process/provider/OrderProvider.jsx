import React from "react";
import { withCartFromContext } from "../../../../configs/withContext";
import { ContextProvider } from "./ContextProvider";

export const OrderProvider = ({ children }) => {
  const EnhancedProvider = withCartFromContext(ContextProvider);
  return <EnhancedProvider>{children}</EnhancedProvider>;
};
