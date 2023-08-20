/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { AuthContext } from "../../lib/auth/process/context/authContext";
import { CartContext } from "../../lib/cart/process/context/cartContext";
import { useAccessToken } from "../../lib/auth/process/hooks/useAccessToken";

export const withCartFromContext = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const { getToken } = useAccessToken();
    const {
      state: { token },
    } = useContext(AuthContext);
    const {
      state: { cart },
    } = useContext(CartContext);

    return React.useMemo(
      () => (
        <WrappedComponent
          {...props}
          accessToken={token ?? getToken()}
          cart={cart}
        />
      ),
      [token, cart, cart?.items, props]
    );
  };

  return EnhancedComponent;
};
