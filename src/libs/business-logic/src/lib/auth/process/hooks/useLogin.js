// Importing necessary modules and functions
import { BROADCAST_MESSAGE } from "../../constants";
import { useLoginMutation } from "../../fetching/mutation";
import { useAccessToken } from "./useAccessToken";
import { useAuthBroadcastChannel } from "./useAuthBroadcastChannel";

export const useLogin = () => {
  const { postMessage } = useAuthBroadcastChannel();
  // Defining the login mutation
  const loginMutation = useLoginMutation();

  // Getting the setToken function from useAccessToken
  const { setToken } = useAccessToken();

  const onLogin = ({ email, password, isRememberMe }) => {
    return new Promise((resolve, reject) => {
      loginMutation
        .mutateAsync({ email, password })
        .then((response) => {
          // If the response is successful and a token is received, set the token and broadcast it
          if (response.token) {
            setToken(response.token, isRememberMe);
            // Broadcasting the login message
            postMessage({
              message: BROADCAST_MESSAGE.SEND_TOKEN,
              token: response.token,
              isRemember: isRememberMe,
            });
            // Resolving the promise with the response
            resolve(response.message);
          } else {
            reject(new Error(response.message));
          }
        })
        .catch((error) => {
          // Rejecting the promise in case of an error
          reject(error);
        });
    });
  };

  // Returning the onLogin function and the loading state
  return {
    onLogin,
    isLoading: loginMutation.isLoading,
  };
};
