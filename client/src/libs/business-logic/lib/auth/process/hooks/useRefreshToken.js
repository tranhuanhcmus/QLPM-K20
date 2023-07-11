// Importing necessary modules and functions
import { BROADCAST_MESSAGE } from "../../constants.js";
import { useRefreshTokenMutation } from "../../fetching/mutation.js";
import { getIsRememberMeLocalStorage } from "../helper/localStorageHelper.js";
import { useAccessToken } from "./useAccessToken.js";
import { useAuthBroadcastChannel } from "./useAuthBroadcastChannel.js";

// The useLogin hook
export const useRefreshToken = () => {
  const { postMessage } = useAuthBroadcastChannel();
  // Defining the refreshTokenMutation mutation
  const refreshTokenMutation = useRefreshTokenMutation();

  // Get the resetToken and getToken functions from useAccessToken
  const { resetToken } = useAccessToken();

  // Defining the onLogin function
  const onRefreshToken = (oldToken) => {
    return new Promise((resolve, reject) => {
      refreshTokenMutation
        .mutateAsync(oldToken)
        .then((res) => {
          // Check if res.token is undefined
          if (res.token) {
            // Update the new token on the client
            resetToken(res.token);
            // Broadcasting the login message
            postMessage({
              message: BROADCAST_MESSAGE.SEND_TOKEN,
              token: res.token,
              isRemember: getIsRememberMeLocalStorage()
            });
            resolve({
              statusCode: res.statusCode,
              message: res.message,
              token: res.token
            });
          } else {
            throw new Error("Refresh Token is not found");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // Returning the onLogin function and the loading state
  return {
    onRefreshToken,
    isLoading: refreshTokenMutation.isLoading
  };
};
