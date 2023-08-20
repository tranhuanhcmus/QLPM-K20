// Importing necessary modules and functions
import { useUpdateCartMutation } from "../../fetching/mutation";
import { useCartContext } from "../context";
import { useLocalCartAction } from "./useLocalCartAction";
import { setCartLocalStorage } from "../helper/localStorageHelper";
import { useGetCart } from "./useGetCart";

export const useUpdateCart = () => {
  const { state, dispatch } = useCartContext();
  const updateCartMutation = useUpdateCartMutation();
  const { setCart } = useLocalCartAction();
  const { onGetCart } = useGetCart();

  const onUpdateCart = (cartData) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: "SET_CART_ACTION",
        payload: cartData.cart,
      });

      if (state.accessToken) {
        updateCartMutation
          .mutateAsync(cartData)
          .then((data) => {
            setCartLocalStorage(cartData.cart);
            resolve(data.message);
          })
          .catch((error) => {
            // If an error occurs, call the api to get the cart to update the cart
            onGetCart()
              .then((cartData) => {
                // This hook automatically updates the state and LocalStorage
              })
              .catch((err) => {
                console.error("Get refresh cart error: ", err);
                // If there is an error, clear the entire cart
                setCart([]);
              });
            reject(error);
          });
      } else {
        setCartLocalStorage(cartData.cart);
        resolve("Update cart success");
      }
    });
  };

  return {
    onUpdateCart,
    isLoading: updateCartMutation.isLoading,
  };
};
