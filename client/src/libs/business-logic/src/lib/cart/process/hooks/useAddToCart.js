// Importing necessary modules and functions
import { debouncePromise } from "../../../..//helper";
import {
  useAddToCartMutation,
  useUpdateCartMutation,
} from "../../fetching/mutation";
import { useCartContext } from "../context";
import { getCartLocalStorage } from "../helper/localStorageHelper";
import { useGetCart } from "./useGetCart";
import { useLocalCartAction } from "./useLocalCartAction";

const debounceDelayTime = 1000;

export const useAddToCart = () => {
  const { state } = useCartContext();
  const addToCartMutation = useAddToCartMutation();
  const { setCart, addToCart } = useLocalCartAction();
  const { onGetCart } = useGetCart();
  const updateCartMutation = useUpdateCartMutation();

  const onAddToCart = debouncePromise(({ item, quantity }) => {
    return new Promise((resolve, reject) => {
      addToCart(item, quantity);
      if (!state.accessToken) {
        // NOT LOGGED IN
        // Add to cart under LocalStorage & context
        resolve("Add to cart local success");
      } else {
        // LOGGED IN
        // Add to cart on server
        // Update cart first to change the interface first
        const localCart = getCartLocalStorage();
        if (localCart?.length) {
          // Check if there is a cart in LocalStorage yet
          // If there is and the cart currently has products then
          // update the cart in the database with this cart
          // Get the new cart with the added product from LocalStorage
          updateCartMutation
            .mutateAsync({
              accessToken: state.accessToken,
              cart: localCart,
            })
            .then((data) => {
              console.log(data);
              resolve("Add product to cart success");
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
          reject(new Error("Error add item to cart in local"));
        }
      }
    });
  }, debounceDelayTime);

  return {
    onAddToCart,
    isLoading: addToCartMutation.isLoading,
  };
};
