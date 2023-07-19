import React, { useState } from "react";
import { providerConfig } from "../configs";
import QueryProvider from "./ReactQueryProvider";
import { useAccessToken } from "../lib/auth/process/hooks/useAccessToken";

export const BusinessLogicProvider = ({ children }) => {
  // Create an array includes active providers
  const activeProviders = providerConfig.filter((config) => config.isActive);
  const {getToken} = useAccessToken();
  const [token, setToken] = useState(getToken());

  // Wrap children inside activev provider
  const renderProviders = (children) => {
    return activeProviders.reduce((prevChildren, config) => {
      const Provider = config.provider;
      const accessToken = config.isNeedAccessToken ? token : null;
      const setProviderToken = (config.key === 'auth') ? setToken : null;

      return (
        <Provider 
          setProviderToken={setProviderToken ? setProviderToken : null}
          accessToken={accessToken ? accessToken : null}
        >
          {prevChildren}
        </Provider>
      );
    }, children);
  };

  return <QueryProvider>{renderProviders(children)}</QueryProvider>;
};
