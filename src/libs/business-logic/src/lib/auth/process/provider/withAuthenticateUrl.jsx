/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Loader, authUrls } from "../../config";
import { useAuthContext } from "../context";
import { getWindowInstance } from "../helper/windowHelper";
import { useAccessToken } from "../hooks/useAccessToken";
import { useLocation, useNavigate } from "react-router";

export const withAuthenticateUrl = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    /**
     * UPDATE METHODS TO GET PATHNAME RIGHT HERE
     * RECOMMEND:
     * + React: useLocation
     * + Next: useRouter
     */
    const location = useLocation();
    const currentPathname = location.pathname;

    const navigator = useNavigate();
    /**
     * DEFINE REDIRECT METHODS RIGHT HERE
     * @param {string} redirectUrl
     */
    const redirectMethods = (redirectUrl) => {
      navigator(redirectUrl, { replace: true });
      // windowInstance.location.href = redirectUrl;
    };

    const windowInstance = getWindowInstance();
    const [isLoaderActive, setIsLoaderActive] = useState(true);
    const { getToken } = useAccessToken();
    const { state } = useAuthContext();
    const isLoggedIn = Boolean(state.token || getToken());

    useEffect(() => {
      if (!currentPathname || isLoggedIn) {
        setIsLoaderActive(false);
      } else {
        const target = authUrls.find((u) =>
          currentPathname.includes(u.authUrl)
        );
        if (target && windowInstance) {
          redirectMethods(target.redirectUrl);
        } else {
          setIsLoaderActive(false);
        }
      }
    }, [currentPathname, isLoggedIn, state.token]);

    return isLoaderActive ? <Loader /> : <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
};
