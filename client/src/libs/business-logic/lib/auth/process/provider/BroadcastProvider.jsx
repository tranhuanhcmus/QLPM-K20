import { useEffect } from "react";
import { BROADCAST_MESSAGE } from "../../constants.js";
import { useIsLogged } from "../hooks/index.js";
import { useAuthBroadcastChannel } from "../hooks/useAuthBroadcastChannel.js";

export const BroadcastProvider = ({ children }) => {
  // Getting the instance of the Auth Broadcast channel
  const { postMessage } = useAuthBroadcastChannel();
  const { isLogin } = useIsLogged();

  useEffect(() => {
    if (!isLogin) {
      // Posting a message to request the access token
      postMessage({
        message: BROADCAST_MESSAGE.NEED_TOKEN
      });
    }
  }, [isLogin, postMessage]);

  return children;
};
