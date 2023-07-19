import { useEffect } from "react";
import { BROADCAST_MESSAGE, CONTEXT_ACTION } from "../../constants";
import { useIsLogged } from "../hooks";
import { useAuthBroadcastChannel } from "../hooks/useAuthBroadcastChannel";
import { useAccessToken } from "../hooks/useAccessToken";
import { useAuthContext } from "../context";


export const BroadcastProvider = ({
  children
}) => {
  // Getting the instance of the Auth Broadcast channel
  const { postMessage } = useAuthBroadcastChannel();
  const isLogin = useIsLogged();
  const { getToken } = useAccessToken();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    if (!isLogin) {
      const token = getToken();
      if(token) {
        dispatch({
          type: CONTEXT_ACTION.SET_ACTION,
          payload: token
        });
      }
      // Posting a message to request the access token
      postMessage({
        message: BROADCAST_MESSAGE.NEED_TOKEN
      });
    }
  }, [isLogin, dispatch, getToken, postMessage]);

  return children;
};
