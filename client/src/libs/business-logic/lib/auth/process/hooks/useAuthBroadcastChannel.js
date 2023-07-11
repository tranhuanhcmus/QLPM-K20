// Importing the SESSION_STORAGE_KEY from constants
import { BROADCAST_CHANNEL, BROADCAST_MESSAGE } from "../../constants.js";
import { getIsRememberMeLocalStorage } from "../helper/localStorageHelper.js";
import { useAccessToken } from "./useAccessToken.js";

export const useAuthBroadcastChannel = () => {
  const bc = new BroadcastChannel(BROADCAST_CHANNEL.AUTH_CHANNEL);
  const tokenController = useAccessToken();

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

  // Method to post messages
  const postMessage = (message) => {
    bc.postMessage(message);
  };

  bc.onmessage = handleMessage;

  return { postMessage };
};
