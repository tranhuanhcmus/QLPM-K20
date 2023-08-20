/* eslint-disable react-hooks/exhaustive-deps */
// Importing necessary libraries and services
import { useEffect, useMemo, useState } from "react";
import { facebookConfig } from "../../../../configs";
import { BROADCAST_MESSAGE, FACEBOOK_MESSAGE } from "../../constants";
import {
  useGetFBAccessTokenMutation,
  useGetFBUserInforMutation,
  useUpdateAccountMutation,
} from "../../fetching/mutation";
import { getRedirectUri } from "../helper/uriHelper";
import { getCodeFromUrl } from "../helper/urlSearchParamsHelper";
import { facebookPopupPostMessage } from "../helper/windowEventHelper";
import { useAccessToken } from "./useAccessToken";

const isRememberMeDefault = true;
// const successMessage = "Login success";
const failedMessage = "Login failed";

const fbAppId = process.env.REACT_APP_FACEBOOK_APP_ID || "";
const fbAppSecret = process.env.REACT_APP_FACEBOOK_APP_SECRET || "";
const redirectUri = getRedirectUri() + "/";
// Define the type for the hook

export const useFacebookLogin = () => {
  const facebookAuthUrl = useMemo(
    () =>
      facebookConfig.AUTH_URI +
      `?client_id=${fbAppId}` +
      `&redirect_uri=${redirectUri}` +
      `&scope=${facebookConfig.SCOPE}` +
      `&response_type=code` +
      `&state={"${facebookConfig.STATE}"}`,
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const getFBAccessTokenMutation = useGetFBAccessTokenMutation();
  const getFBUserInforMutation = useGetFBUserInforMutation();
  const updateAccountMutation = useUpdateAccountMutation();
  const currentUrl = window.location.href;

  // Get the setToken function from useAccessToken
  const { setToken } = useAccessToken();

  useEffect(() => {
    if (typeof window !== "undefined" && window.opener) {
      // Extract and get access token and error (if any) from url
      const code = getCodeFromUrl();
      if (code) {
        // get token by 'code'
        getFBAccessTokenMutation
          .mutateAsync({
            clientId: fbAppId,
            clientSecret: fbAppSecret,
            redirectUri: redirectUri,
            code: code,
          })
          .then((data) => {
            facebookPopupPostMessage(FACEBOOK_MESSAGE.LOGIN_SUCCESS, {
              accessToken: data.access_token,
            });
          })
          .catch((error) => {
            facebookPopupPostMessage(FACEBOOK_MESSAGE.LOGIN_FAILED, {});
          })
          .finally(() => {
            window.close();
          });
      }
    }
  }, [currentUrl]);

  const onFacebookLogin = () => {
    const handleExit = (eventFunc) => {
      window.removeEventListener("message", eventFunc);
      setIsLoading(false);
    };

    return new Promise((resolve, rejects) => {
      setIsLoading(true);
      if (typeof window !== "undefined") {
        const authWindow = window.open(
          facebookAuthUrl,
          "Facebook Sign-In",
          "width=500,height=600"
        );

        if (authWindow) {
          const handleAuthentication = (event) => {
            const { type, payload } = event.data;
            if (type === FACEBOOK_MESSAGE.LOGIN_SUCCESS) {
              getFBUserInforMutation
                .mutateAsync(payload.accessToken)
                .then((res) => {
                  // If web cannot get the user information
                  // => do not set token, do not login, do not broadcast
                  setToken(payload.accessToken, isRememberMeDefault);
                  // Send login notification message to other tabs
                  postMessage({
                    message: BROADCAST_MESSAGE.SEND_TOKEN,
                    token: payload.accessToken,
                    isRemember: isRememberMeDefault,
                  });

                  // Update account on server
                  updateAccountMutation
                    .mutateAsync({
                      email: res.email,
                      fullName: res.firstName + " " + res.lastName,
                    })
                    .then((res) => {
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
                .catch((error) => {
                  // Remove listener
                  handleExit(handleAuthentication);
                  rejects(new Error(failedMessage));
                });
            } else if (type === FACEBOOK_MESSAGE.LOGIN_FAILED) {
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
  return { onFacebookLogin, isLoading };
};
