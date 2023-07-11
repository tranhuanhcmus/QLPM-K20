import { BROADCAST_MESSAGE } from "../../constants.js";
import { useAccessToken } from "./useAccessToken.js";
import { useAuthBroadcastChannel } from "./useAuthBroadcastChannel.js";


export const useLogout = () => {
  const { postMessage } = useAuthBroadcastChannel();
  const { deleteToken } = useAccessToken();

  const onLogout = () => {
    try {
      // Logout success
      deleteToken();
      // Broadcast logout message
      postMessage({
        message: BROADCAST_MESSAGE.NEED_LOGOUT
      });
      return true;
    } catch (error) {
      // If any error occurs in logout process, return false to client
      return false;
    }
  };

  return {
    onLogout
  };
};
