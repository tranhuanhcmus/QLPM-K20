// Importing necessary constants
import { CONTEXT_ACTION, COOKIE_KEY, TOKEN_EXPIRY_DAYS } from "../../constants";
// Importing authentication context
import { useAuthContext } from "../context";
// Importing cookie helper functions
import { deleteCookie, getCookie, setCookie } from "../helper/cookieHelper";
// Importing local storage helper functions
import {
  getIsRememberMeLocalStorage,
  setIsRememberMeLocalstorage,
  removeIsRememberMeLocalstorage
} from "../helper/localStorageHelper";
// Importing session storage helper functions
import {
  setAccessTokenSessionStorage,
  getAccessTokenSessionStorage,
  removeAccessTokenSessionStorage
} from "../helper/sessionStorageHelper";


// Function to get the token
export const getToken = () => {
  // Checking if the user has chosen to be remembered
  const isRememberMe = getIsRememberMeLocalStorage();
  if (isRememberMe) {
    return getCookie(COOKIE_KEY.ACCESS_TOKEN);
  } else {
    // Otherwise, get the token from the session storage
    return getAccessTokenSessionStorage();
  }
};

export const useAccessToken = () => {
  // Getting the dispatch function from the authentication context
  const { dispatch, setProviderToken: providerSetToken } = useAuthContext();

  // Function to set the token
  const setToken = (newToken, isRememberMe) => {
    if (isRememberMe) {
      // If the user has chosen to be remembered, save the token to the cookies
      setCookie(COOKIE_KEY.ACCESS_TOKEN, newToken, TOKEN_EXPIRY_DAYS.REMEMBER);
    } else {
      // Otherwise, save the token to the session storage
      setAccessTokenSessionStorage(newToken);
    }
    // Save the remember me option to the local storage
    setIsRememberMeLocalstorage(isRememberMe);
    // Dispatch the new token to the context
    dispatch({
      type: CONTEXT_ACTION.SET_ACTION,
      payload: newToken
    });
    
    console.log("Set new token")
    providerSetToken && providerSetToken(newToken);
  };

  // Function to reset the token
  const resetToken = (newToken) => {
    // Checking if the user has chosen to be remembered
    const isRememberMe = getIsRememberMeLocalStorage();
    if (isRememberMe) {
      // If so, save the new token to the cookies
      setCookie(COOKIE_KEY.ACCESS_TOKEN, newToken, TOKEN_EXPIRY_DAYS.REMEMBER);
    } else {
      // Otherwise, save the new token to the session storage
      setAccessTokenSessionStorage(newToken);
    }
    // Dispatch the new token to the context
    dispatch({
      type: CONTEXT_ACTION.SET_ACTION,
      payload: newToken
    });

    console.log("Set new token")
    providerSetToken && providerSetToken(newToken);
  };

  // Function to delete the token
  const deleteToken = () => {
    // Checking if the user has chosen to be remembered
    const isRememberMe = getIsRememberMeLocalStorage();
    if (isRememberMe) {
      // If so, delete the token from the cookies
      deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
    } else {
      // Otherwise, remove the token from the session storage
      removeAccessTokenSessionStorage();
    }
    // Remove the remember me option from the local storage
    removeIsRememberMeLocalstorage();
    // Remove the token from the context
    dispatch({
      type: CONTEXT_ACTION.SET_ACTION,
      payload: null
    });

    console.log("Set new token")
    providerSetToken && providerSetToken(null);
  };

  // Returning the hook functions
  return {
    getToken,
    setToken,
    resetToken,
    deleteToken
  };
};
