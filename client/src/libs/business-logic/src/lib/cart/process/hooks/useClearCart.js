// Import necessary modules and functions
import { useCartContext } from "../context";
import { setCartLocalStorage } from "../helper/localStorageHelper";
import { useClearCartMutation } from "../../fetching/mutation";
import { useGetCart } from "./useGetCart";
import { useLocalCartAction } from "./useLocalCartAction";

export const useClearCart = () => {
  const { state, dispatch } = useCartContext();
  const { onGetCart } = useGetCart();
  const clearCartMutation = useClearCartMutation();
  const { setCart } = useLocalCartAction();

  const onClearCart = () => {
    return new Promise((resolve, reject) => {
      // Clear the cart on the state first to update the interface first
      dispatch({
        type: "SET_CART_ACTION",
        payload: null,
      });

      if (state.accessToken) {
        // Clear the cart on the server as well
        clearCartMutation
          .mutateAsync({
            accessToken: state.accessToken,
          })
          .then((data) => {
            // If there is no error, clear the cart locally as well
            setCartLocalStorage(null);
            resolve(data.message);
          })
          .catch((error) => {
            // If an error occurs, call the api to get the cart to update the cart
            onGetCart()
              .then((cartData) => {
                // This hook automatically updates the state and localstorage
              })
              .catch((err) => {
                console.error("Get refresh cart error: ", err);
                // If there is an error, clear the entire cart
                setCart([]);
              });
            reject(error);
          });
      } else {
        // NOT LOGGED IN => Delete local cart
        setCartLocalStorage(null);
        resolve("Xoá giỏ hàng thành công");
      }
    });
  };

  return {
    onClearCart,
    isLoading: clearCartMutation.isLoading,
  };
};
