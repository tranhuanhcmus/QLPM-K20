/* eslint-disable no-unused-vars */
import { axios } from "../../../../../../services/src";
import React from "react";
import { authConfig } from "../../../../configs";
import { useAccessToken } from "../hooks/useAccessToken";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { BroadcastProvider } from "./BroadcastProvider";
import { AuthContextProvider } from "./ContextProvider";
import { useFacebookLogin, useGoogleLogin } from "../hooks";
import { withAuthenticateUrl } from "./withAuthenticateUrl";

const EnhancedContextProvider = withAuthenticateUrl(AuthContextProvider);
// This is the AuthProvider for the entire app
export const AuthProvider = ({ children }) => {
  // Get the resetToken and getToken functions from useAccessToken
  const { getToken } = useAccessToken();
  const { onRefreshToken } = useRefreshToken();
  const { onFacebookLogin } = useFacebookLogin();
  const { onGoogleLogin } = useGoogleLogin();

  // Use axios interceptor to handle response
  axios.interceptors.response.use(
    (response) => {
      // If response is successful, return the response
      return response;
    },
    (error) => {
      // If the response status is 401 and the message is "Invalid credential"
      // It means token is expired now! Need to refresh
      if (
        error.response?.status === 401 &&
        error.response.data?.message === "Invalid credential" &&
        authConfig.isNeedRefreshToken
      ) {
        // Get the token
        const token = getToken();
        if (token) {
          // If token exists, refresh the token
          onRefreshToken(token)
            .then((res) => {
              // Check if res.token is undefined
              if (!res.token) {
                return Promise.reject(error);
              }

              // Update the new token for the request
              error.config.headers["Authorization"] = "Bearer " + res.token;
            })
            .finally(() => {
              // Resend the request with the new token
              return axios(error.config);
            });
        }
      }
      // If any other error, reject the promise
      return Promise.reject(error);
    }
  );

  // Return the AuthContextProvider and BroadcastProvider with children
  return (
    <EnhancedContextProvider>
      <BroadcastProvider>{children}</BroadcastProvider>
    </EnhancedContextProvider>
  );
};
