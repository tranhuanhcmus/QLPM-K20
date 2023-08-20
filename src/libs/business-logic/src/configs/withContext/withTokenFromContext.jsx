/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { AuthContext } from "../../lib/auth/process/context/authContext";
import { useAccessToken } from "../../lib/auth/process/hooks/useAccessToken";

export const withTokenFromContext = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const { getToken } = useAccessToken();
    const {
      state: { token },
    } = useContext(AuthContext);

    return React.useMemo(
      () => <WrappedComponent {...props} accessToken={token ?? getToken()} />,
      [token, props]
    );
  };

  return EnhancedComponent;
};
