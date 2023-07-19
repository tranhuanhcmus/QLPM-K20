// Importing the SESSION_STORAGE_KEY from constants
import { useCallback, useEffect, useRef } from "react";
import { BROADCAST_CHANNEL, BROADCAST_MESSAGE } from "../../constants";
import { getIsRememberMeLocalStorage } from "../helper/localStorageHelper";
import { useAccessToken } from "./useAccessToken";
import { authConfig } from "libs/business-logic/src/configs";

export const useAuthBroadcastChannel = () => {
  const bc = useRef(null);
  const tokenController = useAccessToken();

  // Method to post messages
  const postMessage = useCallback(
    (message) => {
      if(authConfig.isNeedBroadcast) {
        if (!bc.current) {
          bc.current = new BroadcastChannel(BROADCAST_CHANNEL.AUTH_CHANNEL);
        }
        bc.current.postMessage(message);
      }
    },
    []
  );

  useEffect(() => {
    // Method to handle incoming messages
    const handleMessage = (event) => {
      switch (event.data.message) {
        case BROADCAST_MESSAGE.SEND_TOKEN:
          // If the token is present and different from the current one, update it
          if (
            event.data.token &&
            tokenController.getToken() !== event.data.token
          ) {
            tokenController.setToken(event.data.token, event.data.isRemember);
          }
          break;
        case BROADCAST_MESSAGE.NEED_TOKEN: {
          const rememberMeOption = getIsRememberMeLocalStorage();
          const token = tokenController.getToken();
          if (token) {
            postMessage({
              message: BROADCAST_MESSAGE.SEND_TOKEN,
              token: token,
              isRemember: rememberMeOption
            });
          }
          break;
        }
        case BROADCAST_MESSAGE.NEED_LOGOUT:
          tokenController.deleteToken();
          break;
        default:
          break;
      }
    };

    bc.current && authConfig.isNeedBroadcast && (bc.current.onmessage = handleMessage);
  }, [bc, postMessage, tokenController])

  return { postMessage };
};
