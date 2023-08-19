/* eslint-disable react-hooks/exhaustive-deps */
import { SocialService, isAxiosError } from "../../../../../../services/src";
import { useEffect, useMemo, useState } from "react";
import { googleConfig } from "../../../../configs";
import { BROADCAST_MESSAGE, GOOGLE_MESSAGE } from "../../constants";
import { useUpdateAccountMutation } from "../../fetching/mutation";
import { getRedirectUri } from "../helper/uriHelper";
import { getTokenFromUrl } from "../helper/urlSearchParamsHelper";
import { googlePopupPostMessage } from "../helper/windowEventHelper";
import { useAccessToken } from "./useAccessToken";
import { useAuthBroadcastChannel } from "./useAuthBroadcastChannel";

const isRememberMeDefault = true;
// const successMessage = "Login success";
const failedMessage = "Login failed";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
const redirectUri = getRedirectUri();

export const useGoogleLogin = () => {
  // Configure auth url
  const googleAuthUrl = useMemo(
    () =>
      `${googleConfig.AUTH_URI}` +
      `?client_id=${googleClientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(googleConfig.SCOPE)}`,
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const { postMessage } = useAuthBroadcastChannel();
  const socialService = new SocialService();
  const updateAccountMutation = useUpdateAccountMutation();
  const currentUrl = window.location.href;

  // Get the setToken function from useAccessToken
  const { setToken } = useAccessToken();

  useEffect(() => {
    if (typeof window !== "undefined" && window.opener) {
      // Extract and get access token and error (if any) from url
      const { accessToken, error } = getTokenFromUrl();
      if (accessToken) {
        socialService
          .validateToken(accessToken)
          .then((res) => {
            // Send successful login message to the original tab along with the token
            googlePopupPostMessage(GOOGLE_MESSAGE.LOGIN_SUCCESS, {
              accessToken,
            });
          })
          .catch((err) => {
            console.error(err);
            googlePopupPostMessage(GOOGLE_MESSAGE.LOGIN_FAILED, {});
          })
          .finally(() => {
            window.close();
          });
      } else if (error) {
        // Send unsuccessful login message to the original tab
        googlePopupPostMessage(GOOGLE_MESSAGE.LOGIN_FAILED, {});
        window.close();
      }
    }
  }, [currentUrl]);

  const onGoogleLogin = () => {
    const handleExit = (eventFunc) => {
      window.removeEventListener("message", eventFunc);
      setIsLoading(false);
    };
    return new Promise((resolve, rejects) => {
      setIsLoading(true);
      // Open login popup
      if (typeof window !== "undefined") {
        const authWindow = window.open(
          googleAuthUrl,
          "Google Sign-In",
          "width=500,height=600"
        );

        if (authWindow) {
          const handleAuthentication = (event) => {
            const { type, payload } = event.data;
            if (type === GOOGLE_MESSAGE.LOGIN_SUCCESS) {
              socialService
                .getAccountInfor(payload.accessToken)
                .then((data) => {
                  // If web cannot get the user information
                  // => do not set token, do not login, do not broadcast
                  // setToken(payload.accessToken, isRememberMeDefault);
                  // Send login notification message to other tabs
                  postMessage({
                    message: BROADCAST_MESSAGE.SEND_TOKEN,
                    token: payload.accessToken,
                    isRemember: isRememberMeDefault,
                  });
                  // Update account on server
                  updateAccountMutation
                    .mutateAsync({
                      email: data.email,
                      fullName: data.firstName + " " + data.lastName,
                    })
                    .then((res) => {
                      // Remove listener
                      setToken(res.token, isRememberMeDefault);
                      handleExit(handleAuthentication);
                      resolve(res.message);
                    })
                    .catch((error) => {
                      console.error("Error update account infor: ", error);
                      handleExit(handleAuthentication);
                      rejects(new Error(failedMessage));
                    });
                })
                .catch((err) => {
                  if (isAxiosError(err) && err.response?.status === 400) {
                    console.error("Token invalid");
                  }
                  // Remove listener
                  handleExit(handleAuthentication);
                  rejects(new Error(failedMessage));
                });
            } else if (type === GOOGLE_MESSAGE.LOGIN_FAILED) {
              console.error("Error during Google login:", payload.error);
              // Remove listener
              handleExit(handleAuthentication);
              rejects(new Error(failedMessage));
            }
          };
          // Assign listener to listen to messages from popup
          window.addEventListener("message", handleAuthentication);
        } else {
          rejects(new Error(failedMessage));
        }
      } else {
        rejects(new Error(failedMessage));
      }
    });
  };

  return { onGoogleLogin, isLoading };
};
