import React from "react";
import { providerConfig } from "../configs";
import QueryProvider from "./ReactQueryProvider";

export const BusinessLogicProvider = ({
  children
}) => {
  // Create an array includes active providers
  const activeProviders = providerConfig.filter((config) => config.isActive);

  // Wrap children inside activev provider
  const renderProviders = (children) => {
    return activeProviders.reduce((prevChildren, config) => {
      const Provider = config.provider;
      return <Provider>{prevChildren}</Provider>;
    }, children);
  };

  return <QueryProvider>{renderProviders(children)}</QueryProvider>;
};
