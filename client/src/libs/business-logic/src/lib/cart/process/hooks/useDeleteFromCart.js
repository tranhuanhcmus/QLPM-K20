// Import necessary modules and functions
import {
  useDeleteFromCartMutation,
  useDecreaseItemQuantityMutation,
} from "../../fetching/mutation";
import { useCartContext } from "../context";
import { useGetCart } from "./useGetCart";
import { useLocalCartAction } from "./useLocalCartAction";
import { debouncePromise } from "../../../..//helper";

const debounceDelayTime = 1000;
export const useDeleteFromCart = () => {
  const { state, dispatch } = useCartContext();
  const deleteFromCartMutation = useDeleteFromCartMutation();
  const decreaseItemQuantityMutation = useDecreaseItemQuantityMutation();
  const {
    deleteFromCartLocalStorage,
    setCart,
    decreaseItemQuantityLocalStorage,
  } = useLocalCartAction();
  const { onGetCart } = useGetCart();

  const onDecreaseItemQuantity = debouncePromise(({ productId, quantity }) => {
    return new Promise((resolve, reject) => {
      const targetProduct = state.cart.find((ci) => ci.item.id === productId);
      if (targetProduct && targetProduct.quantity > quantity) {
        dispatch({
          type: "DELETE_ACTION",
          payload: {
            productId,
            quantity,
          },
        });

        if (state.accessToken) {
          decreaseItemQuantityMutation
            .mutateAsync({
              accessToken: state.accessToken,
              productId: productId,
              quantity: quantity,
            })
            .then((data) => {
              decreaseItemQuantityLocalStorage(productId, quantity);
              resolve(data.message);
            })
            .catch((error) => {
              // If error, update state according to local

              onGetCart()
                .then((cartData) => {
                  // This hook automatically updates state and local storage
                })
                .catch((err) => {
                  console.error("Get refresh cart error: ", err);
                  // If error, clear the entire cart
                  setCart([]);
                });
              reject(error);
            });
        } else {
          decreaseItemQuantityLocalStorage(productId, quantity);
          resolve("Delete from cart success");
        }
      } else {
        onDeleteItem(productId)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      }
    });
  }, debounceDelayTime);
  const onDeleteItem = (productID) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: "DELETE_ACTION",
        payload: {
          productId: productID,
        },
      });

      if (state.accessToken) {
        deleteFromCartMutation
          .mutateAsync({
            accessToken: state.accessToken,
            productId: productID,
          })
          .then((data) => {
            deleteFromCartLocalStorage(productID);
            resolve(data.message);
          })
          .catch((error) => {
            // If error, update state according to local

            onGetCart()
              .then((cartData) => {
                // This hook automatically updates state and localStorage
              })
              .catch((err) => {
                console.error("Get refresh cart error: ", err);
                // If error, clear the entire cart
                setCart([]);
              });
            reject(error);
          });
      } else {
        deleteFromCartLocalStorage(productID);
        resolve("Delete from cart success");
      }
    });
  };

  return {
    onDecreaseItemQuantity,
    onDeleteItem,
    isLoading: deleteFromCartMutation.isLoading,
  };
};
